/* eslint-disable jsx-a11y/alt-text */

// src/app/componenet/pdf/AIResumePDF.tsx is ko change karna he tem 1 and 2 ke liye
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


// Register fonts to support italic and bold-italic (using Helvetica for consistency with preview)
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
  //  size: number
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
    color: "#000000",
    marginTop: 8,
  },
});

interface AIResumePDFProps {
  resumeData: ResumeState["resumeData"];
}

const AIResumePDF = ({ resumeData }: AIResumePDFProps) => {
  // Validate font sizes
  const nameFontSize = Number.isFinite(resumeData.nameFontSize)
    ? resumeData.nameFontSize
    : 18;
  const tagFontSize = Number.isFinite(resumeData.tagFontSize)
    ? resumeData.tagFontSize
    : 14;
  const summaryFontSize = Number.isFinite(resumeData.summaryFontSize)
    ? resumeData.summaryFontSize
    : 12;

  // Validate image URL - check both image and profileImage fields
  const imageUrl = resumeData.profileImage || resumeData.image;
  const isValidImage =
    imageUrl && imageUrl.startsWith("data:image/");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Aside (Sidebar) */}
        <View style={styles.aside}>
          {isValidImage && (
            <Image
              src={resizeImage(imageUrl, 
                  //  115
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
          {resumeData.websites && resumeData.websites.length > 0 && (
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
          {resumeData.languages && resumeData.languages.length > 0 && (
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
          {resumeData.education && resumeData.education.length > 0 && (
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
          {resumeData.student && resumeData.student.length > 0 && (
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
          {resumeData.courses && resumeData.courses.length > 0 && (
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
          {resumeData.internships && resumeData.internships.length > 0 && (
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
                  fontSize: tagFontSize,
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
          {resumeData.skills && resumeData.skills.length > 0 && (
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
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resumeData.experience.map((exp, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(exp, 100)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.extracurriculars && resumeData.extracurriculars.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Extracurriculars</Text>
              {resumeData.extracurriculars.map((extra, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(extra, 50)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.hobbies && resumeData.hobbies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hobbies</Text>
              {resumeData.hobbies.map((hobby, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(hobby, 50)}
                </Text>
              ))}
            </View>
          )}
          {resumeData.references && resumeData.references.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              {resumeData.references.map((ref, idx) => (
                <Text key={idx} style={styles.listItem}>
                  • {resizeData(ref, 50)}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>Powered by Hadiqa Gohar</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};

export default AIResumePDF;
