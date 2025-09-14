# CreatiVault AI - Marketing Intelligence Platform

🚀 基于 Next.js 14 + TypeScript 的 AI 驱动广告监测与营销洞察平台

## ✨ 功能特色

### 📊 Big Spy 监测
- **广告监测**: 跨平台热门与新鲜投放创意分析
- **产品分析**: 高势能爆品与类目趋势追踪  
- **达人洞察**: KOL 创意表现与数据画像
- **应用&游戏**: 出海广告素材监测与排名趋势
- **短剧分析**: 题材、剧情钩子与流量表现
- **AI 应用**: AI 产品投放与增长亮点发现

### 🤖 Marketing Agent
- **市场分析**: 行业竞争态势与机会识别
- **受众分析**: 用户画像构建与行为洞察  
- **竞争分析**: 竞品策略评估与差异化建议
- **创意素材分析**: 广告效果评估与优化建议

### 🛠️ 智能工具
- **Magic Search**: 以图搜图，快速找到相似广告
- **图片/视频编辑**: 在线媒体处理工具
- **Auto Report**: 智能生成营销分析报告

### 📚 社区功能
- **文档中心**: 使用指南与最佳实践
- **教程视频**: 操作演示与案例分享

## 🏗️ 技术架构

### 核心技术栈
- **Frontend**: Next.js 14 App Router + TypeScript + React 18
- **Styling**: Tailwind CSS + shadcn/ui 组件库
- **状态管理**: React Hooks + Context API
- **数据层**: 内存存储 + Mock Repository (可扩展至 PostgreSQL/ClickHouse)
- **API**: Next.js App Router API Routes (REST + SSE)
- **代码质量**: ESLint + Prettier + Husky + lint-staged

### 特性支持
- 🌙 亮/暗主题切换
- 🌍 国际化预留 (中英双语)
- 📱 响应式设计
- ⚡ SSE 实时通信
- 🔄 懒加载与分页
- 📈 埋点与分析预留
- 🔐 RBAC 权限系统预留

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- pnpm 8+ (推荐) 或 npm/yarn

### 安装依赖
```bash
# 安装项目依赖
pnpm install

# 或使用 npm
npm install
```

### shadcn/ui 组件安装
```bash
# 初次安装 shadcn/ui (如需要)
npx shadcn-ui@latest init

# 按需安装组件
npx shadcn-ui@latest add button card badge tabs dialog dropdown-menu
npx shadcn-ui@latest add command skeleton separator tooltip sheet
```

### 环境配置
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
vim .env.local
```

### 生成 Mock 数据
```bash
# 生成测试数据
pnpm generate-mock
```

### 启动开发服务器
```bash
# 启动开发环境
pnpm dev

# 访问应用
open http://localhost:3000
```

### 构建生产版本
```bash
# 构建
pnpm build

# 启动生产服务器
pnpm start
```

## 📁 项目结构

```
CreatiVaultAI/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 根布局组件
│   ├── page.tsx                 # 首页
│   ├── globals.css              # 全局样式
│   ├── big-spy/                 # Big Spy 功能模块
│   │   ├── ads/                 # 广告监测
│   │   ├── product/             # 产品分析  
│   │   ├── creator/             # 达人分析
│   │   ├── app-gaming/          # 应用&游戏
│   │   ├── short-drama/         # 短剧分析
│   │   └── ai-app/              # AI 应用
│   ├── agent/                   # Marketing Agent
│   │   ├── market/              # 市场分析
│   │   ├── audience/            # 受众分析
│   │   ├── competition/         # 竞争分析
│   │   └── creative/            # 创意分析
│   ├── tools/                   # 智能工具
│   ├── community/               # 社区功能
│   ├── profile/                 # 个人中心
│   └── api/                     # API 路由
│       ├── ads/                 # 广告数据 API
│       ├── agent/               # Agent 任务 API
│       └── favorites/           # 收藏功能 API
├── components/                   # 可复用组件
│   ├── layout/                  # 布局组件
│   ├── navigation/              # 导航组件
│   ├── ui/                      # UI 基础组件
│   ├── cards/                   # 卡片组件
│   ├── filters/                 # 筛选组件
│   └── agent/                   # Agent 相关组件
├── lib/                         # 核心库
│   ├── types/                   # TypeScript 类型定义
│   ├── utils.ts                 # 工具函数
│   ├── agent/                   # Agent 系统
│   │   └── orchestrator.ts      # 任务编排器
│   ├── api/                     # 数据访问层
│   └── hooks/                   # 自定义 Hooks
├── public/                      # 静态资源
│   └── mock/                    # Mock 数据文件
├── scripts/                     # 脚本工具
│   └── generate-mock.ts         # Mock 数据生成器
├── styles/                      # 样式文件
└── config/                      # 配置文件
```

## 🔧 开发指南

### 提交规范 (Conventional Commits)
```bash
# 功能开发
git commit -m "feat: 新增广告筛选功能"

# 问题修复  
git commit -m "fix: 修复分页组件显示问题"

# 文档更新
git commit -m "docs: 更新 API 文档"

# 代码重构
git commit -m "refactor: 重构用户认证逻辑"
```

### 代码质量检查
```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm type-check
```

### Git Hooks
项目配置了以下 Git Hooks:
- **pre-commit**: 自动运行 lint-staged (格式化 + 语法检查)
- **commit-msg**: 验证提交信息格式 (commitlint)

## 📊 数据模型

### 核心实体类型
- **Ad**: 广告实体 (平台、创意、数据指标)
- **Product**: 产品实体 (价格、趋势、关联广告)  
- **Creator**: 达人实体 (粉丝数、互动率、领域)
- **AppGaming**: 应用游戏 (排名、变现、活跃国家)
- **ShortDrama**: 短剧实体 (剧集、播放量、受众)
- **AIApp**: AI 应用 (定价、增长、差异化)
- **AgentTask**: Agent 任务 (类型、步骤、输出)

### API 交互示例
```typescript
// 获取广告列表
GET /api/ads?platform=facebook&country=US&page=1&pageSize=20

// 创建 Agent 任务
POST /api/agent/task 
{
  "type": "market",
  "input": { "industry": "ecommerce", "country": "US" }
}

// SSE 实时更新
GET /api/agent/stream?taskId=xxx
```

## 🤖 Agent 系统

### 任务类型
1. **市场分析 (market)**: 行业规模、竞争格局、机会识别
2. **受众分析 (audience)**: 用户画像、行为特征、需求洞察
3. **竞争分析 (competition)**: 竞品策略、优劣势、差异化
4. **创意分析 (creative)**: 素材效果、优化建议、创意方向

### 执行流程
1. **任务创建**: 提交分析请求与输入参数
2. **步骤执行**: 数据收集 → 分析处理 → 洞察生成 → 报告输出
3. **实时推送**: SSE 推送执行进度与中间结果
4. **结果输出**: 结构化数据 + Markdown 报告

## 🎯 开发路线图

### Phase 1: 基础框架 ✅
- [x] Next.js 14 + TypeScript 项目搭建
- [x] Tailwind CSS + shadcn/ui 组件系统
- [x] 侧边栏导航与页面路由
- [x] 主页模块卡片展示

### Phase 2: Big Spy 功能 🚧
- [x] 广告列表页面与 API
- [x] 筛选器组件
- [x] 收藏功能 Hook
- [ ] 其他 Big Spy 模块实现
- [ ] 详情页面开发

### Phase 3: Agent 系统 🚧
- [x] Agent Orchestrator 核心引擎
- [x] 任务创建与管理 API
- [x] SSE 实时通信
- [x] useAgentTask Hook
- [ ] Agent 页面 UI 实现

### Phase 4: 工具与社区 📋
- [ ] Magic Search 以图搜图功能
- [ ] 图片/视频编辑工具
- [ ] Auto Report 报告生成
- [ ] 文档系统 (MDX 支持)
- [ ] 教程视频功能

### Phase 5: 完善与优化 📋
- [ ] 用户认证与权限 (NextAuth.js)
- [ ] 国际化实现 (next-intl)
- [ ] 性能优化与缓存
- [ ] 监控与埋点
- [ ] 部署与 CI/CD

## 🔌 扩展指南

### 数据库集成
```typescript
// 替换内存存储为数据库
// lib/api/adsRepo.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const adsRepo = {
  findMany: (filters) => prisma.ad.findMany({ where: filters }),
  findById: (id) => prisma.ad.findUnique({ where: { id } }),
  // ...
}
```

### 外部 API 集成
```typescript
// lib/services/aiService.ts
export const aiService = {
  analyzeMarket: async (input) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: `分析${input.industry}市场` }],
      }),
    })
    return response.json()
  }
}
```

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

1. Fork 项目仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交变更 (`git commit -m 'feat: add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📞 支持与反馈

- 🐛 [问题反馈](https://github.com/your-org/creativault-ai/issues)
- 💡 [功能建议](https://github.com/your-org/creativault-ai/discussions)
- 📧 [联系我们](mailto:support@creativault.ai)

---

🎉 感谢使用 CreatiVault AI！让我们一起探索广告与营销的无限可能。