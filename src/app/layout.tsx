

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Axiom-Pulse-Table',
  description: 'Real-time token discovery table - A pixel-perfect clone of Axiom Trade Pulse',
  keywords: ['crypto', 'token', 'trading', 'defi', 'solana', 'pulse'],
  authors: [{ name: 'Developer' }],
  openGraph: {
    title: 'Axiom Pulse Clone',
    description: 'Real-time token discovery table',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0c] text-white min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
