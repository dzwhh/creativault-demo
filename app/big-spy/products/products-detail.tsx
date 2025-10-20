'use client';

import { useState, useEffect, useRef } from 'react';
import { NormalDetail } from '@/components/normal-detail';
import { ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';
import { StarRating } from '@/components/ui/star-rating';

interface ProductDetailProps {
  product: any;
  onClose: () => void;
}

// Product Image Carousel Component
function ProductImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `product-image-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative w-full max-w-xs mx-auto" style={{ aspectRatio: '1/1' }}>
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Preview */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <img
            src={images[currentIndex]}
            alt={`Product ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const detailRef = useRef<HTMLDivElement>(null);
  const [activePerformanceTab, setActivePerformanceTab] = useState('Sales');
  const [activeSalesChannelTab, setActiveSalesChannelTab] = useState('Total Units Sold');
  const [activeVideoTab, setActiveVideoTab] = useState('promoted');
  const [videoTimeRange, setVideoTimeRange] = useState('7days');
  const [activeVOCTab, setActiveVOCTab] = useState('highlights');

  // Mock product images
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
  ];

  // Handle ESC key to close
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

  // Handle download materials
  const handleDownloadMaterials = () => {
    console.log('Downloading product materials...');
    alert('Downloading product materials package...');
  };

  // Handle export CSV
  const handleExportCSV = () => {
    console.log('Exporting to CSV...');
    alert('Exporting associated videos data to CSV...');
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40" 
        onClick={onClose}
      />
      
      {/* Detail Panel */}
      <div 
        ref={detailRef}
        className="fixed top-4 right-4 bottom-4 w-[calc(50vw+200px)] bg-white rounded-xl shadow-xl z-50 overflow-hidden"
        style={{ maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 32px)' }}
      >
        {/* NormalDetail wrapper */}
        <NormalDetail title="Product Details" detailType="products">
          {/* Top-Bottom Layout */}
          <div className="flex flex-col gap-6">
            {/* Top Section - Media and Information Side by Side */}
            <div className="flex gap-6">
              {/* Left Side - Media Area */}
              <div className="flex-shrink-0 w-80 flex flex-col items-center justify-start">
              {/* Product Image Carousel */}
              <ProductImageCarousel images={productImages} />
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 w-full max-w-xs">
                {/* View Product Button */}
                <button 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => window.open(product.productUrl || '#', '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Product
                </button>
                
                {/* Download Button */}
                <button 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={handleDownloadMaterials}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              </div>
              
              {/* Right Side - Product Title and Information */}
              <div className="flex-1 flex flex-col">
                {/* Product Title and Rating */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <StarRating rating={4.6} size="md" showValue={true} />
                </div>
                
                {/* Section 1: Information */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">Information</h4>
                  
                  <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <div className="p-4 space-y-2">
                      {/* Country/Region */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Country/Region</span>
                        </div>
                        <span className="text-gray-900 text-sm">{product.countryFlag} {product.country}</span>
                      </div>
                      <div className="divider" style={{ height: '1px', background: '#f3f4f6', margin: '8px 0 4px', border: 'none' }} />
                      
                      {/* Category */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Category</span>
                        </div>
                        <span className="text-gray-900 text-sm">{product.category}</span>
                      </div>
                      <div className="divider" style={{ height: '1px', background: '#f3f4f6', margin: '8px 0 4px', border: 'none' }} />
                      
                      {/* Publication Date */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7h-2V2h-2v2H9V2H7v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Publication Date</span>
                        </div>
                        <span className="text-gray-900 text-sm">Aug 15, 2025</span>
                      </div>
                      <div className="divider" style={{ height: '1px', background: '#f3f4f6', margin: '8px 0 4px', border: 'none' }} />
                      
                      {/* Price */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Price</span>
                        </div>
                        <span className="text-gray-900 text-sm font-semibold">{product.price}</span>
                      </div>
                      <div className="divider" style={{ height: '1px', background: '#f3f4f6', margin: '8px 0 4px', border: 'none' }} />
                      
                      {/* Brand - Hidden */}
                      {/* <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Brand</span>
                        </div>
                        <span className="text-gray-900 text-sm">{product.storeName}</span>
                      </div>
                      <div className="divider" style={{ height: '1px', background: '#f3f4f6', margin: '8px 0 4px', border: 'none' }} */}
                      
                      {/* Shop */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Shop</span>
                        </div>
                        <span className="text-gray-900 text-sm">{product.storeName}</span>
                      </div>
                      <div className="divider" style={{ height: '1px', background: '#f3f4f6', margin: '8px 0 4px', border: 'none' }} />
                      
                      {/* Fulfillment */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm1.5-9H17V12h4.46L19.5 9.5zM6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM20 8l3 4v5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V6c0-1.1.9-2 2-2h14v4h3z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Fulfillment</span>
                        </div>
                        <span className="text-gray-900 text-sm">Local Fulfillment</span>
                      </div>
                      <div className="divider" style={{ height: '1px', background: '#f3f4f6', margin: '8px 0 4px', border: 'none' }} />
                      
                      {/* Commission Rate */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                          </svg>
                          <span className="text-gray-500 font-normal">Commission Rate</span>
                        </div>
                        <span className="text-blue-600 text-sm font-semibold">{product.commission}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Section - Performance and Below (Full Width) */}
            <div className="flex flex-col">
              {/* Section 2: Performance */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Performance</h4>
                
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200">
                    <nav className="flex overflow-x-auto" aria-label="Tabs">
                      {['Sales', 'GMV', 'Price', 'Inventory', 'Video Count', 'Number of Influencers', 'SKUs'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActivePerformanceTab(tab)}
                          className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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
                  
                  {/* Tab Content */}
                  <div className="p-4">
                    {activePerformanceTab === 'SKUs' ? (
                      <div>
                        {/* SKUs Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Inventory</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sales</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">GMV</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">30-day Mini Trend</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">Standard Size</td>
                                <td className="px-4 py-3 text-sm text-gray-900">2,450</td>
                                <td className="px-4 py-3 text-sm text-gray-900">8,977</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$29K</td>
                                <td className="px-4 py-3">
                                  <svg width="100" height="30" className="text-blue-500">
                                    <polyline
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      points="0,20 20,15 40,10 60,12 80,8 100,5"
                                    />
                                  </svg>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">Large Size</td>
                                <td className="px-4 py-3 text-sm text-gray-900">1,230</td>
                                <td className="px-4 py-3 text-sm text-gray-900">4,521</td>
                                <td className="px-4 py-3 text-sm text-gray-900">$15K</td>
                                <td className="px-4 py-3">
                                  <svg width="100" height="30" className="text-blue-500">
                                    <polyline
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      points="0,25 20,22 40,18 60,20 80,15 100,10"
                                    />
                                  </svg>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* 14-Day Trend Section */}
                        <div>
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">14-Day Trend</span>
                              <span className="text-lg font-semibold text-gray-900">
                                {activePerformanceTab === 'Sales' && '8,977'}
                                {activePerformanceTab === 'GMV' && '$29K'}
                                {activePerformanceTab === 'Price' && '$2.15'}
                                {activePerformanceTab === 'Inventory' && '3,680'}
                                {activePerformanceTab === 'Video Count' && '142'}
                                {activePerformanceTab === 'Number of Influencers' && '38'}
                              </span>
                            </div>
                            
                            {/* Trend Chart */}
                            <div className="h-24 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between px-2 py-2">
                              {/* 14-day data bars */}
                              {[0.6, 0.8, 0.7, 0.9, 0.5, 0.8, 1.0, 0.7, 0.9, 0.6, 0.8, 0.7, 0.9, 0.8].map((height, index) => (
                                <div
                                  key={index}
                                  className="bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                                  style={{
                                    height: `${height * 60}px`,
                                    width: '12px',
                                    opacity: 0.8
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Date Labels */}
                            <div className="flex justify-between mt-2 text-xs text-gray-400">
                              <span>14d ago</span>
                              <span>7d ago</span>
                              <span>Today</span>
                            </div>
                          </div>
                          
                          {/* Performance Metrics */}
                          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Average</div>
                              <div className="text-sm font-medium text-gray-900">
                                {activePerformanceTab === 'Sales' && '641/day'}
                                {activePerformanceTab === 'GMV' && '$2.1K/day'}
                                {activePerformanceTab === 'Price' && '$2.15'}
                                {activePerformanceTab === 'Inventory' && '263/day'}
                                {activePerformanceTab === 'Video Count' && '10/day'}
                                {activePerformanceTab === 'Number of Influencers' && '3/day'}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Peak</div>
                              <div className="text-sm font-medium text-gray-900">
                                {activePerformanceTab === 'Sales' && '1,200'}
                                {activePerformanceTab === 'GMV' && '$3.8K'}
                                {activePerformanceTab === 'Price' && '$2.15'}
                                {activePerformanceTab === 'Inventory' && '450'}
                                {activePerformanceTab === 'Video Count' && '18'}
                                {activePerformanceTab === 'Number of Influencers' && '6'}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Change</div>
                              <div className="text-sm font-medium text-green-600">
                                {activePerformanceTab === 'Sales' && '+12.5%'}
                                {activePerformanceTab === 'GMV' && '+15.8%'}
                                {activePerformanceTab === 'Price' && '0%'}
                                {activePerformanceTab === 'Inventory' && '-8.2%'}
                                {activePerformanceTab === 'Video Count' && '+22.3%'}
                                {activePerformanceTab === 'Number of Influencers' && '+18.5%'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Section 3: Sales Channels */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-gray-800">Sales Channels</h4>
                  
                  {/* Tab Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveSalesChannelTab('Total Units Sold')}
                      className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${
                        activeSalesChannelTab === 'Total Units Sold'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Total Units Sold
                    </button>
                    <button
                      onClick={() => setActiveSalesChannelTab('Total Revenue')}
                      className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${
                        activeSalesChannelTab === 'Total Revenue'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Total Revenue
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Channel Distribution */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Channel Share of Transactions (Last 30 Days)</h5>
                    <div className="flex items-center gap-6">
                      {/* Donut Chart */}
                      <div className="flex-shrink-0">
                        <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                          {/* Background circle */}
                          <circle cx="90" cy="90" r="70" fill="none" stroke="#f3f4f6" strokeWidth="28" />
                          
                          {/* Product Card: 52% - Blue */}
                          <circle
                            cx="90"
                            cy="90"
                            r="70"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="28"
                            strokeDasharray="228.70 439.82"
                            strokeDashoffset="0"
                          />
                          
                          {/* Store-Owned Account: 35% - Cyan */}
                          <circle
                            cx="90"
                            cy="90"
                            r="70"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="28"
                            strokeDasharray="153.94 439.82"
                            strokeDashoffset="-228.70"
                          />
                          
                          {/* Influencer Sales: 13% - Green */}
                          <circle
                            cx="90"
                            cy="90"
                            r="70"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="28"
                            strokeDasharray="57.18 439.82"
                            strokeDashoffset="-382.64"
                          />
                        </svg>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm text-gray-700">Product Card</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {activeSalesChannelTab === 'Total Units Sold' ? '4,668' : '$15.2K'}
                            </span>
                            <span className="text-sm font-medium text-gray-900">52%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                            <span className="text-sm text-gray-700">Store-Owned Account</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {activeSalesChannelTab === 'Total Units Sold' ? '3,141' : '$10.2K'}
                            </span>
                            <span className="text-sm font-medium text-gray-900">35%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-700">Influencer Sales</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {activeSalesChannelTab === 'Total Units Sold' ? '1,168' : '$3.8K'}
                            </span>
                            <span className="text-sm font-medium text-gray-900">13%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transaction Method Distribution */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Distribution of Sales Methods (Last 30 Days)</h5>
                    <div className="flex items-center gap-6">
                      {/* Donut Chart */}
                      <div className="flex-shrink-0">
                        <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                          {/* Background circle */}
                          <circle cx="90" cy="90" r="70" fill="none" stroke="#f3f4f6" strokeWidth="28" />
                          
                          {/* Videos: 48% - Blue */}
                          <circle
                            cx="90"
                            cy="90"
                            r="70"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="28"
                            strokeDasharray="211.11 439.82"
                            strokeDashoffset="0"
                          />
                          
                          {/* Live: 37% - Cyan */}
                          <circle
                            cx="90"
                            cy="90"
                            r="70"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="28"
                            strokeDasharray="162.73 439.82"
                            strokeDashoffset="-211.11"
                          />
                          
                          {/* Product Card: 15% - Green */}
                          <circle
                            cx="90"
                            cy="90"
                            r="70"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="28"
                            strokeDasharray="65.97 439.82"
                            strokeDashoffset="-373.84"
                          />
                        </svg>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm text-gray-700">Videos</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {activeSalesChannelTab === 'Total Units Sold' ? '4,310' : '$14.0K'}
                            </span>
                            <span className="text-sm font-medium text-gray-900">48%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                            <span className="text-sm text-gray-700">Live</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {activeSalesChannelTab === 'Total Units Sold' ? '3,322' : '$10.8K'}
                            </span>
                            <span className="text-sm font-medium text-gray-900">37%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-700">Product Card</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {activeSalesChannelTab === 'Total Units Sold' ? '1,347' : '$4.4K'}
                            </span>
                            <span className="text-sm font-medium text-gray-900">15%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section 4: Associated Videos */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-gray-800">Associated Videos</h4>
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  {/* Filters */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      {/* Promotion Status */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveVideoTab('promoted')}
                          className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                            activeVideoTab === 'promoted'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Promoted
                        </button>
                        <button
                          onClick={() => setActiveVideoTab('not-promoted')}
                          className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                            activeVideoTab === 'not-promoted'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Not Promoted
                        </button>
                      </div>
                      
                      {/* Time Range */}
                      <div className="flex gap-2">
                        {[{ label: 'Last 7 Days', value: '7days' }, { label: 'Last 30 Days', value: '30days' }, { label: 'Last 90 Days', value: '90days' }].map((range) => (
                          <button
                            key={range.value}
                            onClick={() => setVideoTimeRange(range.value)}
                            className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                              videoTimeRange === range.value
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Table Header */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex gap-4">
                      {/* Video Thumbnail Header */}
                      <div className="flex-shrink-0 w-32">
                        <span className="text-xs font-medium text-gray-600">Video</span>
                      </div>
                      
                      {/* Video Info Headers */}
                      <div className="flex-1 grid grid-cols-8 gap-4">
                        <div className="col-span-2">
                          <span className="text-xs font-medium text-gray-600">Title</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">Sales</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">GMV</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">Views</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">Likes</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">Comments</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-600">Engagement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video List */}
                  <div className="divide-y divide-gray-200">
                    {/* Mock Video Item 1 */}
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        {/* Video Thumbnail */}
                        <div className="flex-shrink-0 w-32 h-20 bg-gray-200 rounded-md overflow-hidden relative">
                          <img
                            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=120&fit=crop"
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Video Info */}
                        <div className="flex-1 grid grid-cols-8 gap-4 items-center">
                          <div className="col-span-2">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">Amazing Product Review - Must Watch!</div>
                          </div>
                          <div className="text-sm text-gray-900">8,977</div>
                          <div className="text-sm text-gray-900">$29K</div>
                          <div className="text-sm text-gray-900">1.2M</div>
                          <div className="text-sm text-gray-900">45K</div>
                          <div className="text-sm text-gray-900">8.2K</div>
                          <div className="text-sm text-gray-900">12.5%</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mock Video Item 2 */}
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-32 h-20 bg-gray-200 rounded-md overflow-hidden relative">
                          <img
                            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=120&fit=crop"
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 grid grid-cols-8 gap-4 items-center">
                          <div className="col-span-2">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">Unboxing & First Impressions</div>
                          </div>
                          <div className="text-sm text-gray-900">5,239</div>
                          <div className="text-sm text-gray-900">$17.2K</div>
                          <div className="text-sm text-gray-900">850K</div>
                          <div className="text-sm text-gray-900">32K</div>
                          <div className="text-sm text-gray-900">5.1K</div>
                          <div className="text-sm text-gray-900">9.8%</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mock Video Item 3 */}
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-32 h-20 bg-gray-200 rounded-md overflow-hidden relative">
                          <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=120&fit=crop"
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 grid grid-cols-8 gap-4 items-center">
                          <div className="col-span-2">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">How to Use This Product - Complete Guide</div>
                          </div>
                          <div className="text-sm text-gray-900">3,456</div>
                          <div className="text-sm text-gray-900">$11.3K</div>
                          <div className="text-sm text-gray-900">680K</div>
                          <div className="text-sm text-gray-900">28K</div>
                          <div className="text-sm text-gray-900">4.2K</div>
                          <div className="text-sm text-gray-900">8.9%</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mock Video Item 4 */}
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-32 h-20 bg-gray-200 rounded-md overflow-hidden relative">
                          <img
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=120&fit=crop"
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 grid grid-cols-8 gap-4 items-center">
                          <div className="col-span-2">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">Product Comparison vs Competition</div>
                          </div>
                          <div className="text-sm text-gray-900">2,891</div>
                          <div className="text-sm text-gray-900">$9.4K</div>
                          <div className="text-sm text-gray-900">520K</div>
                          <div className="text-sm text-gray-900">22K</div>
                          <div className="text-sm text-gray-900">3.8K</div>
                          <div className="text-sm text-gray-900">7.6%</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mock Video Item 5 */}
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-32 h-20 bg-gray-200 rounded-md overflow-hidden relative">
                          <img
                            src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=120&fit=crop"
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 grid grid-cols-8 gap-4 items-center">
                          <div className="col-span-2">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">30-Day Challenge Results Revealed</div>
                          </div>
                          <div className="text-sm text-gray-900">1,823</div>
                          <div className="text-sm text-gray-900">$5.9K</div>
                          <div className="text-sm text-gray-900">385K</div>
                          <div className="text-sm text-gray-900">16K</div>
                          <div className="text-sm text-gray-900">2.4K</div>
                          <div className="text-sm text-gray-900">6.2%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section 5: VOC - Consumer Insights */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">VOC - Consumer Insights</h4>
                
                <div className="bg-white rounded-lg border border-gray-200" style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                  <div className="p-4">
                    {/* Review Analysis */}
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Review Analysis</h5>
                      
                      {/* Highlights / Pain Points Toggle */}
                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={() => setActiveVOCTab('highlights')}
                          className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                            activeVOCTab === 'highlights'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Highlights
                        </button>
                        <button
                          onClick={() => setActiveVOCTab('pain-points')}
                          className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                            activeVOCTab === 'pain-points'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Pain Points
                        </button>
                      </div>
                      
                      {/* Category Rankings */}
                      <div className="space-y-2">
                        {activeVOCTab === 'highlights' ? (
                          <>
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">Quality</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">328</span>
                                <span className="text-sm text-green-600 font-medium">45%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">Fast Delivery</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">256</span>
                                <span className="text-sm text-green-600 font-medium">35%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">Value for Money</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">145</span>
                                <span className="text-sm text-green-600 font-medium">20%</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">Packaging Issues</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">89</span>
                                <span className="text-sm text-red-600 font-medium">52%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">Size Discrepancy</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">45</span>
                                <span className="text-sm text-red-600 font-medium">28%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">Color Difference</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">32</span>
                                <span className="text-sm text-red-600 font-medium">20%</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Product Reviews */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Product Reviews</h5>
                      
                      {/* Review Filters */}
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Search reviews..."
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <select className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>All Ratings</option>
                          <option>5 Stars</option>
                          <option>4 Stars</option>
                          <option>3 Stars</option>
                          <option>2 Stars</option>
                          <option>1 Star</option>
                        </select>
                      </div>
                      
                      {/* Review List */}
                      <div className="space-y-4">
                        {/* Review Item 1 */}
                        <div className="border-b border-gray-200 pb-4 last:border-0">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-700">JD</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">John Doe</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">Aug 20, 2025</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-600">SKU: Standard Size</span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                ))}
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                Absolutely love this product! The quality exceeded my expectations and it arrived faster than expected. Highly recommend to anyone looking for a reliable product. 🎉
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Review Item 2 */}
                        <div className="border-b border-gray-200 pb-4 last:border-0">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-purple-700">SM</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">Sarah Miller</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">Aug 18, 2025</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-600">SKU: Large Size</span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[1, 2, 3, 4].map((star) => (
                                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                ))}
                                <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                Good product overall, but the packaging could be better. The item itself works great and does exactly what it promises. Would buy again! 👍
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Review Item 3 */}
                        <div className="pb-4">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-green-700">MJ</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">Mike Johnson</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">Aug 15, 2025</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-600">SKU: Standard Size</span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                ))}
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                Perfect! This is exactly what I was looking for. Great value for money and excellent customer service. Shipping was super fast too! ⭐
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NormalDetail>
      </div>
    </>
  );
}
