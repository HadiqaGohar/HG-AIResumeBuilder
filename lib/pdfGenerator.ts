// // lib/pdfGenerator.ts
// import React from "react";
// import { ResumeData } from "./store";

// export const generatePDF = async (
//   resumeData: ResumeData,
//   filename: string = "resume.pdf",
//   templateId: string = "1",
//   isAIGenerated: boolean = true
// ) => {
//   try {
//     console.log("Starting PDF generation with @react-pdf/renderer...");
//     console.log("Template ID:", templateId, "Is AI Generated:", isAIGenerated);

//     // Dynamic import to avoid SSR issues
//     const { pdf } = await import("@react-pdf/renderer");

//     // Import the correct component based on template and type
//     let PDFComponent: any;

//     try {
//       if (isAIGenerated) {
//         // AI Generated Resume Templates
//         switch (templateId) {
//           case "1":
//             const { default: AITemplate1PDF } = await import(
//               "../src/app/components/pdf/AICreate/Template1PDF/AITemplate1PDF"
//             );
//             PDFComponent = AITemplate1PDF;
//             break;
//           case "2":
//             const { default: AITemplate2PDF } = await import(
//               "../src/app/components/pdf/AICreate/Template2PDF/AITemplate2PDF"
//             );
//             PDFComponent = AITemplate2PDF;
//             break;
//           case "3":
//             const { default: AITemplate3PDF } = await import(
//               "../src/app/components/pdf/AICreate/Template3PDF/AITemplate3PDF"
//             );
//             PDFComponent = AITemplate3PDF;
//             break;
//           default:
//             const { default: AITemplate1PDFDefault } = await import(
//               "../src/app/components/pdf/AICreate/Template1PDF/AITemplate1PDF"
//             );
//             PDFComponent = AITemplate1PDFDefault;
//         }
//       } else {
//         // User Created Resume Templates - Use ResumePDF with templateId
//         const { default: ResumePDF } = await import(
//           "../src/app/components/pdf/ResumePDF"
//         );
//         PDFComponent = (props: any) =>
//           React.createElement(ResumePDF, { ...props, templateId });
//       }
//     } catch (importError) {
//       console.error(
//         "Failed to import specific template, using fallback:",
//         importError
//       );
//       // Fallback to old working component
//       const { default: FallbackPDF } = await import(
//         "../src/app/components/pdf/AIResumePDF"
//       );
//       PDFComponent = FallbackPDF;
//     }

//     console.log("Generating PDF blob...");

//     console.log("PDFComponent loaded:", PDFComponent);

//     // Generate PDF blob using the correct component
//     const blob = await pdf(
//       React.createElement(PDFComponent as any, { resumeData })
//     ).toBlob();

//     console.log("Creating download link...");

//     // Create download link
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     +document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     console.log("PDF downloaded successfully!");
//     return true;
//   } catch (error) {
//     console.error("PDF generation failed:", error);
//     console.error("Error details:", {
//       message: error.message,
//       stack: error.stack,
//       templateId,
//       isAIGenerated,
//     });

//     // Fallback to print dialog
//     try {
//       const element = document.getElementById("resume-template");
//       if (element) {
//         // Create a new window with just the resume content
//         const printWindow = window.open("", "_blank", "width=800,height=600");
//         if (printWindow) {
//           printWindow.document.write(`
//             <!DOCTYPE html>
//             <html>
//               <head>
//                 <title>Resume</title>
//                 <style>
//                   body { 
//                     margin: 0; 
//                     padding: 20px; 
//                     font-family: Arial, sans-serif; 
//                     background: white;
//                   }
//                   @media print {
//                     body { margin: 0; padding: 0; }
//                     .no-print, button, .print-hidden { display: none !important; }
//                   }
//                   @page {
//                     margin: 0.5in;
//                   }
//                 </style>
//               </head>
//               <body>
//                 ${element.innerHTML}
//                 <script>
//                   window.onload = function() {
//                     setTimeout(() => {
//                       window.print();
//                     }, 1000);
//                   }
//                 </script>
//               </body>
//             </html>
//           `);
//           printWindow.document.close();
//           return true;
//         }
//       }
//     } catch (printError) {
//       console.error("Print fallback failed:", printError);
//     }

//     // Final fallback
//     window.print();
//     return false;
//   }
// };
// // import React from "react";
// // import { pdf, Document } from "@react-pdf/renderer";
// // import { ResumeData } from "./store";

// // interface PDFComponentProps {
// //   resumeData: ResumeData;
// //   templateId?: string;
// // }

// // export const generatePDF = async (
// //   resumeData: ResumeData,
// //   filename: string = "resume.pdf",
// //   templateId: string = "1",
// //   isAIGenerated: boolean = true
// // ): Promise<boolean> => {
// //   try {
// //     console.log("Starting PDF generation with @react-pdf/renderer...");
// //     console.log("Template ID:", templateId, "Is AI Generated:", isAIGenerated);
// //     console.log("Resume Data:", JSON.stringify(resumeData, null, 2));

// //     // Define PDFComponent with proper type
// //     let PDFComponent: React.ComponentType<PDFComponentProps> | null = null;

// //     try {
// //       if (isAIGenerated) {
// //         switch (templateId) {
// //           case "1":
// //             const { default: AITemplate1PDF } = await import(
// //               "../src/app/components/pdf/AICreate/Template1PDF/AITemplate1PDF"
// //             );
// //             PDFComponent = AITemplate1PDF;
// //             PDFComponent.displayName = "AITemplate1PDF";
// //             break;
// //           case "2":
// //             const { default: AITemplate2PDF } = await import(
// //               "../src/app/components/pdf/AICreate/Template2PDF/AITemplate2PDF"
// //             );
// //             PDFComponent = AITemplate2PDF;
// //             PDFComponent.displayName = "AITemplate2PDF";
// //             break;
// //           case "3":
// //             const { default: AITemplate3PDF } = await import(
// //               "../src/app/components/pdf/AICreate/Template3PDF/AITemplate3PDF"
// //             );
// //             PDFComponent = AITemplate3PDF;
// //             PDFComponent.displayName = "AITemplate3PDF";
// //             break;
// //           default:
// //             const { default: AITemplate1PDFDefault } = await import(
// //               "../src/app/components/pdf/AICreate/Template1PDF/AITemplate1PDF"
// //             );
// //             PDFComponent = AITemplate1PDFDefault;
// //             PDFComponent.displayName = "AITemplate1PDFDefault";
// //         }
// //       } else {
// //         const { default: ResumePDF } = await import(
// //           "../src/app/components/pdf/ResumePDF"
// //         );
// //         const UserResumePDF: React.ComponentType<PDFComponentProps> = (
// //           props: PDFComponentProps
// //         ) => React.createElement(ResumePDF, { ...props, templateId });
// //         UserResumePDF.displayName = "UserResumePDF"; // Fix react/display-name error at line 61
// //         PDFComponent = UserResumePDF;
// //       }
// //     } catch (importError) {
// //       console.error("Failed to import specific template, using fallback:", importError);
// //       const { default: FallbackPDF } = await import(
// //         "../src/app/components/pdf/AIResumePDF"
// //       );
// //       PDFComponent = FallbackPDF;
// //       PDFComponent.displayName = "FallbackPDF";
// //     }

// //     if (!PDFComponent) {
// //       throw new Error("No PDF component found");
// //     }

// //     console.log("Generating PDF blob...");
// //     console.log("PDFComponent loaded:", PDFComponent.displayName);

// //     // Generate PDF blob using the correct component
// //     const blob = await pdf(
// //       React.createElement(
// //         Document,
// //         {},
// //         React.createElement(PDFComponent, { resumeData, templateId })
// //       )
// //     ).toBlob();

// //     console.log("Creating download link...");

// //     if (typeof window !== "undefined") {
// //       const url = URL.createObjectURL(blob);
// //       const link = document.createElement("a");
// //       link.href = url;
// //       link.download = filename;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       URL.revokeObjectURL(url);

// //       console.log("PDF downloaded successfully!");
// //       return true;
// //     } else {
// //       console.warn("Download attempted on server-side; handle blob appropriately");
// //       return false;
// //     }
// //   } catch (error) {
// //     console.error("PDF generation failed:", error);
// //     console.error("Error details:", {
// //       message: error instanceof Error ? error.message : "Unknown error",
// //       stack: error instanceof Error ? error.stack : undefined,
// //       templateId,
// //       isAIGenerated,
// //       resumeData: JSON.stringify(resumeData, null, 2),
// //     });
// //     throw new Error("PDF generation failed");
// //   }
// // };

// lib/pdfGenerator.ts
import React from "react";
import { ResumeData } from "./store";

// --------------
import { pdf, DocumentProps} from "@react-pdf/renderer";

interface PDFComponentProps extends DocumentProps {
  resumeData: ResumeData;
  templateId?: string;
}

export const generatePDF = async (
  resumeData: ResumeData,
  filename: string = "resume.pdf",
  templateId: string = "1",
  isAIGenerated: boolean = true
) : Promise<boolean> => {
  try {
    console.log("Starting PDF generation with @react-pdf/renderer...");
    console.log("Template ID:", templateId, "Is AI Generated:", isAIGenerated);
    console.log("Resume Data:", JSON.stringify(resumeData, null, 2));

    // Dynamic import to avoid SSR issues
    // const { pdf } = await import("@react-pdf/renderer");

    // Import the correct component based on template and type
    // let PDFComponent: any;
    let PDFComponent: React.ComponentType<PDFComponentProps> | null = null;


    try {
      if (isAIGenerated) {
        // AI Generated Resume Templates
        switch (templateId) {
          case "1":
            const { default: AITemplate1PDF } = await import(
              "../src/app/components/pdf/AICreate/Template1PDF/AITemplate1PDF"
            );
            PDFComponent = AITemplate1PDF;
            PDFComponent.displayName = "AITemplate1PDF";
            break;
          case "2":
            const { default: AITemplate2PDF } = await import(
              "../src/app/components/pdf/AICreate/Template2PDF/AITemplate2PDF"
            );
            console.log('AITemplate2PDF:', AITemplate2PDF); // Add this
            PDFComponent = AITemplate2PDF;
            PDFComponent.displayName = "AITemplate2PDF";
            break;
          case "3":
            const { default: AITemplate3PDF } = await import(
              "../src/app/components/pdf/AICreate/Template3PDF/AITemplate3PDF"
            );
            PDFComponent = AITemplate3PDF;
            PDFComponent.displayName = "AITemplate3PDF";
            break;
          default:
            const { default: AITemplate1PDFDefault } = await import(
              "../src/app/components/pdf/AICreate/Template1PDF/AITemplate1PDF"
            );
            PDFComponent = AITemplate1PDFDefault;
            PDFComponent.displayName = "AITemplate1PDF";
        }
      } 
      // else {
      //   // User Created Resume Templates - Use ResumePDF with templateId
      //   const { default: ResumePDF } = await import(
      //     "../src/app/components/pdf/ResumePDF"
      //   );
      //   PDFComponent = (props: any) =>
      //     React.createElement(ResumePDF, { ...props, templateId });
      // }
      else {
        const { default: ResumePDF } = await import(
          "../src/app/components/pdf/ResumePDF"
        );
        const UserResumePDF: React.ComponentType<PDFComponentProps> = (
          props: PDFComponentProps
        ) => React.createElement(ResumePDF, { ...props, templateId });
        UserResumePDF.displayName = "UserResumePDF"; // Fix react/display-name error at line 61
        PDFComponent = UserResumePDF;
      }

    } catch (importError) {
      console.error(
        "Failed to import specific template, using fallback:",
        importError
      );
      // Fallback to old working component
      const { default: FallbackPDF } = await import(
        "../src/app/components/pdf/AIResumePDF"
      );
      PDFComponent = FallbackPDF;
      PDFComponent.displayName = "FallbackPDF";
    }
    if (!PDFComponent) {
      throw new Error("No PDF component found");
    }

    console.log("Generating PDF blob...");

    console.log("PDFComponent loaded:", PDFComponent);

    // Generate PDF blob using the correct component
    const blob = await pdf(
      React.createElement(PDFComponent, { resumeData })
    ).toBlob();

    // const blob = await pdf(
    //   React.createElement(
    //     Document,
    //     {},
    //     React.createElement(PDFComponent, { resumeData, templateId })
    //   )
    // ).toBlob();

    console.log("Creating download link...");

    if (typeof window !== "undefined") {
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("PDF downloaded successfully!");
    return true;
    } else {
      console.warn(
        "Download attempted on server-side; handle blob appropriately"
      );
      return false;
    }
  } catch (error) {
    console.error("PDF generation failed:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      templateId,
      isAIGenerated,
    });

    // Fallback to print dialog
    try {
      const element = document.getElementById("resume-template");
      if (element) {
        // Create a new window with just the resume content
        const printWindow = window.open("", "_blank", "width=800,height=600");
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Resume</title>
                <style>
                  body { 
                    margin: 0; 
                    padding: 20px; 
                    font-family: Arial, sans-serif; 
                    background: white;
                  }
                  @media print {
                    body { margin: 0; padding: 0; }
                    .no-print, button, .print-hidden { display: none !important; }
                  }
                  @page {
                    margin: 0.5in;
                  }
                </style>
              </head>
              <body>
                ${element.innerHTML}
                <script>
                  window.onload = function() {
                    setTimeout(() => {
                      window.print();
                    }, 1000);
                  }
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
          return true;
        }
      }
    } catch (printError) {
      console.error("Print fallback failed:", printError);
    }

    // Final fallback
    window.print();
    return false;
  }
};
// import React from "react";
// import { pdf, Document } from "@react-pdf/renderer";
// import { ResumeData } from "./store";

// interface PDFComponentProps {
//   resumeData: ResumeData;
//   templateId?: string;
// }

// export const generatePDF = async (
//   resumeData: ResumeData,
//   filename: string = "resume.pdf",
//   templateId: string = "1",
//   isAIGenerated: boolean = true
// ): Promise<boolean> => {
//   try {
//     console.log("Starting PDF generation with @react-pdf/renderer...");
//     console.log("Template ID:", templateId, "Is AI Generated:", isAIGenerated);
//     console.log("Resume Data:", JSON.stringify(resumeData, null, 2));

//     // Define PDFComponent with proper type
//     let PDFComponent: React.ComponentType<PDFComponentProps> | null = null;

//     try {
//       if (isAIGenerated) {
//         switch (templateId) {
//           case "1":
//             const { default: AITemplate1PDF } = await import(
//               "../src/app/components/pdf/AICreate/Template1PDF/AITemplate1PDF"
//             );
//             PDFComponent = AITemplate1PDF;
//             PDFComponent.displayName = "AITemplate1PDF";
//             break;
//           case "2":
//             const { default: AITemplate2PDF } = await import(
//               "../src/app/components/pdf/AICreate/Template2PDF/AITemplate2PDF"
//             );
//             PDFComponent = AITemplate2PDF;
//             PDFComponent.displayName = "AITemplate2PDF";
//             break;
//           case "3":
//             const { default: AITemplate3PDF } = await import(
//               "../src/app/components/pdf/AICreate/Template3PDF/AITemplate3PDF"
//             );
//             PDFComponent = AITemplate3PDF;
//             PDFComponent.displayName = "AITemplate3PDF";
//             break;
//           default:
//             const { default: AITemplate1PDFDefault } = await import(
//               "../src/app/components/pdf/AICreate/Template1PDF/AITemplate1PDF"
//             );
//             PDFComponent = AITemplate1PDFDefault;
//             PDFComponent.displayName = "AITemplate1PDFDefault";
//         }
//       } else {
//         const { default: ResumePDF } = await import(
//           "../src/app/components/pdf/ResumePDF"
//         );
//         const UserResumePDF: React.ComponentType<PDFComponentProps> = (
//           props: PDFComponentProps
//         ) => React.createElement(ResumePDF, { ...props, templateId });
//         UserResumePDF.displayName = "UserResumePDF"; // Fix react/display-name error at line 61
//         PDFComponent = UserResumePDF;
//       }
//     } catch (importError) {
//       console.error("Failed to import specific template, using fallback:", importError);
//       const { default: FallbackPDF } = await import(
//         "../src/app/components/pdf/AIResumePDF"
//       );
//       PDFComponent = FallbackPDF;
//       PDFComponent.displayName = "FallbackPDF";
//     }

//     if (!PDFComponent) {
//       throw new Error("No PDF component found");
//     }

//     console.log("Generating PDF blob...");
//     console.log("PDFComponent loaded:", PDFComponent.displayName);

//     // Generate PDF blob using the correct component
//     const blob = await pdf(
//       React.createElement(
//         Document,
//         {},
//         React.createElement(PDFComponent, { resumeData, templateId })
//       )
//     ).toBlob();

//     console.log("Creating download link...");

//     if (typeof window !== "undefined") {
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);

//       console.log("PDF downloaded successfully!");
//       return true;
//     } else {
//       console.warn("Download attempted on server-side; handle blob appropriately");
//       return false;
//     }
//   } catch (error) {
//     console.error("PDF generation failed:", error);
//     console.error("Error details:", {
//       message: error instanceof Error ? error.message : "Unknown error",
//       stack: error instanceof Error ? error.stack : undefined,
//       templateId,
//       isAIGenerated,
//       resumeData: JSON.stringify(resumeData, null, 2),
//     });
//     throw new Error("PDF generation failed");
//   }
// };