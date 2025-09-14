#!/usr/bin/env tsx
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { randomId } from '../lib/utils';
import type { 
  Ad, 
  Product, 
  Creator, 
  AppGaming, 
  ShortDrama, 
  AIApp,
  Favorite,
  AgentTask 
} from '../lib/types';

const PLATFORMS = ['facebook', 'tiktok', 'instagram', 'youtube', 'other'] as const;
const COUNTRIES = ['US', 'CN', 'GB', 'DE', 'FR', 'JP', 'KR', 'AU', 'CA', 'IN'];
const LANGUAGES = ['zh', 'en', 'es', 'fr', 'de', 'ja', 'ko'];
const VERTICALS = ['ecommerce', 'gaming', 'finance', 'education', 'health', 'entertainment', 'travel', 'food', 'fashion', 'technology'];
const MEDIA_TYPES = ['image', 'video', 'carousel', 'short-drama'] as const;
const SPEND_BRACKETS = ['low', 'medium', 'high'] as const;

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

// Generate mock ads
function generateAds(count: number): Ad[] {
  const ads: Ad[] = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const createdAt = randomDate(sixMonthsAgo, now);
    const firstSeen = createdAt;
    const lastSeen = randomDate(new Date(createdAt), now);
    
    const ad: Ad = {
      id: randomId(),
      platform: randomChoice(PLATFORMS),
      advertiserName: `Advertiser ${i + 1}`,
      brandLogo: `https://via.placeholder.com/64x64?text=Brand${i + 1}`,
      headline: `Amazing Product ${i + 1} - Limited Time Offer!`,
      primaryText: `Discover the incredible benefits of our product. Don't miss out on this exclusive deal. Order now and save up to 50%!`,
      mediaType: randomChoice(MEDIA_TYPES),
      mediaUrls: [
        `https://images.unsplash.com/photo-1${String(1500000000 + i).padStart(9, '0')}?w=400&h=300&fit=crop`,
        ...(Math.random() > 0.7 ? [`https://images.unsplash.com/photo-1${String(1500000001 + i).padStart(9, '0')}?w=400&h=300&fit=crop`] : [])
      ],
      cta: randomChoice(['Shop Now', 'Learn More', 'Sign Up', 'Download', 'Get Started']),
      landingPageUrl: `https://example.com/product-${i + 1}`,
      country: randomChoice(COUNTRIES),
      language: randomChoice(LANGUAGES),
      createdAt,
      firstSeen,
      lastSeen,
      impressionsEst: randomNumber(1000, 10000000),
      spendBracket: randomChoice(SPEND_BRACKETS),
      engagement: {
        likes: randomNumber(10, 50000),
        comments: randomNumber(5, 5000),
        shares: randomNumber(1, 1000),
      },
      predictedCTR: Math.random() * 10,
      predictedCVR: Math.random() * 5,
      vertical: randomChoice(VERTICALS),
      tags: ['热门', '新品', '折扣'].slice(0, randomNumber(1, 3)),
    };
    
    ads.push(ad);
  }
  
  return ads;
}

// Generate mock products
function generateProducts(count: number): Product[] {
  const products: Product[] = [];
  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Beauty', 'Books'];
  
  for (let i = 0; i < count; i++) {
    const category = randomChoice(categories);
    const product: Product = {
      id: randomId(),
      productName: `Product ${i + 1}`,
      image: `https://images.unsplash.com/photo-1${String(1500000000 + i).padStart(9, '0')}?w=300&h=300&fit=crop`,
      category,
      subCategory: `Sub ${category}`,
      sellingPriceRange: [randomNumber(10, 100), randomNumber(100, 1000)],
      supplierLinks: [`https://supplier${i + 1}.com`],
      trendingScore: Math.random() * 100,
      adCountLinked: randomNumber(1, 100),
      firstSeen: randomDate(new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), new Date()),
      lastSeen: randomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()),
      regions: [randomChoice(COUNTRIES), randomChoice(COUNTRIES)],
      platforms: [randomChoice(PLATFORMS), randomChoice(PLATFORMS)],
      tags: ['热销', '推荐', '新品'].slice(0, randomNumber(1, 3)),
    };
    
    products.push(product);
  }
  
  return products;
}

// Generate mock creators
function generateCreators(count: number): Creator[] {
  const creators: Creator[] = [];
  
  for (let i = 0; i < count; i++) {
    const creator: Creator = {
      id: randomId(),
      name: `Creator ${i + 1}`,
      avatar: `https://images.unsplash.com/photo-1${String(1500000000 + i).padStart(9, '0')}?w=150&h=150&fit=crop&crop=face`,
      followerCount: {
        tiktok: randomNumber(1000, 10000000),
        instagram: randomNumber(500, 5000000),
        youtube: randomNumber(100, 1000000),
      },
      avgEngagementRate: Math.random() * 10,
      niches: [randomChoice(VERTICALS), randomChoice(VERTICALS)],
      recentAdIds: [],
      location: randomChoice(COUNTRIES),
      contactObfuscated: `creator${i + 1}@example.com`,
    };
    
    creators.push(creator);
  }
  
  return creators;
}

// Generate mock apps
function generateApps(count: number): AppGaming[] {
  const apps: AppGaming[] = [];
  const categories = ['Games', 'Productivity', 'Social', 'Education', 'Entertainment', 'Utilities'];
  const stores = ['appstore', 'googleplay', 'other'] as const;
  const monetizations = ['hybrid', 'iap', 'ads', 'subscription'] as const;
  
  for (let i = 0; i < count; i++) {
    const app: AppGaming = {
      id: randomId(),
      appName: `App ${i + 1}`,
      iconUrl: `https://images.unsplash.com/photo-1${String(1500000000 + i).padStart(9, '0')}?w=100&h=100&fit=crop`,
      store: randomChoice(stores),
      category: randomChoice(categories),
      rankTrend: Array.from({ length: 30 }, () => randomNumber(1, 500)),
      adCount: randomNumber(1, 200),
      sdkTags: ['Analytics', 'Ads', 'Social'].slice(0, randomNumber(1, 3)),
      monetization: randomChoice(monetizations),
      countriesActive: [randomChoice(COUNTRIES), randomChoice(COUNTRIES), randomChoice(COUNTRIES)],
    };
    
    apps.push(app);
  }
  
  return apps;
}

// Generate mock short dramas
function generateShortDramas(count: number): ShortDrama[] {
  const dramas: ShortDrama[] = [];
  const genres = ['Romance', 'Comedy', 'Drama', 'Thriller', 'Fantasy', 'Action'];
  
  for (let i = 0; i < count; i++) {
    const drama: ShortDrama = {
      id: randomId(),
      title: `短剧 ${i + 1}`,
      cover: `https://images.unsplash.com/photo-1${String(1500000000 + i).padStart(9, '0')}?w=300&h=400&fit=crop`,
      episodesCount: randomNumber(5, 50),
      platform: randomChoice(PLATFORMS),
      genre: randomChoice(genres),
      playVolumeEst: randomNumber(10000, 10000000),
      adIntegrations: ['preroll', 'midroll'].slice(0, randomNumber(1, 2)),
      releasePace: randomChoice(['daily', 'weekly', 'completed']),
      audienceProfileSummary: `主要观众为${randomNumber(18, 45)}岁用户`,
    };
    
    dramas.push(drama);
  }
  
  return dramas;
}

// Generate mock AI apps
function generateAIApps(count: number): AIApp[] {
  const aiApps: AIApp[] = [];
  const categories = ['Image Generation', 'Text Processing', 'Voice Assistant', 'Data Analysis', 'Code Assistant', 'Creative Tools'];
  
  for (let i = 0; i < count; i++) {
    const aiApp: AIApp = {
      id: randomId(),
      appName: `AI App ${i + 1}`,
      category: randomChoice(categories),
      pricingModel: randomChoice(['freemium', 'subscription', 'one-time', 'usage-based']),
      userGrowthEst: Array.from({ length: 12 }, () => randomNumber(1000, 100000)),
      website: `https://aiapp${i + 1}.com`,
      trafficSources: ['organic', 'paid', 'social'].slice(0, randomNumber(1, 3)),
      relatedAdIds: [],
      differentiators: ['Fast', 'Accurate', 'User-friendly'].slice(0, randomNumber(1, 3)),
    };
    
    aiApps.push(aiApp);
  }
  
  return aiApps;
}

// Main generation function
function generateMockData() {
  console.log('🚀 Generating mock data...');
  
  // Create public/mock directory if it doesn't exist
  const mockDir = join(process.cwd(), 'public', 'mock');
  try {
    mkdirSync(mockDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  // Generate data
  const ads = generateAds(200);
  const products = generateProducts(100);
  const creators = generateCreators(50);
  const apps = generateApps(80);
  const dramas = generateShortDramas(60);
  const aiApps = generateAIApps(40);
  
  // Write to files
  writeFileSync(join(mockDir, 'ads.json'), JSON.stringify(ads, null, 2));
  writeFileSync(join(mockDir, 'products.json'), JSON.stringify(products, null, 2));
  writeFileSync(join(mockDir, 'creators.json'), JSON.stringify(creators, null, 2));
  writeFileSync(join(mockDir, 'apps.json'), JSON.stringify(apps, null, 2));
  writeFileSync(join(mockDir, 'short-dramas.json'), JSON.stringify(dramas, null, 2));
  writeFileSync(join(mockDir, 'ai-apps.json'), JSON.stringify(aiApps, null, 2));
  
  // Generate some sample favorites
  const favorites: Favorite[] = [
    {
      id: randomId(),
      userId: 'user1',
      targetType: 'ad',
      targetId: ads[0].id,
      note: '很有创意的广告',
      createdAt: new Date().toISOString(),
    },
    {
      id: randomId(),
      userId: 'user1',
      targetType: 'product',
      targetId: products[0].id,
      createdAt: new Date().toISOString(),
    },
  ];
  
  writeFileSync(join(mockDir, 'favorites.json'), JSON.stringify(favorites, null, 2));
  
  console.log('✅ Mock data generated successfully!');
  console.log(`📊 Generated:`);
  console.log(`  - ${ads.length} ads`);
  console.log(`  - ${products.length} products`);
  console.log(`  - ${creators.length} creators`);
  console.log(`  - ${apps.length} apps`);
  console.log(`  - ${dramas.length} short dramas`);
  console.log(`  - ${aiApps.length} AI apps`);
  console.log(`  - ${favorites.length} favorites`);
}

// Run if this file is executed directly
if (require.main === module) {
  generateMockData();
}

export { generateMockData };