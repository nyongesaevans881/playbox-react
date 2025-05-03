import { X } from "lucide-react";

const TermsPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-xl relative border-l-4 border-[#0690f3]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#ef3563] transition"
        >
          <X size={24} />
        </button>

        <div className="p-6 space-y-4 text-sm text-gray-700">
          <h2 className="text-2xl font-semibold text-[#031d5c]">Terms of Service</h2>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">1. General Use</h3>
            <p>
              Playbox reserves the right to refuse service to anyone at any time for any reason.
              Your non-payment data may be transferred unencrypted over various networks. However, payment
              data (such as credit card info) is always encrypted during transmission.
            </p>
            <p>
              You agree not to duplicate, resell, or exploit any part of the service or platform without written consent from Playbox.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">2. Accuracy of Information</h3>
            <p>
              While we do our best to keep information up to date, Playbox is not responsible for
              inaccurate or outdated content. Always double-check before making important decisions based on the content found on our site.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">3. Service & Price Changes</h3>
            <p>
              Product prices and services may change without prior notice. We reserve the right to update,
              suspend, or discontinue any aspect of our offerings at our discretion.
            </p>
            <p>
              Playbox is not liable to any user or third party for such changes.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">4. Products & Availability</h3>
            <p>
              Some items may be available exclusively online and could be limited in quantity. Returns and exchanges
              follow our <span className="text-[#ef3563] font-medium">Refund Policy</span>.
            </p>
            <p>
              We aim to display products and colors accurately, but we cannot guarantee exact appearance due to device variations.
              Playbox reserves the right to limit or restrict sales, update descriptions, or discontinue products at any time.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">5. Community Conduct</h3>
            <p>
              Playbox is a gaming community as well as a store. We expect users to respect one another and abide by community standards.
              Harassment, hate speech, or misuse of our platform may result in account suspension.
            </p>
          </section>

          <div className="pt-4 text-xs text-center text-gray-500">
            For questions, contact us at <a href="mailto:info@playbox.coke" className="text-[#031d5c] underline">info@playbox.coke</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPopup;
