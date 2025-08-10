import { motion } from 'framer-motion';

export function Privacy() {
  return (
    <div className="min-h-screen">
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              This Privacy Policy explains how S‑Kite collects, uses, and
              protects your information when you use our website and services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Account information such as name, email, and authentication
              details (via Firebase Auth).
            </li>
            <li>
              Payment information handled by Stripe. We do not store full card
              numbers on our servers.
            </li>
            <li>Usage data and device information to improve the product.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain the S‑Kite service and features.</li>
            <li>Process payments and manage credits.</li>
            <li>Improve performance, reliability, and user experience.</li>
            <li>Communicate updates and important service notices.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Data Storage and Security</h2>
          <p className="leading-relaxed">
            We use Firebase (Google Cloud) for authentication and data storage.
            Industry‑standard security controls are applied to protect your
            data.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Payments</h2>
          <p className="leading-relaxed">
            Payments are processed by Stripe. Your payment details are handled
            by Stripe in accordance with their security practices. See Stripe’s
            Privacy Policy for details.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Cookies</h2>
          <p className="leading-relaxed">
            We may use cookies or similar technologies to maintain sessions and
            improve functionality. You can control cookies through your browser
            settings.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Rights</h2>
          <p className="leading-relaxed">
            You may access, update, or delete your account information. Contact
            us at <a href="mailto:skite545@gmail.com">skite545@gmail.com</a> for
            assistance.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Third‑Party Services</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Firebase (Authentication, Firestore)</li>
            <li>Stripe (Payments)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact</h2>
          <p className="leading-relaxed">
            If you have questions about this policy, contact us at
            <a className="ml-1" href="mailto:skite545@gmail.com">
              skite545@gmail.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Changes to This Policy</h2>
          <p className="leading-relaxed">We may update this Privacy Policy from time to time. We will post the updated policy on this page with a revised effective date.</p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Effective date: {new Date().toISOString().slice(0, 10)}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Privacy;
