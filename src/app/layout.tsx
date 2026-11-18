import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tamal Sen - Software Engineer, Front-end & App Developer",
  description:
    "Developer devoted to creating great web experiences focused on React, NextJS and Flutter based in Bangladesh, meet Tamal Sen",
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

        {/* Google Fonts */}
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

        {/* Custom Head Styles (10 inline style blocks combined) */}
        <link rel="stylesheet" href="/assets/css/custom-head-styles.css" />

        {/* Core Head Scripts */}
        <script src="/wp-includes/js/jquery/jquery.min.js"></script>
        <script src="/wp-includes/js/jquery/jquery-migrate.min.js"></script>
        <script src="/wp-content/plugins/happy-elementor-addons/assets/vendor/dom-purify/purify.min.js"></script>
        <script src="/assets/vendor/npm/aos@2.3.4/dist/aos.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function() {
                if (typeof AOS !== 'undefined') {
                  AOS.init({ disable: window.innerWidth < 768 });
                }
                var vids = document.querySelectorAll("video");
                vids.forEach(function(v) {
                  v.muted = true;
                  var p = v.play();
                  if (p !== undefined) {
                    p.catch(function() {});
                  }
                });
              });
            `,
          }}
        />
      </head>
      <body
        className="home wp-singular page-template page-template-elementor_header_footer page page-id-21460 wp-embed-responsive wp-theme-ohio wp-child-theme-ohio-child ohio-theme-2-0-0 with-header-3 dark-scheme custom-cursor elementor-default elementor-template-full-width elementor-kit-17 elementor-page elementor-page-21460"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
