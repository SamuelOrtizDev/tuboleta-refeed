import type { Metadata } from "next";
import { Montserrat, Red_Hat_Display } from "next/font/google";
import AvisoPrototipo from "@/components/layout/AvisoPrototipo";
import { CompraProvider } from "@/context/CompraContext";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const redHat = Red_Hat_Display({
  variable: "--font-red-hat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tuboleta (prototipo académico)",
    template: "%s | Tuboleta (prototipo académico)",
  },
  description:
    "Prototipo académico de una boletería de eventos. No es el sitio oficial de TuBoleta.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CO"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${redHat.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <CompraProvider>{children}</CompraProvider>
        <AvisoPrototipo />
      </body>
    </html>
  );
}
