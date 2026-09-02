// This file configures the initialization of Sentry on the client.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProd = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: "https://f0c90cbf67ae90ce3351e8f5ac100c47@o4511406333427712.ingest.de.sentry.io/4511577387565136",

  integrations: isProd ? [Sentry.replayIntegration()] : [],

  tracesSampleRate: isProd ? 0.1 : 1,
  enableLogs: !isProd,

  replaysSessionSampleRate: isProd ? 0.01 : 0.1,
  replaysOnErrorSampleRate: isProd ? 0.5 : 1.0,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
