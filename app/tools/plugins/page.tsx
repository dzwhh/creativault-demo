'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type PluginCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  badge?: string;
};

export default function PluginsPage() {
  const router = useRouter();

  const plugins: PluginCard[] = [
    {
      id: 'influencer',
      title: 'Influencer Plugin',
      description: 'Discover and analyze influencers across multiple platforms. Get detailed insights on follower demographics, engagement rates, and collaboration opportunities.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      route: '/tools/influencer-plugin',
      badge: 'Popular',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plugins</h1>
        <p className="text-gray-600">Extend your workflow with powerful plugin tools</p>
      </div>

      {/* Plugin Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.map((plugin) => (
          <div
            key={plugin.id}
            onClick={() => router.push(plugin.route)}
            className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer"
          >
            {/* Badge */}
            {plugin.badge && (
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {plugin.badge}
                </span>
              </div>
            )}

            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
              {plugin.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {plugin.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {plugin.description}
            </p>

            {/* Arrow Icon */}
            <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-medium">Open Plugin</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
