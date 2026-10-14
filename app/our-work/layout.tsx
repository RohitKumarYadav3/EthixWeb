import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work — Concept Projects & Portfolio',
  description:
    'Illustrative concept projects showing how Ethixweb approaches websites, e-commerce, B2B lead generation, and AI-enabled lead management for Indian businesses.',
};

export default function OurWorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
