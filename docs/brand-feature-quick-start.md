# Brand Feature Quick Start Guide

## 如何使用 Brand 功能

### 1. 进入 Favorites 页面
导航到 `/my/favorites`，你会看到侧边导航栏中有以下选项：
- Ads
- Creative
- Products
- Creator
- **Brand** ⬅️ 新增

### 2. 选择 Brand 分类
点击左侧导航的 **Brand** 选项，右侧会显示所有 Brand 类型的文件夹。

示例文件夹：
- 📁 Tracked Brands (15 个品牌)
- 📁 Top Brands (20 个品牌)

### 3. 进入品牌列表
点击任意 Brand 文件夹，进入品牌列表页面。

你会看到：
- 品牌卡片网格（每个品牌显示 Logo、名称、行业、广告数等）
- 搜索框（可按品牌名称或行业搜索）
- 筛选按钮
- 批量操作（选择后可删除）

示例品牌：
- Nike (Sports & Fitness)
- Apple (Technology)
- Coca-Cola (Food & Beverage)

### 4. 查看品牌详情
点击任意品牌卡片，进入品牌详情页面。

页面顶部有两个 Tab：
- **Marketing Dynamics** - 营销动态分析
- **Total Ads** - 所有广告列表

### 5. Marketing Dynamics Tab

#### 5.1 Overall Campaign Information (整体信息)
查看品牌的投放概况：

**平台分布**
- TikTok: 245 ads (45%)
- Meta: 189 ads (35%)
- Google: 110 ads (20%)

**创意类型**
- Video: 412 ads (76%)
- Image: 132 ads (24%)

**Top 品类**
1. Running Shoes - 156 ads
2. Sports Apparel - 134 ads
3. Training Equipment - 98 ads
4. Basketball - 76 ads
5. Lifestyle - 80 ads

#### 5.2 Performance (性能分析)
使用顶部筛选器：
- 选择国家（All Countries / United States / United Kingdom）
- 选择平台（All Platforms / TikTok / Meta / Google）
- 选择 CTA（All CTAs / Shop Now / Learn More）

切换性能指标 Tab：

**CPM Tab**
- 30 天趋势图表
- 平均值: $3.15
- 峰值: $4.28
- 变化: -8%

**Impression Tab**
- 30 天趋势图表
- 平均值: 860K/day
- 峰值: 1.2M
- 变化: +24%

**Spend Tab**
- 30 天趋势图表
- 平均值: $2.7K/day
- 峰值: $3.8K
- 变化: +18%

**Audience Tab**
- 人口统计表格
- 按地区、年龄、性别分类
- 总触达: 3.25M

#### 5.3 Strategic Analysis (策略分析)
阅读品牌的：
- **投放策略**: 视频优先策略，76% 使用视频内容
- **增长趋势**: 广告投入增长 18%，展示量增长 24%
- **下一步预测**: 
  - 可能增加 Google Ads 投入
  - 预计推出篮球品类活动
  - 潜在扩展至年轻群体

**30 天时间轴**
- 点击时间轴上的任意点查看当天详情
- 绿色点表示高活跃日（投放 > 15 个广告）
- 查看每日的：
  - 投放广告数
  - Active 广告数
  - 日均花费

#### 5.4 Landing Pages (落地页)
**左侧列表**: 查看 Top 5 落地页
1. nike.com/running/air-max - 45.2K visits
2. nike.com/training/equipment - 32.8K visits
3. nike.com/basketball/lebron - 28.5K visits
4. nike.com/lifestyle/sportswear - 21.3K visits
5. nike.com/sale/clearance - 18.9K visits

**右侧预览**: 
- 点击左侧链接查看对应的落地页预览
- （当前为占位符，未来会显示实际截图）

### 6. Total Ads Tab
查看品牌的所有广告：

**功能**:
- 🔍 搜索框：按标题搜索广告
- 🔽 筛选按钮：更多筛选选项
- 📱 网格布局：4 列展示广告卡片

**广告卡片信息**:
- 视频/图片预览
- 播放按钮（视频广告）
- Adsets 数量徽章
- 点赞数和花费统计
- 标题、域名
- 发布日期
- New 标签（新广告）

**交互**:
- 点击广告卡片：打开广告详情（将集成 ad-detail 组件）
- 悬停效果：卡片放大、阴影增强

## 导航路径示例

```
/my/favorites
  → 点击侧边栏 "Brand"
    → 点击 "Tracked Brands" 文件夹
      → /my/favorites/brand/7
        → 显示品牌列表（Nike, Adidas, Apple...）
          → 点击 "Nike" 品牌卡片
            → /my/favorites/brand/7/1
              → 查看 Nike 的 Marketing Dynamics
              → 或切换到 Total Ads 查看所有广告
```

## 快速操作技巧

### 搜索品牌
在品牌列表页面的搜索框输入：
- 品牌名称（如 "Nike"）
- 行业分类（如 "Technology"）

### 筛选性能数据
在 Performance 部分：
1. 选择国家筛选特定市场
2. 选择平台查看单一平台表现
3. 选择 CTA 分析不同行动号召效果

### 查看历史数据
在 Strategic Analysis 的时间轴：
1. 将鼠标悬停在时间点上查看日期
2. 点击时间点查看详细活动
3. 再次点击关闭详情面板

### 批量管理
在品牌列表页面：
1. 勾选需要管理的品牌
2. 点击 "Remove" 按钮批量删除
3. 或使用 "Select all" 全选

## 数据说明

### 当前使用 Mock 数据
所有展示的数据都是示例数据，包括：
- 6 个示例品牌
- 模拟的性能指标
- 随机生成的时间轴数据
- 示例广告卡片

### 未来集成真实数据
计划从以下来源获取数据：
- 广告平台 API（Meta, TikTok, Google）
- 自有数据库
- 第三方分析工具

## 常见问题

**Q: 为什么点击 Landing Page 没有显示预览？**
A: 当前是占位符状态，未来版本会集成真实的落地页截图预览功能。

**Q: 如何添加新品牌到追踪列表？**
A: 在广告详情页点击 "Brand Tracking" 按钮，选择对应的 Brand 文件夹即可。

**Q: 性能数据多久更新一次？**
A: 目前使用的是模拟数据。实际数据将根据 API 集成后的配置，通常为每日更新。

**Q: 可以导出分析报告吗？**
A: 导出功能计划在未来版本中实现，将支持 PDF 和 CSV 格式。

**Q: 如何比较多个品牌？**
A: 品牌对比功能将在后续版本添加，届时可以并排查看多个品牌的指标。

## 反馈与建议

如果你在使用过程中有任何问题或建议，欢迎反馈！
