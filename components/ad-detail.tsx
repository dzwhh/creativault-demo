'use client';

import { useState, useEffect, useRef } from 'react';
import { NormalDetail } from '@/components/normal-detail';
import { FacebookIcon, InstagramIcon, ThreadsIcon } from '@/components/icons/platform-icons';
import { SaveToBrandModal } from '@/components/save-to-brand-modal';

interface AdDetailProps {
  ad: any;
  onClose: () => void;
}

export function AdDetail({ ad, onClose }: AdDetailProps) {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activePerformanceTab, setActivePerformanceTab] = useState('CPM');

  // Handle Brand Tracking Confirm
  const handleSaveToBrand = (folderId: string, folderName?: string) => {
    console.log('Adding brand to tracking:', { ad, folderId, folderName });
    alert(`Successfully added "${ad.title}" to brand tracking folder: ${folderName || 'folder'}!`);
  };

  // 获取平台图标组件
  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case 'FacebookIcon':
        return <FacebookIcon className="w-5 h-5" />;
      case 'InstagramIcon':
        return <InstagramIcon className="w-5 h-5" />;
      case 'ThreadsIcon':
        return <ThreadsIcon className="w-5 h-5" />;
      default:
        return null;
    }
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
        <NormalDetail title="Ad Details" detailType="ads">
          {/* 下方左右分栏布局 */}
          <div className="flex gap-6 h-full">
            {/* 左侧媒体区域 - 9:16 竖屏比例，置顶对齐 */}
            <div className="flex-shrink-0 w-80 flex flex-col items-center justify-start">
              {/* About the advertiser 模块 - 移动到video上方 */}
              <div className="w-full max-w-xs mb-4">
                <div className="flex items-start gap-3">
                  {/* 广告主头像 */}
                  <div className="flex-shrink-0">
                    <img 
                      src="https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-1/347597223_1204398296890416_6052718175499379768_n.jpg?stp=dst-jpg_s148x148_tt6&_nc_cat=1&ccb=1-7&_nc_sid=418b77&_nc_ohc=TE9bld0Z6NMQ7kNvwGBRdTg&_nc_oc=AdnO7pFpftapnb6XUIwgbFDntaQuCppVGkUeLVuZBmaV_k8XEJ_JKTy63eh1zrJWe_A&_nc_zt=24&_nc_ht=scontent-hkg4-2.xx&_nc_gid=UwS_OcoM-K2Z2XNx7rCs7w&oh=00_AfbXBqQ0zYdx27AuGm4svDcDR7btYHISPEvSx9XERkFi1g&oe=68DE772A"
                      alt={ad.title}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  
                  {/* 广告主信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <h5 className="text-sm font-semibold text-gray-900 truncate">{ad.title}</h5>
                      
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"/></svg>
                        <span className="truncate">1.5M followers</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="url(#IconifyId1998edee7055980a62)" rx="60"/><rect width="256" height="256" fill="url(#IconifyId1998edee7055980a63)" rx="60"/><path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"/><defs><radialGradient id="IconifyId1998edee7055980a62" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse"><stop stop-color="#FD5"/><stop offset=".1" stop-color="#FD5"/><stop offset=".5" stop-color="#FF543E"/><stop offset="1" stop-color="#C837AB"/></radialGradient><radialGradient id="IconifyId1998edee7055980a63" cx="0" cy="0" r="1" gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse"><stop stop-color="#3771C8"/><stop offset=".128" stop-color="#3771C8"/><stop offset="1" stop-color="#60F" stop-opacity="0"/></radialGradient></defs></g></svg>
                        <span className="truncate">1.8M followers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative w-full max-w-xs" style={{ aspectRatio: '9/16' }}>
                {ad.hasVideo ? (
                  <video 
                    src={ad.mediaUrl} 
                    controls 
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <img 
                    src={ad.mediaUrl} 
                    alt={ad.title} 
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                )}
                
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
              
              {/* Brand Tracking 按钮 - 与上方按钮两端对齐 */}
              <div className="mt-3 w-full max-w-xs">
                <button 
                  onClick={() => setIsBrandModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-500 hover:text-purple-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Brand Tracking
                </button>
              </div>
              
             
            </div>
            
            {/* 右侧详情区域 */}
            <div className="flex-1 flex flex-col">
              {/* 广告标题 - 移到顶部 */}
              <div className="mb-2">
                {/* 主标题 */}
                <div className="mb-1">
                  <h3 className="text-xl font-semibold text-gray-900">{ad.headline || 'Amazing Product - Limited Time Offer!'}</h3>
                </div>
                
                {/* 子标题 */}
                <div className="mb-2">
                  <p className="text-base text-gray-500">{ad.primaryText || 'Discover the incredible benefits of our product. Don\'t miss out on this exclusive deal.'}</p>
                </div>
              </div>
              
              {/* Information 信息区域 */}
              <div className="mb-6">
                {/* Information 标题 - 单独一行 */}
                <h4 className="text-lg font-medium text-gray-800 mb-3">Information</h4>
                
                {/* 信息卡片 - 带阴影 */}
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  <div className="p-4 space-y-2">
                  {/* Platform */}
                  {ad.platforms && ad.platforms.length > 0 && (
                    <>
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Platform</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {ad.platforms.map((platform: { name: string; icon: string }, index: number) => (
                            <div key={index} className="relative" title={platform.name}>
                              {getPlatformIcon(platform.icon)}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* 分割线 */}
                      <div 
                        className="divider" 
                        style={{
                          height: '1px',
                          background: '#f3f4f6',
                          margin: '8px 0 4px',
                          border: 'none'
                        }}
                      />
                    </>
                  )}
                    {/* Location */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Location</span>
                      </div>
                      <span className="text-gray-900 text-sm">🇪🇺 European Union</span>
                    </div>
                    {/* 分割线 */}
                    <div 
                      className="divider" 
                      style={{
                        height: '1px',
                        background: '#f3f4f6',
                        margin: '8px 0 4px',
                        border: 'none'
                      }}
                    />
                    {/* CTA */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M11.589 3a.75.75 0 0 0-1.5 0v1.978a.75.75 0 0 0 1.5 0zM5.983 4.945A.75.75 0 0 0 4.917 6l1.47 1.483A.75.75 0 1 0 7.452 6.43zM16.761 6a.75.75 0 0 0-1.065-1.055l-1.47 1.484a.75.75 0 1 0 1.065 1.055zM11.8 10.096c-1.025-.404-1.994.617-1.61 1.61l3.581 9.25c.41 1.058 1.901 1.059 2.311 0l1.374-3.543l3.508-1.385c1.048-.414 1.048-1.903 0-2.317zm-6.84.067H3a.75.75 0 0 0 0 1.5h1.96a.75.75 0 0 0 0-1.5m2.492 5.234a.75.75 0 0 0-1.065-1.056l-1.47 1.484a.75.75 0 1 0 1.066 1.056z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">CTA</span>
                      </div>
                      <button className="px-2.5 py-1 bg-blue-100 text-blue-800 text-sm font-normal rounded-full hover:bg-blue-200 transition-colors">
                        Shop Now
                      </button>
                    </div>
                    {/* 分割线 */}
                    <div 
                      className="divider" 
                      style={{
                        height: '1px',
                        background: '#f3f4f6',
                        margin: '8px 0 4px',
                        border: 'none'
                      }}
                    />
                    {/* Industry */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Industry</span>
                      </div>
                      <span className="text-gray-900 text-sm">App page</span>
                    </div>
                   {/* 分割线 */}
                    <div 
                      className="divider" 
                      style={{
                        height: '1px',
                        background: '#f3f4f6',
                        margin: '8px 0 4px',
                        border: 'none'
                      }}
                    />
                    {/* Shop */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Shop</span>
                      </div>
                      <a 
                        href={`https://${ad.domain}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:text-blue-800 hover:underline transition-colors"
                      >
                        {ad.domain}
                      </a>
                    </div>
                    {/* 分割线 */}
                    <div 
                      className="divider" 
                      style={{
                        height: '1px',
                        background: '#f3f4f6',
                        margin: '8px 0 4px',
                        border: 'none'
                      }}
                    />
                    {/* Language */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Language</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇫🇷</span>
                        <span className="text-gray-900 text-sm">FR</span>
                       
                      </div>
                    </div>
                    {/* 分割线 */}
                    <div 
                      className="divider" 
                      style={{
                        height: '1px',
                        background: '#f3f4f6',
                        margin: '8px 0 4px',
                        border: 'none'
                      }}
                    />
                    {/* Running for */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Running for</span>
                      </div>
                      <span className="text-gray-900 text-sm">30 days</span>
                    </div>
                    {/* 分割线 */}
                    <div 
                      className="divider" 
                      style={{
                        height: '1px',
                        background: '#f3f4f6',
                        margin: '8px 0 4px',
                        border: 'none'
                      }}
                    />
                    {/* Published on */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7h-2V2h-2v2H9V2H7v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Published on</span>
                      </div>
                      <span className="text-gray-900 text-sm">Aug 18, 2025</span>
                    </div>
                    {/* 分割线 */}
                    <div 
                      className="divider" 
                      style={{
                        height: '1px',
                        background: '#f3f4f6',
                        margin: '8px 0 4px',
                        border: 'none'
                      }}
                    />
                    {/* Description */}
                    <div className="py-1">
                      <div className="flex items-start gap-3 mb-1">
                        <svg className="w-4 h-4 text-gray-500 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        <span className="text-gray-500 font-normal">Description</span>
                      </div>
                      <div className="ml-7">
                        <div className={`text-gray-900 text-sm leading-relaxed overflow-hidden transition-all duration-200 ${
                          isDescriptionExpanded ? 'max-h-none' : 'max-h-12'
                        }`}>
                          <p>
                            {ad.primaryText || 'Discover the incredible benefits of our product. Transform your space in under 5 minutes✨ Easy to apply, remove, and reposition 💕 Don\'t miss out on this exclusive deal. Order now and save up to 50%! ✓ 100% SATISFACTION GUARANTEED for 180 days!'}
                          </p>
                        </div>
                        
                        {/* 展开/收缩按钮 */}
                        <button 
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <svg 
                            className={`w-3 h-3 transition-transform duration-200 ${
                              isDescriptionExpanded ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <span>{isDescriptionExpanded ? 'Fold' : 'Unfold'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance 模块 */}
              <div className="mb-6">
                {/* Performance 标题 */}
                <h4 className="text-lg font-medium text-gray-800 mb-3">Performance</h4>
                
                {/* Performance 卡片 */}
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  {/* Tab 切换 */}
                  <div className="border-b border-gray-200">
                    <nav className="flex" aria-label="Tabs">
                      {['CPM', 'Impression', 'Spend', 'Audience'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActivePerformanceTab(tab)}
                          className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                            activePerformanceTab === tab
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="p-4">
                    {activePerformanceTab === 'Audience' ? (
                      <div>
                        {/* 标题和描述 */}
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Reach by location, age and gender</h3>
                          <p className="text-sm text-gray-600">The demographic breakdown of Accounts Center accounts in the EU that saw this ad.</p>
                        </div>
                        
                        {/* 斑马纹表格 */}
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
                              <tr className="bg-white">
                                <td className="px-4 py-3 text-sm text-gray-900">Germany</td>
                                <td className="px-4 py-3 text-sm text-gray-900">35-44</td>
                                <td className="px-4 py-3 text-sm text-gray-900">Female</td>
                                <td className="px-4 py-3 text-sm text-gray-900">213</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">Germany</td>
                                <td className="px-4 py-3 text-sm text-gray-900">25-34</td>
                                <td className="px-4 py-3 text-sm text-gray-900">Female</td>
                                <td className="px-4 py-3 text-sm text-gray-900">436</td>
                              </tr>
                              <tr className="bg-white">
                                <td className="px-4 py-3 text-sm text-gray-900">Germany</td>
                                <td className="px-4 py-3 text-sm text-gray-900">18-24</td>
                                <td className="px-4 py-3 text-sm text-gray-900">Female</td>
                                <td className="px-4 py-3 text-sm text-gray-900">349</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">Germany</td>
                                <td className="px-4 py-3 text-sm text-gray-900">55-64</td>
                                <td className="px-4 py-3 text-sm text-gray-900">Female</td>
                                <td className="px-4 py-3 text-sm text-gray-900">7</td>
                              </tr>
                              <tr className="bg-white">
                                <td className="px-4 py-3 text-sm text-gray-900">Germany</td>
                                <td className="px-4 py-3 text-sm text-gray-900">45-54</td>
                                <td className="px-4 py-3 text-sm text-gray-900">Female</td>
                                <td className="px-4 py-3 text-sm text-gray-900">61</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">France</td>
                                <td className="px-4 py-3 text-sm text-gray-900">25-34</td>
                                <td className="px-4 py-3 text-sm text-gray-900">Female</td>
                                <td className="px-4 py-3 text-sm text-gray-900">287</td>
                              </tr>
                              <tr className="bg-white">
                                <td className="px-4 py-3 text-sm text-gray-900">France</td>
                                <td className="px-4 py-3 text-sm text-gray-900">35-44</td>
                                <td className="px-4 py-3 text-sm text-gray-900">Female</td>
                                <td className="px-4 py-3 text-sm text-gray-900">192</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">Italy</td>
                                <td className="px-4 py-3 text-sm text-gray-900">25-34</td>
                                <td className="px-4 py-3 text-sm text-gray-900">Female</td>
                                <td className="px-4 py-3 text-sm text-gray-900">156</td>
                              </tr>
                              {/* 总计行 */}
                              <tr className="bg-blue-50 border-t-2 border-blue-200">
                                <td className="px-4 py-3 text-sm font-semibold text-gray-900" colSpan={3}>Total Reach</td>
                                <td className="px-4 py-3 text-sm font-semibold text-blue-600">1,701</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">14-Day Trend</span>
                            <span className="text-lg font-semibold text-gray-900">
                              {activePerformanceTab === 'CPM' && '$2.45'}
                              {activePerformanceTab === 'Impression' && '1.2M'}
                              {activePerformanceTab === 'Spend' && '$3,450'}
                            </span>
                          </div>
                          
                          {/* 简单的趋势图示意 */}
                          <div className="h-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between px-2 py-2">
                            {/* 14天数据柱状图示意 */}
                            {[0.6, 0.8, 0.7, 0.9, 0.5, 0.8, 1.0, 0.7, 0.9, 0.6, 0.8, 0.7, 0.9, 0.8].map((height, index) => (
                              <div
                                key={index}
                                className="bg-blue-500 rounded-sm transition-all duration-300 hover:bg-blue-600"
                                style={{
                                  height: `${height * 60}px`,
                                  width: '12px',
                                  opacity: 0.8
                                }}
                              />
                            ))}
                          </div>
                          
                          {/* 日期标签 */}
                          <div className="flex justify-between mt-2 text-xs text-gray-400">
                            <span>14d ago</span>
                            <span>7d ago</span>
                            <span>Today</span>
                          </div>
                        </div>
                        
                        {/* 性能指标 */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Avg {activePerformanceTab}</div>
                            <div className="text-sm font-medium text-gray-900">
                              {activePerformanceTab === 'CPM' && '$2.45'}
                              {activePerformanceTab === 'Impression' && '86K/day'}
                              {activePerformanceTab === 'Spend' && '$246/day'}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Peak</div>
                            <div className="text-sm font-medium text-gray-900">
                              {activePerformanceTab === 'CPM' && '$3.12'}
                              {activePerformanceTab === 'Impression' && '142K'}
                              {activePerformanceTab === 'Spend' && '$387'}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Change</div>
                            <div className="text-sm font-medium text-green-600">
                              {activePerformanceTab === 'CPM' && '-12%'}
                              {activePerformanceTab === 'Impression' && '+8%'}
                              {activePerformanceTab === 'Spend' && '+15%'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Analysis 模块 */}
              <div className="mb-6">
                {/* Analysis 标题 */}
                <h4 className="text-lg font-medium text-gray-800 mb-3">Analysis</h4>
                
                {/* Analysis 卡片 */}
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  <div className="p-4 space-y-6">
                    {/* Base Info & Core Tags 部分 */}
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
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Home Decorators</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">25-45 Years</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Home Owners</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">DIY Enthusiasts</span>
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
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Video Ad</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Product Demo</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">E-commerce</span>
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
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Home Decor</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Photo Frames</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Easy Installation</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Repositionable</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Quick Transform</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 分割线 */}
                    <div className="border-t border-gray-200"></div>
                    
                    {/* Structured script content 部分 */}
                    <div>
                      <h5 className="text-md font-medium text-gray-800 mb-3">Structured Script Content</h5>
                      
                      {/* 表格展示 */}
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 w-20">Time Range</th>
                              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Script Solution</th>
                              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Visual Description</th>
                              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">Voiceover/Subtitle</th>
                              <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 w-24">BGM Mood</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-700">0-3s</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Hook - Quick transformation promise</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Close-up of hands placing photo frames on wall effortlessly</td>
                              <td className="px-3 py-3 text-sm text-gray-800">"Transform your interior in under 5 minutes✨"</td>
                              <td className="px-3 py-3 text-sm text-gray-700">Upbeat</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-700">3-8s</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Problem - Traditional installation pain points</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Split screen: drilling walls vs. easy stick application</td>
                              <td className="px-3 py-3 text-sm text-gray-800">"No more drilling, no more permanent holes"</td>
                              <td className="px-3 py-3 text-sm text-gray-700">Calm</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-700">8-15s</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Solution - Repositionable frames demo</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Time-lapse of room transformation with repositionable frames</td>
                              <td className="px-3 py-3 text-sm text-gray-800">"Easy to stick, remove, and reposition - anywhere, anytime"</td>
                              <td className="px-3 py-3 text-sm text-gray-700">Inspiring</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-700">15-18s</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Emotional appeal - Family moments</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Happy family enjoying their personalized photo wall</td>
                              <td className="px-3 py-3 text-sm text-gray-800">"Create memories that matter 💕"</td>
                              <td className="px-3 py-3 text-sm text-gray-700">Warm</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm text-gray-700">18-20s</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Call to action - Urgency creation</td>
                              <td className="px-3 py-3 text-sm text-gray-800">Product showcase with ordering interface</td>
                              <td className="px-3 py-3 text-sm text-gray-800">"Commandez le votre des aujourdhui - Order now!"</td>
                              <td className="px-3 py-3 text-sm text-gray-700">Energetic</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      {/* 总的解读 */}
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h6 className="text-sm font-semibold text-blue-800 mb-2">Overall Analysis</h6>
                        <p className="text-sm text-blue-700 leading-relaxed">
                          This 20-second video ad follows a classic problem-solution narrative structure with strong emotional hooks. 
                          The script strategically progresses from attention-grabbing transformation promise (0-3s), through pain point identification (3-8s), 
                          to solution demonstration (8-15s), emotional connection building (15-18s), and finally urgent call-to-action (18-20s). 
                          The BGM mood transitions from upbeat energy to calm explanation, then inspiring demonstration, warm emotional appeal, 
                          and energetic closing - creating a complete emotional journey that guides viewers from interest to purchase intent. 
                          The visual storytelling emphasizes ease of use and family benefits, while the bilingual CTA targets both French and English markets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Other ads from the advertiser 模块 */}
              <div className="mb-6">
                {/* 标题 */}
                <h4 className="text-lg font-medium text-gray-800 mb-3">Other ads from the advertiser</h4>
                
                {/* 视频网格 */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {/* 视频 1 */}
                  <div className="relative group cursor-pointer">
                    <video 
                      className="w-full aspect-square rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow object-cover"
                      poster="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&auto=format"
                    >
                      <source src="https://video-hkg4-1.xx.fbcdn.net/o1/v/t2/f2/m69/AQN8qJuYD5HGY9nPcW63_YbhrmFM6vo3Enqu5o_HgKbU2tF6qyHpNnblwU8uPdZWBsExKgVC8Rl5bF4q-zKcEgIN.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {/* 视频信息 */}
                    <div className="mt-2">
                      <h6 className="text-sm font-medium text-gray-900 truncate">Home Decor Transform</h6>
                      <p className="text-xs text-gray-500 truncate">www.homedecor.com</p>
                      <p className="text-xs text-gray-400 mt-1">Published on: Aug 15, 2024</p>
                    </div>
                  </div>
                  
                  {/* 视频 2 */}
                  <div className="relative group cursor-pointer">
                    <video 
                      className="w-full aspect-square rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow object-cover"
                      poster="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&auto=format"
                    >
                      <source src="https://video-hkg4-1.xx.fbcdn.net/o1/v/t2/f2/m69/AQN8qJuYD5HGY9nPcW63_YbhrmFM6vo3Enqu5o_HgKbU2tF6qyHpNnblwU8uPdZWBsExKgVC8Rl5bF4q-zKcEgIN.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {/* 视频信息 */}
                    <div className="mt-2">
                      <h6 className="text-sm font-medium text-gray-900 truncate">Minimalist Living</h6>
                      <p className="text-xs text-gray-500 truncate">www.minimalist.design</p>
                      <p className="text-xs text-gray-400 mt-1">Published on: Aug 20, 2024</p>
                    </div>
                  </div>
                  
                  {/* 视频 3 */}
                  <div className="relative group cursor-pointer">
                    <video 
                      className="w-full aspect-square rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow object-cover"
                      poster="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format"
                    >
                      <source src="https://video-hkg4-1.xx.fbcdn.net/o1/v/t2/f2/m69/AQN8qJuYD5HGY9nPcW63_YbhrmFM6vo3Enqu5o_HgKbU2tF6qyHpNnblwU8uPdZWBsExKgVC8Rl5bF4q-zKcEgIN.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {/* 视频信息 */}
                    <div className="mt-2">
                      <h6 className="text-sm font-medium text-gray-900 truncate">Photo Wall Gallery</h6>
                      <p className="text-xs text-gray-500 truncate">www.photogallery.co</p>
                      <p className="text-xs text-gray-400 mt-1">Published on: Sep 05, 2024</p>
                    </div>
                  </div>
                  
                  {/* 视频 4 */}
                  <div className="relative group cursor-pointer">
                    <video 
                      className="w-full aspect-square rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow object-cover"
                      poster="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&auto=format"
                    >
                      <source src="https://video-hkg4-1.xx.fbcdn.net/o1/v/t2/f2/m69/AQN8qJuYD5HGY9nPcW63_YbhrmFM6vo3Enqu5o_HgKbU2tF6qyHpNnblwU8uPdZWBsExKgVC8Rl5bF4q-zKcEgIN.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {/* 视频信息 */}
                    <div className="mt-2">
                      <h6 className="text-sm font-medium text-gray-900 truncate">Interior Design Pro</h6>
                      <p className="text-xs text-gray-500 truncate">www.interiorpro.net</p>
                      <p className="text-xs text-gray-400 mt-1">Published on: Sep 12, 2024</p>
                    </div>
                  </div>
                  
                  {/* 视频 5 */}
                  <div className="relative group cursor-pointer">
                    <video 
                      className="w-full aspect-square rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow object-cover"
                      poster="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop&auto=format"
                    >
                      <source src="https://video-hkg4-1.xx.fbcdn.net/o1/v/t2/f2/m69/AQN8qJuYD5HGY9nPcW63_YbhrmFM6vo3Enqu5o_HgKbU2tF6qyHpNnblwU8uPdZWBsExKgVC8Rl5bF4q-zKcEgIN.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {/* 视频信息 */}
                    <div className="mt-2">
                      <h6 className="text-sm font-medium text-gray-900 truncate">Wall Art Collection</h6>
                      <p className="text-xs text-gray-500 truncate">www.wallart.studio</p>
                      <p className="text-xs text-gray-400 mt-1">Published on: Sep 18, 2024</p>
                    </div>
                  </div>
                  
                  {/* 视频 6 */}
                  <div className="relative group cursor-pointer">
                    <video 
                      className="w-full aspect-square rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow object-cover"
                      poster="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&auto=format"
                    >
                      <source src="https://video-hkg4-1.xx.fbcdn.net/o1/v/t2/f2/m69/AQN8qJuYD5HGY9nPcW63_YbhrmFM6vo3Enqu5o_HgKbU2tF6qyHpNnblwU8uPdZWBsExKgVC8Rl5bF4q-zKcEgIN.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {/* 视频信息 */}
                    <div className="mt-2">
                      <h6 className="text-sm font-medium text-gray-900 truncate">Personal Gallery</h6>
                      <p className="text-xs text-gray-500 truncate">www.personalgallery.com</p>
                      <p className="text-xs text-gray-400 mt-1">Published on: Sep 25, 2024</p>
                    </div>
                  </div>
                </div>
                
                {/* More 跳转链接 */}
                <div className="flex justify-center mb-8">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium">More</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </NormalDetail>
      </div>

      {/* Brand Tracking Modal */}
      <SaveToBrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        onSave={handleSaveToBrand}
      />
    </>
  );
}