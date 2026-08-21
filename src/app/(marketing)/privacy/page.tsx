// app/legal/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-Budgexa-beige">
      {/* HERO */}
      <section className="px-5 pt-28 pb-12 border-b border-Budgexa-beige-dark">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-black text-Budgexa-green leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-Budgexa-green/60">
            Last updated: August 5, 2026 <span className="mx-2">·</span>
            <a href="/legal/terms" className="underline hover:text-Budgexa-green">
              Terms of Service
            </a>
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-12 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
        {/* TOC */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-2 text-sm">
            <p className="font-semibold text-Budgexa-green mb-3">Contents</p>
            
            {[
              ["information-we-collect", "1. Information we collect"],
              ["how-we-use", "2. How we use your information"],
              ["ai-processing", "3. AI processing"],
              ["legal-basis", "4. Legal basis for processing"],
              ["storage-security", "5. Data storage & security"],
              ["retention", "6. Data retention"],
              ["sharing", "7. Sharing of information"],
              ["cookies", "8. Cookies & local storage"],
              ["your-rights", "9. Your rights"],
              ["children", "10. Children's privacy"],
              ["transfers", "11. International data transfers"],
              ["changes", "12. Changes to this policy"],
              ["contact", "13. Contact us"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="block text-Budgexa-green/60 hover:text-Budgexa-orange transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* CONTENT */}
        <article className="prose prose-headings:font-display prose-headings:text-Budgexa-green prose-p:text-Budgexa-green/75 prose-li:text-Budgexa-green/75 max-w-none space-y-10">

          <section id="information-we-collect">
            <h2>1. Information we collect</h2>
            <p>
              <strong>Account information.</strong> Name, email address, and a
              securely hashed password. If you sign in with Google, we receive
              your name, email, and profile photo from Google.
            </p>
            <p>
              <strong>Financial information you provide.</strong> Transactions,
              budgets, savings goals, and categories you enter or import into
              Budgexa. Your selected currency and country, used to localize amounts
              and defaults.
            </p>
            <p>
              <strong>Connected bank data.</strong> If you choose to connect a
              bank account, we receive read-only account and transaction data via
              our banking data partner. Budgexa cannot move, hold, send, or withdraw
              money.
            </p>
            <p>
              <strong>Receipt images.</strong> If you upload a photo of a receipt
              or bank alert, the image is sent to our AI service provider to
              extract transaction details. <strong>The image itself is processed
              transiently and is not permanently stored by Budgexa</strong> — only
              the extracted transaction data (amount, date, merchant, category, and
              similar fields) is saved to your account.
            </p>
            <p>
              <strong>Profile image.</strong> If you upload a profile photo, it is
              stored with our image hosting provider.
            </p>
            <p>
              <strong>Communications.</strong> Messages you send us through the
              contact form or support email, including your name, email, and
              message content.
            </p>
            <p>
              <strong>Technical data.</strong> We automatically collect limited
              technical data when you use Budgexa, such as browser type, approximate
              location derived from your IP address, device information, and
              error/diagnostic logs. This helps us keep Budgexa secure and working
              properly.
            </p>
          </section>

          <section id="how-we-use">
            <h2>2. How we use your information</h2>
            <ul>
              <li>To provide, operate, and maintain your account and the Budgexa service;</li>
              <li>To generate your budgeting summaries, spending insights, and AI-generated guidance;</li>
              <li>To extract transaction details from receipts you choose to upload;</li>
              <li>To communicate with you about your account, product updates, and support requests;</li>
              <li>To detect, prevent, and address fraud, abuse, and security issues;</li>
              <li>To improve Budgexa based on aggregated, non-identifying usage patterns;</li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p>
              We will never sell your personal information. We will not use your
              data for purposes materially different from those listed above
              without your consent.
            </p>
          </section>

          <section id="ai-processing">
            <h2>3. AI processing</h2>
            <p>
              To generate insights, answer your questions, and extract data from
              receipt images, Budgexa sends relevant data — such as your transaction
              history, budget information, or an uploaded receipt image — to
              third-party AI service providers that process this data on our
              behalf.
            </p>
            <p>
              These providers are contractually restricted to processing your data
              only to deliver the AI features within Budgexa, and are not permitted
              to use your data to train their general-purpose models beyond what
              is necessary to provide the service to us.{" "}
              <em>[Confirm this against your AI provider's actual data-use terms
              before publishing — if the provider's policy differs, this section
              needs to match it exactly.]</em>
            </p>
          </section>

          <section id="legal-basis">
            <h2>4. Legal basis for processing</h2>
            <p>
              As a Nigeria-focused service, we process your data in accordance
              with the Nigeria Data Protection Act 2023 (NDPA). If you are located
              in the European Economic Area, United Kingdom, or another
              jurisdiction with its own data protection law, our legal basis for
              processing your data includes:
            </p>
            <ul>
              <li><strong>Consent</strong> — you voluntarily provide your information and connect accounts to use Budgexa;</li>
              <li><strong>Contractual necessity</strong> — to provide the service you've signed up for;</li>
              <li><strong>Legitimate interests</strong> — to operate, secure, and improve Budgexa, where not overridden by your rights;</li>
              <li><strong>Legal obligation</strong> — where required by applicable law.</li>
            </ul>
          </section>

          <section id="storage-security">
            <h2>5. Data storage & security</h2>
            <p>
              Your data is stored on secure cloud infrastructure, encrypted at
              rest and in transit using industry-standard TLS encryption. We use
              reputable third-party providers for database hosting, caching, image
              storage, and application hosting. Access to your data is restricted
              to authorized Budgexa team members only.
            </p>
            <p>
              While we take security seriously, no method of transmission over the
              internet is 100% secure. We cannot guarantee absolute security, but
              we will notify you promptly in the event of a breach affecting your
              data, as required by applicable law.
            </p>
          </section>

          <section id="retention">
            <h2>6. Data retention</h2>
            <p>
              We retain your account and financial data for as long as your
              account is active, or as needed to provide you the service. If you
              delete your account, we will delete or anonymize your personal data
              within [30] days, except where we are required to retain certain
              records by law (for example, financial or tax record-keeping
              requirements).
            </p>
          </section>

          <section id="sharing">
            <h2>7. Sharing of information</h2>
            <p>We do not sell, trade, or rent your personal information. We share data only with:</p>
            <ul>
              <li><strong>Service providers</strong> who help us operate Budgexa — including cloud hosting, database, and caching providers; email delivery providers; AI service providers; error-monitoring tools; and, if you connect a bank account, our banking data partner. These providers are contractually obligated to keep your data confidential and use it only to provide services to us.</li>
              <li><strong>Payment processors</strong>, if you subscribe to a paid plan.</li>
              <li><strong>Legal requirements</strong> — if required by law, court order, or government authority, or to protect the rights and safety of Budgexa and its users.</li>
              <li><strong>Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, your data may be transferred. We will notify you before your data becomes subject to a different privacy policy.</li>
            </ul>
          </section>

          <section id="cookies">
            <h2>8. Cookies & local storage</h2>
            <p>
              Budgexa uses cookies and browser local storage to keep you signed in
              and to remember your preferences. We use minimal, non-advertising
              analytics to understand how people use Budgexa in aggregate. We do not
              use cross-site advertising trackers. You may disable cookies in your
              browser settings, though this may affect your ability to stay signed
              in.
            </p>
          </section>

          <section id="your-rights">
            <h2>9. Your rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li><strong>Access</strong> a copy of the personal data we hold about you;</li>
              <li><strong>Correct</strong> inaccurate or incomplete data;</li>
              <li><strong>Delete</strong> your personal data;</li>
              <li><strong>Restrict or object to</strong> certain processing;</li>
              <li><strong>Port</strong> your data in a structured, machine-readable format;</li>
              <li><strong>Withdraw consent</strong> at any time, where processing is based on consent.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:[privacy email]">[privacy email]</a>. We will respond
              within 30 days. You also have the right to lodge a complaint with the
              Nigeria Data Protection Commission or your local data protection
              authority.
            </p>
          </section>

          <section id="children">
            <h2>10. Children's privacy</h2>
            <p>
              Budgexa is intended for adults managing their own finances and is not
              directed at anyone under 18. We do not knowingly collect personal
              data from anyone under 18. If we become aware that we have
              inadvertently collected such data, we will delete it promptly.
            </p>
          </section>

          <section id="transfers">
            <h2>11. International data transfers</h2>
            <p>
              Your data may be processed and stored in countries outside Nigeria,
              including where our hosting and service providers operate. We take
              steps to ensure such transfers comply with applicable data
              protection laws and that appropriate safeguards are in place.
            </p>
          </section>

          <section id="changes">
            <h2>12. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. When we do, we will
              update the "Last updated" date above. For material changes, we will
              notify you by email or in the app. Continued use of Budgexa after
              changes take effect means you accept the updated policy.
            </p>
          </section>

          <section id="contact">
            <h2>13. Contact us</h2>
            <p>
              Questions about this Privacy Policy or our data practices? Contact
              us at <a href="mailto:[privacy email]">[privacy email]</a>.
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}