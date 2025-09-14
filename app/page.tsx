import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  RadarIcon,
  BoxesIcon,
  UsersIcon,
  AppWindowIcon,
  GamepadIcon,
  FilmIcon,
  BrainIcon,
  SparklesIcon,
} from '@/components/icons';

interface QuickLink {
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType;
  gradient?: string;
}

const quickLinks: QuickLink[] = [
  { title: '找广告', desc: '跨平台热门与新鲜投放创意', href: '/big-spy/ads', icon: RadarIcon, gradient: 'from-pink-500/20 to-purple-500/20' },
  { title: '找商品', desc: '高势能爆品与类目趋势', href: '/big-spy/product', icon: BoxesIcon, gradient: 'from-amber-500/20 to-red-500/20' },
  { title: '找达人', desc: '达人 & KOL 创意表现与数据画像', href: '/big-spy/creator', icon: UsersIcon, gradient: 'from-sky-500/20 to-cyan-500/20' },
  { title: '找应用', desc: '应用与出海广告素材监测', href: '/big-spy/app-gaming', icon: AppWindowIcon, gradient: 'from-green-500/20 to-emerald-500/20' },
  { title: '找游戏', desc: '游戏投放 & 排名趋势', href: '/big-spy/app-gaming?tab=game', icon: GamepadIcon, gradient: 'from-indigo-500/20 to-blue-500/20' },
  { title: '找短剧', desc: '短剧题材、剧情钩子与流量表现', href: '/big-spy/short-drama', icon: FilmIcon, gradient: 'from-fuchsia-500/20 to-rose-500/20' },
  { title: '找 AI', desc: 'AI 应用投放与增长亮点', href: '/big-spy/ai-app', icon: BrainIcon, gradient: 'from-teal-500/20 to-emerald-500/20' },
  { title: '我的收藏夹', desc: '快速访问已收藏的素材 & 目标', href: '/profile/favorites', icon: SparklesIcon, gradient: 'from-yellow-500/20 to-orange-500/20' },
];

function HomeQuickLinkCard({ link }: { link: QuickLink }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      className={cn(
        'group relative rounded-xl border p-5 flex flex-col gap-3 overflow-hidden hover:shadow-md transition-shadow bg-background',
        'before:absolute before:inset-0 before:bg-gradient-to-br',
        link.gradient,
        'before:opacity-0 hover:before:opacity-60 before:transition-opacity'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
          <Icon />
        </div>
        <h3 className="font-semibold text-base">{link.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">{link.desc}</p>
      <div className="mt-auto text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        进入 →
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="p-6 space-y-10">
      <section className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">
          欢迎使用 CreatiVault
          <span className="relative inline-block ml-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
            </svg>
            <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-blue-500 rounded-full px-1.5 py-0.5 shadow-sm">
              AI
            </span>
          </span>
        </h1>
        <p className="text-muted-foreground text-sm">
          从多维数据与智能分析出发，探索广告、产品、达人、应用与创意增长机会。
        </p>
      </section>
      
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quickLinks.map((l) => (
          <HomeQuickLinkCard key={l.href} link={l} />
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">快速开始</h2>
        <ul className="text-sm list-disc pl-5 space-y-1 text-muted-foreground">
          <li>点击上方模块进入对应榜单或分析功能</li>
          <li>在 Big Spy 列表中使用筛选器快速缩小范围</li>
          <li>使用 Marketing Agent 生成市场 / 受众 / 竞品 / 创意洞察</li>
          <li>收藏关键素材，稍后进入"我的收藏夹"集中管理</li>
        </ul>
      </section>
    </main>
  );
}