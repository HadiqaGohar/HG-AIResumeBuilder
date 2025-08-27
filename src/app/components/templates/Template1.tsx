import Link from "next/link";
import Image from "next/image";
import { ResumeState, useResumeStore } from "../../../../lib/store";

import { FiEdit3, FiDownload } from "react-icons/fi";
import { useState } from "react";
import { generatePDF } from "../../../../lib/pdfGenerator";

interface TemplateProps {
  resumeData?: ResumeState["resumeData"];
  isEditable?: boolean;
  showEditButton?: boolean;
  onEdit?: () => void;
}

export default function Template1({ 
  resumeData: propResumeData, 
  isEditable = false, 
  showEditButton = false,
  onEdit 
}: TemplateProps) {
  const { resumeData: storeResumeData } = useResumeStore();
  const resumeData = propResumeData || storeResumeData;
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  const handleDownload = async () => {
    const filename = `${resumeData.name || 'resume'}_user_template1.pdf`;
    await generatePDF(resumeData, filename, "1", false); // Template 1, User Created
  };
  // Helper function to determine font styles
  const getFontStyles = (style: string) => {
    switch (style) {
      case "bold":
        return { fontWeight: "bold" };
      case "italic":
        return { fontStyle: "italic" };
      case "bold-italic":
        return { fontWeight: "bold", fontStyle: "italic" };
      default:
        return {};
    }
  };
  return (
    <div className="relative">
      {/* Edit Controls - Hidden in preview mode */}
      {(showEditButton || isEditable) && (
        <div className="absolute top-4 right-4 z-10 flex space-x-2 print-hidden no-print">
          <button
            onClick={handleEdit}
            className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            title="Edit Resume"
          >
            <FiEdit3 className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            title="Download/Print"
          >
            <FiDownload className="w-4 h-4 mr-1" />
            Download
          </button>
        </div>
      )}
      
      <div id="resume-template" className="flex min-h-screen font-sans text-sm">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#2c2c2c] text-white p-6 flex flex-col justify-start">
        {(resumeData.profileImage || resumeData.image) && (
          <div className="w-32 h-32 rounded-full bg-gray-400 mx-auto mb-4 overflow-hidden">
            <Image
              src={resumeData.profileImage || resumeData.image}
              alt="Profile"
              className="w-full h-full object-cover"
              width={128}
              height={128}
            />
          </div>
        )}

        {resumeData.number || resumeData.email || resumeData.location ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <div className="text-left mb-4 text-xs">
              {resumeData.number && <p>Phone Number: {resumeData.number}</p>}
              {resumeData.email && <p>Email: {resumeData.email}</p>}
              {resumeData.location && <p>Location: {resumeData.location}</p>}
            </div>
            <hr className="border-gray-500 my-4" />
          </>
        ) : null}

        {resumeData.websites.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Websites, Portfolios</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="space-y-1 list-disc pl-5 text-xs">
              {resumeData.websites.map((web: string, idx: number) => (
                <li key={idx}>
                  <a
                    href={web.trim()}
                    className="text-blue-300 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {web.trim() || "Website"}
                  </a>
                </li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}
        
        {resumeData.languages.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Languages</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="list-disc pl-5 text-xs">
              {resumeData.languages.map((lang: string, idx: number) => (
                <li key={idx}>{lang}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

        {resumeData.education.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.education.map((edu: string, idx: number) => (
                <li key={idx}>{edu}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

        {resumeData.student.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Is Student?</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.student.map((stu: string, idx: number) => (
                <li key={idx}>{stu}</li>
              ))}
            </ul>
          </>
        )}
        {resumeData.courses.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Courses</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.courses.map((course: string, idx: number) => (
                <li key={idx}>{course}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

        {resumeData.internships.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Internships</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.internships.map((internship: string, idx: number) => (
                <li key={idx}>{internship}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

        {resumeData.extracurriculars.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Extracurricular Activities</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.extracurriculars.map((activity: string, idx: number) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

        {resumeData.hobbies.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Hobbies</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.hobbies.map((hobby: string, idx: number) => (
                <li key={idx}>{hobby}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

        {resumeData.references.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">References</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.references.map((reference: string, idx: number) => (
                <li key={idx}>{reference}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white ">
        <div
          className="h-[150px] w-full flex items-center text-center"
          style={{ backgroundColor: resumeData.headerColor || "#aad6f2" }}
        >
          <h2
            className="text-3xl ml-8 font-medium text-black uppercase"
            style={{
              fontSize: `${resumeData.nameFontSize}px`,
              ...getFontStyles(resumeData.nameFontStyle),
            }}
          >
            {resumeData.name || "Your Name"}
          </h2>
        </div>

        {resumeData.tag && (
          <section className="-mt-10 ml-8"
             style={{
              fontSize: `${resumeData.tagFontSize}px`,
              ...getFontStyles(resumeData.tagFontStyle),
            }}
          
          >
            {resumeData.tag || ""}
          </section>
        )}
        

        {resumeData.summary && (
          <section className="mb-6 mx-6 mt-10">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Summary
            </h2>
            <p
              style={{
                fontSize: `${resumeData.summaryFontSize}px`,
                ...getFontStyles(resumeData.summaryFontStyle),
              }}
            >
              {resumeData.summary || "AI-generated summary will appear here."}
            </p>
          </section>
        )}

        {resumeData.skills.length > 0 && (
          <section className="mb-6 mx-6 mt-8">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Top Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-black rounded-full text-sm"
                  style={{
                    backgroundColor: resumeData.headerColor || "#aad6f2",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="mb-6 mx-6 mt-8">
            <h3 className="text-base font-semibold uppercase mb-2">
              Experience
            </h3>
            <hr />
            <ul className="pl-5 list-disc">
              {resumeData.experience.map((exp: string, idx: number) => (
                <li key={idx}>{exp}</li>
              ))}
            </ul>
          </section>
        )}

        {resumeData.awards?.length > 0 && (
          <section className="mb-6 mx-6 mt-8">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Awards</h2>
            <ul className="list-disc pl-5">
              {resumeData.awards.map((award: string, idx: number) => (
                <li key={idx}>{award}</li>
              ))}
            </ul>
          </section>
        )}

        {resumeData.extra?.length > 0 && (
          <section className="mb-6 mx-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Extra Section
            </h2>
            <ul className="list-disc pl-5">
              {resumeData.extra.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-gray-500 italic underline">
          <Link href="https://github.com/HadiqaGohar/">
            Powered by Hadiqa Gohar
          </Link>
        </footer>
      </main>
      </div>
    </div>
  );
}
