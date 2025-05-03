import { X } from 'lucide-react';

const RefundPolicyPage = ({ onClose }) => {
  return (
    <div className="bg-white">
      <div className="bg-white p-6 w-full max-w-2xl container">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-[#ef3563] cursor-pointer"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#031d5c] mb-4">Refund & Return Policy</h2>

        <div className="text-sm text-gray-800 space-y-4">
          <p>
           We prioritize customer satisfaction while protecting product integrity. If you are not completely satisfied with your purchase, we offer a flexible return and refund policy under the conditions outlined below.
          </p>

          <h3 className="font-semibold text-[#031d5c]">Return Eligibility</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Returns are accepted within <strong>5 days</strong> of purchase.</li>
            <li>Items must be <strong>sealed, unused, and in their original packaging</strong>.</li>
            <li>Products that have been opened, used, or tampered with are <strong>not eligible</strong> for return unless there is a confirmed manufacturing defect.</li>
            <li>If returning a defective item, ensure all original accessories, manuals, and packaging are included.</li>
          </ul>

          <h3 className="font-semibold text-[#031d5c]">Damaged or Missing Items</h3>
          <p>
            Please report any damaged or missing items <strong>within 6 hours</strong> of delivery by contacting our support team.
          </p>

          <h3 className="font-semibold text-[#031d5c]">How to Request a Return</h3>
          <p>
            Reach out to one of our Playbox sales consultants or email us at <a href="mailto:info@playbox.coke" className="text-[#ef3563] underline">info@playbox.coke</a>. Our team will get back to you within 24 hours to validate your claim and guide you through the return process.
          </p>

          <h3 className="font-semibold text-[#031d5c]">Shipping & Fees</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>If the return is due to a customer preference (not a fault), <strong>you are responsible</strong> for return shipping costs.</li>
            <li>For international returns, applicable <strong>duties, import fees, and shipping charges</strong> will also apply.</li>
          </ul>

          <h3 className="font-semibold text-[#031d5c]">Refunds</h3>
          <p>
            Once your returned item is received and inspected, we’ll notify you by email. If your return is approved, a refund will be processed to your original payment method within a few business days.
          </p>

          <p>
            If you haven’t received your refund within the expected timeframe, please contact us at <a href="mailto:info@playbox.coke" className="text-[#ef3563] underline">info@playbox.coke</a>.
          </p>

          <h3 className="font-semibold text-[#031d5c]">Exchanges</h3>
          <p>
            We only offer exchanges for items that are defective or damaged, and only for the same product. For assistance, contact us at the support email above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
