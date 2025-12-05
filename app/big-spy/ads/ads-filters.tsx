'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { 
  VideoIcon,
  UsersIcon,
  ChevronDownIcon
} from '@/components/icons';
import { DatePicker } from '@/components/ui/date-picker';

// 创建所需的图标组件
const ShoppingCartIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const GlobeIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const PlayIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);

const SettingsIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m10-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
  </svg>
);

// 临时创建缺失的图标组件
const MouseIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 2v4"/>
    <path d="M8 6h8"/>
    <path d="M8 18v-8a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0z"/>
  </svg>
);

const HashIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="4" y1="9" x2="20" y2="9"/>
    <line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/>
    <line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);

const CalendarIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
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
  type: 'select' | 'multiselect' | 'date' | 'range' | 'toggle';
  hasActiveIndicator?: boolean;
  isPopular?: boolean;
  isEstimate?: boolean;
  hasArrow?: boolean;
}

const ecommercePlatforms: FilterOption[] = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'magento', label: 'Magento' },
  { value: 'bigcommerce', label: 'BigCommerce' },
  { value: 'prestashop', label: 'PrestaShop' },
];

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

const mediaTypes: FilterOption[] = [
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'carousel', label: 'Carousel' },
  { value: 'collection', label: 'Collection' },
];

const ctaTypes: FilterOption[] = [
  { value: 'shop_now', label: 'Shop Now' },
  { value: 'learn_more', label: 'Learn More' },
  { value: 'sign_up', label: 'Sign Up' },
  { value: 'download', label: 'Download' },
  { value: 'watch_more', label: 'Watch More' },
  { value: 'book_now', label: 'Book Now' },
];

const filterSections: FilterSection[] = [
  {
    id: 'publication_date',
    title: 'Publication date',
    icon: CalendarIcon,
    type: 'date'
  },
  {
    id: 'media_types',
    title: 'Media Types',
    icon: VideoIcon,
    type: 'multiselect',
    options: mediaTypes
  },
  {
    id: 'ctas',
    title: 'CTAs',
    icon: MouseIcon,
    type: 'multiselect',
    options: ctaTypes
  },
  {
    id: 'ecommerce_platforms',
    title: 'Ecommerce Platforms',
    icon: ShoppingCartIcon,
    type: 'multiselect',
    options: ecommercePlatforms,
    hasActiveIndicator: true
  },
  {
    id: 'countries',
    title: 'Countries',
    icon: GlobeIcon,
    type: 'multiselect',
    options: countries
  },
  {
    id: 'is_active',
    title: 'Is active',
    icon: PlayIcon,
    type: 'toggle'
  },
  {
    id: 'running_time',
    title: 'Running time',
    icon: ClockIcon,
    type: 'range'
  },
  {
    id: 'total_adsets',
    title: 'Total adsets',
    icon: HashIcon,
    type: 'range'
  },
  {
    id: 'spend',
    title: 'Spend',
    icon: DollarSignIcon,
    type: 'range',
    isPopular: false,
    isEstimate: true
  },
  {
    id: 'targeting_audience',
    title: 'Targeting audience',
    icon: UsersIcon,
    type: 'select',
    hasArrow: true
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
  
  // 如果是日期选择器，包裹在 DatePicker 中并使用 filter 样式
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
        
        {section.isPopular && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            POPULAR
          </span>
        )}
        
        {section.isEstimate && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            ESTIMATE
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {section.hasActiveIndicator && (
          <div className="w-2 h-2 rounded-full bg-black"></div>
        )}
        
        {section.hasArrow && (
          <ChevronDownIcon size={16} className="text-gray-400 rotate-[-90deg]" />
        )}
      </div>
    </button>
  );
};

export function AdsFilters() {
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
    
    // Reset to first page when filtering
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

      {/* EU Ads Section */}
      <div className="mt-6 px-4">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-medium text-gray-500">Filters for EU ads only</h3>
          <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs text-white font-bold">i</span>
          </div>
        </div>
        
        <FilterItem
          section={{
            id: 'is_eu',
            title: 'Is EU',
            icon: GlobeIcon,
            type: 'toggle'
          }}
          isActive={isFilterActive('is_eu')}
          onClick={() => handleFilterItemClick('is_eu')}
        />
      </div>


    </div>
  );
}