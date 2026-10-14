import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Field Notes on Digital Growth',
  description:
    'Practical articles on websites, AI automation, SEO, local search, design, and engineering — written for Indian businesses that want to understand what works.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
