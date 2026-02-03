'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { EmptyStateCollection } from '@/components/ui/empty-state-collection';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { InstagramIcon, YoutubeIcon } from '@/components/icons';

// Menu types
type MenuType = 'advertiser' | 'products' | 'mobile-app' | 'influencer' | 'custom-services';
type InfluencerTab = 'operations' | 'results';
type CustomServicesTab = 'operations' | 'progress';
type AdvertiserTab = 'operations' | 'results';
type OperationMode = 'upload' | 'url' | 'keywords';
type AdvertiserOperationMode = 'manual' | 'url' | 'keywords';
type Platform = 'tiktok' | 'instagram' | 'youtube';
type AdvertiserPlatform = 'meta' | 'tiktok' | 'google';

// Job interface
interface CollectionJob {
  id: string;
  type: 'csv' | 'url' | 'keywords';
  name: string;
  createdAt: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  resultCount?: number;
  fileUrl?: string;
}

// Advertiser Tracking Job interface
interface AdvertiserTrackingJob {
  id: string;
  type: 'manual' | 'url' | 'keywords';
  name: string;
  platform: AdvertiserPlatform;
  createdAt: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  advertiserCount?: number;
  advertisers?: AdvertiserData[];
}

// Advertiser data interface
interface AdvertiserData {
  id: string;
  name: string;
  avatar: string;
  platform: AdvertiserPlatform;
  domain: string;
  totalAds: number;
  activeAds: number;
  totalSpend: string;
  totalCreatives: number;
  mainCategories: string[];
  topCountries: string[];
  firstSeen: string;
  lastSeen: string;
  status: 'active' | 'paused' | 'inactive';
}

// Service Request interface
interface RequestRequirements {
  platform: string[];
  targetRegion: string[];
  followerRange: string;
  contentCategory: string[];
  engagementRate?: string;
  dataFields: string[];
  quantity: number;
  additionalNotes?: string;
}

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  requirements: RequestRequirements;
  createdAt: string;
  status: 'submitted' | 'reviewing' | 'in-progress' | 'completed' | 'cancelled';
  progress: number;
  estimatedDelivery?: string;
  deliveredAt?: string;
  fileUrl?: string;
}

// Influencer data interface for preview
interface InfluencerData {
  accountId: string;
  followers: string;
  engagementRate: string;
  region: string;
  avgViewsLast10: string;
  email: string;
  audienceGender: string;
}

// Mock preview data
const mockInfluencerData: InfluencerData[] = [
  {
    accountId: '@fashionista_jane',
    followers: '1.2M',
    engagementRate: '4.8%',
    region: 'United States',
    avgViewsLast10: '156K',
    email: 'jane@fashionista.com',
    audienceGender: 'Female 68% / Male 32%',
  },
  {
    accountId: '@beauty_guru_mike',
    followers: '890K',
    engagementRate: '5.2%',
    region: 'United Kingdom',
    avgViewsLast10: '98K',
    email: 'mike@beautyguru.co.uk',
    audienceGender: 'Female 72% / Male 28%',
  },
  {
    accountId: '@lifestyle_emma',
    followers: '2.5M',
    engagementRate: '3.9%',
    region: 'Canada',
    avgViewsLast10: '210K',
    email: 'emma@lifestyle.ca',
    audienceGender: 'Female 61% / Male 39%',
  },
  {
    accountId: '@tech_reviewer_alex',
    followers: '1.8M',
    engagementRate: '6.1%',
    region: 'Germany',
    avgViewsLast10: '185K',
    email: 'alex@techreviews.de',
    audienceGender: 'Male 75% / Female 25%',
  },
  {
    accountId: '@fitness_sara',
    followers: '650K',
    engagementRate: '7.3%',
    region: 'Australia',
    avgViewsLast10: '72K',
    email: 'sara@fitlife.au',
    audienceGender: 'Female 82% / Male 18%',
  },
  {
    accountId: '@travel_adventures',
    followers: '3.1M',
    engagementRate: '4.1%',
    region: 'France',
    avgViewsLast10: '245K',
    email: 'contact@traveladv.fr',
    audienceGender: 'Female 55% / Male 45%',
  },
  {
    accountId: '@cooking_master_liu',
    followers: '980K',
    engagementRate: '5.8%',
    region: 'China',
    avgViewsLast10: '120K',
    email: 'liu@cookingmaster.cn',
    audienceGender: 'Female 64% / Male 36%',
  },
  {
    accountId: '@gaming_pro_kim',
    followers: '4.2M',
    engagementRate: '8.2%',
    region: 'South Korea',
    avgViewsLast10: '380K',
    email: 'kim@gamingpro.kr',
    audienceGender: 'Male 78% / Female 22%',
  },
];

// Menu icons
const AdvertiserIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const MobileAppIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);

const InfluencerIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CustomServicesIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const ProductsIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

// Menu items
const menuItems = [
  { id: 'advertiser' as MenuType, label: 'Advertiser', icon: AdvertiserIcon, comingSoon: false },
  { id: 'products' as MenuType, label: 'Products', icon: ProductsIcon, comingSoon: true },
  { id: 'mobile-app' as MenuType, label: 'Mobile App', icon: MobileAppIcon, comingSoon: true },
  { id: 'influencer' as MenuType, label: 'Influencer', icon: InfluencerIcon, comingSoon: false },
  { id: 'custom-services' as MenuType, label: 'Custom Services', icon: CustomServicesIcon, comingSoon: false },
];

// Influencer sub-tabs
const influencerTabs = [
  { 
    id: 'operations' as InfluencerTab, 
    label: 'Operations Console',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  { 
    id: 'results' as InfluencerTab, 
    label: 'Job Results',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    )
  },
];

// Custom Services sub-tabs
const customServicesTabs = [
  { 
    id: 'operations' as CustomServicesTab, 
    label: 'Operations Console',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  { 
    id: 'progress' as CustomServicesTab, 
    label: 'Request Progress',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    )
  },
];

// Advertiser sub-tabs
const advertiserTabs = [
  { 
    id: 'operations' as AdvertiserTab, 
    label: 'Operations Console',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  { 
    id: 'results' as AdvertiserTab, 
    label: 'Job Results',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    )
  },
];

// Operation mode options for dropdown
const operationModes = [
  { id: 'upload' as OperationMode, label: 'Upload CSV', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  )},
  { id: 'url' as OperationMode, label: 'From URL', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )},
  { id: 'keywords' as OperationMode, label: 'By Keywords', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )},
];

// Platform options
const platforms = [
  { id: 'tiktok' as Platform, name: 'TikTok', icon: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ), bgColor: 'bg-black', textColor: 'text-white', borderColor: 'border-black' },
  { id: 'instagram' as Platform, name: 'Instagram', icon: <InstagramIcon className="w-4 h-4" />, bgColor: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600', textColor: 'text-white', borderColor: 'border-pink-500' },
  { id: 'youtube' as Platform, name: 'YouTube', icon: <YoutubeIcon className="w-4 h-4" />, bgColor: 'bg-red-600', textColor: 'text-white', borderColor: 'border-red-600' },
];

// Advertiser operation mode options
const advertiserOperationModes = [
  { id: 'manual' as AdvertiserOperationMode, label: 'Manual Input', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  )},
  { id: 'url' as AdvertiserOperationMode, label: 'From URL', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )},
  { id: 'keywords' as AdvertiserOperationMode, label: 'By Keywords', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )},
];

// Advertiser platform options
const advertiserPlatforms = [
  { id: 'meta' as AdvertiserPlatform, name: 'Meta', icon: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
    </svg>
  ), bgColor: 'bg-blue-600', textColor: 'text-white', borderColor: 'border-blue-600' },
  { id: 'tiktok' as AdvertiserPlatform, name: 'TikTok', icon: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ), bgColor: 'bg-black', textColor: 'text-white', borderColor: 'border-black' },
  { id: 'google' as AdvertiserPlatform, name: 'Google', icon: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ), bgColor: 'bg-white', textColor: 'text-gray-800', borderColor: 'border-gray-300' },
];

// Mock Advertiser data for preview
const mockAdvertiserData: AdvertiserData[] = [
  {
    id: 'adv1',
    name: 'Nike Inc.',
    avatar: 'https://placehold.co/100/1e40af/ffffff?text=N',
    platform: 'meta',
    domain: 'nike.com',
    totalAds: 1245,
    activeAds: 328,
    totalSpend: '$2.4M',
    totalCreatives: 486,
    mainCategories: ['Sports', 'Fashion', 'Lifestyle'],
    topCountries: ['US', 'UK', 'DE'],
    firstSeen: '2022-01-15',
    lastSeen: '2024-12-21',
    status: 'active',
  },
  {
    id: 'adv2',
    name: 'Adidas',
    avatar: 'https://placehold.co/100/000000/ffffff?text=A',
    platform: 'tiktok',
    domain: 'adidas.com',
    totalAds: 892,
    activeAds: 156,
    totalSpend: '$1.8M',
    totalCreatives: 312,
    mainCategories: ['Sports', 'Streetwear'],
    topCountries: ['US', 'CN', 'JP'],
    firstSeen: '2022-03-20',
    lastSeen: '2024-12-20',
    status: 'active',
  },
  {
    id: 'adv3',
    name: 'Lululemon',
    avatar: 'https://placehold.co/100/dc2626/ffffff?text=L',
    platform: 'meta',
    domain: 'lululemon.com',
    totalAds: 567,
    activeAds: 89,
    totalSpend: '$980K',
    totalCreatives: 178,
    mainCategories: ['Fitness', 'Yoga', 'Lifestyle'],
    topCountries: ['US', 'CA', 'AU'],
    firstSeen: '2022-06-10',
    lastSeen: '2024-12-19',
    status: 'active',
  },
  {
    id: 'adv4',
    name: 'Under Armour',
    avatar: 'https://placehold.co/100/1f2937/ffffff?text=UA',
    platform: 'google',
    domain: 'underarmour.com',
    totalAds: 423,
    activeAds: 67,
    totalSpend: '$650K',
    totalCreatives: 134,
    mainCategories: ['Sports', 'Performance'],
    topCountries: ['US', 'UK'],
    firstSeen: '2022-08-05',
    lastSeen: '2024-12-18',
    status: 'active',
  },
  {
    id: 'adv5',
    name: 'Puma',
    avatar: 'https://placehold.co/100/059669/ffffff?text=P',
    platform: 'tiktok',
    domain: 'puma.com',
    totalAds: 356,
    activeAds: 45,
    totalSpend: '$520K',
    totalCreatives: 98,
    mainCategories: ['Sports', 'Fashion'],
    topCountries: ['DE', 'US', 'FR'],
    firstSeen: '2022-09-12',
    lastSeen: '2024-12-17',
    status: 'active',
  },
];

// Meta Ads Library Advertiser Suggestions (for search)
const metaAdsLibraryAdvertisers = [
  { id: 'meta1', name: 'Nike', domain: 'nike.com', avatar: 'https://placehold.co/40/1e40af/ffffff?text=N', totalAds: 1245 },
  { id: 'meta2', name: 'Adidas', domain: 'adidas.com', avatar: 'https://placehold.co/40/000000/ffffff?text=A', totalAds: 892 },
  { id: 'meta3', name: 'Lululemon', domain: 'lululemon.com', avatar: 'https://placehold.co/40/dc2626/ffffff?text=L', totalAds: 567 },
  { id: 'meta4', name: 'Under Armour', domain: 'underarmour.com', avatar: 'https://placehold.co/40/1f2937/ffffff?text=UA', totalAds: 423 },
  { id: 'meta5', name: 'Puma', domain: 'puma.com', avatar: 'https://placehold.co/40/059669/ffffff?text=P', totalAds: 356 },
  { id: 'meta6', name: 'New Balance', domain: 'newbalance.com', avatar: 'https://placehold.co/40/dc2626/ffffff?text=NB', totalAds: 289 },
  { id: 'meta7', name: 'Reebok', domain: 'reebok.com', avatar: 'https://placehold.co/40/1e40af/ffffff?text=R', totalAds: 234 },
  { id: 'meta8', name: 'ASICS', domain: 'asics.com', avatar: 'https://placehold.co/40/3b82f6/ffffff?text=AS', totalAds: 198 },
  { id: 'meta9', name: 'Skechers', domain: 'skechers.com', avatar: 'https://placehold.co/40/6366f1/ffffff?text=SK', totalAds: 176 },
  { id: 'meta10', name: 'Fila', domain: 'fila.com', avatar: 'https://placehold.co/40/ef4444/ffffff?text=F', totalAds: 145 },
  { id: 'meta11', name: "Levi's", domain: 'levi.com', avatar: 'https://placehold.co/40/dc2626/ffffff?text=LV', totalAds: 312 },
  { id: 'meta12', name: 'H&M', domain: 'hm.com', avatar: 'https://placehold.co/40/ef4444/ffffff?text=HM', totalAds: 456 },
  { id: 'meta13', name: 'Zara', domain: 'zara.com', avatar: 'https://placehold.co/40/000000/ffffff?text=Z', totalAds: 387 },
  { id: 'meta14', name: 'Uniqlo', domain: 'uniqlo.com', avatar: 'https://placehold.co/40/dc2626/ffffff?text=U', totalAds: 298 },
  { id: 'meta15', name: 'GAP', domain: 'gap.com', avatar: 'https://placehold.co/40/1e3a8a/ffffff?text=G', totalAds: 234 },
  { id: 'meta16', name: 'Coca-Cola', domain: 'coca-cola.com', avatar: 'https://placehold.co/40/dc2626/ffffff?text=CC', totalAds: 567 },
  { id: 'meta17', name: 'Pepsi', domain: 'pepsi.com', avatar: 'https://placehold.co/40/1e40af/ffffff?text=PP', totalAds: 489 },
  { id: 'meta18', name: 'Red Bull', domain: 'redbull.com', avatar: 'https://placehold.co/40/1e40af/ffffff?text=RB', totalAds: 378 },
  { id: 'meta19', name: 'Monster Energy', domain: 'monsterenergy.com', avatar: 'https://placehold.co/40/22c55e/ffffff?text=M', totalAds: 234 },
  { id: 'meta20', name: 'Gatorade', domain: 'gatorade.com', avatar: 'https://placehold.co/40/f97316/ffffff?text=GT', totalAds: 198 },
];

// Mock Advertiser Folders for Favorites
interface AdvertiserFolder {
  id: string;
  name: string;
  itemCount: number;
}

const mockAdvertiserFolders: AdvertiserFolder[] = [
  { id: 'default', name: 'Default', itemCount: 0 },
  { id: 'folder1', name: 'Tracked Advertisers', itemCount: 15 },
  { id: 'folder2', name: 'Competitor Analysis', itemCount: 8 },
  { id: 'folder3', name: 'Fashion Brands', itemCount: 12 },
  { id: 'folder4', name: 'Sports Advertisers', itemCount: 6 },
];

export default function OneCollectPage() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('influencer');
  const [influencerTab, setInfluencerTab] = useState<InfluencerTab>('operations');
  const [jobs, setJobs] = useState<CollectionJob[]>([
    // Mock initial jobs
    {
      id: '1',
      type: 'keywords',
      name: 'Search: fashion, beauty influencers',
      createdAt: '2024-12-20 14:30',
      status: 'completed',
      progress: 100,
      resultCount: 156,
      fileUrl: '/mock/results_1.xlsx',
    },
    {
      id: '2',
      type: 'url',
      name: 'Collect: tiktok.com/@fashionista',
      createdAt: '2024-12-21 09:15',
      status: 'running',
      progress: 65,
    },
  ]);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [previewJob, setPreviewJob] = useState<CollectionJob | null>(null);
  const [operationMode, setOperationMode] = useState<OperationMode>('upload');
  
  // URL input state
  const [urlInput, setUrlInput] = useState('');
  const [isCollectingUrl, setIsCollectingUrl] = useState(false);
  
  // Keywords input state
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('tiktok');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isSearchingKeywords, setIsSearchingKeywords] = useState(false);

  // Custom Services state
  const [customServicesTab, setCustomServicesTab] = useState<CustomServicesTab>('operations');
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    // Mock initial requests
    {
      id: '1',
      title: 'Collect 500 beauty influencers from TikTok',
      description: 'Need beauty influencers with 100K+ followers in the US market for upcoming skincare product launch campaign.',
      requirements: {
        platform: ['TikTok'],
        targetRegion: ['United States', 'Canada'],
        followerRange: '100K - 1M',
        contentCategory: ['Beauty', 'Skincare', 'Makeup'],
        engagementRate: '> 3%',
        dataFields: ['Account ID', 'Followers', 'Email', 'Engagement Rate', 'Avg Views', 'Audience Demographics'],
        quantity: 500,
        additionalNotes: 'Prefer influencers who have previously worked with beauty brands. Exclude accounts with less than 50% female audience.',
      },
      createdAt: '2024-12-18 10:30',
      status: 'completed',
      progress: 100,
      estimatedDelivery: '2024-12-20',
      deliveredAt: '2024-12-19 16:45',
      fileUrl: '/mock/custom_request_1.xlsx',
    },
    {
      id: '2',
      title: 'Gaming influencer database for EU region',
      description: 'Looking for gaming content creators across YouTube and Twitch for esports tournament promotion.',
      requirements: {
        platform: ['YouTube', 'Twitch'],
        targetRegion: ['Germany', 'France', 'United Kingdom', 'Spain', 'Italy'],
        followerRange: '50K - 5M',
        contentCategory: ['Gaming', 'Esports', 'Live Streaming'],
        engagementRate: '> 5%',
        dataFields: ['Account ID', 'Followers', 'Email', 'Avg Views', 'Primary Game Genre', 'Streaming Schedule'],
        quantity: 300,
        additionalNotes: 'Focus on FPS and MOBA game streamers. Must have English or local language content.',
      },
      createdAt: '2024-12-21 14:00',
      status: 'in-progress',
      progress: 45,
      estimatedDelivery: '2024-12-25',
    },
    {
      id: '3',
      title: 'Fashion brand ambassador list',
      description: 'Need fashion influencers suitable for luxury brand collaborations targeting high-end consumers.',
      requirements: {
        platform: ['Instagram', 'TikTok'],
        targetRegion: ['United States', 'United Kingdom', 'France', 'Japan'],
        followerRange: '200K - 2M',
        contentCategory: ['Fashion', 'Luxury', 'Lifestyle'],
        engagementRate: '> 4%',
        dataFields: ['Account ID', 'Followers', 'Email', 'Engagement Rate', 'Brand Collaborations History', 'Audience Income Level'],
        quantity: 200,
        additionalNotes: 'Must have clean, aesthetic feed. Previous luxury brand experience preferred. No controversial content.',
      },
      createdAt: '2024-12-22 09:00',
      status: 'reviewing',
      progress: 10,
      estimatedDelivery: '2024-12-28',
    },
  ]);
  const [showRequestSuccess, setShowRequestSuccess] = useState(false);
  const [previewRequest, setPreviewRequest] = useState<ServiceRequest | null>(null);
  const [detailsRequest, setDetailsRequest] = useState<ServiceRequest | null>(null);

  // Advertiser Tracking state
  const [advertiserTab, setAdvertiserTab] = useState<AdvertiserTab>('operations');
  const [advertiserOperationMode, setAdvertiserOperationMode] = useState<AdvertiserOperationMode>('manual');
  const [advertiserTrackingJobs, setAdvertiserTrackingJobs] = useState<AdvertiserTrackingJob[]>([
    // Mock initial jobs
    {
      id: '1',
      type: 'manual',
      name: 'Track: Nike, Adidas, Puma',
      platform: 'meta',
      createdAt: '2024-12-20 10:30',
      status: 'completed',
      progress: 100,
      advertiserCount: 3,
      advertisers: mockAdvertiserData.slice(0, 3),
    },
    {
      id: '2',
      type: 'url',
      name: 'Extract: facebook.com/ads/library?advertiser=nike',
      platform: 'meta',
      createdAt: '2024-12-21 14:20',
      status: 'running',
      progress: 45,
    },
  ]);
  const [showAdvertiserSuccess, setShowAdvertiserSuccess] = useState(false);
  const [previewAdvertiserJob, setPreviewAdvertiserJob] = useState<AdvertiserTrackingJob | null>(null);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState<AdvertiserData | null>(null);
  
  // Advertiser Manual input state
  const [advertiserManualInput, setAdvertiserManualInput] = useState('');
  const [advertiserManualList, setAdvertiserManualList] = useState<string[]>([]);
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);
  
  // Advertiser Search & Select state
  const [advertiserSearchInput, setAdvertiserSearchInput] = useState('');
  const [advertiserSearchFocused, setAdvertiserSearchFocused] = useState(false);
  const [selectedAdvertisersForTracking, setSelectedAdvertisersForTracking] = useState<typeof metaAdsLibraryAdvertisers>([]);
  const [customAdvertiserKeywords, setCustomAdvertiserKeywords] = useState<string[]>([]);
  const [trackingDuration, setTrackingDuration] = useState<'7' | '14' | '30'>('7');
  
  // Advertiser URL input state
  const [advertiserUrlInput, setAdvertiserUrlInput] = useState('');
  const [isExtractingUrl, setIsExtractingUrl] = useState(false);
  
  // Advertiser Keywords input state
  const [selectedAdvertiserPlatform, setSelectedAdvertiserPlatform] = useState<AdvertiserPlatform>('meta');
  const [advertiserKeywordInput, setAdvertiserKeywordInput] = useState('');
  const [advertiserKeywords, setAdvertiserKeywords] = useState<string[]>([]);
  const [isSearchingAdvertiserKeywords, setIsSearchingAdvertiserKeywords] = useState(false);

  // Advertiser Save to Favorites state
  const [advertiserFolders, setAdvertiserFolders] = useState<AdvertiserFolder[]>(mockAdvertiserFolders);
  const [selectedSaveFolder, setSelectedSaveFolder] = useState<string>('default');
  const [isFolderDropdownOpen, setIsFolderDropdownOpen] = useState(false);
  const [isCreatingNewFolder, setIsCreatingNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Filter advertisers based on search input
  const filteredAdvertisers = metaAdsLibraryAdvertisers.filter(adv => 
    adv.name.toLowerCase().includes(advertiserSearchInput.toLowerCase()) ||
    adv.domain.toLowerCase().includes(advertiserSearchInput.toLowerCase())
  ).filter(adv => !selectedAdvertisersForTracking.find(s => s.id === adv.id));

  // Toggle advertiser selection
  const toggleAdvertiserSelection = (advertiser: typeof metaAdsLibraryAdvertisers[0]) => {
    if (selectedAdvertisersForTracking.find(s => s.id === advertiser.id)) {
      setSelectedAdvertisersForTracking(prev => prev.filter(s => s.id !== advertiser.id));
    } else {
      setSelectedAdvertisersForTracking(prev => [...prev, advertiser]);
    }
  };

  // Remove selected advertiser
  const removeSelectedAdvertiser = (advertiserId: string) => {
    setSelectedAdvertisersForTracking(prev => prev.filter(s => s.id !== advertiserId));
  };

  // Add custom keyword
  const addCustomAdvertiserKeyword = () => {
    const keyword = advertiserSearchInput.trim();
    if (keyword && !customAdvertiserKeywords.includes(keyword)) {
      setCustomAdvertiserKeywords(prev => [...prev, keyword]);
      setAdvertiserSearchInput('');
    }
  };

  // Remove custom keyword
  const removeCustomAdvertiserKeyword = (keyword: string) => {
    setCustomAdvertiserKeywords(prev => prev.filter(k => k !== keyword));
  };

  // Submit selected advertisers for tracking
  const handleSubmitSelectedAdvertisers = async () => {
    if (selectedAdvertisersForTracking.length === 0 && customAdvertiserKeywords.length === 0) {
      alert('Please select advertisers or add keywords');
      return;
    }
    setIsSubmittingManual(true);
    try {
      const names = selectedAdvertisersForTracking.map(a => a.name);
      const allItems = [...names, ...customAdvertiserKeywords];
      addAdvertiserJob('manual', `Track: ${allItems.slice(0, 3).join(', ')}${allItems.length > 3 ? '...' : ''}`, 'meta');
      setSelectedAdvertisersForTracking([]);
      setCustomAdvertiserKeywords([]);
      setAdvertiserSearchInput('');
    } finally {
      setIsSubmittingManual(false);
    }
  };

  // Add new job
  const addJob = (type: 'csv' | 'url' | 'keywords', name: string) => {
    const newJob: CollectionJob = {
      id: Date.now().toString(),
      type,
      name,
      createdAt: new Date().toLocaleString('en-US', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false 
      }),
      status: 'pending',
      progress: 0,
    };
    setJobs(prev => [newJob, ...prev]);
    
    // Show success message
    setShowSubmitSuccess(true);
    setTimeout(() => setShowSubmitSuccess(false), 3000);
    
    // Simulate job progress
    simulateJobProgress(newJob.id);
  };

  // Simulate job progress
  const simulateJobProgress = (jobId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { ...job, status: 'completed', progress: 100, resultCount: Math.floor(Math.random() * 200) + 50, fileUrl: `/mock/results_${jobId}.xlsx` }
            : job
        ));
      } else {
        setJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { ...job, status: 'running', progress: Math.round(progress) }
            : job
        ));
      }
    }, 1000);
  };

  // Get status badge style
  const getStatusBadge = (status: CollectionJob['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      case 'running':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'failed':
        return 'bg-red-100 text-red-600';
    }
  };

  // Get type icon
  const getTypeIcon = (type: CollectionJob['type']) => {
    switch (type) {
      case 'csv':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        );
      case 'url':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        );
      case 'keywords':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        );
    }
  };

  // Handle URL collection
  const handleUrlCollect = async () => {
    if (!urlInput.trim()) {
      alert('Please enter a valid URL');
      return;
    }
    setIsCollectingUrl(true);
    try {
      addJob('url', `Collect: ${urlInput}`);
      setUrlInput('');
    } finally {
      setIsCollectingUrl(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    addJob('csv', `Upload: ${file.name}`);
  };

  // Handle keyword operations
  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return;
    const newKeywords = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)
      .filter(k => !keywords.includes(k));
    if (newKeywords.length > 0) {
      setKeywords([...keywords, ...newKeywords]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleKeywordsSearch = async () => {
    if (keywords.length === 0) {
      alert('Please add at least one keyword');
      return;
    }
    setIsSearchingKeywords(true);
    try {
      addJob('keywords', `Search: ${keywords.join(', ')} on ${selectedPlatform}`);
      setKeywords([]);
    } finally {
      setIsSearchingKeywords(false);
    }
  };

  // ========== Advertiser Tracking Functions ==========
  
  // Add new advertiser tracking job
  const addAdvertiserJob = (type: 'manual' | 'url' | 'keywords', name: string, platform: AdvertiserPlatform) => {
    const newJob: AdvertiserTrackingJob = {
      id: Date.now().toString(),
      type,
      name,
      platform,
      createdAt: new Date().toLocaleString('en-US', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false 
      }),
      status: 'pending',
      progress: 0,
    };
    setAdvertiserTrackingJobs(prev => [newJob, ...prev]);
    
    // Show success message
    setShowAdvertiserSuccess(true);
    setTimeout(() => setShowAdvertiserSuccess(false), 3000);
    
    // Simulate job progress
    simulateAdvertiserJobProgress(newJob.id);
  };

  // Simulate advertiser job progress
  const simulateAdvertiserJobProgress = (jobId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setAdvertiserTrackingJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { 
                ...job, 
                status: 'completed', 
                progress: 100, 
                advertiserCount: Math.floor(Math.random() * 10) + 1,
                advertisers: mockAdvertiserData.slice(0, Math.floor(Math.random() * 5) + 1)
              }
            : job
        ));
      } else {
        setAdvertiserTrackingJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { ...job, status: 'running', progress: Math.round(progress) }
            : job
        ));
      }
    }, 1000);
  };

  // Get advertiser type icon
  const getAdvertiserTypeIcon = (type: AdvertiserTrackingJob['type']) => {
    switch (type) {
      case 'manual':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        );
      case 'url':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        );
      case 'keywords':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        );
    }
  };

  // Handle advertiser manual input
  const handleAddAdvertiserManual = () => {
    if (!advertiserManualInput.trim()) return;
    const newItems = advertiserManualInput
      .split(/[,\n]/)
      .map(k => k.trim())
      .filter(k => k.length > 0)
      .filter(k => !advertiserManualList.includes(k));
    if (newItems.length > 0) {
      setAdvertiserManualList([...advertiserManualList, ...newItems]);
      setAdvertiserManualInput('');
    }
  };

  const removeAdvertiserManual = (item: string) => {
    setAdvertiserManualList(advertiserManualList.filter(k => k !== item));
  };

  const handleSubmitAdvertiserManual = async () => {
    if (advertiserManualList.length === 0) {
      alert('Please add at least one advertiser name or domain');
      return;
    }
    setIsSubmittingManual(true);
    try {
      addAdvertiserJob('manual', `Track: ${advertiserManualList.slice(0, 3).join(', ')}${advertiserManualList.length > 3 ? '...' : ''}`, selectedAdvertiserPlatform);
      setAdvertiserManualList([]);
    } finally {
      setIsSubmittingManual(false);
    }
  };

  // Handle advertiser URL extraction
  const handleAdvertiserUrlExtract = async () => {
    if (!advertiserUrlInput.trim()) {
      alert('Please enter a valid URL');
      return;
    }
    setIsExtractingUrl(true);
    try {
      addAdvertiserJob('url', `Extract: ${advertiserUrlInput.substring(0, 50)}...`, selectedAdvertiserPlatform);
      setAdvertiserUrlInput('');
    } finally {
      setIsExtractingUrl(false);
    }
  };

  // Handle advertiser keyword operations
  const handleAddAdvertiserKeyword = () => {
    if (!advertiserKeywordInput.trim()) return;
    const newKeywords = advertiserKeywordInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)
      .filter(k => !advertiserKeywords.includes(k));
    if (newKeywords.length > 0) {
      setAdvertiserKeywords([...advertiserKeywords, ...newKeywords]);
      setAdvertiserKeywordInput('');
    }
  };

  const removeAdvertiserKeyword = (keyword: string) => {
    setAdvertiserKeywords(advertiserKeywords.filter(k => k !== keyword));
  };

  const handleAdvertiserKeywordsSearch = async () => {
    if (advertiserKeywords.length === 0) {
      alert('Please add at least one keyword');
      return;
    }
    setIsSearchingAdvertiserKeywords(true);
    try {
      addAdvertiserJob('keywords', `Search: ${advertiserKeywords.join(', ')} on ${selectedAdvertiserPlatform}`, selectedAdvertiserPlatform);
      setAdvertiserKeywords([]);
    } finally {
      setIsSearchingAdvertiserKeywords(false);
    }
  };

  // Render operation content based on mode
  const renderOperationContent = () => {
    switch (operationMode) {
      case 'upload':
        return (
          <div className="space-y-6 pt-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV File</h3>
              <p className="text-sm text-gray-500">Upload a CSV file with influencer information to get started</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">CSV Template Format</h4>
              <div className="bg-white border border-gray-200 rounded overflow-hidden">
                <div className="grid grid-cols-2 bg-gray-100 border-b border-gray-200">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-700 border-r border-gray-200">Platform</div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-700">Username</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-200">
                  <div className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200 flex items-center gap-2">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/></svg>
                    TikTok
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-600">@username</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-200">
                  <div className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200 flex items-center gap-2">
                    <InstagramIcon className="w-3 h-3" />
                    Instagram
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-600">@username</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200 flex items-center gap-2">
                    <YoutubeIcon className="w-3 h-3" />
                    YouTube
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-600">@username</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <label className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload CSV File
                <input 
                  type="file" 
                  accept=".csv" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </label>
              <p className="text-xs text-gray-500 mt-3">Supported format: CSV (Max 5MB)</p>
            </div>
          </div>
        );

      case 'url':
        return (
          <div className="space-y-6 pt-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Collect From URL</h3>
              <p className="text-sm text-gray-500">Enter a URL to collect data in real-time</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <span className="text-xs text-gray-600">Supported:</span>
                <div className="flex items-center gap-2">
                  {platforms.map(p => (
                    <div key={p.id} className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200">
                      {p.icon}
                      <span className="text-xs font-medium">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  type="url"
                  placeholder="https://www.tiktok.com/@username/video/..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlCollect()}
                  disabled={isCollectingUrl}
                />
                <p className="text-xs text-gray-500">Paste a link from TikTok, Instagram, or YouTube to collect video data, engagement metrics, and creator information.</p>
              </div>

              <Button
                onClick={handleUrlCollect}
                disabled={isCollectingUrl || !urlInput.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isCollectingUrl ? 'Collecting...' : 'Collect Now'}
              </Button>
            </div>
          </div>
        );

      case 'keywords':
        return (
          <div className="space-y-6 pt-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Search By Keywords</h3>
              <p className="text-sm text-gray-500">Search by keywords or hashtags to discover content</p>
            </div>

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
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      )}
                    >
                      {platform.icon}
                      <span className="text-sm font-medium">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword Input */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">2. Enter Keywords or Hashtags</h4>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter keywords or #hashtags (separate by comma)"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                      onBlur={handleAddKeyword}
                      disabled={isSearchingKeywords}
                    />
                    <Button onClick={handleAddKeyword} variant="outline" disabled={!keywordInput.trim()}>
                      Add
                    </Button>
                  </div>

                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-white rounded-md border border-gray-200">
                      {keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                          {keyword.startsWith('#') && <span className="text-blue-600">#</span>}
                          <span>{keyword.replace(/^#/, '')}</span>
                          <button onClick={() => removeKeyword(keyword)} className="ml-1 hover:text-red-600">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">Enter natural language keywords like "makeup tutorial" or hashtags like "#beauty". Separate multiple keywords with commas.</p>
                </div>
              </div>

              <Button
                onClick={handleKeywordsSearch}
                disabled={isSearchingKeywords || keywords.length === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSearchingKeywords ? 'Searching...' : `Search Now${keywords.length > 0 ? ` (${keywords.length} keyword${keywords.length > 1 ? 's' : ''})` : ''}`}
              </Button>
            </div>
          </div>
        );
    }
  };

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'advertiser':
        return (
          <div className="py-4">
            {/* Advertiser Sub-tabs */}
            <div className="flex gap-3 mb-8 bg-gray-100 p-1.5 rounded-lg w-fit">
              {advertiserTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdvertiserTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all rounded-md',
                    advertiserTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.id === 'results' && advertiserTrackingJobs.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                      {advertiserTrackingJobs.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Success Message */}
            {showAdvertiserSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-green-700 font-medium">Tracking job submitted successfully! Check Job Results for progress.</span>
              </div>
            )}

            {/* Tab Content */}
            {advertiserTab === 'operations' ? (
              <div className="flex justify-center">
                <div className="w-full max-w-2xl space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Search & Track Advertisers</h3>
                    <p className="text-sm text-gray-500">Search from Meta Ads Library or enter keywords directly to track advertisers</p>
                  </div>

                  {/* Search and Select Area */}
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  {/* Meta Platform Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Data Source:</span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                        </svg>
                        Meta Ads Library
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Track Duration:</span>
                      <div className="flex items-center bg-white rounded-lg border border-gray-200 p-0.5">
                        {(['7', '14', '30'] as const).map((duration) => (
                          <button
                            key={duration}
                            onClick={() => setTrackingDuration(duration)}
                            className={cn(
                              'px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap',
                              trackingDuration === duration
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            )}
                          >
                            {duration} Days
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Search Input with Dropdown */}
                  <div className="relative">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <Input
                          type="text"
                          placeholder="Search advertisers or enter keywords..."
                          value={advertiserSearchInput}
                          onChange={(e) => setAdvertiserSearchInput(e.target.value)}
                          onFocus={() => setAdvertiserSearchFocused(true)}
                          onBlur={() => setTimeout(() => setAdvertiserSearchFocused(false), 200)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && advertiserSearchInput.trim()) {
                              e.preventDefault();
                              addCustomAdvertiserKeyword();
                            }
                          }}
                          className="pl-10 pr-4 py-3 text-base"
                        />
                      </div>
                      <Button
                        onClick={addCustomAdvertiserKeyword}
                        variant="outline"
                        disabled={!advertiserSearchInput.trim()}
                        className="px-4 whitespace-nowrap"
                      >
                        Add
                      </Button>
                    </div>

                    {/* Dropdown Suggestions */}
                    {advertiserSearchFocused && advertiserSearchInput.length > 0 && filteredAdvertisers.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg max-h-64 overflow-auto">
                        {filteredAdvertisers.map((advertiser) => (
                          <button
                            key={advertiser.id}
                            onClick={() => {
                              toggleAdvertiserSelection(advertiser);
                              setAdvertiserSearchInput('');
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                          >
                            <img 
                              src={advertiser.avatar} 
                              alt={advertiser.name}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{advertiser.name}</p>
                              <p className="text-xs text-gray-500">{advertiser.domain}</p>
                            </div>
                            <span className="text-xs text-gray-400">{advertiser.totalAds.toLocaleString()} ads</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* No results */}
                    {advertiserSearchFocused && advertiserSearchInput.length > 0 && filteredAdvertisers.length === 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg p-4 text-center">
                        <p className="text-sm text-gray-500">No advertisers found matching "{advertiserSearchInput}"</p>
                      </div>
                    )}
                  </div>

                  {/* Selected Advertisers & Custom Keywords */}
                  {(selectedAdvertisersForTracking.length > 0 || customAdvertiserKeywords.length > 0) && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          Selected Items ({selectedAdvertisersForTracking.length + customAdvertiserKeywords.length})
                        </h4>
                        <button 
                          onClick={() => {
                            setSelectedAdvertisersForTracking([]);
                            setCustomAdvertiserKeywords([]);
                          }}
                          className="text-xs text-gray-500 hover:text-red-600"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {/* Selected Advertisers */}
                        {selectedAdvertisersForTracking.map((advertiser) => (
                          <div 
                            key={advertiser.id} 
                            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 shadow-sm"
                          >
                            <img 
                              src={advertiser.avatar} 
                              alt={advertiser.name}
                              className="w-6 h-6 rounded object-cover"
                            />
                            <span className="text-sm font-medium text-gray-900">{advertiser.name}</span>
                            <button 
                              onClick={() => removeSelectedAdvertiser(advertiser.id)}
                              className="ml-1 text-gray-400 hover:text-red-600"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {/* Custom Keywords */}
                        {customAdvertiserKeywords.map((keyword) => (
                          <div 
                            key={keyword} 
                            className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200 shadow-sm"
                          >
                            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                            <span className="text-sm font-medium text-purple-700">{keyword}</span>
                            <button 
                              onClick={() => removeCustomAdvertiserKeyword(keyword)}
                              className="ml-1 text-purple-400 hover:text-red-600"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmitSelectedAdvertisers}
                    disabled={isSubmittingManual || (selectedAdvertisersForTracking.length === 0 && customAdvertiserKeywords.length === 0)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                  >
                    {isSubmittingManual ? 'Submitting...' : `Start Tracking${(selectedAdvertisersForTracking.length + customAdvertiserKeywords.length) > 0 ? ` (${selectedAdvertisersForTracking.length + customAdvertiserKeywords.length} item${(selectedAdvertisersForTracking.length + customAdvertiserKeywords.length) > 1 ? 's' : ''})` : ''}`}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">Search advertisers from Meta Ads Library or enter custom keywords to track.</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Advertiser Job Results */
              <div className="space-y-4">
                {advertiserTrackingJobs.length === 0 ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Tracking Jobs Yet</h3>
                      <p className="text-sm text-gray-500">Submit a tracking task in Operations Console to see results here.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="col-span-1">Type</div>
                      <div className="col-span-4">Task Name</div>
                      <div className="col-span-2">Platform</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-1">Results</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    
                    {/* Table Body */}
                    {advertiserTrackingJobs.map((job) => (
                      <div key={job.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0 items-center hover:bg-gray-50">
                        {/* Type */}
                        <div className="col-span-1">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                            {getAdvertiserTypeIcon(job.type)}
                          </div>
                        </div>
                        
                        {/* Task Name */}
                        <div className="col-span-4">
                          <p className="text-sm font-medium text-gray-900 truncate">{job.name}</p>
                          <p className="text-xs text-gray-500">{job.createdAt}</p>
                        </div>
                        
                        {/* Platform */}
                        <div className="col-span-2">
                          <span className={cn(
                            'inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full',
                            job.platform === 'meta' && 'bg-blue-100 text-blue-700',
                            job.platform === 'tiktok' && 'bg-gray-900 text-white',
                            job.platform === 'google' && 'bg-green-100 text-green-700'
                          )}>
                            {job.platform === 'meta' && 'Meta'}
                            {job.platform === 'tiktok' && 'TikTok'}
                            {job.platform === 'google' && 'Google'}
                          </span>
                        </div>
                        
                        {/* Status with Progress */}
                        <div className="col-span-2">
                          <div className="space-y-1">
                            <span className={cn('inline-flex px-2 py-0.5 text-xs font-medium rounded-full', getStatusBadge(job.status))}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                            {job.status === 'running' && (
                              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                  style={{ width: `${job.progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Results Count */}
                        <div className="col-span-1">
                          <p className="text-sm text-gray-600">
                            {job.advertiserCount ? `${job.advertiserCount} found` : '-'}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="col-span-2 flex items-center justify-end gap-2">
                          {job.status === 'completed' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8"
                                onClick={() => setPreviewAdvertiserJob(job)}
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View
                              </Button>
                            </>
                          )}
                          {job.status === 'running' && (
                            <span className="text-sm text-blue-600">{job.progress}%</span>
                          )}
                          {job.status === 'pending' && (
                            <span className="text-sm text-gray-400">Waiting...</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      
      case 'mobile-app':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-sm text-gray-500 max-w-md">
                Mobile App data collection feature is under development. Stay tuned!
              </p>
            </div>
          </div>
        );
      
      case 'influencer':
        return (
          <div className="py-4">
            {/* Influencer Sub-tabs */}
            <div className="flex gap-3 mb-8 bg-gray-100 p-1.5 rounded-lg w-fit">
              {influencerTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInfluencerTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all rounded-md',
                    influencerTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.id === 'results' && jobs.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                      {jobs.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Success Message */}
            {showSubmitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-green-700 font-medium">Job submitted successfully! Check Job Results for progress.</span>
              </div>
            )}

            {/* Tab Content */}
            {influencerTab === 'operations' ? (
              <div className="space-y-6">
                {/* Operation Mode Underline Tabs */}
                <div>
                  <div className="inline-flex gap-8 border-b border-gray-200">
                    {operationModes.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setOperationMode(mode.id)}
                        className={cn(
                          'flex items-center gap-2 pb-3 text-sm font-medium border-b-2 -mb-px transition-all',
                          operationMode === mode.id
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        )}
                      >
                        {mode.icon}
                        <span>{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Operation Content with Slide Animation */}
                <div className="relative overflow-hidden mt-8">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${operationModes.findIndex(m => m.id === operationMode) * 100}%)` }}
                  >
                    {operationModes.map((mode) => (
                      <div key={mode.id} className="w-full flex-shrink-0">
                        <div className="flex items-center justify-center min-h-[400px]">
                          <div className="max-w-3xl w-full">
                            {operationMode === mode.id && renderOperationContent()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Job Results */
              <div className="space-y-4">
                {jobs.length === 0 ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Yet</h3>
                      <p className="text-sm text-gray-500">Submit a collection task in Operations Console to see results here.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="col-span-1">Type</div>
                      <div className="col-span-4">Task Name</div>
                      <div className="col-span-2">Created</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-1">Results</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    
                    {/* Table Body */}
                    {jobs.map((job) => (
                      <div key={job.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0 items-center hover:bg-gray-50">
                        {/* Type */}
                        <div className="col-span-1">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                            {getTypeIcon(job.type)}
                          </div>
                        </div>
                        
                        {/* Task Name */}
                        <div className="col-span-4">
                          <p className="text-sm font-medium text-gray-900 truncate">{job.name}</p>
                        </div>
                        
                        {/* Created */}
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">{job.createdAt}</p>
                        </div>
                        
                        {/* Status with Progress */}
                        <div className="col-span-2">
                          <div className="space-y-1">
                            <span className={cn('inline-flex px-2 py-0.5 text-xs font-medium rounded-full', getStatusBadge(job.status))}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                            {job.status === 'running' && (
                              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                  style={{ width: `${job.progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Results Count */}
                        <div className="col-span-1">
                          <p className="text-sm text-gray-600">
                            {job.resultCount ? `${job.resultCount} items` : '-'}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <div className="col-span-2 flex items-center justify-end gap-2">
                          {job.status === 'completed' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8"
                                onClick={() => setPreviewJob(job)}
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                className="h-8"
                                onClick={() => alert(`Downloading: ${job.fileUrl}`)}
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                              </Button>
                            </>
                          )}
                          {job.status === 'running' && (
                            <span className="text-sm text-blue-600">{job.progress}%</span>
                          )}
                          {job.status === 'pending' && (
                            <span className="text-sm text-gray-400">Waiting...</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      
      case 'custom-services':
        return (
          <div className="py-4">
            {/* Custom Services Sub-tabs */}
            <div className="flex gap-3 mb-8 bg-gray-100 p-1.5 rounded-lg w-fit">
              {customServicesTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCustomServicesTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all rounded-md',
                    customServicesTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.id === 'progress' && serviceRequests.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                      {serviceRequests.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Success Message */}
            {showRequestSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-green-700 font-medium">Request submitted successfully! Check Request Progress for updates.</span>
              </div>
            )}

            {/* Tab Content */}
            {customServicesTab === 'operations' ? (
              <div className="pt-6">
                <EmptyStateCollection
                  title="Custom Data Collection Service"
                  description="Submit your custom data collection requirements and our professional team will help you gather the information you need"
                  onSubmit={async (requirements) => {
                    console.log('Custom service requirements:', requirements);
                    // Add new request
                    const newRequest: ServiceRequest = {
                      id: Date.now().toString(),
                      title: requirements.substring(0, 50) + (requirements.length > 50 ? '...' : ''),
                      description: requirements,
                      requirements: {
                        platform: ['TikTok', 'Instagram'],
                        targetRegion: ['United States'],
                        followerRange: '10K - 500K',
                        contentCategory: ['General'],
                        dataFields: ['Account ID', 'Followers', 'Email', 'Engagement Rate'],
                        quantity: 100,
                        additionalNotes: requirements,
                      },
                      createdAt: new Date().toLocaleString('en-US', { 
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit', hour12: false 
                      }),
                      status: 'submitted',
                      progress: 0,
                      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    };
                    setServiceRequests(prev => [newRequest, ...prev]);
                    setShowRequestSuccess(true);
                    setTimeout(() => setShowRequestSuccess(false), 3000);
                  }}
                  buttonText="Submit Request"
                />
              </div>
            ) : (
              /* Request Progress */
              <div className="space-y-4">
                {serviceRequests.length === 0 ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Requests Yet</h3>
                      <p className="text-sm text-gray-500">Submit a custom request in Operations Console to see progress here.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {serviceRequests.map((request) => (
                      <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900">{request.title}</h3>
                              <button
                                onClick={() => setDetailsRequest(request)}
                                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                              >
                                View Details
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1">{request.description}</p>
                          </div>
                          <span className={cn(
                            'px-2.5 py-1 text-xs font-medium rounded-full ml-4',
                            request.status === 'submitted' && 'bg-gray-100 text-gray-600',
                            request.status === 'reviewing' && 'bg-yellow-100 text-yellow-700',
                            request.status === 'in-progress' && 'bg-blue-100 text-blue-600',
                            request.status === 'completed' && 'bg-green-100 text-green-600',
                            request.status === 'cancelled' && 'bg-red-100 text-red-600'
                          )}>
                            {request.status === 'in-progress' ? 'In Progress' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{request.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                'h-full rounded-full transition-all duration-300',
                                request.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                              )}
                              style={{ width: `${request.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Info Row */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <span>Submitted: {request.createdAt}</span>
                            {request.estimatedDelivery && (
                              <span>Est. Delivery: {request.estimatedDelivery}</span>
                            )}
                            {request.deliveredAt && (
                              <span className="text-green-600">Delivered: {request.deliveredAt}</span>
                            )}
                          </div>
                          {request.status === 'completed' && request.fileUrl && (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => setPreviewRequest(request)}
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => alert(`Downloading: ${request.fileUrl}`)}
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Advertiser Preview Modal */}
      {previewAdvertiserJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setPreviewAdvertiserJob(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Tracked Advertisers</h2>
                <p className="text-sm text-gray-500 mt-0.5">{previewAdvertiserJob.name} • {previewAdvertiserJob.advertiserCount} advertisers found</p>
              </div>
              <button
                onClick={() => setPreviewAdvertiserJob(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body - Advertiser Cards */}
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(previewAdvertiserJob.advertisers || mockAdvertiserData).map((advertiser) => (
                  <div 
                    key={advertiser.id} 
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <img 
                        src={advertiser.avatar} 
                        alt={advertiser.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{advertiser.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{advertiser.domain}</p>
                        <span className={cn(
                          'inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded mt-1',
                          advertiser.status === 'active' && 'bg-green-100 text-green-700',
                          advertiser.status === 'paused' && 'bg-yellow-100 text-yellow-700',
                          advertiser.status === 'inactive' && 'bg-gray-100 text-gray-600'
                        )}>
                          {advertiser.status.charAt(0).toUpperCase() + advertiser.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Total Ads</span>
                        <p className="font-semibold text-gray-900">{advertiser.totalAds.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Active Ads</span>
                        <p className="font-semibold text-gray-900">{advertiser.activeAds.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Spend</span>
                        <p className="font-semibold text-gray-900">{advertiser.totalSpend}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Creatives</span>
                        <p className="font-semibold text-gray-900">{advertiser.totalCreatives.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-gray-500 block mb-1">Countries</span>
                          <div className="flex flex-wrap gap-1">
                            {advertiser.topCountries.slice(0, 3).map(country => (
                              <span key={country} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">{country}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-gray-500 block mb-1">Categories</span>
                          <div className="flex flex-wrap gap-1">
                            {advertiser.mainCategories.slice(0, 2).map(cat => (
                              <span key={cat} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">{cat}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              {/* Folder Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFolderDropdownOpen(!isFolderDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors min-w-[200px]"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <span className="flex-1 text-left truncate">
                    {advertiserFolders.find(f => f.id === selectedSaveFolder)?.name || 'Default'}
                  </span>
                  <svg className={cn("w-4 h-4 text-gray-500 transition-transform", isFolderDropdownOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isFolderDropdownOpen && (
                  <div className="absolute bottom-full mb-2 left-0 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-10 max-h-64 overflow-auto">
                    {/* Existing Folders */}
                    {advertiserFolders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => {
                          setSelectedSaveFolder(folder.id);
                          setIsFolderDropdownOpen(false);
                          setIsCreatingNewFolder(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors",
                          selectedSaveFolder === folder.id && "bg-blue-50"
                        )}
                      >
                        <svg className={cn("w-4 h-4", selectedSaveFolder === folder.id ? "text-blue-600" : "text-gray-400")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm font-medium truncate", selectedSaveFolder === folder.id ? "text-blue-600" : "text-gray-900")}>{folder.name}</p>
                          <p className="text-xs text-gray-500">{folder.itemCount} items</p>
                        </div>
                        {selectedSaveFolder === folder.id && (
                          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Create New Folder */}
                    {!isCreatingNewFolder ? (
                      <button
                        onClick={() => setIsCreatingNewFolder(true)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-blue-600"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm font-medium">Create New Folder</span>
                      </button>
                    ) : (
                      <div className="px-4 py-2.5">
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Folder name..."
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            className="flex-1 h-8 text-sm"
                            autoFocus
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newFolderName.trim()) {
                                const newFolder: AdvertiserFolder = {
                                  id: `folder-${Date.now()}`,
                                  name: newFolderName.trim(),
                                  itemCount: 0,
                                };
                                setAdvertiserFolders(prev => [...prev, newFolder]);
                                setSelectedSaveFolder(newFolder.id);
                                setNewFolderName('');
                                setIsCreatingNewFolder(false);
                                setIsFolderDropdownOpen(false);
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => {
                              if (newFolderName.trim()) {
                                const newFolder: AdvertiserFolder = {
                                  id: `folder-${Date.now()}`,
                                  name: newFolderName.trim(),
                                  itemCount: 0,
                                };
                                setAdvertiserFolders(prev => [...prev, newFolder]);
                                setSelectedSaveFolder(newFolder.id);
                                setNewFolderName('');
                                setIsCreatingNewFolder(false);
                                setIsFolderDropdownOpen(false);
                              }
                            }}
                            disabled={!newFolderName.trim()}
                            className="h-8 px-3"
                          >
                            Add
                          </Button>
                        </div>
                        <button
                          onClick={() => {
                            setIsCreatingNewFolder(false);
                            setNewFolderName('');
                          }}
                          className="text-xs text-gray-500 hover:text-gray-700 mt-1"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPreviewAdvertiserJob(null);
                    setIsFolderDropdownOpen(false);
                    setIsCreatingNewFolder(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsSaving(true);
                    // Simulate save
                    setTimeout(() => {
                      const folderName = advertiserFolders.find(f => f.id === selectedSaveFolder)?.name || 'Default';
                      alert(`Saved to "${folderName}" folder successfully!`);
                      setIsSaving(false);
                      setPreviewAdvertiserJob(null);
                    }, 500);
                  }}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setPreviewJob(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Preview Results</h2>
                <p className="text-sm text-gray-500 mt-0.5">{previewJob.name} • {previewJob.resultCount} items</p>
              </div>
              <button
                onClick={() => setPreviewJob(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body - Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Account ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Followers</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Engagement Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Region</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Avg Views (Last 10)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Audience Gender</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockInfluencerData.map((influencer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{influencer.accountId}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{influencer.followers}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {influencer.engagementRate}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{influencer.region}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{influencer.avgViewsLast10}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{influencer.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{influencer.audienceGender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500">Showing {mockInfluencerData.length} of {previewJob.resultCount} results</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setPreviewJob(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    alert(`Downloading: ${previewJob.fileUrl}`);
                    setPreviewJob(null);
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Full Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Request Preview Modal - Shows Data Table */}
      {previewRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setPreviewRequest(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Preview Results</h2>
                <p className="text-sm text-gray-500 mt-0.5">{previewRequest.title} • {mockInfluencerData.length} items</p>
              </div>
              <button
                onClick={() => setPreviewRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body - Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Account ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Followers</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Engagement Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Region</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Avg Views (Last 10)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Audience Gender</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockInfluencerData.map((influencer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{influencer.accountId}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{influencer.followers}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {influencer.engagementRate}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{influencer.region}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{influencer.avgViewsLast10}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{influencer.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{influencer.audienceGender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500">Showing {mockInfluencerData.length} results</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setPreviewRequest(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    alert(`Downloading: ${previewRequest.fileUrl}`);
                    setPreviewRequest(null);
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Full Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal - Shows Structured Requirements */}
      {detailsRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setDetailsRequest(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Request Details</h2>
              <button
                onClick={() => setDetailsRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-auto px-6 py-5 space-y-6">
              {/* Title & Status */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Request Title</label>
                  <p className="mt-1 text-base font-semibold text-gray-900">{detailsRequest.title}</p>
                </div>
                <span className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-full',
                  detailsRequest.status === 'submitted' && 'bg-gray-100 text-gray-600',
                  detailsRequest.status === 'reviewing' && 'bg-yellow-100 text-yellow-700',
                  detailsRequest.status === 'in-progress' && 'bg-blue-100 text-blue-600',
                  detailsRequest.status === 'completed' && 'bg-green-100 text-green-600',
                  detailsRequest.status === 'cancelled' && 'bg-red-100 text-red-600'
                )}>
                  {detailsRequest.status === 'in-progress' ? 'In Progress' : detailsRequest.status.charAt(0).toUpperCase() + detailsRequest.status.slice(1)}
                </span>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</label>
                <p className="mt-1 text-sm text-gray-700">{detailsRequest.description}</p>
              </div>

              {/* Structured Requirements */}
              <div className="bg-gray-50 rounded-lg p-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Requirements Specification
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Platform */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">Platform</label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {detailsRequest.requirements.platform.map((p) => (
                        <span key={p} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">{p}</span>
                      ))}
                    </div>
                  </div>

                  {/* Target Region */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">Target Region</label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {detailsRequest.requirements.targetRegion.map((r) => (
                        <span key={r} className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded">{r}</span>
                      ))}
                    </div>
                  </div>

                  {/* Follower Range */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">Follower Range</label>
                    <p className="mt-1 text-sm text-gray-900 font-medium">{detailsRequest.requirements.followerRange}</p>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">Target Quantity</label>
                    <p className="mt-1 text-sm text-gray-900 font-medium">{detailsRequest.requirements.quantity.toLocaleString()} influencers</p>
                  </div>

                  {/* Content Category */}
                  <div>
                    <label className="text-xs font-medium text-gray-500">Content Category</label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {detailsRequest.requirements.contentCategory.map((c) => (
                        <span key={c} className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Rate */}
                  {detailsRequest.requirements.engagementRate && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">Min. Engagement Rate</label>
                      <p className="mt-1 text-sm text-gray-900 font-medium">{detailsRequest.requirements.engagementRate}</p>
                    </div>
                  )}
                </div>

                {/* Data Fields */}
                <div>
                  <label className="text-xs font-medium text-gray-500">Required Data Fields</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {detailsRequest.requirements.dataFields.map((field) => (
                      <span key={field} className="px-2.5 py-1 text-xs bg-white border border-gray-200 text-gray-700 rounded-md">{field}</span>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                {detailsRequest.requirements.additionalNotes && (
                  <div>
                    <label className="text-xs font-medium text-gray-500">Additional Notes</label>
                    <p className="mt-1 text-sm text-gray-600 italic">"{detailsRequest.requirements.additionalNotes}"</p>
                  </div>
                )}
              </div>

              {/* Timeline Info */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted At</label>
                  <p className="mt-1 text-sm text-gray-900">{detailsRequest.createdAt}</p>
                </div>
                {detailsRequest.estimatedDelivery && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Delivery</label>
                    <p className="mt-1 text-sm text-gray-900">{detailsRequest.estimatedDelivery}</p>
                  </div>
                )}
                {detailsRequest.deliveredAt && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered At</label>
                    <p className="mt-1 text-sm text-green-600 font-medium">{detailsRequest.deliveredAt}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</label>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          'h-full rounded-full',
                          detailsRequest.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                        )}
                        style={{ width: `${detailsRequest.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{detailsRequest.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                onClick={() => setDetailsRequest(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <PageHeader 
        title="Real‑time Data Capture"
        description="Keeps grabbing, checking, and streaming data in real time, so you can analyze it right away."
        className="relative"
      />

      {/* Content Section */}
      <div className="bg-white h-full p-6">
        <div className="flex gap-6">
          {/* Left Sidebar Menu */}
          <div className="w-56 flex-shrink-0">
            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveMenu(item.id)}
                        className={cn(
                          'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            size={18}
                            className={cn(
                              'shrink-0',
                              isActive ? 'text-blue-600' : 'text-gray-500'
                            )}
                          />
                          <span>{item.label}</span>
                        </div>
                        {item.comingSoon && (
                          <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                            Soon
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
