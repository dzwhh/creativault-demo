'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, FilterIcon, UsersIcon, TikTokIcon, InstagramIcon, YoutubeIcon, ChevronDownIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WatchTutorialButton } from '@/components/ui/watch-tutorial-button';
import { CreatorFilters } from './creator-filters';
import CreatorDetail from './creator-detail';
import { SaveToFavoritesModal } from '@/components/save-to-favorites-modal';
import { EmptyStateTabs } from '@/components/ui/empty-state-tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  followerCount: {
    tiktok: number;
    instagram: number;
    youtube: number;
  };
  avgEngagementRate: number;
  niches: string[];
  location: string;
  contactObfuscated: string;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const getCountryFlag = (code: string): string => {
  const flags: Record<string, string> = {
    'CA': '🇨🇦',
    'US': '🇺🇸',
    'GB': '🇬🇧',
    'IN': '🇮🇳',
    'KR': '🇰🇷',
    'CN': '🇨🇳',
    'JP': '🇯🇵',
    'AU': '🇦🇺',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
  };
  return flags[code] || '🏳️';
};

const getCountryName = (code: string): string => {
  const countries: Record<string, string> = {
    'CA': 'Canada',
    'US': 'United States',
    'GB': 'United Kingdom',
    'IN': 'India',
    'KR': 'South Korea',
    'CN': 'China',
    'JP': 'Japan',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
  };
  return countries[code] || code;
};

const getIndustryIcon = (industry: string): string => {
  const icons: Record<string, string> = {
    'fashion': '👗',
    'beauty': '💄',
    'tech': '💻',
    'food': '🍽️',
    'travel': '✈️',
    'fitness': '💪',
    'gaming': '🎮',
    'music': '🎵',
    'art': '🎨',
    'business': '💼',
  };
  return icons[industry] || '🏷️';
};

interface CreatorRowCardProps {

}

const CreatorRowCard = ({ creator, isSelected = false, onClick, onShortlist, activePlatform }: { 
  creator: Creator; 
  isSelected?: boolean;
  onClick: () => void;
  onShortlist: (creator: Creator) => void;
  activePlatform: string;
}) => {
  const primaryNiche = creator.niches[0] || 'Fashion';
  const [showMoreNiches, setShowMoreNiches] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  // 复制达人名称
  const handleCopyUsername = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(creator.name);
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  // 点击外部区域关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.niches-dropdown') && !target.closest('.niches-button')) {
        setShowMoreNiches(false);
      }
    };

    if (showMoreNiches) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMoreNiches]);
  
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all bg-white ${
        isSelected 
          ? 'border-gray-200 shadow-sm' 
          : showMoreNiches
            ? 'border-gray-200 shadow-sm' // 当弹窗打开时，使用固定的阴影，不应用 hover 效果
            : 'border-gray-100 hover:border-gray-200 hover:shadow-lg'
      } mb-3 w-full`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 w-full min-w-0 overflow-hidden">
        {/* 达人头像和信息 - 固定宽度 */}
        <div className="flex gap-3 flex-shrink-0 w-64">
          <div className="relative flex-shrink-0">
            <img 
              src={creator.avatar} 
              alt={creator.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            {/* 达人名称和平台图标 */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-sm truncate">{creator.name}</h3>
              {activePlatform === 'tiktok' && (
                <TikTokIcon className="w-4 h-4 flex-shrink-0" />
              )}
              {activePlatform === 'instagram' && (
                <InstagramIcon className="w-4 h-4 flex-shrink-0" />
              )}
              {activePlatform === 'youtube' && (
                <YoutubeIcon className="w-4 h-4 flex-shrink-0" />
              )}
            </div>
            
            {/* @达人名称 和 复制按钮 */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500">@{creator.name}</span>
              <div className="relative">
                <button
                  onClick={handleCopyUsername}
                  className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-100 transition-colors"
                  title="Copy username"
                >
                  <svg className="w-3 h-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
                {/* 复制成功提示 */}
                {showCopyTooltip && (
                  <div className="absolute left-0 top-full mt-1 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                    Copied!
                  </div>
                )}
              </div>
            </div>
            
            {/* 地区国家 和 购物车图标 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">{getCountryFlag(creator.location)} {creator.location}</span>
              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 灰色竖分割线 */}
        <div className="w-px h-16 bg-gray-200 flex-shrink-0"></div>

        {/* 3个最近视频 */}
        <div className="flex gap-2 flex-shrink-0">
          <img 
            src={`https://picsum.photos/seed/${creator.id}-video1/48/48`} 
            alt="Recent video 1"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <img 
            src={`https://picsum.photos/seed/${creator.id}-video2/48/48`} 
            alt="Recent video 2"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <img 
            src={`https://picsum.photos/seed/${creator.id}-video3/48/48`} 
            alt="Recent video 3"
            className="w-12 h-12 rounded-lg object-cover"
          />
        </div>

        {/* 6个数据指标 - 弹性容器 */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-3 2xl:grid-cols-6 gap-x-4 gap-y-2 text-xs">
            <div>
              <div className="text-gray-400 uppercase mb-1">Followers</div>
              <div className="font-semibold text-sm">{formatNumber(creator.followerCount.tiktok)}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase mb-1">Avg Views</div>
              <div className="font-semibold text-sm">2.1M</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase mb-1">Engagement Rate</div>
              <div className="font-semibold text-sm">4.2%</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase mb-1">Avg Likes</div>
              <div className="font-semibold text-sm">156K</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase mb-1">Last Video Published</div>
              <div className="font-semibold text-sm">2025-11-11</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase mb-1">Category</div>
              <div className="font-semibold text-sm">{creator.niches[0] || 'Fashion'}</div>
            </div>
          </div>
        </div>

        {/* Shortlist 按钮 - 固定宽度 */}
        <div className="flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShortlist(creator);
            }}
            className="flex items-center gap-1.5 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
            </svg>
            Shortlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CreatorPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'youtube', 'tiktok']);
  const [activePlatform, setActivePlatform] = useState('tiktok');
  const [showDetail, setShowDetail] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isBatchSave, setIsBatchSave] = useState(false);
  const [creatorsToSave, setCreatorsToSave] = useState<Creator[]>([]);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);
  const [showTargetedSearch, setShowTargetedSearch] = useState(false);
  const [showShortlistConfirm, setShowShortlistConfirm] = useState(false);

  const handleWatchTutorial = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  // 处理单个收藏
  const handleShortlistSingle = (creator: Creator) => {
    setCreatorsToSave([creator]);
    setIsBatchSave(false);
    setShowSaveModal(true);
  };

  // 处理批量收藏 - 显示确认弹窗
  const handleShortlistAll = () => {
    if (filteredCreators.length === 0) {
      alert('No influencers to shortlist');
      return;
    }
    setShowShortlistConfirm(true);
  };

  // 确认批量收藏
  const confirmShortlistAll = () => {
    // 直接增加计数并触发动画
    setSubmissionCount(prev => prev + 1);
    setShowBadgeAnimation(true);
    
    // 关闭确认弹窗
    setShowShortlistConfirm(false);
    
    // 显示成功提示
    alert(`Successfully added ${filteredCreators.length} influencers to submission list`);
    
    // 动画结束后重置
    setTimeout(() => {
      setShowBadgeAnimation(false);
    }, 600);
  };

  // 处理保存到收藏夹
  const handleSaveToFavorites = (category: string, folderId: string, folderName?: string) => {
    console.log('Saving to favorites:', {
      category,
      folderId,
      folderName,
      isBatch: isBatchSave,
      creatorsCount: creatorsToSave.length,
      creators: creatorsToSave.map(c => ({ id: c.id, name: c.name }))
    });
    
    // 这里可以添加实际的API调用来保存数据
    // 例如: await fetch('/api/favorites', { method: 'POST', body: JSON.stringify({ ... }) })
    
    // 显示成功提示
    const message = isBatchSave 
      ? `Successfully added ${creatorsToSave.length} influencers to ${folderName || 'favorites'}`
      : `Successfully added ${creatorsToSave[0].name} to ${folderName || 'favorites'}`;
    
    alert(message);
  };

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await fetch('/mock/creators.json');
        const data = await response.json();
        setCreators(data.slice(0, 20)); // 只显示前20个
      } catch (error) {
        console.error('Failed to fetch influencers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const filteredCreators = creators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.niches.some(niche => niche.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="m22 21-3-3"/>
            </svg>
          </div>
          <p className="text-gray-500">Loading influencers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 border-b bg-gray-50 backdrop-blur supports-[backdrop-filter]:bg-gray-50">
        <div className="flex flex-col gap-4 p-6 pb-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Find Influencers</h1>
            <WatchTutorialButton onClick={handleWatchTutorial} />
          </div>
          <p className="text-muted-foreground">Find the right influencers in no time and get your content to the right crowd</p>
          
          {/* Platform Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex gap-0">
            <button
              onClick={() => setActivePlatform('tiktok')}
              className={`flex items-center gap-3 px-4 py-3 border-b-2 transition-all ${
                activePlatform === 'tiktok'
                  ? 'text-black border-black bg-gray-100 font-medium'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <TikTokIcon className="w-5 h-5" />
              <span>TikTok</span>
            </button>
            <button
              onClick={() => setActivePlatform('instagram')}
              className={`flex items-center gap-3 px-4 py-3 border-b-2 transition-all ${
                activePlatform === 'instagram'
                  ? 'text-pink-600 border-pink-600 bg-pink-50 font-medium'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <InstagramIcon className="w-5 h-5" />
              <span>Instagram</span>
            </button>
              <button
                onClick={() => setActivePlatform('youtube')}
                className={`flex items-center gap-3 px-4 py-3 border-b-2 transition-all ${
                  activePlatform === 'youtube'
                    ? 'text-red-600 border-red-600 bg-red-50 font-medium'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <YoutubeIcon className="w-5 h-5" />
                <span>YouTube</span>
              </button>
            </div>
            <div className="relative">
              <Button
                onClick={() => router.push('/asset-studio/influencer-submission')}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 text-white hover:opacity-90"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                  <path d="M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2"/>
                </svg>
                Influencer Submission
              </Button>
              {submissionCount > 0 && (
                <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 ${
                  showBadgeAnimation ? 'animate-bounce' : ''
                }`}>
                  {submissionCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Filter and List */}
      <div className="bg-white h-full p-6">
        <div className="flex flex-1 overflow-hidden">
          {/* Filter Panel */}
          <CreatorFilters onTargetedSearchClick={() => setShowTargetedSearch(true)} />
        
        {/* Right Creator List */}
        <div className={`${showDetail ? 'flex-1' : 'flex-1'} overflow-hidden`}>
          {/* Search Bar and Shortlist - 仅在非定向采集模式下显示 */}
          {!showTargetedSearch && (
            <div className="bg-white p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search influencers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-44"
                  />
                  {/* Targeted Collection Button - Inside Search Box */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 h-8"
                    onClick={() => setShowTargetedSearch(true)}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11 2v2.07A8 8 0 0 0 4.07 11H2v2h2.07A8 8 0 0 0 11 19.93V22h2v-2.07A8 8 0 0 0 19.93 13H22v-2h-2.07A8 8 0 0 0 13 4.07V2m-2 4.08V8h2V6.09c2.5.41 4.5 2.41 4.92 4.91H16v2h1.91c-.41 2.5-2.41 4.5-4.91 4.92V16h-2v1.91C8.5 17.5 6.5 15.5 6.08 13H8v-2H6.09C6.5 8.5 8.5 6.5 11 6.08M12 11a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1"/>
                    </svg>
                    Targeted Collection
                  </Button>
                </div>
                {/* Search Button */}
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    // TODO: Handle search action
                    console.log('Search clicked:', searchQuery);
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  Search
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleShortlistAll}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
                  </svg>
                  Shortlist all
                </Button>
              </div>
              
              {/* Quick Select Tags */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs text-gray-400">Quick Select</span>
                <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3zM12 8v8M8 12h8"/>
                  </svg>
                  Columns
                </button>
                <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Has Email
                </button>
                <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  AI Creator
                </button>
                <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">💄 Beauty</button>
                <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">👗 Fashion</button>
                <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">📱 Consumer Electronics</button>
                <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">🎮 Gaming</button>
                {/* Amazon Top Creator - Only show on Instagram tab */}
                {activePlatform === 'instagram' && (
                  <button className="px-2.5 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.42 14.58c-.51-.51-1.41-1.37-2.54-2.54-1.13-1.17-2.53-2.6-4.05-4.1-1.52-1.5-2.97-2.95-4.15-4.1-1.18-1.15-2.03-2.01-2.55-2.54-.35-.35-.92-.35-1.27 0s-.35.92 0 1.27c.52.52 1.37 1.37 2.52 2.52 1.15 1.15 2.56 2.57 4.04 4.1 1.48 1.53 2.87 2.97 4.03 4.12 1.16 1.15 2.01 2.01 2.53 2.54.35.35.92.35 1.27 0s.35-.92.17-1.27z"/>
                      <path d="M7.5 21c-2.07 0-3.75-1.68-3.75-3.75v-7.5C3.75 7.68 5.43 6 7.5 6h9c2.07 0 3.75 1.68 3.75 3.75v7.5c0 2.07-1.68 3.75-3.75 3.75h-9z"/>
                    </svg>
                    Amazon Top Creator
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div className="h-full overflow-y-auto overflow-x-visible">
            <div className="pl-6 pr-6 py-6 pb-20">
              {showTargetedSearch ? (
                <>
                  {/* Back to List Button - 定向采集模式下显示 */}
                  <div className="mb-6 -mt-2">
                    <button
                      onClick={() => setShowTargetedSearch(false)}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                      <span>Back to List</span>
                    </button>
                  </div>
                  {/* Targeted Collection - Empty State with Tabs (Upload/Link/Keywords) */}
                  <EmptyStateTabs
                  onFileSelect={(file) => {
                    console.log('File selected:', file.name);
                    // TODO: Handle CSV file upload and parse influencer data
                    setShowTargetedSearch(false);
                  }}
                  onLinkCollect={async (url) => {
                    console.log('Collecting from URL:', url);
                    // TODO: Handle URL collection - fetch influencer data from social media URL
                    alert(`Starting collection from: ${url}`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    alert('Collection completed!');
                    setShowTargetedSearch(false);
                  }}
                  onWordsCollect={async (platform, keywords) => {
                    console.log('Searching on', platform, 'for:', keywords);
                    // TODO: Handle keyword search - find influencers by keywords on selected platform
                    alert(`Searching on ${platform.toUpperCase()} for: ${keywords.join(', ')}`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    alert(`Found influencers for: ${keywords.join(', ')}`);
                    setShowTargetedSearch(false);
                  }}
                  onCollectionSubmit={async (requirements) => {
                    console.log('Collection requirements:', requirements);
                    // TODO: Submit collection requirements to backend
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    setShowTargetedSearch(false);
                  }}
                  defaultTab="upload"
                />
                </>
              ) : filteredCreators.length === 0 ? (
                /* Empty State with Tabs (Upload/Link/Keywords) */
                <EmptyStateTabs
                  onFileSelect={(file) => {
                    console.log('File selected:', file.name);
                    // TODO: Handle CSV file upload and parse influencer data
                  }}
                  onLinkCollect={async (url) => {
                    console.log('Collecting from URL:', url);
                    // TODO: Handle URL collection - fetch influencer data from social media URL
                    alert(`Starting collection from: ${url}`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    alert('Collection completed!');
                  }}
                  onWordsCollect={async (platform, keywords) => {
                    console.log('Searching on', platform, 'for:', keywords);
                    // TODO: Handle keyword search - find influencers by keywords on selected platform
                    alert(`Searching on ${platform.toUpperCase()} for: ${keywords.join(', ')}`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    alert(`Found influencers for: ${keywords.join(', ')}`);
                  }}
                  defaultTab="upload"
                />
              ) : (
                /* Creator List */
                filteredCreators.map((creator) => (
                  <CreatorRowCard
                    key={creator.id}
                    creator={creator}
                    isSelected={selectedCreator?.id === creator.id}
                    onClick={() => {
                      setSelectedCreator(creator);
                      setShowDetail(true);
                    }}
                    onShortlist={handleShortlistSingle}
                    activePlatform={activePlatform}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
      
      {/* Creator Detail Modal - 模态窗口模式 */}
      {showDetail && selectedCreator && (
        <CreatorDetail
          creator={selectedCreator}
          onClose={() => setShowDetail(false)}
          initialPlatform={activePlatform as 'tiktok' | 'youtube' | 'instagram'}
        />
      )}

      {/* Save to Favorites Modal */}
      <SaveToFavoritesModal
        isOpen={showSaveModal}
        onClose={() => {
          setShowSaveModal(false);
          setCreatorsToSave([]);
        }}
        onSave={handleSaveToFavorites}
        defaultCategory="creator"
      />

      {/* Shortlist All Confirmation Dialog */}
      <Dialog open={showShortlistConfirm} onOpenChange={setShowShortlistConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Shortlist All</DialogTitle>
            <DialogDescription>
              Are you sure you want to add all {filteredCreators.length} influencers to the submission list?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowShortlistConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmShortlistAll}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                title="Influencers Tutorial Video"
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