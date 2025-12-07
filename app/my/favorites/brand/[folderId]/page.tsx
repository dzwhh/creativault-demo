'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SearchIcon, FilterIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  activeAds: number;
  totalAds: number;
  platforms: string[];
  lastActive: string;
}

// Mock data for brands
const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Nike',
    logo: 'https://placehold.co/80x80/000000/FFFFFF?text=NIKE',
    industry: 'Sports & Fitness',
    activeAds: 245,
    totalAds: 1850,
    platforms: ['Meta', 'TikTok', 'Google'],
    lastActive: '2024-03-15',
  },
  {
    id: '2',
    name: 'Adidas',
    logo: 'https://placehold.co/80x80/000000/FFFFFF?text=ADIDAS',
    industry: 'Sports & Fitness',
    activeAds: 189,
    totalAds: 1420,
    platforms: ['Meta', 'TikTok'],
    lastActive: '2024-03-14',
  },
  {
    id: '3',
    name: 'Apple',
    logo: 'https://placehold.co/80x80/000000/FFFFFF?text=APPLE',
    industry: 'Technology',
    activeAds: 312,
    totalAds: 2100,
    platforms: ['Meta', 'Google', 'YouTube'],
    lastActive: '2024-03-15',
  },
  {
    id: '4',
    name: 'Samsung',
    logo: 'https://placehold.co/80x80/1428A0/FFFFFF?text=SAMSUNG',
    industry: 'Technology',
    activeAds: 278,
    totalAds: 1950,
    platforms: ['Meta', 'TikTok', 'Google'],
    lastActive: '2024-03-14',
  },
  {
    id: '5',
    name: 'Coca-Cola',
    logo: 'https://placehold.co/80x80/F40009/FFFFFF?text=COCA+COLA',
    industry: 'Food & Beverage',
    activeAds: 156,
    totalAds: 980,
    platforms: ['Meta', 'TikTok'],
    lastActive: '2024-03-13',
  },
  {
    id: '6',
    name: 'Pepsi',
    logo: 'https://placehold.co/80x80/004B93/FFFFFF?text=PEPSI',
    industry: 'Food & Beverage',
    activeAds: 134,
    totalAds: 870,
    platforms: ['Meta', 'YouTube'],
    lastActive: '2024-03-12',
  },
];

export default function BrandFolderPage() {
  const params = useParams();
  const router = useRouter();
  const folderId = params.folderId as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Filter brands based on search query
  const filteredBrands = mockBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBrands.length === filteredBrands.length) {
      setSelectedBrands([]);
    } else {
      setSelectedBrands(filteredBrands.map((brand) => brand.id));
    }
  };

  const handleBrandClick = (brandId: string) => {
    router.push(`/my/favorites/brand/${folderId}/${brandId}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tracked Advertisers</h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredBrands.length} advertisers • Last updated {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search advertisers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* More Filter Button */}
          <Button variant="outline" className="flex items-center gap-2">
            <FilterIcon size={16} />
            More Filter
          </Button>

          {/* Actions */}
          {selectedBrands.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-600">
                {selectedBrands.length} selected
              </span>
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Selection Bar */}
      <div className="border-b border-gray-200 bg-gray-50 px-8 py-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedBrands.length === filteredBrands.length && filteredBrands.length > 0}
            onChange={handleSelectAll}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-600">Select all</span>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-8 py-6">
        {filteredBrands.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No advertisers found</h3>
            <p className="text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search query' : 'This folder is empty'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand.id)}
                className="relative bg-white rounded-lg border border-gray-200 p-6 cursor-pointer transition-all hover:shadow-lg hover:border-blue-300 group"
              >
                {/* Checkbox */}
                <div className="absolute top-4 right-4 z-10">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => handleBrandSelect(brand.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </div>

                {/* Brand Logo */}
                <div className="flex justify-center mb-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>

                {/* Brand Info */}
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-500">{brand.industry}</p>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Active Ads:</span>
                    <span className="font-medium text-green-600">{brand.activeAds}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Ads:</span>
                    <span className="font-medium text-gray-900">{brand.totalAds}</span>
                  </div>
                </div>

                {/* Platforms */}
                <div className="flex items-center justify-center gap-2 flex-wrap mb-2">
                  {brand.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                {/* Last Active */}
                <div className="text-xs text-gray-400 text-center pt-3 border-t border-gray-100">
                  Last active: {new Date(brand.lastActive).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
