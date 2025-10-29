import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// 系统功能图标组件
export const UpgradeIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 2L22 9l-10 7L2 9l10-7z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

export const UpgradeArrowIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071C8.68342 12.0976 9.31658 12.0976 9.70711 11.7071L11 10.4142V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V10.4142L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929L12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L8.29289 10.2929Z" 
      fill="currentColor"
    />
  </svg>
);

export const SidebarCollapseIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <path d="M9 3v18"/>
    <path d="m16 15-3-3 3-3"/>
  </svg>
);

export const CollectIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className={className}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M10 5v1m4 0V5m-4 5.4V8a2 2 0 1 1 4 0v2.4M7 15H4l-2 2.5m5.42-.5L5 20l1 2m2-10l-4-1l-2-3m7 3L5.5 6L7 2"/>
      <path d="M8 18a5 5 0 1 1 8 0s-2 3-4 4c-2-1-4-4-4-4"/>
      <path d="m15 11l3.5-5L17 2m-1 10l4-1l2-3m-5 7h3l2 2.5m-5.43-.5L19 20l-1 2"/>
    </g>
  </svg>
);

export const AIToolkitIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" className={className}>
    <path fill="currentColor" fillRule="evenodd" d="M24 6.002c-2.195 0-3.893.137-5.061.279c-.693.083-1.28.523-1.767 1.69a8.2 8.2 0 0 0-.464 1.59A89 89 0 0 1 24 9.272a89 89 0 0 1 7.292.29a8.2 8.2 0 0 0-.463-1.59c-.489-1.167-1.075-1.607-1.767-1.69c-1.169-.142-2.867-.279-5.062-.279m-10.98.234c-.522 1.248-.802 2.605-.937 3.85c-2.048.3-3.762.647-5.142.98c-3.384.815-5.668 3.662-5.997 7.016c-.23 2.36-.444 5.66-.444 9.803c0 4.55.257 8.58.51 11.443a7.24 7.24 0 0 0 6.686 6.62c3.451.265 8.886.55 16.304.55s12.853-.285 16.304-.55a7.24 7.24 0 0 0 6.686-6.62c.253-2.863.51-6.894.51-11.444c0-4.142-.213-7.442-.444-9.803c-.329-3.354-2.613-6.2-5.997-7.016a58 58 0 0 0-5.142-.98c-.135-1.245-.415-2.602-.937-3.85c-.83-1.988-2.465-4.07-5.377-4.423c-1.341-.162-3.22-.311-5.603-.311s-4.262.149-5.603.311c-2.912.353-4.546 2.435-5.377 4.423M24 13.272c-7.53 0-12.904.907-16.122 1.683c-1.622.39-2.78 1.747-2.953 3.517A87 87 0 0 0 4.6 23.16q1.037.098 2.621.215c2.596.189 6.274.394 10.915.494q.022-.466.052-.854c.182-2.388 2.116-3.915 4.289-3.956a81 81 0 0 1 3.046 0c2.173.04 4.107 1.568 4.289 3.956q.03.389.052.854c4.64-.1 8.32-.305 10.915-.494a137 137 0 0 0 2.62-.215a87 87 0 0 0-.324-4.688c-.174-1.77-1.331-3.126-2.953-3.517c-3.218-.776-8.591-1.683-16.122-1.683m-5.87 14.597q.024.54.058.98c.182 2.387 2.116 3.915 4.289 3.956a81 81 0 0 0 3.046 0c2.173-.041 4.107-1.569 4.289-3.957q.033-.44.058-.979c4.75-.1 8.525-.31 11.2-.505q1.426-.105 2.428-.196l.002.718c0 4.404-.25 8.314-.494 11.091c-.144 1.626-1.39 2.859-3.009 2.983c-3.35.258-8.682.54-15.997.54s-12.648-.282-15.997-.54c-1.62-.124-2.866-1.357-3.009-2.983a128 128 0 0 1-.492-11.81q1.002.092 2.429.197c2.674.195 6.449.404 11.199.505" clipRule="evenodd"/>
  </svg>
);

export const DashboardIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect width="7" height="9" x="3" y="3" rx="1"/>
    <rect width="7" height="5" x="14" y="3" rx="1"/>
    <rect width="7" height="9" x="14" y="12" rx="1"/>
    <rect width="7" height="5" x="3" y="16" rx="1"/>
  </svg>
);

export const AssetStudioIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="none" stroke="currentColor" strokeWidth="2" d="m12 3l9 4.5l-9 4.5l-9-4.5zm4.5 7.25L21 12.5L12 17l-9-4.5l4.5-2.25m9 5L21 17.5L12 22l-9-4.5l4.5-2.25"/>
  </svg>
);

export const FavoritesIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256" className={className}>
    <path fill="currentColor" d="M156 56H60a20 20 0 0 0-20 20v152a12 12 0 0 0 19 9.76l49-35l49 35a12 12 0 0 0 19-9.76V76a20 20 0 0 0-20-20m-4 148.68l-37-26.45a12 12 0 0 0-14 0l-37 26.45V80h88ZM216 36v152a12 12 0 0 1-24 0V40H92a12 12 0 0 1 0-24h104a20 20 0 0 1 20 20"/>
  </svg>
);

export const BlogIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M5 16a3 3 0 1 0 0 6a3 3 0 0 0 0-6ZM5 1c9.925 0 18 8.075 18 18m-5 0c0-7.168-5.832-13-13-13m8 13c0-4.411-3.589-8-8-8m-3 0v8"/>
  </svg>
);

export const AcademyIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className={className}>
    <path d="M22 9L12 5L2 9l10 4zv6"/>
    <path d="M6 10.6V16a6 3 0 0 0 12 0v-5.4"/>
  </svg>
);

export const MarketInsightIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 2048 2048" fill="currentColor" className={className}>
    <path d="M960 384q119 0 224 45t183 124t123 183t46 224q0 63-8 118t-25 105t-44 99t-64 100q-29 40-51 72t-36 64t-21 70t-7 89v179q0 40-15 75t-41 61t-61 41t-75 15H832q-40 0-75-15t-61-41t-41-61t-15-75v-180q0-51-7-88t-21-69t-36-65t-51-72q-37-51-63-99t-44-99t-26-106t-8-118q0-119 45-224t124-183t183-123t224-46m192 1472v-64H768v64q0 26 19 45t45 19h256q26 0 45-19t19-45m256-896q0-93-35-174t-96-143t-142-96t-175-35q-93 0-174 35t-143 96t-96 142t-35 175q0 89 18 153t47 114t61 94t61 92t48 108t21 143h384q1-83 20-142t48-108t61-92t61-94t47-115t19-153M960 256q-26 0-45-19t-19-45V64q0-26 19-45t45-19t45 19t19 45v128q0 26-19 45t-45 19M192 928H64q-26 0-45-19T0 864t19-45t45-19h128q26 0 45 19t19 45t-19 45t-45 19m53 261q26 0 45 19t19 46q0 20-11 35t-30 24q-11 5-30 13t-41 17t-40 15t-32 7q-26 0-45-19t-19-46q0-20 11-35t30-24q11-4 30-13t41-17t40-15t32-7m152-645q0 26-19 45t-45 19q-18 0-33-9l-109-67q-14-9-22-23t-9-32q0-26 19-45t45-19q16 0 33 10l110 66q14 8 22 23t8 32m83-368q0-26 19-45t45-19q17 0 32 9t24 24l62 112q8 14 8 30q0 27-19 46t-45 19q-17 0-32-9t-24-24l-62-112q-8-14-8-31m1376 624q26 0 45 19t19 45t-19 45t-45 19h-128q-26 0-45-19t-19-45t19-45t45-19zm2 501q0 26-19 45t-45 19q-11 0-30-6t-41-16t-40-17t-31-14q-18-8-29-24t-12-36q0-27 19-45t46-19q12 0 31 7t40 16t40 18t31 13q18 8 29 23t11 36m-271-693q-26 0-45-19t-19-45q0-17 8-32t22-23l110-66q17-10 33-10q26 0 45 19t19 45q0 17-8 31t-23 24l-109 67q-15 9-33 9m-337-321q0-16 8-30l62-112q8-15 23-24t33-9q26 0 45 19t19 45q0 17-8 31l-62 112q-8 15-23 24t-33 9q-26 0-45-19t-19-46"/>
  </svg>
);

export const ChevronDownIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export const BillingIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect width="20" height="14" x="2" y="5" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);

export const BellIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="m13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

export const LogOutIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export const MagicWandIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className={className}>
    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5">
      <path strokeLinecap="round" d="m13.926 12.778l-2.149-2.149c-.292-.293-.439-.439-.597-.517a1.07 1.07 0 0 0-.954 0c-.158.078-.304.224-.597.517s-.439.44-.517.597c-.15.301-.15.654 0 .954c.078.158.224.305.517.598l2.149 2.148m2.148-2.149l6.445 6.446c.293.292.439.439.517.597c.15.3.15.653 0 .954c-.078.157-.224.304-.517.597s-.44.439-.597.517c-.301.15-.654.15-.954 0c-.158-.078-.305-.224-.598-.517l-6.445-6.445m2.149-2.149l-2.149 2.149"/>
      <path d="m17 2l.295.797c.386 1.044.58 1.566.96 1.947c.382.381.904.575 1.948.961L21 6l-.797.295c-1.044.386-1.566.58-1.947.96c-.381.382-.575.904-.961 1.948L17 10l-.295-.797c-.386-1.044-.58-1.566-.96-1.947c-.382-.381-.904-.575-1.948-.961L13 6l.797-.295c1.044-.386 1.566-.58 1.947-.96c.381-.382.575-.904.961-1.948zM6 4l.221.597c.29.784.435 1.176.72 1.461c.286.286.678.431 1.462.72L9 7l-.597.221c-.784.29-1.176.435-1.461.72c-.286.286-.431.678-.72 1.462L6 10l-.221-.597c-.29-.784-.435-1.176-.72-1.461c-.286-.286-.678-.431-1.462-.72L3 7l.597-.221c.784-.29 1.176-.435 1.461-.72c.286-.286.431-.678.72-1.462z"/>
    </g>
  </svg>
);

export const SearchIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

export const FilterIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
  </svg>
);

export const SettingsIcon = ({ size = 16, className = '' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);