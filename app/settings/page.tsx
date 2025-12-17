'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  UserIcon,
  ActivityIcon,
  BillingIcon,
  SettingsIcon,
  BellIcon,
} from '@/components/icons';

// 柱状趋势图标
const BarChartIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="10" width="4" height="10" rx="1" />
    <rect x="10" y="6" width="4" height="14" rx="1" />
    <rect x="16" y="2" width="4" height="18" rx="1" />
  </svg>
);

// Plan 图标
const PlanIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

// 设置页面的 Tab 配置
type SettingsTab = 'profile' | 'usage' | 'billing' | 'plan' | 'permissions' | 'notifications';

const settingsTabs: { id: SettingsTab; label: string; icon: React.ComponentType<any> }[] = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'usage', label: 'Usage', icon: BarChartIcon },
  { id: 'billing', label: 'Billing', icon: BillingIcon },
  { id: 'plan', label: 'Plan', icon: PlanIcon },
  { id: 'permissions', label: 'Permissions', icon: SettingsIcon },
  { id: 'notifications', label: 'Notifications', icon: BellIcon },
];

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
  
  // Marketing Search
  { id: 'market-analysis', label: 'Market Analysis', section: 'Marketing Search' },
  { id: 'competitive-analysis', label: 'Competitive Analysis', section: 'Marketing Search' },
  { id: 'creative-analysis', label: 'Creative Analysis', section: 'Marketing Search' },
  
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

// 订单数据
interface Order {
  id: string;
  date: string;
  createdTime: string;
  paidTime: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  item: string;
  type: string;
  unitPrice: number;
  preTaxTotal: number;
  tax: number;
  discount: number;
  amountPaid: number;
  paymentMethod: string;
}

const ordersData: Order[] = [
  {
    id: '1',
    date: '2025-12-16',
    createdTime: '2025-12-16, 9:25 AM',
    paidTime: '2025-12-16, 9:25 AM',
    amount: 30.00,
    status: 'paid',
    description: 'Pro',
    item: 'CreatiVault Pro',
    type: 'Subscription',
    unitPrice: 60.00,
    preTaxTotal: 30.00,
    tax: 0.00,
    discount: -30.00,
    amountPaid: 30.00,
    paymentMethod: 'Alipay',
  },
  {
    id: '2',
    date: '2025-11-16',
    createdTime: '2025-11-16, 10:30 AM',
    paidTime: '2025-11-16, 10:30 AM',
    amount: 30.00,
    status: 'paid',
    description: 'Pro',
    item: 'Qoder Pro+',
    type: 'Subscription',
    unitPrice: 60.00,
    preTaxTotal: 30.00,
    tax: 0.00,
    discount: -30.00,
    amountPaid: 30.00,
    paymentMethod: 'Alipay',
  },
  {
    id: '3',
    date: '2025-10-16',
    createdTime: '2025-10-16, 2:15 PM',
    paidTime: '2025-10-16, 2:15 PM',
    amount: 30.00,
    status: 'paid',
    description: 'Pro',
    item: 'Qoder Pro+',
    type: 'Subscription',
    unitPrice: 60.00,
    preTaxTotal: 30.00,
    tax: 0.00,
    discount: -30.00,
    amountPaid: 30.00,
    paymentMethod: 'Alipay',
  },
  {
    id: '4',
    date: '2025-09-23',
    createdTime: '2025-09-23, 11:45 AM',
    paidTime: '2025-09-23, 11:45 AM',
    amount: 10.00,
    status: 'paid',
    description: 'Pro',
    item: 'Qoder Pro+',
    type: 'Subscription',
    unitPrice: 20.00,
    preTaxTotal: 10.00,
    tax: 0.00,
    discount: -10.00,
    amountPaid: 10.00,
    paymentMethod: 'Alipay',
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [visibleMenuItems, setVisibleMenuItems] = useState<Set<string>>(new Set());
  const [creditsLogTab, setCreditsLogTab] = useState<'used' | 'earned'>('used');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [hoveredOrderId, setHoveredOrderId] = useState<string | null>(null);
  const [showBillingInfo, setShowBillingInfo] = useState(false);
  const [isEditingBillingAddress, setIsEditingBillingAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    country: 'China',
    state: 'Zhejiang',
    city: 'hangzhou',
    address: 'zhongjiaocaiwu 2-407',
  });
  const [tempBillingAddress, setTempBillingAddress] = useState(billingAddress);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '2025-12-10',
    end: '2025-12-17',
  });
  const [showCreditPacks, setShowCreditPacks] = useState(false);
    const [planBillingTab, setPlanBillingTab] = useState<'monthly' | 'yearly'>('monthly');

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

  // 渲染内容区域
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Profile</h2>
            <div className="bg-white rounded-lg border divide-y">
              {/* Avatar */}
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-muted-foreground">Avatar</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  J
                </div>
              </div>
              {/* Name */}
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-muted-foreground">Name</span>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="text-sm text-right bg-gray-100 rounded-md px-3 py-1.5 border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Email */}
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm text-foreground">john@example.com</span>
              </div>
            </div>
          </div>
        );
      
      case 'usage':
        return (
          <div className="space-y-8">
            {/* Usage Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">Usage</h2>
              
              {/* Part 1: Plan Credits */}
              <div className="bg-white rounded-lg border p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Plan Credits</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monthly quota and usage for the current plan(current cycle: <span className="font-medium text-foreground">December 17, 2025 - January 16, 2026</span>).
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl">
                      <span className="font-semibold text-foreground">47</span>
                      <span className="text-muted-foreground"> / 6,000</span>
                    </div>
                    <span className="text-lg text-muted-foreground">1%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[1%] bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Part 2: Add-on Credits */}
              <div className="bg-white rounded-lg border p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Add-on Credits</h3>
                    <p className="text-sm text-muted-foreground mt-1">Additional credits.</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl">
                      <span className="font-semibold text-foreground">0</span>
                      <span className="text-muted-foreground"> / 200</span>
                    </div>
                    <span className="text-lg text-muted-foreground">0%</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-blue-500 rounded-full"></div>
                  </div>
                  <button 
                    onClick={() => setShowCreditPacks(!showCreditPacks)}
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-blue-600 transition-colors"
                  >
                    <span>1 Included Credit Packs</span>
                    <svg className={cn("w-4 h-4 transition-transform", showCreditPacks && "rotate-90")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {/* Credit Packs Expanded Content */}
                  {showCreditPacks && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                          <span className="text-sm font-medium text-foreground">Bonus (Total: 200)</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Remaining <span className="font-semibold text-foreground">200</span> credits. Expires on January 25, 2026
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Part 3: Get More Credits */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-base font-semibold">Get More Credits</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Once you reach your Credits limit, we'll keep you going on the basic model with a daily limit. You can upgrade to get more Credits.
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <button className="px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                      Upgrade to Pro
                    </button>
                    <a href="#" className="flex items-center gap-1 text-sm font-medium text-green-400 hover:text-green-300 transition-colors">
                      Refer Friends to Earn Bonus Credits
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>
                {/* Decorative dots pattern */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
                  <div className="grid grid-cols-8 gap-2 h-full items-center justify-end pr-4">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Credits Log Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Credits Log</h2>
              </div>

              {/* Tabs */}
              <div className="flex items-center justify-between">
                <div className="inline-flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setCreditsLogTab('used')}
                    className={cn(
                      'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
                      creditsLogTab === 'used'
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Used
                  </button>
                  <button
                    onClick={() => setCreditsLogTab('earned')}
                    className={cn(
                      'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
                      creditsLogTab === 'earned'
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Earned
                  </button>
                </div>
                                <div className="relative">
                  <button 
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
                  >
                    <span>
                      {new Date(dateRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ~ {new Date(dateRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  {/* Date Range Picker Dropdown */}
                  {showDatePicker && (
                    <div className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-20 p-4 w-72">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground uppercase">Start Date</label>
                          <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground uppercase">End Date</label>
                          <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => setShowDatePicker(false)}
                            className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Apply
                          </button>
                          <button
                            onClick={() => {
                              setDateRange({ start: '2025-12-10', end: '2025-12-17' });
                              setShowDatePicker(false);
                            }}
                            className="px-3 py-2 bg-gray-100 text-foreground text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg border overflow-hidden">
                {creditsLogTab === 'used' ? (
                  <>
                    <div className="px-4 py-3 bg-gray-50 border-b">
                      <p className="text-xs text-muted-foreground">
                        Note: Credit usage is supported for CreatiVault IDE V0.2.11 and later.
                      </p>
                    </div>
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">User</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Time</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Operation</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Feature</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide">Credits</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">John Doe</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">Dec 17, 2:03 PM</td>
                          <td className="px-4 py-3 text-sm">Search</td>
                          <td className="px-4 py-3 text-sm">Creator Search</td>
                          <td className="px-4 py-3 text-sm text-right">26.12</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">John Doe</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">Dec 17, 1:58 PM</td>
                          <td className="px-4 py-3 text-sm">Search</td>
                          <td className="px-4 py-3 text-sm">Ads Analysis</td>
                          <td className="px-4 py-3 text-sm text-right">1.76</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">John Doe</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">Dec 17, 1:54 PM</td>
                          <td className="px-4 py-3 text-sm">Search</td>
                          <td className="px-4 py-3 text-sm">Market Analysis</td>
                          <td className="px-4 py-3 text-sm text-right">2.26</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">John Doe</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">Dec 17, 1:52 PM</td>
                          <td className="px-4 py-3 text-sm">Search</td>
                          <td className="px-4 py-3 text-sm">Product Search</td>
                          <td className="px-4 py-3 text-sm text-right">1.43</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">John Doe</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">Dec 17, 1:51 PM</td>
                          <td className="px-4 py-3 text-sm">Search</td>
                          <td className="px-4 py-3 text-sm">Creative Clips</td>
                          <td className="px-4 py-3 text-sm text-right">7.03</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Acquired On</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Expires On</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">Welcome Bonus</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Dec 1, 2025</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Jan 1, 2026</td>
                        <td className="px-4 py-3 text-sm text-right text-green-600">+100</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">Referral Reward</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Dec 10, 2025</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Feb 10, 2026</td>
                        <td className="px-4 py-3 text-sm text-right text-green-600">+50</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">Monthly Plan Credits</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Dec 17, 2025</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Jan 17, 2026</td>
                        <td className="px-4 py-3 text-sm text-right text-green-600">+6,000</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'billing':
        // Order Details View
        if (selectedOrder) {
          return (
            <div className="space-y-6">
              {/* Back Button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Billing</span>
              </button>

              {/* Order Details Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Order Details</h2>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Invoice</span>
                </button>
              </div>

              {/* Order Info Card */}
              <div className="bg-white rounded-lg border p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Created</p>
                    <p className="text-sm font-medium text-foreground">{selectedOrder.createdTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Paid</p>
                    <p className="text-sm font-medium text-foreground">{selectedOrder.paidTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Order Status</p>
                    <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Paid
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Order Summary</h3>
                <div className="bg-white rounded-lg border divide-y">
                  {/* Item Details */}
                  <div className="p-4 flex justify-between">
                    <span className="text-sm text-muted-foreground">Item</span>
                    <span className="text-sm font-medium text-foreground">{selectedOrder.item}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm text-foreground">{selectedOrder.type}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-sm text-muted-foreground">Unit Price</span>
                    <span className="text-sm text-foreground">${selectedOrder.unitPrice.toFixed(2)}</span>
                  </div>
                  {/* Subtotals */}
                  <div className="p-4 flex justify-between">
                    <span className="text-sm text-muted-foreground">Pre-tax Total</span>
                    <span className="text-sm text-foreground">${selectedOrder.preTaxTotal.toFixed(2)}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-sm text-muted-foreground">Tax</span>
                    <span className="text-sm text-foreground">${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  {/* Discount */}
                  <div className="p-4 flex justify-between">
                    <span className="text-sm text-muted-foreground">Limited-time Discount</span>
                    <span className="text-sm font-medium text-green-600">-${Math.abs(selectedOrder.discount).toFixed(2)}</span>
                  </div>
                  {/* Total */}
                  <div className="p-4 flex justify-between bg-gray-50">
                    <span className="text-sm font-semibold text-foreground">Amount Paid</span>
                    <span className="text-lg font-bold text-foreground">${selectedOrder.amountPaid.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 text-sm">{selectedOrder.paymentMethod}</td>
                        <td className="px-6 py-4 text-sm text-right">{selectedOrder.amountPaid}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }

        // Billing Information View
        if (showBillingInfo) {
          return (
            <div className="space-y-6">
              {/* Back Button */}
              <button
                onClick={() => setShowBillingInfo(false)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Billing</span>
              </button>

              {/* Title */}
              <h2 className="text-xl font-semibold text-foreground">Billing Information</h2>

              {/* Note Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Note</p>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>· A saved payment method is required to maintain an active subscription.</li>
                      <li>· Subscription payments are automatically charged to your default payment method.</li>
                      <li>· Updates to your billing info are not retroactive and will only affect future payments.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Payment method</h3>
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1677FF] rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="white">
                          <path d="M789.12 623.104c-90.496-37.504-155.008-64.64-193.024-81.28 24.64-56 42.24-117.632 52.864-184.768H516.48v-72.448h161.024V224H516.48V128H435.2v96H269.056v60.608H435.2v72.448H290.944v60.608h277.504c-8.896 47.744-21.632 92.224-38.144 133.376-95.36-34.176-195.968-51.392-301.696-51.392-76.16 0-137.6 16.128-184.32 48.384-46.72 32.256-70.016 76.416-70.016 132.608 0 56.192 22.4 100.032 67.2 131.584 44.8 31.488 103.936 47.232 177.536 47.232 67.712 0 130.752-14.72 189.056-44.16 58.24-29.376 111.488-71.104 159.616-125.184 56.448 24.768 137.024 56.384 241.664 94.912l79.616-161.92zM364.672 749.696c-84.672 0-144.768-16.832-180.288-50.496-35.584-33.664-53.312-73.216-53.312-118.656 0-45.44 19.008-82.56 57.088-111.36 38.016-28.8 87.168-43.2 147.456-43.2 74.624 0 152.576 16.64 233.92 49.792-75.52 91.648-143.552 161.856-204.864 273.92z"/>
                        </svg>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">lic***@foxmail.com</span>
                        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">Default</span>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing address */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Billing address</h3>
                  {!isEditingBillingAddress && (
                    <button 
                      onClick={() => {
                        setTempBillingAddress(billingAddress);
                        setIsEditingBillingAddress(true);
                      }}
                      className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                  )}
                </div>
                <div className="bg-white rounded-lg border p-6 space-y-5">
                  {isEditingBillingAddress ? (
                    <>
                      {/* Country / Region */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Country / Region</label>
                        <div className="relative">
                          <select
                            value={tempBillingAddress.country}
                            onChange={(e) => setTempBillingAddress({...tempBillingAddress, country: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="China">China</option>
                            <option value="United States">United States</option>
                            <option value="Japan">Japan</option>
                            <option value="South Korea">South Korea</option>
                            <option value="Singapore">Singapore</option>
                          </select>
                          <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {/* State / Province / Region */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">State / Province / Region</label>
                        <div className="relative">
                          <select
                            value={tempBillingAddress.state}
                            onChange={(e) => setTempBillingAddress({...tempBillingAddress, state: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-blue-500 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Zhejiang">Zhejiang</option>
                            <option value="Jiangsu">Jiangsu</option>
                            <option value="Guangdong">Guangdong</option>
                            <option value="Beijing">Beijing</option>
                            <option value="Shanghai">Shanghai</option>
                          </select>
                          <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {/* City */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">City</label>
                        <input
                          type="text"
                          value={tempBillingAddress.city}
                          onChange={(e) => setTempBillingAddress({...tempBillingAddress, city: e.target.value})}
                          className="w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      {/* Address */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Address</label>
                        <input
                          type="text"
                          value={tempBillingAddress.address}
                          onChange={(e) => setTempBillingAddress({...tempBillingAddress, address: e.target.value})}
                          className="w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      {/* Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            setBillingAddress(tempBillingAddress);
                            setIsEditingBillingAddress(false);
                          }}
                          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Confirm and Save
                        </button>
                        <button
                          onClick={() => setIsEditingBillingAddress(false)}
                          className="px-4 py-2 bg-gray-100 text-foreground text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-medium text-foreground">Country / Region</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{billingAddress.country}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">State / Province / Region</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{billingAddress.state}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">City</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{billingAddress.city}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Address</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{billingAddress.address}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }

        // Billing List View
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Billing</h2>
            
            {/* Part 1: Current Plan */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Pro</h3>
                  <p className="text-sm text-muted-foreground mt-1">$30.00 per month.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 transition-colors">
                    Manage
                  </button>
                  <button className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>

            {/* Part 2: Manage Billing Information */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Manage Billing Information</h3>
                  <p className="text-sm text-muted-foreground mt-1">Manage your payment methods and billing information.</p>
                </div>
                <button 
                  onClick={() => setShowBillingInfo(true)}
                  className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>

            {/* Part 3: Orders */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-base font-semibold text-foreground">Orders</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wide"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {ordersData.map((order) => (
                    <tr 
                      key={order.id} 
                      className="hover:bg-gray-50 group"
                      onMouseEnter={() => setHoveredOrderId(order.id)}
                      onMouseLeave={() => setHoveredOrderId(null)}
                    >
                      <td className="px-6 py-4 text-sm">{order.date}</td>
                      <td className="px-6 py-4 text-sm">{order.amount.toFixed(2)} USD</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{order.description}</td>
                      <td className="px-6 py-4 text-right relative">
                        <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-gray-100">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        {/* Hover Dropdown Menu */}
                        {hoveredOrderId === order.id && (
                          <div className="absolute right-0 top-full mt-1 w-44 bg-white border rounded-lg shadow-lg z-10 py-1">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              className="w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors"
                            >
                              Download Invoice
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'permissions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Sidebar Menu Control</h2>
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

            <div className="bg-white rounded-lg border p-6">
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
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
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
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            <div className="bg-white rounded-lg border p-6">
              <div className="text-center py-8 text-muted-foreground">
                <BellIcon size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm">Notification settings coming soon...</p>
              </div>
            </div>
          </div>
        );
      
      case 'plan':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Plans</h2>
              <p className="text-sm text-muted-foreground mt-1">No subscriptions yet? Pick a plan to start your growth!</p>
            </div>
            <Separator />
            
            {/* Monthly / Yearly Tabs */}
            <div className="flex justify-center">
              <div className="inline-flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setPlanBillingTab('monthly')}
                  className={cn(
                    'px-6 py-2 text-sm font-medium rounded-full transition-colors',
                    planBillingTab === 'monthly'
                      ? 'bg-white text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setPlanBillingTab('yearly')}
                  className={cn(
                    'px-6 py-2 text-sm font-medium rounded-full transition-colors',
                    planBillingTab === 'yearly'
                      ? 'bg-white text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Yearly
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-3 gap-6">
              {/* Starter Plan */}
              <div className="bg-white rounded-xl border p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-foreground">Starter</h3>
                <div className="mt-4 h-10 flex items-end">
                  <span className="text-3xl font-bold text-foreground">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <button className="mt-6 w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-foreground hover:bg-gray-50 transition-colors">
                  Upgrade to Starter
                </button>
                <div className="mt-4 text-sm text-muted-foreground">
                  <span><strong>5,000</strong> Credits - Cancel anytime</span>
                </div>
                <Separator className="my-4" />
                <p className="text-sm font-medium text-foreground mb-3">What's included:</p>
                <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                  {['Market Insight','Meta/TikTok Ads Library', 'Amazon Products', 'Advertiser Tracking','Download Material'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 py-3 bg-blue-50 rounded-lg flex items-center justify-center gap-2 text-sm text-blue-600 whitespace-nowrap">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Included 24/7 customer service
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-white rounded-xl border-2 border-blue-500 p-6 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full flex items-center gap-1 whitespace-nowrap">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  75% of users upgrade to this plan
                </div>
                <h3 className="text-lg font-semibold text-foreground">Pro</h3>
                <div className="mt-4 h-10 flex items-end">
                  <span className="text-3xl font-bold text-foreground">${planBillingTab === 'monthly' ? '149' : '99'}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <button className="mt-6 w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-colors">
                  Upgrade to Pro
                </button>
                <div className="mt-4 text-sm text-muted-foreground">
                  <span className="whitespace-nowrap"><strong>100,000</strong> Credits - Cancel anytime</span>
                </div>
                <Separator className="my-4" />
                <p className="text-sm font-medium text-foreground mb-3">All Starter features, plus:</p>
                <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                  {[ 'TikTok Products','TikTok/Instagram/YouTube Influencers', 'Brand/Product Tracking', 'AI partner'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 py-3 bg-blue-50 rounded-lg flex items-center justify-center gap-2 text-sm text-blue-600 whitespace-nowrap">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Included 24/7 customer service
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-xl border p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-foreground">Enterprise</h3>
                <div className="mt-4 h-10 flex items-end">
                  <span className="text-3xl font-bold text-foreground">$2999</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <button className="mt-6 w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-foreground hover:bg-gray-50 transition-colors">
                  Upgrade to Enterprise
                </button>
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="whitespace-nowrap"><strong>1,000,000</strong> Credits - Cancel anytime</span>
                </div>
                <Separator className="my-4" />
                <p className="text-sm font-medium text-foreground mb-3">All Pro features, plus:</p>
                <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                  {['Creator Contact Unlock', 'Creator Targeted Search', 'Creator Video Tracking', 'Data Collection Service'].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 py-3 bg-blue-50 rounded-lg flex items-center justify-center gap-2 text-sm text-blue-600 whitespace-nowrap">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Included 24/7 customer service
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      {/* Left Sidebar */}
      <div className="w-56 flex flex-col shrink-0 ml-8">
        {/* User Info */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground">John Doe</span>
            <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-600 text-white rounded">Pro</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">john@example.com</p>
        </div>

        {/* Tab Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-foreground'
                    )}
                  >
                    <Icon
                      size={18}
                      className={cn(
                        'shrink-0',
                        isActive ? 'text-blue-600' : 'text-gray-500'
                      )}
                    />
                    <span>{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex-1 px-6 py-8 pr-12 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
