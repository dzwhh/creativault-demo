'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { ChevronDownIcon } from '@/components/icons';
import { DatePicker } from '@/components/ui/date-picker';

// Icon components
const CalendarIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const GlobeIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const TagIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const TargetIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const LanguageIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17A15.37 15.37 0 0 1 8.34 11.9l-1.96-1.96L5 11.29 7.95 14.24 2.5 19.68l1.41 1.41L9.37 15.63"/>
    <path d="M21.5 11L17 22l-1.41-1.41 1.79-4.09h-5.06l1.79 4.09L12.69 22 8.19 11h2.83l2.48 5.62L16 11z"/>
  </svg>
);

const VideoIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const ThumbsUpIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
);

const MousePointerIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
    <path d="M13 13l6 6"/>
  </svg>
);

const DollarSignIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  options?: FilterOption[];
  type: 'select' | 'multiselect' | 'date' | 'range';
}

const countries: FilterOption[] = [
  { value: 'US', label: 'United States 🇺🇸' },
  { value: 'GB', label: 'United Kingdom 🇬🇧' },
  { value: 'DE', label: 'Germany 🇩🇪' },
  { value: 'FR', label: 'France 🇫🇷' },
  { value: 'CA', label: 'Canada 🇨🇦' },
  { value: 'AU', label: 'Australia 🇦🇺' },
  { value: 'JP', label: 'Japan 🇯🇵' },
  { value: 'KR', label: 'South Korea 🇰🇷' },
  { value: 'IN', label: 'India 🇮🇳' },
  { value: 'BR', label: 'Brazil 🇧🇷' },
];

const industries: FilterOption[] = [
  { value: 'fashion', label: 'Fashion & Apparel' },
  { value: 'beauty', label: 'Beauty & Cosmetics' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'health', label: 'Health & Fitness' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'sports', label: 'Sports & Outdoors' },
];

const objectives: FilterOption[] = [
  { value: 'traffic', label: 'Traffic' },
  { value: 'conversions', label: 'Conversions' },
  { value: 'app_install', label: 'App Install' },
  { value: 'reach', label: 'Reach' },
  { value: 'video_views', label: 'Video Views' },
  { value: 'lead_generation', label: 'Lead Generation' },
];

const languages: FilterOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Chinese' },
  { value: 'pt', label: 'Portuguese' },
];

const adFormats: FilterOption[] = [
  { value: 'in_feed', label: 'In-Feed Ads' },
  { value: 'topview', label: 'TopView' },
  { value: 'brand_takeover', label: 'Brand Takeover' },
  { value: 'spark_ads', label: 'Spark Ads' },
  { value: 'collection_ads', label: 'Collection Ads' },
];

const filterSections: FilterSection[] = [
  {
    id: 'publication_date',
    title: 'Publication Date',
    icon: CalendarIcon,
    type: 'date'
  },
  {
    id: 'countries',
    title: 'Countries',
    icon: GlobeIcon,
    type: 'multiselect',
    options: countries
  },
  {
    id: 'industry',
    title: 'Industry',
    icon: TagIcon,
    type: 'multiselect',
    options: industries
  },
  {
    id: 'objective',
    title: 'Objective',
    icon: TargetIcon,
    type: 'multiselect',
    options: objectives
  },
  {
    id: 'ad_language',
    title: 'Ad Language',
    icon: LanguageIcon,
    type: 'multiselect',
    options: languages
  },
  {
    id: 'ad_format',
    title: 'Ad Format',
    icon: VideoIcon,
    type: 'multiselect',
    options: adFormats
  },
  {
    id: 'likes',
    title: 'Likes',
    icon: ThumbsUpIcon,
    type: 'range'
  },
  {
    id: 'ctr',
    title: 'CTR',
    icon: MousePointerIcon,
    type: 'range'
  },
  {
    id: 'budget',
    title: 'Budget',
    icon: DollarSignIcon,
    type: 'range'
  }
];

const FilterItem = ({ 
  section, 
  isActive, 
  onClick, 
  isDatePicker,
  dateRange,
  onDateRangeChange
}: { 
  section: FilterSection; 
  isActive: boolean; 
  onClick: () => void;
  isDatePicker?: boolean;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}) => {
  const Icon = section.icon;
  
  if (isDatePicker) {
    return (
      <DatePicker
        mode="range"
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
        placeholder="Select date range"
        className="w-full"
        showAsFilter={true}
        filterIcon={Icon}
        filterTitle={section.title}
      />
    );
  }
  
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-gray-500 group-hover:text-gray-700" />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {section.title}
        </span>
      </div>
    </button>
  );
};

export function TikTokAdsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const updateFilter = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(','));
      } else {
        params.delete(key);
      }
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const handleFilterItemClick = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const isFilterActive = (sectionId: string) => {
    return searchParams.get(sectionId) !== null;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto shadow-sm">
      {/* Header */}
      <div className="p-3">
        <h2 className="text-sm font-medium text-gray-500">Filters</h2>
      </div>

      {/* Filter Sections */}
      <div className="space-y-1">
        {filterSections.map((section) => (
          <div key={section.id}>
            <FilterItem
              section={section}
              isActive={isFilterActive(section.id)}
              onClick={() => handleFilterItemClick(section.id)}
              isDatePicker={section.type === 'date'}
              dateRange={dateRange}
              onDateRangeChange={(range) => {
                setDateRange(range);
                if (range?.from && range?.to) {
                  updateFilter(section.id, `${range.from.toISOString()},${range.to.toISOString()}`);
                }
              }}
            />
            
            {/* Expanded content for non-date filter types */}
            {expandedSection === section.id && section.options && (
              <div className="px-6 pb-4 space-y-2">
                {section.options.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={(e) => {
                        const currentValues = searchParams.get(section.id)?.split(',') || [];
                        let newValues;
                        
                        if (e.target.checked) {
                          newValues = [...currentValues, option.value];
                        } else {
                          newValues = currentValues.filter(v => v !== option.value);
                        }
                        
                        updateFilter(section.id, newValues);
                      }}
                      checked={searchParams.get(section.id)?.split(',').includes(option.value) || false}
                    />
                    <span className="text-sm text-gray-600">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
