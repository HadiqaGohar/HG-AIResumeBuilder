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

// Template 1 Styles (Classic Professional)
const template1Styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333333",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 5,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    fontSize: 9,
    color: "#64748b",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 3,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: "justify",
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 2,
  },
  experienceSubtitle: {
    fontSize: 10,
    color: "#64748b",
    marginBottom: 2,
  },
  experienceDate: {
    fontSize: 9,
    color: "#94a3b8",
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 9,
    marginBottom: 2,
    marginLeft: 10,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    backgroundColor: "#f1f5f9",
    padding: 4,
    borderRadius: 3,
    fontSize: 9,
    color: "#475569",
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginBottom: 15,
    border: "3px solid #2563eb",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
    fontStyle: "italic",
  },
});

interface Template1PDFProps {
  resumeData: ResumeState["resumeData"];
  isAIGenerated?: boolean;
}

const Template1PDF = ({
  resumeData,
  isAIGenerated = false,
}: Template1PDFProps) => {
  const isValidImage =
    resumeData.image && resumeData.image.startsWith("data:image/");

  return (
    <Document>
      <Page size="A4" style={template1Styles.page}>
        {/* Header Section */}
        <View style={template1Styles.header}>
          {isValidImage && (
            <Image
              src={resumeData.image}
              style={template1Styles.profilePhoto}
              // alt="Profile"
            />
          )}

          <Text style={template1Styles.name}>
            {resumeData.name || "YOUR NAME"}
          </Text>

          <Text style={template1Styles.title}>
            {resumeData.tag || "Professional Title"}
          </Text>

          <View style={template1Styles.contactInfo}>
            {resumeData.email && <Text>📧 {resumeData.email}</Text>}
            {resumeData.number && <Text>📞 {resumeData.number}</Text>}
            {resumeData.location && <Text>📍 {resumeData.location}</Text>}
          </View>
        </View>

        {/* Professional Summary */}
        {resumeData.summary && (
          <View style={template1Styles.section}>
            <Text style={template1Styles.sectionTitle}>
              Professional Summary
            </Text>
            <Text style={template1Styles.text}>{resumeData.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View style={template1Styles.section}>
            <Text style={template1Styles.sectionTitle}>
              Professional Experience
            </Text>
            {resumeData.experience.map((exp:Experience, idx:number) => (
              <View key={idx} style={template1Styles.experienceItem}>
                <Text style={template1Styles.experienceTitle}>
                  {typeof exp === "string"
                    ? exp
                    : (exp )?.position || String(exp)}
                </Text>
                {typeof exp === "object" && exp !== null && (
                  <>
                    {(exp )?.company && (
                      <Text style={template1Styles.experienceSubtitle}>
                        {(exp ).company}
                      </Text>
                    )}
                    {(exp )?.startDate && (exp )?.endDate && (
                      <Text style={template1Styles.experienceDate}>
                        {(exp ).startDate} - {(exp ).endDate}
                      </Text>
                    )}
                    {(exp )?.description && (
                      <Text style={template1Styles.text}>
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
          <View style={template1Styles.section}>
            <Text style={template1Styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu: Education, idx:number) => (
              <View key={idx} style={template1Styles.experienceItem}>
                <Text style={template1Styles.experienceTitle}>
                  {typeof edu === "string"
                    ? edu
                    : (edu )?.degree || String(edu)}
                </Text>
                {typeof edu === "object" && edu !== null && (
                  <>
                    {(edu )?.institution && (
                      <Text style={template1Styles.experienceSubtitle}>
                        {(edu ).institution}
                      </Text>
                    )}
                    {(edu )?.startDate && (edu)?.endDate && (
                      <Text style={template1Styles.experienceDate}>
                        {(edu).startDate} - {(edu ).endDate}
                      </Text>
                    )}
                  </>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View style={template1Styles.section}>
            <Text style={template1Styles.sectionTitle}>Skills</Text>
            <View style={template1Styles.skillsContainer}>
              {resumeData.skills.map((skill:Skill, idx: number) => (
                <Text key={idx} style={template1Styles.skillItem}>
                  {typeof skill === "string"
                    ? skill
                    : (skill)?.name || String(skill)}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <View style={template1Styles.section}>
            <Text style={template1Styles.sectionTitle}>Languages</Text>
            <View style={template1Styles.skillsContainer}>
              {resumeData.languages.map((lang: Language, idx: number) => (
                <Text key={idx} style={template1Styles.skillItem}>
                  {typeof lang === "string"
                    ? lang
                    : (lang)?.name || String(lang)}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={template1Styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>
              {isAIGenerated
                ? "AI Generated Template 1 - Classic Professional"
                : "Template 1 - Classic Professional"}
            </Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default Template1PDF;
