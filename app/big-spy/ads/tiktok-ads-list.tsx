'use client';

import { useState } from 'react';
import { SaveToFavoritesModal } from '@/components/save-to-favorites-modal';
import { TikTokAdsDetail } from './tiktok-ads-detail';

interface TikTokAd {
  id: string;
  videoUrl: string;
  videoPoster: string;
  adCaption: string;
  objective: string;
  region: string;
  likes: number;
  ctr: number;
  budget: number;
}

// Mock TikTok Ads Data
const mockTikTokAds: TikTokAd[] = [
  {
    id: '1',
    videoUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
    videoPoster: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
    adCaption: 'Transform your daily routine with our innovative smart home devices. Easy setup, voice control, and energy-saving features.',
    objective: 'Conversions',
    region: 'United States',
    likes: 12500,
    ctr: 3.8,
    budget: 5000
  },
  {
    id: '2',
    videoUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop',
    videoPoster: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop',
    adCaption: 'Discover the latest fashion trends. Premium quality materials, sustainable production, and styles that turn heads.',
    objective: 'Traffic',
    region: 'United Kingdom',
    likes: 8900,
    ctr: 4.2,
    budget: 3500
  },
  {
    id: '3',
    videoUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=600&fit=crop',
    videoPoster: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=600&fit=crop',
    adCaption: 'Unlock radiant skin with our premium skincare collection. Dermatologist-tested, cruelty-free, and visible results in 7 days.',
    objective: 'App Install',
    region: 'Canada',
    likes: 15200,
    ctr: 5.1,
    budget: 7200
  },
  {
    id: '4',
    videoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop',
    videoPoster: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop',
    adCaption: 'Wireless earbuds with superior sound quality. Active noise cancellation, 30-hour battery life, and ergonomic design.',
    objective: 'Video Views',
    region: 'Australia',
    likes: 22100,
    ctr: 6.3,
    budget: 9800
  },
  {
    id: '5',
    videoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop',
    videoPoster: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop',
    adCaption: 'Elevate your fitness journey with our smart fitness tracker. Real-time health monitoring and personalized workout plans.',
    objective: 'Lead Generation',
    region: 'Germany',
    likes: 18700,
    ctr: 4.9,
    budget: 6500
  },
  {
    id: '6',
    videoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    videoPoster: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    adCaption: 'Experience coffee perfection at home. Premium beans, precision grinding, and barista-quality espresso every time.',
    objective: 'Conversions',
    region: 'France',
    likes: 9800,
    ctr: 3.6,
    budget: 4200
  },
  {
    id: '7',
    videoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop',
    videoPoster: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop',
    adCaption: 'Luxury watches that define your style. Swiss-made precision, timeless design, and lifetime warranty included.',
    objective: 'Reach',
    region: 'Japan',
    likes: 31500,
    ctr: 7.2,
    budget: 12000
  },
  {
    id: '8',
    videoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop',
    videoPoster: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop',
    adCaption: 'Organic superfoods delivered to your door. Fresh, sustainable, and packed with nutrients for a healthier lifestyle.',
    objective: 'Traffic',
    region: 'United States',
    likes: 14200,
    ctr: 4.4,
    budget: 5800
  },
];

const TikTokAdCard = ({ ad, onSave, onClick }: { ad: TikTokAd; onSave: (ad: TikTokAd) => void; onClick: (ad: TikTokAd) => void }) => {
  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(ad)}
    >
      {/* Video Section */}
      <div className="relative aspect-[9/16] bg-gray-100 group">
        <img
          src={ad.videoPoster}
          alt="TikTok Ad"
          className="w-full h-full object-cover"
        />
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
        {/* Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(ad);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors z-10"
          title="Save to Favorites"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        
        {/* Ad Caption - Bottom of Video */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/70">
          <p className="text-sm text-white line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {ad.adCaption}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">

        {/* Objective and Region */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <span className="text-xs text-gray-500 block mb-1">Objective</span>
            <span className="text-sm font-medium text-gray-900">{ad.objective}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-1">Region</span>
            <span className="text-sm font-medium text-gray-900">{ad.region}</span>
          </div>
        </div>

        {/* Performance Title */}
        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Performance</h4>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {/* Likes */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="text-xs text-gray-500">Likes</span>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {ad.likes >= 1000 ? `${(ad.likes / 1000).toFixed(1)}K` : ad.likes}
            </div>
          </div>

          {/* CTR */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span className="text-xs text-gray-500">CTR</span>
            </div>
            <div className="text-sm font-semibold text-gray-900">{ad.ctr.toFixed(1)}%</div>
          </div>

          {/* Budget */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-500">Budget</span>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              ${ad.budget >= 1000 ? `${(ad.budget / 1000).toFixed(1)}K` : ad.budget}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TikTokAdsListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function TikTokAdsList({ searchParams }: TikTokAdsListProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState<TikTokAd | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailAd, setDetailAd] = useState<TikTokAd | null>(null);

  const handleSave = (ad: TikTokAd) => {
    setSelectedAd(ad);
    setShowSaveModal(true);
  };

  const handleAdClick = (ad: TikTokAd) => {
    setDetailAd(ad);
    setShowDetail(true);
  };

  const handleSaveToFavorites = async (folderId: string) => {
    console.log('Saving ad to folder:', folderId, selectedAd);
    setShowSaveModal(false);
    setSelectedAd(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockTikTokAds.map((ad) => (
          <TikTokAdCard key={ad.id} ad={ad} onSave={handleSave} onClick={handleAdClick} />
        ))}
      </div>

      {/* Save to Favorites Modal */}
      <SaveToFavoritesModal
        isOpen={showSaveModal}
        onClose={() => {
          setShowSaveModal(false);
          setSelectedAd(null);
        }}
        onSave={handleSaveToFavorites}
        defaultCategory="ads"
      />

      {/* TikTok Ad Detail Modal */}
      {showDetail && detailAd && (
        <TikTokAdsDetail
          ad={detailAd}
          onClose={() => {
            setShowDetail(false);
            setDetailAd(null);
          }}
        />
      )}
    </>
  );
}
