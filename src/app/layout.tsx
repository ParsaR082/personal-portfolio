import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tamal Sen - Software Engineer, Front-end & App Developer",
  description:
    "Tamal Sen is a software engineer, front-end and app developer with a passion for building beautiful, responsive, and user-friendly digital experiences.",
  icons: {
    icon: [
      { url: "/wp-content/uploads/2021/11/cropped-favicon-32x32.png", sizes: "32x32" },
      { url: "/wp-content/uploads/2021/11/cropped-favicon-192x192.png", sizes: "192x192" },
    ],
    apple: "/wp-content/uploads/2021/11/cropped-favicon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts & Icons */}
        <link rel="stylesheet" href="/assets/fonts/google-fonts.css" />
        <link rel="stylesheet" href="/assets/vendor/npm/aos@2.3.4/dist/aos.min.css" />
        {/* Core Theme and Plugin Stylesheets */}
        <link rel="stylesheet" href="/wp-content/cache/autoptimize/css/autoptimize_a2b5b0bceca20a9b48507ecc5327809f.css" />
        <link rel="stylesheet" href="/wp-content/cache/autoptimize/css/autoptimize_single_e2468ba530df7b96269ff011844df98c.css" />
        <link rel="stylesheet" href="/wp-content/cache/autoptimize/css/autoptimize_single_4fa326c409066743e6c5a7d6ce8f7128.css" />
        <link rel="stylesheet" href="/wp-content/cache/autoptimize/css/autoptimize_single_159115307c1c774e7a7b9f80d74a81e8.css" />
        <link rel="stylesheet" href="/wp-content/cache/autoptimize/css/autoptimize_single_09ba3a95be4621714e3408982b13f140.css" />
        <link rel="stylesheet" href="/wp-content/cache/autoptimize/css/autoptimize_single_a46a0fceb4cca53c4753c5bf6e776cf6.css" />
        <link rel="stylesheet" href="/wp-content/cache/autoptimize/css/autoptimize_single_ec851c1af7799610f9364808b29ee246.css" />
        <link rel="stylesheet" href="/wp-content/cache/autoptimize/css/autoptimize_3533e8abfae64b2e36fbad13be227fb6.css" />
      </head>
      <body
        style={{ backgroundColor: "#111", color: "#fff", margin: 0, padding: 0 }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

