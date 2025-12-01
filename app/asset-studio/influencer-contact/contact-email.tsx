'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  niche?: string;
}

interface ContactEmailProps {
  isOpen: boolean;
  onClose: () => void;
  creators: Creator[];
}

export default function ContactEmail({ isOpen, onClose, creators }: ContactEmailProps) {
  const [mailingName, setMailingName] = useState('');
  const [fromEmail, setFromEmail] = useState('Wednesday Email — david du');
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [fontSize, setFontSize] = useState('9px');
  const [showMergeFields, setShowMergeFields] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-4 top-4 bottom-4 w-auto max-w-[calc(100vw-2rem)] bg-white z-50 shadow-2xl overflow-hidden flex flex-col rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">New email</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-[1fr,320px]">
            {/* Left Column - Email Form */}
            <div className="border-r border-gray-200">
              <div className="p-6 space-y-4">
                {/* Mailing Name */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Mailing Name</label>
                  <input
                    type="text"
                    value={mailingName}
                    onChange={(e) => setMailingName(e.target.value)}
                    placeholder="Enter mailing name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* From */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">From</label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-900 flex-1">{fromEmail}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* To */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">To</label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <span className="text-sm font-medium text-gray-900">{creators.length} creators</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                    </svg>
                    <div className="flex-1" />
                    <button className="text-xs text-gray-600 hover:text-gray-900 px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                      Cc
                    </button>
                    <button className="text-xs text-gray-600 hover:text-gray-900 px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                      Bcc
                    </button>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Editor Toolbar */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
                    {/* Email Assistant */}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Email Assistant</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Templates */}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Templates</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Formatting Options */}
                    <div className="flex items-center gap-1 ml-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Bold">
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h8a4 4 0 110 8H6zM6 12h9a4 4 0 110 8H6z" />
                        </svg>
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Italic">
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <line x1="19" y1="4" x2="10" y2="4" />
                          <line x1="14" y1="20" x2="5" y2="20" />
                          <line x1="15" y1="4" x2="9" y2="20" />
                        </svg>
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Underline">
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3M4 21h16" />
                        </svg>
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Link">
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </button>
                    </div>

                    {/* Color */}
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors ml-1" title="Text Color">
                      <div className="w-4 h-4 bg-black rounded-sm" />
                    </button>

                    {/* Font */}
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      <option>Arial</option>
                      <option>Times New Roman</option>
                      <option>Verdana</option>
                    </select>

                    {/* Font Size */}
                    <select 
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      <option value="9px">9px</option>
                      <option value="10px">10px</option>
                      <option value="12px">12px</option>
                      <option value="14px">14px</option>
                      <option value="16px">16px</option>
                    </select>

                    {/* More Options */}
                    <button className="p-1.5 hover:bg-gray-100 rounded transition-colors ml-auto" title="More">
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="5" r="1" fill="currentColor" />
                        <circle cx="12" cy="12" r="1" fill="currentColor" />
                        <circle cx="12" cy="19" r="1" fill="currentColor" />
                      </svg>
                    </button>
                  </div>

                  {/* Email Content Editor */}
                  <div className="relative">
                    <textarea
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      placeholder="Write your email message here..."
                      className="w-full h-[300px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      style={{ fontSize }}
                    />

                    {/* Insert Merge Fields Button */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => setShowMergeFields(!showMergeFields)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7" rx="1" />
                          <rect x="14" y="3" width="7" height="7" rx="1" />
                          <rect x="14" y="14" width="7" height="7" rx="1" />
                          <rect x="3" y="14" width="7" height="7" rx="1" />
                        </svg>
                        <span>Insert Merge Fields</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                        </svg>
                      </button>

                      {/* Merge Fields Dropdown */}
                      {showMergeFields && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="p-3">
                            <input
                              type="text"
                              placeholder="Search"
                              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="border-t border-gray-200">
                            <div className="px-3 py-2">
                              <button className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                  </svg>
                                  <span className="font-medium">Influencer Profile</span>
                                </div>
                              </button>
                              <button className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                  </svg>
                                  <span className="font-medium">Social Media</span>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attachment */}
                  <div className="mt-4">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span>Attachment</span>
                    </button>
                  </div>

                  {/* Tip */}
                  <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Tip:</span> Write <code className="px-1 py-0.5 bg-white rounded text-blue-600 font-medium">{'{{ }}'}</code> in your mailing template to display all merge fields
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Email Templates */}
            <div className="bg-gray-50">
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Recommended Templates</h3>
                  <span className="text-xs text-gray-500">{creators.length} creators selected</span>
                </div>

                {/* Template Cards */}
                <div className="space-y-3">
                  {/* Template 1 - Brand Collaboration */}
                  <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Brand Collaboration</h4>
                            <p className="text-xs text-gray-500">Professional partnership proposal</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        Hi {'{{first_name}}'}, we&apos;re impressed by your {'{{influencer_niche}}'} content and would love to collaborate...
                      </p>
                      <button className="w-full px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        Apply Template
                      </button>
                    </div>
                  </div>

                  {/* Template 2 - Product Review */}
                  <div className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Product Review Request</h4>
                            <p className="text-xs text-gray-500">Invite for product testing</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        Hello {'{{first_name}}'}, we&apos;d like to send you our latest product for an honest review...
                      </p>
                      <button className="w-full px-3 py-2 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        Apply Template
                      </button>
                    </div>
                  </div>

                  {/* Template 3 - Event Invitation */}
                  <div className="bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Event Invitation</h4>
                            <p className="text-xs text-gray-500">Exclusive event invite</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        Dear {'{{first_name}}'}, you&apos;re invited to our exclusive launch event as a VIP guest...
                      </p>
                      <button className="w-full px-3 py-2 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        Apply Template
                      </button>
                    </div>
                  </div>

                  {/* Template 4 - Affiliate Program */}
                  <div className="bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group">
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">Affiliate Program</h4>
                            <p className="text-xs text-gray-500">Commission-based partnership</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        Hi {'{{first_name}}'}, join our affiliate program and earn up to 20% commission on every sale...
                      </p>
                      <button className="w-full px-3 py-2 text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        Apply Template
                      </button>
                    </div>
                  </div>
                </div>

                {/* Custom Template Button */}
                <button className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg transition-all flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create Custom Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-600">Preview</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
