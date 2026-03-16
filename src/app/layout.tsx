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
import PageEntrance from '../components/animation/PageEntrance';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased bg-white text-slate-900 selection:bg-indigo-400/30 film-grain">
        <PageEntrance />
        <SmoothScroll>
          <CinematicOverlay />
          <div className="page-content opacity-0">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
