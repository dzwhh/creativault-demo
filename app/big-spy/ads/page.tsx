'use client';

import { Suspense, useState } from 'react';
import { AdsList } from './ads-list';
import { AdsFilters } from './ads-filters';
import { MetaIcon, TikTokIcon, GoogleIcon } from '@/components/icons';
import { PageHeader } from '@/components/ui/page-header';

// 创建缺失的图标
const PinterestIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
  </svg>
);

const platforms = [
  { id: 'meta', name: 'Meta Ads Library', icon: MetaIcon, activeColor: 'text-blue-600 border-blue-600 bg-blue-50' },
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, activeColor: 'text-black border-black bg-gray-200' },
  { id: 'google', name: 'Google', icon: GoogleIcon, activeColor: 'text-yellow-600 border-yellow-600 bg-yellow-50' },
  { id: 'pinterest', name: 'Pinterest', icon: PinterestIcon, activeColor: 'text-red-600 border-red-600 bg-red-50' },
 
];

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function AdsPage({ searchParams }: PageProps) {
  const [activeTab, setActiveTab] = useState('meta');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Shopify', 'Is EU']);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleWatchTutorial = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  // 模拟的标签数据
  const filterTags = [
    { label: '😎 Summer Time', color: 'bg-orange-100 text-orange-800' },
    { label: '🔥 Weekly Winners', color: 'bg-red-100 text-red-800' },
    { label: '✅ Ready to scale', color: 'bg-green-100 text-green-800' },
    { label: '🎯 Market Leaders', color: 'bg-purple-100 text-purple-800' },
    { label: '🎁 Latest Gems', color: 'bg-blue-100 text-blue-800' },
    { label: '📉 Recent dropshipping', color: 'bg-yellow-100 text-yellow-800' },
    { label: '🏆 Top spender', color: 'bg-amber-100 text-amber-800' },
  ];

  const removeFilter = (filter: string) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Ads Library"
        description="Explore over 100M high-performing ads from Meta, TikTok, and Google to discover winning products."
        className="relative"
        actions={
          <button 
            onClick={handleWatchTutorial}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
            </svg>
            Watch tutorial
          </button>
        }
        tabs={
          <div className="px-8 pb-0">
            <div className="flex gap-0">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isActive = activeTab === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setActiveTab(platform.id)}
                    className={`flex items-center gap-3 px-4 py-3 border-b-2 transition-all ${
                      isActive 
                        ? `${platform.activeColor} font-medium` 
                        : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span>{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        }
      />

      {/* Content Section */}
      <div className="flex-1 p-0">
        <div className="h-full">
          {/* Header Controls Section */}
          <div className="bg-white h-full p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  {/* 移除了标题和描述文字 */}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex gap-6">
              {/* Sidebar Filters */}
              <div className="flex-shrink-0">
                <AdsFilters />
              </div>
              
              {/* Content Area */}
              <div className="flex-1">
                {/* Search and Filter Bar */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    
                    {/* Active Filters */}
                    <div className="flex items-center gap-2">
                      {selectedFilters.map((filter) => (
                        <span
                          key={filter}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {filter}
                          <button
                            onClick={() => removeFilter(filter)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">↑</span>
                      <span className="text-sm font-medium">Publication date</span>
                    </div>
                    
                    {/* Clear All + Save Filters */}
                    <div className="flex items-center gap-3 text-sm">
                      <button className="text-gray-600 hover:text-gray-900">Clear all</button>
                      <span className="text-gray-300">•</span>
                      <button className="text-blue-600 hover:text-blue-800">Save filters</button>
                    </div>
                  </div>
                  
                  {/* Filter Tags */}
                  <div className="flex flex-wrap gap-2">
                    {filterTags.map((tag) => (
                      <button
                        key={tag.label}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${
                          tag.color
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Ads Grid */}
                <Suspense 
                  fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  }
                >
                  <AdsList searchParams={searchParams} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeVideoModal}>
          <div className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Tutorial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}