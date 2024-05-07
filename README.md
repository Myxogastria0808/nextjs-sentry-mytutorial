# Sentry を Next.js に導入する

## Sentry

## パッケージマネージャー

- npm

## セットアップコマンド

```shell
npx @sentry/wizard@latest -i nextjs
```

## 作成するファイル

※マニュアルセットアップの時に役に立つ

> [!TIP]
> Manual Setup をする場合は、これらのファイルを手動で作成する必要がある

## `sentry.client.config.mjs`

```typescript
// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "<作成したプロジェクトのDSN>",

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
  ],
});
```

## `sentry.edge.config.mjs`

```typescript
// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "<作成したプロジェクトのDSN>",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
```

## `sentry.server.config.mjs`

```typescript
// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "<作成したプロジェクトのDSN>",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});
```

## `.sentryclirc`

> [!CAUTION] > `.sentryclirc`は、絶対に push してはいけません。

```.sentryclirc
[auth]
token=

```

## Sentry の通知が正常に届いているかのテスト

以下、用意するファイル

### `src/app/sentry-example-page/page.jsx`

```jsx
"use client";

import Head from "next/head";
import * as Sentry from "@sentry/nextjs";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Sentry Onboarding</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>

      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "4rem", margin: "14px 0" }}>
          <svg
            style={{
              height: "1em",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 44"
          >
            <path
              fill="currentColor"
              d="M124.32,28.28,109.56,9.22h-3.68V34.77h3.73V15.19l15.18,19.58h3.26V9.22h-3.73ZM87.15,23.54h13.23V20.22H87.14V12.53h14.93V9.21H83.34V34.77h18.92V31.45H87.14ZM71.59,20.3h0C66.44,19.06,65,18.08,65,15.7c0-2.14,1.89-3.59,4.71-3.59a12.06,12.06,0,0,1,7.07,2.55l2-2.83a14.1,14.1,0,0,0-9-3c-5.06,0-8.59,3-8.59,7.27,0,4.6,3,6.19,8.46,7.52C74.51,24.74,76,25.78,76,28.11s-2,3.77-5.09,3.77a12.34,12.34,0,0,1-8.3-3.26l-2.25,2.69a15.94,15.94,0,0,0,10.42,3.85c5.48,0,9-2.95,9-7.51C79.75,23.79,77.47,21.72,71.59,20.3ZM195.7,9.22l-7.69,12-7.64-12h-4.46L186,24.67V34.78h3.84V24.55L200,9.22Zm-64.63,3.46h8.37v22.1h3.84V12.68h8.37V9.22H131.08ZM169.41,24.8c3.86-1.07,6-3.77,6-7.63,0-4.91-3.59-8-9.38-8H154.67V34.76h3.8V25.58h6.45l6.48,9.2h4.44l-7-9.82Zm-10.95-2.5V12.6h7.17c3.74,0,5.88,1.77,5.88,4.84s-2.29,4.86-5.84,4.86Z M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z"
            ></path>
          </svg>
        </h1>

        <p>Get started by sending us a sample error:</p>
        <button
          type="button"
          style={{
            padding: "12px",
            cursor: "pointer",
            backgroundColor: "#AD6CAA",
            borderRadius: "4px",
            border: "none",
            color: "white",
            fontSize: "14px",
            margin: "18px",
          }}
          onClick={() => {
            Sentry.startSpan(
              {
                name: "Example Frontend Span",
                op: "test",
              },
              async () => {
                const res = await fetch("/api/sentry-example-api");
                if (!res.ok) {
                  throw new Error("Sentry Example Frontend Error");
                }
              }
            );
          }}
        >
          Throw error!
        </button>

        <p>
          Next, look for the error on the{" "}
          <a href="https://myxogastria0808.sentry.io/issues/?project=4507111158906880">
            Issues Page
          </a>
          .
        </p>
        <p style={{ marginTop: "24px" }}>
          For more information, see{" "}
          <a href="https://docs.sentry.io/platforms/javascript/guides/nextjs/">
            https://docs.sentry.io/platforms/javascript/guides/nextjs/
          </a>
        </p>
      </main>
    </div>
  );
}
```

### `src/app/api/sentry-example-api/route.js`

```javascript
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// A faulty API route to test Sentry's error monitoring
export function GET() {
  throw new Error("Sentry Example API Route Error");
  return NextResponse.json({ data: "Testing Sentry Error..." });
}
```

# User Feedback

### `sentry.client.config.ts`

※一部省略している。

```typescript
Sentry.init({
  ...
  integrations: [
    ...
    Sentry.feedbackIntegration({
      colorScheme: "system",
      //名前は必ず必要かどうか
      isNameRequired: true,
      //メールは必ず必要かどうか
      isEmailRequired: true,
    }),
  ],
});
```

# GitHub Action

### `.github/workflows/sentry.yaml`

#### 環境変数についてのメモ

`SENTRY_AUTH_TOKEN` 作成した Custom Integrations で自分で作成した TOKENS を使う

`SENTRY_ORG` organization の名前をそのまま使う

`SENTRY_PROJECT:` 各 Project の詳細ページの URL の`~project=`以下を使う

詳細ページの URL: `https://<Organization 名>.sentry.io/projects/<Project 名>/?project=<SENTRY_PROJECT に入れる環境変数に当たる部分>`

```yaml
name: Sentry

on:
  push:
    branches: ["main"]
  workflow_dispatch:

jobs:
  sentry:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Create Sentry release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
        with:
          environment: production
```
