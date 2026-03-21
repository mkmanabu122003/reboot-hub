import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${SITE_DESCRIPTION}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'Jr1F1jCPEU0j-IkJHBjrENm_Uj0PTLMggf0ZNGmyHNY',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
