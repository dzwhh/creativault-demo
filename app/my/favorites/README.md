# Favorites Feature

## Overview
This feature allows users to organize and manage their favorite items (Ads, Creative, Products, Creator) into folders.

## File Structure
```
app/my/favorites/
├── page.tsx                 # Main favorites page with folder list
└── [folderId]/
    └── page.tsx            # Folder detail page showing items
```

## Layout Design

### Page Structure (Consistent with Ads Page)

**Top Section:**
- `PageHeader` component with:
  - Title: "My Favorites"
  - Description: "Manage and organize all your favorite items across different categories"
  - Background: `bg-[#F8F9FA]` (light gray)

**Main Content Section:**
```
┌─────────────────────────────────────────────────┐
│  Page Header (My Favorites)                     │
│  Description text                                │
└─────────────────────────────────────────────────┘
┌───────────┬─────────────────────────────────────┐
│           │  Search Bar + More Filter            │
│ Categories│  ┌────────────────────────────────┐  │
│           │  │                                │  │
│ • Ads     │  │   Folders Grid                 │  │
│ • Creative│  │   (Responsive 1-4 columns)     │  │
│ • Products│  │                                │  │
│ • Creator │  └────────────────────────────────┘  │
└───────────┴─────────────────────────────────────┘
```

## Features

### Main Favorites Page (`/my/favorites`)
- **Page Header**: 
  - Unified header with Ads page style
  - Title and description area
  
- **Left Sidebar (Categories)**: 
  - White background with border
  - Rounded corners (rounded-lg)
  - Fixed width: 256px (w-64)
  - Navigation items:
    - Ads
    - Creative
    - Products
    - Creator
  - Active state: Blue background (bg-blue-50) + blue text
  
- **Search & Filter**: 
  - Search input with icon
  - "More Filter" button
  - Bordered container with shadow
  
- **Folder Grid**: 
  - Responsive grid (1-4 columns)
  - Each folder card shows:
    - Folder icon with gradient background (blue to purple)
    - Folder name
    - Item count with heart icon
    - Creation date
  - Hover effects: border-blue-300 + shadow-lg
  - Click to navigate to folder detail

### Folder Detail Page (`/my/favorites/[folderId]`)
- **Header**: 
  - Back button to return to favorites list
  - Folder name and metadata
  
- **Search & Actions**: 
  - Search items within folder
  - Bulk selection support
  - Remove and Move actions
  
- **Items Grid**: 
  - Display items in responsive grid
  - Checkbox for multi-selection
  - Item thumbnail, title, platform, and saved date

## Design Principles

### Color Scheme (User Preference)
- **Primary**: Blue-cyan color system (清淡蓝青色系)
- **Active State**: `bg-blue-50` + `text-blue-600`
- **Folder Icon**: Gradient from `from-blue-50 to-purple-50`
- **Hover**: `border-blue-300`

### No Breathing Effects (User Preference)
- ❌ No gradient animation on hover
- ❌ No opacity transitions
- ✅ Simple static design
- ✅ Only essential hover effects (border, shadow)

### Layout Consistency
- Same structure as Ads page:
  - PageHeader at top
  - Left sidebar for filters/categories
  - Right content area for main content
  - Search bar above content grid

## Navigation
The Favorites page is accessible from:
1. Sidebar → My Page → Favorites
2. Direct URL: `/my/favorites`

## Future Enhancements
- [ ] Implement actual data fetching from API
- [ ] Add folder creation/deletion functionality
- [ ] Implement drag-and-drop for organizing items
- [ ] Add export functionality
- [ ] Implement sharing features
- [ ] Add collaborative folder support
- [ ] Add sorting options (by name, date, item count)
- [ ] Implement folder renaming
- [ ] Add folder color customization
