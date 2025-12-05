'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// 定义侧边栏菜单结构（与sidebar.tsx保持一致）
interface MenuItem {
  id: string;
  label: string;
  section: string;
}

const menuItems: MenuItem[] = [
  // 第一组：无标签
  { id: 'home', label: 'Home', section: 'main' },
  { id: 'market-insight', label: 'Market Insight', section: 'main' },
  
  // Growth Opportunity
  { id: 'ads', label: 'Ads', section: 'Growth Opportunity' },
  { id: 'products', label: 'Products', section: 'Growth Opportunity' },
  { id: 'creators', label: 'Creators', section: 'Growth Opportunity' },
  { id: 'app-gaming', label: 'App&Gaming', section: 'Growth Opportunity' },
  { id: 'drama', label: 'Drama', section: 'Growth Opportunity' },
  { id: 'ai-products', label: 'AI Products', section: 'Growth Opportunity' },
  
  // Marketing Agent
  { id: 'market-analysis', label: 'Market Analysis', section: 'Marketing Agent' },
  { id: 'competitive-analysis', label: 'Competitive Analysis', section: 'Marketing Agent' },
  { id: 'creative-analysis', label: 'Creative Analysis', section: 'Marketing Agent' },
  
  // Tools
  { id: 'magic-search', label: 'Magic Search', section: 'Tools' },
  { id: 'creative-clips', label: 'Creative Clips', section: 'Tools' },
  { id: 'one-collect', label: 'One Collect', section: 'Tools' },
  { id: 'ai-toolkit', label: 'AI Toolkit', section: 'Tools' },
  
  // Community
  { id: 'academy', label: 'Academy', section: 'Community' },
  { id: 'blog', label: 'Blog', section: 'Community' },
  
  // My Page
  { id: 'favorites', label: 'Favorites', section: 'My Page' },
  { id: 'asset-studio', label: 'Asset Studio', section: 'My Page' },
];

// 按section分组
const groupedMenuItems = menuItems.reduce((acc, item) => {
  if (!acc[item.section]) {
    acc[item.section] = [];
  }
  acc[item.section].push(item);
  return acc;
}, {} as Record<string, MenuItem[]>);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'sidebar' | 'permissions'>('sidebar');
  const [visibleMenuItems, setVisibleMenuItems] = useState<Set<string>>(new Set());

  // 初始化：从localStorage加载或默认只显示指定菜单
  useEffect(() => {
    const saved = localStorage.getItem('visibleMenuItems');
    if (saved) {
      setVisibleMenuItems(new Set(JSON.parse(saved)));
    } else {
      // 默认只显示 market-insight、ads、products、creators
      setVisibleMenuItems(new Set(['market-insight', 'ads', 'products', 'creators']));
    }
  }, []);

  // 保存到localStorage
  const saveToLocalStorage = (items: Set<string>) => {
    localStorage.setItem('visibleMenuItems', JSON.stringify(Array.from(items)));
    // 触发自定义事件通知sidebar更新
    window.dispatchEvent(new Event('menuVisibilityChanged'));
  };

  const handleToggle = (itemId: string) => {
    setVisibleMenuItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      saveToLocalStorage(next);
      return next;
    });
  };

  const handleSelectAll = () => {
    const allIds = new Set(menuItems.map(item => item.id));
    setVisibleMenuItems(allIds);
    saveToLocalStorage(allIds);
  };

  const handleDeselectAll = () => {
    setVisibleMenuItems(new Set());
    saveToLocalStorage(new Set());
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b bg-background px-6 py-4">
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your application preferences and configurations
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b bg-background">
          <div className="px-6 flex gap-6">
            <button
              onClick={() => setActiveTab('sidebar')}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'sidebar'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Sidebar Menu Control
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'permissions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              User Permissions
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="max-w-4xl mx-auto p-6">
            {activeTab === 'sidebar' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Sidebar Menu Items
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select which menu items should be visible in the sidebar
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSelectAll}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      Select All
                    </button>
                    <button
                      onClick={handleDeselectAll}
                      className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Menu Items by Section */}
                <div className="space-y-8">
                  {Object.entries(groupedMenuItems).map(([section, items]) => (
                    <div key={section}>
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        {section === 'main' ? 'Main Navigation' : section}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Checkbox
                              id={item.id}
                              checked={visibleMenuItems.has(item.id)}
                              onCheckedChange={() => handleToggle(item.id)}
                            />
                            <Label
                              htmlFor={item.id}
                              className="flex-1 text-sm font-medium text-gray-700 cursor-pointer"
                            >
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Info Box */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Changes are saved automatically
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Your sidebar menu preferences are stored locally and will persist across sessions.
                        The sidebar will update immediately when you toggle menu items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  User Permissions
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Manage user roles and access permissions
                </p>
                <Separator className="mb-6" />
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-sm">This feature is coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
