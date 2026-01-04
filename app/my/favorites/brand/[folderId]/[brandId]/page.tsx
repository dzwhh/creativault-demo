'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SearchIcon, FilterIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Ad {
  id: string;
  title: string;
  mediaUrl: string;
  platform: string;
  hasVideo: boolean;
  adsets: number;
  likes: string;
  spend: string;
  domain: string;
  publishedDate: string;
  isNew: boolean;
}

// Mock ads data
const mockAds: Ad[] = [
  {
    id: '1',
    title: 'Nike Air Max Campaign',
    mediaUrl: 'https://placehold.co/400x300/1e40af/ffffff?text=Nike+Air+Max',
    platform: 'Meta',
    hasVideo: true,
    adsets: 12,
    likes: '2.3K',
    spend: '12.5K',
    domain: 'nike.com',
    publishedDate: '2024-03-10',
    isNew: true,
  },
  {
    id: '2',
    title: 'Nike Running Collection',
    mediaUrl: 'https://placehold.co/400x300/7c3aed/ffffff?text=Nike+Running',
    platform: 'TikTok',
    hasVideo: true,
    adsets: 8,
    likes: '1.8K',
    spend: '9.2K',
    domain: 'nike.com',
    publishedDate: '2024-03-08',
    isNew: false,
  },
  {
    id: '3',
    title: 'Nike Basketball Shoes',
    mediaUrl: 'https://placehold.co/400x300/dc2626/ffffff?text=Nike+Basketball',
    platform: 'Google',
    hasVideo: false,
    adsets: 6,
    likes: '1.2K',
    spend: '7.8K',
    domain: 'nike.com',
    publishedDate: '2024-03-05',
    isNew: false,
  },
];

// Platform Icons
const PlatformIcon = ({ platform }: { platform: string }) => {
  const platformIcons: { [key: string]: JSX.Element } = {
    TikTok: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.89em" height="2em" viewBox="0 0 256 290"><path fill="#FF004F" d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53a67 67 0 0 1-13.918-1.456v37.413c-24.711 0-47.59-7.851-66.272-21.195v96.996c0 48.523-39.356 87.855-87.9 87.855c-18.113 0-34.949-5.473-48.934-14.86c15.962 16.313 38.222 26.432 62.848 26.432c48.548 0 87.905-39.332 87.905-87.857v-96.995zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898M69.673 225.607a40 40 0 0 1-8.203-24.33c0-22.192 18.001-40.186 40.21-40.186a40.3 40.3 0 0 1 12.197 1.883v-48.593c-4.61-.631-9.262-.9-13.912-.801v37.822a40.3 40.3 0 0 0-12.203-1.882c-22.208 0-40.208 17.992-40.208 40.187c0 15.694 8.997 29.281 22.119 35.9"/><path d="M175.803 92.849c18.683 13.344 41.56 21.195 66.272 21.195V76.631c-13.794-2.937-26.005-10.141-35.186-20.162c-15.715-9.802-27.038-25.972-30.358-44.898h-34.643v189.843c-.079 22.132-18.049 40.052-40.21 40.052c-13.058 0-24.66-6.221-32.007-15.86c-13.12-6.618-22.118-20.206-22.118-35.898c0-22.193 18-40.187 40.208-40.187c4.255 0 8.356.662 12.203 1.882v-37.822c-47.692.985-86.047 39.933-86.047 87.834c0 23.912 9.551 45.589 25.053 61.428c13.985 9.385 30.82 14.86 48.934 14.86c48.545 0 87.9-39.335 87.9-87.857z"/><path fill="#00F2EA" d="M242.075 76.63V66.516a66.3 66.3 0 0 1-35.186-10.047a66.47 66.47 0 0 0 35.186 20.163M176.53 11.57a68 68 0 0 1-.728-5.457V0h-47.834v189.845c-.076 22.13-18.046 40.05-40.208 40.05a40.06 40.06 0 0 1-18.09-4.287c7.347 9.637 18.949 15.857 32.007 15.857c22.16 0 40.132-17.918 40.21-40.05V11.571zM99.966 113.58v-10.769a89 89 0 0 0-12.061-.818C39.355 101.993 0 141.327 0 189.845c0 30.419 15.467 57.227 38.971 72.996c-15.502-15.838-25.053-37.516-25.053-61.427c0-47.9 38.354-86.848 86.048-87.833"/></svg>
    ),
    Meta: (
      <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2em" viewBox="0 0 256 171"><defs><linearGradient id="IconifyId199f77c0b54ae4bac2" x1="13.878%" x2="89.144%" y1="55.934%" y2="58.694%"><stop offset="0%" stop-color="#0064E1"/><stop offset="40%" stop-color="#0064E1"/><stop offset="83%" stop-color="#0073EE"/><stop offset="100%" stop-color="#0082FB"/></linearGradient><linearGradient id="IconifyId199f77c0b54ae4bac3" x1="54.315%" x2="54.315%" y1="82.782%" y2="39.307%"><stop offset="0%" stop-color="#0082FB"/><stop offset="100%" stop-color="#0064E0"/></linearGradient></defs><path fill="#0081FB" d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82c3.677 5.947 9.16 8.466 14.751 8.466c7.211 0 13.808-1.79 26.52-19.372c10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946c-5.591 9.686-16.488 19.363-34.818 19.363v-27.616c15.695 0 19.612-14.422 19.612-30.927c0-23.52-5.484-49.623-17.564-68.273c-8.574-13.23-19.684-21.313-31.907-21.313c-13.22 0-23.859 9.97-35.815 27.75c-6.356 9.445-12.882 20.956-20.208 33.944l-8.066 14.289c-16.203 28.728-20.307 35.271-28.408 46.07c-14.2 18.91-26.324 26.076-42.287 26.076c-18.935 0-30.91-8.2-38.325-20.556C2.973 139.413 0 126.202 0 111.148z"/><path fill="url(#IconifyId199f77c0b54ae4bac2)" d="M21.802 33.206C34.48 13.666 52.774 0 73.757 0C85.91 0 97.99 3.597 110.605 13.897c13.798 11.261 28.505 29.805 46.853 60.368l6.58 10.967c15.881 26.459 24.917 40.07 30.205 46.49c6.802 8.243 11.565 10.7 17.752 10.7c15.695 0 19.612-14.422 19.612-30.927l24.393-.766c0 17.253-3.4 29.93-9.187 39.946c-5.591 9.686-16.488 19.363-34.818 19.363c-11.395 0-21.49-2.475-32.654-13.007c-8.582-8.083-18.615-22.443-26.334-35.352l-22.96-38.352C118.528 64.08 107.96 49.73 101.845 43.23c-6.578-6.988-15.036-15.428-28.532-15.428c-10.923 0-20.2 7.666-27.963 19.39z"/><path fill="url(#IconifyId199f77c0b54ae4bac3)" d="M73.312 27.802c-10.923 0-20.2 7.666-27.963 19.39c-10.976 16.568-17.698 41.245-17.698 64.944c0 9.775 2.146 17.28 4.95 21.82L9.027 149.482C2.973 139.413 0 126.202 0 111.148C0 83.772 7.514 55.24 21.802 33.206C34.48 13.666 52.774 0 73.757 0z"/></svg>
    ),
    Google: (
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 128 128"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"/><path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"/></svg>
    ),
  };

  return platformIcons[platform] || (
    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
      <span className="text-xs font-semibold text-blue-600">{platform[0]}</span>
    </div>
  );
};

export default function BrandDetailPage() {
  const params = useParams();
  const router = useRouter();
  const brandId = params.brandId as string;
  const [activeTab, setActiveTab] = useState<'marketing' | 'ads'>('marketing');
  const [activePerformanceTab, setActivePerformanceTab] = useState('CPM');
  const [activeCompassTab, setActiveCompassTab] = useState<'rising' | 'falling'>('rising');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState<number | null>(null);
  
  // Trending Creatives Radar states
  const [activeRadarTab, setActiveRadarTab] = useState<'fast' | 'scaling' | 'resurrection'>('fast');
  const [selectedCreative, setSelectedCreative] = useState<typeof trendingCreatives[0] | null>(null);
  const [showInsightModal, setShowInsightModal] = useState(false);

  // Trending Creatives Data with Breakout Confidence Score
  const trendingCreatives = [
    // Fast Breakout creatives (8 items for 2 rows)
    {
      id: 'c1',
      type: 'fast' as const,
      thumbnail: 'https://picsum.photos/seed/fast1/400/300',
      caption: '"You won\'t believe how fast these sold out..."',
      badge: 'breakout',
      confidenceScore: 78,
      signals: {
        trafficStatus: { passed: true, days: 3 },
        activeAds: 12,
        formats: ['9:16', '1:1', '16:9'],
        survivorRatio: '10:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial upload with <100 impressions' },
        { day: 3, event: 'Breakout', status: 'breakout', detail: '🚀 Passed <100 threshold' },
        { day: 4, event: 'Format Split', status: 'format', detail: '📐 9:16 vertical variant detected' },
        { day: 6, event: 'Scaling', status: 'scaling', detail: '💰 5 Ad Sets duplicated' },
        { day: 7, event: 'Today', status: 'current', detail: 'Active & Growing' },
      ],
      variants: [
        { id: 'v1', thumbnail: 'https://picsum.photos/seed/var1/100/80', format: '9:16', status: 'active' },
        { id: 'v2', thumbnail: 'https://picsum.photos/seed/var2/100/80', format: '1:1', status: 'active' },
        { id: 'v3', thumbnail: 'https://picsum.photos/seed/var3/100/80', format: '16:9', status: 'active' },
      ],
      graveyard: { total: 10, failed: 9, reason: 'Did not pass <100 threshold within 7 days' },
    },
    {
      id: 'c2',
      type: 'fast' as const,
      thumbnail: 'https://picsum.photos/seed/fast2/400/300',
      caption: '"POV: Your morning routine just got upgraded..."',
      badge: 'breakout',
      confidenceScore: 72,
      signals: {
        trafficStatus: { passed: true, days: 5 },
        activeAds: 8,
        formats: ['9:16', '1:1'],
        survivorRatio: '8:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial upload' },
        { day: 5, event: 'Breakout', status: 'breakout', detail: '🚀 Traffic surge detected' },
        { day: 6, event: 'Today', status: 'current', detail: 'Active' },
      ],
      variants: [
        { id: 'v1', thumbnail: 'https://picsum.photos/seed/var3/100/80', format: '9:16', status: 'active' },
        { id: 'v2', thumbnail: 'https://picsum.photos/seed/var4/100/80', format: '1:1', status: 'active' },
      ],
      graveyard: { total: 8, failed: 7, reason: 'Low engagement in first 48h' },
    },
    {
      id: 'c3',
      type: 'fast' as const,
      thumbnail: 'https://picsum.photos/seed/fast3/400/300',
      caption: '"I tested this for 30 days and here\'s what happened..."',
      badge: 'breakout',
      confidenceScore: 68,
      signals: {
        trafficStatus: { passed: true, days: 4 },
        activeAds: 6,
        formats: ['9:16'],
        survivorRatio: '5:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial upload' },
        { day: 4, event: 'Breakout', status: 'breakout', detail: '🚀 Passed threshold' },
        { day: 5, event: 'Today', status: 'current', detail: 'Active' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/var5/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 5, failed: 4, reason: 'Audience mismatch' },
    },
    {
      id: 'c3b',
      type: 'fast' as const,
      thumbnail: 'https://picsum.photos/seed/fast4/400/300',
      caption: '"This hack changed everything for me..."',
      badge: 'breakout',
      confidenceScore: 65,
      signals: {
        trafficStatus: { passed: true, days: 6 },
        activeAds: 5,
        formats: ['9:16', '1:1'],
        survivorRatio: '6:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial upload' },
        { day: 6, event: 'Breakout', status: 'breakout', detail: '🚀 Traffic surge' },
        { day: 7, event: 'Today', status: 'current', detail: 'Active' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/var6/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 6, failed: 5, reason: 'Poor hook performance' },
    },
    {
      id: 'c3c',
      type: 'fast' as const,
      thumbnail: 'https://picsum.photos/seed/fast5/400/300',
      caption: '"Wait for it... the ending is crazy..."',
      badge: 'breakout',
      confidenceScore: 71,
      signals: {
        trafficStatus: { passed: true, days: 4 },
        activeAds: 9,
        formats: ['9:16'],
        survivorRatio: '7:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial upload' },
        { day: 4, event: 'Breakout', status: 'breakout', detail: '🚀 Viral potential' },
        { day: 5, event: 'Today', status: 'current', detail: 'Active' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/var7/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 7, failed: 6, reason: 'Weak CTA' },
    },
    {
      id: 'c3d',
      type: 'fast' as const,
      thumbnail: 'https://picsum.photos/seed/fast6/400/300',
      caption: '"Stop scrolling if you love deals..."',
      badge: 'breakout',
      confidenceScore: 69,
      signals: {
        trafficStatus: { passed: true, days: 3 },
        activeAds: 7,
        formats: ['9:16', '1:1'],
        survivorRatio: '4:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial upload' },
        { day: 3, event: 'Breakout', status: 'breakout', detail: '🚀 Strong hook' },
        { day: 4, event: 'Today', status: 'current', detail: 'Active' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/var8/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 4, failed: 3, reason: 'Audience fatigue' },
    },
    {
      id: 'c3e',
      type: 'fast' as const,
      thumbnail: 'https://picsum.photos/seed/fast7/400/300',
      caption: '"Why didn\'t anyone tell me about this sooner?"',
      badge: 'breakout',
      confidenceScore: 74,
      signals: {
        trafficStatus: { passed: true, days: 5 },
        activeAds: 11,
        formats: ['9:16', '1:1', '16:9'],
        survivorRatio: '9:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial upload' },
        { day: 5, event: 'Breakout', status: 'breakout', detail: '🚀 High engagement' },
        { day: 6, event: 'Today', status: 'current', detail: 'Active' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/var9/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 9, failed: 8, reason: 'Low retention' },
    },
    {
      id: 'c3f',
      type: 'fast' as const,
      thumbnail: 'https://picsum.photos/seed/fast8/400/300',
      caption: '"The results after just one week..."',
      badge: 'breakout',
      confidenceScore: 67,
      signals: {
        trafficStatus: { passed: true, days: 7 },
        activeAds: 4,
        formats: ['9:16'],
        survivorRatio: '3:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial upload' },
        { day: 7, event: 'Breakout', status: 'breakout', detail: '🚀 Late breakout' },
        { day: 8, event: 'Today', status: 'current', detail: 'Active' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/var10/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 3, failed: 2, reason: 'Slow start' },
    },
    // Scaling Now creatives (8 items for 2 rows)
    {
      id: 'c4',
      type: 'scaling' as const,
      thumbnail: 'https://picsum.photos/seed/scale1/400/300',
      caption: '"The secret ingredient no one talks about..."',
      badge: 'scaling',
      confidenceScore: 92,
      signals: {
        trafficStatus: { passed: true, days: 14 },
        activeAds: 28,
        formats: ['9:16', '1:1', '16:9', '4:5'],
        survivorRatio: '15:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial test' },
        { day: 3, event: 'Breakout', status: 'breakout', detail: '🚀 Early traction' },
        { day: 7, event: 'Validation', status: 'format', detail: '📐 Multi-format expansion' },
        { day: 10, event: 'Heavy Scaling', status: 'scaling', detail: '💰 28 Ad Sets active' },
        { day: 14, event: 'Today', status: 'current', detail: 'Peak Performance' },
      ],
      variants: [
        { id: 'v1', thumbnail: 'https://picsum.photos/seed/svar1/100/80', format: '9:16', status: 'active' },
        { id: 'v2', thumbnail: 'https://picsum.photos/seed/svar2/100/80', format: '1:1', status: 'active' },
        { id: 'v3', thumbnail: 'https://picsum.photos/seed/svar3/100/80', format: '16:9', status: 'active' },
        { id: 'v4', thumbnail: 'https://picsum.photos/seed/svar4/100/80', format: '4:5', status: 'active' },
      ],
      graveyard: { total: 15, failed: 14, reason: 'This creative outperformed all competitors' },
    },
    {
      id: 'c5',
      type: 'scaling' as const,
      thumbnail: 'https://picsum.photos/seed/scale2/400/300',
      caption: '"Buy 1 Get 1 FREE - Limited time only..."',
      badge: 'scaling',
      confidenceScore: 88,
      signals: {
        trafficStatus: { passed: true, days: 12 },
        activeAds: 22,
        formats: ['9:16', '1:1', '16:9'],
        survivorRatio: '12:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial test' },
        { day: 4, event: 'Breakout', status: 'breakout', detail: '🚀 Strong CTR' },
        { day: 8, event: 'Scaling', status: 'scaling', detail: '💰 Budget increase 5x' },
        { day: 12, event: 'Today', status: 'current', detail: 'Heavy Investment' },
      ],
      variants: [
        { id: 'v1', thumbnail: 'https://picsum.photos/seed/svar5/100/80', format: '9:16', status: 'active' },
        { id: 'v2', thumbnail: 'https://picsum.photos/seed/svar6/100/80', format: '1:1', status: 'active' },
        { id: 'v3', thumbnail: 'https://picsum.photos/seed/svar7/100/80', format: '16:9', status: 'active' },
      ],
      graveyard: { total: 12, failed: 11, reason: 'High CPA in comparison ads' },
    },
    {
      id: 'c5b',
      type: 'scaling' as const,
      thumbnail: 'https://picsum.photos/seed/scale3/400/300',
      caption: '"Everyone\'s asking where I got this..."',
      badge: 'scaling',
      confidenceScore: 85,
      signals: {
        trafficStatus: { passed: true, days: 10 },
        activeAds: 18,
        formats: ['9:16', '1:1'],
        survivorRatio: '10:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial test' },
        { day: 5, event: 'Breakout', status: 'breakout', detail: '🚀 Viral shares' },
        { day: 10, event: 'Today', status: 'current', detail: 'Scaling fast' },
      ],
      variants: [
        { id: 'v1', thumbnail: 'https://picsum.photos/seed/svar8/100/80', format: '9:16', status: 'active' },
        { id: 'v2', thumbnail: 'https://picsum.photos/seed/svar9/100/80', format: '1:1', status: 'active' },
      ],
      graveyard: { total: 10, failed: 9, reason: 'Outperformed competition' },
    },
    {
      id: 'c5c',
      type: 'scaling' as const,
      thumbnail: 'https://picsum.photos/seed/scale4/400/300',
      caption: '"My honest review after 6 months..."',
      badge: 'scaling',
      confidenceScore: 90,
      signals: {
        trafficStatus: { passed: true, days: 21 },
        activeAds: 35,
        formats: ['9:16', '1:1', '16:9', '4:5'],
        survivorRatio: '20:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial test' },
        { day: 7, event: 'Breakout', status: 'breakout', detail: '🚀 Strong retention' },
        { day: 21, event: 'Today', status: 'current', detail: 'Mega scaling' },
      ],
      variants: [
        { id: 'v1', thumbnail: 'https://picsum.photos/seed/svar10/100/80', format: '9:16', status: 'active' },
        { id: 'v2', thumbnail: 'https://picsum.photos/seed/svar11/100/80', format: '1:1', status: 'active' },
      ],
      graveyard: { total: 20, failed: 19, reason: 'Exceptional performance' },
    },
    {
      id: 'c5d',
      type: 'scaling' as const,
      thumbnail: 'https://picsum.photos/seed/scale5/400/300',
      caption: '"This is what $50 gets you..."',
      badge: 'scaling',
      confidenceScore: 82,
      signals: {
        trafficStatus: { passed: true, days: 9 },
        activeAds: 16,
        formats: ['9:16', '1:1'],
        survivorRatio: '8:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial test' },
        { day: 4, event: 'Breakout', status: 'breakout', detail: '🚀 Value hook worked' },
        { day: 9, event: 'Today', status: 'current', detail: 'Budget doubled' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/svar12/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 8, failed: 7, reason: 'Price point resonated' },
    },
    {
      id: 'c5e',
      type: 'scaling' as const,
      thumbnail: 'https://picsum.photos/seed/scale6/400/300',
      caption: '"Unboxing the viral product..."',
      badge: 'scaling',
      confidenceScore: 86,
      signals: {
        trafficStatus: { passed: true, days: 11 },
        activeAds: 20,
        formats: ['9:16', '1:1', '16:9'],
        survivorRatio: '11:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial test' },
        { day: 6, event: 'Breakout', status: 'breakout', detail: '🚀 ASMR appeal' },
        { day: 11, event: 'Today', status: 'current', detail: 'Heavy investment' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/svar13/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 11, failed: 10, reason: 'Unboxing format won' },
    },
    {
      id: 'c5f',
      type: 'scaling' as const,
      thumbnail: 'https://picsum.photos/seed/scale7/400/300',
      caption: '"Before and after - 30 days..."',
      badge: 'scaling',
      confidenceScore: 84,
      signals: {
        trafficStatus: { passed: true, days: 15 },
        activeAds: 25,
        formats: ['9:16', '1:1'],
        survivorRatio: '13:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial test' },
        { day: 8, event: 'Breakout', status: 'breakout', detail: '🚀 Transformation proof' },
        { day: 15, event: 'Today', status: 'current', detail: 'Scaling aggressively' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/svar14/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 13, failed: 12, reason: 'Social proof worked' },
    },
    {
      id: 'c5g',
      type: 'scaling' as const,
      thumbnail: 'https://picsum.photos/seed/scale8/400/300',
      caption: '"My kitchen transformation..."',
      badge: 'scaling',
      confidenceScore: 81,
      signals: {
        trafficStatus: { passed: true, days: 8 },
        activeAds: 14,
        formats: ['9:16'],
        survivorRatio: '7:1',
      },
      timeline: [
        { day: 1, event: 'Launched', status: 'start', detail: 'Initial test' },
        { day: 3, event: 'Breakout', status: 'breakout', detail: '🚀 Relatable content' },
        { day: 8, event: 'Today', status: 'current', detail: 'Budget tripled' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/svar15/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 7, failed: 6, reason: 'Niche resonance' },
    },
    // Resurrection creatives (8 items for 2 rows)
    {
      id: 'c6',
      type: 'resurrection' as const,
      thumbnail: 'https://picsum.photos/seed/revive1/400/300',
      caption: '"This classic trend is BACK and better than ever..."',
      badge: 'revived',
      confidenceScore: 75,
      signals: {
        trafficStatus: { passed: true, days: 45 },
        activeAds: 15,
        formats: ['9:16', '1:1'],
        survivorRatio: '1:1',
      },
      timeline: [
        { day: 1, event: 'First Run', status: 'start', detail: 'Original campaign 6 months ago' },
        { day: 30, event: 'Paused', status: 'paused', detail: '⏸️ Campaign stopped' },
        { day: 40, event: 'Revived', status: 'revived', detail: '♻️ Re-launched with new targeting' },
        { day: 45, event: 'Today', status: 'current', detail: 'Second life performing well' },
      ],
      variants: [
        { id: 'v1', thumbnail: 'https://picsum.photos/seed/rvar1/100/80', format: '9:16', status: 'active' },
        { id: 'v2', thumbnail: 'https://picsum.photos/seed/rvar2/100/80', format: '1:1', status: 'active' },
      ],
      graveyard: { total: 1, failed: 0, reason: 'Evergreen content with long lifespan' },
    },
    {
      id: 'c7',
      type: 'resurrection' as const,
      thumbnail: 'https://picsum.photos/seed/revive2/400/300',
      caption: '"Remember this viral moment? It\'s working again..."',
      badge: 'revived',
      confidenceScore: 70,
      signals: {
        trafficStatus: { passed: true, days: 60 },
        activeAds: 10,
        formats: ['9:16'],
        survivorRatio: '1:1',
      },
      timeline: [
        { day: 1, event: 'First Run', status: 'start', detail: 'Original viral campaign' },
        { day: 45, event: 'Paused', status: 'paused', detail: '⏸️ Seasonal end' },
        { day: 55, event: 'Revived', status: 'revived', detail: '♻️ Seasonal return' },
        { day: 60, event: 'Today', status: 'current', detail: 'Proven longevity' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/rvar3/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 1, failed: 0, reason: 'Seasonal content with recurring value' },
    },
    {
      id: 'c7b',
      type: 'resurrection' as const,
      thumbnail: 'https://picsum.photos/seed/revive3/400/300',
      caption: '"They said this trend was dead..."',
      badge: 'revived',
      confidenceScore: 72,
      signals: {
        trafficStatus: { passed: true, days: 90 },
        activeAds: 12,
        formats: ['9:16', '1:1'],
        survivorRatio: '1:1',
      },
      timeline: [
        { day: 1, event: 'First Run', status: 'start', detail: 'Original campaign 1 year ago' },
        { day: 60, event: 'Paused', status: 'paused', detail: '⏸️ Trend faded' },
        { day: 85, event: 'Revived', status: 'revived', detail: '♻️ Trend comeback' },
        { day: 90, event: 'Today', status: 'current', detail: 'Thriving again' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/rvar4/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 1, failed: 0, reason: 'Trend cycles' },
    },
    {
      id: 'c7c',
      type: 'resurrection' as const,
      thumbnail: 'https://picsum.photos/seed/revive4/400/300',
      caption: '"Bringing back the OG..."',
      badge: 'revived',
      confidenceScore: 68,
      signals: {
        trafficStatus: { passed: true, days: 120 },
        activeAds: 8,
        formats: ['9:16'],
        survivorRatio: '1:1',
      },
      timeline: [
        { day: 1, event: 'First Run', status: 'start', detail: 'Original 2 years ago' },
        { day: 90, event: 'Paused', status: 'paused', detail: '⏸️ Long hiatus' },
        { day: 115, event: 'Revived', status: 'revived', detail: '♻️ Nostalgia marketing' },
        { day: 120, event: 'Today', status: 'current', detail: 'Legacy content works' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/rvar5/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 1, failed: 0, reason: 'Nostalgia appeal' },
    },
    {
      id: 'c7d',
      type: 'resurrection' as const,
      thumbnail: 'https://picsum.photos/seed/revive5/400/300',
      caption: '"Still works in 2024..."',
      badge: 'revived',
      confidenceScore: 73,
      signals: {
        trafficStatus: { passed: true, days: 75 },
        activeAds: 14,
        formats: ['9:16', '1:1'],
        survivorRatio: '1:1',
      },
      timeline: [
        { day: 1, event: 'First Run', status: 'start', detail: 'Q1 campaign' },
        { day: 50, event: 'Paused', status: 'paused', detail: '⏸️ Q1 ended' },
        { day: 70, event: 'Revived', status: 'revived', detail: '♻️ Q3 relaunch' },
        { day: 75, event: 'Today', status: 'current', detail: 'Consistent performer' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/rvar6/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 1, failed: 0, reason: 'Quarterly evergreen' },
    },
    {
      id: 'c7e',
      type: 'resurrection' as const,
      thumbnail: 'https://picsum.photos/seed/revive6/400/300',
      caption: '"The comeback story..."',
      badge: 'revived',
      confidenceScore: 69,
      signals: {
        trafficStatus: { passed: true, days: 55 },
        activeAds: 9,
        formats: ['9:16'],
        survivorRatio: '1:1',
      },
      timeline: [
        { day: 1, event: 'First Run', status: 'start', detail: 'Summer campaign' },
        { day: 35, event: 'Paused', status: 'paused', detail: '⏸️ Season change' },
        { day: 50, event: 'Revived', status: 'revived', detail: '♻️ New audience' },
        { day: 55, event: 'Today', status: 'current', detail: 'New life' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/rvar7/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 1, failed: 0, reason: 'Audience refresh' },
    },
    {
      id: 'c7f',
      type: 'resurrection' as const,
      thumbnail: 'https://picsum.photos/seed/revive7/400/300',
      caption: '"Can\'t keep this one down..."',
      badge: 'revived',
      confidenceScore: 76,
      signals: {
        trafficStatus: { passed: true, days: 80 },
        activeAds: 18,
        formats: ['9:16', '1:1', '16:9'],
        survivorRatio: '1:1',
      },
      timeline: [
        { day: 1, event: 'First Run', status: 'start', detail: 'Original hit' },
        { day: 55, event: 'Paused', status: 'paused', detail: '⏸️ Budget pause' },
        { day: 75, event: 'Revived', status: 'revived', detail: '♻️ Relaunched bigger' },
        { day: 80, event: 'Today', status: 'current', detail: 'Better than ever' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/rvar8/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 1, failed: 0, reason: 'Proven resilience' },
    },
    {
      id: 'c7g',
      type: 'resurrection' as const,
      thumbnail: 'https://picsum.photos/seed/revive8/400/300',
      caption: '"Oldie but goodie..."',
      badge: 'revived',
      confidenceScore: 71,
      signals: {
        trafficStatus: { passed: true, days: 100 },
        activeAds: 11,
        formats: ['9:16'],
        survivorRatio: '1:1',
      },
      timeline: [
        { day: 1, event: 'First Run', status: 'start', detail: 'Classic creative' },
        { day: 70, event: 'Paused', status: 'paused', detail: '⏸️ Retired' },
        { day: 95, event: 'Revived', status: 'revived', detail: '♻️ Brought back by demand' },
        { day: 100, event: 'Today', status: 'current', detail: 'Fan favorite' },
      ],
      variants: [{ id: 'v1', thumbnail: 'https://picsum.photos/seed/rvar9/100/80', format: '9:16', status: 'active' }],
      graveyard: { total: 1, failed: 0, reason: 'Audience demand' },
    },
  ];

  // Mock brand data
  const brand = {
    name: 'Nike',
    logo: 'https://placehold.co/80x80/000000/FFFFFF?text=NIKE',
    industry: 'Sports & Fitness',
  };

  // Mock timeline data
  const timelineData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    date: new Date(2024, 2, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    adsLaunched: Math.floor(Math.random() * 20) + 5,
    activeAds: Math.floor(Math.random() * 50) + 20,
    spend: Math.floor(Math.random() * 5000) + 1000,
  }));

  // Filter ads based on search query
  const filteredAds = mockAds.filter((ad) =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdClick = (ad: Ad) => {
    console.log('Open ad detail:', ad);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 pb-0">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-lg" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{brand.name}</h1>
            <p className="text-sm text-gray-500">{brand.industry}</p>
          </div>
        </div>

        {/* Tabs */}
        <div>
          <nav className="flex gap-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('marketing')}
              className={cn(
                'pb-3 px-1 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'marketing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Marketing Dynamics
            </button>
            <button
              onClick={() => setActiveTab('ads')}
              className={cn(
                'pb-3 px-1 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'ads'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              Total Ads
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'marketing' ? (
          <div className="space-y-6">
            {/* 1. Overall Campaign Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Overall Campaign Information</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Platform Distribution */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Platform Distribution</h4>
                  <div className="flex items-center justify-around">
                    {[
                      { name: 'TikTok', count: 245, percentage: 45 },
                      { name: 'Meta', count: 189, percentage: 35 },
                      { name: 'Google', count: 110, percentage: 20 },
                    ].map((platform) => (
                      <div key={platform.name} className="flex flex-col items-center gap-3">
                        <PlatformIcon platform={platform.name} />
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{platform.count}</div>
                          <div className="text-xs text-gray-500">{platform.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Creative Type Distribution */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Creative Type Distribution</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Video', count: 412, percentage: 76, color: 'bg-purple-600' },
                      { name: 'Image', count: 132, percentage: 24, color: 'bg-cyan-500' },
                    ].map((type) => (
                      <div key={type.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">{type.name}</span>
                          <span className="text-sm font-medium text-gray-900">{type.count} ads ({type.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={cn(type.color, 'h-2 rounded-full')}
                            style={{ width: `${type.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trending Creatives Radar - Refactored */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-900">Trending Creatives Radar</h4>
                    <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full">AI</span>
                  </div>
                  <span className="text-xs text-gray-500">Updated 2h ago</span>
                </div>
                
                {/* Three Tabs - Breakout Forms */}
                <div className="flex gap-2 mb-4 border-b border-gray-200 pb-3">
                  <button
                    onClick={() => setActiveRadarTab('fast')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                      activeRadarTab === 'fast'
                        ? 'bg-orange-100 text-orange-700 ring-2 ring-orange-400'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    <span>🚀</span>
                    <span>Fast Breakout</span>
                  </button>
                  <button
                    onClick={() => setActiveRadarTab('scaling')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                      activeRadarTab === 'scaling'
                        ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    <span>💎</span>
                    <span>Scaling Now</span>
                  </button>
                  <button
                    onClick={() => setActiveRadarTab('resurrection')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                      activeRadarTab === 'resurrection'
                        ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-400'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    <span>🧟</span>
                    <span>Resurrection</span>
                  </button>
                </div>
                
                {/* Waterfall Cards - 4 per row, 2 rows */}
                <div className="grid grid-cols-4 gap-3">
                  {trendingCreatives
                    .filter(c => c.type === activeRadarTab)
                    .map((creative) => (
                      <div 
                        key={creative.id}
                        onClick={() => { setSelectedCreative(creative); setShowInsightModal(true); }}
                        className="relative rounded-xl overflow-hidden cursor-pointer group border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all bg-white"
                      >
                        {/* Thumbnail with hover play */}
                        <div className="relative aspect-[4/3]">
                          <img 
                            src={creative.thumbnail} 
                            alt="Creative"
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Play overlay on hover */}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow">
                              <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                              </svg>
                            </div>
                          </div>
                          
                          {/* Top-left Badge */}
                          <div className={cn(
                            'absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow',
                            creative.badge === 'breakout' && 'bg-gradient-to-r from-orange-500 to-red-500',
                            creative.badge === 'scaling' && 'bg-gradient-to-r from-emerald-500 to-teal-500',
                            creative.badge === 'revived' && 'bg-gradient-to-r from-purple-500 to-pink-500'
                          )}>
                            {creative.badge === 'breakout' && <><span>🔥</span><span>Breakout</span></>}
                            {creative.badge === 'scaling' && <><span>💰</span><span>Scaling</span></>}
                            {creative.badge === 'revived' && <><span>♻️</span><span>Revived</span></>}
                          </div>
                          
                          {/* Confidence Score - Top Right */}
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                            Score: {creative.confidenceScore}
                          </div>
                        </div>
                        
                        {/* Signal Bar */}
                        <div className="p-3 space-y-2">
                          {/* Caption */}
                          <p className="text-xs text-gray-800 font-medium line-clamp-1">{creative.caption}</p>
                          
                          {/* Signal 1: Traffic Status */}
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <span className="text-green-600">✅</span>
                            <span className="text-gray-700">Passed &lt;100 limit</span>
                            <span className="text-orange-600 font-semibold">({creative.signals.trafficStatus.days}d breakout)</span>
                          </div>
                          
                          {/* Signal 2: Active Ads */}
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <span>📊</span>
                            <span className="text-gray-700">{creative.signals.activeAds} Active Ad Sets</span>
                          </div>
                          
                          {/* Signal 3: Format Variants */}
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <span>📐</span>
                            <span className="text-gray-700">{creative.signals.formats.length} Format Variants</span>
                            <div className="flex gap-1">
                              {creative.signals.formats.map(f => (
                                <span key={f} className="px-1 py-0.5 bg-gray-100 rounded text-[9px] text-gray-600">{f}</span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Signal 4: Survivor Ratio */}
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <span>🏆</span>
                            <span className="text-gray-700">Survivor: {creative.signals.survivorRatio}</span>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-2 pt-2 border-t border-gray-100">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedCreative(creative); setShowInsightModal(true); }}
                              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-[11px] font-medium hover:bg-blue-100 transition-colors"
                            >
                              <span>🧠</span>
                              <span>AI Script Analysis</span>
                            </button>
                            <button 
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-[11px] font-medium hover:bg-gray-200 transition-colors"
                            >
                              <span>📥</span>
                              <span>Track</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Insight Modal */}
              {showInsightModal && selectedCreative && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowInsightModal(false)}>
                  <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto m-4 shadow-2xl" onClick={e => e.stopPropagation()}>
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">Data Insight</h3>
                        <span className={cn(
                          'px-2 py-0.5 text-white text-xs font-bold rounded',
                          selectedCreative.badge === 'breakout' && 'bg-orange-500',
                          selectedCreative.badge === 'scaling' && 'bg-emerald-500',
                          selectedCreative.badge === 'revived' && 'bg-purple-500'
                        )}>
                          Score: {selectedCreative.confidenceScore}
                        </span>
                      </div>
                      <button onClick={() => setShowInsightModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Modal Content */}
                    <div className="p-4 space-y-6">
                      {/* Preview */}
                      <div className="flex gap-4">
                        <img src={selectedCreative.thumbnail} alt="" className="w-40 h-28 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm text-gray-800 font-medium mb-2">{selectedCreative.caption}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">✅ Passed &lt;100 ({selectedCreative.signals.trafficStatus.days}d)</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">📊 {selectedCreative.signals.activeAds} Ad Sets</span>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">🏆 {selectedCreative.signals.survivorRatio} Survivor</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Module 1: Lifecycle Timeline */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span>📈</span> Lifecycle Timeline
                        </h4>
                        <div className="relative pl-4 border-l-2 border-gray-200 space-y-4">
                          {selectedCreative.timeline.map((event, idx) => (
                            <div key={idx} className="relative">
                              <div className={cn(
                                'absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white',
                                event.status === 'start' && 'bg-gray-400',
                                event.status === 'breakout' && 'bg-orange-500',
                                event.status === 'format' && 'bg-purple-500',
                                event.status === 'scaling' && 'bg-emerald-500',
                                event.status === 'current' && 'bg-blue-500',
                                event.status === 'paused' && 'bg-gray-500',
                                event.status === 'revived' && 'bg-pink-500'
                              )} />
                              <div className="ml-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-gray-900">Day {event.day}: {event.event}</span>
                                </div>
                                <p className="text-xs text-gray-600">{event.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Module 2: Variants */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <span>📐</span> Detected Variants ({selectedCreative.variants.length})
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">These variants are currently running, validating "multi-version concurrent" strategy.</p>
                        <div className="flex gap-3">
                          {selectedCreative.variants.map(v => (
                            <div key={v.id} className="relative">
                              <img src={v.thumbnail} alt="" className="w-20 h-16 rounded-lg object-cover border border-gray-200" />
                              <span className="absolute bottom-1 right-1 text-[9px] bg-black/60 text-white px-1 rounded">{v.format}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Module 3: Graveyard Context */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <span>⚰️</span> Graveyard Context
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          Comparison: Out of <span className="font-bold">{selectedCreative.graveyard.total}</span> creatives launched in the same batch, 
                          <span className="text-red-600 font-bold"> {selectedCreative.graveyard.failed}</span> failed to pass the &lt;100 threshold and were stopped.
                        </p>
                        <p className="text-xs text-gray-500 italic">Reason: {selectedCreative.graveyard.reason}</p>
                        <div className="mt-3 flex items-center gap-1">
                          <span className="text-xs text-gray-600">This creative is the</span>
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">SOLE SURVIVOR 🏆</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Modal Footer */}
                    <div className="flex gap-3 p-4 border-t border-gray-200">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <span>🧠</span>
                        <span>Extract Script</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                        <span>📥</span>
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Performance */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                
                {/* Filters */}
                <div className="flex items-center gap-3">
                  <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Countries</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                  <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Platforms</option>
                    <option>TikTok</option>
                    <option>Meta</option>
                    <option>Google</option>
                  </select>
                  <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All CTAs</option>
                    <option>Shop Now</option>
                    <option>Learn More</option>
                  </select>
                </div>
              </div>

              {/* Performance Tabs */}
              <div className="border-b border-gray-200 mb-4">
                <nav className="flex" aria-label="Tabs">
                  {['CPM', 'Impression', 'Spend', 'Audience'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivePerformanceTab(tab)}
                      className={cn(
                        'py-2 px-4 text-sm font-medium border-b-2 transition-colors',
                        activePerformanceTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Performance Content */}
              <div>
                {activePerformanceTab === 'Audience' ? (
                  <div>
                    <div className="mb-4">
                      <h4 className="text-base font-medium text-gray-900 mb-2">Reach by location, age and gender</h4>
                      <p className="text-sm text-gray-600">The demographic breakdown of accounts that saw these ads.</p>
                    </div>
                    
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Age Range</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Gender</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Reach</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { location: 'United States', age: '25-34', gender: 'Male', reach: '1.2M' },
                            { location: 'United States', age: '18-24', gender: 'Male', reach: '890K' },
                            { location: 'United States', age: '35-44', gender: 'Male', reach: '560K' },
                            { location: 'United Kingdom', age: '25-34', gender: 'Male', reach: '320K' },
                            { location: 'Canada', age: '18-24', gender: 'Male', reach: '280K' },
                          ].map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-3 text-sm text-gray-900">{row.location}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{row.age}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{row.gender}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{row.reach}</td>
                            </tr>
                          ))}
                          <tr className="bg-blue-50 border-t-2 border-blue-200">
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900" colSpan={3}>Total Reach</td>
                            <td className="px-4 py-3 text-sm font-semibold text-blue-600">3.25M</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">30-Day Trend</span>
                        <span className="text-lg font-semibold text-gray-900">
                          {activePerformanceTab === 'CPM' && '$3.15'}
                          {activePerformanceTab === 'Impression' && '25.8M'}
                          {activePerformanceTab === 'Spend' && '$81,450'}
                        </span>
                      </div>
                      
                      <div className="h-32 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg flex items-end justify-between px-2 py-2">
                        {Array.from({ length: 30 }, (_, i) => Math.random() * 0.8 + 0.2).map((height, index) => (
                          <div
                            key={index}
                            className="bg-blue-500 rounded-sm transition-all duration-300 hover:bg-blue-600"
                            style={{
                              height: `${height * 100}px`,
                              width: '8px',
                              opacity: 0.8
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>30d ago</span>
                        <span>15d ago</span>
                        <span>Today</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Avg {activePerformanceTab}</div>
                        <div className="text-sm font-medium text-gray-900">
                          {activePerformanceTab === 'CPM' && '$3.15'}
                          {activePerformanceTab === 'Impression' && '860K/day'}
                          {activePerformanceTab === 'Spend' && '$2.7K/day'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Peak</div>
                        <div className="text-sm font-medium text-gray-900">
                          {activePerformanceTab === 'CPM' && '$4.28'}
                          {activePerformanceTab === 'Impression' && '1.2M'}
                          {activePerformanceTab === 'Spend' && '$3.8K'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Change</div>
                        <div className="text-sm font-medium text-green-600">
                          {activePerformanceTab === 'CPM' && '-8%'}
                          {activePerformanceTab === 'Impression' && '+24%'}
                          {activePerformanceTab === 'Spend' && '+18%'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Creative Compass - COMMENTED OUT */}
            {false && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Creative Compass</h3>
              
              {/* Tab Switcher */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveCompassTab('rising')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    activeCompassTab === 'rising'
                      ? 'bg-green-100 text-green-700 border-2 border-green-400'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  )}
                >
                  <span>🔥</span>
                  <span>Rising Stars</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </button>
                <button
                  onClick={() => setActiveCompassTab('falling')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    activeCompassTab === 'falling'
                      ? 'bg-red-100 text-red-700 border-2 border-red-400'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                  )}
                >
                  <span>📉</span>
                  <span>Falling / Risky</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              
              {/* Tab Content */}
              {activeCompassTab === 'rising' ? (
                /* Rising Stars Content */
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: 1,
                      thumbnail: 'https://picsum.photos/seed/rise-card1/300/200',
                      impressions: '156K',
                      yesterdayImpressions: '<100',
                      runningDays: 3,
                      isNew: true,
                    },
                    {
                      id: 2,
                      thumbnail: 'https://picsum.photos/seed/rise-card2/300/200',
                      impressions: '89K',
                      yesterdayImpressions: '<100',
                      runningDays: 2,
                      isNew: true,
                    },
                    {
                      id: 3,
                      thumbnail: 'https://picsum.photos/seed/rise-card3/300/200',
                      impressions: '234K',
                      yesterdayImpressions: '12K',
                      runningDays: 5,
                      isNew: false,
                    },
                    {
                      id: 4,
                      thumbnail: 'https://picsum.photos/seed/rise-card4/300/200',
                      impressions: '67K',
                      yesterdayImpressions: '<100',
                      runningDays: 1,
                      isNew: true,
                    },
                    {
                      id: 5,
                      thumbnail: 'https://picsum.photos/seed/rise-card5/300/200',
                      impressions: '412K',
                      yesterdayImpressions: '45K',
                      runningDays: 7,
                      isNew: false,
                    },
                    {
                      id: 6,
                      thumbnail: 'https://picsum.photos/seed/rise-card6/300/200',
                      impressions: '128K',
                      yesterdayImpressions: '<100',
                      runningDays: 2,
                      isNew: true,
                    },
                  ].map((card) => (
                    <div 
                      key={card.id} 
                      className="relative rounded-xl overflow-hidden cursor-pointer group transition-all hover:shadow-lg"
                      style={{ border: '3px solid', borderColor: card.isNew ? '#22c55e' : '#eab308' }}
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3]">
                        <img 
                          src={card.thumbnail} 
                          alt="Rising creative"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                            </svg>
                          </div>
                        </div>
                        
                        {/* Top Right Badge - Dynamic Green Label */}
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md animate-pulse">
                          <span>🚀</span>
                          <span>Rapid Breakout ({card.runningDays}d)</span>
                        </div>
                        
                        {/* Bottom Left - Impressions Change */}
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-lg">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">{card.impressions}</span>
                            <span className="text-green-400">↑</span>
                          </div>
                          <div className="text-gray-300 text-[10px]">
                            Yesterday: <span className="text-yellow-400 font-medium">{card.yesterdayImpressions}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Falling / Risky Content */
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: 1,
                      thumbnail: 'https://picsum.photos/seed/fall-card1/300/200',
                      runningDays: 24,
                      impressions: '<100',
                    },
                    {
                      id: 2,
                      thumbnail: 'https://picsum.photos/seed/fall-card2/300/200',
                      runningDays: 18,
                      impressions: '<100',
                    },
                    {
                      id: 3,
                      thumbnail: 'https://picsum.photos/seed/fall-card3/300/200',
                      runningDays: 31,
                      impressions: '<100',
                    },
                    {
                      id: 4,
                      thumbnail: 'https://picsum.photos/seed/fall-card4/300/200',
                      runningDays: 45,
                      impressions: '<100',
                    },
                    {
                      id: 5,
                      thumbnail: 'https://picsum.photos/seed/fall-card5/300/200',
                      runningDays: 12,
                      impressions: '<100',
                    },
                    {
                      id: 6,
                      thumbnail: 'https://picsum.photos/seed/fall-card6/300/200',
                      runningDays: 28,
                      impressions: '<100',
                    },
                  ].map((card) => (
                    <div 
                      key={card.id} 
                      className="relative rounded-xl overflow-hidden cursor-pointer group transition-all hover:shadow-lg border-2 border-gray-300"
                    >
                      {/* Image with Gray Overlay */}
                      <div className="relative aspect-[4/3]">
                        <img 
                          src={card.thumbnail} 
                          alt="Failing creative"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Gray Overlay - "Dead" indicator */}
                        <div className="absolute inset-0 bg-gray-800/50"></div>
                        
                        {/* Top Right Badge - Zombie Ad Label */}
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <span>⛔</span>
                          <span>Zombie Ad ({card.runningDays}d &lt;100)</span>
                        </div>
                        
                        {/* Center Warning Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 bg-red-500/80 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Bottom Left - Status */}
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-lg">
                          <div className="flex items-center gap-1 text-red-400">
                            <span>🚨</span>
                            <span className="font-medium">No Traction</span>
                          </div>
                          <div className="text-gray-300 text-[10px]">
                            Impressions: <span className="text-red-400 font-medium">{card.impressions}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            )}

            {/* 4. Landing Pages */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Landing Pages</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Left: Links List */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Top Landing Pages</h4>
                  {[
                    { url: 'nike.com/running/air-max', visits: '45.2K', rank: 1 },
                    { url: 'nike.com/training/equipment', visits: '32.8K', rank: 2 },
                    { url: 'nike.com/basketball/lebron', visits: '28.5K', rank: 3 },
                    { url: 'nike.com/lifestyle/sportswear', visits: '21.3K', rank: 4 },
                    { url: 'nike.com/sale/clearance', visits: '18.9K', rank: 5 },
                  ].map((page) => (
                    <button
                      key={page.url}
                      className="w-full p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 group-hover:bg-blue-100 text-gray-600 group-hover:text-blue-600 text-xs font-semibold">
                          {page.rank}
                        </span>
                        <span className="text-sm font-medium text-gray-900 truncate">{page.url}</span>
                      </div>
                      <div className="flex items-center justify-between pl-8">
                        <span className="text-xs text-gray-500">{page.visits} visits</span>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right: Preview */}
                <div className="bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <p className="text-sm text-gray-500">Select a landing page to preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Total Ads Tab */
          <div>
            {/* Search Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search ads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Button variant="outline" className="flex items-center gap-2">
                  <FilterIcon size={16} />
                  More Filter
                </Button>
              </div>
            </div>

            {/* Ads Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAds.map((ad) => (
                <div
                  key={ad.id}
                  onClick={() => handleAdClick(ad)}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  {/* Image/Video Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={ad.mediaUrl}
                      alt={ad.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Play Button Overlay */}
                    {ad.hasVideo && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    {/* Top Right - Adsets Count */}
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <span>{ad.adsets} adsets</span>
                    </div>
                    
                    {/* Bottom Left - Stats */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white text-xs">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>{ad.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>$</span>
                        <span>{ad.spend}</span>
                      </div>
                    </div>
                    
                    {/* New Badge */}
                    {ad.isNew && (
                      <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>New</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">
                      {ad.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">{ad.domain}</p>
                    <p className="text-xs text-gray-500">Published on: {ad.publishedDate}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredAds.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No ads found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search query</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
