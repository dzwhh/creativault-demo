# CreatiVault AI - Vercel 部署指南

## 项目概览
- **项目名称**: CreatiVault AI
- **技术栈**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **包管理器**: pnpm
- **部署平台**: Vercel

## 快速部署步骤

### 方法 1: 通过 Vercel 网站部署 (推荐)

1. **准备 Git 仓库**
   ```bash
   # 项目已初始化 Git 仓库并提交了代码
   # 需要推送到 GitHub/GitLab/Bitbucket
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

2. **在 Vercel 中导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择你的 Git 仓库
   - Vercel 会自动检测为 Next.js 项目

3. **配置项目设置**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (项目根目录)
   - **Build Command**: `pnpm build` (或使用默认的 `npm run build`)
   - **Output Directory**: `.next` (Next.js 默认)
   - **Install Command**: `pnpm install` (或使用默认的 `npm install`)

### 方法 2: 使用 Vercel CLI

如果 CLI 安装成功，可以使用以下命令：

```bash
# 在项目根目录运行
npx vercel

# 或者如果已全局安装
vercel
```

## 项目特性

### ✅ 已实现功能
- 🏠 首页仪表板
- 📊 Market Insight 页面
- 🌍 国家级营销指标表格 (CPM, CTR, CVR, ROAS)
- 🔍 图标组件统一管理
- 📱 响应式设计
- 🎨 现代化 UI 组件

### 📊 Market Insight 功能亮点
- **多平台支持**: Meta, TikTok, Google, Snapchat
- **营销指标**: CPM(货币格式), CTR(百分比), CVR(百分比), ROAS(倍数)
- **国家数据**: 美国🇺🇸, 英国🇬🇧, 德国🇩🇪, 法国🇫🇷, 加拿大🇨🇦, 澳大利亚🇦🇺
- **趋势可视化**: 30天增长趋势迷你图
- **交互功能**: 表格排序、平台切换、悬停效果

## 环境变量

如需要环境变量，在 Vercel 项目设置中添加：

```env
CUSTOM_KEY=your-custom-value
# 添加其他必要的环境变量
```

## 构建优化

项目已配置以下优化：
- TypeScript 严格模式
- ESLint + Prettier 代码格式化
- Husky Git 提交检查
- Tailwind CSS 样式优化
- Next.js 14 性能优化

## 部署后验证

部署成功后，请验证以下功能：
1. ✅ 首页加载正常
2. ✅ Market Insight 页面功能完整
3. ✅ 国家级营销指标表格显示正确
4. ✅ 平台切换功能正常
5. ✅ 表格排序功能正常
6. ✅ 响应式设计在不同设备上正常显示

## 故障排除

### 常见问题
1. **构建失败**: 检查 TypeScript 类型错误
2. **样式问题**: 确认 Tailwind CSS 配置正确
3. **图标不显示**: 验证图标组件路径正确

### 构建命令
```bash
# 本地测试构建
pnpm build

# 本地启动生产服务器
pnpm start

# 开发模式
pnpm dev
```

## 项目结构
```
├── app/                    # Next.js 13+ App Router
├── components/            # React 组件
│   ├── icons/            # 统一图标管理
│   ├── tables/           # 表格组件
│   └── ui/               # UI 基础组件
├── lib/                  # 工具函数和类型
└── public/               # 静态资源
```

---

**部署完成后，您将获得一个类似 `https://your-project.vercel.app` 的访问地址**