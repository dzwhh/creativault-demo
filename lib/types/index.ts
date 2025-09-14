// Core entity types
export interface Ad {
  id: string;
  platform: 'facebook' | 'tiktok' | 'instagram' | 'youtube' | 'other';
  advertiserName: string;
  brandLogo?: string;
  headline?: string;
  primaryText?: string;
  mediaType: 'image' | 'video' | 'carousel' | 'short-drama';
  mediaUrls: string[];
  cta?: string;
  landingPageUrl?: string;
  country: string;
  language: string;
  createdAt: string;
  firstSeen: string;
  lastSeen: string;
  impressionsEst?: number;
  spendBracket?: 'low' | 'medium' | 'high';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  predictedCTR?: number;
  predictedCVR?: number;
  vertical?: string;
  tags: string[];
}

export interface Product {
  id: string;
  productName: string;
  image: string;
  category: string;
  subCategory?: string;
  sellingPriceRange?: [number, number];
  supplierLinks?: string[];
  trendingScore: number;
  adCountLinked: number;
  firstSeen: string;
  lastSeen: string;
  regions: string[];
  platforms: string[];
  tags: string[];
}

export interface Creator {
  id: string;
  name: string;
  avatar?: string;
  followerCount: Record<string, number>;
  avgEngagementRate?: number;
  niches: string[];
  recentAdIds: string[];
  location?: string;
  contactObfuscated?: string;
}

export interface AppGaming {
  id: string;
  appName: string;
  iconUrl?: string;
  store: 'appstore' | 'googleplay' | 'other';
  category: string;
  rankTrend: number[];
  adCount: number;
  sdkTags: string[];
  monetization: 'hybrid' | 'iap' | 'ads' | 'subscription';
  countriesActive: string[];
}

export interface ShortDrama {
  id: string;
  title: string;
  cover: string;
  episodesCount: number;
  platform: string;
  genre?: string;
  playVolumeEst?: number;
  adIntegrations: string[];
  releasePace?: string;
  audienceProfileSummary?: string;
}

export interface AIApp {
  id: string;
  appName: string;
  category: string;
  pricingModel?: string;
  userGrowthEst?: number[];
  website?: string;
  trafficSources?: string[];
  relatedAdIds: string[];
  differentiators?: string[];
}

export interface Favorite {
  id: string;
  userId: string;
  targetType: 'ad' | 'product' | 'creator' | 'app' | 'short-drama' | 'ai-app';
  targetId: string;
  note?: string;
  createdAt: string;
}

// Agent types
export interface AgentTask {
  id: string;
  type: 'market' | 'audience' | 'competition' | 'creative';
  input: Record<string, unknown>;
  status: 'pending' | 'running' | 'failed' | 'done';
  steps: {
    id: string;
    name: string;
    status: string;
    startedAt?: string;
    finishedAt?: string;
  }[];
  outputs: {
    key: string;
    format: 'markdown' | 'json' | 'text';
    value: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface AgentTaskPartial {
  taskId: string;
  step?: string;
  status: string;
  partial?: string;
  progress?: number;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Filter types
export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'multi' | 'daterange' | 'numberRange' | 'tags';
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export interface FilterState {
  [key: string]: any;
}

// User and auth types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'analyst' | 'basic' | 'guest';
  createdAt: string;
}

export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

// Report types
export interface ReportItem {
  type: 'ad' | 'product' | 'creator' | 'app' | 'short-drama' | 'ai-app';
  targetId: string;
}

export interface Report {
  id: string;
  userId: string;
  title: string;
  items: ReportItem[];
  template?: string;
  data: Record<string, any>;
  createdAt: string;
}

// Analytics types
export interface TrackEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

export interface UsageStats {
  totalApiCalls: number;
  totalAgentTasks: number;
  totalFavorites: number;
  totalReports: number;
  period: string;
}

// Constants
export const PLATFORMS = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Other', value: 'other' },
] as const;

export const COUNTRIES = [
  { label: '美国', value: 'US' },
  { label: '中国', value: 'CN' },
  { label: '英国', value: 'GB' },
  { label: '德国', value: 'DE' },
  { label: '法国', value: 'FR' },
  { label: '日本', value: 'JP' },
  { label: '韩国', value: 'KR' },
  { label: '澳大利亚', value: 'AU' },
  { label: '加拿大', value: 'CA' },
  { label: '印度', value: 'IN' },
] as const;

export const LANGUAGES = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
] as const;

export const VERTICALS = [
  { label: '电商', value: 'ecommerce' },
  { label: '游戏', value: 'gaming' },
  { label: '金融', value: 'finance' },
  { label: '教育', value: 'education' },
  { label: '健康', value: 'health' },
  { label: '娱乐', value: 'entertainment' },
  { label: '旅游', value: 'travel' },
  { label: '美食', value: 'food' },
  { label: '时尚', value: 'fashion' },
  { label: '科技', value: 'technology' },
] as const;