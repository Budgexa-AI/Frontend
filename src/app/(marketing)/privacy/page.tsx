import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  const TOC = [
    { id: "purpose-and-commitment", label: "1. Purpose and Commitment" },
    { id: "lawful-basis", label: "2. Lawful basis for processing" },
    { id: "consent", label: "3. Consent" },
    { id: "information-we-collect", label: "4. Information we collect" },
    { id: "how-we-collect", label: "5. How we collect data" },
    { id: "how-we-use", label: "6. How we use your data" },
    { id: "ai-processing", label: "7. AI processing" },
    { id: "storage-security", label: "8. Data storage & security" },
    { id: "retention", label: "9. Data retention" },
    { id: "sharing", label: "10. Sharing of information" },
    { id: "cookies", label: "11. Cookies & local storage" },
    { id: "your-rights", label: "12. Your rights" },
    { id: "children", label: "13. Children's privacy" },
    { id: "transfers", label: "14. International transfers" },
    { id: "changes", label: "15. Changes to this policy" },
    { id: "contact", label: "16. Contact us" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* HERO */}
      <section className="border-b border-[#e5e2db] bg-white pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-[#F7F5EE] px-3.5 py-1 mb-4">
            <ShieldCheck size={12} className="text-[#1b3d18]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
              Data Protection &amp; NDPA
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-tight">
            Privacy <span className="text-[#1b3d18]">Policy</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
            Last updated: August 28, 2026 <span className="mx-2">·</span>
            Please read these Terms alongside our{" "}
            <Link href="/terms" className="font-semibold text-[#1b3d18] underline hover:text-[#F5824A] transition-colors">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </section>

      {/* BODY */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
        {/* Sticky Table of Contents */}
        <nav className="hidden lg:block sticky top-24 rounded-2xl border border-[#e5e2db] bg-white p-5 shadow-xs max-h-[calc(100vh-8rem)] overflow-y-auto">
          <p className="font-serif text-sm font-bold text-[#1b3d18] mb-3 pb-2 border-b border-[#f0eee6]">
            Contents
          </p>
          <div className="space-y-1">
            {TOC.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#F5824A] hover:text-[#e06d34] hover:bg-[#F5824A]/10 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Content Articles */}
        <article className="space-y-10 text-sm sm:text-base leading-relaxed text-[#1b3d18]/80">
          
          <section id="purpose-and-commitment" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              1. Purpose and Commitment
            </h2>
            <p className="mt-4">
              Budgexa recognizes that financial data is inherently sensitive. We are committed to safeguarding personal information in strict compliance with the <strong className="text-[#1b3d18]">Nigeria Data Protection Act 2023 (NDPA)</strong> and applicable international data protection standards. This Privacy Policy sets out the categories of data we collect, the lawful bases for processing, the rights of data subjects, and the technical measures we adopt to ensure confidentiality, integrity, and accountability.
            </p>
          </section>

          <section id="lawful-basis" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              2. Lawful basis for processing
            </h2>
            <p className="mt-4">
              Budgexa processes personal data only where a lawful basis exists under the NDPA, including:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li><strong className="text-[#1b3d18]">Consent:</strong> Voluntary provision of information or connection of accounts.</li>
              <li><strong className="text-[#1b3d18]">Contractual Necessity:</strong> Provision of services requested by the data subject.</li>
              <li><strong className="text-[#1b3d18]">Legitimate Interests:</strong> Operation, security, and improvement of Budgexa, balanced against data subject rights.</li>
              <li><strong className="text-[#1b3d18]">Legal Obligation:</strong> Compliance with statutory or regulatory requirements.</li>
            </ul>
            <p className="mt-4">
              All data protection questions and requests can be directed to our privacy team at{" "}
              <a href="mailto:support@budgexa.app" className="font-semibold text-[#1b3d18] underline hover:text-[#F5824A] transition-colors">
                support@budgexa.app
              </a>.
            </p>
          </section>

          <section id="consent" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              3. Consent
            </h2>
            <p className="mt-4">
              Where we rely on your consent, you give that consent through an affirmative action, never a pre-selected default. You can withdraw consent at any time from your account settings without affecting prior lawful processing.
            </p>
          </section>

          <section id="information-we-collect" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              4. Information we collect
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                <strong className="text-[#1b3d18]">Account information:</strong> Name, email address, profile picture (if signing in via Google), and user preferences.
              </p>
              <p>
                <strong className="text-[#1b3d18]">Financial information you provide:</strong> Transactions, budgets, savings goals, categories, and selected currency.
              </p>
              <p>
                <strong className="text-[#1b3d18]">Receipt images:</strong> If you upload a photo of a receipt or bank alert, the image is processed transiently by our secure AI service provider to extract transaction details and is not permanently stored.
              </p>
              <p>
                <strong className="text-[#1b3d18]">Technical data:</strong> Limited diagnostic data such as browser type, approximate IP location, device metadata, and security error logs.
              </p>
            </div>
          </section>

          <section id="how-we-collect" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              5. How we collect your information
            </h2>
            <p className="mt-4">
              Most of what we collect, you provide directly when creating an account, recording transactions, or uploading receipts. Limited technical logs are generated automatically to protect application security and prevent fraudulent access.
            </p>
          </section>

          <section id="how-we-use" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              6. How we use your information
            </h2>
            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>To provide, operate, and maintain your Budgexa account</li>
              <li>To generate your safe-to-spend summaries, spending insights, and AI guidance</li>
              <li>To extract transaction details from receipt images you choose to upload</li>
              <li>To communicate product updates, security alerts, and support responses</li>
              <li>To detect, prevent, and address abuse, fraud, or technical vulnerabilities</li>
              <li>To comply with regulatory obligations in Nigeria</li>
            </ul>
            <div className="mt-4 rounded-xl border border-[#e5e2db] bg-[#F7F5EE] p-4 text-xs sm:text-sm font-semibold text-[#1b3d18]">
              We never sell, rent, or trade your personal or financial data to advertisers or third parties.
            </div>
          </section>

          <section id="ai-processing" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              7. AI processing
            </h2>
            <p className="mt-4">
              Budgexa uses Artificial Intelligence (AI) to generate spending insights, calculate cashflow guidance, and parse receipts. We send necessary context to our enterprise AI service provider under a strict data processing agreement.
            </p>
            <p className="mt-3">
              We have configured our enterprise accounts to <strong className="text-[#1b3d18]">opt out of having your data used to train public foundation models</strong>. Your data is used exclusively to generate real-time insights for your personal account.
            </p>
          </section>

          <section id="storage-security" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              8. Data storage &amp; security
            </h2>
            <p className="mt-4">
              Your data is stored on secure cloud infrastructure, encrypted both in transit (TLS 1.3) and at rest (AES-256). We enforce strict role-based access control and continuous security monitoring.
            </p>
          </section>

          <section id="retention" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              9. Data retention
            </h2>
            <p className="mt-4">
              We retain your data for as long as your account remains active. When you delete your account or request data removal, we purge your data within 30 days, barring statutory retention obligations.
            </p>
          </section>

          <section id="sharing" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              10. Sharing of information
            </h2>
            <p className="mt-4">We share data strictly with:</p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li><strong className="text-[#1b3d18]">Core Infrastructure Providers:</strong> Database, cloud hosting, and email delivery providers bound by non-disclosure agreements.</li>
              <li><strong className="text-[#1b3d18]">Payment Processors:</strong> Paystack, for processing subscription payments.</li>
              <li><strong className="text-[#1b3d18]">Legal Compliance:</strong> When compelled by valid legal process or statutory authority.</li>
            </ul>
          </section>

          <section id="cookies" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              11. Cookies &amp; local storage
            </h2>
            <p className="mt-4">
              Budgexa uses essential session tokens and local storage to keep you authenticated and store interface preferences. We do not use third-party cross-site ad trackers.
            </p>
          </section>

          <section id="your-rights" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              12. Your rights
            </h2>
            <p className="mt-4">Under the NDPA, you have the right to:</p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>Request access to the personal data we hold about you</li>
              <li>Rectify inaccurate or outdated records</li>
              <li>Request the erasure of your personal data</li>
              <li>Export your data in a portable, structured format (CSV/JSON)</li>
              <li>Withdraw processing consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at{" "}
              <a href="mailto:support@budgexa.app" className="font-semibold text-[#1b3d18] underline hover:text-[#F5824A] transition-colors">
                support@budgexa.app
              </a>.
            </p>
          </section>

          <section id="children" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              13. Children&apos;s privacy
            </h2>
            <p className="mt-4">
              Budgexa is built for adults managing personal finances and is not intended for anyone under 18 years of age.
            </p>
          </section>

          <section id="transfers" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              14. International data transfers
            </h2>
            <p className="mt-4">
              Where data is processed across cloud regions, we ensure appropriate data transfer safeguards and contractual clauses are in place to preserve your privacy rights.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              15. Changes to this policy
            </h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. When material updates occur, we will notify you through the app or by email.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              16. Contact us
            </h2>
            <p className="mt-4">
              For any questions regarding our Privacy Policy or data protection practices, please email us at{" "}
              <a href="mailto:support@budgexa.app" className="font-semibold text-[#1b3d18] underline hover:text-[#F5824A] transition-colors">
                support@budgexa.app
              </a>.
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}