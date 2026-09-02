// app/legal/terms/page.tsx
export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-Budgexa-beige">
      {/* HERO */}
      <section className="px-5 pt-28 pb-12 border-b border-Budgexa-beige-dark">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-black text-Budgexa-green leading-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-Budgexa-green/60">
            Effective August 5, 2026 <span className="mx-2">·</span>
            Please read these Terms alongside our{" "}
            <a href="/legal/privacy" className="underline hover:text-Budgexa-green">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-12 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
        {/* TOC */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-2 text-sm">
            <p className="font-semibold text-Budgexa-green mb-3">Contents</p>
            {[
              ["acceptance", "1. Acceptance of terms"],
              ["what-Budgexa-is", "2. What Budgexa is (and isn't)"],
              ["your-account", "3. Eligibility & your account"],
              ["connected-accounts", "4. Connected bank accounts"],
              ["ai-guidance", "5. AI-generated content & guidance"],
              ["receipt-scanning", "6. Receipt scanning"],
              ["acceptable-use", "7. Acceptable use"],
              ["plans-payment", "8. Plans and payment"],
              ["disclaimers", "9. Disclaimers and limitation of liability"],
              ["termination", "10. Termination"],
              ["changes", "11. Changes to these terms"],
              ["governing-law", "12. Governing law"],
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

          <section id="acceptance">
            <h2>1. Acceptance of terms</h2>
            <p>
              These Terms of Service ("Terms") govern your use of Budgexa ("Budgexa,"
              "we," "us," or "our"), operated by{" "}
              <strong>[Budgexa Legal Entity Name]</strong>. By creating an account or
              using Budgexa, you agree to these Terms and to our{" "}
              <a href="/legal/privacy">Privacy Policy</a>. If you do not agree, do
              not use Budgexa.
            </p>
          </section>

          <section id="what-Budgexa-is">
            <h2>2. What Budgexa is (and isn't)</h2>
            <p>
              Budgexa is a personal finance companion built for young Nigerians. With
              your permission, Budgexa helps you track spending, set budgets, and work
              toward savings goals, and can optionally connect to your bank account
              through our banking data partner to help you see your transactions in
              one place.
            </p>
            <p>
              <strong>Budgexa is read-only.</strong> Budgexa never moves, holds, sends, or
              withdraws your money, and does not have the ability to initiate
              payments or transfers on your behalf. Budgexa provides budgeting
              information and AI-generated insights — it is not a bank, is not a
              licensed financial advisor, and does not provide financial,
              investment, tax, or legal advice. See Section 5 for more on our AI
              features.
            </p>
          </section>

          <section id="your-account">
            <h2>3. Eligibility & your account</h2>
            <p>
              You must be at least 18 years old to use Budgexa. You are responsible
              for keeping your sign-in credentials secure and for all activity that
              happens under your account. You agree to provide accurate
              information and to use Budgexa only for lawful, personal purposes.
            </p>
          </section>

          <section id="connected-accounts">
            <h2>4. Connected bank accounts</h2>
            <p>
              If you choose to connect a bank account, you grant Budgexa read-only
              permission — via our banking data partner — to retrieve your account
              and transaction information so we can build your budgeting and
              spending picture. You can disconnect a linked account at any time
              from Settings, which revokes Budgexa's access going forward. You
              represent that you have the right to connect any account you add.
            </p>
          </section>

          <section id="ai-guidance">
            <h2>5. AI-generated content & guidance</h2>
            <p>
              Budgexa uses artificial intelligence, including third-party AI service
              providers, to generate spending insights, answer your questions, and
              (where you choose to use it) extract transaction details from
              receipt images you upload.
            </p>
            <p>
              AI-generated content is for informational and educational purposes
              only. It reflects patterns in the data you've given Budgexa and may be
              incomplete, delayed, or inaccurate. <strong>Budgexa does not provide
              investment advice, does not recommend specific stocks, crypto, or
              forex trades, and does not recommend gambling or betting products.</strong>{" "}
              You should not rely on Budgexa's AI output as your sole basis for a
              financial decision, and Budgexa does not replace advice from a licensed
              financial, tax, or legal professional.
            </p>
          </section>

          <section id="receipt-scanning">
            <h2>6. Receipt scanning</h2>
            <p>
              If you upload a photo of a receipt or bank alert, Budgexa uses AI to
              extract transaction details (such as amount, date, and merchant) and
              either automatically records the transaction or asks you to confirm
              missing details before saving. You remain responsible for reviewing
              and confirming the accuracy of any transaction before relying on it.
            </p>
          </section>

          <section id="acceptable-use">
            <h2>7. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Attempt to breach the security of Budgexa or access another user's data;</li>
              <li>Disrupt, overload, or interfere with the service;</li>
              <li>Reverse engineer, scrape, or attempt to extract Budgexa's underlying models or source code;</li>
              <li>Use Budgexa to violate any law or any third party's rights.</li>
            </ul>
          </section>

          <section id="plans-payment">
            <h2>8. Plans and payment</h2>
            <p>
              Budgexa offers a free plan and paid plans. Paid subscriptions are
              billed in your selected currency through our payment processor. You
              can cancel at any time; access continues until the end of your
              current billing period. Fees are non-refundable except where
              required by applicable law.
            </p>
          </section>

          <section id="disclaimers">
            <h2>9. Disclaimers and limitation of liability</h2>
            <p>
              Budgexa is provided "as is" without warranties of any kind. We work
              hard to be accurate, but we do not guarantee that every transaction
              is detected, categorized, or extracted correctly, and you should not
              rely on Budgexa as your sole financial record. To the maximum extent
              permitted by law, [Budgexa Legal Entity Name] is not liable for
              indirect, incidental, or consequential damages arising from your use
              of Budgexa, including decisions made based on AI-generated insights.
            </p>
          </section>

          <section id="termination">
            <h2>10. Termination</h2>
            <p>
              You can stop using Budgexa and delete your account at any time. We may
              suspend or terminate your access if you violate these Terms, or to
              protect the security and integrity of the service and its users.
            </p>
          </section>

          <section id="changes">
            <h2>11. Changes to these terms</h2>
            <p>
              We may update these Terms from time to time. When we make material
              changes, we will update the effective date above and, where
              appropriate, notify you in the app. Continued use of Budgexa after
              changes take effect means you accept the updated Terms.
            </p>
          </section>

          <section id="governing-law">
            <h2>12. Governing law</h2>
            <p>
              These Terms are governed by the laws of <strong>[Governing
              Jurisdiction — e.g. the Federal Republic of Nigeria]</strong>,
              without regard to conflict-of-law principles.
            </p>
          </section>

          <section id="contact">
            <h2>13. Contact us</h2>
            <p>
              Questions about these Terms? Contact{" "}
              <a href="mailto:[support email]">[support email]</a>.
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}