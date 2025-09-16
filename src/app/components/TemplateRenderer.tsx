// 'use client';
// import React from 'react';
// import { ResumeData } from '../../../lib/store';
// import Template1 from './templates/Template1';
// import Template2 from './templates/Template2';
// import Template3 from './templates/Template3';

// interface TemplateRendererProps {
//   templateId: string;
//   data: ResumeData;
//   onDownload?: () => void;
// }

// const TemplateRenderer: React.FC<TemplateRendererProps> = ({ 
//   templateId, 
//   data, 
//   onDownload 
// }) => {
//   const renderTemplate = () => {
//     const templateProps = {
//       data: data,
//       resumeData: data,
//       isEditable: false,
//       showEditButton: false,
//       onEdit: undefined
//     };

//     switch (templateId) {
//       case '1':
//         return <Template1 {...templateProps} />;
//       case '2':
//         return <Template2 {...templateProps} onDownload={onDownload} />;
//       case '3':
//         return <Template3 {...templateProps} onDownload={onDownload} />;
//       default:
//         return <Template1 {...templateProps} />;
//     }
//   };

//   return (
//     <div className="template-renderer w-full h-full">
//       <div className="w-full h-full overflow-hidden">
//         {renderTemplate()}
//       </div>
//     </div>
//   );
// };

// export default TemplateRenderer;


"use client";

import React from "react";
import { ResumeData } from "../../../lib/store";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";

interface TemplateRendererProps {
  templateId: string;
  data: ResumeData;
  onDownload?: () => void;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  templateId,
  data,
  onDownload,
}) => {
  const renderTemplate = () => {
    const templateProps = {
      data: data,
      resumeData: data,
      isEditable: false,
      showEditButton: false,
      onEdit: undefined,
    };

    switch (templateId) {
      case "1":
        return <Template1 {...templateProps} />;
      case "2":
        return <Template2 {...templateProps} onDownload={onDownload} />;
      case "3":
        return <Template3 {...templateProps} onDownload={onDownload} />;
      default:
        return <Template1 {...templateProps} />;
    }
  };

  return (
    <div className="template-renderer w-full h-auto">
      <div className="w-full h-auto overflow-auto">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default TemplateRenderer;
