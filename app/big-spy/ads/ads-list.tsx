'use client';

import { useEffect, useState } from 'react';
import { Ad } from '@/lib/types';

interface AdsListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function AdsList({ searchParams }: AdsListProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAds();
  }, [searchParams]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
          params.append(key, value);
        }
      });

      const response = await fetch(`/api/ads?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      
      const data = await response.json();
      setAds(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-muted-foreground">
          <p>加载失败: {error}</p>
          <button 
            onClick={fetchAds}
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center text-muted-foreground">
          <p>暂无数据</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad) => (
          <div key={ad.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              {ad.brandLogo && (
                <img 
                  src={ad.brandLogo} 
                  alt={ad.advertiserName}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-sm">{ad.advertiserName}</p>
                <p className="text-xs text-muted-foreground">{ad.platform}</p>
              </div>
            </div>
            
            {ad.mediaUrls[0] && (
              <img 
                src={ad.mediaUrls[0]} 
                alt="Ad media"
                className="w-full h-32 object-cover rounded-md mb-3"
              />
            )}
            
            {ad.headline && (
              <h3 className="font-medium text-sm mb-2 line-clamp-2">{ad.headline}</h3>
            )}
            
            {ad.primaryText && (
              <p className="text-xs text-muted-foreground mb-3 line-clamp-3">{ad.primaryText}</p>
            )}
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{ad.mediaType}</span>
              {ad.cta && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded">{ad.cta}</span>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs">
              <div className="flex gap-3">
                <span>👍 {ad.engagement.likes.toLocaleString()}</span>
                <span>💬 {ad.engagement.comments.toLocaleString()}</span>
                <span>📤 {ad.engagement.shares.toLocaleString()}</span>
              </div>
              <span className="text-muted-foreground">{ad.country}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}