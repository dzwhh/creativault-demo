import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  AdsIcon,
  ProductIcon,
  UsersIcon,
  AppWindowIcon,
  FilmIcon,
  BrainCircuitIcon,
} from '@/components/icons';

interface QuickLink {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType;
  gradient?: string;
}

const quickLinks: QuickLink[] = [
  { title: 'Find Ads', desc: 'Cross-platform trending and fresh advertising creatives', href: '/big-spy/ads', icon: AdsIcon, gradient: 'from-pink-500/20 to-purple-500/20' },
  { title: 'Find Products', desc: 'High-potential winning products and category trends', href: '/big-spy/product', icon: ProductIcon, gradient: 'from-amber-500/20 to-red-500/20' },
  { title: 'Find Creators', desc: 'Creator & KOL creative performance and data profiles', href: '/big-spy/creator', icon: UsersIcon, gradient: 'from-sky-500/20 to-cyan-500/20' },
  { title: 'Find App&Gaming', desc: 'App and gaming advertising trends and rankings', href: '/big-spy/app-gaming', icon: AppWindowIcon, gradient: 'from-green-500/20 to-emerald-500/20' },
  { title: 'Find Short Drama', desc: 'Short drama themes, plot hooks and traffic performance', href: '/big-spy/short-drama', icon: FilmIcon, gradient: 'from-fuchsia-500/20 to-rose-500/20' },
  { title: 'Find AI', desc: 'AI application advertising and growth highlights', href: '/big-spy/ai-app', icon: BrainCircuitIcon, gradient: 'from-teal-500/20 to-emerald-500/20' },
];

function HomeQuickLinkCard({ link }: { link: QuickLink }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      className={cn(
        'group relative rounded-xl border p-5 flex flex-col gap-3 overflow-hidden hover:shadow-md transition-shadow bg-background',
        'before:absolute before:inset-0 before:bg-gradient-to-br',
        link.gradient,
        'before:opacity-0 hover:before:opacity-60 before:transition-opacity'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
          <Icon />
        </div>
        <h3 className="font-semibold text-base">{link.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">{link.desc}</p>
      <div className="mt-auto text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Enter →
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="p-6 space-y-10">
      <section className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to CreatiVault
            <span className="relative inline-block ml-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
              </svg>
              <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-blue-500 rounded-full px-1.5 py-0.5 shadow-sm">
                AI
              </span>
            </span>
          </h1>
          <Link
            href="/profile/favorites"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
            My Favorites
          </Link>
        </div>
        <p className="text-muted-foreground text-sm">
          Explore advertising, product, creator, app and creative growth opportunities through multi-dimensional data and intelligent analysis.
        </p>
      </section>
      
      <section className="grid gap-5 grid-cols-4">
        {quickLinks.slice(0, 4).map((l) => (
          <HomeQuickLinkCard key={l.href} link={l} />
        ))}
      </section>

      <section className="grid gap-5 grid-cols-4">
        {quickLinks.slice(4).map((l) => (
          <HomeQuickLinkCard key={l.href} link={l} />
        ))}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="text-muted-foreground">
              <path fill="currentColor" fillRule="evenodd" d="M24 1c-7.417 0-12.617.233-15.893.455C4.61 1.692 1.8 4.327 1.484 7.88C1.236 10.656 1 14.8 1 20.5s.236 9.844.484 12.62c.316 3.553 3.126 6.188 6.623 6.425c1.403.095 3.16.192 5.292.272v3.178c0 3.453 4.08 5.284 6.66 2.988l6.733-5.994c5.95-.05 10.253-.25 13.101-.444c3.497-.237 6.307-2.872 6.623-6.425c.248-2.776.484-6.92.484-12.62s-.236-9.844-.484-12.62c-.316-3.553-3.126-6.188-6.623-6.425C36.617 1.233 31.417 1 24 1M8.378 5.446C11.556 5.23 16.666 5 24 5s12.444.23 15.622.446c1.597.108 2.774 1.259 2.91 2.79c.236 2.649.468 6.674.468 12.264s-.232 9.615-.468 12.265c-.136 1.53-1.313 2.681-2.91 2.79c-2.88.195-7.343.402-13.61.44a2 2 0 0 0-1.317.505l-7.296 6.495v-5.112a2 2 0 0 0-1.942-2a184 184 0 0 1-7.08-.329c-1.596-.108-2.773-1.259-2.91-2.79C5.233 30.115 5 26.09 5 20.5s.232-9.615.468-12.265c.136-1.53 1.313-2.681 2.91-2.79M21.464 22.26a.5.5 0 0 0 .036-.186v-5.03c0-1.15-.015-2.054-.035-2.754c-.044-1.505-1.146-2.678-2.67-2.74A69 69 0 0 0 16 11.5c-1.177 0-2.091.02-2.794.05c-1.525.062-2.627 1.235-2.67 2.74a97 97 0 0 0-.036 2.783c0 1.078.013 1.94.03 2.623c.043 1.595 1.252 2.808 2.849 2.848c.42.011.909.02 1.479.025c-.131.81-.412 1.467-.842 2.038c-.527.701-1.3 1.307-2.378 1.908c-.684.382-1.045 1.28-.568 2.029c.286.447.686 1.002 1.165 1.46c.537.514 1.29.591 1.92.397c3.617-1.113 6.93-3.716 7.31-8.141m16 0a.5.5 0 0 0 .036-.186v-5.03c0-1.15-.015-2.054-.035-2.754c-.044-1.505-1.146-2.678-2.67-2.74A69 69 0 0 0 32 11.5c-1.177 0-2.091.02-2.794.05c-1.525.062-2.627 1.235-2.67 2.74a97 97 0 0 0-.036 2.783c0 1.078.013 1.94.03 2.623c.043 1.595 1.252 2.808 2.849 2.848c.42.011.909.02 1.479.025c-.131.81-.412 1.467-.842 2.038c-.527.701-1.3 1.307-2.378 1.908c-.684.382-1.045 1.28-.568 2.029c.286.447.686 1.002 1.165 1.46c.537.514 1.29.591 1.92.397c3.617-1.113 6.93-3.716 7.31-8.141" clipRule="evenodd"/>
            </svg>
            <h2 className="text-lg font-semibold">Quick Start</h2>
          </div>
          <ul className="text-sm list-disc pl-5 space-y-1 text-muted-foreground">
            <li className="whitespace-nowrap">Click the modules above to enter corresponding rankings or analysis functions</li>
            <li className="whitespace-nowrap">Use filters in Big Spy lists to quickly narrow down the scope</li>
            <li className="whitespace-nowrap">Use Marketing Agent to generate market / audience / competitor / creative insights</li>
            <li className="whitespace-nowrap">Save key materials and manage them centrally in "My Favorites" later</li>
          </ul>
        </div>
      </section>
    </main>
  );
}