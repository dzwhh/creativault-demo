'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NormalDetailProps {
  title?: string;
  children: React.ReactNode;
}

export function NormalDetail({ title = 'Detail', children }: NormalDetailProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 复制页面信息
  const handleCopyPage = () => {
    // 这里可以实现具体的复制逻辑
    console.log('Copy page clicked');
    setIsDropdownOpen(false);
  };

  // 复制为 Markdown
  const handleCopyAsMarkdown = () => {
    // 这里可以实现复制为 Markdown 的逻辑
    console.log('Copy as Markdown clicked');
    setIsDropdownOpen(false);
  };

  // 复制为 JSON
  const handleCopyAsJson = () => {
    // 这里可以实现复制为 JSON 的逻辑
    console.log('Copy as JSON clicked');
    setIsDropdownOpen(false);
  };

  // 在 Market Agent 中打开
  const handleOpenInMarketAgent = () => {
    // 这里可以实现打开 Market Agent 的逻辑
    console.log('Open in Market Agent clicked');
    setIsDropdownOpen(false);
  };

  // 在 Creative Agent 中打开
  const handleOpenInCreativeAgent = () => {
    // 这里可以实现打开 Creative Agent 的逻辑
    console.log('Open in Creative Agent clicked');
    setIsDropdownOpen(false);
  };

  // 保存页面信息
  const handleSavePage = () => {
    // 这里可以实现具体的保存逻辑
    console.log('Save page clicked');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header 部分 */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        
        {/* 右侧复制按钮组 */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2">
            {/* Copy Page 按钮 */}
            <div className="flex">
              <button
                onClick={handleCopyPage}
                className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none flex items-center gap-1"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                  <path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                Copy page
              </button>
              
              {/* 下拉箭头按钮 */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-2 py-1.5 text-sm font-medium bg-white border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {/* Save 按钮 - 独立按钮 */}
            <button
              onClick={handleSavePage}
              className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 focus:z-10 focus:outline-none flex items-center gap-1"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path d="M3 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V6.75C15.75 6.33579 15.4142 6 15 6H3C2.58579 6 2.25 6.33579 2.25 6.75V15C2.25 15.4142 2.58579 15.75 3 15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12.75 6V3.75C12.75 3.33579 12.4142 3 12 3H6C5.58579 3 5.25 3.33579 5.25 3.75V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M9 12V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M6.75 12H11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              Save
            </button>
          </div>
          
          {/* 下拉菜单 */}
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-1 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1 px-1.5">
                {/* Copy page 选项 */}
                <button
                  onClick={handleCopyPage}
                  className="block w-full text-left px-1.5 py-1.5 text-sm text-gray-700 rounded-md hover:bg-gray-100 flex items-start gap-2"
                >
                  <div className="border border-gray-200 dark:border-white/[0.07] rounded-lg p-1.5">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0">
                      <path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="whitespace-nowrap">Copy page</div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">Copy page as Markdown for LLMs</div>
                  </div>
                </button>
                
                {/* Copy page as Json 选项 */}
                <button
                  onClick={handleCopyAsJson}
                  className="block w-full text-left px-1.5 py-1.5 text-sm text-gray-700 rounded-md hover:bg-gray-100 flex items-start gap-2"
                >
                  <div className="border border-gray-200 dark:border-white/[0.07] rounded-lg p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 14a1 1 0 0 1-1-1v-1c3.2-.4 4.13.3 4.195.7c.57.591.648 1.428.582 2.169l-.27 3.521c-.026.436.043.722.14.912c.114.212.273.365.503.476l.02.01c.252.128.587.212 1.04.212h.99a1 1 0 1 1 0 2h-.99c-.695 0-1.352-.129-1.938-.425a3.07 3.07 0 0 1-1.392-1.336l-.005-.01c-.31-.595-.407-1.27-.363-1.97v-.014l.27-3.535l.002-.016a1.8 1.8 0 0 0-.012-.533l-.018-.064a1 1 0 0 0-.097-.032A2.8 2.8 0 0 0 2.98 14z"/><path fill="currentColor" d="M2 9.88a1 1 0 0 0-1 1v1c3.2.4 4.13-.3 4.195-.699c.57-.592.648-1.428.582-2.17l-.27-3.521c-.026-.435.043-.722.14-.912c.114-.211.273-.364.503-.475l.02-.01c.252-.129.587-.212 1.04-.212h.99a1 1 0 1 0 0-2h-.99c-.695 0-1.352.128-1.938.425A3.07 3.07 0 0 0 3.88 3.642l-.005.01c-.31.595-.407 1.27-.363 1.97v.013l.27 3.536l.002.015c.024.261.01.432-.012.534l-.018.064a1 1 0 0 1-.097.031a2.8 2.8 0 0 1-.677.066zm20 0a1 1 0 0 1 1 1v1c-3.2.4-4.13-.3-4.195-.699c-.57-.592-.648-1.428-.582-2.17l.27-3.521c.026-.435-.043-.722-.14-.912a1.07 1.07 0 0 0-.503-.475l-.02-.01c-.252-.129-.587-.212-1.04-.212h-.99a1 1 0 1 1 0-2h.99c.695 0 1.352.128 1.938.425a3.07 3.07 0 0 1 1.392 1.336l.005.01c.31.595.407 1.27.363 1.97v.013l-.27 3.536l-.002.015c-.024.261-.01.432.012.534q.01.043.018.064q.028.012.097.031c.138.037.356.066.677.066z"/><path fill="currentColor" d="M22 14a1 1 0 0 0 1-1v-1c-3.2-.4-4.13.3-4.195.7c-.57.591-.648 1.428-.582 2.169l.27 3.521c.026.436-.043.722-.14.912a1.07 1.07 0 0 1-.503.476l-.02.01c-.252.128-.587.212-1.04.212h-.99a1 1 0 1 0 0 2h.99c.695 0 1.352-.129 1.938-.425a3.07 3.07 0 0 0 1.392-1.336l.005-.01c.31-.595.407-1.27.363-1.97v-.014l-.27-3.535l-.002-.016a1.8 1.8 0 0 1 .012-.533l.018-.064q.028-.013.097-.032A2.8 2.8 0 0 1 21.02 14z"/><path fill="currentColor" fill-rule="evenodd" d="M9 14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1m3 0a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1m3 0a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1" clip-rule="evenodd"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="whitespace-nowrap">Copy page as Json</div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">Copy page as Json for LLMs</div>
                  </div>
                </button>
                
                {/* Open in market agent 选项 */}
                <button
                  onClick={handleOpenInMarketAgent}
                  className="block w-full text-left px-1.5 py-1.5 text-sm text-gray-700 rounded-md hover:bg-gray-100 flex items-start gap-2"
                >
                  <div className="border border-gray-200 dark:border-white/[0.07] rounded-lg p-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-gray-600 group-hover:text-foreground"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="whitespace-nowrap">Open in Market Agent</div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">Ask questions about this page</div>
                  </div>
                </button>
                
                {/* Creative agent 选项 */}
                <button
                  onClick={handleOpenInCreativeAgent}
                  className="block w-full text-left px-1.5 py-1.5 text-sm text-gray-700 rounded-md hover:bg-gray-100 flex items-start gap-2"
                >
                  <div className="border border-gray-200 dark:border-white/[0.07] rounded-lg p-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-gray-600 group-hover:text-foreground"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="whitespace-nowrap">Open in Creative Agent</div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">Ask questions about this page</div>
                  </div>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* Context 部分 */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}