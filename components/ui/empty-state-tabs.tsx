'use client';

import { useState } from 'react';
import { EmptyStateUpload } from './empty-state-upload';
import { EmptyStateLink } from './empty-state-link';
import { EmptyStateWords } from './empty-state-words';
import { EmptyStateCollection } from './empty-state-collection';

type TabType = 'upload' | 'link' | 'words' | 'collection';

interface EmptyStateTabsProps {
  onFileSelect?: (file: File) => void;
  onLinkCollect?: (url: string) => Promise<void>;
  onWordsCollect?: (platform: string, keywords: string[]) => Promise<void>;
  onCollectionSubmit?: (requirements: string) => Promise<void>;
  defaultTab?: TabType;
}

export function EmptyStateTabs({
  onFileSelect,
  onLinkCollect,
  onWordsCollect,
  onCollectionSubmit,
  defaultTab = 'upload',
}: EmptyStateTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  const tabs = [
    { 
      id: 'upload' as TabType, 
      label: 'Upload CSV', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      )
    },
    { 
      id: 'link' as TabType, 
      label: 'From URL', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      )
    },
    { 
      id: 'words' as TabType, 
      label: 'By Keywords', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      )
    },
    { 
      id: 'collection' as TabType, 
      label: 'Collection Service', 
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      )
    },
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
            {tab.icon}
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

        {activeTab === 'collection' && (
          <EmptyStateCollection
            title="Data Collection Service"
            description="Submit your influencer data collection requirements and our team will help you gather the information"
            onSubmit={onCollectionSubmit}
            buttonText="Submit Requirements"
          />
        )}
      </div>
    </div>
  );
}
