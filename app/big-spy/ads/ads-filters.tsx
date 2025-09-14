'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const platforms = [
  { value: '', label: '全部平台' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'other', label: '其他' },
];

const countries = [
  { value: '', label: '全部国家' },
  { value: 'US', label: '美国' },
  { value: 'CN', label: '中国' },
  { value: 'GB', label: '英国' },
  { value: 'DE', label: '德国' },
  { value: 'FR', label: '法国' },
  { value: 'JP', label: '日本' },
  { value: 'KR', label: '韩国' },
  { value: 'AU', label: '澳大利亚' },
  { value: 'CA', label: '加拿大' },
  { value: 'IN', label: '印度' },
];

const mediaTypes = [
  { value: '', label: '全部类型' },
  { value: 'image', label: '图片' },
  { value: 'video', label: '视频' },
  { value: 'carousel', label: '轮播' },
  { value: 'short-drama', label: '短剧' },
];

const sortOptions = [
  { value: 'hot', label: '热度排序' },
  { value: 'latest', label: '最新' },
  { value: 'engagement', label: '互动量' },
  { value: 'ctr', label: 'CTR' },
  { value: 'cvr', label: 'CVR' },
];

export function AdsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to first page when filtering
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('search', search);
  };

  return (
    <div className="space-y-4">
      {/* 搜索框 */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="搜索广告内容、品牌名称..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          搜索
        </button>
      </form>

      {/* 筛选器 */}
      <div className="flex flex-wrap gap-4">
        <select
          value={searchParams.get('platform') || ''}
          onChange={(e) => updateFilter('platform', e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background"
        >
          {platforms.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get('country') || ''}
          onChange={(e) => updateFilter('country', e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background"
        >
          {countries.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get('mediaType') || ''}
          onChange={(e) => updateFilter('mediaType', e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background"
        >
          {mediaTypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get('sort') || 'hot'}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 活跃筛选器显示 */}
      <div className="flex flex-wrap gap-2">
        {searchParams.get('platform') && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
            平台: {platforms.find(p => p.value === searchParams.get('platform'))?.label}
            <button
              onClick={() => updateFilter('platform', '')}
              className="ml-1 hover:text-primary/70"
            >
              ×
            </button>
          </span>
        )}
        
        {searchParams.get('country') && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
            国家: {countries.find(c => c.value === searchParams.get('country'))?.label}
            <button
              onClick={() => updateFilter('country', '')}
              className="ml-1 hover:text-primary/70"
            >
              ×
            </button>
          </span>
        )}
        
        {searchParams.get('mediaType') && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
            类型: {mediaTypes.find(m => m.value === searchParams.get('mediaType'))?.label}
            <button
              onClick={() => updateFilter('mediaType', '')}
              className="ml-1 hover:text-primary/70"
            >
              ×
            </button>
          </span>
        )}
        
        {searchParams.get('search') && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
            搜索: {searchParams.get('search')}
            <button
              onClick={() => updateFilter('search', '')}
              className="ml-1 hover:text-primary/70"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
}