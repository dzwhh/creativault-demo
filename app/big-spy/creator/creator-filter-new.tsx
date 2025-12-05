'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';

interface FilterOption {
  value: string;
  label: string;
}

const creatorRegionOptions: FilterOption[] = [
  { value: 'all', label: 'All Regions' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'kr', label: 'South Korea' },
  { value: 'cn', label: 'China' },
  { value: 'jp', label: 'Japan' },
  { value: 'in', label: 'India' },
  { value: 'id', label: 'Indonesia' },
];

const genderOptions: FilterOption[] = [
  { value: 'all', label: 'All Genders' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

interface CreatorFilterNewProps {
  onFilterChange?: (filters: any) => void;
}

export function CreatorFilterNew({ onFilterChange }: CreatorFilterNewProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [followersCount, setFollowersCount] = useState({ min: '', max: '' });
  const [avgViews, setAvgViews] = useState({ min: '', max: '' });
  const [avgEngagement, setAvgEngagement] = useState({ min: '', max: '' });
  const [gmv, setGmv] = useState({ min: '', max: '' });
  const [gpm, setGpm] = useState({ min: '', max: '' });
  const [avgOrderValue, setAvgOrderValue] = useState({ min: '', max: '' });
  const [commissionRate, setCommissionRate] = useState({ min: '', max: '' });
  const [productCategory, setProductCategory] = useState('all');
  const [femaleAudienceRatio, setFemaleAudienceRatio] = useState({ min: '', max: '' });
  const [mainAudienceAge, setMainAudienceAge] = useState('all');
  const [hasEmail, setHasEmail] = useState(false);
  const [hasMCN, setHasMCN] = useState(false);

  // 每个筛选项的展开状态
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    region: false,
    followersCount: false,
    gender: false,
    avgViews: false,
    avgEngagement: false,
    gmv: false,
    gpm: false,
    avgOrderValue: false,
    commissionRate: false,
    productCategory: false,
    femaleAudienceRatio: false,
    mainAudienceAge: false,
    hasEmail: false,
    hasMCN: false,
  });

  const toggleFilter = (filterKey: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const handleReset = () => {
    setSelectedRegion('all');
    setSelectedGender('all');
    setFollowersCount({ min: '', max: '' });
    setAvgViews({ min: '', max: '' });
    setAvgEngagement({ min: '', max: '' });
    setGmv({ min: '', max: '' });
    setGpm({ min: '', max: '' });
    setAvgOrderValue({ min: '', max: '' });
    setCommissionRate({ min: '', max: '' });
    setProductCategory('all');
    setFemaleAudienceRatio({ min: '', max: '' });
    setMainAudienceAge('all');
    setHasEmail(false);
    setHasMCN(false);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="21" x2="4" y2="14"/>
            <line x1="4" y1="10" x2="4" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="3"/>
            <line x1="20" y1="21" x2="20" y2="16"/>
            <line x1="20" y1="12" x2="20" y2="3"/>
            <line x1="1" y1="14" x2="7" y2="14"/>
            <line x1="9" y1="8" x2="15" y2="8"/>
            <line x1="17" y1="16" x2="23" y2="16"/>
          </svg>
          FILTERS
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronDownIcon className={`w-4 h-4 text-gray-600 transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
        </button>
      </div>

      {/* Filters Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Creator Region */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('region')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Creator Region
              </span>
            </button>
          </div>

          {/* Followers Count - POPULAR */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('followersCount')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Followers Count
                <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold text-orange-600 bg-orange-50 rounded">POPULAR</span>
              </span>
            </button>
          </div>

          {/* Gender */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('gender')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="9" r="4"/>
                  <path d="M9 13v8"/>
                  <path d="M5 17h8"/>
                  <path d="M19 5l-5.4 5.4"/>
                  <path d="M19 5h-5"/>
                  <path d="M19 5v5"/>
                </svg>
                Gender
              </span>
            </button>
          </div>

          {/* Avg Views (Last 10 Videos) */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('avgViews')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Avg Views (Last 10 Videos)
              </span>
            </button>
          </div>

          {/* Avg Engagement Rate (Last 10) */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('avgEngagement')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Avg Engagement Rate (Last 10)
              </span>
            </button>
          </div>

          {/* GMV (Last 30 Days) */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('gmv')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <polyline points="17 11 19 13 23 9"/>
                </svg>
                GMV (Last 30 Days)
              </span>
            </button>
          </div>

          {/* GPM (Last 30 Days) */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('gpm')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                GPM (Last 30 Days)
              </span>
            </button>
          </div>

          {/* Avg Order Value (Last 30 Days) */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('avgOrderValue')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Avg Order Value (Last 30 Days)
              </span>
            </button>
          </div>

          {/* Commission Rate (Last 30 Days) */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('commissionRate')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="5" x2="5" y2="19"/>
                  <circle cx="6.5" cy="6.5" r="2.5"/>
                  <circle cx="17.5" cy="17.5" r="2.5"/>
                </svg>
                Commission Rate (Last 30 Days)
              </span>
            </button>
          </div>

          {/* Product Category */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('productCategory')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Product Category
              </span>
            </button>
          </div>

          {/* Female Audience Ratio */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('femaleAudienceRatio')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M12 12v9"/>
                  <path d="M9 21h6"/>
                </svg>
                Female Audience Ratio
              </span>
            </button>
          </div>

          {/* Main Audience Age */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('mainAudienceAge')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Main Audience Age
              </span>
            </button>
          </div>

          {/* Has Email */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('hasEmail')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Has Email
              </span>
            </button>
          </div>

          {/* Has MCN */}
          <div className="pb-2">
            <button
              onClick={() => toggleFilter('hasMCN')}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                Has MCN
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
