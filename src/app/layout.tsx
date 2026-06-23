import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Celebration Gallery - Making Delhi\'s Parties Pop',
  description: 'Delhi NCR\'s premium destination for high-octane events, maximalist party setups, and vibrant memories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${dmSans.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen bg-background-off-white text-text-dark font-sans overflow-x-hidden">
        <Header />
        <main className="flex-grow flex flex-col justify-start w-full relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
