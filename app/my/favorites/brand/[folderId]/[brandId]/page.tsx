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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState<number | null>(null);

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

              {/* Category Rankings */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Top Categories</h4>
                <div className="space-y-2">
                  {[
                    { rank: 1, name: 'Running Shoes', count: 156 },
                    { rank: 2, name: 'Sports Apparel', count: 134 },
                    { rank: 3, name: 'Training Equipment', count: 98 },
                    { rank: 4, name: 'Basketball', count: 76 },
                    { rank: 5, name: 'Lifestyle', count: 80 },
                  ].map((category) => (
                    <div key={category.rank} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                          #{category.rank}
                        </span>
                        <span className="text-sm text-gray-900">{category.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{category.count} ads</span>
                    </div>
                  ))}
                </div>
              </div>
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

            {/* 3. Strategic Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Strategic Analysis</h3>
              
              {/* Analysis Content */}
              <div className="space-y-6">
                {/* Campaign Strategy */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Campaign Strategy</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nike is focusing on video-first creative strategy with 76% of campaigns using video content. Primary emphasis on running and training categories with heavy investment in TikTok platform (45% of total ads). The brand is targeting primarily male audiences aged 18-34 across major English-speaking markets.
                  </p>
                </div>

                {/* Growth Trend */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Growth Trend</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Ad spend has increased by 18% over the past 30 days, with impression growth of 24%. CPM has decreased by 8%, indicating improved ad efficiency. The brand is expanding presence on Meta platform while maintaining strong TikTok performance.
                  </p>
                </div>

                {/* Next Actions Prediction */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Next Actions Prediction</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Likely to increase investment in Google Ads platform based on current growth trajectory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Expected launch of new Basketball category campaign within next 2 weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Potential expansion to younger demographics (13-17) based on engagement patterns</span>
                    </li>
                  </ul>
                </div>

                {/* 30-Day Timeline */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-4">30-Day Campaign Timeline</h4>
                  
                  {/* Timeline */}
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
                    
                    {/* Timeline Points */}
                    <div className="relative flex justify-between">
                      {timelineData.slice(0, 15).map((day, idx) => (
                        <button
                          key={day.day}
                          onClick={() => setSelectedTimeline(selectedTimeline === idx ? null : idx)}
                          className={cn(
                            'relative group',
                            idx % 2 === 0 ? 'visible' : 'hidden md:block'
                          )}
                        >
                          <div
                            className={cn(
                              'w-2 h-2 rounded-full transition-all',
                              selectedTimeline === idx
                                ? 'bg-blue-600 scale-150'
                                : day.adsLaunched > 15
                                ? 'bg-green-500 hover:scale-125'
                                : 'bg-gray-300 hover:scale-125'
                            )}
                          />
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            {day.date}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Date Labels */}
                    <div className="flex justify-between mt-3 text-xs text-gray-400">
                      <span>30 days ago</span>
                      <span>15 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>

                  {/* Selected Day Details */}
                  {selectedTimeline !== null && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="text-sm font-semibold text-gray-900 mb-3">
                        {timelineData[selectedTimeline].date} - Campaign Activity
                      </h5>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Ads Launched</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {timelineData[selectedTimeline].adsLaunched}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Active Ads</div>
                          <div className="text-lg font-semibold text-green-600">
                            {timelineData[selectedTimeline].activeAds}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Daily Spend</div>
                          <div className="text-lg font-semibold text-gray-900">
                            ${timelineData[selectedTimeline].spend.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
