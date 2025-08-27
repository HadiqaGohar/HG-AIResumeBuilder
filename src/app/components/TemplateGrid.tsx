'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useResumeStore } from '../../../lib/store';
import { templateConfigs } from '../../../lib/templateConfig';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FiStar, FiFilter, FiGrid, FiList } from 'react-icons/fi';

const TemplateGrid: React.FC = () => {
  const { setTemplateId } = useResumeStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyWorking, setShowOnlyWorking] = useState(false);

  const categories = ['all', 'Professional', 'Modern', 'Creative', 'Executive', 'Technology'];

  const filteredTemplates = templateConfigs.filter(template => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const workingMatch = !showOnlyWorking || template.isWorking;
    return categoryMatch && workingMatch;
  });

  const handleTemplateSelect = (templateId: string) => {
    setTemplateId(templateId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          <span className="text-5xl sm:text-6xl">C</span>hoose <span className="text-5xl sm:text-6xl">Y</span>our{' '}
          <span className="text-5xl sm:text-6xl">R</span>esume <span className="text-5xl sm:text-6xl">T</span>emplate
          <span className="text-5xl sm:text-6xl">!</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select from our professionally designed templates. More templates are added regularly!
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 flex items-center mr-2">
              <FiFilter className="mr-1" />
              Category:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Templates' : category}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showOnlyWorking}
                onChange={(e) => setShowOnlyWorking(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Available only</span>
            </label>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </div>
      </div>

      {/* Template Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      }>
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`transition-all duration-300 hover:shadow-xl hover:border-purple-400 bg-white ${
              viewMode === 'list' ? 'flex flex-row' : ''
            } ${!template.isWorking ? 'opacity-75' : ''}`}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-[300px]'} rounded-t-md overflow-hidden`}>
              <Image
                src={template.image}
                alt={template.name}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />

              {/* Template Status Badges */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                {template.isPro && (
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <FiStar className="w-3 h-3 mr-1" />
                    PRO
                  </div>
                )}
                {template.isWorking && (
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Available
                  </div>
                )}
              </div>

              {/* Category Badge */}
              {template.category && (
                <div className="absolute top-2 left-2">
                  <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                    {template.category}
                  </span>
                </div>
              )}
            </div>

            <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
              <CardHeader className="border-none pb-2">
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <div className="bg-yellow-400 mt-1 w-3 h-3 rounded-full border mr-2"></div>
                  <span>{template.name}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-700 text-sm mb-4">{template.description}</p>
                
                {/* Features */}
                {template.features && template.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{template.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {template.isWorking ? (
                  <Link href="/dashboard">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      Select Template
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full bg-gray-300 text-gray-600 cursor-not-allowed"
                    disabled={true}
                  >
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No templates found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or check back later for new templates.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setShowOnlyWorking(false);
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center py-8">
        <p className="text-gray-600 mb-2">
          More templates are being added regularly. Have a suggestion?
        </p>
        <Link href="/contact" className="text-purple-600 hover:underline font-semibold">
          {"Let us know what you'd like to see!"}
        </Link>
      </div>
    </div>
  );
};

export default TemplateGrid;