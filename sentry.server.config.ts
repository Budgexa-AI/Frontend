import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://f0c90cbf67ae90ce3351e8f5ac100c47@o4511406333427712.ingest.de.sentry.io/4511577387565136",
  tracesSampleRate: isProd ? 0.1 : 1,
  enableLogs: !isProd,
  sendDefaultPii: true,
});
