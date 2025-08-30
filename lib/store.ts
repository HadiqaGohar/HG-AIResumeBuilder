
// import { create } from "zustand";

// export interface ResumeData {
//   github: string;
//   image: string;
//   projects: string[];
//   extra: string[];
//   phone?: string;
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
//   awards?: string[];
//   certifications?: string[];
//   linkedin?: string;
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
//     github: "",
//     image: "",
//     projects: [],
//     extra: [],
//     tag: "",
//     email: "",
//     location: "",
//     certifications: [],
//     phone: "",
//     number: "",
//     summary: "",
//     websites: [],
//     linkedin: "",
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
//     awards: [],
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
//         awards: Array.isArray(data.awards) ? data.awards : state.resumeData.awards,
//         github: data.github ?? state.resumeData.github,
//         source: data.source ?? state.resumeData.source,
//       },
//     })),
// }));

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  clearResumeData: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
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
            certifications: Array.isArray(data.certifications)
              ? data.certifications
              : state.resumeData.certifications,
            projects: Array.isArray(data.projects) ? data.projects : state.resumeData.projects,
            extra: Array.isArray(data.extra) ? data.extra : state.resumeData.extra,
            github: data.github ?? state.resumeData.github,
            linkedin: data.linkedin ?? state.resumeData.linkedin,
            source: data.source ?? state.resumeData.source,
          },
        })),
      clearResumeData: () => set({ resumeData: {} as ResumeData }),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        templateId: state.templateId,
        resumeData: state.resumeData,
      }),
    }
  )
);
