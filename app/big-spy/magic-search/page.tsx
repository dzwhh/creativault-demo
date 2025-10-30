'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { SearchIcon } from '@/components/icons';

// Camera Icon Component
const CameraIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Platform button component
const PlatformButton = ({ 
  label, 
  active, 
  locked = false,
  onClick 
}: { 
  label: string; 
  active: boolean; 
  locked?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={locked}
    className={`
      relative px-4 py-2 rounded-full text-sm font-medium transition-all
      ${active 
        ? 'bg-orange-100 text-orange-900 ring-1 ring-orange-300' 
        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }
      ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {locked && (
      <svg className="absolute -top-1 -right-1 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
    )}
    {label}
  </button>
);

// Filter button with dropdown icon
const FilterButton = ({ 
  label, 
  onClick 
}: { 
  label: string; 
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-all flex items-center gap-2"
  >
    {label}
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

export default function MagicSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear uploaded image
  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Magic search"
        description="Type anything or upload an image, our AI will find top performing products and ads for you. Sorting is based on similarity scores and cannot be changed, but you can use filters to narrow down the results and get more relevant data."
      />

      <div className="p-8">
        {/* Search Section */}
        <div className="max-w-7xl mx-auto">
          {/* Search Input and Upload */}
          <div className="flex items-center gap-2 mb-6">
            {/* Upload Image Button */}
            <label className="flex-shrink-0 p-3 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-colors bg-white">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <CameraIcon size={20} className="text-gray-600" />
            </label>

            {/* Search Input */}
            <div className="flex-1 relative">
              <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors text-base"
              />
            </div>
          </div>

          {/* Platform Tabs and Filters - Single Row */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            {/* Platform Tabs */}
            <PlatformButton 
              label="All" 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
            />
            <PlatformButton 
              label="Meta Ads Library" 
              active={activeTab === 'meta'} 
              onClick={() => setActiveTab('meta')}
            />
            <PlatformButton 
              label="Facebook" 
              active={activeTab === 'facebook'} 
              onClick={() => setActiveTab('facebook')}
            />
            <PlatformButton 
              label="Tiktok" 
              active={activeTab === 'tiktok'} 
              onClick={() => setActiveTab('tiktok')}
            />
            <PlatformButton 
              label="Products" 
              active={activeTab === 'products'} 
              onClick={() => setActiveTab('products')}
            />
            
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 mx-1"></div>
            
            {/* Filters */}
            <FilterButton label="Creation Date" />
            <FilterButton label="Languages" />
            <FilterButton label="Countries" />
          </div>

          {/* Empty State or Results */}
          {!searchQuery && !uploadedImage ? (
            <div className="flex flex-col items-center justify-center py-20">
              {/* Empty State Icon */}
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Enter a text or upload an image
              </h3>
              <p className="text-gray-500 text-center max-w-md">
                Our AI will analyze your input and find the most relevant products and ads based on similarity scores.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Uploaded Image Preview */}
              {uploadedImage && (
                <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={clearImage}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">Searching by image</h4>
                      <p className="text-sm text-gray-500">Our AI is analyzing your image to find similar products and ads...</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Results Placeholder */}
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Searching for results...</p>
                <p className="text-sm text-gray-400 mt-1">This may take a few seconds</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
