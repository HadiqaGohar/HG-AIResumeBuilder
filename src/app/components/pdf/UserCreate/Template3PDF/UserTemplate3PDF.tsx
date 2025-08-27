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
const resizeImage = (imageUrl: string) => {
  return imageUrl;
};

// Template 3 Styles (Dark Header with Green Accents - User Version)
const template3Styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
    backgroundColor: "#ffffff",
  },
  // Dark header section
  header: {
    backgroundColor: "#4a5568", // Dark gray-blue
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 25,
    border: "4px solid #ffffff",
  },
  headerContent: {
    flex: 1,
  },
  mainName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 16,
    color: "#68d391", // Green accent
    fontWeight: "bold",
    marginBottom: 15,
  },
  summary: {
    fontSize: 11,
    color: "#e2e8f0", // Light gray
    lineHeight: 1.5,
    marginBottom: 15,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  contactText: {
    fontSize: 10,
    color: "#e2e8f0",
  },
  // Main content area
  mainContent: {
    padding: 25,
    flexDirection: "row",
    gap: 25,
  },
  leftColumn: {
    width: "48%",
  },
  rightColumn: {
    width: "48%",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#68d391", // Green accent
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#68d391",
    paddingBottom: 4,
  },
  // Experience items
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 2,
  },
  company: {
    fontSize: 11,
    color: "#4a5568",
    fontStyle: "italic",
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 9,
    color: "#68d391", // Green accent
    marginBottom: 6,
  },
  description: {
    fontSize: 10,
    color: "#4a5568",
    lineHeight: 1.4,
    textAlign: "justify",
  },
  // Education items
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 2,
  },
  institution: {
    fontSize: 10,
    color: "#4a5568",
    fontStyle: "italic",
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
  skillItem: {
    fontSize: 9,
    color: "#4a5568",
    marginBottom: 2,
    marginRight: 8,
  },
  // Bullet points
  bulletPoint: {
    fontSize: 10,
    color: "#4a5568",
    marginBottom: 3,
    marginLeft: 10,
  },
  // Footer
  footer: {
    position: "absolute" as const,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center" as const,
    fontSize: 8,
    color: "#68d391",
    fontStyle: "italic" as const,
  },
});

interface UserTemplate3PDFProps {
  resumeData: ResumeState["resumeData"];
}

const UserTemplate3PDF = ({ resumeData }: UserTemplate3PDFProps) => {
  const isValidImage =
    resumeData.image && resumeData.image.startsWith("data:image/");

  return (
    <Document>
      <Page size="A4" style={template3Styles.page}>
        {/* Dark Header Section */}
        <View style={template3Styles.header}>
          {/* Profile Photo */}
          {isValidImage && (
            <Image
              src={resizeImage(resumeData.image)}
              style={template3Styles.profilePhoto}
              // alt="Profile"
            />
          )}

          {/* Header Content */}
          <View style={template3Styles.headerContent}>
            <Text style={template3Styles.mainName}>
              {resumeData.name || 'YOUR NAME'}
            </Text>
            <Text style={template3Styles.mainTitle}>
              {resumeData.tag || 'Professional Title'}
            </Text>
            
            {resumeData.summary && (
              <Text style={template3Styles.summary}>
                {resumeData.summary}
              </Text>
            )}

            {/* Contact Information */}
            <View style={template3Styles.contactInfo}>
              {resumeData.number && (
                <View style={template3Styles.contactItem}>
                  <Text style={template3Styles.contactText}>
                    📞 {resumeData.number}
                  </Text>
                </View>
              )}
              {resumeData.email && (
                <View style={template3Styles.contactItem}>
                  <Text style={template3Styles.contactText}>
                    ✉️ {resumeData.email}
                  </Text>
                </View>
              )}
              {resumeData.location && (
                <View style={template3Styles.contactItem}>
                  <Text style={template3Styles.contactText}>
                    📍 {resumeData.location}
                  </Text>
                </View>
              )}
              {resumeData.websites && resumeData.websites.length > 0 && (
                <View style={template3Styles.contactItem}>
                  <Text style={template3Styles.contactText}>
                    🔗 {resumeData.websites[0]}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Main Content - Two Columns */}
        <View style={template3Styles.mainContent}>
          {/* Left Column */}
          <View style={template3Styles.leftColumn}>
            {/* Work Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>Work Experience</Text>
                {resumeData.experience.map((exp:Experience, idx:number) => (
                  <View key={idx} style={template3Styles.experienceItem}>
                    <Text style={template3Styles.jobTitle}>
                      {typeof exp === 'string' ? exp : (exp )?.position || String(exp)}
                    </Text>
                    {typeof exp === 'object' && exp !== null && (
                      <>
                        {(exp )?.company && (
                          <Text style={template3Styles.company}>
                            {(exp ).company} - {(exp)?.location || 'Location'}
                          </Text>
                        )}
                        {(exp)?.startDate && (exp)?.endDate && (
                          <Text style={template3Styles.dateRange}>
                            {(exp).startDate} - {(exp).endDate}
                          </Text>
                        )}
                        {(exp )?.description && (
                          <Text style={template3Styles.description}>
                            {(exp ).description}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>Education</Text>
                {resumeData.education.map((edu:Education, idx:number) => (
                  <View key={idx} style={template3Styles.educationItem}>
                    <Text style={template3Styles.degree}>
                      {typeof edu === 'string' ? edu : (edu )?.degree || String(edu)}
                    </Text>
                    {typeof edu === 'object' && edu !== null && (
                      <>
                        {(edu )?.institution && (
                          <Text style={template3Styles.institution}>
                            {(edu ).institution} - {(edu )?.location || 'Location'}
                          </Text>
                        )}
                        {(edu )?.startDate && (edu )?.endDate && (
                          <Text style={template3Styles.dateRange}>
                            {(edu ).startDate} - {(edu ).endDate}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Awards */}
            {resumeData.awards && resumeData.awards.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>Achievements</Text>
                {resumeData.awards.map((award, idx) => (
                  <Text key={idx} style={template3Styles.bulletPoint}>
                    • {award}
                  </Text>
                ))}
              </View>
            )}

            {/* Internships */}
            {resumeData.internships && resumeData.internships.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>Internships</Text>
                {resumeData.internships.map((internship, idx) => (
                  <Text key={idx} style={template3Styles.bulletPoint}>
                    • {internship}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={template3Styles.rightColumn}>
            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>Skills</Text>
                <View style={template3Styles.skillCategory}>
                  <Text style={template3Styles.skillCategoryTitle}>Technical Skills</Text>
                  {resumeData.skills.map((skill:Skill, idx:number) => (
                    <Text key={idx} style={template3Styles.skillItem}>
                      • {typeof skill === 'string' ? skill : (skill )?.name || String(skill)}
                    </Text>
                  ))}
                </View>
                
                {resumeData.courses && resumeData.courses.length > 0 && (
                  <View style={template3Styles.skillCategory}>
                    <Text style={template3Styles.skillCategoryTitle}>Soft Skills</Text>
                    {resumeData.courses.map((course, idx) => (
                      <Text key={idx} style={template3Styles.skillItem}>
                        • {course}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Languages */}
            {resumeData.languages && resumeData.languages.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>Languages</Text>
                {resumeData.languages.map((lang:Language, idx:number) => (
                  <Text key={idx} style={template3Styles.skillItem}>
                    • {typeof lang === 'string' ? lang : (lang )?.name || String(lang)}
                  </Text>
                ))}
              </View>
            )}

            {/* Hobbies */}
            {resumeData.hobbies && resumeData.hobbies.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>Hobbies</Text>
                {resumeData.hobbies.map((hobby, idx) => (
                  <Text key={idx} style={template3Styles.skillItem}>
                    • {hobby}
                  </Text>
                ))}
              </View>
            )}

            {/* Extracurriculars */}
            {resumeData.extracurriculars && resumeData.extracurriculars.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>Activities</Text>
                {resumeData.extracurriculars.map((activity, idx) => (
                  <Text key={idx} style={template3Styles.bulletPoint}>
                    • {activity}
                  </Text>
                ))}
              </View>
            )}

            {/* References */}
            {resumeData.references && resumeData.references.length > 0 && (
              <View style={template3Styles.section}>
                <Text style={template3Styles.sectionTitle}>References</Text>
                {resumeData.references.map((ref, idx) => (
                  <Text key={idx} style={template3Styles.bulletPoint}>
                    • {ref}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={template3Styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>User Template 3 - Modern Professional Design</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default UserTemplate3PDF;