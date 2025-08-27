'use client';
// src/app/resume/preview/[resumeid]/page.tsx
import { useResumeStore } from '../../../../../lib/store';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import Template1 from '../../../components/templates/Template1';
import Template2 from '../../../components/templates/Template2';
import ResumePDF from '../../../components/pdf/ResumePDF';
import dynamic from 'next/dynamic';

// Dynamically import PDFDownloadLink to avoid SSR issues
const DynamicPDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => ({ default: mod.PDFDownloadLink })),
  { 
    ssr: false,
    loading: () => <button disabled>Loading PDF...</button>
  }
);

export default function Preview({  }: { params: Promise<{ resumeId: string }> }) {
  const { templateId, resumeData } = useResumeStore();
  const router = useRouter();

  const TemplateComponent = templateId === '1' ? Template1 : Template2;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
          Resume Preview
        </h1>
        <div
          id="resume-to-download"
          className="bg-white shadow-lg rounded-lg p-4 sm:p-6"
          style={{ maxWidth: '210mm', minHeight: '297mm' }} // A4 size
        >
          <TemplateComponent resumeData={resumeData} />
      </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push(`/resume/customize/${templateId}`)}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
          >
            Edit
          </Button>
          <DynamicPDFDownloadLink
            document={<ResumePDF resumeData={resumeData} templateId={templateId || "1"} />}
            fileName={`${resumeData.name || 'resume'}.pdf`}
            className="w-full sm:w-auto"
          >
            {({ loading }: { loading: boolean }) => (
              <Button
                disabled={loading}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
              >
                {loading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            )}
          </DynamicPDFDownloadLink>
        </div>
      </div>
    </div>
  );
}