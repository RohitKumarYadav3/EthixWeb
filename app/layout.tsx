import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/site/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ethixweb.com'),
  title: {
    default: 'Ethixweb - We run the tech. You run the business.',
    template: '%s | Ethixweb India',
  },
  description:
    'Ethixweb India builds fast, conversion-focused websites and digital systems for Indian businesses — web design, SEO, Google Business Profile, AI automation, WhatsApp workflows, CRM, and analytics.',
  keywords: [
    'web design India',
    'SEO India',
    'digital agency India',
    'website development',
    'Google Business Profile',
    'AI automation',
    'WhatsApp business',
    'CRM integration',
    'Ethixweb',
  ],
  authors: [{ name: 'Ethixweb' }],
  creator: 'Ethixweb',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Ethixweb — Web Design, SEO & Digital Growth for Indian Businesses',
    description:
      'Fast, conversion-focused websites and digital systems for Indian businesses. Web design, SEO, AI automation, WhatsApp workflows, and more.',
    siteName: 'Ethixweb',
    images: [
      {
        url: '/ethixweb-og.png',
        width: 422,
        height: 63,
        alt: 'Ethixweb',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethixweb India — Web Design & Digital Growth',
    description:
      'Fast, conversion-focused websites and digital systems for Indian businesses.',
    images: ['/ethixweb-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
