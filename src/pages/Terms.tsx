import { motion } from 'framer-motion';

export function Terms() {
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
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These Terms govern your access to and use of S‑Kite. By using our
              website or services you agree to these Terms.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p className="leading-relaxed">
            By accessing or using S‑Kite, you agree to be bound by these Terms.
            If you do not agree, do not use the service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            2. Use of the Service
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use S‑Kite only for lawful purposes and in accordance with these
              Terms.
            </li>
            <li>
              Do not attempt to disrupt or misuse the service or infrastructure.
            </li>
            <li>
              We may modify, suspend, or discontinue features at any time.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            3. Accounts and Security
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You are responsible for safeguarding your account credentials.
            </li>
            <li>
              Notify us of any unauthorized use at{' '}
              <a href="mailto:skite545@gmail.com">skite545@gmail.com</a>.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            4. Purchases and Payments
          </h2>
          <p className="leading-relaxed">
            Payments are processed by Stripe. By completing a purchase, you
            authorize charges according to the selected pricing. All sales are
            subject to Stripe&apos;s terms and our refund policies where
            applicable.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            5. Intellectual Property
          </h2>
          <p className="leading-relaxed">
            S‑Kite, including content, trademarks, and software, is owned by us
            or our licensors and protected by applicable laws. You may not copy,
            modify, or distribute without permission.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            6. User Content
          </h2>
          <p className="leading-relaxed">
            If you submit content, you grant us a non‑exclusive license to use
            it to operate and improve the service, subject to our Privacy
            Policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            7. Prohibited Activities
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reverse engineering or scraping the service.</li>
            <li>Uploading malicious code or infringing content.</li>
            <li>Impersonation or unauthorized account access.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            8. Disclaimer of Warranties
          </h2>
          <p className="leading-relaxed">
            The service is provided on an "as is" and "as available" basis with
            no warranties of any kind. Use is at your own risk.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            9. Limitation of Liability
          </h2>
          <p className="leading-relaxed">
            To the maximum extent permitted by law, S‑Kite shall not be liable
            for indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or data.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            10. Indemnification
          </h2>
          <p className="leading-relaxed">
            You agree to indemnify and hold S‑Kite harmless from claims arising
            out of your use of the service or violation of these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            11. Termination
          </h2>
          <p className="leading-relaxed">
            We may suspend or terminate your access for any breach of these
            Terms or misuse of the service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            12. Governing Law
          </h2>
          <p className="leading-relaxed">
            These Terms are governed by applicable laws of your jurisdiction,
            without regard to conflict of law principles.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            13. Changes to These Terms
          </h2>
          <p className="leading-relaxed">
            We may revise these Terms from time to time. Continued use of the
            service after updates constitutes acceptance of the revised Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            14. Contact
          </h2>
          <p className="leading-relaxed">
            Questions about these Terms? Contact us at
            <a className="ml-1" href="mailto:skite545@gmail.com">
              skite545@gmail.com
            </a>
            .
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Last updated: {new Date().toISOString().slice(0, 10)}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Terms;
