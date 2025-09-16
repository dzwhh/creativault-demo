'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MetaIcon, TikTokIcon, GoogleIcon, SnapchatIcon } from '@/components/icons';
import CountryPerformanceTable from '@/components/tables/country-performance-table';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';

// Marketing Metrics Chart Component using recharts
const MarketingMetricsChart = ({ data, title, description, platform }: { 
  data: any[], 
  title: string, 
  description: string,
  platform: string 
}) => {
  const [timeRange, setTimeRange] = useState('14d');
  const [selectedMetric, setSelectedMetric] = useState('cpm');
  
  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'cpm': return '#3b82f6'; // blue
      case 'ctr': return '#10b981'; // green  
      case 'cvr': return '#f59e0b'; // amber
      case 'roas': return '#8b5cf6'; // purple
      default: return '#6b7280';
    }
  };
  
  const formatValue = (value: number, metric: string) => {
    if (metric === 'cpm') {
      return '$' + value.toFixed(2);
    } else if (metric === 'ctr' || metric === 'cvr') {
      return value.toFixed(2) + '%';
    } else if (metric === 'roas') {
      return value.toFixed(1) + 'x';
    }
    return value.toString();
  };
  
  const getMetricName = (metric: string) => {
    switch (metric) {
      case 'cpm': return 'CPM';
      case 'ctr': return 'CTR';
      case 'cvr': return 'CVR';
      case 'roas': return 'ROAS';
      default: return metric;
    }
  };
  
  // Prepare data for the selected metric
  const chartData = data.map(d => ({
    date: d.date,
    value: d[selectedMetric],
    formattedDate: new Date(d.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }));
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
          <div className="text-gray-600 mb-1">
            {data.formattedDate}
          </div>
          <div className="font-semibold" style={{ color: getMetricColor(selectedMetric) }}>
            {getMetricName(selectedMetric)}: {formatValue(payload[0].value, selectedMetric)}
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        </div>
        
        {/* Metric Selector */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            {['cpm', 'ctr', 'cvr', 'roas'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedMetric === metric
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {getMetricName(metric)}
              </button>
            ))}
          </div>
          
          {/* Time Range Selector */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="hidden w-[160px] sm:flex" aria-label="Select a time range">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="3d">Last 3 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="aspect-auto h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`fill${platform}${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={getMetricColor(selectedMetric)}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={getMetricColor(selectedMetric)}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis
                dataKey="formattedDate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                className="text-xs fill-muted-foreground"
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs fill-muted-foreground"
                tickFormatter={(value) => formatValue(value, selectedMetric)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="value"
                type="monotone"
                fill={`url(#fill${platform}${selectedMetric})`}
                stroke={getMetricColor(selectedMetric)}
                strokeWidth={2}
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Chart Summary */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: getMetricColor(selectedMetric) }}
            />
            <span className="text-sm text-gray-600">
              {getMetricName(selectedMetric)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Average: {formatValue(data.reduce((sum, d) => sum + d[selectedMetric], 0) / data.length, selectedMetric)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const platforms = [
  { id: 'meta', name: 'Meta', icon: MetaIcon },
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon },
  { id: 'google', name: 'Google', icon: GoogleIcon },
  { id: 'snapchat', name: 'Snapchat', icon: SnapchatIcon },
];

// Sample chart data adapted for area charts with marketing metrics
const chartData = {
  meta: [
    { date: '2024-06-01', cpm: 12.5, ctr: 2.45, cvr: 3.21, roas: 4.8 },
    { date: '2024-06-02', cpm: 11.8, ctr: 2.68, cvr: 3.45, roas: 5.2 },
    { date: '2024-06-03', cpm: 13.2, ctr: 2.31, cvr: 2.98, roas: 4.5 },
    { date: '2024-06-04', cpm: 10.9, ctr: 2.89, cvr: 3.67, roas: 5.6 },
    { date: '2024-06-05', cpm: 12.1, ctr: 2.55, cvr: 3.12, roas: 4.9 },
    { date: '2024-06-06', cpm: 11.5, ctr: 2.72, cvr: 3.54, roas: 5.3 },
    { date: '2024-06-07', cpm: 13.8, ctr: 2.18, cvr: 2.87, roas: 4.2 },
    { date: '2024-06-08', cpm: 10.2, ctr: 3.05, cvr: 3.78, roas: 5.8 },
    { date: '2024-06-09', cpm: 12.7, ctr: 2.41, cvr: 3.23, roas: 4.7 },
    { date: '2024-06-10', cpm: 11.3, ctr: 2.83, cvr: 3.61, roas: 5.4 },
    { date: '2024-06-11', cpm: 13.5, ctr: 2.26, cvr: 2.94, roas: 4.3 },
    { date: '2024-06-12', cpm: 10.7, ctr: 2.97, cvr: 3.72, roas: 5.7 },
    { date: '2024-06-13', cpm: 12.3, ctr: 2.52, cvr: 3.18, roas: 4.8 },
    { date: '2024-06-14', cpm: 11.9, ctr: 2.75, cvr: 3.47, roas: 5.1 },
  ],
  tiktok: [
    { date: '2024-06-01', cpm: 8.2, ctr: 3.15, cvr: 4.12, roas: 6.2 },
    { date: '2024-06-02', cpm: 7.8, ctr: 3.42, cvr: 4.35, roas: 6.8 },
    { date: '2024-06-03', cpm: 8.9, ctr: 2.98, cvr: 3.89, roas: 5.7 },
    { date: '2024-06-04', cpm: 7.5, ctr: 3.68, cvr: 4.58, roas: 7.1 },
    { date: '2024-06-05', cpm: 8.4, ctr: 3.21, cvr: 4.02, roas: 6.0 },
    { date: '2024-06-06', cpm: 7.9, ctr: 3.55, cvr: 4.41, roas: 6.6 },
    { date: '2024-06-07', cpm: 9.1, ctr: 2.87, cvr: 3.76, roas: 5.4 },
    { date: '2024-06-08', cpm: 7.2, ctr: 3.89, cvr: 4.72, roas: 7.5 },
    { date: '2024-06-09', cpm: 8.6, ctr: 3.08, cvr: 3.95, roas: 5.9 },
    { date: '2024-06-10', cpm: 7.7, ctr: 3.61, cvr: 4.48, roas: 6.9 },
    { date: '2024-06-11', cpm: 9.3, ctr: 2.74, cvr: 3.63, roas: 5.2 },
    { date: '2024-06-12', cpm: 7.4, ctr: 3.76, cvr: 4.65, roas: 7.3 },
    { date: '2024-06-13', cpm: 8.1, ctr: 3.29, cvr: 4.08, roas: 6.1 },
    { date: '2024-06-14', cpm: 7.6, ctr: 3.48, cvr: 4.31, roas: 6.7 },
  ],
  google: [
    { date: '2024-06-01', cpm: 15.8, ctr: 1.89, cvr: 2.45, roas: 3.8 },
    { date: '2024-06-02', cpm: 14.9, ctr: 2.12, cvr: 2.68, roas: 4.2 },
    { date: '2024-06-03', cpm: 16.5, ctr: 1.75, cvr: 2.21, roas: 3.4 },
    { date: '2024-06-04', cpm: 14.2, ctr: 2.35, cvr: 2.89, roas: 4.6 },
    { date: '2024-06-05', cpm: 15.3, ctr: 1.98, cvr: 2.52, roas: 3.9 },
    { date: '2024-06-06', cpm: 14.7, ctr: 2.21, cvr: 2.75, roas: 4.3 },
    { date: '2024-06-07', cpm: 17.1, ctr: 1.62, cvr: 2.08, roas: 3.1 },
    { date: '2024-06-08', cpm: 13.8, ctr: 2.58, cvr: 3.12, roas: 5.0 },
    { date: '2024-06-09', cpm: 15.9, ctr: 1.83, cvr: 2.37, roas: 3.6 },
    { date: '2024-06-10', cpm: 14.5, ctr: 2.16, cvr: 2.71, roas: 4.1 },
    { date: '2024-06-11', cpm: 16.8, ctr: 1.71, cvr: 2.15, roas: 3.3 },
    { date: '2024-06-12', cpm: 13.9, ctr: 2.47, cvr: 3.05, roas: 4.8 },
    { date: '2024-06-13', cpm: 15.4, ctr: 1.94, cvr: 2.48, roas: 3.7 },
    { date: '2024-06-14', cpm: 14.8, ctr: 2.08, cvr: 2.64, roas: 4.0 },
  ],
  snapchat: [
    { date: '2024-06-01', cpm: 9.8, ctr: 2.65, cvr: 3.45, roas: 5.2 },
    { date: '2024-06-02', cpm: 9.2, ctr: 2.89, cvr: 3.78, roas: 5.8 },
    { date: '2024-06-03', cpm: 10.5, ctr: 2.41, cvr: 3.12, roas: 4.7 },
    { date: '2024-06-04', cpm: 8.9, ctr: 3.15, cvr: 4.02, roas: 6.3 },
    { date: '2024-06-05', cpm: 9.7, ctr: 2.72, cvr: 3.51, roas: 5.4 },
    { date: '2024-06-06', cpm: 9.1, ctr: 2.98, cvr: 3.85, roas: 5.9 },
    { date: '2024-06-07', cpm: 10.8, ctr: 2.34, cvr: 3.05, roas: 4.5 },
    { date: '2024-06-08', cpm: 8.6, ctr: 3.28, cvr: 4.15, roas: 6.7 },
    { date: '2024-06-09', cpm: 9.9, ctr: 2.58, cvr: 3.38, roas: 5.1 },
    { date: '2024-06-10', cpm: 9.3, ctr: 2.85, cvr: 3.68, roas: 5.6 },
    { date: '2024-06-11', cpm: 10.7, ctr: 2.47, cvr: 3.21, roas: 4.8 },
    { date: '2024-06-12', cpm: 8.8, ctr: 3.12, cvr: 3.98, roas: 6.4 },
    { date: '2024-06-13', cpm: 9.4, ctr: 2.76, cvr: 3.58, roas: 5.3 },
    { date: '2024-06-14', cpm: 9.0, ctr: 2.91, cvr: 3.72, roas: 5.7 },
  ],
};

export default function MarketInsightPage() {
  const [activeTab, setActiveTab] = useState('meta');
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleWatchTutorial = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Market Insight"
        description="Provide cross-platform, cross-country, cross-industry advertising benchmark metrics to quickly evaluate campaign performance and identify optimization opportunities."
        actions={
          <button 
            onClick={handleWatchTutorial}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
            </svg>
            Watch tutorial
          </button>
        }
      />

      {/* Content Section */}
      <div className="flex-1 p-0">
        <div className="h-full">
          {/* Performance Overview Dashboard */}
          <div className="bg-white h-full p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Performance Overview
              </h2>
              <p className="text-sm text-gray-500">
                Media Platform x Country
              </p>
            </div>
            
            {/* Platform Tabs - Shadcn UI Style */}
            <div className="mb-6">
              <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  const isActive = activeTab === platform.id;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setActiveTab(platform.id)}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 ${
                        isActive
                          ? 'bg-background text-foreground shadow-sm'
                          : 'hover:bg-muted/80'
                      }`}
                    >
                      <Icon className="flex-shrink-0 opacity-70" />
                      <span>{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Tab Content with Charts */}
            <div className="space-y-6">
              {platforms.map((platform) => {
                if (activeTab !== platform.id) return null;
                
                const data = chartData[platform.id as keyof typeof chartData];
                
                return (
                  <div key={platform.id} className="space-y-6">
                    {/* Performance Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white border border-border rounded-lg p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Average CPM</h3>
                        <p className="text-2xl font-bold text-gray-900">
                          ${(data.reduce((sum, item) => sum + item.cpm, 0) / data.length).toFixed(2)}
                        </p>
                        <p className="text-sm text-green-600 mt-1">-8.5% from last period</p>
                      </div>
                      
                      <div className="bg-white border border-border rounded-lg p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Average CTR</h3>
                        <p className="text-2xl font-bold text-gray-900">
                          {(data.reduce((sum, item) => sum + item.ctr, 0) / data.length).toFixed(2)}%
                        </p>
                        <p className="text-sm text-green-600 mt-1">+12.3% from last period</p>
                      </div>
                      
                      <div className="bg-white border border-border rounded-lg p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Average CVR</h3>
                        <p className="text-2xl font-bold text-gray-900">
                          {(data.reduce((sum, item) => sum + item.cvr, 0) / data.length).toFixed(2)}%
                        </p>
                        <p className="text-sm text-green-600 mt-1">+15.7% from last period</p>
                      </div>
                      
                      <div className="bg-white border border-border rounded-lg p-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Average ROAS</h3>
                        <p className="text-2xl font-bold text-gray-900">
                          {(data.reduce((sum, item) => sum + item.roas, 0) / data.length).toFixed(1)}x
                        </p>
                        <p className="text-sm text-green-600 mt-1">+18.2% from last period</p>
                      </div>
                    </div>
                    
                    {/* Chart Section */}
                    <MarketingMetricsChart
                      data={data}
                      title="Daily Performance Trends"
                      description={`Daily marketing metrics for ${platform.name} platform`}
                      platform={platform.id}
                    />
                    
                    {/* Country Performance Table */}
                    <CountryPerformanceTable platform={platform.id} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeVideoModal}>
          <div className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Player */}
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Market Insight Tutorial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}