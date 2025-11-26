import React from 'react';
import { InstagramIcon, YoutubeIcon } from '@/components/icons';

interface EmptyStateUploadProps {
  title?: string;
  description?: string;
  onFileSelect?: (file: File) => void;
  maxFileSize?: string;
  acceptedFormats?: string;
}

export function EmptyStateUpload({
  title = 'No Influencers Found',
  description = 'Upload a CSV file with influencer information to get started',
  onFileSelect,
  maxFileSize = '5MB',
  acceptedFormats = 'CSV',
}: EmptyStateUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 mb-6">{description}</p>
        </div>

        {/* Upload Template Guide */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">CSV Template Format</h4>
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 bg-gray-100 border-b border-gray-200">
              <div className="px-4 py-2 text-xs font-semibold text-gray-700 border-r border-gray-200">Platform</div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-700">Username</div>
            </div>
            {/* Table Rows */}
            <div className="grid grid-cols-2 border-b border-gray-200">
              <div className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200 flex items-center gap-2">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
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

        {/* Upload Button */}
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
              onChange={handleFileChange}
            />
          </label>
          <p className="text-xs text-gray-500 mt-3">Supported format: {acceptedFormats} (Max {maxFileSize})</p>
        </div>
      </div>
    </div>
  );
}
