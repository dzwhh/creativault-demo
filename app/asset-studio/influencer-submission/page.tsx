'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, FilterIcon, ChevronDownIcon, TikTokIcon, InstagramIcon, YoutubeIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ContactEmail from '@/app/asset-studio/influencer-contact/contact-email';

// View mode types
type ViewMode = 'submitter' | 'reviewer';

// Submission status types
type SubmissionStatus = 'pending' | 'submitted' | 'approved';

// Creator approval status
type CreatorApprovalStatus = 'pending' | 'approved' | 'rejected';

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
        approvalStatus: 'approved',
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
        approvalStatus: 'pending',
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
        approvalStatus: 'approved',
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
        approvalStatus: 'rejected',
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
    pending: { label: 'Pending Review', className: 'bg-gray-100 text-gray-600 border border-gray-300' },
    approved: { label: 'Approved', className: 'bg-green-100 text-green-700 border border-green-300' },
    rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700 border border-red-300' },
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

  // Available clients list (mock data)
  const availableClients = ['Nike Inc.', 'Adidas Group', 'Puma Corporation', 'Under Armour', 'New Balance'];

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
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions Bar */}
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
                        {submission.creators.map((creator) => (
                          <div key={creator.id} className="px-6 py-5 hover:bg-gray-100 transition-colors">
                            {/* Creator Header: Avatar + Name + Approval Status + Action Buttons */}
                            <div className="flex items-center gap-3 mb-4">
                              <img 
                                src={creator.avatar} 
                                alt={creator.name}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex items-center gap-2 flex-1">
                                <h4 className="font-semibold text-gray-900 text-base">{creator.name}</h4>
                                {getCreatorApprovalBadge(creator.approvalStatus)}
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePendingCreator(creator.id, creator.name);
                                  }}
                                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                  Pending
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCreator(creator.id, creator.name);
                                  }}
                                  className="px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                                >
                                  Delete
                                </button>
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
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
          </>
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

      {/* Contact Email Drawer */}
      <ContactEmail
        isOpen={showContactEmail}
        onClose={() => setShowContactEmail(false)}
        creators={contactCreators}
      />
    </div>
  );
}
