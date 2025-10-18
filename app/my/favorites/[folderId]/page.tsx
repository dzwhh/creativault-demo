'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SearchIcon, FilterIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FavoriteItem {
  id: string;
  title: string;
  thumbnail: string;
  platform: string;
  savedAt: string;
  type: 'ads' | 'creative' | 'products' | 'creator';
}

// Mock data for folder items
const mockItems: FavoriteItem[] = [
  {
    id: '1',
    title: 'Summer Fashion Campaign',
    thumbnail: 'https://placehold.co/300x400/e3f2fd/1976d2?text=Ad+1',
    platform: 'Meta',
    savedAt: '2024-03-15',
    type: 'ads',
  },
  {
    id: '2',
    title: 'Tech Product Launch',
    thumbnail: 'https://placehold.co/300x400/f3e5f5/7b1fa2?text=Ad+2',
    platform: 'TikTok',
    savedAt: '2024-03-14',
    type: 'ads',
  },
  {
    id: '3',
    title: 'Beauty Routine Video',
    thumbnail: 'https://placehold.co/300x400/fce4ec/c2185b?text=Ad+3',
    platform: 'Instagram',
    savedAt: '2024-03-13',
    type: 'creative',
  },
  {
    id: '4',
    title: 'E-commerce Banner',
    thumbnail: 'https://placehold.co/300x400/fff3e0/f57c00?text=Ad+4',
    platform: 'Google',
    savedAt: '2024-03-12',
    type: 'ads',
  },
  {
    id: '5',
    title: 'Fitness Product Ad',
    thumbnail: 'https://placehold.co/300x400/e8f5e9/388e3c?text=Ad+5',
    platform: 'Pinterest',
    savedAt: '2024-03-11',
    type: 'products',
  },
  {
    id: '6',
    title: 'Gaming App Promo',
    thumbnail: 'https://placehold.co/300x400/fff9c4/f9a825?text=Ad+6',
    platform: 'TikTok',
    savedAt: '2024-03-10',
    type: 'ads',
  },
];

export default function FolderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const folderId = params.folderId as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Filter items based on search query
  const filteredItems = mockItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.id));
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Fashion Ads Collection</h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredItems.length} items • Last updated {new Date().toLocaleDateString()}
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
              placeholder="Search items..."
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
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-600">
                {selectedItems.length} selected
              </span>
              <Button variant="outline" size="sm">
                Remove
              </Button>
              <Button variant="outline" size="sm">
                Move to
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
            checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
            onChange={handleSelectAll}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-600">Select all</span>
        </div>
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-8 py-6">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search query' : 'This folder is empty'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:border-blue-300 group"
              >
                {/* Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </div>

                {/* Thumbnail */}
                <div className="relative w-full aspect-[3/4] bg-gray-100">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded">{item.platform}</span>
                    <span>{new Date(item.savedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
