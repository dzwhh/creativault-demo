'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PageFilterBase, FilterSection } from '@/components/ui/page-filter-base';
import { TikTokIcon, InstagramIcon, YoutubeIcon } from '@/components/icons';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 创建所需的图标组件
const PlatformIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const GlobeIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IndustryIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const FollowersIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const GenderIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6"/>
    <path d="M9 9l6 6"/>
    <path d="M21 3l-6 6"/>
    <path d="M15 3h6v6"/>
    <path d="M9 21H3v-6"/>
  </svg>
);

const LanguageIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M5 8l6 6"/>
    <path d="M4 14l6-6 2-3"/>
    <path d="M2 5h12"/>
    <path d="M7 2h1"/>
    <path d="M22 22l-5-10-5 10"/>
    <path d="M14 18h6"/>
  </svg>
);

const EcommerceIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const EngagementIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M18 20V10"/>
    <path d="M12 20V4"/>
    <path d="M6 20v-6"/>
  </svg>
);

const LocationIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const AgeIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// 过滤选项数据
const platforms = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
];

const countries = [
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'ca', label: '🇨🇦 Canada' },
  { value: 'gb', label: '🇬🇧 United Kingdom' },
  { value: 'kr', label: '🇰🇷 South Korea' },
  { value: 'jp', label: '🇯🇵 Japan' },
];

const industries = [
  { value: 'fashion', label: 'Fashion' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'tech', label: 'Tech' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'food', label: 'Food' },
  { value: 'travel', label: 'Travel' },
  { value: 'fitness', label: 'Fitness' },
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
];

const audienceLocations = [
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'ca', label: '🇨🇦 Canada' },
  { value: 'gb', label: '🇬🇧 United Kingdom' },
  { value: 'kr', label: '🇰🇷 South Korea' },
];

const ageRanges = [
  { value: '18-24', label: '18-24' },
  { value: '25-34', label: '25-34' },
  { value: '35-44', label: '35-44' },
  { value: '45-54', label: '45-54' },
  { value: '55+', label: '55+' },
];

// Creator 过滤器配置
const filterSections: FilterSection[] = [
  {
    id: 'platform',
    title: 'Platform',
    icon: PlatformIcon,
    type: 'multiselect',
    options: platforms,
  },
  {
    id: 'countries',
    title: 'Countries',
    icon: GlobeIcon,
    type: 'select',
    options: countries,
  },
  {
    id: 'industry',
    title: 'Industry',
    icon: IndustryIcon,
    type: 'multiselect',
    options: industries,
  },
  {
    id: 'followers',
    title: 'Followers',
    icon: FollowersIcon,
    type: 'range',
  },
  {
    id: 'gender',
    title: 'Gender',
    icon: GenderIcon,
    type: 'multiselect',
    options: genders,
  },
  {
    id: 'language',
    title: 'Language',
    icon: LanguageIcon,
    type: 'select',
    options: languages,
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    icon: EcommerceIcon,
    type: 'toggle',
  },
  {
    id: 'engagement',
    title: 'Engagement Rate',
    icon: EngagementIcon,
    type: 'range',
  },
];

// Audience 过滤器配置
const audienceFilterSections: FilterSection[] = [
  {
    id: 'audience_gender',
    title: 'Gender Distribution',
    icon: GenderIcon,
    type: 'range',
  },
  {
    id: 'audience_location',
    title: 'Audience Location',
    icon: LocationIcon,
    type: 'select',
    options: audienceLocations,
  },
  {
    id: 'age_range',
    title: 'Age Range',
    icon: AgeIcon,
    type: 'multiselect',
    options: ageRanges,
  },
];

export function CreatorFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const getFilterValue = (key: string) => {
    return searchParams.get(key);
  };

  return (
    <PageFilterBase
      sections={filterSections}
      onFilterChange={updateFilter}
      getFilterValue={getFilterValue}
      extraSections={
        <div className="pt-4 mt-4">
          <div className="px-3 mb-4">
            <h3 className="text-sm font-medium text-gray-500">Audience</h3>
          </div>
          <div className="space-y-1">
            {audienceFilterSections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} className="px-3">
                  <div className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700">
                    <Icon size={16} className="text-gray-500" />
                    {section.title}
                  </div>
                  {section.type === 'range' && section.id === 'audience_gender' && (
                    <div className="ml-6 space-y-2 mb-4">
                      <Slider
                        defaultValue={[70]}
                        max={100}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0% Female</span>
                        <span>100% Female</span>
                      </div>
                    </div>
                  )}
                  {section.type === 'select' && section.options && (
                    <div className="ml-6 mb-4">
                      <Select>
                        <SelectTrigger className="w-full h-8">
                          <SelectValue placeholder={`Select ${section.title.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {section.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {section.type === 'multiselect' && section.options && (
                    <div className="ml-6 space-y-2 mb-4">
                      {section.options.map((option) => {
                        const currentValues = getFilterValue(section.id)?.split(',') || [];
                        const isChecked = currentValues.includes(option.value);
                        
                        return (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                          >
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              onChange={(e) => {
                                let newValues;
                                
                                if (e.target.checked) {
                                  newValues = [...currentValues, option.value];
                                } else {
                                  newValues = currentValues.filter((v) => v !== option.value);
                                }
                                
                                updateFilter(section.id, newValues);
                              }}
                              checked={isChecked}
                            />
                            <span className="text-sm text-gray-600">{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      }
    />
  );
}
