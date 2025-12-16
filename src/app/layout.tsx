import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider"; // <--- Importe
import { SiteHeader } from "@/components/site-header";   // <--- Importe

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal de Eventos Rio",
  description: "Desafio Técnico Front-end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* Envolvemos o app no Provider */}
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader /> {/* O Header fixo no topo */}
            <div className="flex-1">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}