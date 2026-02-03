'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  AdsIcon,
  ProductIcon,
  UsersIcon,
  AppWindowIcon,
  FilmIcon,
  BrainCircuitIcon,
  MetaIcon,
  TikTokIcon,
} from '@/components/icons';
import { HomeAdCard } from '@/components/home-ads-card';

interface QuickLink {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType;
  gradient?: string;
  comingSoon?: boolean;
}

const quickLinks: QuickLink[] = [
  { title: 'Find Ads', desc: 'Cross-platform trending and fresh advertising creatives', href: '/big-spy/ads', icon: AdsIcon, gradient: 'from-pink-500/20 to-purple-500/20' },
  { title: 'Find Products', desc: 'High-potential winning products and category trends', href: '/big-spy/product', icon: ProductIcon, gradient: 'from-amber-500/20 to-red-500/20' },
  { title: 'Find Influencers', desc: 'Influencer & KOL creative performance and data profiles', href: '/big-spy/creator', icon: UsersIcon, gradient: 'from-sky-500/20 to-cyan-500/20' },
  { title: 'Find App&Gaming', desc: 'App and gaming advertising trends and rankings', href: '/big-spy/app-gaming', icon: AppWindowIcon, gradient: 'from-green-500/20 to-emerald-500/20', comingSoon: true },
  { title: 'Find Short Drama', desc: 'Short drama themes, plot hooks and traffic performance', href: '/big-spy/short-drama', icon: FilmIcon, gradient: 'from-fuchsia-500/20 to-rose-500/20', comingSoon: true },
  { title: 'Find AI', desc: 'AI application advertising and growth highlights', href: '/big-spy/ai-app', icon: BrainCircuitIcon, gradient: 'from-teal-500/20 to-emerald-500/20', comingSoon: true },
];

function HomeQuickLinkCard({ link }: { link: QuickLink }) {
  const Icon = link.icon;
  
  if (link.comingSoon) {
    return (
      <div
        className={cn(
          'relative rounded-xl border p-5 flex flex-col gap-3 overflow-hidden bg-background opacity-60 cursor-not-allowed',
          'before:absolute before:inset-0 before:bg-gradient-to-br',
          link.gradient,
          'before:opacity-30'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-muted">
            <Icon />
          </div>
          <h3 className="font-semibold text-base">{link.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{link.desc}</p>
        <div className="mt-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
            Coming Soon
          </span>
        </div>
      </div>
    );
  }
  
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('meta');
  const [showInviteCodeModal, setShowInviteCodeModal] = useState(false);
  const [inviteCode, setInviteCode] = useState(['', '', '', '', '', '']);

  const platforms = [
    { id: 'meta', name: 'Meta', icon: MetaIcon, activeColor: 'text-blue-600 border-blue-600 bg-blue-50' },
    { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, activeColor: 'text-black border-black bg-gray-200' },
  ];

  // 模拟20个广告数据用于Home页面展示
  const homeAdsData = [
    {
      id: '1',
      title: 'Mixtiles',
      domain: 'mixtiles.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 1,
      likes: 229,
      spend: 3.9,
      isNew: true,
      mediaUrl: 'https://optimization-cdn.minea.com/minea-ads-media/lib_1329204472105376_52535667644af517005f381ade2bc116167a070e.jpg?format=auto&quality=75&width=256ad',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    },
    {
      id: '2',
      title: 'Svensk anti-age hudvård utan ond...',
      domain: 'www.topibio.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 3,
      likes: 1,
      spend: 0,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' }
      ]
    },
    {
      id: '3',
      title: '+100 000 clients satisfaits',
      domain: 'soya-paris.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 1,
      likes: 37,
      spend: 0.6,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' }
      ]
    },
    {
      id: '4',
      title: 'Genius Nutrition',
      domain: 'www.geniusnutrition.ro',
      publishedDate: 'Sep 16, 2025',
      adsets: 1,
      likes: 211,
      spend: 3.6,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Instagram', icon: 'InstagramIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    },
    {
      id: '5',
      title: 'Like a quiet blessing on your wrist ...',
      domain: 'www.oliviajewelry.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 1,
      likes: 1,
      spend: 0,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' }
      ]
    },
    {
      id: '6',
      title: 'Like a quiet blessing on your wrist ...',
      domain: 'www.oliviajewelry.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 1,
      likes: 5,
      spend: 0.1,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Instagram', icon: 'InstagramIcon' }
      ]
    },
    {
      id: '7',
      title: 'OQ HAIR',
      domain: 'oqhair.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 2,
      likes: 9,
      spend: 0.2,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    },
    {
      id: '8',
      title: 'Sowhatchish cool',
      domain: 'sowhatshop.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 1,
      likes: 205,
      spend: 3.5,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    },
    {
      id: '9',
      title: 'bedsurely',
      domain: 'bedsurely.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 2,
      likes: 522,
      spend: 5.8,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Instagram', icon: 'InstagramIcon' }
      ]
    },
    {
      id: '10',
      title: 'Your New A/W Fit.',
      domain: 'badmonday.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 1,
      likes: 20,
      spend: 0.3,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' }
      ]
    },
    {
      id: '11',
      title: 'Experimento Noches Sin...',
      domain: 'zensleep.shop',
      publishedDate: 'Sep 16, 2025',
      adsets: 2,
      likes: 2400,
      spend: 41.2,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' }
      ]
    },
    {
      id: '12',
      title: 'Handmade accessories',
      domain: 'craftshop.com',
      publishedDate: 'Sep 16, 2025',
      adsets: 4,
      likes: 187,
      spend: 3.2,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Instagram', icon: 'InstagramIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    },
    {
      id: '13',
      title: 'Premium Skincare Solutions',
      domain: 'skincare.com',
      publishedDate: 'Sep 15, 2025',
      adsets: 2,
      likes: 456,
      spend: 7.8,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    },
    {
      id: '14',
      title: 'Fitness Revolution',
      domain: 'fitnesshub.com',
      publishedDate: 'Sep 15, 2025',
      adsets: 1,
      likes: 89,
      spend: 1.5,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' }
      ]
    },
    {
      id: '15',
      title: 'Smart Home Technology',
      domain: 'smarthome.tech',
      publishedDate: 'Sep 15, 2025',
      adsets: 3,
      likes: 312,
      spend: 5.4,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Instagram', icon: 'InstagramIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    },
    {
      id: '16',
      title: 'Eco-Friendly Fashion',
      domain: 'ecofashion.com',
      publishedDate: 'Sep 14, 2025',
      adsets: 2,
      likes: 178,
      spend: 2.9,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' }
      ]
    },
    {
      id: '17',
      title: 'Gourmet Coffee Experience',
      domain: 'coffeehouse.com',
      publishedDate: 'Sep 14, 2025',
      adsets: 1,
      likes: 267,
      spend: 4.1,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' }
      ]
    },
    {
      id: '18',
      title: 'Travel Adventures Await',
      domain: 'traveladventures.com',
      publishedDate: 'Sep 14, 2025',
      adsets: 4,
      likes: 834,
      spend: 12.3,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Instagram', icon: 'InstagramIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    },
    {
      id: '19',
      title: 'Luxury Watch Collection',
      domain: 'luxurywatches.com',
      publishedDate: 'Sep 13, 2025',
      adsets: 2,
      likes: 445,
      spend: 8.7,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      hasVideo: false,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' }
      ]
    },
    {
      id: '20',
      title: 'Digital Marketing Mastery',
      domain: 'digitalmarketing.pro',
      publishedDate: 'Sep 13, 2025',
      adsets: 3,
      likes: 623,
      spend: 9.8,
      isNew: true,
      mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      hasVideo: true,
      platforms: [
        { name: 'Facebook', icon: 'FacebookIcon' },
        { name: 'Instagram', icon: 'InstagramIcon' },
        { name: 'Threads', icon: 'ThreadsIcon' }
      ]
    }
  ];
  // Handle invite code input
  const handleInviteCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^[A-Za-z0-9]*$/.test(value)) return;
    
    const newCode = [...inviteCode];
    newCode[index] = value.toUpperCase();
    setInviteCode(newCode);
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`invite-code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleInviteCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !inviteCode[index] && index > 0) {
      const prevInput = document.getElementById(`invite-code-${index - 1}`);
      prevInput?.focus();
    }
  };

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
            href="/my/favorites"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
            My Favorites
          </Link>
        </div>
        <p className="text-muted-foreground text-md">
          Explore advertising, product, influencer, app and creative growth opportunities through multi-dimensional data and intelligent analysis.
        </p>

        {/* Invite Code Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-white font-semibold text-sm">Upgrade to Enterprise plan instantly!</span>
              <div className="h-4 w-px bg-white/30"></div>
              <div className="overflow-hidden max-w-md">
                <p className="text-white/80 text-sm animate-pulse">Got an invite code? Click the gift icon to unlock premium features...</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowInviteCodeModal(true)}
            className="px-5 py-2 bg-white text-purple-600 font-semibold text-sm rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Enter Code
          </button>
        </div>
      </section>

      {/* Invite Code Modal */}
      {showInviteCodeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setShowInviteCodeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Gift Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">Enter Invite Code</h2>
            <p className="text-gray-400 text-center text-sm mb-8">Enter the 6-digit code to unlock Enterprise features</p>

            {/* Code Input */}
            <div className="flex justify-center gap-3 mb-8">
              {inviteCode.map((digit, index) => (
                <input
                  key={index}
                  id={`invite-code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInviteCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleInviteCodeKeyDown(index, e)}
                  className="w-12 h-14 bg-gray-800 border-2 border-gray-700 rounded-lg text-center text-2xl font-bold text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              ))}
            </div>

            {/* Confirm Button */}
            <button
              onClick={() => {
                const code = inviteCode.join('');
                if (code.length === 6) {
                  alert('Upgrade successful!');
                  setShowInviteCodeModal(false);
                }
              }}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all mb-6"
            >
              Confirm Upgrade
            </button>

            {/* Benefits */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <h3 className="text-white font-semibold text-sm mb-3">Enterprise Plan Benefits</h3>
              <ul className="space-y-2">
                {['1,000,000 Credits per month', 'Creator Contact Unlock', 'Creator Targeted Collection', 'Priority 24/7 Support'].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Don't have an invite code?</p>
              <button
                onClick={() => {
                  setShowInviteCodeModal(false);
                  router.push('/settings?tab=usage&apply=true');
                }}
                className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors"
              >
                <span className="underline underline-offset-2 inline-block animate-[breathe_2s_ease-in-out_infinite]">Apply for an invite code here</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
      
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

      {/* Today's Recommendation Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Today's Recommendation</h2>
        </div>
        
        {/* Platform Tabs */}
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isActive = activeTab === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setActiveTab(platform.id)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'hover:bg-muted/80'
                }`}
              >
                <Icon className="flex-shrink-0 opacity-70" />
                <span>{platform.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {platforms.map((platform) => {
            if (activeTab !== platform.id) return null;
            
            return (
              <div key={platform.id} className="space-y-4">
                {/* Meta Tab Description */}
                {platform.id === 'meta' && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Top 20 Popular Ads</h3>
                    <p className="text-blue-700 text-sm">Discover the most successful Meta advertising campaigns ranked by performance and engagement.</p>
                  </div>
                )}
                
                {platform.id === 'meta' ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {homeAdsData.map((ad, index) => (
                      <HomeAdCard 
                        key={ad.id} 
                        ad={ad} 
                        rank={index + 1}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder content for TikTok */}
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="aspect-video bg-muted rounded-md"></div>
                      <h3 className="font-semibold">Recommended Ad #A</h3>
                      <p className="text-sm text-muted-foreground">High-performing {platform.name} ad creative with excellent engagement rates.</p>
                    </div>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="aspect-video bg-muted rounded-md"></div>
                      <h3 className="font-semibold">Recommended Ad #B</h3>
                      <p className="text-sm text-muted-foreground">Trending {platform.name} campaign with high conversion potential.</p>
                    </div>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="aspect-video bg-muted rounded-md"></div>
                      <h3 className="font-semibold">Recommended Ad #C</h3>
                      <p className="text-sm text-muted-foreground">Popular {platform.name} creative with strong audience engagement.</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}