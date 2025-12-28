'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, FilterIcon, ChevronDownIcon, TikTokIcon, InstagramIcon, YoutubeIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ContactEmail from '@/app/asset-studio/influencer-contact/contact-email';

// View mode types
type ViewMode = 'submitter' | 'reviewer' | 'inbox';

// Email types
type EmailFolder = 'inbox' | 'sent' | 'drafts' | 'trash';
type EmailPriority = 'high' | 'normal' | 'low';
type EmailStatus = 'unread' | 'read' | 'replied' | 'forwarded';

// Simple Email Label System
type SimpleEmailLabel = 'Waiting' | 'Replied' | 'Interested' | 'Negotiating' | 'Rejected' | 'Bounced';

// Email Label System (Legacy - for detailed tracking)
// 1. Lifecycle Tags (进度标签)
type LifecycleTag = 'Outreach' | 'Negotiating' | 'Seeding' | 'Locked' | 'Live';
// 2. Sentiment Tags (状态/意向标签)
type SentimentTag = 'Warm' | 'Cold' | 'Rejected' | 'Ghosted' | 'Bounced';
// 3. Pitch Readiness Tags (提报决策标签)
type PitchTag = 'Ready' | 'Backup' | 'Risk' | 'Hold';
// 4. Action Tags (待办动作标签)
type ActionTag = 'FollowUp' | 'SendBrief' | 'CheckDraft' | 'Pay';

interface EmailLabels {
  lifecycle?: LifecycleTag;
  sentiment?: SentimentTag;
  pitch?: PitchTag;
  action?: ActionTag;
}

// Label display config
const labelConfig: Record<string, { bg: string; text: string; border?: string; icon?: string; meaning: string }> = {
  // Simple Labels - Main categories
  Waiting: { bg: 'bg-amber-100', text: 'text-amber-700', meaning: '等待回复' },
  Replied: { bg: 'bg-blue-100', text: 'text-blue-700', meaning: '已回复' },
  Interested: { bg: 'bg-green-100', text: 'text-green-700', meaning: '有意向' },
  Negotiating: { bg: 'bg-indigo-100', text: 'text-indigo-700', meaning: '谈判中' },
  Rejected: { bg: 'bg-gray-200', text: 'text-gray-500', meaning: '已拒绝' },
  Bounced: { bg: 'bg-rose-100', text: 'text-rose-600', meaning: '退信' },
  // Legacy Lifecycle Tags
  Outreach: { bg: 'bg-sky-100', text: 'text-sky-700', meaning: '触达期' },
  Seeding: { bg: 'bg-violet-100', text: 'text-violet-700', meaning: '寄样中' },
  Locked: { bg: 'bg-blue-100', text: 'text-blue-700', meaning: '已锁定' },
  Live: { bg: 'bg-teal-100', text: 'text-teal-700', meaning: '已发布' },
  // Legacy Sentiment Tags
  Warm: { bg: 'bg-orange-100', text: 'text-orange-700', meaning: '有意向' },
  Cold: { bg: 'bg-slate-100', text: 'text-slate-600', meaning: '冷淡' },
  Ghosted: { bg: 'bg-zinc-100', text: 'text-zinc-500', meaning: '失联' },
  // Legacy Pitch Readiness Tags
  Ready: { bg: 'bg-green-100', text: 'text-green-700', meaning: '可提报' },
  Backup: { bg: 'bg-amber-100', text: 'text-amber-700', meaning: '备选' },
  Risk: { bg: 'bg-red-100', text: 'text-red-600', meaning: '有风险' },
  Hold: { bg: 'bg-yellow-100', text: 'text-yellow-700', meaning: '暂缓' },
  // Legacy Action Tags
  FollowUp: { bg: 'bg-red-500', text: 'text-white', meaning: '需跟进' },
  SendBrief: { bg: 'bg-purple-100', text: 'text-purple-700', meaning: '发Brief' },
  CheckDraft: { bg: 'bg-cyan-100', text: 'text-cyan-700', meaning: '审稿' },
  Pay: { bg: 'bg-emerald-100', text: 'text-emerald-700', meaning: '付款' },
};

// Get display labels based on simpleLabel
const getDisplayLabels = (simpleLabel?: SimpleEmailLabel): string[] => {
  switch (simpleLabel) {
    case 'Waiting':
      return ['Outreach'];
    case 'Replied':
      return ['Outreach', 'FollowUp'];
    case 'Interested':
      return ['Outreach', 'FollowUp', 'SendBrief'];
    case 'Negotiating':
      return ['Outreach', 'FollowUp', 'SendBrief', 'Warm'];
    case 'Rejected':
      return ['Rejected'];
    case 'Bounced':
      return ['Bounced'];
    default:
      return [];
  }
};

// Email interface
interface EmailAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: {
    name: string;
    email: string;
  }[];
  cc?: {
    name: string;
    email: string;
  }[];
  subject: string;
  body: string;
  preview: string;
  folder: EmailFolder;
  priority: EmailPriority;
  status: EmailStatus;
  starred: boolean;
  hasAttachments: boolean;
  attachments?: EmailAttachment[];
  createdAt: string;
  labels?: string[];  // legacy simple labels
  emailLabels?: EmailLabels;  // detailed structured labels
  simpleLabel?: SimpleEmailLabel;  // simplified label for sidebar
}

// Submission status types
type SubmissionStatus = 'pending' | 'submitted' | 'approved';

// Creator collaboration progress status
type CreatorApprovalStatus = 'on_track' | 'at_risk' | 'blocked';

// Creator collaboration step/stage
type CollaborationStep = 'waiting' | 'replied' | 'brief_sent' | 'negotiating' | 'confirmed' | 'rejected' | 'bounced';

// Step configuration
const collaborationSteps: { id: CollaborationStep; name: string; description: string }[] = [
  { id: 'waiting', name: 'Waiting', description: 'Awaiting reply' },
  { id: 'replied', name: 'Replied', description: 'Reply received, brief to send' },
  { id: 'brief_sent', name: 'Brief Sent', description: 'Brief sent, awaiting confirmation' },
  { id: 'negotiating', name: 'Negotiating', description: 'In negotiation' },
  { id: 'confirmed', name: 'Confirmed', description: 'Collaboration agreed' },
  { id: 'rejected', name: 'Rejected', description: 'Declined' },
  { id: 'bounced', name: 'Bounced', description: 'Bounced, try another channel' },
];

// Collection Task interface
interface CollectionTask {
  id: string;
  taskNumber: string;
  clientName: string;
  createdDate: string;
  deliveryDate: string;
  status: 'pending' | 'completed';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  shareLink?: string;
}

// Creator interface
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
  approvalStatus: CreatorApprovalStatus; // 客户审核状态
  avgPlayRate: number; // 近10条视频的均播率
  engagementRate: number; // 粉丝互动率
  viewToFollowerRatio: number; // 观看量/粉丝量
  estimatedReach: number; // 预计曝光量
  videoCount: number;
  gmv: number;
  audienceDistribution: {
    age: { range: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
    location: { country: string; percentage: number }[];
  };
}

// Submission interface (parent list)
interface Submission {
  id: string;
  submissionNumber: string;
  submitter: string;
  submissionDate: string;
  status: SubmissionStatus;
  clientNames: string[]; // 提报的客户名称列表（支持多个客户）
  creators: Creator[];
}

// Reviewer submission interface (for reviewer view)
interface ReviewerSubmission {
  id: string;
  submissionNumber: string;
  partner: string; // 提报合作方
  submissionDate: string;
  status: SubmissionStatus;
  creators: Creator[];
}

// Mock data
const mockSubmissions: Submission[] = [
  {
    id: '1',
    submissionNumber: 'SUB-2024-001',
    submitter: 'John Doe',
    submissionDate: new Date().toISOString().split('T')[0], // Today's date
    status: 'pending',
    clientNames: ['Nike Inc.', 'Nike Asia'],
    creators: [
      {
        id: 'c1',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        tags: ['Fashion', 'Lifestyle'],
        country: 'US',
        platform: 'TikTok',
        followers: 2500000,
        gender: 'Female',
        contact: 'emma.w@example.com',
        approvalStatus: 'on_track',
        avgPlayRate: 75.5,
        engagementRate: 8.2,
        viewToFollowerRatio: 0.65,
        estimatedReach: 1625000,
        videoCount: 234,
        gmv: 580000,
        audienceDistribution: {
          age: [
            { range: '18-24', percentage: 45 },
            { range: '25-34', percentage: 35 },
            { range: '35-44', percentage: 15 },
            { range: '45+', percentage: 5 },
          ],
          gender: [
            { type: 'Female', percentage: 68 },
            { type: 'Male', percentage: 32 },
          ],
          location: [
            { country: 'US', percentage: 55 },
            { country: 'CA', percentage: 20 },
            { country: 'GB', percentage: 15 },
            { country: 'Others', percentage: 10 },
          ],
        },
      },
      {
        id: 'c2',
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        tags: ['Tech', 'Gaming'],
        country: 'CN',
        platform: 'YouTube',
        followers: 1800000,
        gender: 'Male',
        contact: 'david.chen@example.com',
        approvalStatus: 'at_risk',
        avgPlayRate: 82.3,
        engagementRate: 6.8,
        viewToFollowerRatio: 0.72,
        estimatedReach: 1296000,
        videoCount: 156,
        gmv: 420000,
        audienceDistribution: {
          age: [
            { range: '18-24', percentage: 50 },
            { range: '25-34', percentage: 30 },
            { range: '35-44', percentage: 15 },
            { range: '45+', percentage: 5 },
          ],
          gender: [
            { type: 'Male', percentage: 75 },
            { type: 'Female', percentage: 25 },
          ],
          location: [
            { country: 'CN', percentage: 45 },
            { country: 'US', percentage: 25 },
            { country: 'JP', percentage: 15 },
            { country: 'Others', percentage: 15 },
          ],
        },
      },
    ],
  },
  {
    id: '2',
    submissionNumber: 'SUB-2024-002',
    submitter: 'Sarah Johnson',
    submissionDate: new Date().toISOString().split('T')[0], // Today's date
    status: 'submitted',
    clientNames: ['Adidas Group'],
    creators: [
      {
        id: 'c3',
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        tags: ['Beauty', 'Skincare'],
        country: 'KR',
        platform: 'Instagram',
        followers: 3200000,
        gender: 'Female',
        contact: 'lisa.park@example.com',
        approvalStatus: 'on_track',
        avgPlayRate: 78.9,
        engagementRate: 9.5,
        viewToFollowerRatio: 0.68,
        estimatedReach: 2176000,
        videoCount: 412,
        gmv: 1250000,
        audienceDistribution: {
          age: [
            { range: '18-24', percentage: 55 },
            { range: '25-34', percentage: 30 },
            { range: '35-44', percentage: 10 },
            { range: '45+', percentage: 5 },
          ],
          gender: [
            { type: 'Female', percentage: 82 },
            { type: 'Male', percentage: 18 },
          ],
          location: [
            { country: 'KR', percentage: 40 },
            { country: 'US', percentage: 30 },
            { country: 'JP', percentage: 20 },
            { country: 'Others', percentage: 10 },
          ],
        },
      },
    ],
  },
  {
    id: '3',
    submissionNumber: 'SUB-2024-003',
    submitter: 'Michael Brown',
    submissionDate: '2024-03-05',
    status: 'approved',
    clientNames: ['Puma Corporation', 'Puma Europe'],
    creators: [
      {
        id: 'c4',
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        tags: ['Fitness', 'Health'],
        country: 'US',
        platform: 'TikTok',
        followers: 1500000,
        gender: 'Male',
        contact: 'alex.r@example.com',
        approvalStatus: 'blocked',
        avgPlayRate: 85.2,
        engagementRate: 7.3,
        viewToFollowerRatio: 0.78,
        estimatedReach: 1170000,
        videoCount: 189,
        gmv: 350000,
        audienceDistribution: {
          age: [
            { range: '18-24', percentage: 40 },
            { range: '25-34', percentage: 35 },
            { range: '35-44', percentage: 20 },
            { range: '45+', percentage: 5 },
          ],
          gender: [
            { type: 'Male', percentage: 60 },
            { type: 'Female', percentage: 40 },
          ],
          location: [
            { country: 'US', percentage: 65 },
            { country: 'CA', percentage: 15 },
            { country: 'GB', percentage: 10 },
            { country: 'Others', percentage: 10 },
          ],
        },
      },
    ],
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Check if date is today
const isToday = (dateString: string): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
};

const getCountryFlag = (code: string): string => {
  const flags: Record<string, string> = {
    'US': '🇺🇸',
    'CA': '🇨🇦',
    'GB': '🇬🇧',
    'CN': '🇨🇳',
    'KR': '🇰🇷',
    'JP': '🇯🇵',
    'IN': '🇮🇳',
    'AU': '🇦🇺',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
  };
  return flags[code] || '🏳️';
};

const getStatusBadge = (status: SubmissionStatus) => {
  const statusConfig = {
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
    submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-700' },
    approved: { label: 'Approved', className: 'bg-green-100 text-green-700' },
  };

  const config = statusConfig[status];
  return (
    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', config.className)}>
      {config.label}
    </span>
  );
};

const getCreatorApprovalBadge = (status: CreatorApprovalStatus) => {
  const statusConfig = {
    on_track: { label: 'On Track', className: 'bg-green-100 text-green-700 border border-green-300' },
    at_risk: { label: 'At Risk', className: 'bg-yellow-100 text-yellow-700 border border-yellow-300' },
    blocked: { label: 'Blocked', className: 'bg-red-100 text-red-700 border border-red-300' },
  };

  const config = statusConfig[status];
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium', config.className)}>
      {config.label}
    </span>
  );
};

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'tiktok':
      return <TikTokIcon className="w-4 h-4" />;
    case 'instagram':
      return <InstagramIcon className="w-4 h-4" />;
    case 'youtube':
      return <YoutubeIcon className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function InfluencerSubmissionPage() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubmissions, setExpandedSubmissions] = useState<Set<string>>(new Set());
  const [selectedSubmissions, setSelectedSubmissions] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('submitter');
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentShareSubmissionId, setCurrentShareSubmissionId] = useState<string | null>(null);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [newClientName, setNewClientName] = useState('');
  const [reviewerSubmissions, setReviewerSubmissions] = useState<ReviewerSubmission[]>([]);
  const [creatorApprovalStates, setCreatorApprovalStates] = useState<Record<string, CreatorApprovalStatus>>({});
  const [showContactEmail, setShowContactEmail] = useState(false);
  const [contactCreators, setContactCreators] = useState<Creator[]>([]);
  
  // Collection Service states
  const [collectionTasks, setCollectionTasks] = useState<CollectionTask[]>([]);
  
  // Email Inbox states
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: {
        name: 'Emma Wilson',
        email: 'emma.w@brandagency.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      },
      to: [{ name: 'Me', email: 'me@company.com' }],
      subject: 'RE: Influencer Campaign Proposal - Q1 2025',
      body: `Hi there,

Thank you for your interest in our Q1 2025 influencer campaign proposal. I've reviewed the creator list you sent and I'm impressed with the selection.

Here are my thoughts:

1. **Emma Wilson** - Perfect fit for our beauty line. Her engagement rate is excellent.
2. **David Chen** - Great for tech products, but we need to verify his audience demographics.
3. **Lisa Park** - Top choice for Korean market expansion.

Could you please provide:
- Detailed pricing for each influencer
- Available campaign slots for January
- Content format recommendations

Let's schedule a call to discuss further.

Best regards,
Emma Wilson
Brand Manager
Brand Agency Inc.`,
      preview: 'Thank you for your interest in our Q1 2025 influencer campaign proposal...',
      folder: 'inbox',
      priority: 'high',
      status: 'unread',
      starred: true,
      hasAttachments: true,
      attachments: [
        { id: 'a1', name: 'Campaign_Brief_Q1.pdf', size: 2048576, type: 'application/pdf', url: '/files/brief.pdf' },
        { id: 'a2', name: 'Budget_Template.xlsx', size: 524288, type: 'application/xlsx', url: '/files/budget.xlsx' },
      ],
      createdAt: new Date().toISOString(),
      labels: ['Important', 'Campaign'],
      emailLabels: { lifecycle: 'Negotiating', sentiment: 'Warm', pitch: 'Ready' },
      simpleLabel: 'Interested',
    },
    {
      id: '2',
      from: {
        name: 'Michael Chen',
        email: 'michael.chen@techcorp.io',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      },
      to: [{ name: 'Me', email: 'me@company.com' }],
      subject: 'Collaboration Request - TechCorp Product Launch',
      body: `Dear Team,

I hope this email finds you well. I'm reaching out regarding a potential collaboration for our upcoming product launch.

We're launching a new smart home device in February and are looking for:
- 5-10 tech influencers with 500K+ followers
- Focus on US and European markets
- Budget: $50,000 - $100,000

Would you be able to provide a list of suitable creators along with their rates?

Timeline:
- Creator selection: January 15th
- Content creation: January 20th - February 10th
- Launch date: February 15th

Looking forward to your response.

Best,
Michael Chen
Marketing Director
TechCorp`,
      preview: 'I hope this email finds you well. I\'m reaching out regarding a potential collaboration...',
      folder: 'inbox',
      priority: 'normal',
      status: 'read',
      starred: false,
      hasAttachments: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      labels: ['Business'],
      emailLabels: { lifecycle: 'Outreach', sentiment: 'Warm', action: 'SendBrief' },
      simpleLabel: 'Interested',
    },
    {
      id: '3',
      from: {
        name: 'Emma Roberts',
        email: 'emma.r@fashionhouse.com',
      },
      to: [{ name: 'Me', email: 'me@company.com' }],
      cc: [{ name: 'John Smith', email: 'john@company.com' }],
      subject: 'Fashion Week Influencer Partnership',
      body: `Hello,

Fashion Week is approaching and we're finalizing our influencer partnerships. We need:

- 3 fashion influencers for runway coverage
- 2 beauty influencers for backstage content
- 1 lifestyle influencer for overall event coverage

All influencers should have:
- Minimum 1M followers
- Strong presence in fashion/beauty niche
- Previous event coverage experience

Please send your recommendations by end of week.

Thanks,
Emma`,
      preview: 'Fashion Week is approaching and we\'re finalizing our influencer partnerships...',
      folder: 'inbox',
      priority: 'high',
      status: 'unread',
      starred: true,
      hasAttachments: true,
      attachments: [
        { id: 'a3', name: 'FashionWeek_Schedule.pdf', size: 1048576, type: 'application/pdf', url: '/files/schedule.pdf' },
      ],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      labels: ['Important', 'Fashion'],
      emailLabels: { lifecycle: 'Outreach', pitch: 'Backup', action: 'FollowUp' },
      simpleLabel: 'Waiting',
    },
    {
      id: '4',
      from: {
        name: 'Alex Turner',
        email: 'alex@startupventures.co',
      },
      to: [{ name: 'Me', email: 'me@company.com' }],
      subject: 'Quick Question About Creator Rates',
      body: `Hi,

Just a quick question - what's the typical rate range for TikTok creators with 500K-1M followers?

We're planning a small campaign and need to set our budget expectations.

Thanks!
Alex`,
      preview: 'Just a quick question - what\'s the typical rate range for TikTok creators...',
      folder: 'inbox',
      priority: 'low',
      status: 'replied',
      starred: false,
      hasAttachments: false,
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      emailLabels: { lifecycle: 'Negotiating', sentiment: 'Cold', pitch: 'Hold' },
      simpleLabel: 'Replied',
    },
    {
      id: '5',
      from: {
        name: 'Nike Marketing Team',
        email: 'marketing@nike.com',
        avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      },
      to: [{ name: 'Me', email: 'me@company.com' }],
      subject: 'Annual Partnership Review - Action Required',
      body: `Dear Partner,

As we approach the end of 2024, we'd like to schedule our annual partnership review meeting.

Agenda items:
1. 2024 Campaign Performance Review
2. Creator ROI Analysis
3. 2025 Partnership Terms
4. New Product Launch Calendar
5. Budget Allocation Discussion

Please confirm your availability for a 1-hour video call next week.

Proposed times:
- Monday 2pm EST
- Tuesday 10am EST
- Wednesday 3pm EST

Best regards,
Nike Marketing Team`,
      preview: 'As we approach the end of 2024, we\'d like to schedule our annual partnership review...',
      folder: 'inbox',
      priority: 'high',
      status: 'read',
      starred: true,
      hasAttachments: true,
      attachments: [
        { id: 'a4', name: '2024_Performance_Report.pdf', size: 5242880, type: 'application/pdf', url: '/files/report.pdf' },
        { id: 'a5', name: '2025_Partnership_Proposal.docx', size: 1572864, type: 'application/docx', url: '/files/proposal.docx' },
      ],
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      labels: ['Important', 'Nike', 'Partnership'],
      emailLabels: { lifecycle: 'Locked', sentiment: 'Warm', pitch: 'Ready', action: 'CheckDraft' },
      simpleLabel: 'Negotiating',
    },
  ]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emailFolder, setEmailFolder] = useState<EmailFolder>('inbox');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [emailListWidth, setEmailListWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const [emailSearchQuery, setEmailSearchQuery] = useState('');
  const [selectedLabelFilter, setSelectedLabelFilter] = useState<string | null>(null);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [customTagInput, setCustomTagInput] = useState('');
  const [emailCustomTags, setEmailCustomTags] = useState<Record<string, string[]>>({});
  const [showShareEmailModal, setShowShareEmailModal] = useState(false);
  const [currentShareTaskId, setCurrentShareTaskId] = useState<string | null>(null);
  const [shareEmail, setShareEmail] = useState('');
  
  // Creator selection states for quick approve/reject
  const [creatorSelectionStates, setCreatorSelectionStates] = useState<Record<string, 'approved' | 'rejected' | null>>({});
  
  // Creator price states
  const [creatorPrices, setCreatorPrices] = useState<Record<string, number | null>>({});
  const [editingPriceCreatorId, setEditingPriceCreatorId] = useState<string | null>(null);
  
  // Creator collaboration progress states
  const [creatorProgressSteps, setCreatorProgressSteps] = useState<Record<string, CollaborationStep>>({});
  const [showProgressPopover, setShowProgressPopover] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState<{
    taskNumber: string;
    fileName: string;
    data: Array<Record<string, any>>;
  } | null>(null);

  // Available clients list (mock data)
  const availableClients = ['Nike Inc.', 'Adidas Group', 'Puma Corporation', 'Under Armour', 'New Balance'];

  // Mock preview data for collection tasks
  const getMockPreviewData = (taskId: string) => {
    // Simulate loading data from file
    const mockData = [
      {
        influencerName: 'Emma Wilson',
        platform: 'TikTok',
        followers: '2.5M',
        views: '1.2M',
        homepageLink: 'https://tiktok.com/@emmawilson',
        influencerId: 'TT001',
        country: 'US',
        publishDate: '2024-12-15',
        language: 'English',
        engagement: '8.2%',
      },
      {
        influencerName: 'David Chen',
        platform: 'YouTube',
        followers: '1.8M',
        views: '890K',
        homepageLink: 'https://youtube.com/@davidchen',
        influencerId: 'YT002',
        country: 'CN',
        publishDate: '2024-12-14',
        language: 'Chinese',
        engagement: '6.8%',
      },
      {
        influencerName: 'Lisa Park',
        platform: 'Instagram',
        followers: '3.2M',
        views: '2.1M',
        homepageLink: 'https://instagram.com/lisapark',
        influencerId: 'IG003',
        country: 'KR',
        publishDate: '2024-12-13',
        language: 'Korean',
        engagement: '9.5%',
      },
      {
        influencerName: 'Alex Johnson',
        platform: 'TikTok',
        followers: '1.5M',
        views: '750K',
        homepageLink: 'https://tiktok.com/@alexj',
        influencerId: 'TT004',
        country: 'GB',
        publishDate: '2024-12-12',
        language: 'English',
        engagement: '7.3%',
      },
      {
        influencerName: 'Sophie Martin',
        platform: 'Instagram',
        followers: '2.2M',
        views: '1.5M',
        homepageLink: 'https://instagram.com/sophiem',
        influencerId: 'IG005',
        country: 'FR',
        publishDate: '2024-12-11',
        language: 'French',
        engagement: '8.9%',
      },
    ];
    return mockData;
  };

  const handlePreviewTask = (task: CollectionTask) => {
    if (!task.fileName) {
      alert('No file available for preview');
      return;
    }
    const data = getMockPreviewData(task.id);
    setPreviewData({
      taskNumber: task.taskNumber,
      fileName: task.fileName,
      data,
    });
    setShowPreviewModal(true);
  };

  const toggleSubmission = (submissionId: string) => {
    setExpandedSubmissions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  };

  const toggleSelectSubmission = (submissionId: string) => {
    setSelectedSubmissions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedSubmissions.size === filteredSubmissions.length) {
      setSelectedSubmissions(new Set());
    } else {
      setSelectedSubmissions(new Set(filteredSubmissions.map(s => s.id)));
    }
  };

  const handleBatchShare = () => {
    if (selectedSubmissions.size === 0) {
      alert('Please select at least one submission');
      return;
    }

    // Generate share link and navigate to share page
    const shareId = `share_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const shareUrl = `/my/favorites/creator/share/${shareId}`;
    
    // In production, should call API to save share data
    console.log('Batch sharing submissions:', Array.from(selectedSubmissions));
    
    // Navigate to share page
    router.push(shareUrl);
  };

  const handlePendingCreator = (creatorId: string, creatorName: string) => {
    console.log('Marking creator as pending:', creatorId);
    alert(`Marking ${creatorName} as pending`);
    // In production, call API to update creator status
  };

  const handleDeleteCreator = (creatorId: string, creatorName: string) => {
    if (confirm(`Are you sure you want to delete ${creatorName} from this submission?`)) {
      console.log('Deleting creator:', creatorId);
      alert(`Deleted ${creatorName}`);
      // In production, call API to delete creator
    }
  };

  const handleExport = (submissionId: string) => {
    console.log('Exporting submission:', submissionId);
    alert(`Exporting submission ${submissionId}`);
  };

  const handleShare = (submissionId: string) => {
    setCurrentShareSubmissionId(submissionId);
    setSelectedClients(new Set());
    setNewClientName('');
    setShowShareModal(true);
  };

  const toggleClientSelection = (client: string) => {
    setSelectedClients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(client)) {
        newSet.delete(client);
      } else {
        newSet.add(client);
      }
      return newSet;
    });
  };

  const handleAddNewClient = () => {
    if (newClientName.trim()) {
      setSelectedClients(prev => new Set(Array.from(prev).concat(newClientName.trim())));
      setNewClientName('');
    }
  };

  // Handle email list resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = e.clientX - 224; // 224px is left sidebar width (w-56 = 14rem = 224px)
    if (newWidth >= 250 && newWidth <= 500) {
      setEmailListWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Add event listeners for resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleConfirmShare = () => {
    if (selectedClients.size === 0) {
      alert('Please select at least one client');
      return;
    }

    const submission = mockSubmissions.find(s => s.id === currentShareSubmissionId);
    if (!submission) return;

    // Generate share link
    const shareId = `share_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const shareUrl = `${window.location.origin}/my/favorites/creator/share/${shareId}`;

    // Create reviewer submissions for each selected client
    const newReviewerSubmissions: ReviewerSubmission[] = Array.from(selectedClients).map(client => ({
      id: `${submission.id}_${client}_${Date.now()}`,
      submissionNumber: submission.submissionNumber,
      partner: client,
      submissionDate: submission.submissionDate,
      status: 'pending' as SubmissionStatus,
      creators: submission.creators.map(c => ({ ...c, approvalStatus: 'pending' as CreatorApprovalStatus })),
    }));

    setReviewerSubmissions(prev => [...prev, ...newReviewerSubmissions]);

    // Copy link to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(`Share link generated and copied!\n\nLink: ${shareUrl}\nClients: ${Array.from(selectedClients).join(', ')}`);
    });

    setShowShareModal(false);
    setCurrentShareSubmissionId(null);
  };

  const handleApproveCreator = (submissionId: string, creatorId: string) => {
    setCreatorApprovalStates(prev => ({
      ...prev,
      [`${submissionId}_${creatorId}`]: 'approved'
    }));

    // Update reviewer submission creator status
    setReviewerSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          creators: sub.creators.map(c => 
            c.id === creatorId ? { ...c, approvalStatus: 'approved' as CreatorApprovalStatus } : c
          )
        };
      }
      return sub;
    }));
  };

  const handleRejectCreator = (submissionId: string, creatorId: string) => {
    setCreatorApprovalStates(prev => ({
      ...prev,
      [`${submissionId}_${creatorId}`]: 'rejected'
    }));

    // Update reviewer submission creator status
    setReviewerSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          creators: sub.creators.map(c => 
            c.id === creatorId ? { ...c, approvalStatus: 'rejected' as CreatorApprovalStatus } : c
          )
        };
      }
      return sub;
    }));
  };

  // Filter submissions based on search
  const filteredSubmissions = mockSubmissions.filter((submission) =>
    submission.submissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.submitter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.creators.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter reviewer submissions based on search
  const filteredReviewerSubmissions = reviewerSubmissions.filter((submission) =>
    submission.submissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.creators.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate review progress and approval rate for reviewer submissions
  const getReviewProgress = (creators: Creator[]) => {
    const totalCount = creators.length;
    const reviewedCount = creators.filter(c => c.approvalStatus !== 'pending').length;
    return totalCount > 0 ? `${reviewedCount}/${totalCount}` : '0/0';
  };

  const getApprovalRate = (creators: Creator[]) => {
    const reviewedCreators = creators.filter(c => c.approvalStatus !== 'pending');
    const approvedCount = creators.filter(c => c.approvalStatus === 'approved').length;
    if (reviewedCreators.length === 0) return '—';
    const rate = (approvedCount / reviewedCreators.length) * 100;
    return `${Math.round(rate)}%`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Influencer Submission</h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredSubmissions.length} submissions • Last updated {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Find Influencers Button */}
            <Button
              onClick={() => router.push('/big-spy/creator')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Find Influencers
            </Button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('submitter')}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  viewMode === 'submitter'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Submitter View
              </button>
              <button
                onClick={() => setViewMode('reviewer')}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  viewMode === 'reviewer'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Reviewer View
              </button>
              <button
                onClick={() => setViewMode('inbox')}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  viewMode === 'inbox'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions Bar - Hidden for Email view */}
      {viewMode !== 'inbox' && (
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search submissions or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* More Filter Button */}
          <Button variant="outline" className="flex items-center gap-2">
            <FilterIcon size={16} />
            More Filter
          </Button>

          {/* Batch Share Button */}
          <Button 
            variant="default" 
            className="flex items-center gap-2"
            onClick={handleBatchShare}
            disabled={selectedSubmissions.size === 0}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Batch Share
            {selectedSubmissions.size > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {selectedSubmissions.size}
              </span>
            )}
          </Button>
        </div>
      </div>
      )}

      {/* Submissions List */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {viewMode === 'submitter' ? (
          // Submitter View
          <>
        {/* Table Header - Sticky */}
        <div className="sticky top-0 z-10 bg-gray-50 px-8 py-3">
          <div className="flex items-center gap-4">
            {/* Checkbox for select all */}
            <div className="flex-shrink-0 w-5">
              <input
                type="checkbox"
                checked={filteredSubmissions.length > 0 && selectedSubmissions.size === filteredSubmissions.length}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>
            {/* Empty space for expand icon */}
            <div className="flex-shrink-0 w-5"></div>

            {/* Submission Number */}
            <div className="flex-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Submission No.</span>
            </div>

            {/* Submitter */}
            <div className="flex-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Submitter</span>
            </div>

            {/* Submission Date */}
            <div className="flex-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Date</span>
            </div>

            {/* Status */}
            <div className="flex-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Status</span>
            </div>

            {/* Approved Creators */}
            <div className="flex-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Approved Creators</span>
            </div>

            {/* Total Creators */}
            <div className="flex-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Total Creators</span>
            </div>

            {/* Client Name */}
            <div className="flex-1">
              <span className="text-xs font-semibold text-gray-700 uppercase">Client Name</span>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 w-40">
              <span className="text-xs font-semibold text-gray-700 uppercase">Actions</span>
            </div>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
            <p className="text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search query' : 'No creator submissions yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4 px-8 pb-6">
            {/* Data Rows */}
            {filteredSubmissions.map((submission) => {
              const isExpanded = expandedSubmissions.has(submission.id);
              const approvedCount = submission.creators.filter(c => c.approvalStatus === 'approved').length;
              const totalCount = submission.creators.length;
              
              return (
                <div key={submission.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {/* Parent Row - Submission Summary */}
                  <div 
                    className="p-4 hover:bg-gray-50 transition-colors relative"
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedSubmissions.has(submission.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelectSubmission(submission.id);
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>
                      {/* Expand/Collapse Icon */}
                      <div 
                        className="flex-shrink-0 cursor-pointer"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        <ChevronDownIcon 
                          className={cn(
                            'w-5 h-5 text-gray-400 transition-transform',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      </div>

                      {/* Submission Number */}
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm">{submission.submissionNumber}</span>
                          {isToday(submission.submissionDate) && (
                            <span className="px-1.5 py-0.5 text-[10px] font-semibold text-white bg-red-500 rounded-full">
                              Today
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Submitter */}
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        <span className="text-sm text-gray-600">{submission.submitter}</span>
                      </div>

                      {/* Submission Date */}
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        <span className="text-sm text-gray-500">
                          {new Date(submission.submissionDate).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Status */}
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        {getStatusBadge(submission.status)}
                      </div>

                      {/* Approved Creators */}
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        <span className="text-sm font-semibold text-green-600">
                          {approvedCount} / {totalCount} ({totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0}%)
                        </span>
                      </div>

                      {/* Total Creators Count */}
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        <span className="text-sm text-gray-500">
                          {totalCount} creator{totalCount > 1 ? 's' : ''}
                        </span>
                      </div>

                      {/* Client Name */}
                      <div 
                        className="flex-1 cursor-pointer relative group"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 font-medium">{submission.clientNames[0]}</span>
                          {submission.clientNames.length > 1 && (
                            <span className="ml-1 text-xs text-gray-400">+{submission.clientNames.length - 1}</span>
                          )}
                        </div>
                        {/* Hover tooltip */}
                        {submission.clientNames.length > 1 && (
                          <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
                            <div className="text-xs font-medium text-gray-500 mb-2">All Clients:</div>
                            {submission.clientNames.map((client, idx) => (
                              <div key={idx} className="text-sm text-gray-900 py-1">{client}</div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 w-40 flex items-center gap-2 relative z-30">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExport(submission.id);
                          }}
                          className="group relative p-2 hover:bg-gray-200 rounded-lg transition-colors z-30"
                          title="Export"
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span className="absolute right-full mr-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
                            Export
                          </span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(submission.id);
                          }}
                          className="group relative p-2 hover:bg-gray-200 rounded-lg transition-colors z-30"
                          title="Share"
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <span className="absolute left-full ml-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
                            Share
                          </span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setContactCreators(submission.creators);
                            setShowContactEmail(true);
                          }}
                          className="group relative p-2 hover:bg-gray-200 rounded-lg transition-colors z-30"
                          title="Contact all"
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
                            Contact all
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Child Rows - Creator Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      {/* Creator Rows */}
                      <div className="divide-y divide-gray-200">
                        {submission.creators.map((creator) => {
                          const selectionKey = `${submission.id}_${creator.id}`;
                          const selectionState = creatorSelectionStates[selectionKey];
                          
                          return (
                          <div key={creator.id} className="px-6 py-5 hover:bg-gray-100 transition-colors relative">
                            {/* Quick Approve/Reject Capsule Buttons - centered, aligned with avatar top */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-5 z-10">
                              {selectionState ? (
                                /* Cancel button when selection is made */
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCreatorSelectionStates(prev => ({
                                      ...prev,
                                      [selectionKey]: null
                                    }));
                                  }}
                                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full text-sm font-medium transition-all"
                                  title="Cancel selection"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Cancel
                                </button>
                              ) : (
                                /* Approve/Reject buttons when no selection */
                                <div className="inline-flex items-center bg-gray-100 rounded-full p-0.5" style={{ gap: '2px' }}>
                                  {/* Reject Button (X) */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCreatorSelectionStates(prev => ({
                                        ...prev,
                                        [selectionKey]: 'rejected'
                                      }));
                                    }}
                                    className="px-3 py-1.5 rounded-full flex items-center justify-center transition-all bg-white text-gray-400 hover:text-red-500 hover:bg-red-50"
                                    title="Reject"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                  {/* Approve Button (Check) */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCreatorSelectionStates(prev => ({
                                        ...prev,
                                        [selectionKey]: 'approved'
                                      }));
                                    }}
                                    className="px-3 py-1.5 rounded-full flex items-center justify-center transition-all bg-white text-gray-400 hover:text-green-500 hover:bg-green-50"
                                    title="Approve"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Creator Header: Avatar + Name + Approval Status + Action Buttons */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className="relative flex-shrink-0">
                                <img 
                                  src={creator.avatar} 
                                  alt={creator.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                {/* Selection indicator on top-left of avatar */}
                                {selectionState === 'approved' && (
                                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )}
                                {selectionState === 'rejected' && (
                                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-1">
                                <h4 className="font-semibold text-gray-900 text-base">{creator.name}</h4>
                                {/* Clickable Status Badge with Progress Popover */}
                                <div className="relative">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowProgressPopover(showProgressPopover === selectionKey ? null : selectionKey);
                                    }}
                                    className={cn(
                                      'px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer hover:opacity-80 transition-opacity',
                                      creator.approvalStatus === 'on_track' && 'bg-green-100 text-green-700 border border-green-300',
                                      creator.approvalStatus === 'at_risk' && 'bg-yellow-100 text-yellow-700 border border-yellow-300',
                                      creator.approvalStatus === 'blocked' && 'bg-red-100 text-red-700 border border-red-300'
                                    )}
                                  >
                                    {creator.approvalStatus === 'on_track' ? 'On Track' : creator.approvalStatus === 'at_risk' ? 'At Risk' : 'Blocked'}
                                  </button>
                                  
                                  {/* Progress Popover */}
                                  {showProgressPopover === selectionKey && (
                                    <div 
                                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                          <h5 className="text-sm font-semibold text-gray-900">Collaboration Progress</h5>
                                          <button
                                            onClick={() => {
                                              setShowProgressPopover(null);
                                              setViewMode('inbox');
                                              setEmailSearchQuery(creator.name);
                                            }}
                                            className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                                          >
                                            View Email
                                          </button>
                                        </div>
                                        <button
                                          onClick={() => setShowProgressPopover(null)}
                                          className="text-gray-400 hover:text-gray-600"
                                        >
                                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className="space-y-0">
                                        {(() => {
                                          const currentStep = creatorProgressSteps[selectionKey] || 'waiting';
                                          const normalFlow: CollaborationStep[] = ['waiting', 'replied', 'brief_sent', 'negotiating', 'confirmed'];
                                          const isBounced = currentStep === 'bounced';
                                          const isRejected = currentStep === 'rejected';
                                          const isConfirmed = currentStep === 'confirmed';
                                          
                                          // Determine which steps to show
                                          let stepsToShow: CollaborationStep[];
                                          if (isBounced) {
                                            stepsToShow = ['waiting', 'bounced'];
                                          } else {
                                            const currentIndex = normalFlow.indexOf(currentStep);
                                            if (isRejected) {
                                              // Show up to where rejection happened + rejected
                                              stepsToShow = [...normalFlow.slice(0, 4), 'rejected'];
                                            } else {
                                              stepsToShow = normalFlow;
                                            }
                                          }
                                          
                                          const currentStepIndex = stepsToShow.indexOf(currentStep);
                                          
                                          return stepsToShow.map((stepId, index) => {
                                            const step = collaborationSteps.find(s => s.id === stepId)!;
                                            const isCompleted = index < currentStepIndex;
                                            const isCurrent = index === currentStepIndex;
                                            const isFailed = stepId === 'rejected' || stepId === 'bounced';
                                            const isSuccess = stepId === 'confirmed' && isConfirmed;
                                            const isLast = index === stepsToShow.length - 1;
                                            
                                            return (
                                              <div key={stepId} className="relative">
                                                <button
                                                  onClick={() => {
                                                    setCreatorProgressSteps(prev => ({ ...prev, [selectionKey]: stepId }));
                                                  }}
                                                  className="w-full flex items-start gap-3 text-left hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                                                >
                                                  {/* Step indicator with connecting line */}
                                                  <div className="relative flex flex-col items-center flex-shrink-0">
                                                    <div className={cn(
                                                      "w-5 h-5 rounded-full flex items-center justify-center",
                                                      isCompleted || isSuccess ? "bg-green-500" : 
                                                      isCurrent && isFailed ? "bg-red-500" :
                                                      isCurrent ? "bg-blue-500" : "bg-gray-200"
                                                    )}>
                                                      {isCompleted || isSuccess ? (
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                      ) : isCurrent && isFailed ? (
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                      ) : isCurrent ? (
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                      ) : (
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                                      )}
                                                    </div>
                                                  </div>
                                                  {/* Step content */}
                                                  <div className="flex-1 min-w-0">
                                                    <div className={cn(
                                                      "text-sm font-medium",
                                                      isCompleted || isSuccess ? "text-green-700" :
                                                      isCurrent && isFailed ? "text-red-700" :
                                                      isCurrent ? "text-blue-700" : "text-gray-500"
                                                    )}>
                                                      {step.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-0.5">
                                                      {step.description}
                                                    </div>
                                                  </div>
                                                </button>
                                                {/* Connecting line to next step */}
                                                {!isLast && (
                                                  <div 
                                                    className="absolute left-[10px] w-[1px] bg-gray-300"
                                                    style={{ 
                                                      top: 'calc(8px + 20px + 2px)',
                                                      bottom: '2px',
                                                      marginLeft: '-1px'
                                                    }}
                                                  />
                                                )}
                                              </div>
                                            );
                                          });
                                        })()}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Price Input */}
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Price:</span>
                                {editingPriceCreatorId === selectionKey ? (
                                  <div className="flex items-center gap-1">
                                    <span className="text-gray-500">$</span>
                                    <input
                                      type="number"
                                      autoFocus
                                      className="w-24 px-2 py-1 text-sm border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      value={creatorPrices[selectionKey] ?? ''}
                                      onChange={(e) => {
                                        const value = e.target.value === '' ? null : Number(e.target.value);
                                        setCreatorPrices(prev => ({ ...prev, [selectionKey]: value }));
                                      }}
                                      onBlur={() => setEditingPriceCreatorId(null)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          setEditingPriceCreatorId(null);
                                        }
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="px-3 py-1 min-w-[80px] text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                                    onDoubleClick={(e) => {
                                      e.stopPropagation();
                                      setEditingPriceCreatorId(selectionKey);
                                    }}
                                    title="Double-click to edit"
                                  >
                                    {creatorPrices[selectionKey] != null ? `$${creatorPrices[selectionKey]?.toLocaleString()}` : 'Set price'}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Creator Details: Label-Value Pairs in Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-3 text-sm">
                              {/* Tags */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Tags</div>
                                <div className="flex flex-wrap gap-1">
                                  {creator.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Country */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Country</div>
                                <div className="text-gray-900">
                                  {getCountryFlag(creator.country)} {creator.country}
                                </div>
                              </div>

                              {/* Platform */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Platform</div>
                                <div className="flex items-center gap-1.5 text-gray-900">
                                  {getPlatformIcon(creator.platform)}
                                  <span>{creator.platform}</span>
                                </div>
                              </div>

                              {/* Followers */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Followers</div>
                                <div className="text-gray-900 font-semibold">{formatNumber(creator.followers)}</div>
                              </div>

                              {/* Gender */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Gender</div>
                                <div className="text-gray-900">{creator.gender}</div>
                              </div>

                              {/* Contact */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Contact</div>
                                <a 
                                  href={`mailto:${creator.contact}`}
                                  className="text-blue-600 hover:text-blue-700 text-xs block truncate"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {creator.contact}
                                </a>
                              </div>

                              {/* Avg Play Rate */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Avg Play Rate</div>
                                <div className="text-gray-900 font-semibold">{creator.avgPlayRate.toFixed(1)}%</div>
                              </div>

                              {/* Engagement */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Engagement</div>
                                <div className="text-gray-900 font-semibold">{creator.engagementRate.toFixed(1)}%</div>
                              </div>

                              {/* View/Follower */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">View/Follower</div>
                                <div className="text-gray-900 font-semibold">{creator.viewToFollowerRatio.toFixed(2)}</div>
                              </div>

                              {/* Est. Reach */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Est. Reach</div>
                                <div className="text-gray-900 font-semibold">{formatNumber(creator.estimatedReach)}</div>
                              </div>

                              {/* Videos */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">Videos</div>
                                <div className="text-gray-900 font-semibold">{creator.videoCount}</div>
                              </div>

                              {/* GMV */}
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">GMV</div>
                                <div className="text-gray-900 font-semibold">${formatNumber(creator.gmv)}</div>
                              </div>
                            </div>

                            {/* Audience Distribution - Separate Section */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="text-xs font-medium text-gray-500 mb-2">Audience Distribution</div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                {/* Age Distribution */}
                                <div>
                                  <span className="text-gray-600 font-medium">Age: </span>
                                  <div className="mt-1 flex flex-wrap gap-2">
                                    {creator.audienceDistribution.age.map((age, idx) => (
                                      <span key={idx} className="text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">
                                        {age.range}: {age.percentage}%
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Gender Distribution */}
                                <div>
                                  <span className="text-gray-600 font-medium">Gender: </span>
                                  <div className="mt-1 flex flex-wrap gap-2">
                                    {creator.audienceDistribution.gender.map((gender, idx) => (
                                      <span key={idx} className="text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">
                                        {gender.type}: {gender.percentage}%
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Location Distribution */}
                                <div>
                                  <span className="text-gray-600 font-medium">Location: </span>
                                  <div className="mt-1 flex flex-wrap gap-2">
                                    {creator.audienceDistribution.location.map((loc, idx) => (
                                      <span key={idx} className="text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">
                                        {getCountryFlag(loc.country)} {loc.country}: {loc.percentage}%
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
          </>
        ) : viewMode === 'inbox' ? (
          // Email Inbox View
          <div className="flex h-full">
            {/* Left Sidebar - Folders */}
            <div className="w-56 border-r border-gray-200 bg-white p-4 flex-shrink-0">
              <Button 
                onClick={() => setShowComposeModal(true)}
                className="w-full mb-6 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Compose
              </Button>
                      
              <nav className="space-y-1">
                {[
                  { id: 'inbox' as EmailFolder, label: 'Inbox', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', count: emails.filter(e => e.folder === 'inbox' && e.status === 'unread').length },
                  { id: 'sent' as EmailFolder, label: 'Sent', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', count: 0 },
                  { id: 'drafts' as EmailFolder, label: 'Drafts', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', count: 0 },
                  { id: 'trash' as EmailFolder, label: 'Trash', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', count: 0 },
                ].map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => { setEmailFolder(folder.id); setSelectedEmail(null); }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      emailFolder === folder.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d={folder.icon} />
                      </svg>
                      {folder.label}
                    </div>
                    {folder.count > 0 && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                        {folder.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
        
              {/* Labels - Simplified */}
              <div className="mt-6">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Labels</h3>
                <div className="space-y-0.5">
                  {(['Waiting', 'Replied', 'Interested', 'Negotiating', 'Rejected', 'Bounced'] as SimpleEmailLabel[]).map((label) => {
                    const count = emails.filter(e => e.simpleLabel === label).length;
                    return (
                      <button 
                        key={label} 
                        onClick={() => setSelectedLabelFilter(selectedLabelFilter === label ? null : label)}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors',
                          selectedLabelFilter === label ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className={cn('w-2.5 h-2.5 rounded-full', 
                            label === 'Waiting' ? 'bg-amber-500' : 
                            label === 'Replied' ? 'bg-blue-500' : 
                            label === 'Interested' ? 'bg-green-500' : 
                            label === 'Negotiating' ? 'bg-indigo-500' : 
                            label === 'Rejected' ? 'bg-gray-400' : 'bg-rose-500'
                          )} />
                          {label}
                        </div>
                        {count > 0 && <span className="text-xs text-gray-400">{count}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
        
            {/* Middle - Email List */}
            <div 
              className={cn('overflow-y-auto bg-gray-50 flex-shrink-0', selectedEmail ? 'hidden md:block' : 'flex-1')}
              style={selectedEmail ? { width: emailListWidth } : {}}
            >
              <div className="px-3 py-3 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900 capitalize">
                      {selectedLabelFilter || emailFolder}
                    </h2>
                    {selectedLabelFilter && (
                      <button 
                        onClick={() => setSelectedLabelFilter(null)}
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear
                      </button>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {emails.filter(e => {
                      if (selectedLabelFilter) {
                        return e.simpleLabel === selectedLabelFilter;
                      }
                      return e.folder === emailFolder;
                    }).length} messages
                  </span>
                </div>
                {/* Email Search Box */}
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search emails..."
                    value={emailSearchQuery}
                    onChange={(e) => setEmailSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  />
                </div>
              </div>
                      
              <div className="p-3 space-y-2">
                {emails.filter(e => {
                  // Label filter
                  if (selectedLabelFilter) {
                    return e.simpleLabel === selectedLabelFilter;
                  }
                  // Folder filter
                  return e.folder === emailFolder;
                }).filter(e => 
                  emailSearchQuery === '' ||
                  e.from.name.toLowerCase().includes(emailSearchQuery.toLowerCase()) ||
                  e.subject.toLowerCase().includes(emailSearchQuery.toLowerCase()) ||
                  e.preview.toLowerCase().includes(emailSearchQuery.toLowerCase())
                ).map((email) => (
                  <div
                    key={email.id}
                    onClick={() => {
                      setSelectedEmail(email);
                      if (email.status === 'unread') {
                        setEmails(prev => prev.map(e => e.id === email.id ? { ...e, status: 'read' } : e));
                      }
                    }}
                    className={cn(
                      'bg-white rounded-lg border border-gray-200 px-3 py-2.5 cursor-pointer transition-all hover:shadow-md hover:border-gray-300',
                      email.status === 'unread' && 'border-l-4 border-l-blue-500',
                      selectedEmail?.id === email.id && 'ring-2 ring-blue-500 border-blue-500'
                    )}
                  >
                    {/* Header: Sender Name + Time */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cn('text-sm', email.status === 'unread' ? 'font-bold text-gray-900' : 'font-semibold text-gray-700')}>
                          {email.from.name}
                        </span>
                        {email.status === 'unread' && (
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(email.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {/* Subject */}
                    <h3 className={cn('text-sm mb-2', email.status === 'unread' ? 'font-semibold text-gray-900' : 'font-medium text-gray-800')}>
                      {email.subject}
                    </h3>
                    
                    {/* Preview */}
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{email.preview}</p>
                    
                    {/* Labels */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Display labels based on simpleLabel */}
                      {getDisplayLabels(email.simpleLabel).map((label) => (
                        <span 
                          key={label}
                          className={cn(
                            'px-2 py-0.5 text-xs font-medium rounded',
                            labelConfig[label]?.bg,
                            labelConfig[label]?.text
                          )}
                          title={labelConfig[label]?.meaning}
                        >
                          {label}
                        </span>
                      ))}
                      {email.hasAttachments && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
        
                {emails.filter(e => e.folder === emailFolder).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No messages</h3>
                    <p className="text-sm text-gray-500">Your {emailFolder} is empty</p>
                  </div>
                )}
              </div>
            </div>

            {/* Resize Handle */}
            {selectedEmail && (
              <div
                onMouseDown={handleMouseDown}
                className="hidden md:flex w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize items-center justify-center group transition-colors"
              >
                <div className="w-0.5 h-8 bg-gray-400 group-hover:bg-blue-600 rounded-full" />
              </div>
            )}
        
            {/* Right - Email Detail */}
            {selectedEmail && (
              <div className="flex-1 overflow-y-auto bg-white min-w-0">
                {/* Email Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setSelectedEmail(null)}
                      className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEmails(prev => prev.map(e => e.id === selectedEmail.id ? { ...e, starred: !e.starred } : e));
                          setSelectedEmail(prev => prev ? { ...prev, starred: !prev.starred } : null);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg className={cn('w-5 h-5', selectedEmail.starred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400')} viewBox="0 0 20 20" fill={selectedEmail.starred ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setEmails(prev => prev.map(e => e.id === selectedEmail.id ? { ...e, folder: 'trash' } : e));
                          setSelectedEmail(null);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                          
                  <h1 className="text-xl font-semibold text-gray-900 mb-3">{selectedEmail.subject}</h1>
                  
                  {/* Email Labels in Detail View */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    {/* Display labels based on simpleLabel */}
                    {selectedEmail.simpleLabel && getDisplayLabels(selectedEmail.simpleLabel).map((label) => (
                      <span 
                        key={label}
                        className={cn(
                          'px-2.5 py-1 text-xs font-medium rounded-md',
                          labelConfig[label]?.bg,
                          labelConfig[label]?.text
                        )}
                      >
                        {label}
                      </span>
                    ))}
                    
                    {/* Custom tags for this email */}
                    {(emailCustomTags[selectedEmail.id] || []).map((tag, idx) => (
                      <span 
                        key={`custom-${idx}`}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 flex items-center gap-1 group"
                      >
                        {tag}
                        <button
                          onClick={() => {
                            setEmailCustomTags(prev => ({
                              ...prev,
                              [selectedEmail.id]: (prev[selectedEmail.id] || []).filter((_, i) => i !== idx)
                            }));
                          }}
                          className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    
                    {/* Add Tag Button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowTagDropdown(!showTagDropdown)}
                        className="px-2 py-1 text-xs font-medium rounded-md border border-dashed border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Tag
                      </button>
                      
                      {/* Tag Dropdown */}
                      {showTagDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                          <div className="p-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase px-2 mb-1">Quick Tags</p>
                            <div className="space-y-0.5">
                              {['Outreach', 'FollowUp', 'SendBrief', 'Warm', 'Cold', 'Rejected', 'Bounced', 'Ready', 'Backup', 'Risk'].map((tag) => (
                                <button
                                  key={tag}
                                  onClick={() => {
                                    const currentTags = emailCustomTags[selectedEmail.id] || [];
                                    if (!currentTags.includes(tag)) {
                                      setEmailCustomTags(prev => ({
                                        ...prev,
                                        [selectedEmail.id]: [...currentTags, tag]
                                      }));
                                    }
                                    setShowTagDropdown(false);
                                  }}
                                  className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                                >
                                  <span className={cn('w-2 h-2 rounded-full', labelConfig[tag]?.bg?.replace('100', '500') || 'bg-gray-400')} />
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-100 p-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase px-2 mb-1">Custom Tag</p>
                            <div className="flex gap-1">
                              <input
                                type="text"
                                value={customTagInput}
                                onChange={(e) => setCustomTagInput(e.target.value)}
                                placeholder="Enter custom tag..."
                                className="flex-1 px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && customTagInput.trim()) {
                                    const currentTags = emailCustomTags[selectedEmail.id] || [];
                                    if (!currentTags.includes(customTagInput.trim())) {
                                      setEmailCustomTags(prev => ({
                                        ...prev,
                                        [selectedEmail.id]: [...currentTags, customTagInput.trim()]
                                      }));
                                    }
                                    setCustomTagInput('');
                                    setShowTagDropdown(false);
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  if (customTagInput.trim()) {
                                    const currentTags = emailCustomTags[selectedEmail.id] || [];
                                    if (!currentTags.includes(customTagInput.trim())) {
                                      setEmailCustomTags(prev => ({
                                        ...prev,
                                        [selectedEmail.id]: [...currentTags, customTagInput.trim()]
                                      }));
                                    }
                                    setCustomTagInput('');
                                    setShowTagDropdown(false);
                                  }
                                }}
                                className="px-2 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                          
                  <div className="flex items-start gap-4">
                    {selectedEmail.from.avatar ? (
                      <img src={selectedEmail.from.avatar} alt={selectedEmail.from.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-semibold">{selectedEmail.from.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{selectedEmail.from.name}</span>
                        <span className="text-sm text-gray-500">&lt;{selectedEmail.from.email}&gt;</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        To: {selectedEmail.to.map(t => t.name).join(', ')}
                        {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                          <span> • CC: {selectedEmail.cc.map(c => c.name).join(', ')}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {new Date(selectedEmail.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
        
                {/* Email Body */}
                <div className="p-6">
                  <div className="prose prose-sm max-w-none">
                    {selectedEmail.body.split('\n').map((line, idx) => (
                      <p key={idx} className="mb-2 text-gray-700 whitespace-pre-wrap">{line || <br />}</p>
                    ))}
                  </div>
        
                  {/* Attachments */}
                  {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Attachments ({selectedEmail.attachments.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedEmail.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{(attachment.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
        
                  {/* Reply Section */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex gap-3">
                      <Button
                        onClick={() => { setShowReplyModal(true); setReplyContent(''); }}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Reply
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Forward
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Reviewer View
          <>
            {/* Table Header for Reviewer View */}
            <div className="sticky top-0 z-10 bg-gray-50 px-8 py-3">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-5"></div>
                <div className="flex-1"><span className="text-xs font-semibold text-gray-700 uppercase">Submission No.</span></div>
                <div className="flex-1"><span className="text-xs font-semibold text-gray-700 uppercase">Partner</span></div>
                <div className="flex-1"><span className="text-xs font-semibold text-gray-700 uppercase">Date</span></div>
                <div className="flex-1"><span className="text-xs font-semibold text-gray-700 uppercase">Status</span></div>
                <div className="flex-1"><span className="text-xs font-semibold text-gray-700 uppercase">Review Progress</span></div>
                <div className="flex-1"><span className="text-xs font-semibold text-gray-700 uppercase">Approval Rate</span></div>
                <div className="flex-shrink-0 w-20"><span className="text-xs font-semibold text-gray-700 uppercase">Actions</span></div>
              </div>
            </div>

            {filteredReviewerSubmissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 px-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No review submissions</h3>
                <p className="text-sm text-gray-500">Share submissions from Submitter View to create review items</p>
              </div>
            ) : (
              <div className="space-y-4 px-8 pb-6">
                {filteredReviewerSubmissions.map((submission) => {
                  const isExpanded = expandedSubmissions.has(submission.id);
                  const reviewProgress = getReviewProgress(submission.creators);
                  const approvalRate = getApprovalRate(submission.creators);

                  return (
                    <div key={submission.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 cursor-pointer" onClick={() => toggleSubmission(submission.id)}>
                            <ChevronDownIcon className={cn('w-5 h-5 text-gray-400 transition-transform', isExpanded && 'rotate-180')} />
                          </div>
                          <div className="flex-1 cursor-pointer" onClick={() => toggleSubmission(submission.id)}>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 text-sm">{submission.submissionNumber}</span>
                              {isToday(submission.submissionDate) && (
                                <span className="px-1.5 py-0.5 text-[10px] font-semibold text-white bg-red-500 rounded-full">
                                  Today
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex-1 cursor-pointer" onClick={() => toggleSubmission(submission.id)}>
                            <span className="text-sm text-gray-600">{submission.partner}</span>
                          </div>
                          <div className="flex-1 cursor-pointer" onClick={() => toggleSubmission(submission.id)}>
                            <span className="text-sm text-gray-500">{new Date(submission.submissionDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex-1 cursor-pointer" onClick={() => toggleSubmission(submission.id)}>
                            {getStatusBadge(submission.status)}
                          </div>
                          <div className="flex-1 cursor-pointer" onClick={() => toggleSubmission(submission.id)}>
                            <span className="text-sm text-gray-900">{reviewProgress}</span>
                          </div>
                          <div className="flex-1 cursor-pointer" onClick={() => toggleSubmission(submission.id)}>
                            <span className="text-sm font-semibold text-blue-600">{approvalRate}</span>
                          </div>
                          <div className="flex-shrink-0 w-20 flex items-center gap-2">
                            <button onClick={(e) => { e.stopPropagation(); handleExport(submission.id); }} className="group relative p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Export">
                              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Child Rows - Creator Details for Review */}
                      {isExpanded && (
                        <div className="border-t border-gray-200 bg-gray-50">
                          <div className="divide-y divide-gray-200">
                            {submission.creators.map((creator) => {
                              const creatorStatus = creatorApprovalStates[`${submission.id}_${creator.id}`] || creator.approvalStatus;
                              return (
                                <div key={creator.id} className="px-6 py-5 hover:bg-gray-100 transition-colors">
                                  <div className="flex items-center gap-3 mb-4">
                                    <img src={creator.avatar} alt={creator.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                                    <div className="flex items-center gap-2 flex-1">
                                      <h4 className="font-semibold text-gray-900 text-base">{creator.name}</h4>
                                      {getCreatorApprovalBadge(creatorStatus)}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <button onClick={(e) => { e.stopPropagation(); handleApproveCreator(submission.id, creator.id); }} className="px-3 py-1.5 text-xs font-medium text-green-700 bg-white border border-green-300 rounded-md hover:bg-green-50 transition-colors">Approve</button>
                                      <button onClick={(e) => { e.stopPropagation(); handleRejectCreator(submission.id, creator.id); }} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors">Reject</button>
                                    </div>
                                  </div>
                                  {/* Creator details grid (same as submitter view) */}
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-3 text-sm">
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Tags</div><div className="flex flex-wrap gap-1">{creator.tags.map((tag, idx) => (<Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>))}</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Country</div><div className="text-gray-900">{getCountryFlag(creator.country)} {creator.country}</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Platform</div><div className="flex items-center gap-1.5 text-gray-900">{getPlatformIcon(creator.platform)}<span>{creator.platform}</span></div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Followers</div><div className="text-gray-900 font-semibold">{formatNumber(creator.followers)}</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Gender</div><div className="text-gray-900">{creator.gender}</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Contact</div><a href={`mailto:${creator.contact}`} className="text-blue-600 hover:text-blue-700 text-xs block truncate" onClick={(e) => e.stopPropagation()}>{creator.contact}</a></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Avg Play Rate</div><div className="text-gray-900 font-semibold">{creator.avgPlayRate.toFixed(1)}%</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Engagement</div><div className="text-gray-900 font-semibold">{creator.engagementRate.toFixed(1)}%</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">View/Follower</div><div className="text-gray-900 font-semibold">{creator.viewToFollowerRatio.toFixed(2)}</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Est. Reach</div><div className="text-gray-900 font-semibold">{formatNumber(creator.estimatedReach)}</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">Videos</div><div className="text-gray-900 font-semibold">{creator.videoCount}</div></div>
                                    <div><div className="text-xs font-medium text-gray-500 mb-1">GMV</div><div className="text-gray-900 font-semibold">${formatNumber(creator.gmv)}</div></div>
                                  </div>
                                  {/* Audience Distribution */}
                                  <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="text-xs font-medium text-gray-500 mb-2">Audience Distribution</div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                      <div><span className="text-gray-600 font-medium">Age: </span><div className="mt-1 flex flex-wrap gap-2">{creator.audienceDistribution.age.map((age, idx) => (<span key={idx} className="text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">{age.range}: {age.percentage}%</span>))}</div></div>
                                      <div><span className="text-gray-600 font-medium">Gender: </span><div className="mt-1 flex flex-wrap gap-2">{creator.audienceDistribution.gender.map((gender, idx) => (<span key={idx} className="text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">{gender.type}: {gender.percentage}%</span>))}</div></div>
                                      <div><span className="text-gray-600 font-medium">Location: </span><div className="mt-1 flex flex-wrap gap-2">{creator.audienceDistribution.location.map((loc, idx) => (<span key={idx} className="text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">{getCountryFlag(loc.country)} {loc.country}: {loc.percentage}%</span>))}</div></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Clients to Share</h3>
            </div>
            <div className="p-6">
              {/* Existing Clients */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select existing clients:</label>
                <div className="space-y-2">
                  {availableClients.map((client) => (
                    <label key={client} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" checked={selectedClients.has(client)} onChange={() => toggleClientSelection(client)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-900">{client}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Add New Client */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add new client:</label>
                <div className="flex gap-2">
                  <Input type="text" placeholder="Enter client name" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} className="flex-1" onKeyPress={(e) => { if (e.key === 'Enter') handleAddNewClient(); }} />
                  <Button onClick={handleAddNewClient} variant="outline" disabled={!newClientName.trim()}>Add</Button>
                </div>
              </div>
              {/* Selected Clients */}
              {selectedClients.size > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-600 mb-2">Selected Clients ({selectedClients.size}):</div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(selectedClients).map((client) => (
                      <Badge key={client} variant="secondary" className="text-xs">{client}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowShareModal(false)}>Cancel</Button>
              <Button onClick={handleConfirmShare} disabled={selectedClients.size === 0}>Confirm</Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal for Collection Tasks */}
      {showPreviewModal && previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Preview: {previewData.fileName}</h3>
                <p className="text-sm text-gray-500 mt-1">Task: {previewData.taskNumber} • {previewData.data.length} influencers</p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Influencer Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Platform</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Followers</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Views</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Homepage Link</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Publish Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Language</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Engagement</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.data.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.influencerName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.platform}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{row.followers}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{row.views}</td>
                        <td className="px-4 py-3 text-sm">
                          <a href={row.homepageLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                            Link
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">{row.influencerId}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.country}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{row.publishDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.language}</td>
                        <td className="px-4 py-3 text-sm text-green-600 font-semibold">{row.engagement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Total: {previewData.data.length} records
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowPreviewModal(false)}>Close</Button>
                <Button onClick={() => {
                  // In production, trigger download
                  alert('Downloading file...');
                  console.log('Download:', previewData.fileName);
                }}>
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Email Modal for Collection Tasks */}
      {showShareEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Share Collection Data</h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Send to email:</label>
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Share Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Or copy share link:</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={currentShareTaskId ? `${window.location.origin}/share/collection/${currentShareTaskId}` : ''}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentShareTaskId) {
                        const shareLink = `${window.location.origin}/share/collection/${currentShareTaskId}`;
                        navigator.clipboard.writeText(shareLink);
                        alert('Share link copied to clipboard!');
                      }
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowShareEmailModal(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  if (!shareEmail.trim()) {
                    alert('Please enter an email address');
                    return;
                  }
                  // In production, call API to send email
                  console.log('Sending email to:', shareEmail);
                  alert(`Email sent to ${shareEmail} successfully!`);
                  setShowShareEmailModal(false);
                }}
                disabled={!shareEmail.trim()}
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Email Drawer */}
      <ContactEmail
        isOpen={showContactEmail}
        onClose={() => setShowContactEmail(false)}
        creators={contactCreators}
      />

      {/* Compose Email Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">New Message</h3>
              <button onClick={() => setShowComposeModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                <Input type="email" placeholder="recipient@example.com" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                <Input type="text" placeholder="Enter subject" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
                <textarea
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Write your message here..."
                />
              </div>
              <div>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Attach files
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
              <Button variant="outline" onClick={() => setShowComposeModal(false)}>Save as Draft</Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowComposeModal(false)}>Cancel</Button>
                <Button onClick={() => { alert('Email sent successfully!'); setShowComposeModal(false); }}>Send</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Email Modal */}
      {showReplyModal && selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Reply to: {selectedEmail.from.name}</h3>
              <button onClick={() => setShowReplyModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">Replying to:</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{selectedEmail.subject}</div>
                <div className="text-sm text-gray-600">From: {selectedEmail.from.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Reply:</label>
                <textarea
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Write your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
              </div>
              <div>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Attach files
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowReplyModal(false)}>Cancel</Button>
              <Button 
                onClick={() => { 
                  if (!replyContent.trim()) {
                    alert('Please enter a reply message');
                    return;
                  }
                  // Mark email as replied
                  setEmails(prev => prev.map(e => e.id === selectedEmail.id ? { ...e, status: 'replied' } : e));
                  alert('Reply sent successfully!');
                  setShowReplyModal(false);
                  setReplyContent('');
                }}
                disabled={!replyContent.trim()}
              >
                Send Reply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
