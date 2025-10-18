'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  options?: FilterOption[];
  type: 'select' | 'multiselect' | 'date' | 'range' | 'toggle';
  hasActiveIndicator?: boolean;
  isPopular?: boolean;
  hasArrow?: boolean;
  placeholder?: string;
}

interface FilterItemProps {
  section: FilterSection;
  isActive: boolean;
  onClick: () => void;
}

const FilterItem = ({ section, isActive, onClick }: FilterItemProps) => {
  const Icon = section.icon;
  
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-gray-500 group-hover:text-gray-700" />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {section.title}
        </span>
        
        {section.isPopular && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            POPULAR
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {section.hasActiveIndicator && (
          <div className="w-2 h-2 rounded-full bg-black"></div>
        )}
        
        {section.hasArrow && (
          <ChevronDownIcon size={16} className="text-gray-400 rotate-[-90deg]" />
        )}
      </div>
    </button>
  );
};

interface PageFilterBaseProps {
  sections: FilterSection[];
  onFilterChange: (key: string, value: string | string[]) => void;
  getFilterValue: (key: string) => string | null;
  extraSections?: React.ReactNode;
  extraActions?: React.ReactNode;
}

export function PageFilterBase({
  sections,
  onFilterChange,
  getFilterValue,
  extraSections,
  extraActions,
}: PageFilterBaseProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleFilterItemClick = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const isFilterActive = (sectionId: string) => {
    return getFilterValue(sectionId) !== null;
  };

  const renderFilterContent = (section: FilterSection) => {
    if (!section.options || expandedSection !== section.id) {
      return null;
    }

    switch (section.type) {
      case 'multiselect':
        return (
          <div className="px-6 pb-4 space-y-2">
            {section.options.map((option) => {
              const currentValues = getFilterValue(section.id)?.split(',') || [];
              const isChecked = currentValues.includes(option.value);
              
              return (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      let newValues;
                      
                      if (e.target.checked) {
                        newValues = [...currentValues, option.value];
                      } else {
                        newValues = currentValues.filter((v) => v !== option.value);
                      }
                      
                      onFilterChange(section.id, newValues);
                    }}
                    checked={isChecked}
                  />
                  <span className="text-sm text-gray-600">{option.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'select':
        return (
          <div className="px-6 pb-4 space-y-2">
            {section.options.map((option) => {
              const currentValue = getFilterValue(section.id);
              const isSelected = currentValue === option.value;
              
              return (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="radio"
                    name={section.id}
                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={() => {
                      onFilterChange(section.id, option.value);
                    }}
                    checked={isSelected}
                  />
                  <span className="text-sm text-gray-600">{option.label}</span>
                </label>
              );
            })}
          </div>
        );

      case 'range':
        return (
          <div className="px-6 pb-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      case 'toggle':
        return (
          <div className="px-6 pb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => {
                  onFilterChange(section.id, e.target.checked ? 'true' : '');
                }}
                checked={getFilterValue(section.id) === 'true'}
              />
              <span className="text-sm text-gray-600">Enable</span>
            </label>
          </div>
        );

      case 'date':
        return (
          <div className="px-6 pb-4 space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-gray-500">From</label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500">To</label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Filter Container with Border */}
      <div className="w-64 bg-white overflow-y-auto">
        {/* Header */}
        <div className="p-3">
          <h2 className="text-sm font-medium text-gray-500">Filters</h2>
        </div>

        {/* Filter Sections */}
        <div className="space-y-1">
          {sections.map((section) => (
            <div key={section.id}>
              <FilterItem
                section={section}
                isActive={isFilterActive(section.id)}
                onClick={() => handleFilterItemClick(section.id)}
              />
              
              {/* Expanded content */}
              {renderFilterContent(section)}
            </div>
          ))}
        </div>

        {/* Extra Sections */}
        {extraSections}

        {/* Extra Actions */}
        {extraActions}
      </div>

      {/* Vertical Divider Line */}
      <div className="absolute top-0 right-0 h-full w-px bg-gray-200"></div>
    </div>
  );
}
