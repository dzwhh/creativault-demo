'use client';

// Home页面专用的广告卡片组件
interface HomeAdCardProps {
  ad: {
    id: string;
    title: string;
    domain: string;
    publishedDate: string;
    adsets: number;
    likes: number;
    spend: number;
    isNew: boolean;
    mediaUrl: string;
    hasVideo: boolean;
    platforms?: Array<{
      name: string;
      icon: string;
    }>;
  };
  rank: number;
}

export const HomeAdCard = ({ ad, rank }: HomeAdCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
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
        
        {/* Ranking Number - Top Right */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-2.5 py-1.5 rounded-full shadow-lg border-2 border-white z-10">
          #{rank}
        </div>
        
        {/* Top Right - Adsets Count (moved left when rank is shown) */}
        <div className="absolute top-3 right-16 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
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
        <h3 className="font-medium text-sm text-slate-900 mb-1 line-clamp-1">
          {ad.title}
        </h3>
        <p className="text-xs text-slate-600 mb-2">{ad.domain}</p>
        <p className="text-xs text-slate-500">Published on: {ad.publishedDate}</p>
      </div>
    </div>
  );
};