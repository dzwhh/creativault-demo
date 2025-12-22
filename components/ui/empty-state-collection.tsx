import React, { useState } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';

interface EmptyStateCollectionProps {
  title?: string;
  description?: string;
  onSubmit?: (requirements: string) => Promise<void>;
  placeholder?: string;
  buttonText?: string;
}

export function EmptyStateCollection({
  title = 'Data Collection Service',
  description = 'Submit your influencer data collection requirements and our team will help you gather the information',
  onSubmit,
  placeholder = '',
  buttonText = 'Submit Requirements',
}: EmptyStateCollectionProps) {
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultTemplate = `Brand: Petlibro
Category: Pet
Platform: IG/YTB/TT
Region: Global, mainly Europe and North America
Collection Period: January 1, 2025 - December 22, 2025

Category Keywords:
- Litter Box/Luma Smart Litter Box
- One RFID Feeders
- Granary Series
- Meet Mockstream 2

Collection Content:
- Influencer collaboration videos with brand
- Data fields: Views, Influencer homepage link, ID, Country/Region, Publish date, Language
- Other basic data metrics`;

  const handleSubmit = async () => {
    if (!requirements.trim()) {
      alert('Please fill in your collection requirements');
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(requirements);
      }
      alert('Requirements submitted successfully! Our team will contact you soon.');
      setRequirements('');
    } catch (error) {
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseTemplate = () => {
    setRequirements(defaultTemplate);
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-10 max-w-4xl w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 mb-6">{description}</p>
        </div>

        {/* Template Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleUseTemplate}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Use Template
          </button>
        </div>

        {/* Requirements Textarea */}
        <div className="mb-6">
          <Textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder={placeholder || "Please describe your collection requirements...\n\nExample:\nBrand: Your Brand Name\nCategory: Industry\nPlatform: TikTok/Instagram/YouTube\nRegion: Target regions\nCollection Period: Start date - End date\n\nKeywords:\n- Keyword 1\n- Keyword 2\n\nCollection Content:\n- Required data fields and metrics"}
            className="min-h-[300px] resize-none font-mono text-sm"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {requirements.length} characters
            </span>
            <span className="text-xs text-gray-500">
              Format: Plain text or structured data
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !requirements.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            buttonText
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Our team will review your requirements and contact you within 24 hours
        </p>
      </div>
    </div>
  );
}
