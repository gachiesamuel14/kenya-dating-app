import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Karibu Kenya Match | Location-Based Dating',
  description: 'Connect with people near you in Kenya. GPS matching by county, interests, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
