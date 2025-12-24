import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const graffiti = localFont({
  src: "../../fonts/GRAFFITI.ttf",
  variable: "--font-graffiti",
  display: "swap",
});

const superPixel = localFont({
  src: "../../fonts/Super Pixel Personal Use.ttf",
  variable: "--font-super-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meu Portfólio Pessoal",
  description: "Portfólio pessoal de Lucas Nobre, focado em front-end e interfaces elegantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${graffiti.variable} ${superPixel.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
