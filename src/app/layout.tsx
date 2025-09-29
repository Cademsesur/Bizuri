import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bizuri - Automatisez vos communications clients",
  description: "Automatisez vos campagnes WhatsApp et Telegram, fidélisez votre clientèle et boostez vos ventes en quelques clics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
