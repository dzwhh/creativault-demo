# Favorites Brand Feature Documentation

## Overview
The Brand tracking feature in Favorites allows users to monitor and analyze brand advertising campaigns across multiple platforms.

## File Structure
```
app/my/favorites/
├── page.tsx                                    # Main favorites page with category navigation
├── [folderId]/
│   └── page.tsx                               # Standard folder detail page (for ads/creative/products/creator)
└── brand/
    ├── [folderId]/
    │   └── page.tsx                           # Brand list page (shows all tracked brands)
    └── [folderId]/[brandId]/
        └── page.tsx                           # Brand detail page (Marketing Dynamics + Total Ads)
```

## Navigation Flow

### 1. Main Favorites Page (`/my/favorites`)
- Shows category navigation: Ads, Creative, Products, Creator, **Brand**
- Displays folders based on selected category
- Brand folders route to `/my/favorites/brand/{folderId}`

### 2. Brand List Page (`/my/favorites/brand/{folderId}`)
**Features:**
- Displays all tracked brands in the folder
- Each brand card shows:
  - Brand logo
  - Brand name and industry
  - Active ads count
  - Total ads count
  - Platforms (TikTok, Meta, Google)
  - Last active date
- Search functionality
- Selection and bulk actions (Remove)
- Click on brand → Navigate to brand detail page

### 3. Brand Detail Page (`/my/favorites/brand/{folderId}/{brandId}`)
**Two main tabs:**

#### Tab 1: Marketing Dynamics
Comprehensive brand advertising analysis with 4 sections:

**Section 1: Overall Campaign Information**
- Platform Distribution
  - TikTok, Meta, Google with icons
  - Ad count and percentage for each platform
  - Visual progress bars
- Creative Type Distribution
  - Video vs Image breakdown
  - Count and percentage
  - Visual progress bars
- Top Categories Rankings
  - Top 5 product categories
  - Ranked list with ad counts

**Section 2: Performance**
- Filter options: Country, Platform, CTA
- Four performance tabs: CPM, Impression, Spend, Audience
- For CPM/Impression/Spend tabs:
  - 30-day trend chart
  - Average, Peak, and Change metrics
- For Audience tab:
  - Demographic breakdown table (Location, Age Range, Gender, Reach)
  - Zebra-striped table design
  - Total reach summary

**Section 3: Strategic Analysis**
- Campaign Strategy analysis
- Growth Trend insights
- Next Actions Prediction (bulleted list)
- 30-Day Campaign Timeline
  - Interactive timeline with clickable points
  - Day-by-day campaign activity
  - Shows: Ads Launched, Active Ads, Daily Spend
  - Visual timeline with green dots for high-activity days

**Section 4: Landing Pages**
- Left side: Top 5 landing pages list
  - Ranked with visit counts
  - Clickable items
- Right side: Landing page preview area
  - Placeholder for selected page preview

#### Tab 2: Total Ads
- Search bar with filter options
- Grid layout of all ads (reusing ads-list card style)
- Each ad card shows:
  - Thumbnail/video preview
  - Play button overlay for videos
  - Adsets count badge
  - Likes and spend stats
  - Title, domain, publish date
  - New badge (if applicable)
- Click on ad → Opens ad detail modal

## Design Specifications

### Color Scheme
- Primary: Blue-Cyan gradient (user preference)
- Platform indicators: Platform-specific colors (Black for TikTok, Blue for Meta, Yellow for Google)
- Progress bars: Platform/category specific colors
- Active states: Blue-50 background with Blue-600 text/border

### Typography
- Page titles: text-2xl font-bold
- Section titles: text-lg font-semibold
- Subsection titles: text-sm font-medium
- Body text: text-sm
- Meta info: text-xs text-gray-500

### Layout
- Consistent padding: p-6 for cards
- Card shadows: shadow-sm with border
- Grid layouts: Responsive (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- Gaps: gap-6 for main grids, gap-3 for smaller elements

### Interactive Elements
- Hover effects: hover:shadow-lg hover:border-blue-300
- Transition: transition-all or transition-colors
- Active timeline points: scale-150 with blue-600 color
- Buttons: Rounded-lg with border and hover states

## Data Structure

### Brand Object
```typescript
interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  activeAds: number;
  totalAds: number;
  platforms: string[];
  lastActive: string;
}
```

### Timeline Data
```typescript
interface TimelineDay {
  day: number;
  date: string;
  adsLaunched: number;
  activeAds: number;
  spend: number;
}
```

## Key Features

1. **Multi-level Navigation**
   - Favorites → Brand Folder → Brand List → Brand Detail
   - Breadcrumb navigation with back button

2. **Comprehensive Analytics**
   - Platform and creative type distribution
   - Performance metrics with filters
   - Strategic insights and predictions
   - Historical timeline tracking

3. **Landing Page Analysis**
   - Top performing landing pages
   - Visit metrics
   - Preview capability

4. **Ad Library Integration**
   - Full ad grid in Total Ads tab
   - Reuses existing ad card components
   - Opens ad detail modal on click

5. **User Interactions**
   - Search and filter
   - Checkbox selection
   - Bulk actions
   - Interactive timeline
   - Tab switching

## Future Enhancements
- [ ] Implement real API data integration
- [ ] Add landing page screenshot preview
- [ ] Export analytics reports
- [ ] Compare multiple brands
- [ ] Add date range filters for performance
- [ ] Implement ad detail modal integration
- [ ] Add brand notes and tags
- [ ] Create brand tracking notifications
