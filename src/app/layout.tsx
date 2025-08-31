import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./app.css";

// Adicionado: Importe seu componente de rodapé
import Footer from "../../components/footer/footer"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apollo3D",
  description: "Loja de produtos feitos em impressora 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Adicionado: Tag <main> para envolver o conteúdo principal */}
        <main>
          {children}
        </main>
        
        {/* Adicionado: O componente do rodapé no final */}
        <Footer />
      </body>
    </html>
  );
}