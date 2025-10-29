# Creator Shortlist Folder

## Overview

This folder contains the Creator Shortlist feature, which displays a parent-child structured list of creator submissions within the favorites system.

## Page Structure

### Route
- **Path**: `/my/favorites/creator/[folderId]`
- **Component**: `app/my/favorites/creator/[folderId]/page.tsx`

## Features

### 1. Parent List (Submission Summary)

The parent list displays submission records with the following fields:

- **Submission Number**: Unique identifier (e.g., SUB-2024-001)
- **Submitter**: Name of the person who created the submission
- **Submission Date**: Date when the submission was created
- **Status**: Current status with color-coded badges
  - 🟡 **Pending**: Yellow badge - submission is waiting to be processed
  - 🔵 **Submitted**: Blue badge - submission is under review
  - 🟢 **Approved**: Green badge - submission has been approved
- **Creator Count**: Number of creators in the submission
- **Actions**:
  - **Export**: Download submission data
  - **Share**: Share submission with others

### 2. Child List (Creator Details)

When a submission is expanded, it displays detailed creator information in a table format:

#### Basic Information
- **Creator Avatar**: Profile picture
- **Creator Name**: Full name of the creator
- **Tags**: Category tags (e.g., Fashion, Beauty, Tech)
- **Country**: Location with country flag emoji
- **Platform**: Social media platform (TikTok, Instagram, YouTube)

#### Performance Metrics
- **Followers**: Total follower count
- **Gender**: Male, Female, or Other
- **Contact**: Email address (truncated for privacy)
- **Avg Play Rate**: Average play rate of last 10 videos (%)
- **Engagement Rate**: Follower engagement rate (%)
- **View/Follower Ratio**: Average views per follower
- **Estimated Reach**: Projected audience reach

#### Additional Details (Expandable Section)
- **Video Count**: Total number of videos published
- **GMV**: Gross Merchandise Value
- **Audience Distribution**:
  - Age ranges with percentages
  - Gender distribution
  - Geographic location distribution

## User Interface

### Layout
- **Header**: Back button, title, and statistics
- **Search Bar**: Filter submissions and creators by keyword
- **Submission Cards**: Expandable cards showing parent and child data

### Interactions
1. **Click submission row**: Toggle expand/collapse child list
2. **Click Export button**: Export submission data
3. **Click Share button**: Share submission
4. **Search**: Real-time filtering of submissions and creators

### Design Specifications
- **Parent Row**: 
  - Background: White
  - Hover: Light gray background
  - Click: Expand/collapse with rotation animation on chevron icon

- **Child List**:
  - Background: Light gray
  - Header: Dark gray with column labels
  - Rows: Hover effect with darker gray background
  - Grid: 12-column responsive layout

### Status Badge Colors
- Pending: `bg-yellow-100 text-yellow-700`
- Submitted: `bg-blue-100 text-blue-700`
- Approved: `bg-green-100 text-green-700`

## Data Structure

```typescript
interface Submission {
  id: string;
  submissionNumber: string;
  submitter: string;
  submissionDate: string;
  status: 'pending' | 'submitted' | 'approved';
  creators: Creator[];
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  tags: string[];
  country: string;
  platform: string;
  followers: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  avgPlayRate: number;
  engagementRate: number;
  viewToFollowerRatio: number;
  estimatedReach: number;
  videoCount: number;
  gmv: number;
  audienceDistribution: {
    age: { range: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
    location: { country: string; percentage: number }[];
  };
}
```

## Mock Data

The page currently uses mock data with 3 sample submissions containing various creators. In production, this should be replaced with API calls to fetch real submission data.

## Navigation Flow

1. User clicks on a Creator folder in **My Favorites** (`/my/favorites`)
2. Router navigates to Creator Shortlist page (`/my/favorites/creator/[folderId]`)
3. Page displays submissions associated with that folder
4. User can:
   - Search for specific submissions or creators
   - Expand/collapse submissions to view creator details
   - Export or share submission data
   - Navigate back to favorites main page

## Responsive Design

The layout is designed to work on various screen sizes:
- **Desktop**: Full table view with all columns
- **Tablet**: Adjusted column widths
- **Mobile**: Consider implementing a mobile-optimized card layout (future enhancement)

## Future Enhancements

1. **API Integration**: Replace mock data with real backend API
2. **Filtering**: Add advanced filters by status, date range, platform
3. **Sorting**: Allow sorting by different columns
4. **Bulk Actions**: Select multiple submissions for batch operations
5. **Creator Details Modal**: Click on creator to view full profile
6. **Export Formats**: Support CSV, Excel, PDF export formats
7. **Real-time Updates**: WebSocket integration for live status updates

## Related Files

- **Main Favorites Page**: `/app/my/favorites/page.tsx`
- **Regular Folder Page**: `/app/my/favorites/[folderId]/page.tsx`
- **Brand Folder Page**: `/app/my/favorites/brand/[folderId]/page.tsx`
- **Components**: 
  - `/components/ui/*` (Button, Input, Badge, etc.)
  - `/components/icons/*` (Platform icons, system icons)

## Usage Example

```typescript
// Navigate to creator folder from favorites page
router.push(`/my/favorites/creator/${folderId}`);

// Handle export action
const handleExport = (submissionId: string) => {
  // Export logic here
  console.log('Exporting submission:', submissionId);
};

// Handle share action
const handleShare = (submissionId: string) => {
  // Share logic here
  console.log('Sharing submission:', submissionId);
};
```

## Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Indicators**: Visible focus states for all interactive elements
