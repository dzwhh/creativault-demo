import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Platform = 'tiktok' | 'instagram' | 'youtube';

interface EmptyStateWordsProps {
  title?: string;
  description?: string;
  onCollect?: (platform: Platform, keywords: string[]) => void;
  placeholder?: string;
  buttonText?: string;
}

export function EmptyStateWords({
  title = 'No Data Found',
  description = 'Search by keywords or hashtags to discover content',
  onCollect,
  placeholder = 'Enter keywords or #hashtags (separate by comma)',
  buttonText = 'Search Now',
}: EmptyStateWordsProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('tiktok');
  const [inputValue, setInputValue] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const platforms = [
    {
      id: 'tiktok' as Platform,
      name: 'TikTok',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: 'black',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-black',
    },
    {
      id: 'instagram' as Platform,
      name: 'Instagram',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="url(#instagram-gradient-2)">
          <defs>
            <linearGradient id="instagram-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f09433' }} />
              <stop offset="25%" style={{ stopColor: '#e6683c' }} />
              <stop offset="50%" style={{ stopColor: '#dc2743' }} />
              <stop offset="75%" style={{ stopColor: '#cc2366' }} />
              <stop offset="100%" style={{ stopColor: '#bc1888' }} />
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'instagram',
      bgColor: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
      textColor: 'text-white',
      borderColor: 'border-pink-500',
    },
    {
      id: 'youtube' as Platform,
      name: 'YouTube',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      color: 'red',
      bgColor: 'bg-red-600',
      textColor: 'text-white',
      borderColor: 'border-red-600',
    },
  ];

  const handleAddKeyword = () => {
    if (!inputValue.trim()) return;

    // 按逗号分割并清理空格
    const newKeywords = inputValue
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)
      .filter(k => !keywords.includes(k)); // 去重

    if (newKeywords.length > 0) {
      setKeywords([...keywords, ...newKeywords]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleSearch = async () => {
    if (keywords.length === 0) {
      alert('Please add at least one keyword');
      return;
    }

    setIsSearching(true);
    try {
      if (onCollect) {
        await onCollect(selectedPlatform, keywords);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 mb-6">{description}</p>
        </div>

        {/* Keyword Collection Section */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
          {/* Platform Selection */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">1. Select Platform</h4>
            <div className="flex gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all',
                    selectedPlatform === platform.id
                      ? `${platform.borderColor} ${platform.bgColor} ${platform.textColor} shadow-md scale-105`
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
                  )}
                >
                  <span className={selectedPlatform === platform.id ? '' : `text-${platform.color}-600`}>
                    {platform.icon}
                  </span>
                  <span className="text-sm font-medium">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Keyword Input */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">2. Enter Keywords or Hashtags</h4>
            <div className="space-y-3">
              {/* Input Field */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onBlur={handleAddKeyword}
                  className="flex-1"
                  disabled={isSearching}
                />
                <Button
                  onClick={handleAddKeyword}
                  variant="outline"
                  disabled={!inputValue.trim() || isSearching}
                >
                  Add
                </Button>
              </div>

              {/* Keywords Display */}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-white rounded-md border border-gray-200">
                  {keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
                    >
                      {keyword.startsWith('#') ? (
                        <span className="text-blue-600">#</span>
                      ) : null}
                      <span>{keyword.replace(/^#/, '')}</span>
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 hover:text-red-600 transition-colors"
                        disabled={isSearching}
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Hint */}
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="mb-1">
                    Enter natural language keywords like "makeup tutorial" or hashtags like "#beauty"
                  </p>
                  <p>
                    Separate multiple keywords with commas. Press Enter or click Add to add them.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={isSearching || keywords.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSearching ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {buttonText}
                {keywords.length > 0 && ` (${keywords.length} keyword${keywords.length > 1 ? 's' : ''})`}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
