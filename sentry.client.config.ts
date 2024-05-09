// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://6d1f46867b57c7d3781f22a992633e00@o4507043919233024.ingest.us.sentry.io/4507111158906880",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      colorScheme: "dark",
      showName: true,
      isNameRequired: true,
      isEmailRequired: true,
      showBranding: true,
      buttonLabel: "不具合の報告はこちら",
      formTitle: "不具合の報告フォーム",
      nameLabel: "名前",
      namePlaceholder: "名前を書いてください。",
      emailLabel: "メールアドレス",
      emailPlaceholder: "メールアドレスを書いてください。",
      messageLabel: "不具合の内容",
      messagePlaceholder: "不具合の内容を書いてください。",
      submitButtonLabel: "不具合を報告",
      cancelButtonLabel: "キャンセル",
      themeDark: {
        submitBorder: "#6181bc",
        submitBackground: "#6181bc",
        submitBackgroundHover: "#688bcc",
      },
    }),
  ],
});
