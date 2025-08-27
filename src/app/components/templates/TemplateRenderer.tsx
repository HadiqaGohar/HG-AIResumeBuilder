'use client';

import React from 'react';
import { useResumeStore } from '../../../../lib/store';
import Template1 from './Template1';
// Import other templates as they're created
// import Template2 from './Template2';
// import Template3 from './Template3';

interface TemplateRendererProps {
  templateId?: string;
  isEditable?: boolean;
  showEditButton?: boolean;
  onEdit?: () => void;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ 
  templateId, 
  isEditable = false, 
  showEditButton = false,
  onEdit 
}) => {
  const { templateId: storeTemplateId } = useResumeStore();
  const currentTemplateId = templateId || storeTemplateId || '1';

  const renderTemplate = () => {
    switch (currentTemplateId) {
      case '1':
        return <Template1 isEditable={isEditable} showEditButton={showEditButton} onEdit={onEdit} />;
      case '2':
        // return <Template2 isEditable={isEditable} showEditButton={showEditButton} onEdit={onEdit} />;
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Template 2</h3>
            <p className="text-gray-600">Coming Soon! This template is under development.</p>
          </div>
        );
      case '3':
        // return <Template3 isEditable={isEditable} showEditButton={showEditButton} onEdit={onEdit} />;
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Template 3</h3>
            <p className="text-gray-600">Coming Soon! This template is under development.</p>
          </div>
        );
      default:
        return <Template1 isEditable={isEditable} showEditButton={showEditButton} onEdit={onEdit} />;
    }
  };

  return (
    <div className="template-renderer">
      {renderTemplate()}
    </div>
  );
};

export default TemplateRenderer;