'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TikTokIcon, InstagramIcon, YoutubeIcon } from '@/components/icons';
import { NormalDetail } from '@/components/normal-detail';

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

interface CreatorDetailProps {
  creator: Creator;
  onClose: () => void;
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
  return icons[industry.toLowerCase()] || '🏷️';
};

// Mock data for demonstration
const mockData = {
  avgViewRate: 85.4,
  engagementRate: 8.2,
  totalVideos: 156,
  estReach: 2400000,
  gmv: 1850000,
  itemsSold: 12500,
  language: 'English',
  lastUpdate: '2025-10-15 14:30',
  genderDistribution: {
    female: 65.3,
    male: 34.7,
  },
  ageDistribution: [
    { range: '18-24', percentage: 35.2 },
    { range: '25-34', percentage: 42.8 },
    { range: '35-44', percentage: 15.3 },
    { range: '45+', percentage: 6.7 },
  ],
  topCountries: [
    { country: 'United States', percentage: 45.2, flag: '🇺🇸' },
    { country: 'Canada', percentage: 18.5, flag: '🇨🇦' },
    { country: 'United Kingdom', percentage: 15.3, flag: '🇬🇧' },
    { country: 'Australia', percentage: 12.1, flag: '🇦🇺' },
    { country: 'Germany', percentage: 8.9, flag: '🇩🇪' },
  ],
  brandPartnerships: [
    {
      id: '1',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop',
      name: 'Nike',
      cooperationTime: '2024-01 ~ 2024-06',
      mode: 'Commission',
      productCount: 15,
      estimatedPrice: '$5,000 - $8,000',
    },
    {
      id: '2',
      logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&h=100&fit=crop',
      name: 'Adidas',
      cooperationTime: '2024-03 ~ 2024-08',
      mode: 'Fixed Fee',
      productCount: 8,
      estimatedPrice: '$3,000 - $5,000',
    },
    {
      id: '3',
      logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      name: 'Puma',
      cooperationTime: '2024-05 ~ Present',
      mode: 'Commission',
      productCount: 12,
      estimatedPrice: '$4,000 - $6,000',
    },
  ],
  recentVideos: [
    {
      id: '1',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=400&fit=crop',
      title: 'Latest Fashion Trends 2025',
      views: 1200000,
      likes: 98000,
      comments: 5200,
      shares: 12000,
    },
    {
      id: '2',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&fit=crop',
      title: 'Summer Style Guide',
      views: 850000,
      likes: 72000,
      comments: 3800,
      shares: 8500,
    },
    {
      id: '3',
      thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=400&fit=crop',
      title: 'Affordable Outfit Ideas',
      views: 2100000,
      likes: 156000,
      comments: 8900,
      shares: 18000,
    },
    {
      id: '4',
      thumbnail: 'https://images.unsplash.com/photo-1558769132-cb1aea8f2c00?w=300&h=400&fit=crop',
      title: 'Wardrobe Essentials',
      views: 950000,
      likes: 81000,
      comments: 4200,
      shares: 9800,
    },
    {
      id: '5',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      title: 'Fashion Week Highlights',
      views: 1350000,
      likes: 115000,
      comments: 6700,
      shares: 14500,
    },
    {
      id: '6',
      thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop',
      title: 'Shopping Haul',
      views: 780000,
      likes: 62000,
      comments: 3100,
      shares: 7200,
    },
    {
      id: '7',
      thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=400&fit=crop',
      title: 'Winter Collection Review',
      views: 1150000,
      likes: 95000,
      comments: 5800,
      shares: 11000,
    },
    {
      id: '8',
      thumbnail: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=400&fit=crop',
      title: 'Accessories Guide',
      views: 920000,
      likes: 78000,
      comments: 4500,
      shares: 9100,
    },
    {
      id: '9',
      thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=400&fit=crop',
      title: 'Sustainable Fashion Tips',
      views: 1080000,
      likes: 89000,
      comments: 5300,
      shares: 10500,
    },
    {
      id: '10',
      thumbnail: 'https://images.unsplash.com/photo-1509319117920-cef7b5a36e3c?w=300&h=400&fit=crop',
      title: 'Styling Basics',
      views: 865000,
      likes: 71000,
      comments: 3900,
      shares: 8300,
    },
  ],
};

export default function CreatorDetail({ creator, onClose }: CreatorDetailProps) {
  const [activeTab, setActiveTab] = useState<'tiktok' | 'youtube' | 'instagram' | 'amazon'>('tiktok');
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [activePerformanceTab, setActivePerformanceTab] = useState('Avg View Rate');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowContactDropdown(false);
      }
    }

    if (showContactDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showContactDropdown]);

  // ESC键关闭
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40" 
        onClick={onClose}
      />
      
      {/* 详情页面 */}
      <div 
        className="fixed top-4 right-4 bottom-4 w-[calc(50vw+200px)] bg-white rounded-xl shadow-xl z-50 overflow-hidden"
        style={{ maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 32px)' }}
      >
        <NormalDetail title="Influencer Details" detailType="creator">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              {/* Creator Avatar and Basic Info */}
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{creator.name}</h3>
                    <div className="relative" ref={dropdownRef}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 text-sm flex items-center gap-1.5"
                        onClick={() => setShowContactDropdown(!showContactDropdown)}
                      >
                        Contact
                        <svg 
                          className={`w-4 h-4 transition-transform ${
                            showContactDropdown ? 'rotate-180' : ''
                          }`} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </Button>
                      {showContactDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors"
                            onClick={() => {
                              setShowContactDropdown(false);
                              // Handle email contact
                            }}
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="4" width="20" height="16" rx="2"/>
                              <path d="M22 7l-10 7L2 7"/>
                            </svg>
                            Email
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg transition-colors"
                            onClick={() => {
                              setShowContactDropdown(false);
                              // Handle WhatsApp contact
                            }}
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    Last Update: {mockData.lastUpdate}
                    <button 
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => {
                        // Handle refresh action
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Basic Info Grid - 2x2 Layout */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Country */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Country:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{getCountryFlag(creator.location)}</span>
                    <span className="text-gray-900">{getCountryName(creator.location)}</span>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Language:</span>
                  <span className="text-gray-900">{mockData.language}</span>
                </div>

                {/* Industry */}
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-gray-500 whitespace-nowrap">Industry:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {creator.niches.map((niche, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                        <span className="mr-0.5">{getIndustryIcon(niche)}</span>
                        {niche}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Followers */}
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-gray-500 whitespace-nowrap">Followers:</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                      <TikTokIcon className="w-4 h-4" />
                      <span className="font-semibold text-gray-900">{formatNumber(creator.followerCount.tiktok)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <InstagramIcon className="w-4 h-4" />
                      <span className="font-semibold text-gray-900">{formatNumber(creator.followerCount.instagram)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <YoutubeIcon className="w-4 h-4" />
                      <span className="font-semibold text-gray-900">{formatNumber(creator.followerCount.youtube)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation - Platform Based */}
              <div className="mb-6">
                <div className="inline-flex gap-1 p-1 bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setActiveTab('tiktok')}
                    className={`flex-shrink-0 px-3 py-2 rounded-md transition-all duration-200 ${
                      activeTab === 'tiktok'
                        ? 'bg-white shadow-sm'
                        : 'bg-transparent hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TikTokIcon className="w-5 h-5" />
                      <span className={`text-sm font-medium ${
                        activeTab === 'tiktok' ? 'text-gray-900' : 'text-gray-600'
                      }`}>TikTok</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('youtube')}
                    className={`flex-shrink-0 px-3 py-2 rounded-md transition-all duration-200 ${
                      activeTab === 'youtube'
                        ? 'bg-white shadow-sm'
                        : 'bg-transparent hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <YoutubeIcon className="w-5 h-5" />
                      <span className={`text-sm font-medium ${
                        activeTab === 'youtube' ? 'text-gray-900' : 'text-gray-600'
                      }`}>YouTube</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('instagram')}
                    className={`flex-shrink-0 px-3 py-2 rounded-md transition-all duration-200 ${
                      activeTab === 'instagram'
                        ? 'bg-white shadow-sm'
                        : 'bg-transparent hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <InstagramIcon className="w-5 h-5" />
                      <span className={`text-sm font-medium ${
                        activeTab === 'instagram' ? 'text-gray-900' : 'text-gray-600'
                      }`}>Instagram</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('amazon')}
                    className={`flex-shrink-0 px-3 py-2 rounded-md transition-all duration-200 ${
                      activeTab === 'amazon'
                        ? 'bg-white shadow-sm'
                        : 'bg-transparent hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 flex items-center justify-center text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 128 128">
                          <path fill="#252f3e" d="M36.379 53.64c0 1.56.168 2.825.465 3.75c.336.926.758 1.938 1.347 3.032c.207.336.293.672.293.969c0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379c-.422 0-.844-.211-1.266-.59a13.3 13.3 0 0 1-1.516-1.98a34 34 0 0 1-1.304-2.485q-4.924 5.813-12.38 5.813c-3.535 0-6.355-1.012-8.421-3.032c-2.063-2.023-3.114-4.718-3.114-8.086c0-3.578 1.262-6.484 3.833-8.671c2.566-2.192 5.976-3.286 10.316-3.286c1.43 0 2.902.125 4.46.336c1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.4 33.4 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547c-.296.082-.507.125-.675.125c-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476c.21-.293.59-.586 1.18-.883q2.21-1.137 5.304-1.895c2.063-.547 4.254-.8 6.57-.8c5.008 0 8.672 1.136 11.032 3.41c2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758c1.516-.508 2.863-1.433 4-2.695c.672-.8 1.18-1.684 1.43-2.695c.254-1.012.422-2.23.422-3.665v-1.765a34 34 0 0 0-3.871-.719a32 32 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684c-1.387 1.136-2.062 2.734-2.062 4.84c0 1.98.504 3.453 1.558 4.464c1.012 1.051 2.485 1.559 4.422 1.559m33.809 4.547c-.758 0-1.262-.125-1.598-.422c-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687c0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421c.336.25.59.84.84 1.64l7.074 27.876l6.57-27.875c.208-.84.462-1.39.797-1.64c.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422c.336.25.633.84.8 1.64l6.653 28.212l7.285-28.211c.25-.84.547-1.39.84-1.64c.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051c0 .21-.043.422-.086.676s-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64c-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422c-.34-.297-.633-.844-.801-1.684l-6.527-27.16l-6.485 27.117c-.21.844-.46 1.391-.8 1.684c-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758s-3.746-1.055-4.84-1.684c-.676-.379-1.137-.8-1.305-1.18a2.9 2.9 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304q.376 0 .757.129c.25.082.629.25 1.05.418a23 23 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504c2.653 0 4.715-.465 6.145-1.39c1.433-.926 2.191-2.274 2.191-4c0-1.18-.379-2.145-1.136-2.946c-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293c-1.39-1.855-2.106-3.918-2.106-6.105q0-2.655 1.137-4.676a10.8 10.8 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188s3.452-.715 5.304-.715c.926 0 1.894.043 2.82.168c.969.125 1.852.293 2.738.461c.84.211 1.641.422 2.399.676q1.137.379 1.77.758c.59.336 1.011.672 1.261 1.05q.38.509.379 1.391v1.98c0 .884-.336 1.348-.969 1.348c-.336 0-.883-.171-1.597-.507q-3.604-1.641-8.086-1.641c-2.399 0-4.293.379-5.598 1.18c-1.309.797-1.98 2.02-1.98 3.746c0 1.18.421 2.191 1.261 2.988c.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043s1.938 3.707 1.938 5.895c0 1.812-.38 3.453-1.094 4.882c-.758 1.434-1.77 2.696-3.074 3.707c-1.305 1.051-2.864 1.809-4.672 2.36c-1.895.586-3.875.883-6.024.883m0 0"/>
                          <path fill="#f90" d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832c-1.223.883-1.012 2.062.336 1.894c4.508-.547 14.44-1.726 16.21.547c1.77 2.23-1.976 11.62-3.663 15.79c-.504 1.26.59 1.769 1.726.8c7.41-6.231 9.348-19.242 7.832-21.137c-.757-.925-4.388-1.79-8.82-1.726M1.63 75.859c-.927.116-1.347 1.236-.368 2.121c16.508 14.902 38.359 23.872 62.613 23.872c17.305 0 37.43-5.43 51.281-15.66c2.273-1.688.297-4.254-2.02-3.204c-15.534 6.57-32.421 9.77-47.788 9.77c-22.778 0-44.8-6.273-62.653-16.633c-.39-.231-.755-.304-1.064-.266z"/>
                        </svg>
                      </div>
                      <span className={`text-sm font-medium ${
                        activeTab === 'amazon' ? 'text-gray-900' : 'text-gray-600'
                      }`}>Amazon</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tab Content - Platform Based */}
              <div>
                {/* TikTok Tab */}
                {activeTab === 'tiktok' && (
                  <div className="space-y-6">
                    {/* Performance Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                      
                      {/* Performance Card with Tabs */}
                      <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200">
                          <nav className="flex" aria-label="Tabs">
                            {['Avg View Rate', 'Engagement Rate', 'Videos', 'Est. Reach', 'GMV', 'Items Sold'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActivePerformanceTab(tab)}
                                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                                  activePerformanceTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </nav>
                        </div>
                        
                        {/* Content Area */}
                        <div className="p-4">
                          <div>
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">14-Day Trend</span>
                                <span className="text-lg font-semibold text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${mockData.avgViewRate}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${mockData.engagementRate}%`}
                                  {activePerformanceTab === 'Videos' && mockData.totalVideos}
                                  {activePerformanceTab === 'Est. Reach' && formatNumber(mockData.estReach)}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(mockData.gmv)}`}
                                  {activePerformanceTab === 'Items Sold' && formatNumber(mockData.itemsSold)}
                                </span>
                              </div>
                              
                              {/* Trend Chart */}
                              <div className="h-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between px-2 py-2">
                                {/* 14-day data bars */}
                                {[0.6, 0.8, 0.7, 0.9, 0.5, 0.8, 1.0, 0.7, 0.9, 0.6, 0.8, 0.7, 0.9, 0.8].map((height, index) => (
                                  <div
                                    key={index}
                                    className="bg-blue-500 rounded-sm transition-all duration-300 hover:bg-blue-600"
                                    style={{
                                      height: `${height * 60}px`,
                                      width: '12px',
                                      opacity: 0.8
                                    }}
                                  />
                                ))}
                              </div>
                              
                              {/* Date Labels */}
                              <div className="flex justify-between mt-2 text-xs text-gray-400">
                                <span>14d ago</span>
                                <span>7d ago</span>
                                <span>Today</span>
                              </div>
                            </div>
                            
                            {/* Performance Metrics */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Average</div>
                                <div className="text-sm font-medium text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${mockData.avgViewRate}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${mockData.engagementRate}%`}
                                  {activePerformanceTab === 'Videos' && `${Math.round(mockData.totalVideos / 14)}/day`}
                                  {activePerformanceTab === 'Est. Reach' && `${formatNumber(Math.round(mockData.estReach / 14))}/day`}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(Math.round(mockData.gmv / 14))}/day`}
                                  {activePerformanceTab === 'Items Sold' && `${formatNumber(Math.round(mockData.itemsSold / 14))}/day`}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Peak</div>
                                <div className="text-sm font-medium text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${(mockData.avgViewRate * 1.2).toFixed(1)}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${(mockData.engagementRate * 1.3).toFixed(1)}%`}
                                  {activePerformanceTab === 'Videos' && Math.round(mockData.totalVideos / 10)}
                                  {activePerformanceTab === 'Est. Reach' && formatNumber(Math.round(mockData.estReach / 10))}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(Math.round(mockData.gmv / 10))}`}
                                  {activePerformanceTab === 'Items Sold' && formatNumber(Math.round(mockData.itemsSold / 10))}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Change</div>
                                <div className="text-sm font-medium text-green-600">
                                  {activePerformanceTab === 'Avg View Rate' && '+5%'}
                                  {activePerformanceTab === 'Engagement Rate' && '+8%'}
                                  {activePerformanceTab === 'Videos' && '+12%'}
                                  {activePerformanceTab === 'Est. Reach' && '+15%'}
                                  {activePerformanceTab === 'GMV' && '+18%'}
                                  {activePerformanceTab === 'Items Sold' && '+10%'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Audience Analysis Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Analysis</h3>
                      
                      {/* First Row: Gender Pie Chart and Age Distribution */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Gender Distribution - Combined Pie Chart */}
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="text-sm font-semibold text-gray-900">Gender Distribution</div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              {/* Pie Chart */}
                              <div className="relative w-32 h-32 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                  {/* Female segment */}
                                  <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    fill="none"
                                    stroke="#ec4899"
                                    strokeWidth="16"
                                    strokeDasharray={`${2 * Math.PI * 56 * mockData.genderDistribution.female / 100} ${2 * Math.PI * 56}`}
                                  />
                                  {/* Male segment */}
                                  <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    fill="none"
                                    stroke="#3b82f6"
                                    strokeWidth="16"
                                    strokeDasharray={`${2 * Math.PI * 56 * mockData.genderDistribution.male / 100} ${2 * Math.PI * 56}`}
                                    strokeDashoffset={`-${2 * Math.PI * 56 * mockData.genderDistribution.female / 100}`}
                                  />
                                </svg>
                              </div>
                              
                              {/* Legend */}
                              <div className="flex-1 ml-6 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-pink-500 text-xl">♀</span>
                                    <span className="text-sm text-gray-700">Female</span>
                                  </div>
                                  <span className="text-lg font-bold text-gray-900">{mockData.genderDistribution.female}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-500 text-xl">♂</span>
                                    <span className="text-sm text-gray-700">Male</span>
                                  </div>
                                  <span className="text-lg font-bold text-gray-900">{mockData.genderDistribution.male}%</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Age Distribution - Adaptive */}
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="text-sm font-semibold text-gray-900">Age Distribution</div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {mockData.ageDistribution.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700 min-w-[60px]">{item.range}</span>
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-emerald-500 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.percentage}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Second Row: Top Countries */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="text-sm font-semibold text-gray-900">Top Countries</div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {mockData.topCountries.map((item, index) => (
                              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{item.flag}</span>
                                  <span className="text-sm text-gray-700">{item.country}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-sky-500 rounded-full"
                                      style={{ width: `${item.percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.percentage}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Brand Partnerships Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Partnerships</h3>
                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Brand</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Cooperation Time</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Mode</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Products</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Estimated Price</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {mockData.brandPartnerships.map((brand) => (
                                  <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={brand.logo}
                                          alt={brand.name}
                                          className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        <span className="font-medium text-sm text-gray-900">{brand.name}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{brand.cooperationTime}</td>
                                    <td className="px-4 py-3">
                                      <Badge variant={brand.mode === 'Commission' ? 'secondary' : 'default'} className="text-xs">
                                        {brand.mode}
                                      </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{brand.productCount}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{brand.estimatedPrice}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Videos Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Videos</h3>
                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Video</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Views</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Comments</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Shares</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {mockData.recentVideos.map((video) => (
                                  <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={video.thumbnail}
                                          alt={video.title}
                                          className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <span className="text-sm text-gray-900 line-clamp-2 max-w-xs">{video.title}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.views)}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.comments)}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.shares)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* YouTube Tab */}
                {activeTab === 'youtube' && (
                  <div className="space-y-6">
                    {/* Performance Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                      
                      {/* Performance Card with Tabs */}
                      <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200">
                          <nav className="flex" aria-label="Tabs">
                            {['Avg View Rate', 'Engagement Rate', 'Videos', 'Est. Reach', 'GMV', 'Items Sold'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActivePerformanceTab(tab)}
                                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                                  activePerformanceTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </nav>
                        </div>
                        
                        {/* Content Area */}
                        <div className="p-4">
                          <div>
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">14-Day Trend</span>
                                <span className="text-lg font-semibold text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${mockData.avgViewRate}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${mockData.engagementRate}%`}
                                  {activePerformanceTab === 'Videos' && mockData.totalVideos}
                                  {activePerformanceTab === 'Est. Reach' && formatNumber(mockData.estReach)}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(mockData.gmv)}`}
                                  {activePerformanceTab === 'Items Sold' && formatNumber(mockData.itemsSold)}
                                </span>
                              </div>
                              
                              {/* Trend Chart */}
                              <div className="h-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between px-2 py-2">
                                {/* 14-day data bars */}
                                {[0.6, 0.8, 0.7, 0.9, 0.5, 0.8, 1.0, 0.7, 0.9, 0.6, 0.8, 0.7, 0.9, 0.8].map((height, index) => (
                                  <div
                                    key={index}
                                    className="bg-blue-500 rounded-sm transition-all duration-300 hover:bg-blue-600"
                                    style={{
                                      height: `${height * 60}px`,
                                      width: '12px',
                                      opacity: 0.8
                                    }}
                                  />
                                ))}
                              </div>
                              
                              {/* Date Labels */}
                              <div className="flex justify-between mt-2 text-xs text-gray-400">
                                <span>14d ago</span>
                                <span>7d ago</span>
                                <span>Today</span>
                              </div>
                            </div>
                            
                            {/* Performance Metrics */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Average</div>
                                <div className="text-sm font-medium text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${mockData.avgViewRate}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${mockData.engagementRate}%`}
                                  {activePerformanceTab === 'Videos' && `${Math.round(mockData.totalVideos / 14)}/day`}
                                  {activePerformanceTab === 'Est. Reach' && `${formatNumber(Math.round(mockData.estReach / 14))}/day`}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(Math.round(mockData.gmv / 14))}/day`}
                                  {activePerformanceTab === 'Items Sold' && `${formatNumber(Math.round(mockData.itemsSold / 14))}/day`}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Peak</div>
                                <div className="text-sm font-medium text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${(mockData.avgViewRate * 1.2).toFixed(1)}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${(mockData.engagementRate * 1.3).toFixed(1)}%`}
                                  {activePerformanceTab === 'Videos' && Math.round(mockData.totalVideos / 10)}
                                  {activePerformanceTab === 'Est. Reach' && formatNumber(Math.round(mockData.estReach / 10))}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(Math.round(mockData.gmv / 10))}`}
                                  {activePerformanceTab === 'Items Sold' && formatNumber(Math.round(mockData.itemsSold / 10))}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Change</div>
                                <div className="text-sm font-medium text-green-600">
                                  {activePerformanceTab === 'Avg View Rate' && '+5%'}
                                  {activePerformanceTab === 'Engagement Rate' && '+8%'}
                                  {activePerformanceTab === 'Videos' && '+12%'}
                                  {activePerformanceTab === 'Est. Reach' && '+15%'}
                                  {activePerformanceTab === 'GMV' && '+18%'}
                                  {activePerformanceTab === 'Items Sold' && '+10%'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Audience Analysis - Same as TikTok */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Analysis</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="text-sm font-semibold text-gray-900">Gender Distribution</div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="relative w-32 h-32 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="64" cy="64" r="56" fill="none" stroke="#ec4899" strokeWidth="16" strokeDasharray={`${2 * Math.PI * 56 * mockData.genderDistribution.female / 100} ${2 * Math.PI * 56}`}/>
                                  <circle cx="64" cy="64" r="56" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray={`${2 * Math.PI * 56 * mockData.genderDistribution.male / 100} ${2 * Math.PI * 56}`} strokeDashoffset={`-${2 * Math.PI * 56 * mockData.genderDistribution.female / 100}`}/>
                                </svg>
                              </div>
                              <div className="flex-1 ml-6 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2"><span className="text-pink-500 text-xl">♀</span><span className="text-sm text-gray-700">Female</span></div>
                                  <span className="text-lg font-bold text-gray-900">{mockData.genderDistribution.female}%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2"><span className="text-blue-500 text-xl">♂</span><span className="text-sm text-gray-700">Male</span></div>
                                  <span className="text-lg font-bold text-gray-900">{mockData.genderDistribution.male}%</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="text-sm font-semibold text-gray-900">Age Distribution</div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {mockData.ageDistribution.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700 min-w-[60px]">{item.range}</span>
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.percentage}%` }}/></div>
                                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.percentage}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="text-sm font-semibold text-gray-900">Top Countries</div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {mockData.topCountries.map((item, index) => (
                              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{item.flag}</span>
                                  <span className="text-sm text-gray-700">{item.country}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${item.percentage}%` }}/>
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.percentage}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Brand Partnerships */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Partnerships</h3>
                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Brand</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Cooperation Time</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Mode</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Products</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Estimated Price</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {mockData.brandPartnerships.map((brand) => (
                                  <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-3">
                                        <img src={brand.logo} alt={brand.name} className="w-10 h-10 rounded-lg object-cover"/>
                                        <span className="font-medium text-sm text-gray-900">{brand.name}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{brand.cooperationTime}</td>
                                    <td className="px-4 py-3">
                                      <Badge variant={brand.mode === 'Commission' ? 'secondary' : 'default'} className="text-xs">{brand.mode}</Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{brand.productCount}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{brand.estimatedPrice}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Videos */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Videos</h3>
                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Video</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Views</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Comments</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Shares</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {mockData.recentVideos.map((video) => (
                                  <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-3">
                                        <img src={video.thumbnail} alt={video.title} className="w-16 h-16 rounded-lg object-cover"/>
                                        <span className="text-sm text-gray-900 line-clamp-2 max-w-xs">{video.title}</span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.views)}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.comments)}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.shares)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Instagram Tab - Same structure */}
                {activeTab === 'instagram' && (
                  <div className="space-y-6">
                    {/* Performance Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                      
                      {/* Performance Card with Tabs */}
                      <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200">
                          <nav className="flex" aria-label="Tabs">
                            {['Avg View Rate', 'Engagement Rate', 'Posts', 'Est. Reach', 'GMV', 'Items Sold'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActivePerformanceTab(tab)}
                                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                                  activePerformanceTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </nav>
                        </div>
                        
                        {/* Content Area */}
                        <div className="p-4">
                          <div>
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">14-Day Trend</span>
                                <span className="text-lg font-semibold text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${mockData.avgViewRate}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${mockData.engagementRate}%`}
                                  {(activePerformanceTab === 'Posts' || activePerformanceTab === 'Videos') && mockData.totalVideos}
                                  {activePerformanceTab === 'Est. Reach' && formatNumber(mockData.estReach)}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(mockData.gmv)}`}
                                  {activePerformanceTab === 'Items Sold' && formatNumber(mockData.itemsSold)}
                                </span>
                              </div>
                              
                              {/* Trend Chart */}
                              <div className="h-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between px-2 py-2">
                                {/* 14-day data bars */}
                                {[0.6, 0.8, 0.7, 0.9, 0.5, 0.8, 1.0, 0.7, 0.9, 0.6, 0.8, 0.7, 0.9, 0.8].map((height, index) => (
                                  <div
                                    key={index}
                                    className="bg-blue-500 rounded-sm transition-all duration-300 hover:bg-blue-600"
                                    style={{
                                      height: `${height * 60}px`,
                                      width: '12px',
                                      opacity: 0.8
                                    }}
                                  />
                                ))}
                              </div>
                              
                              {/* Date Labels */}
                              <div className="flex justify-between mt-2 text-xs text-gray-400">
                                <span>14d ago</span>
                                <span>7d ago</span>
                                <span>Today</span>
                              </div>
                            </div>
                            
                            {/* Performance Metrics */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Average</div>
                                <div className="text-sm font-medium text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${mockData.avgViewRate}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${mockData.engagementRate}%`}
                                  {(activePerformanceTab === 'Posts' || activePerformanceTab === 'Videos') && `${Math.round(mockData.totalVideos / 14)}/day`}
                                  {activePerformanceTab === 'Est. Reach' && `${formatNumber(Math.round(mockData.estReach / 14))}/day`}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(Math.round(mockData.gmv / 14))}/day`}
                                  {activePerformanceTab === 'Items Sold' && `${formatNumber(Math.round(mockData.itemsSold / 14))}/day`}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Peak</div>
                                <div className="text-sm font-medium text-gray-900">
                                  {activePerformanceTab === 'Avg View Rate' && `${(mockData.avgViewRate * 1.2).toFixed(1)}%`}
                                  {activePerformanceTab === 'Engagement Rate' && `${(mockData.engagementRate * 1.3).toFixed(1)}%`}
                                  {(activePerformanceTab === 'Posts' || activePerformanceTab === 'Videos') && Math.round(mockData.totalVideos / 10)}
                                  {activePerformanceTab === 'Est. Reach' && formatNumber(Math.round(mockData.estReach / 10))}
                                  {activePerformanceTab === 'GMV' && `$${formatNumber(Math.round(mockData.gmv / 10))}`}
                                  {activePerformanceTab === 'Items Sold' && formatNumber(Math.round(mockData.itemsSold / 10))}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Change</div>
                                <div className="text-sm font-medium text-green-600">
                                  {activePerformanceTab === 'Avg View Rate' && '+5%'}
                                  {activePerformanceTab === 'Engagement Rate' && '+8%'}
                                  {(activePerformanceTab === 'Posts' || activePerformanceTab === 'Videos') && '+12%'}
                                  {activePerformanceTab === 'Est. Reach' && '+15%'}
                                  {activePerformanceTab === 'GMV' && '+18%'}
                                  {activePerformanceTab === 'Items Sold' && '+10%'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Analysis</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <Card>
                          <CardHeader className="pb-3"><div className="text-sm font-semibold text-gray-900">Gender Distribution</div></CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="relative w-32 h-32 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="64" cy="64" r="56" fill="none" stroke="#ec4899" strokeWidth="16" strokeDasharray={`${2 * Math.PI * 56 * mockData.genderDistribution.female / 100} ${2 * Math.PI * 56}`}/>
                                  <circle cx="64" cy="64" r="56" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray={`${2 * Math.PI * 56 * mockData.genderDistribution.male / 100} ${2 * Math.PI * 56}`} strokeDashoffset={`-${2 * Math.PI * 56 * mockData.genderDistribution.female / 100}`}/>
                                </svg>
                              </div>
                              <div className="flex-1 ml-6 space-y-3">
                                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-pink-500 text-xl">♀</span><span className="text-sm text-gray-700">Female</span></div><span className="text-lg font-bold text-gray-900">{mockData.genderDistribution.female}%</span></div>
                                <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-blue-500 text-xl">♂</span><span className="text-sm text-gray-700">Male</span></div><span className="text-lg font-bold text-gray-900">{mockData.genderDistribution.male}%</span></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3"><div className="text-sm font-semibold text-gray-900">Age Distribution</div></CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {mockData.ageDistribution.map((item, index) => (<div key={index} className="flex items-center justify-between"><span className="text-sm text-gray-700 min-w-[60px]">{item.range}</span><div className="flex items-center gap-3 flex-1"><div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.percentage}%` }}/></div><span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.percentage}%</span></div></div>))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <Card>
                        <CardHeader className="pb-3"><div className="text-sm font-semibold text-gray-900">Top Countries</div></CardHeader>
                        <CardContent>
                          <div className="space-y-2">{mockData.topCountries.map((item, index) => (<div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"><div className="flex items-center gap-2"><span className="text-lg">{item.flag}</span><span className="text-sm text-gray-700">{item.country}</span></div><div className="flex items-center gap-3"><div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-sky-500 rounded-full" style={{ width: `${item.percentage}%` }}/></div><span className="text-sm font-semibold text-gray-900 w-12 text-right">{item.percentage}%</span></div></div>))}</div>
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Partnerships</h3>
                      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Brand</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Cooperation Time</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Mode</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Products</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Estimated Price</th></tr></thead><tbody className="divide-y divide-gray-100">{mockData.brandPartnerships.map((brand) => (<tr key={brand.id} className="hover:bg-gray-50 transition-colors"><td className="px-4 py-3"><div className="flex items-center gap-3"><img src={brand.logo} alt={brand.name} className="w-10 h-10 rounded-lg object-cover"/><span className="font-medium text-sm text-gray-900">{brand.name}</span></div></td><td className="px-4 py-3 text-sm text-gray-700">{brand.cooperationTime}</td><td className="px-4 py-3"><Badge variant={brand.mode === 'Commission' ? 'secondary' : 'default'} className="text-xs">{brand.mode}</Badge></td><td className="px-4 py-3 text-sm text-gray-900 font-medium">{brand.productCount}</td><td className="px-4 py-3 text-sm text-gray-900 font-semibold">{brand.estimatedPrice}</td></tr>))}</tbody></table></div></CardContent></Card>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
                      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b border-gray-200"><tr><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Post</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Views</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Comments</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Shares</th></tr></thead><tbody className="divide-y divide-gray-100">{mockData.recentVideos.map((video) => (<tr key={video.id} className="hover:bg-gray-50 transition-colors"><td className="px-4 py-3"><div className="flex items-center gap-3"><img src={video.thumbnail} alt={video.title} className="w-16 h-16 rounded-lg object-cover"/><span className="text-sm text-gray-900 line-clamp-2 max-w-xs">{video.title}</span></div></td><td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.views)}</td><td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.comments)}</td><td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatNumber(video.shares)}</td></tr>))}</tbody></table></div></CardContent></Card>
                    </div>
                  </div>
                )}

                {/* Amazon Tab */}
                {activeTab === 'amazon' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.544.406-3.045.61-4.502.61-1.877 0-3.708-.296-5.49-.89-1.777-.59-3.386-1.39-4.82-2.4-.376-.297-.57-.57-.57-.825 0-.088.02-.162.063-.22zm23.688-1.87c-.196-.25-.592-.25-1.188 0-.195.056-.57.186-1.12.39-.556.205-1.032.338-1.432.4l-.234.03c-.39.046-.687.077-.892.096-.296.02-.495-.06-.598-.235-.106-.177-.053-.36.16-.553.628-.58 1.557-1.054 2.787-1.422 1.23-.37 2.35-.555 3.36-.555.876 0 1.575.196 2.094.586.515.39.773.942.773 1.655 0 .39-.052.812-.16 1.264-.104.45-.37 1.35-.796 2.697l-.33 1.05c-.265.86-.39 1.433-.38 1.717 0 .443.183.665.55.665.26 0 .506-.104.736-.312.23-.204.472-.5.733-.882.062-.088.137-.132.224-.132.088 0 .148.06.184.178.028.118-.023.226-.152.327-.48.598-1.003 1.044-1.567 1.336-.566.293-1.117.44-1.655.44-.77 0-1.305-.34-1.603-1.02-.15-.35-.223-.798-.223-1.344 0-.575.112-1.474.337-2.695l.554-2.874c.05-.26.075-.47.075-.63 0-.297-.1-.446-.302-.446-.13 0-.28.035-.447.106zm-7.065 2.78c.088 0 .132.062.132.186 0 .124-.052.227-.156.308-.316.25-.673.47-1.07.66-.396.19-.817.284-1.263.284-.534 0-.95-.144-1.248-.43-.297-.287-.446-.688-.446-1.205 0-.622.202-1.19.607-1.705.406-.514.918-.77 1.538-.77.47 0 .844.15 1.12.446.28.297.42.688.42 1.174 0 .124-.03.235-.087.334-.06.098-.154.148-.285.148h-2.606c-.088 0-.132.062-.132.186 0 .422.118.765.355 1.03.236.266.553.4.95.4.533 0 1.053-.204 1.56-.614.084-.062.158-.093.222-.093zm-2.37-1.718c.062 0 .093-.03.093-.093 0-.223-.074-.413-.223-.57-.148-.156-.337-.234-.565-.234-.296 0-.553.11-.77.327-.22.216-.342.484-.37.803-.006.062.024.093.092.093h1.743zm-6.214 3.244c-.18 0-.27-.062-.27-.186 0-.062.026-.124.08-.186.05-.062.13-.093.234-.093.18 0 .386-.05.617-.15.23-.098.45-.235.66-.41.21-.172.388-.38.535-.617.146-.235.22-.486.22-.75 0-.186-.05-.334-.15-.446-.1-.11-.247-.166-.446-.166-.172 0-.342.056-.512.166-.168.112-.318.26-.45.447l-.354.555c-.208.324-.46.588-.753.794-.294.204-.627.308-1 .308-.476 0-.86-.15-1.15-.446-.29-.298-.438-.688-.438-1.174 0-.623.187-1.19.56-1.705.374-.516.862-.773 1.467-.773.26 0 .488.062.684.186.195.124.36.293.494.506.088-.186.227-.334.417-.446.188-.112.397-.168.627-.168.18 0 .323.062.43.186.104.125.156.283.156.476 0 .124-.044.242-.132.354-.09.112-.202.168-.336.168-.124 0-.186-.062-.186-.186v-.093c0-.088-.026-.162-.08-.224-.05-.062-.122-.093-.214-.093-.2 0-.39.15-.57.446-.178.298-.268.653-.268 1.067 0 .26.056.475.17.648.11.174.26.26.446.26.212 0 .416-.088.61-.26.197-.174.39-.424.58-.75l.3-.52c.196-.297.424-.536.684-.716.26-.18.545-.27.855-.27.488 0 .882.15 1.18.446.3.297.447.688.447 1.174 0 .31-.074.606-.223.886-.15.28-.35.528-.603.745-.25.216-.533.39-.848.52-.315.132-.634.197-.955.197-.26 0-.476-.062-.648-.186-.172-.124-.258-.293-.258-.506 0-.124.044-.235.132-.334.09-.098.202-.148.336-.148.124 0 .186.062.186.186v.093c0 .088.026.162.08.224.05.062.12.093.21.093.2 0 .39-.15.57-.446.178-.298.268-.653.268-1.067 0-.26-.056-.475-.17-.648-.11-.174-.26-.26-.446-.26-.212 0-.416.088-.61.26-.197.174-.39.424-.58.75l-.3.52c-.196.297-.424.536-.684.716-.26.18-.545.27-.855.27z"/>
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">Amazon Tab</p>
                        <p className="text-sm text-gray-400 mt-2">Content coming soon...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </NormalDetail>
      </div>
    </>
  );
}
