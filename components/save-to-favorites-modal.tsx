'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Folder {
  id: string;
  name: string;
  itemCount: number;
}

interface SaveToFavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: string, folderId: string, folderName?: string) => void;
  defaultCategory?: 'ads' | 'creative' | 'products' | 'creator';
}

const categories = [
  { id: 'ads', label: 'Ads' },
  { id: 'creative', label: 'Creative' },
  { id: 'products', label: 'Products' },
  { id: 'creator', label: 'Creator' },
];

// Mock folders data - 实际项目中应该从 API 获取
const mockFolders: Record<string, Folder[]> = {
  ads: [
    { id: '1', name: 'Fashion Ads Collection', itemCount: 24 },
    { id: '5', name: 'E-commerce Campaigns', itemCount: 45 },
    { id: '7', name: 'Summer Sale Ads', itemCount: 18 },
  ],
  creative: [
    { id: '3', name: 'Beauty Creatives', itemCount: 32 },
    { id: '6', name: 'Video Creatives', itemCount: 28 },
    { id: '8', name: 'Social Media Content', itemCount: 56 },
  ],
  products: [
    { id: '2', name: 'Tech Products', itemCount: 18 },
    { id: '9', name: 'Home & Garden', itemCount: 34 },
  ],
  creator: [
    { id: '4', name: 'Top Creators', itemCount: 12 },
    { id: '10', name: 'Beauty Influencers', itemCount: 22 },
  ],
};

export function SaveToFavoritesModal({
  isOpen,
  onClose,
  onSave,
  defaultCategory = 'ads',
}: SaveToFavoritesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [error, setError] = useState('');
  const [onlyCreative, setOnlyCreative] = useState(false);

  const currentFolders = mockFolders[selectedCategory] || [];

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(defaultCategory);
      setSelectedFolderId(null);
      setIsCreatingNew(false);
      setNewFolderName('');
      setError('');
      setOnlyCreative(false);
    }
  }, [isOpen, defaultCategory]);

  // Close modal when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    setError('');

    if (isCreatingNew) {
      // Validate new folder name
      if (!newFolderName.trim()) {
        setError('Folder name cannot be empty');
        return;
      }
      // Create new folder and save
      const newFolderId = `new-${Date.now()}`;
      onSave(selectedCategory, newFolderId, newFolderName.trim());
      onClose();
    } else {
      // Save to existing folder
      if (!selectedFolderId) {
        setError('Please select a folder');
        return;
      }
      onSave(selectedCategory, selectedFolderId);
      onClose();
    }
  };

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
    setIsCreatingNew(false);
    setError('');
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setSelectedFolderId(null);
    setError('');
  };

  const handleOnlyCreativeChange = (checked: boolean) => {
    setOnlyCreative(checked);
    if (checked) {
      setSelectedCategory('creative');
      setSelectedFolderId(null);
      setIsCreatingNew(false);
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Save to Favorites</h2>
          <p className="text-sm text-gray-500 mt-1">Choose a category and folder to save this item</p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Category Selection */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Select Category
              </label>
              {/* Only Creative Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 px-3 py-1 rounded-md transition-colors">
                <input
                  type="checkbox"
                  checked={onlyCreative}
                  onChange={(e) => handleOnlyCreativeChange(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Only Creative</span>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id as any);
                    setSelectedFolderId(null);
                    setIsCreatingNew(false);
                    setError('');
                    setOnlyCreative(false); // 手动选择分类时取消勾选
                  }}
                  disabled={onlyCreative && category.id !== 'creative'}
                  className={cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                      : onlyCreative && category.id !== 'creative'
                      ? 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                      : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Folder Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Folder
            </label>
            
            {/* Existing Folders List */}
            <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
              {currentFolders.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No folders in this category yet
                </div>
              ) : (
                currentFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => handleFolderSelect(folder.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-colors text-left',
                      selectedFolderId === folder.id
                        ? 'bg-blue-50 border-blue-600'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{folder.name}</div>
                        <div className="text-xs text-gray-500">{folder.itemCount} items</div>
                      </div>
                    </div>
                    {selectedFolderId === folder.id && (
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Create New Folder */}
            <div className="border-t border-gray-200 pt-3">
              {!isCreatingNew ? (
                <button
                  onClick={handleCreateNew}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-medium text-sm">Create New Folder</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter folder name..."
                    value={newFolderName}
                    onChange={(e) => {
                      setNewFolderName(e.target.value);
                      setError('');
                    }}
                    className="w-full"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsCreatingNew(false);
                      setNewFolderName('');
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="px-4 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
