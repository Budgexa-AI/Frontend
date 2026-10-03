import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function TermsOfServicePage() {
  const TOC = [
    { id: "acceptance", label: "1. Acceptance of terms" },
    { id: "what-Budgexa-is", label: "2. What Budgexa is (and isn't)" },
    { id: "your-account", label: "3. Eligibility & your account" },
    { id: "connected-accounts", label: "4. Connected bank accounts" },
    { id: "ai-guidance", label: "5. AI content & guidance" },
    { id: "receipt-scanning", label: "6. Receipt scanning" },
    { id: "acceptable-use", label: "7. Acceptable use" },
    { id: "plans-payment", label: "8. Plans and payment" },
    { id: "disclaimers", label: "9. Limitation of liability" },
    { id: "termination", label: "10. Termination" },
    { id: "changes", label: "11. Changes to terms" },
    { id: "governing-law", label: "12. Governing law" },
    { id: "contact", label: "13. Contact us" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      {/* HERO */}
      <section className="border-b border-[#e5e2db] bg-white pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-[#F7F5EE] px-3.5 py-1 mb-4">
            <Sparkles size={12} className="text-[#1b3d18]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
              Legal &amp; Compliance
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-tight">
            Terms of <span className="text-[#1b3d18]">Service</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
            Effective August 5, 2026 <span className="mx-2">·</span>
            Please read these Terms alongside our{" "}
            <Link href="/privacy" className="font-semibold text-[#1b3d18] underline hover:text-[#F5824A] transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* BODY */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
        {/* Sticky Table of Contents */}
        <nav className="hidden lg:block sticky top-24 rounded-2xl border border-[#e5e2db] bg-white p-5 shadow-xs">
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
          
          <section id="acceptance" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              1. Acceptance of terms
            </h2>
            <p className="mt-4">
              These Terms of Service (&quot;Terms&quot;) govern your use of Budgexa (&quot;Budgexa,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated by{" "}
              <strong className="text-[#1b3d18]">Budgexa Technologies Ltd</strong>. By creating an account or
              using Budgexa, you agree to these Terms and to our{" "}
              <Link href="/privacy" className="font-semibold text-[#1b3d18] underline hover:text-[#F5824A] transition-colors">
                Privacy Policy
              </Link>
              . If you do not agree, do not use Budgexa.
            </p>
          </section>

          <section id="what-Budgexa-is" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              2. What Budgexa is (and isn&apos;t)
            </h2>
            <p className="mt-4">
              Budgexa is a personal finance companion built for young adults and professionals in Nigeria. With
              your permission, Budgexa helps you track spending, set budgets, and work toward savings goals, and can optionally connect to your bank account through our secure banking data partner to help you see your transactions in one place.
            </p>
            <div className="mt-4 rounded-xl border border-[#e5e2db] bg-[#F7F5EE] p-4 text-xs sm:text-sm text-[#1b3d18]/85">
              <strong className="block text-[#1b3d18] font-bold mb-1">Budgexa is read-only &amp; non-custodial:</strong>
              Budgexa never moves, holds, sends, or withdraws your money, and does not have the ability to initiate payments or transfers on your behalf. Budgexa provides budgeting information and AI-generated insights — it is not a bank, is not a licensed financial advisor, and does not provide formal investment, tax, or legal advice.
            </div>
          </section>

          <section id="your-account" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              3. Eligibility &amp; your account
            </h2>
            <p className="mt-4">
              You must be at least 18 years old to use Budgexa. You are responsible
              for keeping your sign-in credentials secure and for all activity that
              happens under your account. You agree to provide accurate
              information and to use Budgexa only for lawful, personal purposes.
            </p>
          </section>

          <section id="connected-accounts" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              4. Connected bank accounts
            </h2>
            <p className="mt-4">
              If you choose to connect a bank account, you grant Budgexa read-only
              permission — via our banking data partner — to retrieve your account
              and transaction information so we can build your budgeting and
              spending picture. You can disconnect a linked account at any time
              from Settings, which revokes Budgexa&apos;s access going forward. You
              represent that you have the right to connect any account you add.
            </p>
          </section>

          <section id="ai-guidance" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              5. AI-generated content &amp; guidance
            </h2>
            <p className="mt-4">
              Budgexa uses artificial intelligence, including third-party AI service
              providers, to generate spending insights, answer your questions, and
              (where you choose to use it) extract transaction details from
              receipt images you upload.
            </p>
            <p className="mt-3">
              AI-generated content is for informational and educational purposes
              only. It reflects patterns in the data you&apos;ve given Budgexa and may be
              incomplete, delayed, or inaccurate. <strong className="text-[#1b3d18]">Budgexa does not provide
              investment advice, does not recommend specific stocks, crypto, or
              forex trades, and does not recommend gambling or betting products.</strong>{" "}
              You should not rely on Budgexa&apos;s AI output as your sole basis for a
              financial decision, and Budgexa does not replace advice from a licensed
              financial, tax, or legal professional.
            </p>
          </section>

          <section id="receipt-scanning" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              6. Receipt scanning
            </h2>
            <p className="mt-4">
              If you upload a photo of a receipt or bank alert, Budgexa uses AI to
              extract transaction details (such as amount, date, and merchant) and
              either automatically records the transaction or asks you to confirm
              missing details before saving. You remain responsible for reviewing
              and confirming the accuracy of any transaction before relying on it.
            </p>
          </section>

          <section id="acceptable-use" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              7. Acceptable use
            </h2>
            <p className="mt-4">You agree not to:</p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>Attempt to breach the security of Budgexa or access another user&apos;s data;</li>
              <li>Disrupt, overload, or interfere with the service;</li>
              <li>Reverse engineer, scrape, or attempt to extract Budgexa&apos;s underlying models or source code;</li>
              <li>Use Budgexa to violate any applicable Nigerian or international laws.</li>
            </ul>
          </section>

          <section id="plans-payment" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              8. Plans and payment
            </h2>
            <p className="mt-4">
              Budgexa offers a 30-day free trial followed by paid subscription options (Monthly at ₦3,500/mo or Yearly at ₦30,000/yr). Subscriptions are billed through our verified payment processor, Paystack. You can cancel at any time directly from your account settings; your access continues until the end of your billing cycle.
            </p>
          </section>

          <section id="disclaimers" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              9. Disclaimers and limitation of liability
            </h2>
            <p className="mt-4">
              Budgexa is provided &quot;as is&quot; without warranties of any kind. We work
              hard to be accurate, but we do not guarantee that every transaction
              is detected, categorized, or extracted correctly. To the maximum extent permitted by law, Budgexa Technologies Ltd is not liable for indirect, incidental, or consequential damages arising from your use of the platform.
            </p>
          </section>

          <section id="termination" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              10. Termination
            </h2>
            <p className="mt-4">
              You can stop using Budgexa and delete your account at any time. We may
              suspend or terminate your access if you violate these Terms, or to
              protect the security and integrity of the service and its users.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              11. Changes to these terms
            </h2>
            <p className="mt-4">
              We may update these Terms from time to time. When we make material
              changes, we will update the effective date above and, where
              appropriate, notify you in the app or via email.
            </p>
          </section>

          <section id="governing-law" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              12. Governing law
            </h2>
            <p className="mt-4">
              These Terms are governed by the laws of the <strong className="text-[#1b3d18]">Federal Republic of Nigeria</strong>,
              without regard to conflict-of-law principles.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24 rounded-2xl border border-[#e5e2db] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] pb-3 border-b border-[#f0eee6]">
              13. Contact us
            </h2>
            <p className="mt-4">
              Have questions regarding these Terms? Contact us anytime at{" "}
              <a href="mailto:support@budgexa.app" className="font-semibold text-[#1b3d18] underline hover:text-[#F5824A] transition-colors">
                support@budgexa.app
              </a>
              .
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}