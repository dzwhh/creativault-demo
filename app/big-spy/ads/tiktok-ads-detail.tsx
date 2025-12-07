'use client';

import { useState, useEffect, useRef } from 'react';
import { NormalDetail } from '@/components/normal-detail';
import { SaveToBrandModal } from '@/components/save-to-brand-modal';

interface TikTokAd {
  id: string;
  videoUrl: string;
  videoPoster: string;
  adCaption: string;
  objective: string;
  region: string;
  likes: number;
  ctr: number;
  budget: number;
  industry?: string;
  brandName?: string;
  landingPage?: string;
  comments?: number;
  shares?: number;
}

interface TikTokAdsDetailProps {
  ad: TikTokAd;
  onClose: () => void;
}

export function TikTokAdsDetail({ ad, onClose }: TikTokAdsDetailProps) {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const [isAdCaptionExpanded, setIsAdCaptionExpanded] = useState(false);
  const [activeTimeTab, setActiveTimeTab] = useState('CTR');

  // Handle Advertiser Tracking Confirm
  const handleSaveToBrand = (folderId: string, folderName?: string) => {
    console.log('Adding brand to tracking:', { ad, folderId, folderName });
    alert(`Successfully added advertiser to tracking folder: ${folderName || 'folder'}!`);
  };

  // 按ESC键关闭详情面板
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // Mock data for time analysis chart (seconds-based)
  const timeAnalysisData = {
    CTR: [2.1, 2.8, 3.5, 4.2, 5.1, 4.8, 5.2, 6.1, 5.9, 5.5, 5.8, 6.2, 5.7, 6.0, 5.4],
    CVR: [0.8, 1.2, 1.5, 1.8, 2.2, 2.1, 2.4, 2.8, 2.6, 2.5, 2.7, 2.9, 2.5, 2.8, 2.4],
    Clicks: [120, 180, 250, 320, 410, 380, 420, 510, 490, 460, 480, 530, 470, 500, 450],
    Conversion: [15, 22, 30, 38, 48, 45, 52, 62, 58, 55, 58, 65, 56, 60, 54],
    Remain: [95, 88, 82, 75, 68, 62, 56, 50, 45, 40, 36, 32, 28, 25, 22],
  };

  // Recommended videos data
  const recommendedVideos = [
    { id: '1', title: 'Summer Fashion Trends', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
    { id: '2', title: 'Beauty & Skincare Tips', thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop' },
    { id: '3', title: 'Tech Gadgets Review', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop' },
    { id: '4', title: 'Home Decor Ideas', thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
    { id: '5', title: 'Fitness Motivation', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop' },
    { id: '6', title: 'Food & Cooking', thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop' },
  ];

  return (
    <>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40" 
        onClick={onClose}
      />
      
      {/* 详情页面 */}
      <div 
        ref={detailRef}
        className="fixed top-4 right-4 bottom-4 w-[calc(50vw+200px)] bg-white rounded-xl shadow-xl z-50 overflow-hidden"
        style={{ maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 32px)' }}
      >
        
        {/* NormalDetail 组件包装，保持顶部标题栏 */}
        <NormalDetail title="TikTok Ad Details" detailType="ads">
          {/* 下方左右分栏布局 */}
          <div className="flex gap-6 h-full">
            {/* 左侧媒体区域 - 9:16 竖屏比例 */}
            <div className="flex-shrink-0 w-80 flex flex-col items-center justify-start">
              {/* 视频区域 - 直接显示视频，无广告主信息 */}
              <div className="relative w-full max-w-xs" style={{ aspectRatio: '9/16' }}>
                <video 
                  src={ad.videoUrl || 'https://video-hkg4-1.xx.fbcdn.net/o1/v/t2/f2/m69/AQN8qJuYD5HGY9nPcW63_YbhrmFM6vo3Enqu5o_HgKbU2tF6qyHpNnblwU8uPdZWBsExKgVC8Rl5bF4q-zKcEgIN.mp4'} 
                  poster={ad.videoPoster}
                  controls 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
                
                {/* Active 状态指示器 - 右上角 */}
                <div className="absolute top-2 right-2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-xs font-medium text-green-500">Active</span>
                </div>
              </div>
              
              {/* 操作按钮组 */}
              <div className="flex gap-3 mt-4 w-full max-w-xs">
                {/* View Ad 按钮 */}
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Ad
                </button>
                
                {/* Download 按钮 */}
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
              </div>
              
              {/* Advertiser Tracking 按钮 */}
              <div className="mt-3 w-full max-w-xs">
                <button 
                  onClick={() => setIsBrandModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-500 hover:text-purple-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Advertiser Tracking
                </button>
              </div>
            </div>
            
            {/* 右侧详情区域 */}
            <div className="flex-1 flex flex-col overflow-y-auto pr-2">
              {/* Information 区域 */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Information</h4>
                
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  <div className="p-4 space-y-2">
                    {/* Region */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Region</span>
                      </div>
                      <span className="text-gray-900 text-sm">{ad.region || 'United States'}</span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    
                    {/* Industry */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Industry</span>
                      </div>
                      <span className="text-gray-900 text-sm">{ad.industry || 'E-commerce'}</span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    
                    {/* Objective */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Objective</span>
                      </div>
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-sm font-normal rounded-full">{ad.objective || 'Conversions'}</span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    
                    {/* Brand Name */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Brand Name</span>
                      </div>
                      <span className="text-gray-900 text-sm">{ad.brandName || 'TechBrand Pro'}</span>
                    </div>
                    <div className="h-px bg-gray-100" />
                    
                    {/* Landing Page */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Landing Page</span>
                      </div>
                      <a 
                        href={ad.landingPage || 'https://example.com'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors truncate max-w-[200px]"
                      >
                        {ad.landingPage || 'example.com/shop'}
                      </a>
                    </div>
                    <div className="h-px bg-gray-100" />
                    
                    {/* Ad Caption */}
                    <div className="py-1">
                      <div className="flex items-start gap-3 mb-1">
                        <svg className="w-4 h-4 text-gray-500 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Ad Caption</span>
                      </div>
                      <div className="ml-7">
                        <div className={`text-gray-900 text-sm leading-relaxed overflow-hidden transition-all duration-200 ${
                          isAdCaptionExpanded ? 'max-h-none' : 'max-h-12'
                        }`}>
                          <p>{ad.adCaption}</p>
                        </div>
                        
                        <button 
                          onClick={() => setIsAdCaptionExpanded(!isAdCaptionExpanded)}
                          className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <svg 
                            className={`w-3 h-3 transition-transform duration-200 ${isAdCaptionExpanded ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <span>{isAdCaptionExpanded ? 'Fold' : 'Unfold'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance 模块 */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Performance</h4>
                
                <div className="grid grid-cols-5 gap-4">
                  {/* Likes */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 text-center" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="text-xs text-gray-500">Likes</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {ad.likes >= 1000 ? `${(ad.likes / 1000).toFixed(1)}K` : ad.likes}
                    </div>
                  </div>
                  
                  {/* Comments */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 text-center" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                      </svg>
                      <span className="text-xs text-gray-500">Comments</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {(ad.comments || 856) >= 1000 ? `${((ad.comments || 856) / 1000).toFixed(1)}K` : (ad.comments || 856)}
                    </div>
                  </div>
                  
                  {/* Shares */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 text-center" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                      </svg>
                      <span className="text-xs text-gray-500">Shares</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {(ad.shares || 1250) >= 1000 ? `${((ad.shares || 1250) / 1000).toFixed(1)}K` : (ad.shares || 1250)}
                    </div>
                  </div>
                  
                  {/* CTR */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 text-center" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                      </svg>
                      <span className="text-xs text-gray-500">CTR</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{ad.ctr.toFixed(1)}%</div>
                  </div>
                  
                  {/* Budget */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 text-center" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                      </svg>
                      <span className="text-xs text-gray-500">Budget</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      ${ad.budget >= 1000 ? `${(ad.budget / 1000).toFixed(1)}K` : ad.budget}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Interactive Time Analysis 模块 */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Interactive Time Analysis</h4>
                
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  {/* Tab 切换 */}
                  <div className="border-b border-gray-200">
                    <nav className="flex" aria-label="Tabs">
                      {['CTR', 'CVR', 'Clicks', 'Conversion', 'Remain'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTimeTab(tab)}
                          className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                            activeTimeTab === tab
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>
                  
                  {/* 趋势图内容 */}
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Video Timeline (seconds)</span>
                        <span className="text-lg font-semibold text-gray-900">
                          {activeTimeTab === 'CTR' && '5.2%'}
                          {activeTimeTab === 'CVR' && '2.4%'}
                          {activeTimeTab === 'Clicks' && '420'}
                          {activeTimeTab === 'Conversion' && '52'}
                          {activeTimeTab === 'Remain' && '28%'}
                        </span>
                      </div>
                      
                      {/* 趋势图 */}
                      <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between px-2 py-2 relative">
                        {timeAnalysisData[activeTimeTab as keyof typeof timeAnalysisData].map((value, index) => {
                          const maxValue = Math.max(...timeAnalysisData[activeTimeTab as keyof typeof timeAnalysisData]);
                          const height = (value / maxValue) * 100;
                          return (
                            <div
                              key={index}
                              className="bg-blue-500 rounded-sm transition-all duration-300 hover:bg-blue-600 relative group"
                              style={{
                                height: `${height}%`,
                                width: '16px',
                                opacity: 0.8
                              }}
                            >
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {value}{activeTimeTab === 'CTR' || activeTimeTab === 'CVR' || activeTimeTab === 'Remain' ? '%' : ''}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* 秒级时间标签 */}
                      <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>0s</span>
                        <span>5s</span>
                        <span>10s</span>
                        <span>15s</span>
                      </div>
                    </div>
                    
                    {/* 性能指标 */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Peak Time</div>
                        <div className="text-sm font-medium text-gray-900">8s</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Avg {activeTimeTab}</div>
                        <div className="text-sm font-medium text-gray-900">
                          {activeTimeTab === 'CTR' && '4.8%'}
                          {activeTimeTab === 'CVR' && '2.1%'}
                          {activeTimeTab === 'Clicks' && '350'}
                          {activeTimeTab === 'Conversion' && '45'}
                          {activeTimeTab === 'Remain' && '52%'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Drop-off Point</div>
                        <div className="text-sm font-medium text-red-600">12s</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Understanding 模块 (视频理解) */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Video Understanding</h4>
                
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  <div className="p-4 space-y-6">
                    {/* Base Info & Core Tags */}
                    <div>
                      <h5 className="text-md font-medium text-gray-800 mb-3">Base Info & Core Tags</h5>
                      
                      {/* Target Audience */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1z"/>
                          </svg>
                          <span className="text-sm font-medium text-gray-700">Target Audience</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Gen Z</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">18-25 Years</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Tech Enthusiasts</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Online Shoppers</span>
                        </div>
                      </div>
                      
                      {/* Ad Type */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                          </svg>
                          <span className="text-sm font-medium text-gray-700">Ad Type</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Short Video</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Product Showcase</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">UGC Style</span>
                        </div>
                      </div>
                      
                      {/* Key Topics */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7.01 5 5 7.01 5 9.5S7.01 14 9.5 14 14 11.99 14 9.5 11.99 5 9.5 5Z"/>
                          </svg>
                          <span className="text-sm font-medium text-gray-700">Key Topics</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Trending Sound</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Quick Cuts</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Hook in 3s</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">CTA Overlay</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200"></div>
                    
                    {/* Overall Analysis */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h6 className="text-sm font-semibold text-blue-800 mb-2">Overall Analysis</h6>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        This TikTok ad leverages trending audio and fast-paced editing to capture Gen Z attention within the first 3 seconds. 
                        The UGC-style presentation builds authenticity and trust, while strategic text overlays reinforce key product benefits. 
                        The video maintains high engagement through quick cuts and transitions, with a clear CTA appearing at the 12-second mark. 
                        Performance data suggests the hook is effective, but there&apos;s a notable drop-off after 12s, indicating potential for optimization in the middle section.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recommended for you 模块 */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Recommended for you</h4>
                
                <div className="grid grid-cols-3 gap-4">
                  {recommendedVideos.map((video) => (
                    <div key={video.id} className="relative group cursor-pointer">
                      <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h6 className="text-sm font-medium text-gray-900 truncate">{video.title}</h6>
                        <p className="text-xs text-gray-500">Similar ad content</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* More 按钮 */}
                <div className="flex justify-center mt-4">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium">More Recommendations</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </NormalDetail>
      </div>

      {/* Advertiser Tracking Modal */}
      <SaveToBrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        onSave={handleSaveToBrand}
      />
    </>
  );
}
