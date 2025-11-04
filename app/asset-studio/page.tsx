'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AssetStudioPage() {
  const router = useRouter();
  const features = [
    {
      id: 'auto-report',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Auto Report',
      description: 'Generate and analyze performance reports for your assets automatically.',
      buttonText: 'View Reports',
      buttonIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      ),
    },
    {
      id: 'expert-collaboration',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Influencer Submission',
      description: 'Collaborate with influencers to produce authentic content.',
      buttonText: 'Start Collaborating',
      buttonIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      ),
    },
    {
      id: 'creative-production',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: 'Creative Production',
      description: 'Access powerful tools to build and edit compelling ad creatives.',
      buttonText: 'Create Now',
      buttonIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      ),
    },
    {
      id: 'ad-placement',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      title: 'Ad Placement',
      description: 'Launch, manage, and optimize your ad campaigns across multiple channels.',
      buttonText: 'Launch Campaign',
      buttonIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      ),
    },
  ];

  const handleFeatureClick = (featureId: string) => {
    console.log('Feature clicked:', featureId);
    
    // Navigate to respective feature page
    if (featureId === 'expert-collaboration') {
      router.push('/asset-studio/influencer-submission');
    }
    // Add other feature navigations here
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="bg-white px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Asset Studio</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Your central workspace for creating, managing, and deploying maketing assets.
        </p>
      </div>

      {/* Features Grid */}
      <div className="flex-1 px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="bg-white rounded-xl p-6 flex flex-col hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 flex-1">
                {feature.description}
              </p>

              {/* Action Button */}
              <Button
                onClick={() => handleFeatureClick(feature.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {feature.buttonText}
                {feature.buttonIcon}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
