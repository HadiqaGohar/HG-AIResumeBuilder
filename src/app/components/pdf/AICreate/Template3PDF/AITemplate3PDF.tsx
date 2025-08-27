/* eslint-disable jsx-a11y/alt-text */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";
import { ResumeState } from "../../../../../../lib/store";

type Skill = string | { name: string };
type Language = string | { name: string };
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

type Education =
  | string
  | {
      degree?: string;
      institution?: string;
      startDate?: string;
      endDate?: string;
      location?: string;
    };

type Project =
  | string
  | {
      name?: string;
      description?: string;
      technologies?: string;
    };

// interface ResumeData {
//   skills?: Skill[];
//   languages?: Language[];
//   experience?: Experience[];
//   education?: Education[];
//   projects?: Project[];
// }

// Register fonts
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

// Helper functions
const resizeImage = (imageUrl: string) => {
  return imageUrl;
};

// Template 3 Styles (Purple Sidebar Design)
const template3Styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333333",
  },
  // Left sidebar - Purple
  sidebar: {
    width: "35%",
    backgroundColor: "#7c3aed", // Purple
    padding: 20,
    color: "#ffffff",
  },
  // Profile section
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    border: "3px solid #ffffff",
  },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6d28d9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    border: "3px solid #ffffff",
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  mainName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 10,
    color: "#c4b5fd",
    textAlign: "center",
    marginBottom: 15,
  },
  // Sidebar sections
  sidebarSection: {
    marginBottom: 18,
  },
  sidebarSectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactItem: {
    fontSize: 8,
    color: "#ffffff",
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  skillItem: {
    fontSize: 8,
    color: "#ffffff",
    marginBottom: 3,
  },
  // Main content area - Right side
  mainContent: {
    width: "65%",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  leftColumn: {
    width: "100%",
  },
  rightColumn: {
    width: "100%",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#7c3aed",
    paddingBottom: 3,
  },
  // Experience items
  experienceItem: {
    marginBottom: 12,
    paddingBottom: 8,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  company: {
    fontSize: 9,
    color: "#7c3aed",
    fontWeight: "bold",
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 4,
  },
  description: {
    fontSize: 8,
    color: "#4b5563",
    lineHeight: 1.4,
    marginBottom: 2,
  },
  // Education items
  educationItem: {
    marginBottom: 8,
  },
  educationBox: {
    backgroundColor: "#f8fafc",
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#7c3aed",
  },
  degree: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  institution: {
    fontSize: 9,
    color: "#7c3aed",
    fontWeight: "bold",
    marginBottom: 2,
  },
  // Skills section
  skillCategory: {
    marginBottom: 12,
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 4,
  },
  skillsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  // Bullet points
  bulletPoint: {
    fontSize: 8,
    color: "#4b5563",
    marginBottom: 2,
    marginLeft: 10,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.5,
    textAlign: "justify",
    marginBottom: 8,
    color: "#4b5563",
  },
  // Footer
  footer: {
    position: "absolute" as const,
    bottom: 15,
    left: 20,
    right: 20,
    textAlign: "center" as const,
    fontSize: 7,
    color: "#7c3aed",
  },
});

interface AITemplate3PDFProps {
  resumeData: ResumeState["resumeData"];
}

const AITemplate3PDF = ({ resumeData }: AITemplate3PDFProps) => {
  const imageUrl = resumeData.profileImage || resumeData.image;
  const isValidImage = imageUrl && imageUrl.startsWith("data:image/");

  // Get dynamic colors from resumeData
  const primaryColor = resumeData.headerColor || "#7c3aed";
  
  const secondaryColor = resumeData.headerColor
    ? resumeData.headerColor === "#7c3aed"
      ? "#6d28d9"
      : resumeData.headerColor + "99"
    : "#6d28d9";

  return (
    <Document>
      <Page size="A4" style={template3Styles.page}>
        {/* Left Sidebar - Dynamic Color */}
        <View
          style={[template3Styles.sidebar, { backgroundColor: primaryColor }]}
        >
          {/* Profile Section */}
          <View style={template3Styles.profileSection}>
            {isValidImage ? (
              <Image
                src={resizeImage(imageUrl)}
                style={template3Styles.profilePhoto}
                // alt="Profile"
              />
            ) : (
              <View
                style={[
                  template3Styles.profilePlaceholder,
                  { backgroundColor: secondaryColor },
                ]}
              >
                <Text style={template3Styles.profileInitials}>
                  {resumeData.name
                    ? resumeData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                    : "HG"}
                </Text>
              </View>
            )}

            <Text style={template3Styles.mainName}>
              {resumeData.name || "Hadiqa Gohar"}
            </Text>
            <Text style={template3Styles.mainTitle}>
              {resumeData.tag ||
                "Agentic AI Developer | NextJS and Python Developer"}
            </Text>
          </View>

          {/* Contact Info */}
          <View style={template3Styles.sidebarSection}>
            <Text style={template3Styles.sidebarSectionTitle}>CONTACT</Text>
            {resumeData.email && (
              <View style={template3Styles.contactItem}>
                <Text style={template3Styles.skillItem}>
                  ✉ {resumeData.email}
                </Text>
              </View>
            )}
            {resumeData.number && (
              <View style={template3Styles.contactItem}>
                <Text style={template3Styles.skillItem}>
                  ☎ {resumeData.number}
                </Text>
              </View>
            )}
            {resumeData.location && (
              <View style={template3Styles.contactItem}>
                <Text style={template3Styles.skillItem}>
                  ⌂ {resumeData.location}
                </Text>
              </View>
            )}
            {resumeData.websites && resumeData.websites.length > 0 && (
              <View style={template3Styles.contactItem}>
                <Text style={template3Styles.skillItem}>
                  ⚡ {resumeData.websites[0]}
                </Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {/* {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>SKILLS</Text>
              {resumeData.skills.map((skill, idx) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  •{" "}
                  {typeof skill === "string"
                    ? skill
                    : (skill)?.name || String(skill)}
                </Text>
              ))}
            </View>
          )} */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>SKILLS</Text>
              {resumeData.skills.map((skill: Skill, idx: number) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  • {typeof skill === "string" ? skill : skill.name}
                </Text>
              ))}
            </View>
          )}

          {/* Languages */}
          {/* {resumeData.languages && resumeData.languages.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>LANGUAGES</Text>
              {resumeData.languages.map((lang, idx) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  •{" "}
                  {typeof lang === "string"
                    ? lang
                    : (lang)?.name || String(lang)}
                </Text>
              ))}
            </View>
          )} */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>LANGUAGES</Text>
              {resumeData.languages.map((lang: Language, idx: number) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  • {typeof lang === "string" ? lang : lang.name}
                </Text>
              ))}
            </View>
          )}

          {/* Courses */}
          {resumeData.courses && resumeData.courses.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>COURSES</Text>
              {resumeData.courses.map((course, idx) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  • {course}
                </Text>
              ))}
            </View>
          )}

          {/* Hobbies */}
          {resumeData.hobbies && resumeData.hobbies.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>HOBBIES</Text>
              {resumeData.hobbies.map((hobby, idx) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  • {hobby}
                </Text>
              ))}
            </View>
          )}

          {/* References */}
          {resumeData.references && resumeData.references.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>
                REFERENCES
              </Text>
              {resumeData.references.map((reference, idx) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  • {reference}
                </Text>
              ))}
            </View>
          )}

          {/* Internships */}
          {resumeData.internships && resumeData.internships.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>
                INTERNSHIPS
              </Text>
              {resumeData.internships.map((internship, idx) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  • {internship}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Right Content - White Background */}
        <View style={template3Styles.mainContent}>
          {/* Professional Summary */}
          {resumeData.summary && (
            <View style={template3Styles.section}>
              <Text
                style={[
                  template3Styles.sectionTitle,
                  { borderBottomColor: primaryColor },
                ]}
              >
                PROFESSIONAL SUMMARY
              </Text>
              <Text style={template3Styles.text}>
                {resumeData.summary ||
                  "Highly motivated and skilled Computer Science graduate with expertise in developing modern web applications using NextJS and Python. Proficient in leveraging NextJS framework to build performant, scalable, and user-friendly interfaces. Eager to apply technical skills and contribute to innovative projects in a challenging and rewarding environment. Seeking opportunities to deliver impactful solutions and further enhance expertise in web development."}
              </Text>
            </View>
          )}

          {/* Work Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={template3Styles.section}>
              <Text
                style={[
                  template3Styles.sectionTitle,
                  { borderBottomColor: primaryColor },
                ]}
              >
                PROFESSIONAL EXPERIENCE
              </Text>
              {/* {resumeData.experience.map((exp, idx) => (
                <View key={idx} style={template3Styles.experienceItem}>
                  <Text style={template3Styles.jobTitle}>
                    {typeof exp === "string"
                      ? exp
                      : (exp)?.position || String(exp)}
                  </Text>
                  {typeof exp === "object" && exp !== null && (
                    <>
                      {(exp)?.company && (
                        <Text
                          style={[
                            template3Styles.company,
                            { color: primaryColor },
                          ]}
                        >
                          {(exp).company}
                        </Text>
                      )}
                      {(exp)?.startDate && (exp)?.endDate && (
                        <Text style={template3Styles.dateRange}>
                          {(exp ).startDate} - {(exp).endDate}
                          {(exp)?.location &&
                            ` | ${(exp).location}`}
                        </Text>
                      )}
                      {(exp)?.description && (
                        <Text style={template3Styles.description}>
                          {(exp).description}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              ))} */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <>
                  {resumeData.experience.map((exp: Experience, idx: number) => (
                    <View key={idx} style={template3Styles.experienceItem}>
                      <Text style={template3Styles.jobTitle}>
                        {typeof exp === "string"
                          ? exp
                          : exp?.position || String(exp)}
                      </Text>

                      {typeof exp === "object" && exp !== null && (
                        <>
                          {exp.company && (
                            <Text
                              style={[
                                template3Styles.company,
                                { color: primaryColor },
                              ]}
                            >
                              {exp.company}
                            </Text>
                          )}

                          {exp.startDate && exp.endDate && (
                            <Text style={template3Styles.dateRange}>
                              {exp.startDate} - {exp.endDate}
                              {exp.location && ` | ${exp.location}`}
                            </Text>
                          )}

                          {exp.description && (
                            <Text style={template3Styles.description}>
                              {exp.description}
                            </Text>
                          )}
                        </>
                      )}
                    </View>
                  ))}
                </>
              )}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={template3Styles.section}>
              <Text
                style={[
                  template3Styles.sectionTitle,
                  { borderBottomColor: primaryColor },
                ]}
              >
                EDUCATION
              </Text>
              {/* {resumeData.education.map((edu, idx) => (
                <View
                  key={idx}
                  style={[
                    template3Styles.educationBox,
                    { borderLeftColor: primaryColor },
                  ]}
                >
                  <Text style={template3Styles.degree}>
                    {typeof edu === "string"
                      ? edu
                      : (edu)?.degree || String(edu)}
                  </Text>
                  {typeof edu === "object" && edu !== null && (
                    <>
                      {(edu)?.institution && (
                        <Text
                          style={[
                            template3Styles.institution,
                            { color: primaryColor },
                          ]}
                        >
                          {(edu).institution}
                        </Text>
                      )}
                      {(edu)?.startDate && (edu)?.endDate && (
                        <Text style={template3Styles.dateRange}>
                          {(edu).startDate} - {(edu).endDate}
                          {(edu)?.location &&
                            ` | ${(edu).location}`}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              ))} */}
              {resumeData.education && resumeData.education.length > 0 && (
                <>
                  {resumeData.education.map((edu: Education, idx: number) => (
                    <View
                      key={idx}
                      style={[
                        template3Styles.educationBox,
                        { borderLeftColor: primaryColor },
                      ]}
                    >
                      <Text style={template3Styles.degree}>
                        {typeof edu === "string"
                          ? edu
                          : edu?.degree || String(edu)}
                      </Text>

                      {typeof edu === "object" && edu !== null && (
                        <>
                          {edu.institution && (
                            <Text
                              style={[
                                template3Styles.institution,
                                { color: primaryColor },
                              ]}
                            >
                              {edu.institution}
                            </Text>
                          )}

                          {edu.startDate && edu.endDate && (
                            <Text style={template3Styles.dateRange}>
                              {edu.startDate} - {edu.endDate}
                              {edu.location && ` | ${edu.location}`}
                            </Text>
                          )}
                        </>
                      )}
                    </View>
                  ))}
                </>
              )}
            </View>
          )}

          {/* Achievements */}
          {resumeData.awards && resumeData.awards.length > 0 && (
            <View style={template3Styles.section}>
              <Text style={template3Styles.sectionTitle}>ACHIEVEMENTS</Text>
              {resumeData.awards.map((award, idx) => (
                <Text key={idx} style={template3Styles.bulletPoint}>
                  • {award}
                </Text>
              ))}
            </View>
          )}

          {/* Extracurriculars */}
          {resumeData.extracurriculars &&
            resumeData.extracurriculars.length > 0 && (
              <View style={template3Styles.section}>
                <Text
                  style={[
                    template3Styles.sectionTitle,
                    { borderBottomColor: primaryColor },
                  ]}
                >
                  EXTRACURRICULAR ACTIVITIES
                </Text>
                {resumeData.extracurriculars.map((activity, idx) => (
                  <Text key={idx} style={template3Styles.bulletPoint}>
                    • {activity}
                  </Text>
                ))}
              </View>
            )}

          {/* Projects */}
          {/* {resumeData.projects && resumeData.projects.length > 0 && (
            <View style={template3Styles.section}>
              <Text
                style={[
                  template3Styles.sectionTitle,
                  { borderBottomColor: primaryColor },
                ]}
              >
                PROJECTS
              </Text>
              {resumeData.projects.map((project, idx) => (
                <View key={idx} style={template3Styles.experienceItem}>
                  <Text style={template3Styles.jobTitle}>
                    {typeof project === "string"
                      ? project
                      : (project)?.name || String(project)}
                  </Text>
                  {typeof project === "object" && project !== null && (
                    <>
                      {(project)?.description && (
                        <Text style={template3Styles.description}>
                          {(project).description}
                        </Text>
                      )}
                      {(project)?.technologies && (
                        <Text style={template3Styles.description}>
                          Technologies: {(project).technologies}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              ))}
            </View>
          )} */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <View style={template3Styles.section}>
              <Text
                style={[
                  template3Styles.sectionTitle,
                  { borderBottomColor: primaryColor },
                ]}
              >
                PROJECTS
              </Text>

              {resumeData.projects.map((project: Project, idx: number) => (
                <View key={idx} style={template3Styles.experienceItem}>
                  <Text style={template3Styles.jobTitle}>
                    {typeof project === "string"
                      ? project
                      : project?.name || String(project)}
                  </Text>

                  {typeof project === "object" && project !== null && (
                    <>
                      {project.description && (
                        <Text style={template3Styles.description}>
                          {project.description}
                        </Text>
                      )}

                      {project.technologies && (
                        <Text style={template3Styles.description}>
                          Technologies: {project.technologies}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={template3Styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>AI Template 3 - Purple Sidebar Design</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default AITemplate3PDF;
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Link,
//   Font,
// } from "@react-pdf/renderer";
// import { ResumeState } from "../../../../../../lib/store";

// // Register fonts with distinct URLs (using Roboto for licensing safety)
// Font.register({
//   family: "Roboto",
//   fonts: [
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxM.woff2",
//       fontWeight: "normal",
//     },
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v30/KFOlC13HMDn.woff2",
//       fontWeight: "bold",
//     },
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu51xIIzI.woff2",
//       fontWeight: "normal",
//       fontStyle: "italic",
//     },
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51S7ACc6CsE.woff2",
//       fontWeight: "bold",
//       fontStyle: "italic",
//     },
//   ],
// });

// // Helper functions
// const resizeImage = (imageUrl: string) => {
//   return imageUrl; // Placeholder: Implement resizing if needed
// };

// const resizeData = (text: string, maxLength: number, fieldType?: string) => {
//   if (!text) return text;
//   const limits: { [key: string]: number } = {
//     email: 30,
//     name: 25,
//     summary: 500,
//     skill: 20,
//     language: 20,
//     education: 50,
//     position: 50,
//     project: 50,
//     default: maxLength,
//   };
//   const limit = limits[fieldType || "default"] || maxLength;
//   return text.length > limit ? text.substring(0, limit - 3) + "..." : text;
// };

// // Template 3 Styles (Purple Sidebar Design)
// const template3Styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#ffffff",
//     fontFamily: "Roboto",
//     fontSize: 10,
//     color: "#333333",
//   },
//   sidebar: {
//     width: "35%",
//     backgroundColor: "#7c3aed",
//     padding: 20,
//     color: "#ffffff",
//   },
//   profileSection: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   profilePhoto: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//     border: "3px solid #ffffff",
//   },
//   profilePlaceholder: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#6d28d9",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//     border: "3px solid #ffffff",
//   },
//   profileInitials: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#ffffff",
//   },
//   mainName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#ffffff",
//     marginBottom: 5,
//     textAlign: "center",
//   },
//   mainTitle: {
//     fontSize: 10,
//     color: "#c4b5fd",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   sidebarSection: {
//     marginBottom: 18,
//   },
//   sidebarSectionTitle: {
//     fontSize: 11,
//     fontWeight: "bold",
//     color: "#ffffff",
//     marginBottom: 8,
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   contactItem: {
//     fontSize: 8,
//     color: "#ffffff",
//     marginBottom: 4,
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   skillItem: {
//     fontSize: 8,
//     color: "#ffffff",
//     marginBottom: 3,
//   },
//   mainContent: {
//     width: "65%",
//     padding: 20,
//     backgroundColor: "#ffffff",
//   },
//   section: {
//     marginBottom: 18,
//   },
//   sectionTitle: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#374151",
//     marginBottom: 8,
//     textTransform: "uppercase",
//     letterSpacing: 1,
//     borderBottomWidth: 2,
//     borderBottomColor: "#7c3aed",
//     paddingBottom: 3,
//   },
//   experienceItem: {
//     marginBottom: 12,
//     paddingBottom: 8,
//   },
//   jobTitle: {
//     fontSize: 10,
//     fontWeight: "bold",
//     color: "#1f2937",
//     marginBottom: 2,
//   },
//   company: {
//     fontSize: 9,
//     color: "#7c3aed",
//     fontWeight: "bold",
//     marginBottom: 2,
//   },
//   dateRange: {
//     fontSize: 8,
//     color: "#6b7280",
//     marginBottom: 4,
//   },
//   description: {
//     fontSize: 8,
//     color: "#4b5563",
//     lineHeight: 1.4,
//     marginBottom: 2,
//   },
//   educationBox: {
//     backgroundColor: "#f8fafc",
//     padding: 10,
//     marginBottom: 8,
//     borderLeftWidth: 3,
//     borderLeftColor: "#7c3aed",
//   },
//   degree: {
//     fontSize: 10,
//     fontWeight: "bold",
//     color: "#1f2937",
//     marginBottom: 2,
//   },
//   institution: {
//     fontSize: 9,
//     color: "#7c3aed",
//     fontWeight: "bold",
//     marginBottom: 2,
//   },
//   bulletPoint: {
//     fontSize: 8,
//     color: "#4b5563",
//     marginBottom: 2,
//     marginLeft: 10,
//   },
//   text: {
//     fontSize: 9,
//     lineHeight: 1.5,
//     textAlign: "justify",
//     marginBottom: 8,
//     color: "#4b5563",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 15,
//     left: 20,
//     right: 20,
//     textAlign: "center",
//     fontSize: 7,
//     color: "#7c3aed",
//   },
// });

// interface AITemplate3PDFProps {
//   resumeData: ResumeState["resumeData"];
// }

// const AITemplate3PDF = ({ resumeData }: AITemplate3PDFProps) => {
//   const imageUrl = resumeData.profileImage || resumeData.image;
//   const isValidImage = imageUrl && (imageUrl.startsWith("data:image/") || imageUrl.match(/\.(jpeg|jpg|png)$/i));
//   const primaryColor = resumeData.headerColor && /^#[0-9A-F]{6}$/i.test(resumeData.headerColor)
//     ? resumeData.headerColor
//     : "#7c3aed";
//   const secondaryColor = resumeData.headerColor && /^#[0-9A-F]{6}$/i.test(resumeData.headerColor)
//     ? resumeData.headerColor + "99"
//     : "#6d28d9";

//   return (
//     <Document>
//       <Page size="A4" style={template3Styles.page}>
//         {/* Left Sidebar */}
//         <View style={[template3Styles.sidebar, { backgroundColor: primaryColor }]}>
//           <View style={template3Styles.profileSection}>
//             {isValidImage ? (
//               <>
//                 <Image src={resizeImage(imageUrl)} style={template3Styles.profilePhoto} />
//                 <Text style={[template3Styles.skillItem, { textAlign: "center" }]}>
//                   Profile Photo
//                 </Text>
//               </>
//             ) : (
//               <View style={[template3Styles.profilePlaceholder, { backgroundColor: secondaryColor }]}>
//                 <Text style={template3Styles.profileInitials}>
//                   {resumeData.name
//                     ? resizeData(resumeData.name, 2, "name").split(" ").map((n) => n[0]).join("").slice(0, 2)
//                     : "HG"}
//                 </Text>
//               </View>
//             )}
//             <Text style={template3Styles.mainName}>
//               {resizeData(resumeData.name || "Hadiqa Gohar", 25, "name")}
//             </Text>
//             <Text style={template3Styles.mainTitle}>
//               {resizeData(resumeData.tag || "Agentic AI Developer | NextJS and Python Developer", 50, "tag")}
//             </Text>
//           </View>

//           {(resumeData.email || resumeData.number || resumeData.location || resumeData.websites) && (
//             <View style={template3Styles.sidebarSection}>
//               <Text style={template3Styles.sidebarSectionTitle}>CONTACT</Text>
//               {resumeData.email && (
//                 <View style={template3Styles.contactItem}>
//                   <Text style={template3Styles.skillItem}>
//                     ✉ {resizeData(resumeData.email, 30, "email")}
//                   </Text>
//                 </View>
//               )}
//               {resumeData.number && (
//                 <View style={template3Styles.contactItem}>
//                   <Text style={template3Styles.skillItem}>
//                     ☎ {resizeData(resumeData.number, 20, "number")}
//                   </Text>
//                 </View>
//               )}
//               {resumeData.location && (
//                 <View style={template3Styles.contactItem}>
//                   <Text style={template3Styles.skillItem}>
//                     ⌂ {resizeData(resumeData.location, 20, "location")}
//                   </Text>
//                 </View>
//               )}
//               {resumeData.websites && resumeData.websites.length > 0 && (
//                 <View style={template3Styles.contactItem}>
//                   <Text style={template3Styles.skillItem}>
//                     ⚡ {resizeData(resumeData.websites[0], 30, "website")}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           )}

//           {resumeData.skills && resumeData.skills.length > 0 && (
//             <View style={template3Styles.sidebarSection}>
//               <Text style={template3Styles.sidebarSectionTitle}>SKILLS</Text>
//               {resumeData.skills.map((skill, idx) => (
//                 <Text key={idx} style={template3Styles.skillItem}>
//                   • {resizeData(skill, 20, "skill")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.languages && resumeData.languages.length > 0 && (
//             <View style={template3Styles.sidebarSection}>
//               <Text style={template3Styles.sidebarSectionTitle}>LANGUAGES</Text>
//               {resumeData.languages.map((lang, idx) => (
//                 <Text key={idx} style={template3Styles.skillItem}>
//                   • {resizeData(lang, 20, "language")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.courses && resumeData.courses.length > 0 && (
//             <View style={template3Styles.sidebarSection}>
//               <Text style={template3Styles.sidebarSectionTitle}>COURSES</Text>
//               {resumeData.courses.map((course, idx) => (
//                 <Text key={idx} style={template3Styles.skillItem}>
//                   • {resizeData(course, 50, "course")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.hobbies && resumeData.hobbies.length > 0 && (
//             <View style={template3Styles.sidebarSection}>
//               <Text style={template3Styles.sidebarSectionTitle}>HOBBIES</Text>
//               {resumeData.hobbies.map((hobby, idx) => (
//                 <Text key={idx} style={template3Styles.skillItem}>
//                   • {resizeData(hobby, 50, "hobby")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.references && resumeData.references.length > 0 && (
//             <View style={template3Styles.sidebarSection}>
//               <Text style={template3Styles.sidebarSectionTitle}>REFERENCES</Text>
//               {resumeData.references.map((reference, idx) => (
//                 <Text key={idx} style={template3Styles.skillItem}>
//                   • {resizeData(reference, 50, "reference")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.internships && resumeData.internships.length > 0 && (
//             <View style={template3Styles.sidebarSection}>
//               <Text style={template3Styles.sidebarSectionTitle}>INTERNSHIPS</Text>
//               {resumeData.internships.map((internship, idx) => (
//                 <Text key={idx} style={template3Styles.skillItem}>
//                   • {resizeData(internship, 50, "internship")}
//                 </Text>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Right Content */}
//         <View style={template3Styles.mainContent}>
//           {resumeData.summary && (
//             <View style={template3Styles.section}>
//               <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>
//                 PROFESSIONAL SUMMARY
//               </Text>
//               <Text style={template3Styles.text}>
//                 {resizeData(
//                   resumeData.summary ||
//                     "Highly motivated and skilled Computer Science graduate with expertise in developing modern web applications using NextJS and Python. Proficient in leveraging NextJS framework to build performant, scalable, and user-friendly interfaces. Eager to apply technical skills and contribute to innovative projects in a challenging and rewarding environment. Seeking opportunities to deliver impactful solutions and further enhance expertise in web development.",
//                   500,
//                   "summary"
//                 )}
//               </Text>
//             </View>
//           )}

//           {resumeData.experience && resumeData.experience.length > 0 && (
//             <View style={template3Styles.section}>
//               <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>
//                 PROFESSIONAL EXPERIENCE
//               </Text>
//               {resumeData.experience.map((exp, idx) => (
//                 <View key={idx} style={template3Styles.experienceItem}>
//                   <Text style={template3Styles.jobTitle}>
//                     {resizeData(exp, 50, "position")}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           {resumeData.education && resumeData.education.length > 0 && (
//             <View style={template3Styles.section}>
//               <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>
//                 EDUCATION
//               </Text>
//               {resumeData.education.map((edu, idx) => (
//                 <View key={idx} style={[template3Styles.educationBox, { borderLeftColor: primaryColor }]}>
//                   <Text style={template3Styles.degree}>
//                     {resizeData(edu, 50, "education")}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           {resumeData.awards && resumeData.awards.length > 0 && (
//             <View style={template3Styles.section}>
//               <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>
//                 ACHIEVEMENTS
//               </Text>
//               {resumeData.awards.map((award, idx) => (
//                 <Text key={idx} style={template3Styles.bulletPoint}>
//                   • {resizeData(award, 50, "award")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.extracurriculars && resumeData.extracurriculars.length > 0 && (
//             <View style={template3Styles.section}>
//               <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>
//                 EXTRACURRICULAR ACTIVITIES
//               </Text>
//               {resumeData.extracurriculars.map((activity, idx) => (
//                 <Text key={idx} style={template3Styles.bulletPoint}>
//                   • {resizeData(activity, 50, "activity")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {/* {resumeData.projects && resumeData.projects.length > 0 && (
//             <View style={template3Styles.section}>
//               <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>
//                 PROJECTS
//               </Text>
//               {resumeData.projects.map((project, idx) => (
//                 <View key={idx} style={template3Styles.experienceItem}>
//                   <Text style={template3Styles.jobTitle}>
//                     {resizeData(project, 50, "project")}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           )} */}
//         </View>

//         <View style={[template3Styles.footer, { color: primaryColor }]}>
//           <Link src={resumeData.github || "https://github.com/HadiqaGohar/"}>
//             <Text>AI Template 3 - Purple Sidebar Design by {resumeData.name || "Hadiqa Gohar"}</Text>
//           </Link>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default AITemplate3PDF;
