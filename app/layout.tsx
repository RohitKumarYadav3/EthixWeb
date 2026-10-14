import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/site/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ethixweb.com'),
  title: {
    default: 'Ethixweb India — Web Design, SEO & Digital Growth for Indian Businesses',
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
  authors: [{ name: 'Ethixweb India' }],
  creator: 'Ethixweb India',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Ethixweb India — Web Design, SEO & Digital Growth for Indian Businesses',
    description:
      'Fast, conversion-focused websites and digital systems for Indian businesses. Web design, SEO, AI automation, WhatsApp workflows, and more.',
    siteName: 'Ethixweb India',
    images: [
      {
        url: '/ethixweb-og.png',
        width: 422,
        height: 63,
        alt: 'Ethixweb India',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
