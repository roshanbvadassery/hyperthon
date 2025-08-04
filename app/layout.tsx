import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Hyperthon.org - The Ultimate Coding Competition Tour',
  description: 'Join the nationwide speed coding competition. We tour every city to find the fastest, most skilled programmers. Where coding meets esports.',
  keywords: ['coding competition', 'programming contest', 'speed coding', 'esports', 'hackathon', 'tournament'],
  authors: [{ name: 'Hyperthon Team' }],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Hyperthon.org - The Ultimate Coding Competition Tour',
    description: 'Join the nationwide speed coding competition. We tour every city to find the fastest, most skilled programmers.',
    type: 'website',
    url: 'https://hyperthon.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyperthon.org - The Ultimate Coding Competition Tour',
    description: 'Join the nationwide speed coding competition. We tour every city to find the fastest, most skilled programmers.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
