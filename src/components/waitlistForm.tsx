// File location: app/waitlist/page.tsx
//
// This links straight out to Brevo's hosted form page instead of
// embedding it via iframe. If you get the framing issue sorted out
// (check the X-Frame-Options / CSP response header on the sibforms.com
// request in DevTools) you can swap this back to an <iframe> using the
// same URL below.

const BREVO_FORM_URL =
  "https://65f68ec3.sibforms.com/serve/MUIFAJUT2A8dV7RO-Il3PKtxfb6Tww4k6-r1LxbUfFVJACm6goBiEh-5Z18YGWlrB5Tf1PawegzRFo0K9-hPYscO3BOj_V5SxVOrOPGtBJOZg8IqRSf-Yaql0muAc17zB1q6trnhiQ8KttclDZq5WuFFHNOh2coNmp21Fvb9xtBwoHDSdTEQNMYp7z2aT2l52e4zjSFbYC1eUXOYxw==";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-Budgexa-beige flex flex-col items-center justify-center px-4 py-24">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-3xl font-bold text-Budgexa-green mb-3">
          You're early. We like that.
        </h1>
        <p className="text-Budgexa-green/70 mb-8">
          We're doing final checks before opening Budgexa up. Join the waitlist and
          we'll email you as soon as it's your turn.
        </p>

        <a
          href={BREVO_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block px-8 py-3 text-base"
        >
          Join the Waitlist
        </a>
      </div>
    </main>
  );
}