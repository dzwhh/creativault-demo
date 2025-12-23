'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { EmptyStateTabs } from '@/components/ui/empty-state-tabs';
import { EmptyStateCollection } from '@/components/ui/empty-state-collection';

// Menu types
type MenuType = 'advertiser' | 'mobile-app' | 'influencer' | 'custom-services';

// Menu icons
const AdvertiserIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const MobileAppIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

const InfluencerIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CustomServicesIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

// Menu items
const menuItems = [
  { id: 'advertiser' as MenuType, label: 'Advertiser', icon: AdvertiserIcon, comingSoon: true },
  { id: 'mobile-app' as MenuType, label: 'Mobile App', icon: MobileAppIcon, comingSoon: true },
  { id: 'influencer' as MenuType, label: 'Influencer', icon: InfluencerIcon, comingSoon: false },
  { id: 'custom-services' as MenuType, label: 'Custom Services', icon: CustomServicesIcon, comingSoon: false },
];

export default function OneCollectPage() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('influencer');

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'advertiser':
      case 'mobile-app':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-sm text-gray-500 max-w-md">
                {activeMenu === 'advertiser' 
                  ? 'Advertiser data collection feature is under development. Stay tuned!'
                  : 'Mobile App data collection feature is under development. Stay tuned!'}
              </p>
            </div>
          </div>
        );
      
      case 'influencer':
        return (
          <div className="py-8">
            <EmptyStateTabs
              onFileSelect={(file) => {
                console.log('File selected:', file.name);
                alert(`File "${file.name}" selected. Processing...`);
              }}
              onLinkCollect={async (url) => {
                console.log('Collecting from URL:', url);
                alert(`Starting collection from: ${url}`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                alert('Collection completed!');
              }}
              onWordsCollect={async (platform, keywords) => {
                console.log('Searching on', platform, 'for:', keywords);
                alert(`Searching on ${platform.toUpperCase()} for: ${keywords.join(', ')}`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                alert(`Found influencers for: ${keywords.join(', ')}`);
              }}
              onCollectionSubmit={async (requirements) => {
                console.log('Collection requirements:', requirements);
                await new Promise(resolve => setTimeout(resolve, 2000));
              }}
              defaultTab="upload"
            />
          </div>
        );
      
      case 'custom-services':
        return (
          <div className="py-8">
            <EmptyStateCollection
              title="Custom Data Collection Service"
              description="Submit your custom data collection requirements and our professional team will help you gather the information you need"
              onSubmit={async (requirements) => {
                console.log('Custom service requirements:', requirements);
                await new Promise(resolve => setTimeout(resolve, 2000));
              }}
              buttonText="Submit Request"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      {/* Header Section */}
      <div className="fixed top-0 left-56 right-0 z-10 bg-white border-b">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Real‑time Data Capture</h1>
          <p className="text-sm text-gray-500 mt-1">
            Keeps grabbing, checking, and streaming data in real time, so you can analyze it right away.
          </p>
        </div>
      </div>

      {/* Left Sidebar Menu */}
      <div className="w-56 flex flex-col shrink-0 pt-24 ml-8 border-r border-gray-200 bg-white">
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={cn(
                          'shrink-0',
                          isActive ? 'text-blue-600' : 'text-gray-500'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.comingSoon && (
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                        Soon
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto pt-24">
        <div className="px-8 py-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
