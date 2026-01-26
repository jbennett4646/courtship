import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="https://assets.co.dev/ba0d4dc8-2012-4d82-94f5-65cb468b94f3/favicon-318ab14.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://assets.co.dev/ba0d4dc8-2012-4d82-94f5-65cb468b94f3/favicon-32x32-e73af55.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://assets.co.dev/ba0d4dc8-2012-4d82-94f5-65cb468b94f3/favicon-16x16-9a1d6b0.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://assets.co.dev/ba0d4dc8-2012-4d82-94f5-65cb468b94f3/apple-touch-icon-99a52ce.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://assets.co.dev/ba0d4dc8-2012-4d82-94f5-65cb468b94f3/android-chrome-192x192-8ddc9f4.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://assets.co.dev/ba0d4dc8-2012-4d82-94f5-65cb468b94f3/android-chrome-512x512-6faf59e.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <Script src="https://assets.co.dev/files/codevscript.js" strategy="afterInteractive" />
        <NextScript />
      </body>
    </Html>
  );
}