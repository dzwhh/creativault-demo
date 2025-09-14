'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  NavRadarIcon as RadarIcon,
  NavBoxesIcon as BoxesIcon,
  NavUsersIcon as UsersIcon,
  NavAppWindowIcon as AppWindowIcon,
  NavFilmIcon as FilmIcon,
  BrainCircuitIcon,
  LineChartIcon,
  Users2Icon,
  ShieldHalfIcon,
  NavSparklesIcon as SparklesIcon,
  ImageIcon,
  VideoIcon,
  FileBarChartIcon,
  BookOpenIcon,
  PlaySquareIcon,
  UserIcon,
  ActivityIcon,
  RefreshIcon,
  UpgradeIcon,
  UpgradeArrowIcon,
  SidebarCollapseIcon,
  CollectIcon,
  AIToolkitIcon,
  DashboardIcon,
  AssetStudioIcon,
  FavoritesIcon,
  BlogIcon,
  AcademyIcon,
  MarketInsightIcon,
  ChevronDownIcon,
  BillingIcon,
  BellIcon,
  LogOutIcon,
  MagicWandIcon,
  AdsIcon,
  ProductIcon,
} from '@/components/icons';









interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  exact?: boolean;
}

interface NavSection {
  label?: string;
  items: NavItem[];
  divider?: boolean;
}

const sections: NavSection[] = [
  {
    items: [
      {
        label: 'Home',
        href: '/',
        icon: HomeIcon,
        exact: true,
      },
      {
        label: 'Market Insight',
        href: '/market-insight',
        icon: MarketInsightIcon,
      },
    ],
  },
  {
    label: 'Growth Opportunity',
    items: [
      { label: 'Ads', href: '/big-spy/ads', icon: AdsIcon },
      { label: 'Product', href: '/big-spy/product', icon: ProductIcon },
      { label: 'Creator', href: '/big-spy/creator', icon: UsersIcon },
      { label: 'App&Gaming', href: '/big-spy/app-gaming', icon: AppWindowIcon },
      { label: 'Drama', href: '/big-spy/short-drama', icon: FilmIcon },
      { label: 'AI', href: '/big-spy/ai-app', icon: BrainCircuitIcon },
    ],
  },
  {
    label: 'Marketing Agent',
    items: [
      { label: 'Market Analysis', href: '/agent/market', icon: LineChartIcon },
      { label: 'Competitive Analysis', href: '/agent/competition', icon: ShieldHalfIcon },
      { label: 'Creative Analysis', href: '/agent/creative', icon: SparklesIcon },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Magic Search', href: '/tools/magic-search', icon: MagicWandIcon },
      { label: 'Creative Clips', href: '/tools/creative-clips', icon: VideoIcon },
      { label: 'One Collect', href: '/tools/one-collect', icon: CollectIcon },
      { label: 'AI Toolkit', href: '/tools/ai-toolkit', icon: AIToolkitIcon },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Academy', href: '/community/academy', icon: AcademyIcon },
      { label: 'Blog', href: '/community/blog', icon: BlogIcon },
    ],
  },
  {
    label: 'My Page',
    items: [
      { label: 'Favorites', href: '/profile/favorites', icon: FavoritesIcon },
      { label: 'Asset Studio', href: '/profile/asset-studio', icon: AssetStudioIcon },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }

    if (isAccountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isAccountMenuOpen]);

  return (
    <aside className={cn(
      "h-full shrink-0 border-r bg-background/50 backdrop-blur flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <div className="font-semibold text-lg">CreatiVault</div>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors"
        >
          <SidebarCollapseIcon 
            size={16} 
            className={cn(
              "text-muted-foreground hover:text-foreground transition-transform duration-200",
              isCollapsed && "rotate-180"
            )} 
          />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-6">
        {sections.map((section, si) => (
          <div key={si} className="space-y-2">
            {section.label && !isCollapsed && (
              <div className="px-2 text-xs font-medium uppercase text-muted-foreground tracking-wide">
                {section.label}
              </div>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors',
                        active
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:text-foreground hover:bg-accent',
                        isCollapsed && 'justify-center'
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          className={cn(
                            'shrink-0',
                            active
                              ? 'text-blue-600'
                              : 'text-gray-600 group-hover:text-foreground'
                          )}
                        />
                      )}
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {section.divider && <div className="border-t pt-2" />}
          </div>
        ))}
      </nav>
      
      {/* Credits usage and upgrade section */}
      {!isCollapsed && (
        <div className="flex flex-col gap-3 p-4">
          <div className="shrink-0 h-[1px] w-auto bg-border -mx-4"></div>
          
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-1">
                <span className="text-xs font-semibold">Credits Usage</span>
                <div className="cursor-pointer">
                  <RefreshIcon size={12} className="text-muted-foreground hover:text-foreground" />
                </div>
              </div>
              <a className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors" href="#">
                Manage
              </a>
            </div>
            
            <div className="flex flex-row items-center justify-between gap-2 text-xs">
              <div className="relative flex w-full touch-none select-none items-center">
                <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-600" 
                    style={{ left: '0%', right: '100%' }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-none flex-row items-center gap-0.5 text-xs font-semibold text-muted-foreground">
                <span className="font-bold text-foreground">0</span>
                <span>/</span>
                <span>200</span>
              </div>
            </div>
          </div>
          
          <button className="inline-flex items-center justify-center rounded-md text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background shadow-sm active:scale-[99%] transition-all duration-150 select-none bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 text-white h-10 px-4 w-full flex-none gap-1 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900">
            <span className="text-nowrap">Upgrade</span>
            <UpgradeArrowIcon size={16} className="flex-none" />
          </button>
          
          {/* Account Module - DropdownMenu Style */}
          <div className="relative" ref={accountMenuRef}>
            <button 
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-expanded={isAccountMenuOpen}
              aria-haspopup="menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                J
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm font-medium text-foreground truncate">John Doe</div>
                <div className="text-xs text-muted-foreground truncate">john@example.com</div>
              </div>
              <ChevronDownIcon 
                size={16} 
                className={cn(
                  "text-muted-foreground group-hover:text-foreground transition-all duration-200",
                  isAccountMenuOpen && "rotate-180"
                )} 
              />
            </button>
            
            {/* Dropdown Content */}
            {isAccountMenuOpen && (
              <div 
                className="absolute left-full bottom-0 ml-2 w-48 bg-popover border rounded-md shadow-md py-1 z-50 animate-in fade-in-0 zoom-in-95"
                role="menu"
                aria-orientation="vertical"
              >
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors text-left focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  role="menuitem"
                >
                  <UserIcon size={16} className="text-muted-foreground" />
                  <span>My Account</span>
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors text-left focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  role="menuitem"
                >
                  <BillingIcon size={16} className="text-muted-foreground" />
                  <span>Billing</span>
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors text-left focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  role="menuitem"
                >
                  <BellIcon size={16} className="text-muted-foreground" />
                  <span>Notifications</span>
                </button>
                <div className="border-t my-1" role="separator"></div>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-destructive transition-colors text-left focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  role="menuitem"
                >
                  <LogOutIcon size={16} className="text-destructive" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}