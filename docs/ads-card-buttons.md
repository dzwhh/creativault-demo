# 广告卡片操作按钮功能说明

## 功能概述

在广告列表页面（`/big-spy/ads`）的每个广告卡片**右下角白色内容区域**添加了两个垂直排列的操作按钮：

### 1. Save 按钮（书签图标 + 文字）
- **功能**：将广告保存到收藏夹
- **交互**：
  - 始终显示在卡片右下角
  - 点击后弹出 SaveToFavoritesModal 模态窗口
  - 默认分类自动设置为 "ads"
  - 可选择目标文件夹或创建新文件夹
- **样式**：
  - 白色背景 + 灰色边框
  - 悬停：浅蓝色背景 + 蓝色边框和文字
  - 图标 + "Save" 文字标签
  - 小尺寸按钮（text-xs）

### 2. Brand Tracking 按钮（柱状图图标 + 文字）
- **功能**：将品牌添加到品牌追踪列表
- **交互**：
  - 始终显示在卡片右下角
  - 点击后弹出 SaveToBrandModal 模态窗口
  - 只需选择文件夹或创建新文件夹（无需选择分类）
- **样式**：
  - 白色背景 + 灰色边框
  - 悬停：浅紫色背景 + 紫色边框和文字
  - 图标 + "Brand Tracking" 文字标签（大屏）/"Track" 文字（小屏）
  - 小尺寸按钮（text-xs）

## 技术实现

### 组件结构

```
ads-list.tsx (广告列表组件)
├── AdCard (广告卡片组件)
│   ├── Save 按钮 → 触发 onSave 回调
│   └── Brand Tracking 按钮 → 触发 onBrandTrack 回调
├── SaveToFavoritesModal (收藏模态窗口)
└── SaveToBrandModal (品牌追踪模态窗口)
```

### 新增文件

1. **`/components/save-to-brand-modal.tsx`**
   - 品牌追踪模态窗口组件
   - 参考 `save-to-favorites-modal.tsx` 设计
   - 移除分类选择功能，只保留文件夹操作

### 修改文件

1. **`/app/big-spy/ads/ads-list.tsx`**
   - 导入 SaveToFavoritesModal 和 SaveToBrandModal
   - AdCard 组件添加 onSave 和 onBrandTrack props
   - 在图片容器右下角添加按钮组
   - 添加状态管理和回调函数

## 按钮位置

```
┌─────────────────────────────┐
│                             │
│      广告图片/视频区域        │
│                             │
└─────────────────────────────┘
┌─────────────────────────────┐
│ 广告标题           [Save]   │ ← Save 按钮
│ 域名            [Track]     │ ← Brand Tracking 按钮  
│ 发布日期                    │
└─────────────────────────────┘
白色内容区域
```

## 样式特点

- **始终显示**：按钮始终可见，无需悬停
- **响应式文字**：大屏显示完整 "Brand Tracking"，小屏显示 "Track"
- **清晰边框**：灰色边框，悬停时变为主题色边框
- **平滑过渡**：transition-colors 实现颜色平滑过渡
- **阻止冒泡**：onClick 事件使用 `e.stopPropagation()` 防止触发卡片点击
- **Tooltip**：通过 title 属性提供悬停提示
- **图标装饰**：每个按钮都带有相应的 SVG 图标

## 配色方案

符合项目整体 UI 风格：

- **Save 按钮**：
  - 默认：白色背景 + 灰色边框 + 灰色文字
  - 悬停：浅蓝色背景 (blue-50) + 蓝色边框 (blue-500) + 蓝色文字 (blue-600)
  
- **Brand Tracking 按钮**：
  - 默认：白色背景 + 灰色边框 + 灰色文字
  - 悬停：浅紫色背景 (purple-50) + 紫色边框 (purple-500) + 紫色文字 (purple-600)

- **按钮尺寸**：
  - 文字：text-xs（小号字体）
  - 图标：w-3.5 h-3.5（小号图标）
  - 内边距：px-2.5 py-1.5（紧凑型）
  - 间距：gap-1.5（按钮之间的垂直间距）

## 使用示例

```tsx
// 广告卡片会自动包含这两个按钮（位于内容区域右侧）
<AdCard 
  ad={ad} 
  onClick={() => setSelectedAd(ad)}
  onSave={handleSave}
  onBrandTrack={handleBrandTrack}
/>
```

## 布局结构

```tsx
<div className="p-4">
  <div className="flex items-start justify-between gap-2 mb-3">
    {/* 左侧：广告信息 */}
    <div className="flex-1 min-w-0">
      <h3>广告标题</h3>
      <p>域名</p>
      <p>发布日期</p>
    </div>
    
    {/* 右侧：操作按钮（垂直堆叠）*/}
    <div className="flex flex-col gap-1.5">
      <button>Save</button>
      <button>Brand Tracking</button>
    </div>
  </div>
</div>
```

## 模态窗口对比

| 特性 | SaveToFavoritesModal | SaveToBrandModal |
|------|---------------------|------------------|
| 分类选择 | ✅ 4个分类选项 | ❌ 无分类选择 |
| 文件夹选择 | ✅ | ✅ |
| 创建新文件夹 | ✅ | ✅ |
| 默认分类 | ads/creative/products/creator | N/A |
| 用途 | 保存广告到收藏夹 | 追踪品牌广告活动 |

## 注意事项

1. **事件冒泡**：按钮点击事件必须阻止冒泡，避免触发卡片的详情页跳转
2. **状态管理**：使用 `currentAdForAction` 暂存当前操作的广告数据
3. **成功提示**：目前使用 alert，后续可替换为 Toast 通知
4. **数据持久化**：需要接入后端 API 实现真实的保存和追踪功能
5. **权限控制**：可根据用户权限控制按钮显示/隐藏
6. **响应式设计**：Brand Tracking 按钮在 XL 屏幕显示完整文字，小屏显示缩写
7. **布局稳定**：按钮固定在右侧，不会因内容长度而移位

## 后续优化建议

1. 使用 Toast 替代 alert 提示
2. 接入真实的 API 接口
3. 添加加载状态和错误处理
4. 支持批量操作（多选广告）
5. 添加快捷键支持（如 S 保存，B 追踪）
6. 优化移动端体验（触摸设备上的按钮显示）
