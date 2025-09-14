import { NextRequest, NextResponse } from 'next/server';
import { paginate } from '@/lib/utils';
import type { Ad } from '@/lib/types';

// Mock data - in a real app, this would come from a database
let mockAds: Ad[] = [];

// Initialize with some mock data if empty
if (mockAds.length === 0) {
  // This would normally be loaded from database or file
  // For now, we'll generate some basic mock data
  for (let i = 0; i < 50; i++) {
    const ad: Ad = {
      id: `ad-${i + 1}`,
      platform: ['facebook', 'tiktok', 'instagram', 'youtube', 'other'][Math.floor(Math.random() * 5)] as any,
      advertiserName: `Advertiser ${i + 1}`,
      brandLogo: `https://via.placeholder.com/64x64?text=Brand${i + 1}`,
      headline: `Amazing Product ${i + 1} - Limited Time Offer!`,
      primaryText: `Discover the incredible benefits of our product. Don't miss out on this exclusive deal.`,
      mediaType: ['image', 'video', 'carousel', 'short-drama'][Math.floor(Math.random() * 4)] as any,
      mediaUrls: [`https://images.unsplash.com/photo-150000000${i}?w=400&h=300&fit=crop`],
      cta: ['Shop Now', 'Learn More', 'Sign Up', 'Download'][Math.floor(Math.random() * 4)],
      landingPageUrl: `https://example.com/product-${i + 1}`,
      country: ['US', 'CN', 'GB', 'DE', 'FR'][Math.floor(Math.random() * 5)],
      language: ['zh', 'en', 'es', 'fr', 'de'][Math.floor(Math.random() * 5)],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      firstSeen: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastSeen: new Date().toISOString(),
      impressionsEst: Math.floor(Math.random() * 1000000),
      spendBracket: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
      engagement: {
        likes: Math.floor(Math.random() * 10000),
        comments: Math.floor(Math.random() * 1000),
        shares: Math.floor(Math.random() * 500),
      },
      predictedCTR: Math.random() * 10,
      predictedCVR: Math.random() * 5,
      vertical: ['ecommerce', 'gaming', 'finance', 'education'][Math.floor(Math.random() * 4)],
      tags: ['热门', '新品', '折扣'].slice(0, Math.floor(Math.random() * 3) + 1),
    };
    mockAds.push(ad);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const platform = searchParams.get('platform');
    const country = searchParams.get('country');
    const language = searchParams.get('language');
    const vertical = searchParams.get('vertical');
    const mediaType = searchParams.get('mediaType');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const sort = searchParams.get('sort') || 'hot';
    const search = searchParams.get('search');

    // Filter ads based on query parameters
    let filteredAds = mockAds;

    if (platform) {
      filteredAds = filteredAds.filter(ad => ad.platform === platform);
    }

    if (country) {
      filteredAds = filteredAds.filter(ad => ad.country === country);
    }

    if (language) {
      filteredAds = filteredAds.filter(ad => ad.language === language);
    }

    if (vertical) {
      filteredAds = filteredAds.filter(ad => ad.vertical === vertical);
    }

    if (mediaType) {
      filteredAds = filteredAds.filter(ad => ad.mediaType === mediaType);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredAds = filteredAds.filter(ad => 
        ad.headline?.toLowerCase().includes(searchLower) ||
        ad.primaryText?.toLowerCase().includes(searchLower) ||
        ad.advertiserName.toLowerCase().includes(searchLower)
      );
    }

    // Sort ads
    switch (sort) {
      case 'latest':
        filteredAds.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'engagement':
        filteredAds.sort((a, b) => 
          (b.engagement.likes + b.engagement.comments + b.engagement.shares) - 
          (a.engagement.likes + a.engagement.comments + a.engagement.shares)
        );
        break;
      case 'ctr':
        filteredAds.sort((a, b) => (b.predictedCTR || 0) - (a.predictedCTR || 0));
        break;
      case 'cvr':
        filteredAds.sort((a, b) => (b.predictedCVR || 0) - (a.predictedCVR || 0));
        break;
      default: // 'hot'
        filteredAds.sort((a, b) => {
          const scoreA = (a.engagement.likes * 0.5 + a.engagement.comments * 2 + a.engagement.shares * 3) * (a.predictedCTR || 1);
          const scoreB = (b.engagement.likes * 0.5 + b.engagement.comments * 2 + b.engagement.shares * 3) * (b.predictedCTR || 1);
          return scoreB - scoreA;
        });
    }

    // Paginate results
    const paginatedResult = paginate(filteredAds, page, pageSize);

    return NextResponse.json(paginatedResult);
  } catch (error) {
    console.error('Error fetching ads:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}