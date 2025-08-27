

// // // export interface Certification {
// // //   title: string;
// // //   issuer?: string;
// // //   date?: string;
// // //   description?: string;
// // //   link?: string;
// // // }

// // // export interface Project {
// // //   title: string;
// // //   description?: string;
// // //   technologies?: string[];
// // //   link?: string;
// // //   startDate?: string;
// // //   endDate?: string;
// // // }

// // // export interface Education {
// // //   year: string;
// // //   degree?: string;
// // //   institution?: string;
// // //   startDate?: string;
// // //   endDate?: string;
// // //   location?: string;
// // // }

// // // export interface Experience {
// // //   dates: number;
// // //   title: string;
// // //   position?: string;
// // //   company?: string;
// // //   startDate?: string;
// // //   endDate?: string;
// // //   location?: string;
// // //   description?: string;
// // // }

// // // // ```typescript
// // // import { create } from "zustand";

// // // export interface ResumeData {
// // //   name?: string;
// // //   tag?: string;
// // //   email?: string;
// // //   location?: string;
// // //   number?: string;
// // //   phone?: string;
// // //   summary?: string;
// // //   websites?: string[];
// // //   website?: string;
// // //   linkedin?: string;
// // //   github?: string;
// // //   skills?: string[];
// // //   // education?: string[];
// // //   // education?: Array<string | Education>;
// // //   education?: string[];
// // //   // experience?: Array<string | Experience>;
// // //   experience?: string[];
// // //   student?: string[];
// // //   courses?: string[];
// // //   internships?: string[];
// // //   extracurriculars?: string[];
// // //   hobbies?: string[];
// // //   references?: string[];
// // //   languages?: string[];
// // //   awards?: string[];
// // //   extra?: string[];
// // //   certifications?: Certification[];
// // //   projects?: Project[];
// // //   headerColor?: string;
// // //   nameFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // //   nameFontSize?: number;
// // //   tagFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // //   tagFontSize?: number;
// // //   summaryFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // //   summaryFontSize?: number;
// // //   image?: string;
// // //   profileImage?: string | null;
// // // }

// // // export interface ResumeState {
// // //   templateId: string | null;
// // //   resumeData: ResumeData;
// // //   setTemplateId: (id: string) => void;
// // //   setResumeData: (data: Partial<ResumeData>) => void;
// // // }

// // // export const useResumeStore = create<ResumeState>((set) => ({
// // //   templateId: null,
// // //   resumeData: {
// // //     name: "",
// // //     tag: "",
// // //     email: "",
// // //     location: "",
// // //     number: "",
// // //     summary: "",
// // //     websites: [],
// // //     skills: [],
// // //     education: [],
// // //     experience: [],
// // //     student: [],
// // //     courses: [],
// // //     internships: [],
// // //     extracurriculars: [],
// // //     hobbies: [],
// // //     references: [],
// // //     languages: [],
// // //     headerColor: "#a3e4db",
// // //     nameFontStyle: "regular",
// // //     nameFontSize: 18,
// // //     tagFontStyle: "regular",
// // //     tagFontSize: 14,
// // //     summaryFontStyle: "regular",
// // //     summaryFontSize: 12,
// // //     image: "",
// // //     profileImage: null,
// // //   },
// // //   setTemplateId: (id: string) => set({ templateId: id }),
// // //   setResumeData: (data: Partial<ResumeData>) =>
// // //     set((state) => {
// // //       // Ensure arrays are properly initialized
// // //       const newData = { ...data };
// // //       const arrayFields = ['websites', 'skills', 'education', 'experience', 'student', 'courses', 'internships', 'extracurriculars', 'hobbies', 'references', 'languages'];
      
// // //       arrayFields.forEach(field => {
// // //         if (newData[field as keyof typeof newData] !== undefined && !Array.isArray(newData[field as keyof typeof newData])) {
// // //           (newData)[field] = [];
// // //         }
// // //       });

// // //       return {
// // //         resumeData: { ...state.resumeData, ...newData },
// // //       };
// // //     }),
// // // }));
// // // // import { create } from "zustand";

// // // // // Define interfaces for certifications and projects
// // // // interface Certification {
// // // //   name: string;
// // // //   issuer?: string;
// // // //   date?: string;
// // // //   description?: string;
// // // // }

// // // // interface Project {
// // // //   title: string;
// // // //   description?: string;
// // // //   technologies?: string[];
// // // //   date?: string;
// // // // }

// // // // export interface ResumeData {
// // // //   name?: string;
// // // //   tag?: string;
// // // //   email?: string;
// // // //   location?: string;
// // // //   number?: string;
// // // //   phone?: string;
// // // //   summary?: string;
// // // //   websites?: string[];
// // // //   website?: string;
// // // //   linkedin?: string;
// // // //   github?: string;
// // // //   skills?: string[];
// // // //   education?: string[];
// // // //   experience?: string[];
// // // //   student?: string[];
// // // //   courses?: string[];
// // // //   internships?: string[];
// // // //   extracurriculars?: string[];
// // // //   hobbies?: string[];
// // // //   references?: string[];
// // // //   languages?: string[];
// // // //   awards?: string[];
// // // //   extra?: string[];
// // // //   certifications?: Certification[];
// // // //   projects?: Project[];
// // // //   headerColor?: string;
// // // //   nameFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // // //   nameFontSize?: number;
// // // //   tagFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // // //   tagFontSize?: number;
// // // //   summaryFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // // //   summaryFontSize?: number;
// // // //   image?: string;
// // // //   profileImage?: string | null;
// // // // }

// // // // export interface ResumeState {
// // // //   templateId: string | null;
// // // //   resumeData: ResumeData;
// // // //   setTemplateId: (id: string) => void;
// // // //   setResumeData: (data: Partial<ResumeData>) => void;
// // // // }

// // // // // Define a type for keys of ResumeData that are arrays
// // // // type ArrayFields = {
// // // //   [K in keyof ResumeData]: ResumeData[K] extends any[] | undefined ? K : never;
// // // // }[keyof ResumeData];

// // // // export const useResumeStore = create<ResumeState>((set) => ({
// // // //   templateId: null,
// // // //   resumeData: {
// // // //     name: "",
// // // //     tag: "",
// // // //     email: "",
// // // //     location: "",
// // // //     number: "",
// // // //     summary: "",
// // // //     websites: [],
// // // //     skills: [],
// // // //     education: [],
// // // //     experience: [],
// // // //     student: [],
// // // //     courses: [],
// // // //     internships: [],
// // // //     extracurriculars: [],
// // // //     hobbies: [],
// // // //     references: [],
// // // //     languages: [],
// // // //     awards: [],
// // // //     extra: [],
// // // //     certifications: [],
// // // //     projects: [],
// // // //     headerColor: "#a3e4db",
// // // //     nameFontStyle: "regular",
// // // //     nameFontSize: 18,
// // // //     tagFontStyle: "regular",
// // // //     tagFontSize: 14,
// // // //     summaryFontStyle: "regular",
// // // //     summaryFontSize: 12,
// // // //     image: "",
// // // //     profileImage: null,
// // // //   },
// // // //   setTemplateId: (id: string) => set({ templateId: id }),
// // // //   setResumeData: (data: Partial<ResumeData>) =>
// // // //     set((state) => {
// // // //       // Ensure arrays are properly initialized
// // // //       const newData: Partial<ResumeData> = { ...data };
// // // //       // Only include keys that are arrays in ResumeData
// // // //       const arrayFields: ArrayFields[] = [
// // // //         "websites",
// // // //         "skills",
// // // //         "education",
// // // //         "experience",
// // // //         "student",
// // // //         "courses",
// // // //         "internships",
// // // //         "extracurriculars",
// // // //         "hobbies",
// // // //         "references",
// // // //         "languages",
// // // //         "awards",
// // // //         "extra",
// // // //         "certifications",
// // // //         "projects",
// // // //       ];

// // // //       arrayFields.forEach((field) => {
// // // //         if (newData[field] !== undefined && !Array.isArray(newData[field])) {
// // // //           // Assign an empty array with the correct type based on the field
// // // //           if (field === "certifications") {
// // // //             newData[field] = [] as Certification[];
// // // //           } else if (field === "projects") {
// // // //             newData[field] = [] as Project[];
// // // //           } else {
// // // //             newData[field] = [] as string[];
// // // //           }
// // // //         }
// // // //       });

// // // //       return {
// // // //         resumeData: { ...state.resumeData, ...newData },
// // // //       };
// // // //     }),
// // // // }));

// // // // import { create } from "zustand";

// // // // // Define interfaces for certifications and projects
// // // // interface Certification {
// // // //   name: string;
// // // //   issuer?: string;
// // // //   date?: string;
// // // //   description?: string;
// // // // }

// // // // interface Project {
// // // //   title: string;
// // // //   description?: string;
// // // //   technologies?: string[];
// // // //   date?: string;
// // // // }

// // // // export interface ResumeData {
// // // //   source: string;
// // // //   name?: string;
// // // //   tag?: string;
// // // //   email?: string;
// // // //   location?: string;
// // // //   number?: string;
// // // //   phone?: string;
// // // //   summary?: string;
// // // //   websites?: string[];
// // // //   website?: string;
// // // //   linkedin?: string;
// // // //   github?: string;
// // // //   skills?: string[];
// // // //   education?: string[];
// // // //   experience?: string[];
// // // //   student?: string[];
// // // //   courses?: string[];
// // // //   internships?: string[];
// // // //   extracurriculars?: string[];
// // // //   hobbies?: string[];
// // // //   references?: string[];
// // // //   languages?: string[];
// // // //   awards?: string[];
// // // //   extra?: string[];
// // // //   certifications?: Certification[];
// // // //   projects?: Project[];
// // // //   headerColor?: string;
// // // //   nameFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // // //   nameFontSize?: number;
// // // //   tagFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // // //   tagFontSize?: number;
// // // //   summaryFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// // // //   summaryFontSize?: number;
// // // //   image?: string;
// // // //   profileImage?: string | null;
// // // // }

// // // // export interface ResumeState {
// // // //   templateId: string | null;
// // // //   resumeData: ResumeData;
// // // //   setTemplateId: (id: string) => void;
// // // //   setResumeData: (data: Partial<ResumeData>) => void;
// // // // }

// // // // // Define a type for keys of ResumeData that are arrays
// // // // type ArrayFields = {
// // // //   [K in keyof ResumeData]: ResumeData[K] extends unknown[] | undefined ? K : never;
// // // // }[keyof ResumeData];

// // // // export const useResumeStore = create<ResumeState>((set) => ({
// // // //   templateId: null,
// // // //   resumeData: {
// // // //     name: "",
// // // //     tag: "",
// // // //     email: "",
// // // //     location: "",
// // // //     number: "",
// // // //     summary: "",
// // // //     websites: [],
// // // //     skills: [],
// // // //     education: [],
// // // //     experience: [],
// // // //     student: [],
// // // //     courses: [],
// // // //     internships: [],
// // // //     extracurriculars: [],
// // // //     hobbies: [],
// // // //     references: [],
// // // //     languages: [],
// // // //     awards: [],
// // // //     extra: [],
// // // //     certifications: [],
// // // //     projects: [],
// // // //     headerColor: "#a3e4db",
// // // //     nameFontStyle: "regular",
// // // //     nameFontSize: 18,
// // // //     tagFontStyle: "regular",
// // // //     tagFontSize: 14,
// // // //     summaryFontStyle: "regular",
// // // //     summaryFontSize: 12,
// // // //     image: "",
// // // //     profileImage: null,
// // // //   },
// // // //   setTemplateId: (id: string) => set({ templateId: id }),
// // // //   setResumeData: (data: Partial<ResumeData>) =>
// // // //     set((state) => {
// // // //       // Ensure arrays are properly initialized
// // // //       const newData: Partial<ResumeData> = { ...data };
// // // //       // Only include keys that are arrays in ResumeData
// // // //       const arrayFields: ArrayFields[] = [
// // // //         "websites",
// // // //         "skills",
// // // //         "education",
// // // //         "experience",
// // // //         "student",
// // // //         "courses",
// // // //         "internships",
// // // //         "extracurriculars",
// // // //         "hobbies",
// // // //         "references",
// // // //         "languages",
// // // //         "awards",
// // // //         "extra",
// // // //         "certifications",
// // // //         "projects",
// // // //       ];

// // // //       arrayFields.forEach((field) => {
// // // //         if (newData[field] !== undefined && !Array.isArray(newData[field])) {
// // // //           // Assign an empty array with the correct type based on the field
// // // //           if (field === "certifications") {
// // // //             newData[field] = [] as Certification[];
// // // //           } else if (field === "projects") {
// // // //             newData[field] = [] as Project[];
// // // //           } else {
// // // //             newData[field] = [] as string[];
// // // //           }
// // // //         }
// // // //       });

// // // //       return {
// // // //         resumeData: { ...state.resumeData, ...newData },
// // // //       };
// // // //     }),
// // // // }));


// // import { create } from "zustand";

// // export interface ResumeData {
// //   name?: string;
// //   tag?: string;
// //   email?: string;
// //   location?: string;
// //   number?: string;
// //   summary?: string;
// //   websites?: string[];
// //   skills?: string[];
// //   education?: string[]; // Changed to string[]
// //   experience?: string[]; // Changed to string[]
// //   student?: string[];
// //   courses?: string[];
// //   internships?: string[];
// //   extracurriculars?: string[];
// //   hobbies?: string[];
// //   awards?: string[]; // Added awards field
// //   references?: string[];
// //   languages?: string[];
// //   headerColor?: string;
// //   nameFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// //   nameFontSize?: number;
// //   tagFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// //   tagFontSize?: number;
// //   summaryFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
// //   summaryFontSize?: number;
// //   profileImage?: string | null;
// //   source?: "ai" | "user"; // Added source property
// // }

// // export interface ResumeState {
// //   templateId: string | null;
// //   resumeData: ResumeData;
// //   setTemplateId: (id: string) => void;
// //   setResumeData: (data: Partial<ResumeData>) => void;
// // }

// // export const useResumeStore = create<ResumeState>((set) => ({
// //   templateId: null,
// //   resumeData: {
// //     name: "",
// //     tag: "",
// //     email: "",
// //     location: "",
// //     number: "",
// //     summary: "",
// //     websites: [],
// //     skills: [],
// //     education: [],
// //     experience: [],
// //     student: [],
// //     courses: [],
// //     internships: [],
// //     extracurriculars: [],
// //     awards: [], // Initialize awards
// //     hobbies: [],
// //     references: [],
// //     languages: [],
// //     headerColor: "#a3e4db",
// //     nameFontStyle: "regular",
// //     nameFontSize: 18,
// //     tagFontStyle: "regular",
// //     tagFontSize: 14,
// //     summaryFontStyle: "regular",
// //     summaryFontSize: 12,
// //     profileImage: null,
// //   },
// //   setTemplateId: (id: string) => set({ templateId: id }),
// //   setResumeData: (data: Partial<ResumeData>) =>
// //     set((state) => ({
// //       resumeData: {
// //         ...state.resumeData,
// //         ...data,
// //         websites: Array.isArray(data.websites) ? data.websites : state.resumeData.websites,
// //         skills: Array.isArray(data.skills) ? data.skills : state.resumeData.skills,
// //         education: Array.isArray(data.education) ? data.education : state.resumeData.education,
// //         experience: Array.isArray(data.experience) ? data.experience : state.resumeData.experience,
// //         student: Array.isArray(data.student) ? data.student : state.resumeData.student,
// //         courses: Array.isArray(data.courses) ? data.courses : state.resumeData.courses,
// //         internships: Array.isArray(data.internships) ? data.internships : state.resumeData.internships,
// //         extracurriculars: Array.isArray(data.extracurriculars)
// //           ? data.extracurriculars
// //           : state.resumeData.extracurriculars,
// //         hobbies: Array.isArray(data.hobbies) ? data.hobbies : state.resumeData.hobbies,
// //         references: Array.isArray(data.references) ? data.references : state.resumeData.references,
// //         languages: Array.isArray(data.languages) ? data.languages : state.resumeData.languages,
// //       },
// //     })),
// // }));

// import { create } from "zustand";

// export interface ResumeData {
//   github: string;
//   image: string;
//   name?: string;
//   tag?: string;
//   email?: string;
//   location?: string;
//   number?: string;
//   summary?: string;
//   websites?: string[];
//   skills?: string[];
//   education?: string[];
//   experience?: string[];
//   student?: string[];
//   courses?: string[];
//   internships?: string[];
//   extracurriculars?: string[];
//   hobbies?: string[];
//   references?: string[];
//   languages?: string[];
//   awards?: string[]; // Added awards field
//   headerColor?: string;
//   nameFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
//   nameFontSize?: number;
//   tagFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
//   tagFontSize?: number;
//   summaryFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
//   summaryFontSize?: number;
//   profileImage?: string | null;
//   source?: "ai" | "user";
// }

// export interface ResumeState {
//   templateId: string | null;
//   resumeData: ResumeData;
//   setTemplateId: (id: string) => void;
//   setResumeData: (data: Partial<ResumeData>) => void;
// }

// export const useResumeStore = create<ResumeState>((set) => ({
//   templateId: null,
//   resumeData: {
//     name: "",
//     github: '',
//     image: "",
//     tag: "",
//     email: "",
//     location: "",
//     number: "",
//     summary: "",
//     websites: [],
//     skills: [],
//     education: [],
//     experience: [],
//     student: [],
//     courses: [],
//     internships: [],
//     extracurriculars: [],
//     hobbies: [],
//     references: [],
//     languages: [],
//     awards: [], // Initialize awards
//     headerColor: "#a3e4db",
//     nameFontStyle: "regular",
//     nameFontSize: 18,
//     tagFontStyle: "regular",
//     tagFontSize: 14,
//     summaryFontStyle: "regular",
//     summaryFontSize: 12,
//     profileImage: null,
//     source: "user",
//   },
//   setTemplateId: (id: string) => set({ templateId: id }),
//   setResumeData: (data: Partial<ResumeData>) =>
//     set((state) => ({
//       resumeData: {
//         ...state.resumeData,
//         ...data,
//         websites: Array.isArray(data.websites) ? data.websites : state.resumeData.websites,
//         skills: Array.isArray(data.skills) ? data.skills : state.resumeData.skills,
//         education: Array.isArray(data.education) ? data.education : state.resumeData.education,
//         experience: Array.isArray(data.experience) ? data.experience : state.resumeData.experience,
//         student: Array.isArray(data.student) ? data.student : state.resumeData.student,
//         courses: Array.isArray(data.courses) ? data.courses : state.resumeData.courses,
//         internships: Array.isArray(data.internships) ? data.internships : state.resumeData.internships,
//         extracurriculars: Array.isArray(data.extracurriculars)
//           ? data.extracurriculars
//           : state.resumeData.extracurriculars,
//         hobbies: Array.isArray(data.hobbies) ? data.hobbies : state.resumeData.hobbies,
//         references: Array.isArray(data.references) ? data.references : state.resumeData.references,
//         languages: Array.isArray(data.languages) ? data.languages : state.resumeData.languages,
//         awards: Array.isArray(data.awards) ? data.awards : state.resumeData.awards, // Handle awards
//         source: data.source ?? state.resumeData.source,
//       },
//     })),
// }));
import { create } from "zustand";

export interface ResumeData {
  github: string;
  image: string;
  projects: string[];
  extra: string[];
  phone?: string;
  name?: string;
  tag?: string;
  email?: string;
  location?: string;
  number?: string;
  summary?: string;
  websites?: string[];
  skills?: string[];
  education?: string[];
  experience?: string[];
  student?: string[];
  courses?: string[];
  internships?: string[];
  extracurriculars?: string[];
  hobbies?: string[];
  references?: string[];
  languages?: string[];
  awards?: string[];
  certifications?: string[];
  linkedin?: string;
  headerColor?: string;
  nameFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
  nameFontSize?: number;
  tagFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
  tagFontSize?: number;
  summaryFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
  summaryFontSize?: number;
  profileImage?: string | null;
  source?: "ai" | "user";
  
}

export interface ResumeState {
  templateId: string | null;
  resumeData: ResumeData;
  setTemplateId: (id: string) => void;
  setResumeData: (data: Partial<ResumeData>) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  templateId: null,
  resumeData: {
    name: "",
    github: "",
    image: "",
    projects: [],
    extra: [],
    tag: "",
    email: "",
    location: "",
    certifications: [],
    phone: "",
    number: "",
    summary: "",
    websites: [],
    linkedin: "",
    skills: [],
    education: [],
    experience: [],
    student: [],
    courses: [],
    internships: [],
    extracurriculars: [],
    hobbies: [],
    references: [],
    languages: [],
    awards: [],
    headerColor: "#a3e4db",
    nameFontStyle: "regular",
    nameFontSize: 18,
    tagFontStyle: "regular",
    tagFontSize: 14,
    summaryFontStyle: "regular",
    summaryFontSize: 12,
    profileImage: null,
    source: "user",
  },
  setTemplateId: (id: string) => set({ templateId: id }),
  setResumeData: (data: Partial<ResumeData>) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        ...data,
        websites: Array.isArray(data.websites) ? data.websites : state.resumeData.websites,
        skills: Array.isArray(data.skills) ? data.skills : state.resumeData.skills,
        education: Array.isArray(data.education) ? data.education : state.resumeData.education,
        experience: Array.isArray(data.experience) ? data.experience : state.resumeData.experience,
        student: Array.isArray(data.student) ? data.student : state.resumeData.student,
        courses: Array.isArray(data.courses) ? data.courses : state.resumeData.courses,
        internships: Array.isArray(data.internships) ? data.internships : state.resumeData.internships,
        extracurriculars: Array.isArray(data.extracurriculars)
          ? data.extracurriculars
          : state.resumeData.extracurriculars,
        hobbies: Array.isArray(data.hobbies) ? data.hobbies : state.resumeData.hobbies,
        references: Array.isArray(data.references) ? data.references : state.resumeData.references,
        languages: Array.isArray(data.languages) ? data.languages : state.resumeData.languages,
        awards: Array.isArray(data.awards) ? data.awards : state.resumeData.awards,
        github: data.github ?? state.resumeData.github,
        source: data.source ?? state.resumeData.source,
      },
    })),
}));

