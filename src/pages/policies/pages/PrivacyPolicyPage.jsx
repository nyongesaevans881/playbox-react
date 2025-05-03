import { X } from "lucide-react";

const PrivacyPolicyPage = ({ onClose }) => {
  return (
    <div className="bg-white">
      <div className="container">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#ef3563] transition"
        >
          <X size={24} />
        </button>

        <div className="p-6 space-y-4 text-sm text-gray-700">
          <h2 className="text-2xl font-semibold text-[#031d5c]">Privacy Policy</h2>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">1. Information We Collect</h3>
            <p>
              We collect personal data such as your name, email, address, and order details. Usage data like
              IP address and device info may also be collected to improve your experience.
            </p>
            <p>
              Cookies may be used for personalization and analytics. You can disable cookies via your browser settings.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">2. How We Use Your Data</h3>
            <p>
              We use your data to process orders, manage your account, and improve our services. Marketing emails are only
              sent if you opt in, and you can unsubscribe anytime.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">3. Data Sharing</h3>
            <p>
              We do not sell or trade your personal information. Data may be shared only with trusted partners like delivery
              services or payment processors — strictly to fulfill your order or comply with the law.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">4. Storage & Security</h3>
            <p>
              Your data is stored securely in encrypted form on cloud servers. We follow industry standards to protect your
              information, though no system is ever 100% immune to threats.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">5. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your data. You may also withdraw consent to receive
              marketing at any time by contacting us.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">6. Children's Privacy</h3>
            <p>
              Our platform is not intended for children under 13. If you believe we have collected data from a minor,
              please contact us so we can remove it.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[#0690f3]">7. Updates</h3>
            <p>
              This policy may be updated from time to time. All changes will be posted here with a revised effective date.
            </p>
          </section>

          <div className="pt-4 text-xs text-center text-gray-500">
            Questions? Email us at{" "}
            <a href="mailto:info@playbox.coke" className="text-[#031d5c] underline">
              info@playbox.coke
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
