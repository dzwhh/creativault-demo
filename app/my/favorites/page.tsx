'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon, FilterIcon, FavoritesIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';

interface Folder {
  id: string;
  name: string;
  itemCount: number;
  type: 'ads' | 'creative' | 'products' | 'creator' | 'brand';
  createdAt: string;
  thumbnail?: string;
}

const navItems = [
  { id: 'ads', label: 'Ads' },
  { id: 'creative', label: 'Creatives' },
  { id: 'products', label: 'Products' },
  { id: 'creator', label: 'Creators' },
  { id: 'brand', label: 'Brands' },
];

// Mock data for folders
const mockFolders: Folder[] = [
  {
    id: '1',
    name: 'Fashion Ads Collection',
    itemCount: 24,
    type: 'ads',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Tech Products',
    itemCount: 18,
    type: 'products',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Beauty Creatives',
    itemCount: 32,
    type: 'creative',
    createdAt: '2024-02-05',
  },
  {
    id: '4',
    name: 'Top Creators',
    itemCount: 12,
    type: 'creator',
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    name: 'E-commerce Campaigns',
    itemCount: 45,
    type: 'ads',
    createdAt: '2024-02-15',
  },
  {
    id: '6',
    name: 'Video Creatives',
    itemCount: 28,
    type: 'creative',
    createdAt: '2024-03-01',
  },
  {
    id: '7',
    name: 'Tracked Brands',
    itemCount: 15,
    type: 'brand',
    createdAt: '2024-03-05',
  },
  {
    id: '8',
    name: 'Top Brands',
    itemCount: 20,
    type: 'brand',
    createdAt: '2024-03-10',
  },
];

export default function FavoritesPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('ads');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Filter folders based on active nav and search query
  const filteredFolders = mockFolders.filter((folder) => {
    const matchesType = folder.type === activeNav;
    const matchesSearch = folder.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(folder);
    // Navigate to folder detail page
    // Brand folders go to brand list page
    // Creator folders go to creator shortlist page
    // Other folders go to standard folder page
    if (folder.type === 'brand') {
      router.push(`/my/favorites/brand/${folder.id}`);
    } else if (folder.type === 'creator') {
      router.push(`/my/favorites/creator/${folder.id}`);
    } else {
      router.push(`/my/favorites/${folder.id}`);
    }
  };

  const handleCreateFolder = () => {
    setIsCreateModalOpen(true);
  };

  const handleConfirmCreate = () => {
    if (newFolderName.trim()) {
      // TODO: Implement actual folder creation logic
      console.log('Creating folder:', { name: newFolderName, type: activeNav });
      alert(`Folder "${newFolderName}" created successfully in ${activeNav} category!`);
      setNewFolderName('');
      setIsCreateModalOpen(false);
    }
  };

  const handleCancelCreate = () => {
    setNewFolderName('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <PageHeader 
        title="My Favorites"
        description="Manage and organize all your favorite items across different categories"
      />

      {/* Main Content Section */}
      <div className="flex-1 p-0">
        <div className="h-full">
          <div className="bg-white h-full p-6">
            {/* Main Layout: Left Sidebar + Right Content */}
            <div className="flex gap-6">
              {/* Left Sidebar Navigation */}
              <div className="flex-shrink-0">
                <div className="w-64 bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveNav(item.id)}
                        className={cn(
                          'w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                          activeNav === item.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Create New Folder Button - Outside the border */}
                <button
                  onClick={handleCreateFolder}
                  className="w-64 mt-4 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Folder</span>
                </button>
              </div>

              {/* Right Content Area */}
              <div className="flex-1">
                {/* Search and Filter Bar */}
                <div className="bg-white mb-6">
                  <div className="flex items-center gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search folders..."
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
                  </div>
                </div>

                {/* Folders Grid */}
                <div className="bg-white">
                  {filteredFolders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 rounded-lg border border-gray-200">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <FavoritesIcon size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No folders found</h3>
                      <p className="text-sm text-gray-500">
                        {searchQuery
                          ? 'Try adjusting your search query'
                          : `Create your first ${activeNav} folder to get started`}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredFolders.map((folder) => (
                        <div
                          key={folder.id}
                          onClick={() => handleFolderClick(folder)}
                          className="bg-white rounded-lg border border-gray-200 p-5 cursor-pointer transition-all hover:shadow-lg hover:border-blue-300 group"
                        >
                          {/* Folder Icon */}
                          <div className="w-full h-32 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                          </div>

                          {/* Folder Info */}
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
                              {folder.name}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {folder.itemCount} items
                              </span>
                              <span>{new Date(folder.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Folder Modal */}
      {isCreateModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCancelCreate}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              {/* Modal Header */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Folder</h3>
              
              {/* Input Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Folder Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter folder name..."
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleConfirmCreate();
                    } else if (e.key === 'Escape') {
                      handleCancelCreate();
                    }
                  }}
                  className="w-full"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  Creating in: <span className="font-medium text-blue-600">{activeNav}</span> category
                </p>
              </div>
              
              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancelCreate}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmCreate}
                  disabled={!newFolderName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
