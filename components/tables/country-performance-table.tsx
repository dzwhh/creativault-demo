'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CountryData {
  country: string;
  countryCode: string;
  flag: string;
  cpm: number;
  ctr: number;
  cvr: number;
  roas: number;
  trend: number[];
  trendChange: number;
}

interface CountryPerformanceTableProps {
  platform: string;
}

// Sample country data with marketing metrics
const countryData: Record<string, CountryData[]> = {
  meta: [
    {
      country: 'United States',
      countryCode: 'US',
      flag: '🇺🇸',
      cpm: 15.8,
      ctr: 2.45,
      cvr: 3.21,
      roas: 4.8,
      trend: [4.2, 4.5, 4.1, 4.6, 4.3, 4.8, 4.7, 4.9, 4.8, 5.1, 4.8, 4.9, 4.8, 4.8],
      trendChange: 14.3
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      flag: '🇬🇧',
      cpm: 12.3,
      ctr: 2.89,
      cvr: 3.67,
      roas: 5.2,
      trend: [4.8, 4.9, 5.0, 5.1, 5.3, 5.2, 5.4, 5.1, 5.2, 5.0, 5.2, 5.3, 5.2, 5.2],
      trendChange: 8.3
    },
    {
      country: 'Germany',
      countryCode: 'DE',
      flag: '🇩🇪',
      cpm: 11.5,
      ctr: 2.72,
      cvr: 3.54,
      roas: 5.1,
      trend: [4.9, 5.0, 4.8, 5.1, 5.0, 5.2, 5.1, 5.0, 5.1, 5.0, 5.1, 5.1, 5.1, 5.1],
      trendChange: 4.1
    },
    {
      country: 'France',
      countryCode: 'FR',
      flag: '🇫🇷',
      cpm: 10.9,
      ctr: 2.68,
      cvr: 3.45,
      roas: 4.9,
      trend: [4.5, 4.6, 4.7, 4.8, 4.9, 4.8, 4.9, 4.7, 4.8, 4.9, 4.8, 4.9, 4.9, 4.9],
      trendChange: 8.9
    },
    {
      country: 'Canada',
      countryCode: 'CA',
      flag: '🇨🇦',
      cpm: 13.2,
      ctr: 2.31,
      cvr: 2.98,
      roas: 4.5,
      trend: [4.1, 4.2, 4.3, 4.4, 4.5, 4.3, 4.5, 4.4, 4.5, 4.4, 4.5, 4.5, 4.5, 4.5],
      trendChange: 9.8
    },
    {
      country: 'Australia',
      countryCode: 'AU',
      flag: '🇦🇺',
      cpm: 14.7,
      ctr: 2.55,
      cvr: 3.12,
      roas: 4.7,
      trend: [4.3, 4.4, 4.5, 4.6, 4.7, 4.5, 4.7, 4.6, 4.7, 4.6, 4.7, 4.7, 4.7, 4.7],
      trendChange: 9.3
    }
  ],
  tiktok: [
    {
      country: 'United States',
      countryCode: 'US',
      flag: '🇺🇸',
      cpm: 8.2,
      ctr: 3.15,
      cvr: 4.12,
      roas: 6.2,
      trend: [5.8, 5.9, 6.0, 6.1, 6.2, 6.0, 6.3, 6.1, 6.2, 6.1, 6.2, 6.2, 6.2, 6.2],
      trendChange: 6.9
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      flag: '🇬🇧',
      cpm: 7.8,
      ctr: 3.42,
      cvr: 4.35,
      roas: 6.8,
      trend: [6.3, 6.4, 6.5, 6.6, 6.8, 6.6, 6.9, 6.7, 6.8, 6.7, 6.8, 6.8, 6.8, 6.8],
      trendChange: 7.9
    },
    {
      country: 'Germany',
      countryCode: 'DE',
      flag: '🇩🇪',
      cpm: 7.9,
      ctr: 3.55,
      cvr: 4.41,
      roas: 6.6,
      trend: [6.1, 6.2, 6.3, 6.4, 6.6, 6.4, 6.7, 6.5, 6.6, 6.5, 6.6, 6.6, 6.6, 6.6],
      trendChange: 8.2
    },
    {
      country: 'France',
      countryCode: 'FR',
      flag: '🇫🇷',
      cpm: 8.4,
      ctr: 3.21,
      cvr: 4.02,
      roas: 6.0,
      trend: [5.5, 5.6, 5.7, 5.8, 6.0, 5.8, 6.1, 5.9, 6.0, 5.9, 6.0, 6.0, 6.0, 6.0],
      trendChange: 9.1
    },
    {
      country: 'Canada',
      countryCode: 'CA',
      flag: '🇨🇦',
      cpm: 8.9,
      ctr: 2.98,
      cvr: 3.89,
      roas: 5.7,
      trend: [5.2, 5.3, 5.4, 5.5, 5.7, 5.5, 5.8, 5.6, 5.7, 5.6, 5.7, 5.7, 5.7, 5.7],
      trendChange: 9.6
    },
    {
      country: 'Australia',
      countryCode: 'AU',
      flag: '🇦🇺',
      cpm: 7.2,
      ctr: 3.89,
      cvr: 4.72,
      roas: 7.5,
      trend: [7.0, 7.1, 7.2, 7.3, 7.5, 7.3, 7.6, 7.4, 7.5, 7.4, 7.5, 7.5, 7.5, 7.5],
      trendChange: 7.1
    }
  ],
  google: [
    {
      country: 'United States',
      countryCode: 'US',
      flag: '🇺🇸',
      cpm: 15.8,
      ctr: 1.89,
      cvr: 2.45,
      roas: 3.8,
      trend: [3.4, 3.5, 3.6, 3.7, 3.8, 3.6, 3.9, 3.7, 3.8, 3.7, 3.8, 3.8, 3.8, 3.8],
      trendChange: 11.8
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      flag: '🇬🇧',
      cpm: 14.9,
      ctr: 2.12,
      cvr: 2.68,
      roas: 4.2,
      trend: [3.8, 3.9, 4.0, 4.1, 4.2, 4.0, 4.3, 4.1, 4.2, 4.1, 4.2, 4.2, 4.2, 4.2],
      trendChange: 10.5
    },
    {
      country: 'Germany',
      countryCode: 'DE',
      flag: '🇩🇪',
      cpm: 14.7,
      ctr: 2.21,
      cvr: 2.75,
      roas: 4.3,
      trend: [3.9, 4.0, 4.1, 4.2, 4.3, 4.1, 4.4, 4.2, 4.3, 4.2, 4.3, 4.3, 4.3, 4.3],
      trendChange: 10.3
    },
    {
      country: 'France',
      countryCode: 'FR',
      flag: '🇫🇷',
      cpm: 15.3,
      ctr: 1.98,
      cvr: 2.52,
      roas: 3.9,
      trend: [3.5, 3.6, 3.7, 3.8, 3.9, 3.7, 4.0, 3.8, 3.9, 3.8, 3.9, 3.9, 3.9, 3.9],
      trendChange: 11.4
    },
    {
      country: 'Canada',
      countryCode: 'CA',
      flag: '🇨🇦',
      cpm: 16.5,
      ctr: 1.75,
      cvr: 2.21,
      roas: 3.4,
      trend: [3.0, 3.1, 3.2, 3.3, 3.4, 3.2, 3.5, 3.3, 3.4, 3.3, 3.4, 3.4, 3.4, 3.4],
      trendChange: 13.3
    },
    {
      country: 'Australia',
      countryCode: 'AU',
      flag: '🇦🇺',
      cpm: 13.8,
      ctr: 2.58,
      cvr: 3.12,
      roas: 5.0,
      trend: [4.6, 4.7, 4.8, 4.9, 5.0, 4.8, 5.1, 4.9, 5.0, 4.9, 5.0, 5.0, 5.0, 5.0],
      trendChange: 8.7
    }
  ],
  snapchat: [
    {
      country: 'United States',
      countryCode: 'US',
      flag: '🇺🇸',
      cpm: 9.8,
      ctr: 2.65,
      cvr: 3.45,
      roas: 5.2,
      trend: [4.8, 4.9, 5.0, 5.1, 5.2, 5.0, 5.3, 5.1, 5.2, 5.1, 5.2, 5.2, 5.2, 5.2],
      trendChange: 8.3
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      flag: '🇬🇧',
      cpm: 9.2,
      ctr: 2.89,
      cvr: 3.78,
      roas: 5.8,
      trend: [5.4, 5.5, 5.6, 5.7, 5.8, 5.6, 5.9, 5.7, 5.8, 5.7, 5.8, 5.8, 5.8, 5.8],
      trendChange: 7.4
    },
    {
      country: 'Germany',
      countryCode: 'DE',
      flag: '🇩🇪',
      cpm: 9.1,
      ctr: 2.98,
      cvr: 3.85,
      roas: 5.9,
      trend: [5.5, 5.6, 5.7, 5.8, 5.9, 5.7, 6.0, 5.8, 5.9, 5.8, 5.9, 5.9, 5.9, 5.9],
      trendChange: 7.3
    },
    {
      country: 'France',
      countryCode: 'FR',
      flag: '🇫🇷',
      cpm: 9.7,
      ctr: 2.72,
      cvr: 3.51,
      roas: 5.4,
      trend: [5.0, 5.1, 5.2, 5.3, 5.4, 5.2, 5.5, 5.3, 5.4, 5.3, 5.4, 5.4, 5.4, 5.4],
      trendChange: 8.0
    },
    {
      country: 'Canada',
      countryCode: 'CA',
      flag: '🇨🇦',
      cpm: 10.5,
      ctr: 2.41,
      cvr: 3.12,
      roas: 4.7,
      trend: [4.3, 4.4, 4.5, 4.6, 4.7, 4.5, 4.8, 4.6, 4.7, 4.6, 4.7, 4.7, 4.7, 4.7],
      trendChange: 9.3
    },
    {
      country: 'Australia',
      countryCode: 'AU',
      flag: '🇦🇺',
      cpm: 8.6,
      ctr: 3.28,
      cvr: 4.15,
      roas: 6.7,
      trend: [6.3, 6.4, 6.5, 6.6, 6.7, 6.5, 6.8, 6.6, 6.7, 6.6, 6.7, 6.7, 6.7, 6.7],
      trendChange: 6.3
    }
  ]
};

// Mini trend chart component
const MiniTrendChart = ({ data, change }: { data: number[], change: number }) => {
  const chartData = data.map((value, index) => ({ x: index, y: value }));
  const isPositive = change >= 0;
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="y"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="none"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
        {isPositive ? "+" : ""}{change.toFixed(1)}%
      </Badge>
    </div>
  );
};

const CountryPerformanceTable = ({ platform }: CountryPerformanceTableProps) => {
  const [sortBy, setSortBy] = useState<keyof CountryData>('roas');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const data = countryData[platform] || [];

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    }
    
    return sortOrder === 'desc' 
      ? String(bValue).localeCompare(String(aValue))
      : String(aValue).localeCompare(String(bValue));
  });

  const handleSort = (key: keyof CountryData) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  const formatValue = (value: number, type: 'cpm' | 'ctr' | 'cvr' | 'roas') => {
    switch (type) {
      case 'cpm':
        return `$${value.toFixed(2)}`;
      case 'ctr':
      case 'cvr':
        return `${value.toFixed(2)}%`;
      case 'roas':
        return `${value.toFixed(1)}x`;
      default:
        return value.toString();
    }
  };

  const getSortIcon = (key: keyof CountryData) => {
    if (sortBy !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="inline-block">
          <path fill="currentColor" d="m18 21l-4-4h3V7h-3l4-4l4 4h-3v10h3M2 19v-2h10v2M2 13v-2h7v2M2 7V5h4v2z"/>
        </svg>
      );
    }
    return sortOrder === 'desc' ? '↓' : '↑';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Country Performance Metrics</CardTitle>
        <CardDescription>
          Marketing performance breakdown by country with 30-day trend analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="w-[200px] cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('country')}
                >
                  <div className="flex items-center gap-2">
                    Country {getSortIcon('country')}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('cpm')}
                >
                  <div className="flex items-center justify-end gap-2">
                    CPM {getSortIcon('cpm')}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('ctr')}
                >
                  <div className="flex items-center justify-end gap-2">
                    CTR {getSortIcon('ctr')}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('cvr')}
                >
                  <div className="flex items-center justify-end gap-2">
                    CVR {getSortIcon('cvr')}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('roas')}
                >
                  <div className="flex items-center justify-end gap-2">
                    ROAS {getSortIcon('roas')}
                  </div>
                </TableHead>
                <TableHead className="text-right w-[140px]">
                  30d Trend
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={item.countryCode} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.flag}</span>
                      <span>{item.country}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatValue(item.cpm, 'cpm')}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatValue(item.ctr, 'ctr')}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatValue(item.cvr, 'cvr')}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {formatValue(item.roas, 'roas')}
                  </TableCell>
                  <TableCell className="text-right">
                    <MiniTrendChart data={item.trend} change={item.trendChange} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Table Footer Summary */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500 text-center">
            Showing {sortedData.length} countries • Data updated daily • Click column headers to sort
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryPerformanceTable;