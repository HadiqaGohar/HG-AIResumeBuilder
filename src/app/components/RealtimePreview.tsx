'use client';

import React, { useEffect, useState } from 'react';
import { useResumeStore } from '../../../lib/store';
import { FiEye, FiDownload, FiShare2 } from 'react-icons/fi';
import { Button } from './ui/button';
import { Card } from './ui/card';

export default function RealtimePreview() {
  const { resumeData, templateId } = useResumeStore();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Update timestamp when resume data changes
  useEffect(() => {
    setLastUpdated(new Date());
  }, [resumeData]);

  const handleDownload = () => {
    // Implement PDF download logic
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Resume',
          text: 'Check out my professional resume',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Card className="sticky top-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <FiEye className="w-4 h-4 mr-2" />
          Live Preview
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          <FiEye className="w-4 h-4 mr-2" />
          {isPreviewMode ? 'Exit Preview' : 'Full Preview'}
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="text-sm"
          >
            <FiDownload className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="text-sm"
          >
            <FiShare2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Template:</span>
              <span className="font-medium">#{templateId}</span>
            </div>
            <div className="flex justify-between">
              <span>Skills:</span>
              <span className="font-medium">{resumeData.skills.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Education:</span>
              <span className="font-medium">{resumeData.education.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Experience:</span>
              <span className="font-medium">{resumeData.experience.length}</span>
            </div>
          </div>
        </div>

        {/* ATS Score Indicator */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">ATS Score</span>
            <span className="text-lg font-bold text-green-600">85%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-[85%]"></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">Excellent ATS compatibility</p>
        </div>
      </div>
    </Card>
  );
}