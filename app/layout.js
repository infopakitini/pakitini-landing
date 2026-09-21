import { Montserrat, Inter, Tajawal } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import { OrderProvider } from "@/components/OrderProvider";
import { PRODUCT } from "@/lib/product.config";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "600", "700"],
  variable: "--font-en-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-en-body",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-ar",
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
      className={`${montserrat.variable} ${inter.variable} ${tajawal.variable}`}
    >
      <body>
        <LangProvider>
          <OrderProvider>{children}</OrderProvider>
        </LangProvider>
      </body>
    </html>
  );
}
