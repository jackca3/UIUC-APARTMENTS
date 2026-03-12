import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { AuthModalProvider } from '@/contexts/auth-modal-context';
import { AuthModal } from '@/components/auth-modal';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apt.ly - UIUC Apartment Discovery',
  description: 'Verified reviews and transparent housing for UIUC students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthModalProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <AuthModal />
            <Toaster />
          </AuthModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
