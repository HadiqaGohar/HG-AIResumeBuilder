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
  //  size: number
  ) => {
  return imageUrl;
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

// Template 1 Styles (Classic Layout with Sidebar)
const template1Styles = StyleSheet.create({
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

interface AITemplate1PDFProps {
  resumeData: ResumeState["resumeData"];
}

const AITemplate1PDF = ({ resumeData }: AITemplate1PDFProps) => {
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
  const isValidImage = imageUrl && imageUrl.startsWith("data:image/");

  return (
    <Document>
      <Page size="A4" style={template1Styles.page}>
        {/* Aside (Sidebar) */}
        <View style={template1Styles.aside}>
          {isValidImage && (
            <Image
              src={resizeImage(imageUrl)}
              style={template1Styles.profileImage}
            //   alt="Profile Image"
            />
          )}

          {/* Contact Section */}
          {(resumeData.number || resumeData.email || resumeData.location) && (
            <View style={template1Styles.section}>
              <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
                Contact
              </Text>
              {resumeData.number && (
                <Text style={template1Styles.text}>
                  Phone: {resizeData(resumeData.number, 20)}
                </Text>
              )}
              {resumeData.email && (
                <Text style={template1Styles.text}>
                  Email: {resizeData(resumeData.email, 20)}
                </Text>
              )}
              {resumeData.location && (
                <Text style={template1Styles.text}>
                  Location: {resizeData(resumeData.location, 20)}
                </Text>
              )}
            </View>
          )}

          {/* Languages */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
                Languages
              </Text>
              {resumeData.languages.map((lang, idx) => (
                <Text key={idx} style={template1Styles.listItem}>
                  • {resizeData(lang, 20)}
                </Text>
              ))}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
                Education
              </Text>
              {resumeData.education.map((edu, idx) => (
                <Text key={idx} style={template1Styles.listItem}>
                  • {resizeData(edu, 50)}
                </Text>
              ))}
            </View>
          )}

          {/* Courses */}
          {resumeData.courses && resumeData.courses.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
                Courses
              </Text>
              {resumeData.courses.map((course, idx) => (
                <Text key={idx} style={template1Styles.listItem}>
                  • {resizeData(course, 50)}
                </Text>
              ))}
            </View>
          )}

          {/* Internships */}
          {resumeData.internships && resumeData.internships.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
                Internships
              </Text>
              {resumeData.internships.map((internship, idx) => (
                <Text key={idx} style={template1Styles.listItem}>
                  • {resizeData(internship, 50)}
                </Text>
              ))}
            </View>
          )}

          {/* Extracurricular Activities */}
          {resumeData.extracurriculars &&
            resumeData.extracurriculars.length > 0 && (
              <View style={template1Styles.section}>
                <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
                  Activities
                </Text>
                {resumeData.extracurriculars.map((activity, idx) => (
                  <Text key={idx} style={template1Styles.listItem}>
                    • {resizeData(activity, 50)}
                  </Text>
                ))}
              </View>
            )}

          {/* Hobbies */}
          {resumeData.hobbies && resumeData.hobbies.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
                Hobbies
              </Text>
              {resumeData.hobbies.map((hobby, idx) => (
                <Text key={idx} style={template1Styles.listItem}>
                  • {resizeData(hobby, 50)}
                </Text>
              ))}
            </View>
          )}

          {/* References */}
          {resumeData.references && resumeData.references.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
                References
              </Text>
              {resumeData.references.map((reference, idx) => (
                <Text key={idx} style={template1Styles.listItem}>
                  • {resizeData(reference, 50)}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Header */}
        <View
          style={[
            template1Styles.header,
            { backgroundColor: resumeData.headerColor || "#a3e4db" },
          ]}
        >
          {resumeData.name && (
            <Text
              style={[
                template1Styles.headerText,
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
                template1Styles.tag,
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
        <View style={template1Styles.main}>
          {/* Summary */}
          {resumeData.summary && (
            <View style={template1Styles.section}>
              <Text style={template1Styles.sectionTitle}>Summary</Text>
              <Text
                style={[
                  template1Styles.text,
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

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={template1Styles.sectionTitle}>Top Skills</Text>
              <View
                style={{
                  flexDirection: "row" as const,
                  flexWrap: "wrap" as const,
                  gap: 6,
                }}
              >
                {resumeData.skills.map((skill, idx) => (
                  <View
                    key={idx}
                    style={[
                      template1Styles.skillTag,
                      { backgroundColor: resumeData.headerColor || "#a3e4db" },
                    ]}
                  >
                    <Text style={template1Styles.skillText}>
                      {resizeData(skill, 20)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={template1Styles.sectionTitle}>Experience</Text>
              {resumeData.experience.map((exp, idx) => (
                <Text key={idx} style={template1Styles.listItem}>
                  • {resizeData(exp, 100)}
                </Text>
              ))}
            </View>
          )}

          {/* Awards */}
          {resumeData.awards && resumeData.awards.length > 0 && (
            <View style={template1Styles.section}>
              <Text style={template1Styles.sectionTitle}>Awards</Text>
              {resumeData.awards.map((award, idx) => (
                <Text key={idx} style={template1Styles.listItem}>
                  • {resizeData(award, 50)}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={template1Styles.footer}>
          <Link src="https://github.com/HadiqaGohar/">
            <Text>AI Template 1 - Powered by Hadiqa Gohar</Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};
export default AITemplate1PDF;
// // export default AITemplate1PDF;
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

// // Register fonts (using your original URLs for now)
// Font.register({
//   family: "Helvetica",
//   fonts: [
//     {
//       src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2",
//       fontWeight: "normal",
//     },
//     {
//       src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2",
//       fontWeight: "bold",
//     },
//     {
//       src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2",
//       fontWeight: "normal",
//       fontStyle: "italic",
//     },
//     {
//       src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2",
//       fontWeight: "bold",
//       fontStyle: "italic",
//     },
//   ],
// });

// // Helper functions
// const resizeImage = (imageUrl: string) => {
//   return imageUrl;
// };

// const resizeData = (text: string | undefined, maxLength: number) => {
//   if (text && typeof text === "string" && text.length > maxLength) {
//     return text.substring(0, maxLength - 3) + "...";
//   }
//   return text || "";
// };

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

// // Template 1 Styles (Classic Layout with Sidebar)
// const template1Styles = StyleSheet.create({
//   page: {
//     padding: 24,
//     fontFamily: "Helvetica",
//     fontSize: 10,
//     color: "#333",
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     width: "70%",
//     height: 115,
//     padding: 15,
//     backgroundColor: "#a3e4db",
//     justifyContent: "center",
//     position: "absolute" as const,
//     top: 0,
//     left: "30%",
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold" as const,
//     color: "#000",
//     textTransform: "uppercase" as const,
//   },
//   aside: {
//     width: "30%",
//     backgroundColor: "#2c2c2c",
//     color: "#fff",
//     padding: 15,
//     position: "absolute" as const,
//     top: 0,
//     left: 0,
//     height: "100%",
//   },
//   main: {
//     width: "70%",
//     padding: 15,
//     marginLeft: "30%",
//     marginTop: 120,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 15,
//     fontWeight: "bold" as const,
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     paddingBottom: 3,
//     marginBottom: 8,
//   },
//   text: {
//     marginBottom: 3,
//   },
//   listItem: {
//     marginLeft: 15,
//     marginBottom: 2,
//   },
//   link: {
//     color: "#93c5fd",
//     textDecoration: "underline" as const,
//     fontSize: 10,
//   },
//   profileImage: {
//     width: 115,
//     height: 115,
//     borderRadius: 55,
//     marginBottom: 15,
//     marginLeft: 15,
//     marginRight: 15,
//     marginTop: 15,
//   },
//   skillTag: {
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     backgroundColor: "#a3e4db",
//     borderRadius: 12,
//     marginRight: 6,
//     marginBottom: 6,
//   },
//   skillText: {
//     color: "#000",
//     fontSize: 10,
//     marginTop: 2,
//     marginBottom: 2,
//     fontWeight: "bold" as const,
//   },
//   footer: {
//     position: "absolute" as const,
//     bottom: 5,
//     left: 0,
//     right: 0,
//     textAlign: "center" as const,
//     fontSize: 8,
//     color: "#4b5563",
//     fontStyle: "italic" as const,
//   },
//   tag: {
//     color: "#000000",
//     marginTop: 8,
//   },
// });

// interface AITemplate1PDFProps {
//   resumeData: ResumeState["resumeData"];
// }

// const AITemplate1PDF = ({ resumeData }: AITemplate1PDFProps) => {
//   const nameFontSize = Number.isFinite(resumeData.nameFontSize)
//     ? resumeData.nameFontSize
//     : 18;
//   const tagFontSize = Number.isFinite(resumeData.tagFontSize)
//     ? resumeData.tagFontSize
//     : 14;
//   const summaryFontSize = Number.isFinite(resumeData.summaryFontSize)
//     ? resumeData.summaryFontSize
//     : 12;

//   // Validate image URL - use profileImage field
//   const imageUrl = resumeData.profileImage;
//   const isValidImage = imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("data:image/");

//   return (
//     <Document>
//       <Page size="A4" style={template1Styles.page}>
//         {/* Aside (Sidebar) */}
//         <View style={template1Styles.aside}>
//           {isValidImage && (
//             <Image
//               src={resizeImage(imageUrl)}
//               style={template1Styles.profileImage}
//               alt="Profile Image"
//             />
//           )}

//           {/* Contact Section */}
//           {(resumeData.number || resumeData.email || resumeData.location) && (
//             <View style={template1Styles.section}>
//               <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
//                 Contact
//               </Text>
//               {resumeData.number && (
//                 <Text style={template1Styles.text}>
//                   Phone: {resizeData(resumeData.number, 20)}
//                 </Text>
//               )}
//               {resumeData.email && (
//                 <Text style={template1Styles.text}>
//                   Email: {resizeData(resumeData.email, 20)}
//                 </Text>
//               )}
//               {resumeData.location && (
//                 <Text style={template1Styles.text}>
//                   Location: {resizeData(resumeData.location, 20)}
//                 </Text>
//               )}
//             </View>
//           )}

//           {/* Languages */}
//           {resumeData.languages && resumeData.languages.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
//                 Languages
//               </Text>
//               {resumeData.languages.map((lang, idx) => (
//                 <Text key={idx} style={template1Styles.listItem}>
//                   • {resizeData(lang, 20)}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {/* Education */}
//           {resumeData.education && resumeData.education.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
//                 Education
//               </Text>
//               {resumeData.education.map((edu, idx) => (
//                 <Text key={idx} style={template1Styles.listItem}>
//                   • {resizeData(edu, 50)}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {/* Courses */}
//           {resumeData.courses && resumeData.courses.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
//                 Courses
//               </Text>
//               {resumeData.courses.map((course, idx) => (
//                 <Text key={idx} style={template1Styles.listItem}>
//                   • {resizeData(course, 50)}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {/* Internships */}
//           {resumeData.internships && resumeData.internships.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
//                 Internships
//               </Text>
//               {resumeData.internships.map((internship, idx) => (
//                 <Text key={idx} style={template1Styles.listItem}>
//                   • {resizeData(internship, 50)}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {/* Extracurricular Activities */}
//           {resumeData.extracurriculars &&
//             resumeData.extracurriculars.length > 0 && (
//               <View style={template1Styles.section}>
//                 <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
//                   Activities
//                 </Text>
//                 {resumeData.extracurriculars.map((activity, idx) => (
//                   <Text key={idx} style={template1Styles.listItem}>
//                     • {resizeData(activity, 50)}
//                   </Text>
//                 ))}
//               </View>
//             )}

//           {/* Hobbies */}
//           {resumeData.hobbies && resumeData.hobbies.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
//                 Hobbies
//               </Text>
//               {resumeData.hobbies.map((hobby, idx) => (
//                 <Text key={idx} style={template1Styles.listItem}>
//                   • {resizeData(hobby, 50)}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {/* References */}
//           {resumeData.references && resumeData.references.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={[template1Styles.sectionTitle, { color: "#fff" }]}>
//                 References
//               </Text>
//               {resumeData.references.map((reference, idx) => (
//                 <Text key={idx} style={template1Styles.listItem}>
//                   • {resizeData(reference, 50)}
//                 </Text>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Header */}
//         <View
//           style={[
//             template1Styles.header,
//             { backgroundColor: resumeData.headerColor || "#a3e4db" },
//           ]}
//         >
//           {resumeData.name && (
//             <Text
//               style={[
//                 template1Styles.headerText,
//                 {
//                   fontSize: nameFontSize,
//                   ...getFontStyles(resumeData.nameFontStyle),
//                 },
//               ]}
//             >
//               {resizeData(resumeData.name, 20)}
//             </Text>
//           )}
//           {resumeData.tag && (
//             <Text
//               style={[
//                 template1Styles.tag,
//                 {
//                   fontSize: tagFontSize,
//                   ...getFontStyles(resumeData.tagFontStyle),
//                 },
//               ]}
//             >
//               {resizeData(resumeData.tag, 100)}
//             </Text>
//           )}
//         </View>

//         {/* Main Content */}
//         <View style={template1Styles.main}>
//           {/* Summary */}
//           {resumeData.summary && (
//             <View style={template1Styles.section}>
//               <Text style={template1Styles.sectionTitle}>Summary</Text>
//               <Text
//                 style={{
//                   ...template1Styles.text,
//                   fontSize: summaryFontSize,
//                   ...getFontStyles(resumeData.summaryFontStyle),
//                 }}
//               >
//                 {resizeData(resumeData.summary, 500)}
//               </Text>
//             </View>
//           )}

//           {/* Skills */}
//           {resumeData.skills && resumeData.skills.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={template1Styles.sectionTitle}>Top Skills</Text>
//               <View
//                 style={{
//                   flexDirection: "row" as const,
//                   flexWrap: "wrap" as const,
//                   gap: 6,
//                 }}
//               >
//                 {resumeData.skills.map((skill, idx) => (
//                   <View
//                     key={idx}
//                     style={[
//                       template1Styles.skillTag,
//                       { backgroundColor: resumeData.headerColor || "#a3e4db" },
//                     ]}
//                   >
//                     <Text style={template1Styles.skillText}>
//                       {resizeData(skill, 20)}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           )}

//           {/* Experience */}
//           {resumeData.experience && resumeData.experience.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={template1Styles.sectionTitle}>Experience</Text>
//               {resumeData.experience.map((exp, idx) => (
//                 <Text key={idx} style={template1Styles.listItem}>
//                   • {resizeData(exp, 100)}
//                 </Text>
//               ))}
//             </View>
//           )}

//           {/* Awards */}
//           {resumeData.awards && resumeData.awards.length > 0 && (
//             <View style={template1Styles.section}>
//               <Text style={template1Styles.sectionTitle}>Awards</Text>
//               {resumeData.awards.map((award, idx) => (
//                 <Text key={idx} style={template1Styles.listItem}>
//                   • {resizeData(award, 50)}
//                 </Text>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Footer */}
//         <View style={template1Styles.footer}>
//           <Link src="https://github.com/HadiqaGohar/">
//             <Text>Powered by Hadiqa Gohar</Text>
//           </Link>
//         </View>
//       </Page>
//     </Document>
//   );
// };