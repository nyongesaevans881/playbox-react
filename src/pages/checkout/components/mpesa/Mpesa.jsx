import React, { useState } from "react";
import { X, Loader } from "lucide-react";
import "./mpesa.css";

export const MpesaPayment = ({ onClose, total, onSuccess }) => {
  const [phone, setPhone] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState(""); // Store CheckoutRequestID
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");
  const [showstksuccess, setShowStkSuccess] = useState(false);

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;

  console.log(`serverURL`, serverURL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${serverURL}/mpesa/stk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: total }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowStkSuccess(true);
        setLoading(false);
        setCheckoutRequestId(data.CheckoutRequestID);
        setError('Do not click resend immediately. Give it a couple of seconds');

        if (!data.CheckoutRequestID) {
          throw new Error("Missing CheckoutRequestID in response");
        }

        const ws = new WebSocket(`${socketURL}`);
        ws.onopen = () => {
          ws.send(
            JSON.stringify({ action: "register", checkoutRequestId: data.CheckoutRequestID })
          );
        };

        ws.onmessage = (event) => {
          const result = JSON.parse(event.data);
          handleWebSocketResponse(result);
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
          console.log("WebSocket connection closed");
        };
      } else {
        throw new Error(data.error || "Failed to initiate payment");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleWebSocketResponse = (result) => {
    if (result.status === "success") {
      setStatus(true);
      onSuccess(result.data);
      setTimeout(() => onClose(), 2000);
    } else {
      setError(result.message);
    }
  };

  const handleResendSTK = async () => {
    if (!phone || !checkoutRequestId) {
      setError("Phone number or CheckoutRequestID is missing. Please retry.");
      return;
    }
    setPaymentLoading(true);
    await handleSubmit(new Event("submit"));
  };

  const handleCheckPaymentStatus = async () => {
    if (!checkoutRequestId) {
      setError("Missing CheckoutRequestID. Please retry.");
      return;
    }
    setPaymentLoading(true);

    try {
      const response = await fetch(`${serverURL}/mpesa/paymentStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ CheckoutRequestId: checkoutRequestId }),
      });


      const data = await response.json();
      setPaymentLoading(false);


      if (response.ok) {
        if (data.ResultCode === "0") {
          setStatus(true);
          onSuccess(data);
          setTimeout(() => onClose(), 2000);
        } else if (data.ResultCode === "2001") {
          setError(`The initiator information was invalid. Please check your PIN and try again`);
        } else if (data.ResultCode === "1037") {
          setError(`DS Timeout. Please initiate again and respond Quicker`);
        } else {
          setError(data.ResultDesc || "Failed to check payment status");
        }
      } else {
        setError(data.error || "Failed to check payment status");
      }
    } catch (err) {
      setPaymentLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="mpesa-popup-overlay">
      <div className="mpesa-popup-content">
        <button className="mpesa-close-btn" onClick={onClose}>
          <X />
        </button>
        <h2>LIPA NA M-PESA || STK-PUSH</h2>

        {!status ? (
          <>
            {!showstksuccess ? (
              <div className="mpesa-popup-amount-display">
                <img src="/icons/payment/mpesa-circular.png" alt="" />
                <p>
                  Amount to Pay: <span>Ksh {total.toLocaleString()}</span>
                </p>
              </div>
            ) : (
              <div>
                <div className="stk-sucess-loader">
                  <img src="/gif/loading-colors.gif" alt="Loading" />
                </div>
                <div className="stk-sucess-loader-message">
                  <img src="/icons/success.png" alt="" />
                  <p>
                    An STK has been sent to your phone. Please Enter your PIN to
                    complete the payment
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!showstksuccess && (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter M-Pesa number (07XX...)"
                  pattern="^0[17][0-9]{8}$"
                  title="Please enter a valid Safaricom number starting with 07 or 01"
                  required
                />
              )}
              <button
                type="submit"
                disabled={loading}
                className={loading ? "loading" : ""}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  `${!showstksuccess ? "Pay Now" : "Resend STK"}`
                )}
              </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {showstksuccess && (
              <button
                onClick={handleCheckPaymentStatus}
                className="mpesa-check-payment-status-btn"
              >
                {paymentLoading ? (
                  <>
                    <Loader className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  'Check Payment Status'
                )}
              </button>
            )}
          </>
        ) : (
          <div className="mpesa-pop-up-sucess-div">
            <img src="/gif/order-success.gif" alt="Success" />
            <p>Payment<br />Successful</p>
          </div>
        )}
      </div>
    </div>
  );
};
