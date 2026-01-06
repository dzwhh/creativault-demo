'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ImageIcon, 
  VideoIcon, 
  PenToolIcon, 
  ZapIcon, 
  PaletteIcon, 
  Edit3Icon,
  SparklesIcon,
  XIcon,
  PlayIcon,
  StarIcon
} from 'lucide-react';

// Tool Categories Data - more vibrant colors
const toolCategories = [
  {
    id: 'image-generation',
    title: 'Image Generation',
    icon: ImageIcon,
    thumbnail: 'https://picsum.photos/seed/imggen/280/180',
    bgColor: 'bg-gradient-to-br from-fuchsia-400 via-pink-400 to-rose-400',
    iconBg: 'bg-white/30',
    decorColor: 'bg-pink-300',
  },
  {
    id: 'video-generation',
    title: 'Video Generation',
    icon: VideoIcon,
    thumbnail: 'https://picsum.photos/seed/vidgen/280/180',
    bgColor: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500',
    iconBg: 'bg-white/30',
    decorColor: 'bg-purple-300',
  },
  {
    id: 'design-tools',
    title: 'Design Tools',
    icon: PenToolIcon,
    thumbnail: 'https://picsum.photos/seed/design/280/180',
    bgColor: 'bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-400',
    iconBg: 'bg-white/30',
    decorColor: 'bg-orange-300',
  },
  {
    id: 'realtime-generation',
    title: 'Realtime Generation',
    icon: ZapIcon,
    thumbnail: 'https://picsum.photos/seed/realtime/280/180',
    bgColor: 'bg-gradient-to-br from-emerald-400 via-green-400 to-teal-400',
    iconBg: 'bg-white/30',
    decorColor: 'bg-green-300',
  },
  {
    id: 'realtime-canvas',
    title: 'Realtime Canvas',
    icon: PaletteIcon,
    thumbnail: 'https://picsum.photos/seed/canvas/280/180',
    bgColor: 'bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500',
    iconBg: 'bg-white/30',
    decorColor: 'bg-indigo-300',
  },
  {
    id: 'image-editor',
    title: 'Image Editor',
    icon: Edit3Icon,
    thumbnail: 'https://picsum.photos/seed/editor/280/180',
    bgColor: 'bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-500',
    iconBg: 'bg-white/30',
    decorColor: 'bg-rose-300',
  },
];

// Quick Apps Data - vibrant gradient colors
const quickApps = [
  {
    id: 'asset-adaptation',
    title: 'Asset Adaptation',
    description: 'Auto-generate multi-size assets from a single PSD',
    thumbnail: 'https://picsum.photos/seed/adapt/180/120',
    bgColor: 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500',
    emoji: '⚡',
    href: '/tools/creativeclips/asset-adaptation',
  },
  {
    id: 'ai-cartoon',
    title: 'AI Cartoon Magic',
    description: 'Turn everything into a classic cartoon',
    thumbnail: 'https://picsum.photos/seed/cartoon/180/120',
    bgColor: 'bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400',
    emoji: '🎨',
    href: '/tools/creativeclips/ai-cartoon',
  },
  {
    id: 'image-upscale',
    title: 'Image Upscale',
    description: 'Seamless photo extension',
    thumbnail: 'https://picsum.photos/seed/upscale/180/120',
    bgColor: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500',
    emoji: '🔍',
    href: '/tools/creativeclips/image-upscale',
  },
  {
    id: 'ai-id-photos',
    title: 'AI ID Photos',
    description: 'Generate professional ID photos instantly',
    thumbnail: 'https://picsum.photos/seed/idphoto/180/120',
    bgColor: 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500',
    emoji: '📸',
    href: '/tools/creativeclips/ai-id-photos',
  },
  {
    id: '4k-wallpaper',
    title: '4K Wallpaper Creator',
    description: 'Create stunning 4K wallpapers for all your devices',
    thumbnail: 'https://picsum.photos/seed/wallpaper/180/120',
    bgColor: 'bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600',
    emoji: '🖼️',
    href: '/tools/creativeclips/4k-wallpaper',
  },
  {
    id: 'watermark-remover',
    title: 'Watermark Remover',
    description: 'Remove image marks to restore originals',
    thumbnail: 'https://picsum.photos/seed/watermark/180/120',
    bgColor: 'bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500',
    emoji: '✨',
    href: '/tools/creativeclips/watermark-remover',
  },
  {
    id: 'keep-face',
    title: 'Keep Face Generation',
    description: 'Generate with the same face',
    thumbnail: 'https://picsum.photos/seed/keepface/180/120',
    bgColor: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500',
    emoji: '👤',
    href: '/tools/creativeclips/keep-face',
  },
  {
    id: 'style-transfer',
    title: 'Style Transfer',
    description: 'Apply style from photo',
    thumbnail: 'https://picsum.photos/seed/style/180/120',
    bgColor: 'bg-gradient-to-br from-orange-400 via-red-500 to-rose-500',
    emoji: '🎭',
    href: '/tools/creativeclips/style-transfer',
  },
  {
    id: 'ai-poster',
    title: 'Advanced AI Poster Creator',
    description: 'Quickly create stylish text posters',
    thumbnail: 'https://picsum.photos/seed/poster/180/120',
    bgColor: 'bg-gradient-to-br from-fuchsia-500 via-purple-600 to-violet-600',
    emoji: '🎯',
    href: '/tools/creativeclips/ai-poster',
  },
  {
    id: 'recraft-ai',
    title: 'Explore Recraft AI Creation',
    description: 'AI-Powered professional design magic',
    thumbnail: 'https://picsum.photos/seed/recraft/180/120',
    bgColor: 'bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-500',
    emoji: '🚀',
    href: '/tools/creativeclips/recraft-ai',
  },
];

// Showcases Data
const showcases = [
  { id: 1, thumbnail: 'https://picsum.photos/seed/show1/200/200', label: '3D Model' },
  { id: 2, thumbnail: 'https://picsum.photos/seed/show2/200/200', label: '3D Model' },
  { id: 3, thumbnail: 'https://picsum.photos/seed/show3/200/200', label: '3D Model' },
  { id: 4, thumbnail: 'https://picsum.photos/seed/show4/200/200', label: '3D Model' },
  { id: 5, thumbnail: 'https://picsum.photos/seed/show5/200/200', label: '3D Model' },
  { id: 6, thumbnail: 'https://picsum.photos/seed/show6/200/200', label: '3D Model' },
  { id: 7, thumbnail: 'https://picsum.photos/seed/show7/200/200', label: 'Realistic' },
  { id: 8, thumbnail: 'https://picsum.photos/seed/show8/200/200', label: 'Realistic' },
  { id: 9, thumbnail: 'https://picsum.photos/seed/show9/200/200', label: '3D Model' },
  { id: 10, thumbnail: 'https://picsum.photos/seed/show10/200/200', label: 'Realistic' },
];

export default function CreativeClipsPage() {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Highlight Banner - More vibrant */}
      {showBanner && (
        <div className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-purple-500 text-white px-4 py-3 flex items-center justify-center relative overflow-hidden">
          {/* Animated sparkle background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-ping" />
            <div className="absolute top-1 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1 left-1/2 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          </div>
          <div className="relative flex items-center gap-3">
            <span className="text-xl animate-bounce">🎉</span>
            <span className="font-bold tracking-wide">Limited Time Offer: All Tools FREE with Unlimited Usage!</span>
            <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 p-1.5 hover:bg-white/20 rounded-full transition-all hover:rotate-90 duration-300"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Header with model info - More dynamic */}
          <div className="relative rounded-[28px] overflow-hidden mb-10 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 shadow-2xl shadow-purple-500/20">
            {/* Animated decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            <div className="relative flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-6 h-6 text-yellow-300 animate-pulse" />
                <span className="text-yellow-200 font-bold text-lg">16+ image & video models included</span>
                <SparklesIcon className="w-6 h-6 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <button className="px-6 py-2.5 bg-white text-purple-700 rounded-full text-sm font-bold hover:bg-yellow-300 hover:text-purple-800 transition-all hover:scale-105 hover:shadow-lg shadow-md">
                Create Now
              </button>
            </div>
          </div>

          {/* Tool Categories Grid - Large rounded, vibrant */}
          <div className="grid grid-cols-6 gap-5 mb-12">
            {toolCategories.map((category, index) => (
              <div
                key={category.id}
                className={`${category.bgColor} rounded-[24px] p-5 cursor-pointer transition-all duration-300 group relative overflow-hidden`}
                style={{ 
                  transform: hoveredCategory === category.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                  boxShadow: hoveredCategory === category.id 
                    ? '0 20px 40px -10px rgba(0,0,0,0.2), 0 0 0 2px rgba(255,255,255,0.5) inset' 
                    : '0 4px 15px -3px rgba(0,0,0,0.1)'
                }}
                onClick={() => router.push(`/tools/creativeclips/${category.id}`)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Decorative floating shapes */}
                <div className={`absolute -top-4 -right-4 w-16 h-16 ${category.decorColor} rounded-full opacity-40 group-hover:scale-150 transition-transform duration-500`} />
                <div className={`absolute -bottom-2 -left-2 w-10 h-10 ${category.decorColor} rounded-full opacity-30 group-hover:scale-125 transition-transform duration-700`} />
                
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`${category.iconBg} p-2 rounded-xl backdrop-blur-sm`}>
                      <category.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white drop-shadow-sm">{category.title}</h3>
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-inner">
                    <img
                      src={category.thumbnail}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {category.id === 'video-generation' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <PlayIcon className="w-5 h-5 text-purple-600 ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    {category.id === 'realtime-generation' && (
                      <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur rounded-xl px-3 py-1.5 text-xs text-gray-700 font-medium shadow-lg">
                        ✨ A Christmas tree drawn...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Apps Section - More playful */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-gray-800">Quick Apps</h2>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-5">
              {quickApps.map((app, index) => (
                <div
                  key={app.id}
                  className="rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group relative"
                  onClick={() => router.push(app.href)}
                  style={{
                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 ${app.bgColor} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10`} />
                  
                  <div className={`${app.bgColor} aspect-[3/2] relative overflow-hidden`}>
                    <img
                      src={app.thumbnail}
                      alt={app.title}
                      className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-90 transition-all duration-500"
                    />
                    {/* Emoji badge */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/95 rounded-2xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {app.emoji}
                    </div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full" style={{ transitionDuration: '700ms' }} />
                  </div>
                  <div className={`${app.bgColor} px-4 py-3 border-t-2 border-white/20`}>
                    <h3 className="text-white font-bold text-sm drop-shadow-sm">{app.title}</h3>
                    <p className="text-white/85 text-xs mt-1 line-clamp-1 font-medium">{app.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Showcases Section - Rounded and playful */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-gray-800">Showcases</h2>
              <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full text-white text-xs font-bold flex items-center gap-1">
                <StarIcon className="w-3 h-3" fill="currentColor" />
                Featured
              </div>
            </div>
            <div className="grid grid-cols-10 gap-4">
              {showcases.map((item, index) => (
                <div
                  key={item.id}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={item.thumbnail}
                    alt={`Showcase ${item.id}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl text-[10px] text-white font-bold shadow-md">
                    {item.label}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
