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

// Template 2 Styles (Modern Professional Layout - Pink Theme)
const template2Styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    backgroundColor: "#ffffff",
  },
  // Left sidebar with teal background (matching preview)
  sidebar: {
    width: "35%",
    backgroundColor: "#a3e4db", // Teal color to match preview
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
    backgroundColor: "#14b8a6", // Darker teal for titles
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
    borderBottomColor: "#f8a5c2",
    paddingBottom: 15,
  },
  mainName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e91e63",
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
    color: "#e91e63",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#f8a5c2",
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
    color: "#e91e63",
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
    color: "#e91e63",
    fontStyle: "italic" as const,
  },
});

interface Template2PDFProps {
  resumeData: ResumeState["resumeData"];
  isAIGenerated?: boolean;
}

const Template2PDF = ({ resumeData, isAIGenerated = false }: Template2PDFProps) => {
  const isValidImage = resumeData.image && resumeData.image.startsWith("data:image/");
  const sidebarColor = resumeData.headerColor || '#f8a5c2';
  
  return (
    <Document>
      <Page size="A4" style={template2Styles.page}>
        {/* Left Sidebar - Pink Theme */}
        <View style={[template2Styles.sidebar, { backgroundColor: sidebarColor }]}>
          {/* Profile Photo */}
          {isValidImage && (
            <Image
              src={resumeData.image}
              style={template2Styles.profilePhoto}
              // alt="Profile Photo"
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
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>KEY SKILLS</Text>
              {resumeData.skills.map((skill:Skill, idx: number) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  ▪ {typeof skill === 'string' ? skill : (skill)?.name || String(skill)}
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
          {resumeData.languages && resumeData.languages.length > 0 && (
            <View style={template2Styles.sidebarSection}>
              <Text style={template2Styles.sidebarTitle}>LANGUAGES</Text>
              {resumeData.languages.map((lang: Language, idx:number) => (
                <Text key={idx} style={template2Styles.sidebarText}>
                  ▪ {typeof lang === 'string' ? lang : (lang)?.name || String(lang)}
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
              {resumeData.name || 'YOUR NAME'}
            </Text>
            <Text style={template2Styles.mainTitle}>
              {resumeData.tag || 'Professional Title'}
            </Text>
          </View>

          {/* Profile Summary */}
          {resumeData.summary && (
            <View style={template2Styles.mainSection}>
              <Text style={template2Styles.mainSectionTitle}>PROFILE SUMMARY</Text>
              <Text style={template2Styles.mainText}>
                {resumeData.summary}
              </Text>
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={template2Styles.mainSection}>
              <Text style={template2Styles.mainSectionTitle}>EDUCATION</Text>
              {resumeData.education.map((edu:Education, idx:number) => (
                <View key={idx} style={template2Styles.experienceItem}>
                  <Text style={template2Styles.experienceTitle}>
                    {typeof edu === 'string' ? edu : (edu)?.degree || String(edu)}
                  </Text>
                  {typeof edu === 'object' && edu !== null && (
                    <>
                      {(edu)?.institution && (
                        <Text style={template2Styles.experienceSubtitle}>
                          {(edu).institution}
                        </Text>
                      )}
                      {(edu)?.startDate && (edu)?.endDate && (
                        <Text style={template2Styles.experienceDate}>
                          {(edu).startDate} - {(edu).endDate}
                        </Text>
                      )}
                      {(edu)?.location && (
                        <Text style={template2Styles.experienceDate}>
                          {(edu).location}
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
                PROFESSIONAL EXPERIENCE
              </Text>
              {resumeData.experience.map((exp:Experience, idx:number) => (
                <View key={idx} style={template2Styles.experienceItem}>
                  <Text style={template2Styles.experienceTitle}>
                    {typeof exp === 'string' ? exp : (exp)?.position || String(exp)}
                  </Text>
                  {typeof exp === 'object' && exp !== null && (
                    <>
                      {(exp)?.company && (
                        <Text style={template2Styles.experienceSubtitle}>
                          {(exp).company}
                        </Text>
                      )}
                      {(exp)?.startDate && (exp)?.endDate && (
                        <Text style={template2Styles.experienceDate}>
                          {(exp).startDate} - {(exp).endDate}
                        </Text>
                      )}
                      {(exp)?.location && (
                        <Text style={template2Styles.experienceDate}>
                          {(exp ).location}
                        </Text>
                      )}
                      {(exp)?.description && (
                        <Text style={template2Styles.mainText}>
                          {(exp ).description}
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
        <View style={template2Styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>
              {isAIGenerated ? 'AI Generated Template 2 - Modern Professional Design' : 'Template 2 - Modern Professional Design'}
            </Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default Template2PDF;