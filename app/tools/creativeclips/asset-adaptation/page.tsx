'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  UploadIcon, 
  ImageIcon, 
  VideoIcon,
  DownloadIcon,
  GridIcon,
  ListIcon,
  CheckIcon,
  PlayIcon,
  ZapIcon
} from 'lucide-react';

// Types
type AssetType = 'image' | 'video';
type Platform = 'meta' | 'tiktok' | 'snapchat' | 'default';
type ViewMode = 'card' | 'table';

interface AspectRatioOption {
  id: string;
  ratio: string;
  resolution: string;
  icon: 'square' | 'portrait' | 'landscape' | 'vertical';
  label: string;
}

// Color Constants - Design System
const colors = {
  primary: '#2F6BED',      // 主蓝
  primaryLight: 'rgba(47, 107, 237, 0.1)',
  primaryHover: '#2563EB',
  secondary: '#7A5AF8',    // 柔和紫（仅点缀）
  success: '#10B981',      // 青绿
  warning: '#F59E0B',      // 橙
  error: '#EF4444',        // 红
  textPrimary: '#111827',  // 主文本
  textSecondary: '#6B7280', // 次级文本
  border: '#E5E7EB',       // 边框
  background: '#F9FAFB',   // 背景
};

// Aspect ratio configurations
const aspectRatios: AspectRatioOption[] = [
  { id: '1:1', ratio: '1:1', resolution: '1080 × 1080', icon: 'square', label: 'Square' },
  { id: '4:5', ratio: '4:5', resolution: '1080 × 1350', icon: 'portrait', label: 'Portrait' },
  { id: '9:16', ratio: '9:16', resolution: '1080 × 1920', icon: 'vertical', label: 'Story' },
  { id: '16:9-feed', ratio: '16:9', resolution: '1200 × 628', icon: 'landscape', label: 'Feed' },
  { id: '16:9-full', ratio: '16:9', resolution: '1920 × 1080', icon: 'landscape', label: 'Full HD' },
];

// Platform icons with brand colors
const PlatformIcon = ({ platform, className = "w-6 h-6", selected = false }: { platform: Platform; className?: string; selected?: boolean }) => {
  // Platform brand colors
  const brandColors: Record<Platform, string> = {
    meta: '#1877F2',
    tiktok: '#000000',
    snapchat: '#FFFC00',
    default: selected ? colors.primary : '#6B7280',
  };
  
  switch (platform) {
    case 'meta':
      return (
        <svg className={className} viewBox="0 0 24 24" fill={brandColors.meta}>
          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={className} viewBox="0 0 24 24" fill={brandColors.tiktok}>
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      );
    case 'snapchat':
      return (
        <svg className={className} viewBox="0 0 24 24" fill={brandColors.snapchat} stroke="#000" strokeWidth="0.5">
          <path d="M12.206 1c.652 0 2.486.1 3.84 1.37.976.92 1.471 2.18 1.471 3.74v.24c0 .18-.007.38-.015.58-.01.29-.02.6-.02.82 0 .36.074.48.148.5.14.04.36.01.7-.1.15-.05.31-.09.48-.09.17 0 .34.03.5.1.36.14.54.42.54.73 0 .52-.59.8-.77.88-.09.04-.17.07-.27.11-.32.12-.79.3-.92.5-.08.14-.07.39.04.75l.02.05c.38 1.12.93 2.03 1.62 2.72.29.29.61.54.97.76.3.18.62.33.97.46.12.04.29.1.4.17.33.19.47.44.47.7 0 .36-.29.68-.89.9-.25.1-.54.17-.83.25-.2.05-.4.11-.58.18-.34.13-.47.28-.51.36-.12.24-.02.59.19 1.01.08.16.17.31.17.52 0 .37-.26.65-.58.8-.2.1-.43.15-.67.2-.33.05-.66.11-.93.2-.12.04-.24.1-.35.18-.27.19-.38.42-.56.87-.18.46-.42 1.03-.96 1.5-.57.5-1.27.59-1.81.59-.2 0-.38-.01-.53-.03-.7-.08-1.33-.34-1.87-.56-.37-.15-.72-.3-1.02-.37-.12-.03-.25-.04-.38-.04-.18 0-.37.02-.57.06-.41.08-.78.26-1.2.46-.6.28-1.27.6-2.13.6-.05 0-.1 0-.15 0-.48-.02-.96-.14-1.39-.36-.46-.23-.82-.56-1.04-.96-.17-.3-.28-.64-.28-1.01 0-.14.01-.28.05-.42.14-.58.51-.99.82-1.34.08-.09.16-.18.23-.27.23-.3.31-.49.31-.6 0-.03 0-.07-.03-.14-.11-.24-.43-.36-.74-.47-.08-.03-.16-.06-.24-.09-.51-.19-1.5-.57-1.62-1.35-.01-.08-.02-.16-.02-.24 0-.35.13-.7.4-.98.14-.15.32-.27.55-.35.16-.06.34-.09.53-.09.23 0 .44.04.62.1.37.12.65.15.82.09.06-.03.07-.05.07-.11l-.01-.1c-.01-.24-.02-.47-.02-.7 0-.35-.01-.67-.02-.97-.01-.2-.01-.4-.01-.58 0-1.56.48-2.81 1.44-3.72C9.65 1.11 11.52 1 12.21 1z"/>
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={brandColors.default} strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
      );
  }
};

// Platform options
const platforms: { id: Platform; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'meta', label: 'Meta' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'snapchat', label: 'Snapchat' },
];

// Language options
const languages = [
  { id: 'en', label: 'English' },
  { id: 'ar', label: 'Arabic' },
  { id: 'zh', label: 'Chinese' },
  { id: 'es', label: 'Spanish' },
];

// Country/Region options
const regions = [
  { id: 'global', label: 'Global' },
  { id: 'sa', label: 'Saudi Arabia' },
  { id: 'qa', label: 'Qatar' },
  { id: 'ae', label: 'UAE' },
  { id: 'us', label: 'United States' },
];

// Aspect ratio icon component - using primary blue when selected
const AspectRatioIcon = ({ type, selected }: { type: string; selected: boolean }) => {
  const strokeColor = selected ? colors.primary : '#9CA3AF';
  const fillColor = selected ? colors.primaryLight : 'none';
  
  switch (type) {
    case 'square':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="14" height="14" rx="2" strokeWidth="1.5" stroke={strokeColor} fill={fillColor} />
        </svg>
      );
    case 'portrait':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="4" y="2" width="12" height="16" rx="2" strokeWidth="1.5" stroke={strokeColor} fill={fillColor} />
        </svg>
      );
    case 'vertical':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="5" y="1" width="10" height="18" rx="2" strokeWidth="1.5" stroke={strokeColor} fill={fillColor} />
        </svg>
      );
    case 'landscape':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="1" y="5" width="18" height="10" rx="2" strokeWidth="1.5" stroke={strokeColor} fill={fillColor} />
        </svg>
      );
    default:
      return null;
  }
};

export default function AssetAdaptationPage() {
  const router = useRouter();
  
  // States
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [assetType, setAssetType] = useState<AssetType>('image');
  const [platform, setPlatform] = useState<Platform>('default');
  const [region, setRegion] = useState<string>('global');
  const [language, setLanguage] = useState<string>('en');
  const [selectedRatios, setSelectedRatios] = useState<string[]>(aspectRatios.map(r => r.id));
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [generatedAssets, setGeneratedAssets] = useState<string[]>([]);
  const [duration, setDuration] = useState('6s');

  // Toggle aspect ratio selection
  const toggleRatio = (ratioId: string) => {
    setSelectedRatios(prev => {
      if (prev.includes(ratioId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(r => r !== ratioId);
      }
      return [...prev, ratioId];
    });
  };

  // Select all ratios
  const selectAllRatios = () => {
    setSelectedRatios(aspectRatios.map(r => r.id));
  };

  // Handle generation
  const handleGenerate = async () => {
    if (!uploadedFile) {
      alert('Please upload a reference file');
      return;
    }
    
    setIsGenerating(true);
    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedAssets(selectedRatios);
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: colors.border }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/tools/creativeclips')}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}
          >
            <ArrowLeftIcon className="w-5 h-5" style={{ color: colors.textSecondary }} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-sm">
              <a href="/tools/creativeclips" className="hover:underline" style={{ color: colors.primary }}>Creative Clips</a>
              <span style={{ color: colors.textSecondary }}>/</span>
              <span className="font-medium" style={{ color: colors.textPrimary }}>Asset Adaptation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Configuration */}
        <div className="w-[380px] border-r bg-white overflow-y-auto p-6 " style={{ borderColor: colors.border }}>
          
          {/* Upload Reference - Required */}
          <div className="bg-white rounded-2xl p-5">
            <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>
              Upload Reference
              <span className="ml-1" style={{ color: colors.error }}>*</span>
            </label>
            <div 
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                uploadedFile ? '' : 'hover:border-[#2F6BED]'
              }`}
              style={{ 
                borderColor: uploadedFile ? colors.primary : colors.border,
                backgroundColor: uploadedFile ? colors.primaryLight : 'transparent'
              }}
              onClick={() => document.getElementById('ref-upload')?.click()}
            >
              <input
                id="ref-upload"
                type="file"
                accept=".psd,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
              />
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.primaryLight }}>
                    <CheckIcon className="w-6 h-6" style={{ color: colors.success }} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm" style={{ color: colors.textPrimary }}>{uploadedFile.name}</p>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <UploadIcon className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>Click to upload or drag image here</p>
                  <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>Support: PSD, JPG, PNG | Max: 50 MB</p>
                </>
              )}
            </div>
          </div>

          {/* Asset Type Tabs */}
          <div className="bg-white rounded-2xl p-5">
            <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>Asset Type</label>
            <div className="bg-gray-100 p-1 rounded-xl flex">
              <button
                onClick={() => setAssetType('image')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  assetType === 'image' ? 'bg-white shadow-sm' : ''
                }`}
                style={{ color: assetType === 'image' ? colors.primary : colors.textSecondary }}
              >
                <ImageIcon className="w-4 h-4" />
                Image
              </button>
              <button
                onClick={() => setAssetType('video')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  assetType === 'video' ? 'bg-white shadow-sm' : ''
                }`}
                style={{ color: assetType === 'video' ? colors.primary : colors.textSecondary }}
              >
                <VideoIcon className="w-4 h-4" />
                Video
              </button>
            </div>
          </div>

          {/* Image specific options */}
          {assetType === 'image' && (
            <>
              {/* Platform */}
              <div className="bg-white rounded-2xl p-5">
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>Platform</label>
                <div className="grid grid-cols-4 gap-2">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all relative ${
                        platform === p.id ? 'shadow-sm' : 'hover:border-gray-300'
                      }`}
                      style={{ 
                        borderColor: platform === p.id ? colors.primary : colors.border,
                        backgroundColor: platform === p.id ? colors.primaryLight : 'white'
                      }}
                    >
                      {/* Selection ring for selected platform */}
                      {platform === p.id && (
                        <div 
                          className="absolute inset-0 rounded-xl ring-2 ring-offset-1 pointer-events-none"
                          style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}
                        />
                      )}
                      <PlatformIcon platform={p.id} className="w-6 h-6" selected={platform === p.id} />
                      <span className="text-xs font-medium" style={{ color: platform === p.id ? colors.primary : colors.textSecondary }}>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Region - Optional */}
              <div className="bg-white rounded-2xl p-5">
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>
                  Region
                  <span className="font-normal ml-1" style={{ color: colors.textSecondary }}>(Optional)</span>
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none transition-all focus:ring-2"
                  style={{ 
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    '--tw-ring-color': colors.primary
                  } as React.CSSProperties}
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div className="bg-white rounded-2xl p-5">
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none transition-all focus:ring-2"
                  style={{ 
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    '--tw-ring-color': colors.primary
                  } as React.CSSProperties}
                >
                  {languages.map((l) => (
                    <option key={l.id} value={l.id}>{l.label}</option>
                  ))}
                </select>
              </div>

              {/* Aspect Ratio */}
              <div className="bg-white rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold" style={{ color: colors.textPrimary }}>Aspect Ratio</label>
                  <button
                    onClick={selectAllRatios}
                    className="text-xs font-medium underline hover:no-underline transition-all"
                    style={{ color: colors.primary }}
                  >
                    Select All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aspectRatios.map((ratio) => {
                    const isSelected = selectedRatios.includes(ratio.id);
                    return (
                      <button
                        key={ratio.id}
                        onClick={() => toggleRatio(ratio.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all ${
                          isSelected ? 'shadow-sm' : 'hover:border-gray-300'
                        }`}
                        style={{ 
                          borderColor: isSelected ? colors.primary : colors.border,
                          backgroundColor: isSelected ? colors.primaryLight : 'white'
                        }}
                      >
                        <AspectRatioIcon type={ratio.icon} selected={isSelected} />
                        <div className="text-left">
                          <div className="text-xs font-semibold" style={{ color: isSelected ? colors.primary : colors.textPrimary }}>{ratio.ratio}</div>
                          <div className="text-[10px]" style={{ color: colors.textSecondary }}>{ratio.resolution}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Description */}
              <div className="bg-white rounded-2xl p-5">
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>Image Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Describe your desired image (e.g., "A cartoon dog playing fetch with a yarn ball")'
                  className="w-full h-28 px-4 py-3 rounded-xl border bg-white text-sm resize-none outline-none transition-all focus:ring-2"
                  style={{ 
                    borderColor: colors.border,
                    color: colors.textPrimary,
                    '--tw-ring-color': colors.primary
                  } as React.CSSProperties}
                />
                <div className="text-right text-xs mt-1" style={{ color: colors.textSecondary }}>{description.length}/5000</div>
              </div>
            </>
          )}

          {/* Video specific options */}
          {assetType === 'video' && (
            <>
              {/* Platform */}
              <div className="bg-white rounded-2xl p-5">
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>Platform</label>
                <div className="grid grid-cols-4 gap-2">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all relative ${
                        platform === p.id ? 'shadow-sm' : 'hover:border-gray-300'
                      }`}
                      style={{ 
                        borderColor: platform === p.id ? colors.primary : colors.border,
                        backgroundColor: platform === p.id ? colors.primaryLight : 'white'
                      }}
                    >
                      {platform === p.id && (
                        <div 
                          className="absolute inset-0 rounded-xl ring-2 ring-offset-1 pointer-events-none"
                          style={{ '--tw-ring-color': colors.primary } as React.CSSProperties}
                        />
                      )}
                      <PlatformIcon platform={p.id} className="w-6 h-6" selected={platform === p.id} />
                      <span className="text-xs font-medium" style={{ color: platform === p.id ? colors.primary : colors.textSecondary }}>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio for Video */}
              <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: colors.border }}>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold" style={{ color: colors.textPrimary }}>Aspect Ratio</label>
                  <button
                    onClick={selectAllRatios}
                    className="text-xs font-medium underline hover:no-underline transition-all"
                    style={{ color: colors.primary }}
                  >
                    Select All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aspectRatios.filter(r => r.id !== '4:5').map((ratio) => {
                    const isSelected = selectedRatios.includes(ratio.id);
                    return (
                      <button
                        key={ratio.id}
                        onClick={() => toggleRatio(ratio.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all ${
                          isSelected ? 'shadow-sm' : 'hover:border-gray-300'
                        }`}
                        style={{ 
                          borderColor: isSelected ? colors.primary : colors.border,
                          backgroundColor: isSelected ? colors.primaryLight : 'white'
                        }}
                      >
                        <AspectRatioIcon type={ratio.icon} selected={isSelected} />
                        <div className="text-left">
                          <div className="text-xs font-semibold" style={{ color: isSelected ? colors.primary : colors.textPrimary }}>{ratio.ratio}</div>
                          <div className="text-[10px]" style={{ color: colors.textSecondary }}>{ratio.resolution}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration */}
              <div className="bg-white rounded-2xl p-5">
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>Duration</label>
                <div className="bg-gray-100 p-1 rounded-xl flex">
                  {['6s', '15s', '30s'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        duration === d ? 'bg-white shadow-sm' : ''
                      }`}
                      style={{ color: duration === d ? colors.primary : colors.textSecondary }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Start Button */}
          <button
            onClick={handleGenerate}
            disabled={!uploadedFile || isGenerating}
            className={`w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
              !uploadedFile || isGenerating ? 'cursor-not-allowed opacity-40' : 'hover:opacity-90 shadow-lg'
            }`}
            style={{ 
              backgroundColor: uploadedFile && !isGenerating ? colors.primary : '#9CA3AF',
              boxShadow: uploadedFile && !isGenerating ? `0 10px 25px -5px ${colors.primary}40` : 'none'
            }}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ZapIcon className="w-5 h-5" />
                Start Generation
              </>
            )}
          </button>
        </div>

        {/* Right Panel - Output */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: colors.background }}>
          {/* Output Header */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between z-10" style={{ borderColor: colors.border }}>
            <div className="flex items-center gap-3">
              <h2 className="font-semibold" style={{ color: colors.textPrimary }}>Output Preview</h2>
              {generatedAssets.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full" style={{ backgroundColor: colors.primaryLight, color: colors.primary }}>
                  {generatedAssets.length} assets
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="bg-gray-100 p-1 rounded-lg flex">
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'card' ? 'bg-white shadow-sm' : ''
                  }`}
                  style={{ color: viewMode === 'card' ? colors.primary : colors.textSecondary }}
                >
                  <GridIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'table' ? 'bg-white shadow-sm' : ''
                  }`}
                  style={{ color: viewMode === 'table' ? colors.primary : colors.textSecondary }}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
              
              {/* Download Button */}
              <button
                disabled={generatedAssets.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  generatedAssets.length === 0 ? 'cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ 
                  backgroundColor: generatedAssets.length > 0 ? colors.primary : '#E5E7EB',
                  color: generatedAssets.length > 0 ? 'white' : colors.textSecondary
                }}
              >
                <DownloadIcon className="w-4 h-4" />
                Download PSD
              </button>
            </div>
          </div>

          {/* Output Content */}
          <div className="p-6">
            {generatedAssets.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center h-[500px] text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-4">
                  <ImageIcon className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.textPrimary }}>Ready to Generate</h3>
                <p className="text-sm max-w-sm" style={{ color: colors.textSecondary }}>
                  Upload a reference file and configure your settings in the left panel, then click "Start Generation" to create your assets.
                </p>
              </div>
            ) : viewMode === 'card' ? (
              /* Card View */
              <div className="grid grid-cols-3 gap-4">
                {generatedAssets.map((ratioId) => {
                  const ratio = aspectRatios.find(r => r.id === ratioId);
                  if (!ratio) return null;
                  
                  return (
                    <div key={ratioId} className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-shadow" style={{ borderColor: colors.border }}>
                      {/* Preview with Safe Zone */}
                      <div className="relative bg-gray-100 p-4">
                        <div 
                          className={`relative mx-auto rounded-lg overflow-hidden ${
                            ratio.icon === 'square' ? 'aspect-square w-32' :
                            ratio.icon === 'portrait' ? 'aspect-[4/5] w-28' :
                            ratio.icon === 'vertical' ? 'aspect-[9/16] w-24' :
                            'aspect-video w-40'
                          }`}
                          style={{ backgroundColor: colors.primaryLight }}
                        >
                          {/* Safe Zone - Regular */}
                          <div className="absolute inset-2 border-2 border-dashed rounded" style={{ borderColor: `${colors.success}80` }} />
                          {/* Safe Zone - TT Version (for 9:16) */}
                          {ratio.id === '9:16' && platform === 'tiktok' && (
                            <div className="absolute inset-x-2 top-8 bottom-12 border-2 border-dashed rounded" style={{ borderColor: `${colors.warning}80` }} />
                          )}
                          {/* Preview Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <AspectRatioIcon type={ratio.icon} selected={true} />
                          </div>
                        </div>
                        {/* Ratio Badge */}
                        <div className="absolute top-2 right-2 px-2 py-1 text-white text-xs font-bold rounded-lg" style={{ backgroundColor: colors.primary }}>
                          {ratio.ratio}
                        </div>
                      </div>
                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold" style={{ color: colors.textPrimary }}>{ratio.label}</span>
                          <span className="text-xs" style={{ color: colors.textSecondary }}>{ratio.resolution}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs" style={{ color: colors.success }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.success }} />
                            Safe Zone
                          </div>
                          {ratio.id === '9:16' && (
                            <div className="flex items-center gap-1 text-xs" style={{ color: colors.warning }}>
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.warning }} />
                              TT Safe
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Table View */
              <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: colors.border }}>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b" style={{ borderColor: colors.border }}>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Preview</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Ratio</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Resolution</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Safe Zone</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedAssets.map((ratioId) => {
                      const ratio = aspectRatios.find(r => r.id === ratioId);
                      if (!ratio) return null;
                      
                      return (
                        <tr key={ratioId} className="border-b hover:bg-gray-50" style={{ borderColor: '#F3F4F6' }}>
                          <td className="px-6 py-4">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primaryLight }}>
                              <AspectRatioIcon type={ratio.icon} selected={true} />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold" style={{ color: colors.textPrimary }}>{ratio.ratio}</span>
                            <span className="ml-2 text-sm" style={{ color: colors.textSecondary }}>{ratio.label}</span>
                          </td>
                          <td className="px-6 py-4" style={{ color: colors.textSecondary }}>{ratio.resolution}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 text-xs rounded-lg" style={{ backgroundColor: `${colors.success}20`, color: colors.success }}>Standard</span>
                              {ratio.id === '9:16' && (
                                <span className="px-2 py-1 text-xs rounded-lg" style={{ backgroundColor: `${colors.warning}20`, color: colors.warning }}>TikTok</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: colors.success }}>
                              <CheckIcon className="w-4 h-4" />
                              Ready
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
