'use client';

import { useState } from 'react';
import { EmptyStateUpload } from './empty-state-upload';
import { EmptyStateLink } from './empty-state-link';
import { EmptyStateWords } from './empty-state-words';

type TabType = 'upload' | 'link' | 'words';

interface EmptyStateTabsProps {
  onFileSelect?: (file: File) => void;
  onLinkCollect?: (url: string) => Promise<void>;
  onWordsCollect?: (platform: string, keywords: string[]) => Promise<void>;
  defaultTab?: TabType;
}

export function EmptyStateTabs({
  onFileSelect,
  onLinkCollect,
  onWordsCollect,
  defaultTab = 'upload',
}: EmptyStateTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  const tabs = [
    { id: 'upload' as TabType, label: 'Upload CSV', icon: '📄' },
    { id: 'link' as TabType, label: 'From URL', icon: '🔗' },
    { id: 'words' as TabType, label: 'By Keywords', icon: '🔍' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Tab Header */}
      <div className="flex gap-3 mb-8 bg-gray-100 p-1.5 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all rounded-md ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] w-full">
        {activeTab === 'upload' && (
          <EmptyStateUpload
            title="No Influencers Found"
            description="Upload a CSV file with influencer information to get started"
            onFileSelect={onFileSelect}
            maxFileSize="5MB"
            acceptedFormats="CSV"
          />
        )}

        {activeTab === 'link' && (
          <EmptyStateLink
            title="Collect from Social Media"
            description="Paste a URL from TikTok, Instagram, or YouTube to collect influencer data"
            onCollect={onLinkCollect}
            placeholder="https://www.tiktok.com/@username or https://instagram.com/username"
            buttonText="Collect Data"
          />
        )}

        {activeTab === 'words' && (
          <EmptyStateWords
            title="Discover Influencers"
            description="Search by keywords or hashtags to find trending influencers"
            onCollect={onWordsCollect}
            placeholder="Enter keywords or #hashtags (separate by comma)"
            buttonText="Search Influencers"
          />
        )}
      </div>
    </div>
  );
}
