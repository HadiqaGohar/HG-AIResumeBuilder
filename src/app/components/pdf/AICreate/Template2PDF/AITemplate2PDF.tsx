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

// Example type for your resume data
type Skill = string | { name: string };
type Language = string | { name: string };

type Education =
  | string
  | {
      degree?: string;
      institution?: string;
      startDate?: string;
      endDate?: string;
      location?: string;
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

// interface ResumeData {
//   experience?: Experience[];
//   education?: (
//     | string
//     | {
//         degree?: string;
//         institution?: string;
//         startDate?: string;
//         endDate?: string;
//         location?: string;
//       }
//   )[];
//   skills?: (string | { name: string })[];
//   languages?: (string | { name: string })[];

//   // other fields...
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

// Template 2 Styles (Modern Professional Layout - Distinctive Design)
const template2Styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    backgroundColor: "#ffffff",
  },
  // Left sidebar with colored background
  sidebar: {
    width: "35%",
    backgroundColor: "#a3e4db", // Default teal color, will be overridden by user's choice
    padding: 25,
    minHeight: "100vh",
  },
  // Right main content area
  mainContent: {
    width: "65%",
    padding: 25,
    backgroundColor: "#ffffff",
  },
  // Large circular profile photo
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 25,
    alignSelf: "center",
    border: "4px solid #ffffff",
  },
  // Sidebar sections
  sidebarSection: {
    marginBottom: 25,
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 12,
    backgroundColor: "#2c2c2c", // Dark background for titles
    padding: 8,
    textAlign: "center",
  },
  sidebarText: {
    fontSize: 9,
    color: "#333",
    marginBottom: 4,
    lineHeight: 1.5,
    paddingLeft: 5,
  },
  // Main content header
  mainHeader: {
    marginBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: "#a3e4db",
    paddingBottom: 15,
  },
  mainName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: 3,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "normal",
    fontStyle: "italic",
  },
  // Main content sections
  mainSection: {
    marginBottom: 22,
  },
  mainSectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#a3e4db",
    paddingLeft: 10,
  },
  mainText: {
    fontSize: 10,
    color: "#333",
    lineHeight: 1.6,
    textAlign: "justify",
    marginBottom: 6,
  },
  // Experience and education items
  experienceItem: {
    marginBottom: 18,
    paddingLeft: 15,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  experienceSubtitle: {
    fontSize: 10,
    color: "#666",
    fontWeight: "bold",
    marginBottom: 3,
  },
  experienceDate: {
    fontSize: 9,
    color: "#666",
    marginBottom: 6,
    fontStyle: "italic",
  },
  bulletPoint: {
    fontSize: 9,
    color: "#333",
    marginBottom: 3,
    marginLeft: 12,
  },
  // Footer
  footer: {
    position: "absolute" as const,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center" as const,
    fontSize: 8,
    color: "#4b5563",
    fontStyle: "italic" as const,
  },
});

interface AITemplate2PDFProps {
  resumeData: ResumeState["resumeData"];
}

const AITemplate2PDF = ({ resumeData }: AITemplate2PDFProps) => {
  const imageUrl = resumeData.profileImage || resumeData.image;
  const isValidImage = imageUrl && imageUrl.startsWith("data:image/");

  // Use user's selected header color or default teal
  const sidebarColor = resumeData.headerColor || "#a3e4db";

  return (
    <Document>
      <Page size="A4" style={template2Styles.page}>
        {/* Left Sidebar - Pink Theme */}
        <View
          style={[template2Styles.sidebar, { backgroundColor: sidebarColor }]}
        >
          {/* Profile Photo */}
          {isValidImage && (
            <Image
              src={resizeImage(imageUrl)}
              style={template2Styles.profilePhoto}
              // alt="Profile Image"
            />
          )}

          {/* Contact Section */}
          {(resumeData.number || resumeData.email || resumeData.location) && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>CONTACT</Text>
              {resumeData.number && (
                <Text style={template2Styles.sidebarText}>
                  📞 {resumeData.number}
                </Text>
              )}
              {resumeData.email && (
                <Text style={template2Styles.sidebarText}>
                  ✉️ {resumeData.email}
                </Text>
              )}
              {resumeData.location && (
                <Text style={template2Styles.sidebarText}>
                  📍 {resumeData.location}
                </Text>
              )}
            </View>
          )}

          {/* Key Skills */}
          {/* {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>KEY SKILLS</Text>
              {resumeData.skills.map((skill, idx) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  ▪{" "}
                  {typeof skill === "string"
                    ? skill
                    : (skill)?.name || String(skill)}
                </Text>
              ))}
            </View>
          )} */}
          {/* Key Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>KEY SKILLS</Text>
              {resumeData.skills.map((skill: Skill, idx: number) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  ▪ {typeof skill === "string" ? skill : skill.name}
                </Text>
              ))}
            </View>
          )}

          {/* Technical Skills */}
          {resumeData.courses && resumeData.courses.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>TECHNICAL SKILLS</Text>
              {resumeData.courses.map((course, idx) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  ▪ {course}
                </Text>
              ))}
            </View>
          )}

          {/* Languages */}
          {/* {resumeData.languages && resumeData.languages.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>LANGUAGES</Text>
              {resumeData.languages.map((lang, idx) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  ▪{" "}
                  {typeof lang === "string" ? lang : lang?.name || String(lang)}
                </Text>
              ))}
            </View>
          )} */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>LANGUAGES</Text>
              {resumeData.languages.map((lang: Language, idx: number) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  ▪ {typeof lang === "string" ? lang : lang.name}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Right Main Content */}
        <View style={template2Styles.mainContent}>
          {/* Header */}
          <View
            style={[
              template2Styles.mainHeader,
              { borderBottomColor: sidebarColor },
            ]}
          >
            <Text style={template2Styles.mainName}>
              {resumeData.name || "YOUR NAME"}
            </Text>
            <Text style={template2Styles.mainTitle}>
              {resumeData.tag || "Professional Title"}
            </Text>
          </View>

          {/* Profile Summary */}
          {resumeData.summary && (
            <View style={template2Styles.mainSection}>
              <Text
                style={[
                  template2Styles.mainSectionTitle,
                  { borderLeftColor: sidebarColor },
                ]}
              >
                PROFILE SUMMARY
              </Text>
              <Text style={template2Styles.mainText}>{resumeData.summary}</Text>
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text
                style={[
                  template2Styles.mainSectionTitle,
                  { borderLeftColor: sidebarColor },
                ]}
              >
                EDUCATION
              </Text>
              {/* {resumeData.education.map((edu, idx) => (
                <View key={idx} style={template2Styles.experienceItem}>
                  <Text style={template2Styles.experienceTitle}>
                    {typeof edu === "string" ? edu : edu?.degree || String(edu)}
                  </Text>
                  {typeof edu === "object" && edu !== null && (
                    <>
                      {edu?.institution && (
                        <Text style={template2Styles.experienceSubtitle}>
                          {edu.institution}
                        </Text>
                      )}
                      {edu?.startDate && edu?.endDate && (
                        <Text style={template2Styles.experienceDate}>
                          {edu.startDate} - {edu.endDate}
                        </Text>
                      )}
                      {edu?.location && (
                        <Text style={template2Styles.experienceDate}>
                          {edu.location}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              ))} */}
              {resumeData.education && resumeData.education.length > 0 && (
                <>
                  {resumeData.education.map((edu: Education, idx: number) => (
                    <View key={idx} style={template2Styles.experienceItem}>
                      <Text style={template2Styles.experienceTitle}>
                        {typeof edu === "string"
                          ? edu
                          : edu?.degree || String(edu)}
                      </Text>

                      {typeof edu === "object" && edu !== null && (
                        <>
                          {edu.institution && (
                            <Text style={template2Styles.experienceSubtitle}>
                              {edu.institution}
                            </Text>
                          )}
                          {edu.startDate && edu.endDate && (
                            <Text style={template2Styles.experienceDate}>
                              {edu.startDate} - {edu.endDate}
                            </Text>
                          )}
                          {edu.location && (
                            <Text style={template2Styles.experienceDate}>
                              {edu.location}
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

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text
                style={[
                  template2Styles.mainSectionTitle,
                  { borderLeftColor: sidebarColor },
                ]}
              >
                PROFESSIONAL EXPERIENCE
              </Text>
              {/* {resumeData.experience.map((exp, idx) => (
                <View key={idx} style={template2Styles.experienceItem}>
                  <Text style={template2Styles.experienceTitle}>
                    {typeof exp === "string"
                      ? exp
                      : exp?.position || String(exp)}
                  </Text>
                  {typeof exp === "object" && exp !== null && (
                    <>
                      {exp?.company && (
                        <Text style={template2Styles.experienceSubtitle}>
                          {exp.company}
                        </Text>
                      )}
                      {exp?.startDate && exp?.endDate && (
                        <Text style={template2Styles.experienceDate}>
                          {exp.startDate} - {exp.endDate}
                        </Text>
                      )}
                      {exp?.location && (
                        <Text style={template2Styles.experienceDate}>
                          {exp.location}
                        </Text>
                      )}
                      {exp?.description && (
                        <Text style={template2Styles.mainText}>
                          {exp.description}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              ))} */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <>
                  {resumeData.experience.map((exp: Experience, idx: number) => (
                    <View key={idx} style={template2Styles.experienceItem}>
                      <Text style={template2Styles.experienceTitle}>
                        {typeof exp === "string"
                          ? exp
                          : exp?.position || String(exp)}
                      </Text>

                      {typeof exp === "object" && exp !== null && (
                        <>
                          {exp.company && (
                            <Text style={template2Styles.experienceSubtitle}>
                              {exp.company}
                            </Text>
                          )}
                          {exp.startDate && exp.endDate && (
                            <Text style={template2Styles.experienceDate}>
                              {exp.startDate} - {exp.endDate}
                            </Text>
                          )}
                          {exp.location && (
                            <Text style={template2Styles.experienceDate}>
                              {exp.location}
                            </Text>
                          )}
                          {exp.description && (
                            <Text style={template2Styles.mainText}>
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

          {/* References */}
          {resumeData.references && resumeData.references.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text
                style={[
                  template2Styles.mainSectionTitle,
                  { borderLeftColor: sidebarColor },
                ]}
              >
                REFERENCES
              </Text>
              {resumeData.references.map((reference, idx) => (
                <Text key={idx} style={template2Styles.bulletPoint}>
                  ▪ {reference}
                </Text>
              ))}
            </View>
          )}

          {/* Hobbies */}
          {resumeData.hobbies && resumeData.hobbies.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text
                style={[
                  template2Styles.mainSectionTitle,
                  { borderLeftColor: sidebarColor },
                ]}
              >
                HOBBIES
              </Text>
              {resumeData.hobbies.map((hobby, idx) => (
                <Text key={idx} style={template2Styles.bulletPoint}>
                  ▪ {hobby}
                </Text>
              ))}
            </View>
          )}

          {/* Extracurricular Activities */}
          {resumeData.extracurriculars &&
            resumeData.extracurriculars.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text
                  style={[
                    template2Styles.mainSectionTitle,
                    { borderLeftColor: sidebarColor },
                  ]}
                >
                  EXTRACURRICULAR ACTIVITIES
                </Text>
                {resumeData.extracurriculars.map((activity, idx) => (
                  <Text key={idx} style={template2Styles.bulletPoint}>
                    ▪ {activity}
                  </Text>
                ))}
              </View>
            )}

          {/* Internships */}
          {resumeData.internships && resumeData.internships.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text
                style={[
                  template2Styles.mainSectionTitle,
                  { borderLeftColor: sidebarColor },
                ]}
              >
                INTERNSHIPS
              </Text>
              {resumeData.internships.map((internship, idx) => (
                <Text key={idx} style={template2Styles.bulletPoint}>
                  ▪ {internship}
                </Text>
              ))}
            </View>
          )}

          {/* Additional Courses */}
          {resumeData.courses && resumeData.courses.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text
                style={[
                  template2Styles.mainSectionTitle,
                  { borderLeftColor: sidebarColor },
                ]}
              >
                ADDITIONAL COURSES
              </Text>
              {resumeData.courses.map((course, idx) => (
                <Text key={idx} style={template2Styles.bulletPoint}>
                  ▪ {course}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={template2Styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>Template 2 - Modern Professional Design</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default AITemplate2PDF;
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
//     company: 50,
//     description: 200,
//     default: maxLength,
//   };
//   const limit = limits[fieldType || "default"] || maxLength;
//   return text.length > limit ? text.substring(0, limit - 3) + "..." : text;
// };

// // Template 2 Styles (Modern Professional Layout)
// const template2Styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     fontFamily: "Roboto",
//     fontSize: 10,
//     color: "#333",
//     backgroundColor: "#ffffff",
//   },
//   sidebar: {
//     width: "35%",
//     backgroundColor: "#a3e4db",
//     padding: 25,
//     minHeight: "100%",
//   },
//   mainContent: {
//     width: "65%",
//     padding: 25,
//     backgroundColor: "#ffffff",
//   },
//   profilePhoto: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 25,
//     alignSelf: "center",
//     border: "4px solid #ffffff",
//   },
//   sidebarSection: {
//     marginBottom: 25,
//   },
//   sidebarTitle: {
//     fontSize: 11,
//     fontWeight: "bold",
//     color: "#ffffff",
//     textTransform: "uppercase",
//     letterSpacing: 1.5,
//     marginBottom: 12,
//     backgroundColor: "#2c2c2c",
//     padding: 8,
//     textAlign: "center",
//   },
//   sidebarText: {
//     fontSize: 9,
//     color: "#333",
//     marginBottom: 4,
//     lineHeight: 1.5,
//     paddingLeft: 5,
//   },
//   mainHeader: {
//     marginBottom: 25,
//     borderBottomWidth: 3,
//     borderBottomColor: "#a3e4db",
//     paddingBottom: 15,
//   },
//   mainName: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#333",
//     textTransform: "uppercase",
//     letterSpacing: 3,
//     marginBottom: 8,
//   },
//   mainTitle: {
//     fontSize: 16,
//     color: "#666",
//     fontWeight: "normal",
//     fontStyle: "italic",
//   },
//   mainSection: {
//     marginBottom: 22,
//   },
//   mainSectionTitle: {
//     fontSize: 13,
//     fontWeight: "bold",
//     color: "#333",
//     textTransform: "uppercase",
//     letterSpacing: 1.2,
//     marginBottom: 12,
//     borderLeftWidth: 4,
//     borderLeftColor: "#a3e4db",
//     paddingLeft: 10,
//   },
//   mainText: {
//     fontSize: 10,
//     color: "#333",
//     lineHeight: 1.6,
//     textAlign: "justify",
//     marginBottom: 6,
//   },
//   experienceItem: {
//     marginBottom: 18,
//     paddingLeft: 15,
//   },
//   experienceTitle: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 4,
//   },
//   experienceSubtitle: {
//     fontSize: 10,
//     color: "#666",
//     fontWeight: "bold",
//     marginBottom: 3,
//   },
//   experienceDate: {
//     fontSize: 9,
//     color: "#666",
//     marginBottom: 6,
//     fontStyle: "italic",
//   },
//   bulletPoint: {
//     fontSize: 9,
//     color: "#333",
//     marginBottom: 3,
//     marginLeft: 12,
//   },
//   footer: {
//     position: "absolute",
//     bottom: 10,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     fontSize: 8,
//     color: "#4b5563",
//     fontStyle: "italic",
//   },
// });

// interface AITemplate2PDFProps {
//   resumeData: ResumeState["resumeData"];
// }

// const AITemplate2PDF = ({ resumeData }: AITemplate2PDFProps) => {
//   const imageUrl = resumeData.profileImage || resumeData.image;
//   const isValidImage = imageUrl && (imageUrl.startsWith("data:image/") || imageUrl.match(/\.(jpeg|jpg|png)$/i));
//   const sidebarColor = resumeData.headerColor && /^#[0-9A-F]{6}$/i.test(resumeData.headerColor)
//     ? resumeData.headerColor
//     : "#a3e4db";

//   return (
//     <Document>
//       <Page size="A4" style={template2Styles.page}>
//         {/* Left Sidebar */}
//         <View style={[template2Styles.sidebar, { backgroundColor: sidebarColor }]}>
//           {isValidImage && (
//             <>
//               <Image src={resizeImage(imageUrl)} style={template2Styles.profilePhoto} />
//               <Text style={[template2Styles.sidebarText, { textAlign: "center", fontSize: 8 }]}>
//                 Profile Photo
//               </Text>
//             </>
//           )}

//           {(resumeData.number || resumeData.email || resumeData.location) && (
//             <View style={template2Styles.sidebarSection}>
//               <Text style={template2Styles.sidebarTitle}>CONTACT</Text>
//               {resumeData.number && (
//                 <Text style={template2Styles.sidebarText}>
//                   📞 {resizeData(resumeData.number, 20, "number")}
//                 </Text>
//               )}
//               {resumeData.email && (
//                 <Text style={template2Styles.sidebarText}>
//                   ✉️ {resizeData(resumeData.email, 30, "email")}
//                 </Text>
//               )}
//               {resumeData.location && (
//                 <Text style={template2Styles.sidebarText}>
//                   📍 {resizeData(resumeData.location, 20, "location")}
//                 </Text>
//               )}
//             </View>
//           )}

//           {resumeData.skills && resumeData.skills.length > 0 && (
//             <View style={template2Styles.sidebarSection}>
//               <Text style={template2Styles.sidebarTitle}>KEY SKILLS</Text>
//               {resumeData.skills.map((skill, idx) => (
//                 <Text key={idx} style={template2Styles.sidebarText}>
//                   ▪ {resizeData(skill, 20, "skill")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.languages && resumeData.languages.length > 0 && (
//             <View style={template2Styles.sidebarSection}>
//               <Text style={template2Styles.sidebarTitle}>LANGUAGES</Text>
//               {resumeData.languages.map((lang, idx) => (
//                 <Text key={idx} style={template2Styles.sidebarText}>
//                   ▪ {resizeData(lang, 20, "language")}
//                 </Text>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Right Main Content */}
//         <View style={template2Styles.mainContent}>
//           <View style={[template2Styles.mainHeader, { borderBottomColor: sidebarColor }]}>
//             <Text style={template2Styles.mainName}>
//               {resizeData(resumeData.name || "YOUR NAME", 25, "name")}
//             </Text>
//             <Text style={template2Styles.mainTitle}>
//               {resumeData.tag || "Professional Title"}
//             </Text>
//           </View>

//           {resumeData.summary && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 PROFILE SUMMARY
//               </Text>
//               <Text style={template2Styles.mainText}>
//                 {resizeData(resumeData.summary, 500, "summary")}
//               </Text>
//             </View>
//           )}

//           {resumeData.education && resumeData.education.length > 0 && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 EDUCATION
//               </Text>
//               {resumeData.education.map((edu, idx) => (
//                 <View key={idx} style={template2Styles.experienceItem}>
//                   <Text style={template2Styles.experienceTitle}>
//                     {resizeData(edu, 50, "education")}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           {resumeData.experience && resumeData.experience.length > 0 && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 PROFESSIONAL EXPERIENCE
//               </Text>
//               {resumeData.experience.map((exp, idx) => (
//                 <View key={idx} style={template2Styles.experienceItem}>
//                   <Text style={template2Styles.experienceTitle}>
//                     {resizeData(exp, 50, "position")}
//                   </Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           {resumeData.references && resumeData.references.length > 0 && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 REFERENCES
//               </Text>
//               {resumeData.references.map((reference, idx) => (
//                 <Text key={idx} style={template2Styles.bulletPoint}>
//                   ▪ {resizeData(reference, 50, "reference")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.hobbies && resumeData.hobbies.length > 0 && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 HOBBIES
//               </Text>
//               {resumeData.hobbies.map((hobby, idx) => (
//                 <Text key={idx} style={template2Styles.bulletPoint}>
//                   ▪ {resizeData(hobby, 50, "hobby")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.extracurriculars && resumeData.extracurriculars.length > 0 && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 EXTRACURRICULAR ACTIVITIES
//               </Text>
//               {resumeData.extracurriculars.map((activity, idx) => (
//                 <Text key={idx} style={template2Styles.bulletPoint}>
//                   ▪ {resizeData(activity, 50, "activity")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.internships && resumeData.internships.length > 0 && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 INTERNSHIPS
//               </Text>
//               {resumeData.internships.map((internship, idx) => (
//                 <Text key={idx} style={template2Styles.bulletPoint}>
//                   ▪ {resizeData(internship, 50, "internship")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.courses && resumeData.courses.length > 0 && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 ADDITIONAL COURSES
//               </Text>
//               {resumeData.courses.map((course, idx) => (
//                 <Text key={idx} style={template2Styles.bulletPoint}>
//                   ▪ {resizeData(course, 50, "course")}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {resumeData.awards && resumeData.awards.length > 0 && (
//             <View style={template2Styles.mainSection}>
//               <Text style={[template2Styles.mainSectionTitle, { borderLeftColor: sidebarColor }]}>
//                 AWARDS
//               </Text>
//               {resumeData.awards.map((award, idx) => (
//                 <Text key={idx} style={template2Styles.bulletPoint}>
//                   ▪ {resizeData(award, 50, "award")}
//                 </Text>
//               ))}
//             </View>
//           )}
//         </View>

//         <View style={template2Styles.footer}>
//           <Link src={resumeData.github || "https://github.com/HadiqaGohar/"}>
//             <Text>Template 2 - Modern Professional Design by {resumeData.name || "Hadiqa Gohar"}</Text>
//           </Link>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default AITemplate2PDF;
