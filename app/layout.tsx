import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Galerie Přívěsků",
  description: "Osobní galerie a návrhy 3D tištěných přívěsků",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}
      >
        {/* --- NOVÉ: GLOBÁLNÍ NAVIGACE (START) --- */}
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link 
              href="/" 
              className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-80 transition-opacity"
            >
              3D Galerie
            </Link>
            
            <nav className="flex gap-4 md:gap-8 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Galerie
              </Link>
              <Link href="/navrhnout" className="text-blue-600 hover:text-purple-600 transition-colors font-semibold">
                Navrhnout
              </Link>
              <Link href="/about" className="hover:text-blue-600 transition-colors">
                O autorovi
              </Link>
            </nav>
          </div>
        </header>
        {/* --- NOVÉ: GLOBÁLNÍ NAVIGACE (KONEC) --- */}

        {children}
      </body>
    </html>
  );
}