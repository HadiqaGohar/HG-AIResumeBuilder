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
const resizeImage = (imageUrl: string, 
  // size: number
) => {
  return imageUrl;
};

const resizeData = (text: string, maxLength: number) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
};

// const getFontStyles = (style: string | undefined) => {
//   switch (style) {
//     case "bold":
//       return { fontWeight: "bold" as const };
//     case "italic":
//       return { fontStyle: "italic" as const };
//     case "bold-italic":
//       return { fontWeight: "bold" as const, fontStyle: "italic" as const };
//     default:
//       return { fontWeight: "normal" as const, fontStyle: "normal" as const };
//   }
// };

// Template 2 Styles (Professional CV Layout - Teal)
const template2Styles = StyleSheet.create({
  page: {
    flexDirection: "row",
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
    width: "67%",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: "center",
    border: "3px solid #ffffff",
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
    textAlign: "justify",
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
});

interface UserTemplate2PDFProps {
  resumeData: ResumeState["resumeData"];
}

const UserTemplate2PDF = ({ resumeData }: UserTemplate2PDFProps) => {
  const isValidImage =
    resumeData.image && resumeData.image.startsWith("data:image/");

  const sidebarColor = resumeData.headerColor || "#a3e4db";

  return (
    <Document>
      <Page size="A4" style={template2Styles.page}>
        {/* Left Sidebar */}
        <View
          style={[template2Styles.sidebar, { backgroundColor: sidebarColor }]}
        >
          {/* Profile Photo */}
          {isValidImage && (
            <Image
              src={resizeImage(resumeData.image, 
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
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>Key Skills:</Text>
              {resumeData.skills.map((skill:Skill, idx:number) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  • {typeof skill === "string" ? skill : skill.name}
                </Text>
              ))}
            </View>
          )}

          {/* Technical Skills */}
          {resumeData.courses && resumeData.courses.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>
                Technical Skills:
              </Text>
              {resumeData.courses.map((course, idx) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  • {course}
                </Text>
              ))}
            </View>
          )}

          {/* Languages */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>Languages:</Text>
              {resumeData.languages.map((lang:Language, idx:number) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  • {typeof lang === "string" ? lang : lang.name}
                </Text>
              ))}
            </View>
          )}

          {/* Websites/Portfolio */}
          {resumeData.websites && resumeData.websites.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>Portfolio:</Text>
              {resumeData.websites.map((web, idx) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  • {resizeData(web.trim(), 25)}
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
              {resumeData.name || "Your Name"}
            </Text>
            <Text style={template2Styles.mainTitle}>
              {resumeData.tag || "Professional Title"}
            </Text>
          </View>

          {/* Profile Summary */}
          {resumeData.summary && (
            <View style={template2Styles.mainSection}>
              <Text style={template2Styles.mainSectionTitle}>
                Profile Summary:
              </Text>
              <Text style={template2Styles.mainText}>{resumeData.summary}</Text>
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text style={template2Styles.mainSectionTitle}>Education:</Text>
              {resumeData.education.map((edu:Education, idx:number) => (
                <View key={idx} style={template2Styles.experienceItem}>
                  <Text style={template2Styles.experienceTitle}>
                    {typeof edu === "string" ? edu : edu.degree}
                  </Text>
                  {typeof edu === "object" && (
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
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text style={template2Styles.mainSectionTitle}>
                Professional Experience:
              </Text>
              {resumeData.experience.map((exp:Experience, idx:number) => (
                <View key={idx} style={template2Styles.experienceItem}>
                  <Text style={template2Styles.experienceTitle}>
                    {typeof exp === "string" ? exp : exp.position}
                  </Text>
                  {typeof exp === "object" && (
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

          {/* Internships */}
          {resumeData.internships && resumeData.internships.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text style={template2Styles.mainSectionTitle}>Internships:</Text>
              {resumeData.internships.map((internship, idx) => (
                <Text key={idx} style={template2Styles.bulletPoint}>
                  • {resizeData(internship, 80)}
                </Text>
              ))}
            </View>
          )}

          {/* Extracurricular Activities */}
          {resumeData.extracurriculars &&
            resumeData.extracurriculars.length > 0 && (
              <View style={template2Styles.mainSection}>
                <Text style={template2Styles.mainSectionTitle}>
                  Extracurricular Activities:
                </Text>
                {resumeData.extracurriculars.map((activity, idx) => (
                  <Text key={idx} style={template2Styles.bulletPoint}>
                    • {resizeData(activity, 80)}
                  </Text>
                ))}
              </View>
            )}

          {/* Awards */}
          {resumeData.awards && resumeData.awards.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text style={template2Styles.mainSectionTitle}>
                Awards & Achievements:
              </Text>
              {resumeData.awards.map((award, idx) => (
                <Text key={idx} style={template2Styles.bulletPoint}>
                  • {resizeData(award, 80)}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={template2Styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>User Template 2 - Powered by Hadiqa Gohar</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default UserTemplate2PDF;
