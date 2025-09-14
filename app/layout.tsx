import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/navigation/sidebar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CreatiVault - AI Marketing Intelligence Platform',
  description: 'AI-Driven Advertising Creative Monitoring and Marketing Insights Platform',
  keywords: ['ads spy', 'marketing intelligence', 'ai agent', 'advertising analysis'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className={cn(inter.className, 'h-full bg-background text-foreground antialiased')}>
        <div className="flex h-full">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}