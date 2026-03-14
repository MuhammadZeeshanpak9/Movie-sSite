import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'You Are The Main Character',
  description: 'The world\'s greatest movie about you begins now.',
};

import CinematicOverlay from '@/components/ui/CinematicOverlay';
import SmoothScroll from '@/components/ui/SmoothScroll';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased bg-black text-white selection:bg-indigo-400/30">
        <SmoothScroll>
          <CinematicOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
