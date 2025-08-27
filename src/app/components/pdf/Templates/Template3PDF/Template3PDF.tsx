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
  ],
});

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
  contactIcon: {
    width: 8,
    marginRight: 6,
    marginTop: 1,
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
  // Footer
  footer: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 7,
    color: "#7c3aed",
  },
});

interface Template3PDFProps {
  resumeData: ResumeState["resumeData"];
  isAIGenerated?: boolean;
}

const Template3PDF = ({ resumeData, isAIGenerated = false }: Template3PDFProps) => {
  const imageUrl = resumeData.profileImage || resumeData.image;
  const isValidImage = imageUrl && imageUrl.startsWith("data:image/");
  
  // Get dynamic colors from resumeData
  const primaryColor = resumeData.headerColor || '#7c3aed';
  const secondaryColor = resumeData.headerColor ? 
    (resumeData.headerColor === '#7c3aed' ? '#6d28d9' : resumeData.headerColor + '99') : '#6d28d9';
  
  return (
    <Document>
      <Page size="A4" style={template3Styles.page}>
        {/* Left Sidebar - Dynamic Color */}
        <View style={[template3Styles.sidebar, { backgroundColor: primaryColor }]}>
          {/* Profile Section */}
          <View style={template3Styles.profileSection}>
            {isValidImage ? (
              <Image
                src={imageUrl}
                style={template3Styles.profilePhoto}
                // alt="Profile"
              />
            ) : (
              <View style={[template3Styles.profilePlaceholder, { backgroundColor: secondaryColor }]}>
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
                <Text>📧 {resumeData.email}</Text>
              </View>
            )}
            {resumeData.number && (
              <View style={template3Styles.contactItem}>
                <Text>📞 {resumeData.number}</Text>
              </View>
            )}
            {resumeData.location && (
              <View style={template3Styles.contactItem}>
                <Text>📍 {resumeData.location}</Text>
              </View>
            )}
            {resumeData.github && (
              <View style={template3Styles.contactItem}>
                <Text>🔗 {resumeData.github}</Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>SKILLS</Text>
              {resumeData.skills.map((skill:Skill, idx:number) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  • {typeof skill === 'string' ? skill : (skill)?.name || String(skill)}
                </Text>
              ))}
            </View>
          )}

          {/* Languages */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <View style={template3Styles.sidebarSection}>
              <Text style={template3Styles.sidebarSectionTitle}>LANGUAGES</Text>
              {resumeData.languages.map((lang:Language, idx:number) => (
                <Text key={idx} style={template3Styles.skillItem}>
                  • {typeof lang === 'string' ? lang : (lang)?.name || String(lang)}
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
        </View>

        {/* Right Content - White Background */}
        <View style={template3Styles.mainContent}>
          {/* Professional Summary */}
          {resumeData.summary && (
            <View style={template3Styles.section}>
              <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>PROFESSIONAL SUMMARY</Text>
              <Text style={template3Styles.text}>
                {resumeData.summary || 'Highly motivated and skilled Computer Science graduate with expertise in developing modern web applications using NextJS and Python. Proficient in leveraging NextJS framework to build performant, scalable, and user-friendly interfaces. Eager to apply technical skills and contribute to innovative projects in a challenging and rewarding environment. Seeking opportunities to deliver impactful solutions and further enhance expertise in web development.'}
              </Text>
            </View>
          )}

          {/* Professional Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={template3Styles.section}>
              <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>PROFESSIONAL EXPERIENCE</Text>
              {resumeData.experience.map((exp:Experience, idx:number) => (
                <View key={idx} style={template3Styles.experienceItem}>
                  <Text style={template3Styles.experienceTitle}>
                    {typeof exp === 'string' ? exp : (exp)?.position || String(exp)}
                  </Text>
                  {typeof exp === 'object' && exp !== null && (
                    <>
                      {(exp)?.company && (
                        <Text style={[template3Styles.experienceSubtitle, { color: primaryColor }]}>
                          {(exp).company}
                        </Text>
                      )}
                      {(exp)?.startDate && (exp)?.endDate && (
                        <Text style={template3Styles.experienceDate}>
                          {(exp ).startDate} - {(exp ).endDate}
                          {(exp )?.location && ` | ${(exp).location}`}
                        </Text>
                      )}
                      {(exp )?.description && (
                        <Text style={template3Styles.experienceDescription}>
                          {(exp).description}
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
              <Text style={[template3Styles.sectionTitle, { borderBottomColor: primaryColor }]}>EDUCATION</Text>
              {resumeData.education.map((edu:Education, idx:number) => (
                <View key={idx} style={[template3Styles.educationBox, { borderLeftColor: primaryColor }]}>
                  <Text style={template3Styles.experienceTitle}>
                    {typeof edu === 'string' ? edu : (edu )?.degree || String(edu)}
                  </Text>
                  {typeof edu === 'object' && edu !== null && (
                    <>
                      {(edu )?.institution && (
                        <Text style={[template3Styles.experienceSubtitle, { color: primaryColor }]}>
                          {(edu ).institution}
                        </Text>
                      )}
                      {(edu)?.startDate && (edu)?.endDate && (
                        <Text style={template3Styles.experienceDate}>
                          {(edu).startDate} - {(edu ).endDate}
                          {(edu)?.location && ` | ${(edu).location}`}
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
            <Text>
              {isAIGenerated ? 'AI Generated Template 3 - Purple Sidebar Design' : 'Template 3 - Purple Sidebar Design'}
            </Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default Template3PDF;