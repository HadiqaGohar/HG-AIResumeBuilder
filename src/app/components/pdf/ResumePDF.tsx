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
import { ResumeState } from "../../../../lib/store";


//  Example type for your resume data
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

// }


// Register fonts to support italic and bold-italic (using Helvetica for consistency with preview)
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2",
      fontWeight: "normal",
    }, // Replace with local file if needed
    {
      src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2",
      fontWeight: "bold",
    }, // Replace with local file if needed
    {
      src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2",
      fontWeight: "normal",
      fontStyle: "italic",
    }, // Replace
    {
      src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2",
      fontWeight: "bold",
      fontStyle: "italic",
    }, // Replace
  ],
});

// Helper functions
const resizeImage = (imageUrl: string, 
  // size: number

) => {
  return imageUrl; // Placeholder: implement resizing if needed
};

const resizeData = (text: string, maxLength: number) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
};

const getFontStyles = (style: string | undefined) => {
  switch (style) {
    case "bold":
      return { fontWeight: "bold" as const };
    case "italic":
      return { fontStyle: "italic" as const };
    case "bold-italic":
      return { fontWeight: "bold" as const, fontStyle: "italic" as const };
    default:
      return { fontWeight: "normal" as const, fontStyle: "normal" as const };
  }
};

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    backgroundColor: "#ffffff",
  },
  header: {
    width: "70%",
    height: 115,
    padding: 15,
    backgroundColor: "#a3e4db",
    justifyContent: "center",
    position: "absolute" as const,
    top: 0,
    left: "30%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: "#000",
    textTransform: "uppercase" as const,
  },
  aside: {
    width: "30%",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    padding: 15,
    position: "absolute" as const,
    top: 0,
    left: 0,
    height: "100%",
  },
  main: {
    width: "70%",
    padding: 15,
    marginLeft: "30%",
    marginTop: 120,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold" as const,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 3,
    marginBottom: 8,
  },
  text: {
    marginBottom: 3,
  },
  listItem: {
    marginLeft: 15,
    marginBottom: 2,
  },
  link: {
    color: "#93c5fd",
    textDecoration: "underline" as const,
    fontSize: 10,
  },
  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 55,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#6b7280",
    marginVertical: 8,
  },
  skillTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#a3e4db",
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    color: "#000",
    fontSize: 10,
    marginTop: 2,
    marginBottom: 2,
    fontWeight: "bold" as const,
  },
  footer: {
    position: "absolute" as const,
    bottom: 5,
    left: 0,
    right: 0,
    textAlign: "center" as const,
    fontSize: 8,
    color: "#4b5563",
    fontStyle: "italic" as const,
  },
  tag: {
    color: '#000000',
    marginTop: 8
  }
});

// Template 2 Styles (Professional CV Layout - Teal)
const template2Styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    backgroundColor: "#ffffff",
  },
  sidebar: {
    width: "33%",
    backgroundColor: "#a3e4db",
    padding: 20,
    minHeight: "100vh",
  },
  mainContent: {
    width: "65%",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: 'center',
    border: '3px solid #ffffff',
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 3,
  },
  sidebarText: {
    fontSize: 9,
    color: "#333",
    marginBottom: 3,
    lineHeight: 1.4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  mainHeader: {
    marginBottom: 20,
  },
  mainName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 5,
  },
  mainTitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "normal",
  },
  mainSection: {
    marginBottom: 20,
  },
  mainSectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 3,
  },
  mainText: {
    fontSize: 10,
    color: "#333",
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  experienceSubtitle: {
    fontSize: 10,
    color: "#666",
    fontWeight: "bold",
    marginBottom: 2,
  },
  experienceDate: {
    fontSize: 9,
    color: "#666",
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 9,
    color: "#333",
    marginBottom: 2,
    marginLeft: 10,
  },
});

// Template 3 Styles (Purple Sidebar Design - Matching Template3PDF)
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
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
    textAlign: "center",
  },
  title: {
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
  // Section styles for main content
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
  text: {
    fontSize: 9,
    lineHeight: 1.5,
    textAlign: "justify",
    marginBottom: 8,
    color: "#4b5563",
  },
  // Experience and education items
  experienceItem: {
    marginBottom: 12,
    paddingBottom: 8,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  experienceSubtitle: {
    fontSize: 9,
    color: "#7c3aed",
    fontWeight: "bold",
    marginBottom: 2,
  },
  experienceDate: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 8,
    color: "#4b5563",
    lineHeight: 1.4,
    marginBottom: 2,
  },
  // Education box
  educationBox: {
    backgroundColor: "#f8fafc",
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#7c3aed",
  },
});

interface ResumePDFProps {
  resumeData: ResumeState["resumeData"];
  templateId?: string;
}

const ResumePDF = ({ resumeData, templateId = "1" }: ResumePDFProps) => {
  // Debug: Log the templateId being received
  console.log("ResumePDF received templateId:", templateId, "type:", typeof templateId);
  
  // Validate font sizes
  const nameFontSize = Number.isFinite(resumeData.nameFontSize)
    ? resumeData.nameFontSize
    : 18;
  const summaryFontSize = Number.isFinite(resumeData.summaryFontSize)
    ? resumeData.summaryFontSize
    : 12;

  // Validate image URL - check both image and profileImage fields
  const imageUrl = resumeData.profileImage || resumeData.image;
  const isValidImage =
    imageUrl && imageUrl.startsWith("data:image/");

  // Ensure templateId is treated as string and handle edge cases
  const normalizedTemplateId = String(templateId || "1").trim();
  
  // Template 3 PDF Layout (Purple Sidebar Design - Matching Template3PDF)
  if (normalizedTemplateId === "3") {
    const sidebarColor = resumeData.headerColor || '#7c3aed';
    
    return (
      <Document>
        <Page size="A4" style={template3Styles.page}>
          {/* Left Sidebar - Purple */}
          <View style={[template3Styles.sidebar, { backgroundColor: sidebarColor }]}>
            {/* Profile Section */}
            <View style={template3Styles.profileSection}>
              {isValidImage ? (
                <Image
                  src={resizeImage(imageUrl,
                    //  80
                    )}
                  style={template3Styles.profilePhoto}
                  // alt="Profile"
                />
              ) : (
                <View style={template3Styles.profilePlaceholder}>
                  <Text style={template3Styles.profileInitials}>
                    {resumeData.name ? resumeData.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'HG'}
                  </Text>
                </View>
              )}
              
              <Text style={template3Styles.name}>
                {resumeData.name || "Hadiqa Gohar"}
              </Text>
              <Text style={template3Styles.title}>
                {resumeData.tag || "Agentic AI Developer | NextJS and Python Developer"}
              </Text>
            </View>

            {/* Contact Info */}
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>CONTACT</Text>
              {resumeData.email && (
                <View style={template3Styles.contactItem}>
                  <Text style={template3Styles.skillItem}>✉ {resumeData.email}</Text>
                </View>
              )}
              {resumeData.number && (
                <View style={template3Styles.contactItem}>
                  <Text style={template3Styles.skillItem}>☎ {resumeData.number}</Text>
                </View>
              )}
              {resumeData.location && (
                <View style={template3Styles.contactItem}>
                  <Text style={template3Styles.skillItem}>⌂ {resumeData.location}</Text>
                </View>
              )}
              {resumeData.github && (
                <View style={template3Styles.contactItem}>
                  <Text style={template3Styles.skillItem}>⚡ {resumeData.github}</Text>
                </View>
              )}
            </View>

            {/* Skills */}
            {/* {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={template3Styles.sidebarSection}>
                <Text style={template3Styles.sidebarSectionTitle}>SKILLS</Text>
                {resumeData.skills.map((skill, idx) => (
                  <Text key={idx} style={template3Styles.skillItem}>
                    • {typeof skill === 'string' ? skill : skill.name || skill}
                  </Text>
                ))}
              </View>
            )} */}
                 {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={template3Styles.sidebarSection}>
                <Text style={template3Styles.sidebarSectionTitle}>SKILLS</Text>
                {resumeData.skills.map((skill: Skill, idx: number) => (
                  <Text key={idx} style={template3Styles.skillItem}>
                    • {typeof skill === 'string' ? skill : skill.name}
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
                    • {typeof lang === 'string' ? lang : lang.name || lang}
                  </Text>
                ))}
              </View>
            )} */}
              {resumeData.languages && resumeData.languages.length > 0 && (
              <View style={template3Styles.sidebarSection}>
                <Text style={template3Styles.sidebarSectionTitle}>LANGUAGES</Text>
                {resumeData.languages.map((lang: Language, idx: number) => (
                  <Text key={idx} style={template3Styles.skillItem}>
                    • {typeof lang === 'string' ? lang : lang.name}
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

            {/* References */}
            {resumeData.references && resumeData.references.length > 0 && (
              <View style={template3Styles.sidebarSection}>
                <Text style={template3Styles.sidebarSectionTitle}>REFERENCES</Text>
                {resumeData.references.map((reference, idx) => (
                  <Text key={idx} style={template3Styles.skillItem}>
                    • {reference}
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

            {/* Extracurricular Activities */}
            {resumeData.extracurriculars && resumeData.extracurriculars.length > 0 && (
              <View style={template3Styles.sidebarSection}>
                <Text style={template3Styles.sidebarSectionTitle}>ACTIVITIES</Text>
                {resumeData.extracurriculars.map((activity, idx) => (
                  <Text key={idx} style={template3Styles.skillItem}>
                    • {activity}
                  </Text>
                ))}
              </View>
            )}

            {/* Internships */}
            {resumeData.internships && resumeData.internships.length > 0 && (
              <View style={template3Styles.sidebarSection}>
                <Text style={template3Styles.sidebarSectionTitle}>INTERNSHIPS</Text>
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
                <Text style={template3Styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
                <Text style={template3Styles.text}>
                  {resumeData.summary || 'Highly motivated and skilled Computer Science graduate with expertise in developing modern web applications using NextJS and Python. Proficient in leveraging NextJS framework to build performant, scalable, and user-friendly interfaces. Eager to apply technical skills and contribute to innovative projects in a challenging and rewarding environment. Seeking opportunities to deliver impactful solutions and further enhance expertise in web development.'}
                </Text>
              </View>
            )}

            {/* Professional Experience */}
            {/* {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                {resumeData.experience.map((exp, idx) => (
                  <View key={idx} style={template3Styles.experienceItem}>
                    <Text style={template3Styles.experienceTitle}>
                      {typeof exp === 'string' ? exp : exp.position || exp}
                    </Text>
                    {typeof exp === 'object' && exp !== null && (
                      <>
                        {exp.company && (
                          <Text style={template3Styles.experienceSubtitle}>
                            {exp.company}
                          </Text>
                        )}
                        {exp.startDate && exp.endDate && (
                          <Text style={template3Styles.experienceDate}>
                            {exp.startDate} - {exp.endDate}
                            {exp.location && ` | ${exp.location}`}
                          </Text>
                        )}
                        {exp.description && (
                          <Text style={template3Styles.experienceDescription}>
                            {exp.description}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            )} */}
               {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
                {resumeData.experience.map((exp: Experience, idx: number) => (
                  <View key={idx} style={template3Styles.experienceItem}>
                    <Text style={template3Styles.experienceTitle}>
                      {typeof exp === 'string' ? exp : exp.position}
                    </Text>
                    {typeof exp === 'object' && exp !== null && (
                      <>
                        {exp.company && (
                          <Text style={template3Styles.experienceSubtitle}>
                            {exp.company}
                          </Text>
                        )}
                        {exp.startDate && exp.endDate && (
                          <Text style={template3Styles.experienceDate}>
                            {exp.startDate} - {exp.endDate}
                            {exp.location && ` | ${exp.location}`}
                          </Text>
                        )}
                        {exp.description && (
                          <Text style={template3Styles.experienceDescription}>
                            {exp.description}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {/* {resumeData.education && resumeData.education.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>EDUCATION</Text>
                {resumeData.education.map((edu, idx) => (
                  <View key={idx} style={template3Styles.educationBox}>
                    <Text style={template3Styles.experienceTitle}>
                      {typeof edu === 'string' ? edu : edu.degree || edu}
                    </Text>
                    {typeof edu === 'object' && edu !== null && (
                      <>
                        {edu.institution && (
                          <Text style={template3Styles.experienceSubtitle}>
                            {edu.institution}
                          </Text>
                        )}
                        {edu.startDate && edu.endDate && (
                          <Text style={template3Styles.experienceDate}>
                            {edu.startDate} - {edu.endDate}
                            {edu.location && ` | ${edu.location}`}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            )} */}
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>EDUCATION</Text>
                {resumeData.education.map((edu: Education, idx: number) => (
                  <View key={idx} style={template3Styles.educationBox}>
                    <Text style={template3Styles.experienceTitle}>
                      {typeof edu === 'string' ? edu : edu.degree }
                    </Text>
                    {typeof edu === 'object' && edu !== null && (
                      <>
                        {edu.institution && (
                          <Text style={template3Styles.experienceSubtitle}>
                            {edu.institution}
                          </Text>
                        )}
                        {edu.startDate && edu.endDate && (
                          <Text style={template3Styles.experienceDate}>
                            {edu.startDate} - {edu.endDate}
                            {edu.location && ` | ${edu.location}`}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </Page>
      </Document>
    );
  }
  
  // Template 2 PDF Layout (Professional CV - Teal)
  if (normalizedTemplateId === "2") {
    const sidebarColor = resumeData.headerColor || '#a3e4db';
    
    return (
      <Document>
        <Page size="A4" style={template2Styles.page}>
          {/* Left Sidebar */}
          <View style={[template2Styles.sidebar, { backgroundColor: sidebarColor }]}>
            {/* Profile Photo */}
            {isValidImage && (
              <Image
                src={resizeImage(imageUrl, 
                  // 120
                )}
                style={template2Styles.profilePhoto}
                // alt="Profile"
              />
            )}

            {/* Contact Section */}
            {(resumeData.number || resumeData.email || resumeData.location) && (
              <View style={template2Styles.sidebarSection}>
                <Text style={template2Styles.sidebarTitle}>Contact:</Text>
                {resumeData.number && (
                  <Text style={template2Styles.sidebarText}>
                    Phone: {resumeData.number}
                  </Text>
                )}
                {resumeData.email && (
                  <Text style={template2Styles.sidebarText}>
                    Email: {resumeData.email}
                  </Text>
                )}
                {resumeData.location && (
                  <Text style={template2Styles.sidebarText}>
                    Address: {resumeData.location}
                  </Text>
                )}
              </View>
            )}

            {/* Key Skills */}
            {/* {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={template2Styles.sidebarSection}>
                <Text style={template2Styles.sidebarTitle}>Key Skills:</Text>
                {resumeData.skills.map((skill, idx) => (
                  <Text key={idx} style={template2Styles.sidebarText}>
                    • {typeof skill === 'string' ? skill : skill.name || skill}
                  </Text>
                ))}
              </View>
            )} */}
               {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={template2Styles.sidebarSection}>
                <Text style={template2Styles.sidebarTitle}>Key Skills:</Text>
                {resumeData.skills.map((skill: Skill, idx : number) => (
                  <Text key={idx} style={template2Styles.sidebarText}>
                    • {typeof skill === 'string' ? skill : skill.name}
                  </Text>
                ))}
              </View>
            )}

            {/* Technical Skills */}
            {resumeData.courses && resumeData.courses.length > 0 && (
              <View style={template2Styles.sidebarSection}>
                <Text style={template2Styles.sidebarTitle}>Technical Skills:</Text>
                {resumeData.courses.map((course, idx) => (
                  <Text key={idx} style={template2Styles.sidebarText}>
                    • {course}
                  </Text>
                ))}
              </View>
            )}

            {/* Languages */}
            {/* {resumeData.languages && resumeData.languages.length > 0 && (
              <View style={template2Styles.sidebarSection}>
                <Text style={template2Styles.sidebarTitle}>Languages:</Text>
                {resumeData.languages.map((lang, idx) => (
                  <Text key={idx} style={template2Styles.sidebarText}>
                    • {typeof lang === 'string' ? lang : lang.name || lang}
                  </Text>
                ))}
              </View>
            )} */}
                {resumeData.languages && resumeData.languages.length > 0 && (
              <View style={template2Styles.sidebarSection}>
                <Text style={template2Styles.sidebarTitle}>Languages:</Text>
                {resumeData.languages.map((lang: Language, idx: number) => (
                  <Text key={idx} style={template2Styles.sidebarText}>
                    • {typeof lang === 'string' ? lang : lang.name}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Right Main Content */}
          <View style={template2Styles.mainContent}>
            {/* Header */}
            <View style={template2Styles.mainHeader}>
              <Text style={template2Styles.mainName}>
                {resumeData.name || 'Your Name'}
              </Text>
              <Text style={template2Styles.mainTitle}>
                {resumeData.tag || 'Professional Title'}
              </Text>
            </View>

            {/* Profile Summary */}
            {resumeData.summary && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>Profile Summary:</Text>
                <Text style={template2Styles.mainText}>
                  {resumeData.summary}
                </Text>
              </View>
            )}

            {/* Education */}
            {/* {resumeData.education && resumeData.education.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>Education:</Text>
                {resumeData.education.map((edu, idx) => (
                  <View key={idx} style={template2Styles.experienceItem}>
                    <Text style={template2Styles.experienceTitle}>
                      {typeof edu === 'string' ? edu : edu.degree || edu}
                    </Text>
                    {typeof edu === 'object' && (
                      <>
                        {edu.institution && (
                          <Text style={template2Styles.experienceSubtitle}>
                            • {edu.institution}
                          </Text>
                        )}
                        {edu.startDate && edu.endDate && (
                          <Text style={template2Styles.experienceDate}>
                            • {edu.startDate} - {edu.endDate}
                          </Text>
                        )}
                        {edu.location && (
                          <Text style={template2Styles.experienceDate}>
                            • {edu.location}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            )} */}
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>Education:</Text>
                {resumeData.education.map((edu: Education, idx: number) => (
                  <View key={idx} style={template2Styles.experienceItem}>
                    <Text style={template2Styles.experienceTitle}>
                      {typeof edu === 'string' ? edu : edu.degree}
                    </Text>
                    {typeof edu === 'object' && (
                      <>
                        {edu.institution && (
                          <Text style={template2Styles.experienceSubtitle}>
                            • {edu.institution}
                          </Text>
                        )}
                        {edu.startDate && edu.endDate && (
                          <Text style={template2Styles.experienceDate}>
                            • {edu.startDate} - {edu.endDate}
                          </Text>
                        )}
                        {edu.location && (
                          <Text style={template2Styles.experienceDate}>
                            • {edu.location}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Experience */}
            {/* {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>
                  {resumeData.tag?.toLowerCase().includes('teacher') ? 'Teaching Experience:' : 'Professional Experience:'}
                </Text>
                {resumeData.experience.map((exp, idx) => (
                  <View key={idx} style={template2Styles.experienceItem}>
                    <Text style={template2Styles.experienceTitle}>
                      {typeof exp === 'string' ? exp : exp.position || exp}
                    </Text>
                    {typeof exp === 'object' && (
                      <>
                        {exp.company && (
                          <Text style={template2Styles.experienceSubtitle}>
                            • {exp.company}
                          </Text>
                        )}
                        {exp.startDate && exp.endDate && (
                          <Text style={template2Styles.experienceDate}>
                            • {exp.startDate} - {exp.endDate}
                          </Text>
                        )}
                        {exp.location && (
                          <Text style={template2Styles.experienceDate}>
                            • {exp.location}
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
              </View>
            )} */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>
                  {resumeData.tag?.toLowerCase().includes('teacher') ? 'Teaching Experience:' : 'Professional Experience:'}
                </Text>
                {resumeData.experience.map((exp: Experience, idx: number) => (
                  <View key={idx} style={template2Styles.experienceItem}>
                    <Text style={template2Styles.experienceTitle}>
                      {typeof exp === 'string' ? exp : exp.position}
                    </Text>
                    {typeof exp === 'object' && (
                      <>
                        {exp.company && (
                          <Text style={template2Styles.experienceSubtitle}>
                            • {exp.company}
                          </Text>
                        )}
                        {exp.startDate && exp.endDate && (
                          <Text style={template2Styles.experienceDate}>
                            • {exp.startDate} - {exp.endDate}
                          </Text>
                        )}
                        {exp.location && (
                          <Text style={template2Styles.experienceDate}>
                            • {exp.location}
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
              </View>
            )}

            {/* References */}
            {resumeData.references && resumeData.references.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>References:</Text>
                {resumeData.references.map((reference, idx) => (
                  <Text key={idx} style={template2Styles.bulletPoint}>
                    • {reference}
                  </Text>
                ))}
              </View>
            )}

            {/* Hobbies */}
            {resumeData.hobbies && resumeData.hobbies.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>Hobbies:</Text>
                {resumeData.hobbies.map((hobby, idx) => (
                  <Text key={idx} style={template2Styles.bulletPoint}>
                    • {hobby}
                  </Text>
                ))}
              </View>
            )}

            {/* Extracurricular Activities */}
            {resumeData.extracurriculars && resumeData.extracurriculars.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>Extracurricular Activities:</Text>
                {resumeData.extracurriculars.map((activity, idx) => (
                  <Text key={idx} style={template2Styles.bulletPoint}>
                    • {activity}
                  </Text>
                ))}
              </View>
            )}

            {/* Internships */}
            {resumeData.internships && resumeData.internships.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>Internships:</Text>
                {resumeData.internships.map((internship, idx) => (
                  <Text key={idx} style={template2Styles.bulletPoint}>
                    • {internship}
                  </Text>
                ))}
              </View>
            )}

            {/* Additional Courses */}
            {resumeData.courses && resumeData.courses.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>Additional Courses:</Text>
                {resumeData.courses.map((course, idx) => (
                  <Text key={idx} style={template2Styles.bulletPoint}>
                    • {course}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </Page>
      </Document>
    );
  }

  // Default Template 1 Layout
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Aside (Sidebar) */}
        <View style={styles.aside}>
          {isValidImage && (
            <Image
              src={resizeImage(imageUrl, 
                // 115
              )}
              style={styles.profileImage}
              // alt="Profile"
            />
          )}
          {(resumeData.number || resumeData.email || resumeData.location) && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>Contact</Text>
              {resumeData.number && (
                <Text style={styles.text}>
                  Phone Number: {resizeData(resumeData.number, 20)}
                </Text>
              )}
              {resumeData.email && (
                <Text style={styles.text}>
                  Email: {resizeData(resumeData.email, 20)}
                </Text>
              )}
              {resumeData.location && (
                <Text style={styles.text}>
                  Location: {resizeData(resumeData.location, 20)}
                </Text>
              )}
            </View>
          )}
          {resumeData.websites.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                Websites, Portfolios
              </Text>
              {resumeData.websites.map((web, idx) => (
                <Link
                  key={idx}
                  src={web.trim()}
                  style={[styles.listItem, styles.link]}
                >
                  <Text>• {resizeData(web.trim(), 30)}</Text>
                </Link>
              ))}
            </View>
          )}
          {resumeData.languages.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                Languages
              </Text>
              {resumeData.languages.map((lang, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(lang, 20)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                Education
              </Text>
              {resumeData.education.map((edu, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(edu, 50)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.student.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                Student Status
              </Text>
              {resumeData.student.map((stu, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(stu, 20)}
                </Text>
              ))}
            </View>
          )}
            {resumeData.courses.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                Courses
              </Text>
              {resumeData.courses.map((course, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(course, 50)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.internships.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                Internships
              </Text>
              {resumeData.internships.map((internship, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(internship, 50)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.extracurriculars.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                Extracurricular Activities
              </Text>
              {resumeData.extracurriculars.map((activity, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(activity, 50)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.hobbies.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                Hobbies
              </Text>
              {resumeData.hobbies.map((hobby, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(hobby, 50)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.references.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: "#fff" }]}>
                References
              </Text>
              {resumeData.references.map((reference, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(reference, 50)}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: resumeData.headerColor || "#a3e4db" },
          ]}
        >
          {resumeData.name && (
            <Text
              style={[
                styles.headerText,
                {
                  fontSize: nameFontSize,
                  ...getFontStyles(resumeData.nameFontStyle),
                },
              ]}
            >
              {resizeData(resumeData.name, 20)}
            </Text>
          )}
          {resumeData.tag && (
            <Text
              style={[
                styles.tag,
                {
                  fontSize: resumeData.tagFontSize,
                  ...getFontStyles(resumeData.tagFontStyle),
                },
              ]}
            >
              {resizeData(resumeData.tag, 100)}
            </Text>
          )}
        </View>


        {/* Main Content */}
        <View style={styles.main}>
          {resumeData.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: summaryFontSize,
                    ...getFontStyles(resumeData.summaryFontStyle),
                  },
                ]}
              >
                {resizeData(resumeData.summary, 500)}
              </Text>
            </View>
          )}
          {resumeData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Top Skills</Text>
              <View style={{ flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 6 }}>
                {resumeData.skills.map((skill, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.skillTag,
                      { backgroundColor: resumeData.headerColor || "#a3e4db" },
                    ]}
                  >
                    <Text style={styles.skillText}>
                      {resizeData(skill, 20)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resumeData.experience.map((exp, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {resizeData(exp, 100)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.awards?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Awards</Text>
              {resumeData.awards.map((award, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {resizeData(award, 50)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.extra?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Extra Section</Text>
              {resumeData.extra.map((item, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {resizeData(item, 50)}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        {/* Footer */}
      <View style={{ textAlign: 'center', paddingVertical: 8, fontSize: 10, color: '#99A1AF', fontStyle: 'italic', marginLeft: 150 , textDecoration: 'none'}}>
        <Link src="https://github.com/HadiqaGohar/">
          <Text style={{color: '#99A1AF', textDecorationStyle: 'none'}}>Powered by Hadiqa Gohar</Text>
        </Link>
      </View>
        {/* <View style={styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>Powered by Hadiqa Gohar</Text>
          </Link>
        </View> */}
      </Page>
    </Document>
  );
};

export default ResumePDF;
