'use client';

import { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, UsersIcon, TikTokIcon, InstagramIcon, YoutubeIcon, ChevronDownIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WatchTutorialButton } from '@/components/ui/watch-tutorial-button';
import { CreatorFilters } from './creator-filters';
import CreatorDetail from './creator-detail';
import { SaveToFavoritesModal } from '@/components/save-to-favorites-modal';

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

const CreatorRowCard = ({ creator, isSelected = false, onClick, onShortlist }: { 
  creator: Creator; 
  isSelected?: boolean;
  onClick: () => void;
  onShortlist: (creator: Creator) => void;
}) => {
  const primaryNiche = creator.niches[0] || 'Fashion';
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [showMoreNiches, setShowMoreNiches] = useState(false);

  // 点击外部区域关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.contact-dropdown') && !target.closest('.contact-button')) {
        setShowContactDropdown(false);
      }
      if (!target.closest('.niches-dropdown') && !target.closest('.niches-button')) {
        setShowMoreNiches(false);
      }
    };

    if (showContactDropdown || showMoreNiches) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showContactDropdown, showMoreNiches]);
  
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all bg-white ${
        isSelected 
          ? 'border-gray-200 shadow-sm' 
          : showContactDropdown || showMoreNiches
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
            {/* 达人名称和Contact按钮 */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-sm truncate">{creator.name}</h3>
              <div className="relative">
                 <button
                   onClick={(e) => {
                     e.stopPropagation();
                     setShowContactDropdown(!showContactDropdown);
                   }}
                   className="contact-button flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                 >
                   Contact
                   <ChevronDownIcon className={`w-3 h-3 transition-transform ${showContactDropdown ? 'rotate-180' : ''}`} />
                 </button>
                 
                 {/* Contact 下拉菜单 */}
                 {showContactDropdown && (
                   <div className="contact-dropdown absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] min-w-40">
                    <div className="p-2 space-y-1">
                      <a 
                        href={`mailto:${creator.contactObfuscated}`}
                        className="flex items-center gap-2 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 rounded"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Email
                      </a>
                      <a 
                        href={`https://wa.me/1234567890`}
                        className="flex items-center gap-2 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 rounded"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* 地区国家 */}
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-gray-600">{getCountryFlag(creator.location)} {creator.location}</span>
            </div>
            
            {/* 行业标签 */}
            <div className="flex items-center gap-1 flex-wrap">
              {creator.niches.slice(0, 3).map((niche, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                  <span className="mr-1">{getIndustryIcon(niche)}</span>
                  {niche}
                </Badge>
              ))}
              {creator.niches.length > 3 && (
                <div className="relative">
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       setShowMoreNiches(!showMoreNiches);
                     }}
                     className="niches-button text-xs text-blue-600 hover:text-blue-800 px-1 py-0.5 rounded hover:bg-blue-50 transition-colors"
                   >
                     +more
                   </button>
                   
                   {/* 更多行业标签弹窗 */}
                   {showMoreNiches && (
                     <div className="niches-dropdown absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] min-w-48 max-w-64">
                      <div className="p-3">
                        <div className="text-xs font-medium text-gray-700 mb-2">All Industries</div>
                        <div className="flex flex-wrap gap-1">
                          {creator.niches.map((niche, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                              <span className="mr-1">{getIndustryIcon(niche)}</span>
                              {niche}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 灰色竖分割线 */}
        <div className="w-px h-16 bg-gray-200 flex-shrink-0"></div>

        {/* 3个最近视频 - 固定宽度 */}
        <div className="flex gap-2 flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
            <span className="text-lg">📷</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
            <span className="text-lg">📹</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
            <span className="text-lg">📷</span>
          </div>
        </div>

        {/* 受众性别分布 - 固定宽度 */}
        <div className="flex-shrink-0 w-16">
          <div className="text-center mb-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-pink-500 text-sm">♀</span>
              <span className="font-semibold text-xs">90%</span>
            </div>
            <div className="text-xs text-gray-500">Female</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-blue-500 text-sm">♂</span>
              <span className="font-semibold text-xs">10%</span>
            </div>
            <div className="text-xs text-gray-500">Male</div>
          </div>
        </div>

        {/* 各媒体平台粉丝数 - 固定宽度 */}
        <div className="flex-shrink-0 w-24">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-black text-xs font-bold flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                {formatNumber(creator.followerCount.tiktok)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <InstagramIcon className="w-3 h-3" />
              <span className="font-semibold text-xs">{formatNumber(creator.followerCount.instagram)}</span>
            </div>
            <div className="flex items-center gap-1">
              <YoutubeIcon className="w-3 h-3" />
              <span className="font-semibold text-xs">{formatNumber(creator.followerCount.youtube)}</span>
            </div>
          </div>
        </div>

        {/* 最近数据表现 - 弹性宽度 */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-gray-500">Avg View Rate</div>
              <div className="font-semibold">85%</div>
            </div>
            <div>
              <div className="text-gray-500">Engagement Rate</div>
              <div className="font-semibold">4.2%</div>
            </div>
            <div>
              <div className="text-gray-500">Videos</div>
              <div className="font-semibold">24</div>
            </div>
            <div>
              <div className="text-gray-500">Est. Reach</div>
              <div className="font-semibold">2.1M</div>
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
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'youtube', 'tiktok']);
  const [showDetail, setShowDetail] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isBatchSave, setIsBatchSave] = useState(false);
  const [creatorsToSave, setCreatorsToSave] = useState<Creator[]>([]);

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

  // 处理批量收藏
  const handleShortlistAll = () => {
    if (filteredCreators.length === 0) {
      alert('No influencers to shortlist');
      return;
    }
    setCreatorsToSave(filteredCreators);
    setIsBatchSave(true);
    setShowSaveModal(true);
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
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Find Influencers</h1>
            <WatchTutorialButton onClick={handleWatchTutorial} />
          </div>
          <p className="text-muted-foreground">Find the right influencers in no time and get your content to the right crowd</p>
        </div>
      </div>

      {/* Main Content Area with Filter and List */}
      <div className="bg-white h-full p-6">
        <div className="flex flex-1 overflow-hidden">
          {/* Filter Panel */}
          <CreatorFilters />
        
        {/* Right Creator List */}
        <div className={`${showDetail ? 'flex-1' : 'flex-1'} overflow-hidden`}>
          {/* Search Bar and Shortlist - 移到右侧列表最上方 */}
          <div className="bg-white p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search influencers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
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
          </div>
          
          <div className="h-full overflow-y-auto overflow-x-visible">
            <div className="pl-6 pr-6 py-6 pb-20">
              {filteredCreators.length === 0 ? (
                /* Empty State with Upload Template */
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 max-w-2xl w-full">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Influencers Found</h3>
                      <p className="text-sm text-gray-500 mb-6">Upload a CSV file with influencer information to get started</p>
                    </div>

                    {/* Upload Template Guide */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">CSV Template Format</h4>
                      <div className="bg-white border border-gray-200 rounded overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-2 bg-gray-100 border-b border-gray-200">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-700 border-r border-gray-200">Platform</div>
                          <div className="px-4 py-2 text-xs font-semibold text-gray-700">Username</div>
                        </div>
                        {/* Table Rows */}
                        <div className="grid grid-cols-2 border-b border-gray-200">
                          <div className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200 flex items-center gap-2">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                            TikTok
                          </div>
                          <div className="px-4 py-2 text-xs text-gray-600">@username</div>
                        </div>
                        <div className="grid grid-cols-2 border-b border-gray-200">
                          <div className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200 flex items-center gap-2">
                            <InstagramIcon className="w-3 h-3" />
                            Instagram
                          </div>
                          <div className="px-4 py-2 text-xs text-gray-600">@username</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200 flex items-center gap-2">
                            <YoutubeIcon className="w-3 h-3" />
                            YouTube
                          </div>
                          <div className="px-4 py-2 text-xs text-gray-600">@username</div>
                        </div>
                      </div>
                    </div>

                    {/* Upload Button */}
                    <div className="text-center">
                      <label className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload CSV File
                        <input type="file" accept=".csv" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            console.log('File selected:', file.name);
                            // TODO: Handle file upload
                          }
                        }} />
                      </label>
                      <p className="text-xs text-gray-500 mt-3">Supported format: CSV (Max 5MB)</p>
                    </div>
                  </div>
                </div>
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