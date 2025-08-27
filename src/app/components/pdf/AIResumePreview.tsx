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

// Register fonts
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2", fontWeight: "normal" },
    { src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2", fontWeight: "bold" },
    { src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2", fontWeight: "normal", fontStyle: "italic" },
    { src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2", fontWeight: "bold", fontStyle: "italic" },
  ],
});

// Helper functions
const resizeImage = (imageUrl: string,
  //  size: number
  ) => {
  return imageUrl; // No resizing needed for base64
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
    marginTop: 150,
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
    marginTop: 8,
  },
});

interface AIResumePDFProps {
  resumeData: ResumeState["resumeData"];
}

const AIResumePDF = ({ resumeData }: AIResumePDFProps) => {
  const nameFontSize = Number.isFinite(resumeData.nameFontSize) ? resumeData.nameFontSize : 18;
  const summaryFontSize = Number.isFinite(resumeData.summaryFontSize) ? resumeData.summaryFontSize : 12;

  // Validate image
  const isValidImage = resumeData.image && resumeData.image.startsWith("data:image/");
  if (!isValidImage && resumeData.image) {
    console.warn("Invalid image format in AIResumePDF:", resumeData.image);
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Aside (Sidebar) */}
        <View style={styles.aside}>
          {isValidImage && (
            <Image
              src={resizeImage(resumeData.image,
                //  115
                )}
              style={styles.profileImage}
              // onError={() => console.error("Failed to render image in PDF")}
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
          {resumeData.websites?.length > 0 && (
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
          {resumeData.languages?.length > 0 && (
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
          {resumeData.education?.length > 0 && (
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
          {resumeData.student?.length > 0 && (
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
          {resumeData.skills?.length > 0 && (
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
          {resumeData.experience?.length > 0 && (
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
        <View style={{ textAlign: 'center', paddingVertical: 8, fontSize: 10, color: '#99A1AF', fontStyle: 'italic', marginLeft: 150, textDecoration: 'none' }}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text style={{ color: '#99A1AF', textDecorationStyle: 'none' }}>Powered by Hadiqa Gohar</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default AIResumePDF;