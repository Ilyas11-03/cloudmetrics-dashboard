// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; // <-- Import ajouté

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CloudMetrics - Monitoring Dashboard",
  description: "Plateforme de monitoring Cloud en temps réel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // On enveloppe toute l'app avec ClerkProvider
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}