import '@/app/globals.css';
import { ReactNode } from 'react';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export const metadata = {
  title: 'NoteHub',
  description: 'Manage you personal notes',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TanStackProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}