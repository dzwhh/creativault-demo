'use client';

import { useEffect, useState } from 'react';
import { Ad } from '@/lib/types';
import { AdDetail } from './ad-detail';
import { SaveToFavoritesModal } from '@/components/save-to-favorites-modal';

interface AdsListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// 模拟广告数据 - 扩展到20个
const mockAds = [
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
    hasVideo: true,
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

interface AdCardProps {
  ad: any & {
    platforms?: Array<{
      name: string;
      icon: string;
    }>;  };
  onClick: (ad: any) => void;
  onSave: (ad: any) => void;
}

const AdCard = ({ ad, onClick, onSave }: AdCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onClick(ad)}
    >
      {/* Image/Video Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={ad.mediaUrl}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Play Button Overlay */}
        {ad.hasVideo && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
              </svg>
            </div>
          </div>
        )}
        
        {/* Top Right - Adsets Count */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <span>{ad.adsets} adsets</span>
        </div>
        
        {/* Bottom Left - Stats */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white text-xs">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{ad.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>$</span>
            <span>{ad.spend}</span>
          </div>
        </div>
        
        {/* New Badge */}
        {ad.isNew && (
          <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>New</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-slate-900 mb-1 line-clamp-1">
              {ad.title}
            </h3>
            <p className="text-xs text-slate-600 mb-1">{ad.domain}</p>
            <p className="text-xs text-slate-500">Published on: {ad.publishedDate}</p>
          </div>
          
          {/* Action Buttons - Vertical Stack */}
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            {/* Save Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave(ad);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-colors"
              title="Save to Favorites"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function AdsList({ searchParams }: AdsListProps) {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<any | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [currentAdForAction, setCurrentAdForAction] = useState<any | null>(null);

  useEffect(() => {
    // 模拟加载
    const timer = setTimeout(() => {
      setAds(mockAds);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Handle Save to Favorites
  const handleSave = (ad: any) => {
    setCurrentAdForAction(ad);
    setIsSaveModalOpen(true);
  };

  // Handle Save to Favorites Confirm
  const handleSaveToFavorites = (category: string, folderId: string, folderName?: string) => {
    console.log('Saving ad to favorites:', { ad: currentAdForAction, category, folderId, folderName });
    alert(`Successfully saved "${currentAdForAction?.title}" to ${folderName || 'folder'} in ${category}!`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-slate-200"></div>
            <div className="p-4">
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-500 mb-4">
          <p>加载失败: {error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          重试
        </button>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-500">
          <p>暂无数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ads.map((ad) => (
          <AdCard 
            key={ad.id} 
            ad={ad} 
            onClick={() => setSelectedAd(ad)}
            onSave={handleSave}
          />
        ))}
      </div>
      
      {/* Ad Detail Panel */}
      {selectedAd && (
        <AdDetail 
          ad={selectedAd} 
          onClose={() => setSelectedAd(null)} 
        />
      )}

      {/* Save to Favorites Modal */}
      <SaveToFavoritesModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveToFavorites}
        defaultCategory="ads"
      />
    </div>
  );
}
