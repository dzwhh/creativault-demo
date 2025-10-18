import React from 'react';

interface WatchTutorialButtonProps {
  onClick?: () => void;
  className?: string;
}

export function WatchTutorialButton({ onClick, className = '' }: WatchTutorialButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-semibold ${className}`}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
      </svg>
      Watch Tutorial
    </button>
  );
}
