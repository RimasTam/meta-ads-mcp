import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meta Ads AI Assistant',
  description: 'AI-powered Meta Ads management assistant using Kimi K2',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
