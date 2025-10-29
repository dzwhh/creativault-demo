# Settings Page

## 功能概述

Settings 页面提供了两个主要功能模块：

1. **Sidebar Menu Control（侧边栏菜单控制）** - 允许用户自定义侧边栏显示的菜单项
2. **User Permissions（用户权限控制）** - 用户权限管理（即将推出）

## 侧边栏菜单控制功能

### 功能说明

- 用户可以通过勾选/取消勾选来控制侧边栏中菜单项的显示/隐藏
- 菜单项按照侧边栏的实际分组结构进行组织
- 设置会自动保存到浏览器的 localStorage 中
- 设置会在所有会话中持久化保存
- 侧边栏会实时响应设置的变化

### 菜单分组

所有菜单项按照以下分组进行组织：

- **Main Navigation**: Home, Market Insight
- **Growth Opportunity**: Ads, Products, Creators, App&Gaming, Drama, AI Products
- **Marketing Agent**: Market Analysis, Competitive Analysis, Creative Analysis
- **Tools**: Magic Search, Creative Clips, One Collect, AI Toolkit
- **Community**: Academy, Blog
- **My Page**: Favorites, Asset Studio

### 使用方法

1. 点击侧边栏底部的账号模块
2. 在弹出菜单中选择 "Settings"
3. 在 "Sidebar Menu Control" 标签页中：
   - 勾选想要显示的菜单项
   - 取消勾选想要隐藏的菜单项
   - 使用 "Select All" 按钮全选所有菜单项
   - 使用 "Deselect All" 按钮取消所有选择

### 技术实现

- **状态管理**: 使用 React Hooks (useState, useEffect)
- **数据持久化**: localStorage
- **实时同步**: 通过自定义事件 `menuVisibilityChanged` 在侧边栏和设置页面之间同步状态
- **UI组件**: 使用 shadcn/ui 的 Checkbox 和 Label 组件

### 文件结构

```
app/settings/
├── page.tsx          # Settings 页面主组件
└── README.md         # 本文档

components/navigation/
└── sidebar.tsx       # 侧边栏组件（已更新支持菜单控制）

components/icons/
├── system-icons.tsx  # 系统图标（包含 SettingsIcon）
└── index.ts          # 图标导出文件
```

## 注意事项

- 设置数据存储在 localStorage 中，清除浏览器数据会重置设置
- 默认情况下，所有菜单项都是可见的
- 如果某个分组的所有菜单项都被隐藏，该分组标题也会隐藏
- 侧边栏会实时响应设置变化，无需刷新页面
