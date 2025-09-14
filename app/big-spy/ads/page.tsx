'use client';

import { Suspense, useState } from 'react';
import { AdsList } from './ads-list';
import { AdsFilters } from './ads-filters';
import { PageHeader } from '@/components/ui/page-header';
import { MetaIcon, TikTokIcon, GoogleIcon } from '@/components/icons';

// Platform tab icons

const platforms = [
  { id: 'meta', name: 'Meta', icon: MetaIcon, activeColor: 'text-blue-600 border-blue-600' },
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, activeColor: 'text-black border-black' },
  { id: 'google', name: 'Google', icon: GoogleIcon, activeColor: 'text-[#F4B400] border-[#F4B400]' },
];

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function AdsPage({ searchParams }: PageProps) {
  const [activeTab, setActiveTab] = useState('meta');

  const tabsComponent = (
    <div className="flex px-8">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        const isActive = activeTab === platform.id;
        return (
          <button
            key={platform.id}
            onClick={() => setActiveTab(platform.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              isActive 
                ? `${platform.activeColor} bg-gray-50/50` 
                : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Icon className="flex-shrink-0" />
            <span className="font-medium">{platform.name}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Ads Library"
        description="Explore over 100M high-performing ads from Meta, TikTok, and Google to discover winning products."
        tabs={tabsComponent}
      />
      
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex flex-col gap-4 p-4">
          <AdsFilters />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Suspense 
          fallback={
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            </div>
          }
        >
          <AdsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}