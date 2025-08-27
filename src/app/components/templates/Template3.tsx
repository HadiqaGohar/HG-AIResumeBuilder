'use client';
import React from 'react';
import { ResumeData } from '../../../../lib/store';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiDownload, FiPrinter, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';


type Skills = string | { name: string };
type Language = string | { name: string };

type Education =
  | string
  | {
      degree?: string;
      institution?: string;
      startDate?: string;
      endDate?: string;
      location?: string;
      gpa?: string;
    };
type Experience =
  | string
  | {
      position?: string;
      company?: string;
      startDate?: string;
      endDate?: string;
      location?: string;
      description?: string;
    };

type Certification =
  | string
  | {
      name?: string;
      issuer?: string;
      date?: string;
    };

type Project =
  | string
  | {
      name?: string;
      description?: string;
      technologies?: string; // comma-separated
      url?: string;
    };

interface Template3Props {
  data?: ResumeData;
  resumeData?: ResumeData;
  onDownload?: () => void;
}

const Template3: React.FC<Template3Props> = ({ 
  // data,
   resumeData, onDownload }) => {
  // Use either data or resumeData prop
  // const templateData = data || resumeData || {};
  
  // Get the theme color from templateData, default to purple
  const primaryColor = resumeData.headerColor || '#7c3aed';
  const secondaryColor = resumeData.headerColor ? 
    `${resumeData.headerColor}dd` : '#6d28d9'; // Add transparency for secondary
  
  // Helper function to determine font styles
  const getFontStyles = (style?: string) => {
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
    <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-[297mm]">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 p-4 bg-gray-50 border-b print:hidden">
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: primaryColor }}
        >
          <FiDownload className="w-4 h-4" />
          Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FiPrinter className="w-4 h-4" />
          Print
        </button>
      </div>

      {/* Resume Content */}
      <div className="flex min-h-[250mm]">
        {/* Left Sidebar - Dynamic Color */}
        <div 
          className="w-1/3 text-white p-6 flex flex-col"
          style={{ backgroundColor: primaryColor }}
        >
          {/* Profile Section */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white">
              {(resumeData.profileImage || resumeData.image) ? (
                <Image
                  src={resumeData.profileImage || resumeData.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                />
              ) : (
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ backgroundColor: secondaryColor }}
                >
                  <span className="text-2xl font-bold text-white">
                    {resumeData.name ? resumeData.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'HG'}
                  </span>
                </div>
              )}
            </div>
            <h1 className="text-xl font-bold mb-1 text-white">
              {resumeData.name || 'Hadiqa Gohar'}
            </h1>
            <p className="text-sm font-medium text-white opacity-80">
              {resumeData.tag || 'Agentic AI Developer | NextJS and Python Developer'}
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
              CONTACT
            </h2>
            <div className="space-y-2 text-xs">
              {resumeData.email && (
                <div className="flex items-start gap-2">
                  <FiMail className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white break-all">{resumeData.email}</span>
                </div>
              )}
              {resumeData.number && (
                <div className="flex items-start gap-2">
                  <FiPhone className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white">{resumeData.number}</span>
                </div>
              )}
              {resumeData.location && (
                <div className="flex items-start gap-2">
                  <FiMapPin className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white">{resumeData.location}</span>
                </div>
              )}
              {resumeData.github && (
                <div className="flex items-start gap-2">
                  <FiGithub className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white break-all">{resumeData.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
                SKILLS
              </h2>
              <div className="space-y-1">
                {resumeData.skills.map((skill: Skills, index: number) => (
                  <div key={index} className="text-xs text-white">
                    • {typeof skill === 'string' ? skill : skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
                LANGUAGES
              </h2>
              <div className="space-y-1">
                {resumeData.languages.map((lang: Language, index: number) => (
                  <div key={index} className="text-xs text-white">
                    • {typeof lang === 'string' ? lang : lang.name }
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses */}
          {resumeData.courses && resumeData.courses.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
                COURSES
              </h2>
              <div className="space-y-1">
                {resumeData.courses.map((course: string, index: number) => (
                  <div key={index} className="text-xs text-white">
                    • {course}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert: Certification, index: number) => (
                  <div key={index}>
                    <h3 className="text-xs font-semibold text-white">{typeof cert === 'string' ? cert : cert.name}</h3>
                    {typeof cert === 'object' && cert.issuer && (
                      <p className="text-xs text-purple-200">{cert.issuer}</p>
                    )}
                    {typeof cert === 'object' && cert.date && (
                      <p className="text-xs text-purple-300">{cert.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {resumeData.references && resumeData.references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
                REFERENCES
              </h2>
              <div className="space-y-1">
                {resumeData.references.map((reference: string, index: number) => (
                  <div key={index} className="text-xs text-white">
                    • {reference}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {resumeData.hobbies && resumeData.hobbies.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
                HOBBIES
              </h2>
              <div className="space-y-1">
                {resumeData.hobbies.map((hobby: string, index: number) => (
                  <div key={index} className="text-xs text-white">
                    • {hobby}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extracurricular Activities */}
          {resumeData.extracurriculars && resumeData.extracurriculars.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
                ACTIVITIES
              </h2>
              <div className="space-y-1">
                {resumeData.extracurriculars.map((activity: string, index: number) => (
                  <div key={index} className="text-xs text-white">
                    • {activity}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Internships */}
          {resumeData.internships && resumeData.internships.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 text-white uppercase tracking-wide">
                INTERNSHIPS
              </h2>
              <div className="space-y-1">
                {resumeData.internships.map((internship: string, index: number) => (
                  <div key={index} className="text-xs text-white">
                    • {internship}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content - White Background */}
        <div className="w-2/3 p-6 bg-white">
          {/* Professional Summary */}
          {resumeData.summary && (
            <section className="mb-6">
              <h2 
                className="text-lg font-bold text-gray-800 mb-3 pb-1 border-b-2 uppercase tracking-wide"
                style={{ borderBottomColor: primaryColor }}
              >
                PROFESSIONAL SUMMARY
              </h2>
              <p 
                className="text-gray-700 leading-relaxed text-sm text-justify"
                style={{
                  fontSize: `${resumeData.summaryFontSize || 14}px`,
                  ...getFontStyles(resumeData.summaryFontStyle),
                }}
              >
                {resumeData.summary || 'Highly motivated and skilled Computer Science graduate with expertise in developing modern web applications using NextJS and Python. Proficient in leveraging NextJS framework to build performant, scalable, and user-friendly interfaces. Eager to apply technical skills and contribute to innovative projects in a challenging and rewarding environment. Seeking opportunities to deliver impactful solutions and further enhance expertise in web development.'}
              </p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <section className="mb-6">
              <h2 
                className="text-lg font-bold text-gray-800 mb-3 pb-1 border-b-2 uppercase tracking-wide"
                style={{ borderBottomColor: primaryColor }}
              >
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp: Experience, index: number) => (
                  <div key={index} className="relative">
                    <div className="mb-2">
                      <h3 className="text-base font-bold text-gray-800">
                        {typeof exp === 'string' ? exp : exp.position }
                      </h3>
                      {typeof exp === 'object' && exp.company && (
                        <p 
                          className="font-semibold text-sm"
                          style={{ color: primaryColor }}
                        >
                          {exp.company}
                        </p>
                      )}
                      {typeof exp === 'object' && (exp.startDate || exp.endDate) && (
                        <p className="text-gray-600 text-xs">
                          {exp.startDate} - {exp.endDate}
                          {exp.location && ` | ${exp.location}`}
                        </p>
                      )}
                    </div>
                    {typeof exp === 'object' && exp.description && (
                      <div className="text-gray-700 text-sm space-y-1">
                        {exp.description.split('\n').map((line: string, i: number) => (
                          <p key={i} className="flex items-start">
                            <span 
                              className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                              style={{ backgroundColor: primaryColor }}
                            ></span>
                            <span>{line.replace(/^•\s*/, '')}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-3 pb-1 border-b-2 border-purple-600 uppercase tracking-wide">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu: Education, index: number) => (
                  <div key={index} className="bg-purple-50 p-3 rounded border-l-4 border-purple-600">
                    <h3 className="text-base font-bold text-gray-800">
                      {typeof edu === 'string' ? edu : edu.degree}
                    </h3>
                    {typeof edu === 'object' && edu.institution && (
                      <p className="text-purple-600 font-semibold text-sm">
                        {edu.institution}
                      </p>
                    )}
                    {typeof edu === 'object' && (edu.startDate || edu.endDate) && (
                      <p className="text-gray-600 text-xs">
                        {edu.startDate} - {edu.endDate}
                        {edu.location && ` | ${edu.location}`}
                      </p>
                    )}
                    {typeof edu === 'object' && edu.gpa && (
                      <p className="text-gray-700 text-sm font-medium">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-3 pb-1 border-b-2 border-purple-600 uppercase tracking-wide">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {resumeData.projects.map((project: Project, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded border-l-4 border-purple-600">
                    <h3 className="text-base font-bold text-gray-800 mb-1">
                      {typeof project === 'string' ? project : project.name}
                    </h3>
                    {typeof project === 'object' && project.description && (
                      <p className="text-gray-700 text-sm mb-2">
                        {project.description}
                      </p>
                    )}
                    {typeof project === 'object' && project.technologies && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.split(',').map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-medium"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    {typeof project === 'object' && project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium text-sm"
                      >
                        <FiGlobe className="w-3 h-3 mr-1" />
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template3;