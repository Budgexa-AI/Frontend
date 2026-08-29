import Link from "next/link";

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
            Last updated: August 28, 2026 <span className="mx-2">·</span>
            <Link href="/terms" className="underline hover:text-Budgexa-green">
              Terms of Service
            </Link>
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-12 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
        {/* TOC */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-2 text-sm">
            <p className="font-semibold text-Budgexa-green mb-3">Contents</p>
            {[
              ["purpose-and-commitment", "1. Purpose and Commitment"],
              ["lawful-basis", "2. Lawful basis for processing"],
              ["consent", "3. Consent"],
              ["information-we-collect", "4. Information we collect"],
              ["how-we-collect", "5. How we collect your information"],
              ["how-we-use", "6. How we use your information"],
              ["ai-processing", "7. AI processing"],
              ["storage-security", "8. Data storage & security"],
              ["retention", "9. Data retention"],
              ["sharing", "10. Sharing of information"],
              ["cookies", "11. Cookies & local storage"],
              ["your-rights", "12. Your rights"],
              ["children", "13. Children's privacy"],
              ["transfers", "14. International data transfers"],
              ["changes", "15. Changes to this policy"],
              ["contact", "16. Contact us"],
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

          <section id="purpose-and-commitment">
            <h2>1. Purpose and Commitment</h2>
            <p>
              Budgexa recognizes that financial data is inherently sensitive. We are committed to safeguarding personal information in strict compliance with the Nigeria Data Protection Act 2023 (NDPA) and applicable international data protection laws. This Privacy Policy sets out the categories of data we collect, the lawful bases for processing, the rights of data subjects, and the measures we adopt to ensure confidentiality, integrity, and accountability.
            </p>
          </section>

          <section id="lawful-basis">
            <h2>2. Lawful basis for processing</h2>
            <p>
              Budgexa processes personal data only where a lawful basis exists under the NDPA, including:
            </p>
            <ul>
              <li><strong>Consent:</strong> Voluntary provision of information or connection of accounts.</li>
              <li><strong>Contractual Necessity:</strong> Provision of services requested by the data subject.</li>
              <li><strong>Legitimate Interests:</strong> Operation, security, and improvement of Budgexa, balanced against data subject rights.</li>
              <li><strong>Legal Obligation:</strong> Compliance with statutory or regulatory requirements.</li>
            </ul>
            <p>
              If you are located in the European Economic Area, United Kingdom, or another jurisdiction with its own data protection law, these same bases apply to processing of your data under that law as well.
            </p>
            <p>
              Budgexa&apos;s current scale of data processing does not meet the NDPA&apos;s threshold for classification as a Data Controller or Data Processor of Major Importance. As a result, we have not yet appointed a Data Protection Officer or registered with the Nigeria Data Protection Commission (NDPC). We will do so if and when applicable thresholds are met. In the meantime, all data protection questions and requests can be directed to{" "}
              <a href="mailto:support@budgexa.app" className="underline hover:text-Budgexa-green">support@budgexa.app</a>.
            </p>
          </section>

          <section id="consent">
            <h2>3. Consent</h2>
            <p>
              Where we rely on your consent, for example to connect a bank account once that feature is available, or to send you optional insights, you give that consent through an affirmative action, not a pre-selected default. You can withdraw consent at any time from your account settings. Withdrawing consent doesn&apos;t affect the lawfulness of processing that already happened before the withdrawal, and may mean we can no longer provide certain features until consent is given again.
            </p>
          </section>

          <section id="information-we-collect">
            <h2>4. Information we collect</h2>
            <p>
              <strong>Account information.</strong> Name, email address, location, spending patterns. If you sign in with Google, we receive your name, email, and profile photo from Google.
            </p>
            <p>
              <strong>Financial information you provide.</strong> Transactions, budgets, savings goals, and categories you enter or import into Budgexa. Your selected currency and country, used to localize amounts and defaults.
            </p>
            <p>
              <strong>Receipt images.</strong> If you uploaded a photo of a receipt or bank alert, the image is sent to our AI service provider to extract transaction details. The image itself is processed transiently and is not permanently stored by Budgexa, only the extracted transaction data (amount, date, merchant, category, and similar fields) is saved to your account.
            </p>
            <p>
              <strong>Profile image.</strong> If you upload a profile photo, it is stored with our image hosting provider.
            </p>
            <p>
              <strong>Communications.</strong> Messages you send us through the contact form or support email, including your name, email, and message content.
            </p>
            <p>
              <strong>Technical data.</strong> We automatically collect limited technical data when you use Budgexa, such as browser type, approximate location derived from your IP address, device information, and error/diagnostic logs. This helps us keep Budgexa secure and working properly.
            </p>
          </section>

          <section id="how-we-collect">
            <h2>5. How we collect your information</h2>
            <p>
              Most of what we collect, you give us directly: when you create an account, enter a transaction, or upload a receipt. We also collect some information indirectly and automatically, such as the technical data described above, generated as you use the app. We do not currently receive data from a connected bank account, since bank connectivity is not yet live (see Section 10).
            </p>
          </section>

          <section id="how-we-use">
            <h2>6. How we use your information</h2>
            <ul>
              <li>To provide, operate, and maintain your account and the Budgexa service</li>
              <li>To generate your budgeting summaries, spending insights, and AI-generated guidance</li>
              <li>To extract transaction details from receipts you choose to upload</li>
              <li>To communicate with you about your account, product updates, and support requests</li>
              <li>To detect, prevent, and address fraud, abuse, and security issues</li>
              <li>To improve Budgexa based on aggregated, non-identifying usage patterns</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p>
              We will never sell your personal information. We will not use your data for purposes materially different from those listed above without your consent.
            </p>
          </section>

          <section id="ai-processing">
            <h2>7. AI processing</h2>
            <p>
              Budgexa uses Artificial Intelligence (AI) to generate spending insights, answer your questions, and (where you choose to use it) extract transaction details from receipt images. To do this, we send relevant data, such as your transaction history, budget information, or an uploaded receipt image, to a third-party AI service provider that processes this data on our behalf.
            </p>
            <p>
              Our AI service provider processes this data under its standard terms of service and an incorporated data processing agreement, under which it acts as a data processor for your transaction and budget data. We have configured our account with this provider to opt out of having your data used to train its general-purpose AI models. Your data is used only to deliver the AI features described in this section.
            </p>
            <p>
              If we introduce an in-app feedback control (such as a thumbs up or thumbs down) on AI-generated content, we will update this policy before that feature launches, since feedback you provide directly to our AI service provider may be used by them for model training regardless of our general opt-out.
            </p>
            <p>
              For processing that could carry higher risk to your rights, we carry out an internal data privacy impact assessment before that processing begins, in line with the NDPA.
            </p>
          </section>

          <section id="storage-security">
            <h2>8. Data storage &amp; security</h2>
            <p>
              Your data is stored on secure cloud infrastructure, encrypted at rest and in transit using industry-standard Transport Layer Security (TLS) encryption. We use reputable third-party providers for database hosting, caching, image storage, and application hosting. Access to your data is restricted to authorized Budgexa team members only.
            </p>
            <p>
              While we take security seriously, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p>
              If a personal data breach is likely to result in a risk to your rights and freedoms, we will notify the Nigeria Data Protection Commission within 72 hours of becoming aware of the breach, describing its nature, the categories and approximate numbers of data subjects and records affected, likely consequences, and the measures we have taken or propose to take. Where the breach is likely to result in a high risk to your rights and freedoms, we will also notify you directly and without undue delay, in clear and plain language, with the same details and any steps you can take to protect yourself.
            </p>
            <p>
              We maintain an internal breach response procedure and a log of security incidents to support this process.
            </p>
          </section>

          <section id="retention">
            <h2>9. Data retention</h2>
            <p>
              We retain your data for as long as your account is active, or as may be needed, to provide you the services. If your free trial ends and you do not subscribe to a paid plan, your access is paused but your data are retained for 90 days, giving you time to subscribe and pick up where you left off.
            </p>
            <p>
              If you do not subscribe to the paid plan within the 90-day window, deleted your account personally or requested the deletion of your data, we will delete the data within 30 days, provided there is no need for specific statutory or contractual obligations to justify retention.
            </p>
          </section>

          <section id="sharing">
            <h2>10. Sharing of information</h2>
            <p>We do not sell, trade, or rent your personal information. We share data only with:</p>
            <ul>
              <li><strong>Service providers</strong> who help us operate Budgexa, including cloud hosting, database, and caching providers; email delivery providers; AI service providers; and error-monitoring tools. These providers are contractually obligated to keep your data confidential and use it only to provide services to us.</li>
              <li><strong>Payment processors</strong>, if you subscribe to a paid plan.</li>
              <li><strong>Legal requirements</strong>, if required by law, court order, or government authority, or to protect the rights and safety of Budgexa and its users.</li>
              <li><strong>Business transfers</strong>, in the event of a merger, acquisition, or sale of assets, your data may be transferred. We will notify you before your data becomes subject to a different privacy policy.</li>
            </ul>
          </section>

          <section id="cookies">
            <h2>11. Cookies &amp; local storage</h2>
            <p>
              Budgexa uses cookies and browser local storage to keep you signed in and to remember your preferences. We use minimal, non-advertising analytics to understand how people use Budgexa in aggregate. We do not use cross-site advertising trackers. You may disable cookies in your browser settings, though this may affect your ability to stay signed in.
            </p>
          </section>

          <section id="your-rights">
            <h2>12. Your rights</h2>
            <p>Depending on your location, you have the right to:</p>
            <ul>
              <li>Access a copy of the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your personal data</li>
              <li>Restrict or object to certain processing</li>
              <li>Port your data in a structured, machine-readable format</li>
              <li>Withdraw consent at any time, where processing is based on consent</li>
              <li>Request human review of any AI-generated output that meaningfully affects your account, though Budgexa&apos;s AI features are informational and do not make automated decisions with legal or similarly significant effects on you</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:support@budgexa.app" className="underline hover:text-Budgexa-green">support@budgexa.app</a>. We will respond within 30 days. You also have the right to lodge a complaint with the Nigeria Data Protection Commission or your local data protection authority.
            </p>
          </section>

          <section id="children">
            <h2>13. Children&apos;s privacy</h2>
            <p>
              Budgexa is intended for adults managing their own finances and is not directed at anyone under 18. We do not knowingly collect personal data from anyone under 18. If we become aware that we have inadvertently collected such data, we will delete it promptly.
            </p>
          </section>

          <section id="transfers">
            <h2>14. International data transfers</h2>
            <p>
              Your data may be processed and stored in countries outside Nigeria, including where our hosting and service providers operate. We take steps to ensure such transfers comply with applicable data protection laws and that appropriate safeguards are in place. For our AI service provider, this transfer is covered by standard contractual clauses incorporated into our agreement with that provider. We are in the process of putting equivalent safeguards in place with our other service providers, and will complete this before your data is transferred to any provider that does not yet have them.
            </p>
          </section>

          <section id="changes">
            <h2>15. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we do, we will update the &quot;Last updated&quot; date above. For material changes, we will notify you by email or in the app; continued use of Budgexa after changes took effect, signifies your acceptance of the updated policy.
            </p>
          </section>

          <section id="contact">
            <h2>16. Contact us</h2>
            <p>
              Questions about this Privacy Policy or our data practices? Contact us at{" "}
              <a href="mailto:support@budgexa.app" className="underline hover:text-Budgexa-green">support@budgexa.app</a>.
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}