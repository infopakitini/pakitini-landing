import { Poppins, Tajawal } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import { OrderProvider } from "@/components/OrderProvider";
import MetaPixel from "@/components/MetaPixel";
import { PRODUCT } from "@/lib/product.config";
import "./globals.css";

// Single Poppins load covers both the display and body font roles (see
// globals.css --font-en-display / --font-en-body) — Poppins has no Arabic
// glyphs, so Tajawal below still handles the Arabic UI.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata = {
  title: `${PRODUCT.NAME} — ${PRODUCT.TAGLINE} | Cash on Delivery in the UAE`,
  description: PRODUCT.DESCRIPTION,
  metadataBase: new URL("https://example.com"), // replace with your real domain before going live
  alternates: { canonical: "/" },
  openGraph: {
    title: `${PRODUCT.NAME} — ${PRODUCT.TAGLINE}`,
    description: PRODUCT.DESCRIPTION,
    images: [PRODUCT.IMAGE],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${tajawal.variable}`}
    >
      <body>
        <MetaPixel />
        <LangProvider>
          <OrderProvider>{children}</OrderProvider>
        </LangProvider>
      </body>
    </html>
  );
}
