'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Search,
  Users,
  Heart,
  Eye,
  Mail,
  ExternalLink,
  Check,
  Plus,
  X,
  ChevronRight,
  Sparkles,
  Target,
  TrendingUp,
  Hash,
  Globe,
  Star,
  Bookmark,
  Share2,
  RefreshCw,
  ArrowRight,
  Zap,
  UserPlus,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

// Platform types
type Platform = 'tiktok' | 'instagram' | 'youtube';
type ViewMode = 'capture' | 'lookalike' | 'results';

// Influencer interface
interface Influencer {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  platform: Platform;
  followers: string;
  followersNum: number;
  engagement: string;
  avgViews: string;
  region: string;
  bio: string;
  email?: string;
  hashtags: string[];
  isShortlisted: boolean;
  matchScore?: number;
}

// Mock data for demonstration
const mockCurrentInfluencer: Influencer = {
  id: '1',
  username: '@fashionista_emma',
  displayName: 'Emma Style',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  platform: 'tiktok',
  followers: '2.5M',
  followersNum: 2500000,
  engagement: '8.2%',
  avgViews: '450K',
  region: 'United States',
  bio: 'Fashion & Lifestyle | Brand Collaborations',
  email: 'emma@fashion.com',
  hashtags: ['fashion', 'ootd', 'style', 'beauty', 'lifestyle'],
  isShortlisted: false,
};

const mockLookalikeInfluencers: Influencer[] = [
  {
    id: '2',
    username: '@style_queen_lisa',
    displayName: 'Lisa Fashion',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    platform: 'tiktok',
    followers: '1.8M',
    followersNum: 1800000,
    engagement: '7.5%',
    avgViews: '380K',
    region: 'United Kingdom',
    bio: 'Fashion Content Creator',
    hashtags: ['fashion', 'style', 'outfit'],
    isShortlisted: false,
    matchScore: 95,
  },
  {
    id: '3',
    username: '@trendy_sophie',
    displayName: 'Sophie Trends',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    platform: 'instagram',
    followers: '3.2M',
    followersNum: 3200000,
    engagement: '6.8%',
    avgViews: '520K',
    region: 'Canada',
    bio: 'Fashion Influencer | Lifestyle',
    hashtags: ['fashion', 'ootd', 'beauty'],
    isShortlisted: false,
    matchScore: 92,
  },
  {
    id: '4',
    username: '@fashion_mike',
    displayName: 'Mike Style',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    platform: 'youtube',
    followers: '890K',
    followersNum: 890000,
    engagement: '9.1%',
    avgViews: '210K',
    region: 'Australia',
    bio: 'Mens Fashion & Grooming',
    hashtags: ['mensfashion', 'style', 'grooming'],
    isShortlisted: false,
    matchScore: 88,
  },
  {
    id: '5',
    username: '@chic_anna',
    displayName: 'Anna Chic',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    platform: 'tiktok',
    followers: '1.2M',
    followersNum: 1200000,
    engagement: '8.9%',
    avgViews: '290K',
    region: 'Germany',
    bio: 'Sustainable Fashion Advocate',
    hashtags: ['sustainablefashion', 'eco', 'style'],
    isShortlisted: false,
    matchScore: 85,
  },
  {
    id: '6',
    username: '@glam_jessica',
    displayName: 'Jessica Glam',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    platform: 'instagram',
    followers: '2.1M',
    followersNum: 2100000,
    engagement: '7.2%',
    avgViews: '410K',
    region: 'France',
    bio: 'Beauty & Fashion Expert',
    hashtags: ['beauty', 'fashion', 'makeup'],
    isShortlisted: false,
    matchScore: 82,
  },
];

const popularHashtags = [
  'fashion', 'beauty', 'lifestyle', 'ootd', 'style', 
  'makeup', 'skincare', 'fitness', 'travel', 'food',
  'tech', 'gaming', 'music', 'dance', 'comedy'
];

// Platform icon component
const PlatformIcon = ({ platform, className }: { platform: Platform; className?: string }) => {
  const icons = {
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-4 h-4", className)}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-4 h-4", className)}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-4 h-4", className)}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  };
  return icons[platform];
};

// Platform color class
const getPlatformColor = (platform: Platform) => {
  const colors = {
    tiktok: 'text-plugin-tiktok',
    instagram: 'text-plugin-instagram', 
    youtube: 'text-plugin-youtube',
  };
  return colors[platform];
};

const getPlatformBgColor = (platform: Platform) => {
  const colors = {
    tiktok: 'bg-rose-500',
    instagram: 'bg-pink-500',
    youtube: 'bg-red-500',
  };
  return colors[platform];
};

export default function InfluencerPluginPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('capture');
  const [currentInfluencer, setCurrentInfluencer] = useState<Influencer>(mockCurrentInfluencer);
  const [lookalikeInfluencers, setLookalikeInfluencers] = useState<Influencer[]>(mockLookalikeInfluencers);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>(['fashion', 'style']);
  const [customHashtag, setCustomHashtag] = useState('');
  const [shortlistedInfluencers, setShortlistedInfluencers] = useState<Influencer[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoadingLookalike, setIsLoadingLookalike] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  // Toggle hashtag selection
  const toggleHashtag = useCallback((tag: string) => {
    setSelectedHashtags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  // Add custom hashtag
  const addCustomHashtag = useCallback(() => {
    if (customHashtag && !selectedHashtags.includes(customHashtag.toLowerCase())) {
      setSelectedHashtags(prev => [...prev, customHashtag.toLowerCase()]);
      setCustomHashtag('');
    }
  }, [customHashtag, selectedHashtags]);

  // Toggle shortlist
  const toggleShortlist = useCallback((influencer: Influencer) => {
    setLookalikeInfluencers(prev => 
      prev.map(inf => 
        inf.id === influencer.id 
          ? { ...inf, isShortlisted: !inf.isShortlisted }
          : inf
      )
    );
    
    setShortlistedInfluencers(prev => {
      const exists = prev.find(inf => inf.id === influencer.id);
      if (exists) {
        return prev.filter(inf => inf.id !== influencer.id);
      }
      return [...prev, { ...influencer, isShortlisted: true }];
    });
  }, []);

  // Simulate scanning
  const handleScan = useCallback(() => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setViewMode('lookalike');
    }, 1500);
  }, []);

  // Simulate lookalike search
  const handleFindLookalike = useCallback(() => {
    setIsLoadingLookalike(true);
    setTimeout(() => {
      setIsLoadingLookalike(false);
      setViewMode('results');
    }, 2000);
  }, []);

  // Sync to product
  const handleSyncToProduct = useCallback(() => {
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 3000);
  }, []);

  // Shortlist current influencer
  const handleShortlistCurrent = useCallback(() => {
    const exists = shortlistedInfluencers.find(inf => inf.id === currentInfluencer.id);
    if (!exists) {
      setShortlistedInfluencers(prev => [...prev, { ...currentInfluencer, isShortlisted: true }]);
      setCurrentInfluencer(prev => ({ ...prev, isShortlisted: true }));
    }
  }, [currentInfluencer, shortlistedInfluencers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl plugin-gradient flex items-center justify-center plugin-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Influencer Scout</h1>
              <p className="text-sm text-slate-500">Chrome Extension</p>
            </div>
          </div>
        </div>

        {/* Main Plugin Card - Simulating Chrome Extension Popup */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-plugin-lg overflow-hidden fade-in-up stagger-1">
          {/* Plugin Header */}
          <div className="plugin-gradient px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">Influencer Detected</h2>
                  <p className="text-white/70 text-xs">Profile page recognized</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={cn(
                  "text-xs font-medium",
                  getPlatformBgColor(currentInfluencer.platform),
                  "text-white border-0"
                )}>
                  <PlatformIcon platform={currentInfluencer.platform} className="w-3 h-3 mr-1" />
                  {currentInfluencer.platform.charAt(0).toUpperCase() + currentInfluencer.platform.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100">
            {[
              { mode: 'capture' as ViewMode, label: 'Capture', icon: Eye },
              { mode: 'lookalike' as ViewMode, label: 'Hashtags', icon: Hash },
              { mode: 'results' as ViewMode, label: 'Lookalike', icon: Users },
            ].map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
                  viewMode === mode 
                    ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50/50"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-5">
            {/* Capture View */}
            {viewMode === 'capture' && (
              <div className="space-y-5 fade-in-up">
                {/* Current Influencer Card */}
                <div className="plugin-card p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img 
                        src={currentInfluencer.avatar} 
                        alt={currentInfluencer.displayName}
                        className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-100"
                      />
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
                        getPlatformBgColor(currentInfluencer.platform)
                      )}>
                        <PlatformIcon platform={currentInfluencer.platform} className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-800 truncate">{currentInfluencer.displayName}</h3>
                        {currentInfluencer.isShortlisted && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{currentInfluencer.username}</p>
                      <p className="text-xs text-slate-400 line-clamp-2">{currentInfluencer.bio}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{currentInfluencer.followers}</div>
                      <div className="text-xs text-slate-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{currentInfluencer.engagement}</div>
                      <div className="text-xs text-slate-500">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{currentInfluencer.avgViews}</div>
                      <div className="text-xs text-slate-500">Avg Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800 flex items-center justify-center gap-1">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div className="text-xs text-slate-500">{currentInfluencer.region}</div>
                    </div>
                  </div>

                  {/* Contact & Actions */}
                  {currentInfluencer.email && (
                    <div className="flex items-center gap-2 mt-4 p-3 bg-slate-50 rounded-lg">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{currentInfluencer.email}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={handleShortlistCurrent}
                    variant="outline" 
                    className={cn(
                      "flex-1 h-11 font-medium transition-all duration-200",
                      currentInfluencer.isShortlisted 
                        ? "border-green-200 bg-green-50 text-green-600"
                        : "border-slate-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    )}
                  >
                    {currentInfluencer.isShortlisted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Shortlisted
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 mr-2" />
                        Shortlist
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleScan}
                    disabled={isScanning}
                    className="flex-1 h-11 plugin-btn-primary"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Find Similar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Hashtag Selection View */}
            {viewMode === 'lookalike' && (
              <div className="space-y-5 fade-in-up">
                {/* Selected Hashtags */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-700">Selected Hashtags</h3>
                    <span className="text-xs text-slate-400">{selectedHashtags.length} selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2 min-h-[44px] p-3 bg-slate-50 rounded-xl border border-slate-100">
                    {selectedHashtags.length === 0 ? (
                      <span className="text-sm text-slate-400">Select hashtags to refine search</span>
                    ) : (
                      selectedHashtags.map(tag => (
                        <span 
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-full"
                        >
                          #{tag}
                          <button 
                            onClick={() => toggleHashtag(tag)}
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Add Custom Hashtag */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Add Custom Hashtag</h3>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        value={customHashtag}
                        onChange={(e) => setCustomHashtag(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                        onKeyPress={(e) => e.key === 'Enter' && addCustomHashtag()}
                        placeholder="Enter hashtag"
                        className="pl-9 h-10 border-slate-200 focus:border-blue-300 focus:ring-blue-100"
                      />
                    </div>
                    <Button 
                      onClick={addCustomHashtag}
                      variant="outline"
                      className="h-10 px-4 border-slate-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Popular Hashtags */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Popular Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularHashtags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleHashtag(tag)}
                        className={cn(
                          "plugin-tag",
                          selectedHashtags.includes(tag) && "selected"
                        )}
                      >
                        <Hash className="w-3 h-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Find Lookalike Button */}
                <Button 
                  onClick={handleFindLookalike}
                  disabled={isLoadingLookalike || selectedHashtags.length === 0}
                  className="w-full h-12 plugin-btn-primary text-base"
                >
                  {isLoadingLookalike ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Finding Similar Creators...
                    </>
                  ) : (
                    <>
                      <Users className="w-5 h-5 mr-2" />
                      Find Lookalike Influencers
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Results View */}
            {viewMode === 'results' && (
              <div className="space-y-4 fade-in-up">
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">Similar Influencers</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{lookalikeInfluencers.length} creators found</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-500 hover:text-blue-600"
                    onClick={() => setViewMode('lookalike')}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refine
                  </Button>
                </div>

                {/* Influencer List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {lookalikeInfluencers.map((influencer, index) => (
                    <div 
                      key={influencer.id}
                      className={cn(
                        "plugin-card p-4 fade-in-up",
                        `stagger-${Math.min(index + 1, 4)}`
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={influencer.avatar} 
                            alt={influencer.displayName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className={cn(
                            "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                            getPlatformBgColor(influencer.platform)
                          )}>
                            <PlatformIcon platform={influencer.platform} className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-slate-800 truncate text-sm">{influencer.displayName}</h4>
                            {influencer.matchScore && (
                              <Badge className="bg-green-100 text-green-700 border-0 text-xs px-1.5 py-0">
                                {influencer.matchScore}% match
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">{influencer.username}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Users className="w-3 h-3" />
                              {influencer.followers}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <TrendingUp className="w-3 h-3" />
                              {influencer.engagement}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Globe className="w-3 h-3" />
                              {influencer.region}
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleShortlist(influencer)}
                          className={cn(
                            "h-8 w-8 p-0 transition-all duration-200",
                            influencer.isShortlisted 
                              ? "text-green-500 bg-green-50 hover:bg-green-100"
                              : "text-slate-400 hover:text-blue-500 hover:bg-blue-50"
                          )}
                        >
                          {influencer.isShortlisted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <Button 
                  variant="outline" 
                  className="w-full border-dashed border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Load More Similar Creators
                </Button>
              </div>
            )}
          </div>

          {/* Footer - Shortlist Summary */}
          {shortlistedInfluencers.length > 0 && (
            <div className="border-t border-slate-100 p-4 bg-slate-50/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Shortlist ({shortlistedInfluencers.length})
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {shortlistedInfluencers.slice(0, 5).map(inf => (
                    <img 
                      key={inf.id}
                      src={inf.avatar}
                      alt={inf.displayName}
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  {shortlistedInfluencers.length > 5 && (
                    <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
                      +{shortlistedInfluencers.length - 5}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSyncToProduct}
                  className={cn(
                    "flex-1 h-10 transition-all duration-200",
                    syncSuccess 
                      ? "bg-green-500 hover:bg-green-600"
                      : "plugin-btn-primary"
                  )}
                >
                  {syncSuccess ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Synced Successfully!
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Sync to CreatiVault
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  className="h-10 px-4 border-slate-200 hover:border-blue-200 hover:bg-blue-50"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              {syncSuccess && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1 pulse-guide">
                  <span>👉</span>
                  <a href="#" className="hover:underline">View in CreatiVault Dashboard</a>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Preview Panel - Shows when there are shortlisted influencers */}
        {shortlistedInfluencers.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl border border-slate-200/60 shadow-plugin overflow-hidden fade-in-up stagger-2">
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-slate-800">Shortlist Preview</h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  {shortlistedInfluencers.length} influencers
                </Badge>
              </div>
            </div>
            
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-slate-100">
                      <th className="text-left pb-3 font-medium">Influencer</th>
                      <th className="text-left pb-3 font-medium">Platform</th>
                      <th className="text-right pb-3 font-medium">Followers</th>
                      <th className="text-right pb-3 font-medium">Engagement</th>
                      <th className="text-right pb-3 font-medium">Avg Views</th>
                      <th className="text-left pb-3 font-medium">Region</th>
                      <th className="text-center pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shortlistedInfluencers.map((inf, index) => (
                      <tr 
                        key={inf.id}
                        className={cn(
                          "fade-in-up border-b border-slate-50 last:border-0",
                          `stagger-${Math.min(index + 1, 4)}`
                        )}
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <img 
                              src={inf.avatar}
                              alt={inf.displayName}
                              className="w-9 h-9 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium text-sm text-slate-800">{inf.displayName}</div>
                              <div className="text-xs text-slate-500">{inf.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className={cn(
                            "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                            inf.platform === 'tiktok' && "bg-rose-100 text-rose-600",
                            inf.platform === 'instagram' && "bg-pink-100 text-pink-600",
                            inf.platform === 'youtube' && "bg-red-100 text-red-600",
                          )}>
                            <PlatformIcon platform={inf.platform} className="w-3 h-3" />
                            {inf.platform}
                          </div>
                        </td>
                        <td className="py-3 text-right font-medium text-sm text-slate-800">{inf.followers}</td>
                        <td className="py-3 text-right font-medium text-sm text-green-600">{inf.engagement}</td>
                        <td className="py-3 text-right text-sm text-slate-600">{inf.avgViews}</td>
                        <td className="py-3 text-sm text-slate-600">{inf.region}</td>
                        <td className="py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-7 w-7 p-0 text-slate-400 hover:text-blue-500"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => toggleShortlist(inf)}
                              className="h-7 w-7 p-0 text-slate-400 hover:text-red-500"
                            >
                              <X className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
