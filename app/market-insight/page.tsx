'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { WatchTutorialButton } from '@/components/ui/watch-tutorial-button';
import WinningAds from './winning-ads';
import WinningProduct from './winning-product';



export default function MarketInsightPage() {
  const [activeMainTab, setActiveMainTab] = useState<'ads' | 'products'>('ads');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleWatchTutorial = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Market Insight"
        description="Provide cross-platform, cross-country, cross-industry advertising benchmark metrics to quickly evaluate campaign performance and identify optimization opportunities."
        actions={<WatchTutorialButton onClick={handleWatchTutorial} />}
      />

      {/* Main Tab Navigation - Ads vs Products */}
      <div className="bg-white">
        <div className="flex items-center justify-center py-4">
          <div className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveMainTab('ads')}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeMainTab === 'ads'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              Ads
            </button>
            <button
              onClick={() => setActiveMainTab('products')}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeMainTab === 'products'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              Products
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-0">
        {activeMainTab === 'ads' ? <WinningAds /> : <WinningProduct />}
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
                title="Market Insight Tutorial Video"
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