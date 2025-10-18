'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

// Category Heatmap Treemap Data
const categoryData = [
  { name: 'Beauty & Personal Care', value: 25400, change: -6.17 },
  { name: 'Home Supplies', value: 21300, change: 6.45 },
  { name: 'Phones & Electronics', value: 18900, change: -7.2 },
  { name: 'Sports & Outdoors', value: 16700, change: -3.1 },
  { name: 'Menswear', value: 15200, change: 0.4 },
  { name: 'Food & Beverages', value: 14800, change: -4.8 },
  { name: 'Fashion Accessories', value: 13500, change: -10.13 },
  { name: 'Automotive & Motorcycle', value: 12400, change: 8.3 },
  { name: 'Home Improvement', value: 11900, change: -1.2 },
  { name: 'Shoes', value: 10800, change: 0.14 },
  { name: 'Textiles & Soft Furnishings', value: 9600, change: 8.7 },
  { name: 'Womenswear & Underwear', value: 8900, change: -2.76 },
  { name: 'Health', value: 8200, change: -9.18 },
  { name: 'Toys & Hobbies', value: 7800, change: 9.76 },
  { name: 'Tools & Hardware', value: 6500, change: 4.8 },
];

// Get color based on change percentage
const getCategoryColor = (change: number) => {
  if (change > 5) return '#ef4444'; // Red for growing
  if (change < -5) return '#22c55e'; // Green for declining
  return '#eab308'; // Yellow for stable
};

// Custom Treemap Content Component
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, value, change } = props;
  
  // Don't render if too small
  if (width < 60 || height < 40) return null;
  
  const color = getCategoryColor(change);
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          fillOpacity: 0.08,
          stroke: color,
          strokeWidth: 2,
          strokeOpacity: 0.4,
        }}
        className="cursor-pointer transition-opacity hover:fill-opacity-15"
      />
      {/* Category Name */}
      <text
        x={x + width / 2}
        y={y + height / 2 - 12}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#000000"
        fontSize={width > 120 ? 14 : 12}
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        stroke="#ffffff"
        strokeWidth="3"
        paintOrder="stroke"
        style={{ 
          textRendering: 'geometricPrecision',
          shapeRendering: 'geometricPrecision'
        }}
      >
        {name}
      </text>
      {/* Percentage Change */}
      <text
        x={x + width / 2}
        y={y + height / 2 + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#000000"
        fontSize={width > 120 ? 24 : 18}
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        stroke="#ffffff"
        strokeWidth="4"
        paintOrder="stroke"
        style={{ 
          textRendering: 'geometricPrecision',
          shapeRendering: 'geometricPrecision'
        }}
      >
        {change > 0 ? '+' : ''}{change}%
      </text>
      {/* Units */}
      <text
        x={x + width / 2}
        y={y + height / 2 + 30}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#000000"
        fontSize={12}
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
        stroke="#ffffff"
        strokeWidth="2.5"
        paintOrder="stroke"
        style={{ 
          textRendering: 'geometricPrecision',
          shapeRendering: 'geometricPrecision'
        }}
      >
        {value.toLocaleString()} units
      </text>
    </g>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-sm text-gray-900 mb-1">{data.name}</p>
        <p className="text-xs text-gray-600">Sales: {data.value.toLocaleString()} units</p>
        <p className={`text-xs font-semibold ${
          data.change > 5 ? 'text-red-600' : 
          data.change < -5 ? 'text-green-600' : 
          'text-yellow-600'
        }`}>
          Change: {data.change > 0 ? '+' : ''}{data.change}%
        </p>
      </div>
    );
  }
  return null;
};

// Top Products Data from CSV
const topProducts = [
  {
    rank: 1,
    name: 'Wireless Bluetooth Earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
    shop: 'TechGear Store',
    price: '$29.99',
    country: '🇺🇸 US',
    category: 'Electronics',
    commission: '15%',
    sales: 12500,
    salesChange: '+45%',
    totalSales: 125000,
    revenue: '$374,875',
    listedDate: '2024-01-15',
    shopTotalSales: 450000,
    status: 'Active'
  },
  {
    rank: 2,
    name: 'Portable Phone Charger 20000mAh',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop',
    shop: 'PowerHub',
    price: '$24.99',
    country: '🇬🇧 UK',
    category: 'Electronics',
    commission: '12%',
    sales: 11200,
    salesChange: '+38%',
    totalSales: 98000,
    revenue: '$279,804',
    listedDate: '2024-02-01',
    shopTotalSales: 380000,
    status: 'Active'
  },
  {
    rank: 3,
    name: 'Smart Watch Fitness Tracker',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    shop: 'FitLife',
    price: '$89.99',
    country: '🇩🇪 DE',
    category: 'Wearables',
    commission: '18%',
    sales: 9800,
    salesChange: '+52%',
    totalSales: 89000,
    revenue: '$881,912',
    listedDate: '2024-01-20',
    shopTotalSales: 520000,
    status: 'Active'
  },
  {
    rank: 4,
    name: 'LED Desk Lamp with USB',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=100&h=100&fit=crop',
    shop: 'HomeLight',
    price: '$34.99',
    country: '🇫🇷 FR',
    category: 'Home & Garden',
    commission: '20%',
    sales: 8900,
    salesChange: '+28%',
    totalSales: 76000,
    revenue: '$311,411',
    listedDate: '2024-03-05',
    shopTotalSales: 290000,
    status: 'Active'
  },
  {
    rank: 5,
    name: 'Yoga Mat Non-Slip Exercise',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop',
    shop: 'SportPro',
    price: '$19.99',
    country: '🇨🇦 CA',
    category: 'Sports',
    commission: '15%',
    sales: 8200,
    salesChange: '+33%',
    totalSales: 71000,
    revenue: '$163,818',
    listedDate: '2024-02-15',
    shopTotalSales: 340000,
    status: 'Active'
  },
  {
    rank: 6,
    name: 'Stainless Steel Water Bottle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop',
    shop: 'EcoLife',
    price: '$22.99',
    country: '🇦🇺 AU',
    category: 'Kitchen',
    commission: '16%',
    sales: 7500,
    salesChange: '+41%',
    totalSales: 68000,
    revenue: '$172,425',
    listedDate: '2024-01-28',
    shopTotalSales: 410000,
    status: 'Active'
  },
  {
    rank: 7,
    name: 'Backpack Laptop Bag 15.6"',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
    shop: 'BagMaster',
    price: '$39.99',
    country: '🇺🇸 US',
    category: 'Bags',
    commission: '14%',
    sales: 7100,
    salesChange: '+29%',
    totalSales: 63000,
    revenue: '$283,929',
    listedDate: '2024-02-20',
    shopTotalSales: 370000,
    status: 'Active'
  },
  {
    rank: 8,
    name: 'Bluetooth Speaker Waterproof',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
    shop: 'SoundWave',
    price: '$44.99',
    country: '🇬🇧 UK',
    category: 'Audio',
    commission: '17%',
    sales: 6800,
    salesChange: '+36%',
    totalSales: 59000,
    revenue: '$305,932',
    listedDate: '2024-03-01',
    shopTotalSales: 330000,
    status: 'Active'
  },
  {
    rank: 9,
    name: 'Phone Stand Adjustable Desktop',
    image: 'https://images.unsplash.com/photo-1565849904461-04e7d6c5e271?w=100&h=100&fit=crop',
    shop: 'DeskEssentials',
    price: '$14.99',
    country: '🇩🇪 DE',
    category: 'Accessories',
    commission: '22%',
    sales: 6500,
    salesChange: '+44%',
    totalSales: 57000,
    revenue: '$97,443',
    listedDate: '2024-02-10',
    shopTotalSales: 280000,
    status: 'Active'
  },
  {
    rank: 10,
    name: 'Digital Kitchen Scale',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=100&h=100&fit=crop',
    shop: 'KitchenPro',
    price: '$18.99',
    country: '🇫🇷 FR',
    category: 'Kitchen',
    commission: '19%',
    sales: 6200,
    salesChange: '+31%',
    totalSales: 54000,
    revenue: '$117,798',
    listedDate: '2024-01-25',
    shopTotalSales: 310000,
    status: 'Active'
  },
];

export default function WinningProduct() {
  const [sortBy, setSortBy] = useState('sales');
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="h-full">
      <div className="bg-white h-full p-6">
        {/* Category Heatmap Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-1">
                Category Heatmap
              </h2>
              <p className="text-sm text-gray-500">
                Visual breakdown of product categories by sales volume and growth rate
              </p>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Total Units Sold</SelectItem>
                <SelectItem value="revenue">Total Revenue</SelectItem>
                <SelectItem value="growth">Growth Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-6">
              {/* Treemap Visualization */}
              <div className="relative w-full bg-white" style={{ height: '500px' }}>
                <ResponsiveContainer width="100%" height="100%" style={{ backgroundColor: 'transparent' }}>
                  <Treemap
                    data={categoryData}
                    dataKey="value"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    content={<CustomTreemapContent />}
                  >
                    <Tooltip content={<CustomTooltip />} />
                  </Treemap>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e', opacity: 0.2, border: '2px solid #22c55e' }}></div>
                    <span className="text-sm text-gray-600">Declining (&lt; -5%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#eab308', opacity: 0.2, border: '2px solid #eab308' }}></div>
                    <span className="text-sm text-gray-600">Stable (-5% to +5%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444', opacity: 0.2, border: '2px solid #ef4444' }}></div>
                    <span className="text-sm text-gray-600">Growing (&gt; +5%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products Ranking Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-1">
                Top Products Ranking
              </h2>
              <p className="text-sm text-gray-500">
                Best-selling products ranked by total sales volume
              </p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="14d">Last 14 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Rank</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Shop</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Commission</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Sales</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Change</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Total Sales</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Revenue</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topProducts.map((product) => (
                      <tr key={product.rank} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-sm">
                            #{product.rank}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <span className="font-medium text-sm text-gray-900 max-w-xs truncate">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{product.shop}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{product.price}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{product.country}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{product.commission}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                          {product.sales.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center text-sm font-medium text-green-600">
                            {product.salesChange}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {product.totalSales.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                          {product.revenue}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
