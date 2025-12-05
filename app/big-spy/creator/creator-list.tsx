'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { TikTokIcon, InstagramIcon, YoutubeIcon } from '@/components/icons/platform-icons';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  platform: 'tiktok' | 'instagram' | 'youtube';
  verified: boolean;
  description: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  region: string;
  category: string;
}

// Mock data
const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Khabane lame',
    username: '@khaby.lame',
    avatar: 'https://i.pravatar.cc/150?img=12',
    platform: 'tiktok',
    verified: true,
    description: 'Se vuoi ridere sei nel posto giusto😂😜 u wa...',
    followers: 160900000,
    avgViews: 3100000,
    engagementRate: 6.78,
    region: 'United Kingdom',
    category: 'Comedy',
  },
  {
    id: '2',
    name: "charli d'amelio",
    username: '@charlidamelio',
    avatar: 'https://i.pravatar.cc/150?img=5',
    platform: 'tiktok',
    verified: true,
    description: '',
    followers: 156100000,
    avgViews: 5800000,
    engagementRate: 5.89,
    region: 'United States',
    category: 'Beauty & Personal Care',
  },
  {
    id: '3',
    name: 'MrBeast',
    username: '@mrbeast',
    avatar: 'https://i.pravatar.cc/150?img=33',
    platform: 'youtube',
    verified: true,
    description: "It's me mrbeast 😊",
    followers: 122900000,
    avgViews: 0,
    engagementRate: 0,
    region: 'United States',
    category: 'Entertainment',
  },
  {
    id: '4',
    name: 'Bella Poarch',
    username: '@bellapoarch',
    avatar: 'https://i.pravatar.cc/150?img=9',
    platform: 'tiktok',
    verified: true,
    description: '',
    followers: 93000000,
    avgViews: 3000000,
    engagementRate: 1.72,
    region: 'United States',
    category: 'Music',
  },
  {
    id: '5',
    name: 'TikTok',
    username: '@tiktok',
    avatar: 'https://i.pravatar.cc/150?img=60',
    platform: 'tiktok',
    verified: true,
    description: '',
    followers: 91600000,
    avgViews: 381600,
    engagementRate: 3.24,
    region: 'United States',
    category: 'Social Media',
  },
  {
    id: '6',
    name: 'Addison',
    username: '@addisonre',
    avatar: 'https://i.pravatar.cc/150?img=47',
    platform: 'instagram',
    verified: true,
    description: 'Put your headphones on 🎧',
    followers: 88300000,
    avgViews: 5200000,
    engagementRate: 7.84,
    region: 'United States',
    category: 'Entertainment',
  },
  {
    id: '7',
    name: 'Zach King',
    username: '@zachking',
    avatar: 'https://i.pravatar.cc/150?img=52',
    platform: 'tiktok',
    verified: true,
    description: 'Bringing a little more wonder into the world...',
    followers: 84100000,
    avgViews: 5100000,
    engagementRate: 6.07,
    region: 'United States',
    category: 'Magic & Illusion',
  },
  {
    id: '8',
    name: 'Kimberly Loaiza',
    username: '@kimberly.loaiza',
    avatar: 'https://i.pravatar.cc/150?img=44',
    platform: 'tiktok',
    verified: true,
    description: 'Hola linduras ✨ Únete al grupo 👇',
    followers: 83700000,
    avgViews: 7300000,
    engagementRate: 12.09,
    region: 'United States',
    category: 'Entertainment',
  },
  {
    id: '9',
    name: 'WILLIE SALIM',
    username: '@williesalim',
    avatar: 'https://i.pravatar.cc/150?img=13',
    platform: 'youtube',
    verified: true,
    description: 'LINK DONASI',
    followers: 81700000,
    avgViews: 2900000,
    engagementRate: 4.67,
    region: 'Indonesia',
    category: 'Beauty & Personal Care',
  },
  {
    id: '10',
    name: 'The Rock',
    username: '@therock',
    avatar: 'https://i.pravatar.cc/150?img=59',
    platform: 'tiktok',
    verified: true,
    description: "CEO of #RockTok Life's so much sweeter w...",
    followers: 80100000,
    avgViews: 367100,
    engagementRate: 8.91,
    region: 'United States',
    category: 'Entertainment',
  },
  {
    id: '11',
    name: 'Will Smith',
    username: '@willsmith',
    avatar: 'https://i.pravatar.cc/150?img=14',
    platform: 'tiktok',
    verified: true,
    description: 'Same kid from West Philly. "Pretty Girls"out ...',
    followers: 79200000,
    avgViews: 1800000,
    engagementRate: 13.35,
    region: 'United States',
    category: 'Entertainment',
  },
];

const formatNumber = (num: number): string => {
  if (num === 0) return '-';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
};

const formatPercentage = (num: number): string => {
  if (num === 0) return '-';
  return num.toFixed(2) + '%';
};

const getPlatformIcon = (platform: 'tiktok' | 'instagram' | 'youtube', className: string = '') => {
  switch (platform) {
    case 'tiktok':
      return <TikTokIcon className={className} />;
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'youtube':
      return <YoutubeIcon className={className} />;
    default:
      return <TikTokIcon className={className} />;
  }
};

interface CreatorListProps {
  onCreatorClick?: (creator: Creator) => void;
}

export function CreatorList({ onCreatorClick }: CreatorListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());

  const toggleShortlist = (creatorId: string) => {
    const newSet = new Set(shortlistedIds);
    if (newSet.has(creatorId)) {
      newSet.delete(creatorId);
    } else {
      newSet.add(creatorId);
    }
    setShortlistedIds(newSet);
  };

  const filteredCreators = mockCreators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="ml-auto px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Shortlist all
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                INFLUENCER
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button className="flex items-center gap-1 hover:text-gray-900">
                  FOLLOWERS
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 15l5 5 5-5M7 9l5-5 5 5"/>
                  </svg>
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                AVG VIEWS
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ENGAGEMENT RATE
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                CATEGORY
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCreators.map((creator) => (
              <tr
                key={creator.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onCreatorClick?.(creator)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm text-gray-900 truncate">{creator.name}</h3>
                        {creator.verified && (
                          <div className="flex-shrink-0">
                            {getPlatformIcon(creator.platform, 'w-4 h-4')}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{creator.username}</p>
                      {creator.description && (
                        <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{creator.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {formatNumber(creator.followers)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatNumber(creator.avgViews)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatPercentage(creator.engagementRate)}
                </td>
                <td className="px-6 py-4">
                  {creator.category !== 'Entertainment' && creator.category !== 'Social Media' && (
                    <Badge variant="secondary" className="text-xs">
                      {creator.category}
                    </Badge>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShortlist(creator.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      shortlistedIds.has(creator.id)
                        ? 'text-red-600 bg-red-50 hover:bg-red-100'
                        : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={shortlistedIds.has(creator.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Shortlist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
