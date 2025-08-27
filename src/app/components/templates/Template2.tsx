"use client";
import React from "react";
import { ResumeData } from "../../../../lib/store";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiDownload,
  FiPrinter,
  FiGlobe,
} from "react-icons/fi";
import Image from "next/image";

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
    };

interface Template2Props {
  data?: ResumeData;
  resumeData?: ResumeData;
  onDownload?: () => void;
}

const Template2: React.FC<Template2Props> = ({
  // data,
  resumeData,
  onDownload,
}) => {
  // Use either data or resumeData prop
  // const templateData = data || resumeData || {};

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 p-4 bg-gray-50 border-b print:hidden">
        <button
          onClick={onDownload}
          className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors hover:bg-teal-700`}
          style={{
            // backgroundColor: templateData.headerColor || '#14b8a6'
            backgroundColor: resumeData.headerColor || "#14b8a6",
          }}
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
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div
          className="w-1/3 p-8"
          style={{ backgroundColor: resumeData.headerColor || "#a3e4db" }}
        >
          {/* Profile Photo */}
          <div className="text-center mb-8">
            {resumeData.profileImage || resumeData.image ? (
              <div className="w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <Image
                  src={resumeData.profileImage || resumeData.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                />
              </div>
            ) : (
              <div
                className="w-40 h-40 mx-auto mb-6 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                style={{
                  backgroundColor: resumeData.headerColor
                    ? `${resumeData.headerColor}40`
                    : "#a3e4db40",
                }}
              >
                <span
                  className="text-4xl font-bold"
                  style={{ color: resumeData.headerColor || "#0d9488" }}
                >
                  {resumeData.name
                    ? resumeData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                    : "YN"}
                </span>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
              Contact:
            </h2>
            <div className="space-y-3 text-gray-700">
              {(resumeData.phone || resumeData.number) && (
                <div className="flex items-start gap-3">
                  <FiPhone
                    className="w-4 h-4 mt-1"
                    style={{ color: resumeData.headerColor || "#0d9488" }}
                  />
                  <span className="text-sm">
                    {resumeData.phone || resumeData.number}
                  </span>
                </div>
              )}
              {resumeData.email && (
                <div className="flex items-start gap-3">
                  <FiMail
                    className="w-4 h-4 mt-1"
                    style={{ color: resumeData.headerColor || "#0d9488" }}
                  />
                  <span className="text-sm break-all">{resumeData.email}</span>
                </div>
              )}
              {resumeData.location && (
                <div className="flex items-start gap-3">
                  <FiMapPin
                    className="w-4 h-4 mt-1"
                    style={{ color: resumeData.headerColor || "#0d9488" }}
                  />
                  <span className="text-sm">{resumeData.location}</span>
                </div>
              )}
              {resumeData.linkedin && (
                <div className="flex items-start gap-3">
                  <FiLinkedin
                    className="w-4 h-4 mt-1"
                    style={{ color: resumeData.headerColor || "#0d9488" }}
                  />
                  <span className="text-sm break-all">
                    {resumeData.linkedin}
                  </span>
                </div>
              )}
              {resumeData.github && (
                <div className="flex items-start gap-3">
                  <FiGithub
                    className="w-4 h-4 mt-1"
                    style={{ color: resumeData.headerColor || "#0d9488" }}
                  />
                  <span className="text-sm break-all">{resumeData.github}</span>
                </div>
              )}
              {resumeData.websites && resumeData.websites.length > 0 && (
                <div className="flex items-start gap-3">
                  <FiGlobe
                    className="w-4 h-4 mt-1"
                    style={{ color: resumeData.headerColor || "#0d9488" }}
                  />
                  <span className="text-sm break-all">
                    {resumeData.websites[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Skills Section */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Key Skills:
              </h2>
              <div className="space-y-2">
                {resumeData.skills.map((skill: Skills, index: number) => (
                  <div key={index} className="text-gray-700">
                    <span className="text-sm">
                      • {typeof skill === "string" ? skill : skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills Section */}
          {resumeData.courses && resumeData.courses.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Technical Skills:
              </h2>
              <div className="space-y-2">
                {resumeData.courses.map((course: string, index: number) => (
                  <div key={index} className="text-gray-700">
                    <span className="text-sm">• {course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Languages:
              </h2>
              <div className="space-y-2">
                {resumeData.languages.map((lang: Language, index: number) => (
                  <div key={index} className="text-gray-700">
                    <span className="text-sm">
                      • {typeof lang === "string" ? lang : lang.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="w-2/3 p-8 bg-white">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 uppercase tracking-wide">
              {resumeData.name || "Your Name"}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              {resumeData.tag || "Professional Title"}
            </p>
          </div>

          {/* Profile Summary */}
          {resumeData.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Profile Summary:
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Education Section */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Education:
              </h2>
              <div className="space-y-6">
                {resumeData.education.map((edu: Education, index: number) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-800 uppercase">
                      {typeof edu === "string" ? edu : edu.degree}
                    </h3>
                    {typeof edu === "object" && (
                      <>
                        <p className="text-gray-600 font-medium">
                          • {edu.institution}
                        </p>
                        <p className="text-gray-600">
                          • {edu.startDate} - {edu.endDate}
                        </p>
                        {edu.location && (
                          <p className="text-gray-600">• {edu.location}</p>
                        )}
                        {edu.gpa && (
                          <p className="text-gray-600">• GPA: {edu.gpa}</p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teaching/Professional Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                {resumeData.tag?.toLowerCase().includes("teacher")
                  ? "Teaching Experience:"
                  : "Professional Experience:"}
              </h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp: Experience, index: number) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-800 uppercase">
                      {typeof exp === "string" ? exp : exp.position}
                    </h3>
                    {typeof exp === "object" && (
                      <>
                        <p className="text-gray-600 font-medium">
                          • {exp.company}
                        </p>
                        <p className="text-gray-600">
                          • {exp.startDate} - {exp.endDate}
                        </p>
                        {exp.location && (
                          <p className="text-gray-600 mb-2">• {exp.location}</p>
                        )}
                        {exp.description && (
                          <div className="text-gray-700 mt-2">
                            {exp.description
                              .split("\n")
                              .map((line: string, i: number) => (
                                <p key={i} className="mb-1 text-justify">
                                  {line.trim()}
                                </p>
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {/* {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Projects:
              </h2>
              <div className="space-y-4">
                {resumeData.projects.map((project: Project, index: number) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name || project}
                    </h3>
                    {project.description && (
                      <p className="text-gray-700 mt-1 text-justify">
                        {project.description}
                      </p>
                    )}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.split(',').map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded font-medium"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )} */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Projects:
              </h2>
              <div className="space-y-3">
                {resumeData.projects.map((proj: Project, index: number) => {
                  if (typeof proj === "string") {
                    // 🟡 case: project is just a string
                    return (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-800">{proj}</h3>
                      </div>
                    );
                  } else {
                    // 🟢 case: project is an object
                    return (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-800">
                          {proj.name || "Unnamed Project"}
                        </h3>
                        {proj.description && (
                          <p className="text-gray-600">{proj.description}</p>
                        )}
                        {proj.technologies && (
                          <p className="text-gray-600 text-sm">
                            Tech: {proj.technologies}
                          </p>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {/* {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Certifications:
              </h2>
              <div className="space-y-3">
                {resumeData.certifications.map((cert: Certification, index: number) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800">
                      {cert.name || cert}
                    </h3>
                    {cert.issuer && (
                      <p className="text-gray-600">
                        {cert.issuer}
                      </p>
                    )}
                    {cert.date && (
                      <p className="text-gray-600 text-sm">
                        Issued: {cert.date}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )} */}
          {resumeData.certifications &&
            resumeData.certifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                  Certifications:
                </h2>
                <div className="space-y-3">
                  {resumeData.certifications.map(
                    (cert: Certification, index: number) => {
                      if (typeof cert === "string") {
                        // 🟡 case: certification is just a string
                        return (
                          <div key={index}>
                            <h3 className="font-semibold text-gray-800">
                              {cert}
                            </h3>
                          </div>
                        );
                      } else {
                        // 🟢 case: certification is an object
                        return (
                          <div key={index}>
                            <h3 className="font-semibold text-gray-800">
                              {cert.name || "Unnamed Certification"}
                            </h3>
                            {cert.issuer && (
                              <p className="text-gray-600">{cert.issuer}</p>
                            )}
                            {cert.date && (
                              <p className="text-gray-600 text-sm">
                                Issued: {cert.date}
                              </p>
                            )}
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              </div>
            )}

          {/* References Section */}
          {resumeData.references && resumeData.references.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                References:
              </h2>
              <div className="space-y-3">
                {resumeData.references.map(
                  (reference: string, index: number) => (
                    <div key={index}>
                      <p className="text-gray-700">• {reference}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Hobbies Section */}
          {resumeData.hobbies && resumeData.hobbies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Hobbies:
              </h2>
              <div className="space-y-3">
                {resumeData.hobbies.map((hobby: string, index: number) => (
                  <div key={index}>
                    <p className="text-gray-700">• {hobby}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extracurricular Activities Section */}
          {resumeData.extracurriculars &&
            resumeData.extracurriculars.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                  Extracurricular Activities:
                </h2>
                <div className="space-y-3">
                  {resumeData.extracurriculars.map(
                    (activity: string, index: number) => (
                      <div key={index}>
                        <p className="text-gray-700">• {activity}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Internships Section */}
          {resumeData.internships && resumeData.internships.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Internships:
              </h2>
              <div className="space-y-3">
                {resumeData.internships.map(
                  (internship: string, index: number) => (
                    <div key={index}>
                      <p className="text-gray-700">• {internship}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Courses Section */}
          {resumeData.courses && resumeData.courses.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                Additional Courses:
              </h2>
              <div className="space-y-3">
                {resumeData.courses.map((course: string, index: number) => (
                  <div key={index}>
                    <p className="text-gray-700">• {course}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template2;
