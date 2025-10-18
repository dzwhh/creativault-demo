'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PageFilterBase, FilterSection } from '@/components/ui/page-filter-base';

// 创建所需的图标组件
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

const ShoppingBagIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const PackageIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const DollarSignIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const TruckIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

// 过滤选项数据
const countries = [
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

const categories = [
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'fashion', label: 'Fashion & Accessories' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'pets', label: 'Pet Supplies' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'baby', label: 'Baby & Kids' },
];

const shopTypes = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'magento', label: 'Magento' },
  { value: 'bigcommerce', label: 'BigCommerce' },
  { value: 'etsy', label: 'Etsy' },
];

// 过滤器配置
const filterSections: FilterSection[] = [
  {
    id: 'publication_date',
    title: 'Publication Date',
    icon: CalendarIcon,
    type: 'date',
  },
  {
    id: 'countries',
    title: 'Countries',
    icon: GlobeIcon,
    type: 'multiselect',
    options: countries,
  },
  {
    id: 'categories',
    title: 'Categories',
    icon: TagIcon,
    type: 'multiselect',
    options: categories,
  },
  {
    id: 'shop_type',
    title: 'Shop Type',
    icon: ShoppingBagIcon,
    type: 'multiselect',
    options: shopTypes,
    hasActiveIndicator: true,
  },
  {
    id: 'items_sold',
    title: 'Items Sold',
    icon: PackageIcon,
    type: 'range',
    isPopular: true,
  },
  {
    id: 'revenue',
    title: 'Revenue',
    icon: DollarSignIcon,
    type: 'range',
    isPopular: true,
  },
  {
    id: 'is_dropshipping',
    title: 'Is Dropshipping',
    icon: TruckIcon,
    type: 'toggle',
  },
];

export function ProductsFilters() {
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
    />
  );
}
