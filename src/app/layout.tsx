import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({ variable: "--f-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const sans = DM_Sans({ variable: "--f-sans", subsets: ["latin"] });
const mono = DM_Mono({ variable: "--f-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Hizby Fauzan 'Aisyi | Portofolio",
  description:
    "Portofolio interaktif Hizby Fauzan 'Aisyi: dunia 3D dari ribuan partikel yang bereaksi terhadap scroll dan kursor.",
  openGraph: {
    title: "Hizby Fauzan 'Aisyi | Portofolio",
    description: "Dunia 3D dari ribuan partikel. Scroll untuk masuk.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#eeebe3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
