my-resume-builder/
├── app/
│   ├── api/
│   │   └── resume/
│   │       └── route.ts
│   ├── resume/
│   │   ├── customize/
│   │   │   └── [templateId]/
│   │   │       └── page.tsx
│   │   ├── preview/
│   │   │   └── [resumeId]/
│   │   │       └── page.tsx
│   ├── templates/
│   │   └── page.tsx
│   └── page.tsx
├── components/
│   ├── templates/
│   │   ├── Template1.tsx
│   │   └── Template2.tsx
│   └── ui/
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   └── store.ts
├── public/
│   └── fonts/
└── styles/
    └── globals.css




To build an AI-powered resume builder using Next.js, OpenAI Agents SDK, and a focus on a simple yet professional design with multiple templates, here’s a detailed path outlining the steps, tools, and pages required. The goal is to create a user-friendly application where users select a template, provide minimal input (name, education, skills) through AI-guided prompts or selections, and generate an editable, downloadable resume with minimal manual typing. The design will be inspired by Canva’s simplicity and professionalism, with pre-built options for education, skills, and other sections to streamline the process.

### Path to Build the AI Resume Builder

#### 1. Project Setup and Tools
**Tools Required:**
- **Frontend**: Next.js (v14 or v15 for modern features like App Router, React Server Components) for building a responsive, SEO-friendly interface.
- **AI Integration**: OpenAI Agents SDK for AI-driven content generation (e.g., resume summaries, bullet points) and prompting users for input. Alternatively, OpenAI API (e.g., GPT-4) can be used if the Agents SDK is not fully suitable.
- **Styling**: Tailwind CSS for rapid, responsive, and customizable design. Use a UI library like ShadcnUI or Ant Design for pre-built components (buttons, modals, forms).
- **Backend**: Next.js API routes for handling OpenAI API calls and resume data processing. Optionally, use Firebase Firestore or MongoDB for user data storage (if users need to save resumes).
- **PDF Generation**: jsPDF or pdf-lib for generating downloadable PDF resumes.
- **State Management**: React Context or Zustand for managing resume data (e.g., user inputs, selected template).
- **Authentication (Optional)**: NextAuth.js for user login to save resumes (if needed).
- **Environment Variables**: Store OpenAI API keys securely using `.env.local`.
- **Deployment**: Vercel for hosting the Next.js app, as it integrates seamlessly with Next.js.

**Setup Steps:**
- Initialize a Next.js project: `npx create-next-app@latest my-resume-builder`.
- Install dependencies: `npm install tailwindcss @tailwindcss/typography @ai-sdk/openai jsPDF axios zustand`.
- Set up Tailwind CSS and ShadcnUI/Ant Design for styling.
- Configure OpenAI API keys in `.env.local` and initialize the OpenAI SDK.
- Set up a basic project structure with the App Router (`app/` directory).

#### 2. Pages Required
To keep the application simple and functional, you’ll need the following pages in the Next.js app:

1. **Landing Page (`app/page.tsx`)**
   - Purpose: Entry point with a brief introduction and a prominent "Generate Resume" button.
   - Features: Displays a hero section with a call-to-action (CTA) button linking to the template selection page.
   - Design: Minimal, clean layout with Tailwind CSS, showcasing a professional vibe like Canva.

2. **Template Selection Page (`app/templates/page.tsx`)**
   - Purpose: Displays 10 professional resume templates for user selection.
   - Features: Grid layout showing 10 template previews (e.g., modern, classic, creative). Each template is clickable, leading to the customization page.
   - Design: Use Tailwind CSS for a responsive grid. Templates should be ATS-friendly (simple layouts, no excessive graphics).

3. **Resume Customization Page (`app/resume/customize/[templateId]/page.tsx`)**
   - Purpose: AI-guided interface for users to input personal details and customize the resume.
   - Features:
     - AI prompts users with questions (e.g., “What’s your name?”, “What’s your education level?”) using OpenAI Agents SDK.
     - Pre-built selection options for education (e.g., HSC, School, BS, MS) and skills (e.g., Python, Communication, Leadership) displayed as clickable divs/buttons to minimize typing.
     - Real-time preview of the resume based on the selected template.
     - Editable fields for personal details (name, email, phone) with minimal manual input.
     - AI generates professional summaries, bullet points, and tailored content based on user selections.
   - Design: Split-screen layout (left: input form with AI prompts; right: live preview of the resume).

4. **Resume Overview Page (`app/resume/preview/[resumeId]/page.tsx`)**
   - Purpose: Displays the final resume with options to edit or download.
   - Features:
     - Full preview of the generated resume.
     - Edit button to return to the customization page for tweaks.
     - Download button to export the resume as a PDF using jsPDF.
     - Optional: Shareable link for the resume (if using a backend like Firestore).
   - Design: Clean, professional layout matching the selected template, with buttons for editing/downloading.

**Total Pages**: 4 (Landing, Template Selection, Resume Customization, Resume Overview).

#### 3. Development Path
**Step 1: Design 10 Resume Templates**
- Create 10 ATS-friendly resume templates using Tailwind CSS. Each template should have:
  - A distinct layout (e.g., single-column, two-column, minimal, modern).
  - Consistent typography (e.g., professional fonts like Roboto, Open Sans).
  - Sections for personal info, summary, education, skills, and experience.
- Store templates as JSON objects or React components in `components/templates/`.
- Ensure templates are customizable (e.g., colors, fonts, spacing) via Tailwind classes.
- Example: Template 1 (Minimal): Single-column, black-and-white, clean fonts. Template 2 (Modern): Two-column, subtle color accents.

**Step 2: Build the Landing Page**
- Create a simple landing page with a hero section (title, subtitle, "Generate Resume" button).
- Use Tailwind CSS for styling and ShadcnUI for the button.
- Link the button to the template selection page (`/templates`).

**Step 3: Implement Template Selection**
- Create a grid layout displaying 10 template thumbnails.
- Each thumbnail is a clickable card that navigates to `/resume/customize/[templateId]` with the selected template ID.
- Store the selected template ID in React Context/Zustand for use in the customization page.

**Step 4: Develop the Resume Customization Page**
- **AI Integration**:
  - Use OpenAI Agents SDK to prompt users for input (e.g., “Enter your name”, “Select your education: HSC, BS, MS”).
  - Display education and skills as clickable divs (e.g., `<div>HSC</div>`, `<div>Python</div>`) using ShadcnUI buttons or cards.
  - Send user selections to OpenAI API to generate professional summaries, bullet points, and tailored content.
  - Example prompt: “Generate a resume summary for a [selected education] graduate with skills in [selected skills].”
- **Form Design**:
  - Left panel: Form with AI-driven prompts and clickable options for education (HSC, BS, MS), skills (Python, Leadership), and experience levels.
  - Right panel: Real-time preview of the resume using the selected template, updated as users make selections.
  - Use React Context/Zustand to manage form state (name, education, skills).
- **Validation**: Ensure required fields (e.g., name, education) are filled before proceeding.

**Step 5: Create the Resume Overview Page**
- Display the final resume with the selected template, populated with AI-generated content.
- Add buttons for:
  - Edit: Redirects to the customization page to modify selections.
  - Download: Use jsPDF to generate a PDF of the resume.
- Ensure the resume is ATS-friendly (plain text, no images, standard fonts).

**Step 6: Backend and API Integration**
- Use Next.js API routes (`app/api/resume/route.ts`) to handle OpenAI API calls.
- Example: POST request to send user selections (education, skills) and receive AI-generated content.
- Optional: Integrate Firebase Firestore or MongoDB to save user resumes for logged-in users.
- Secure API keys using `.env.local`.

**Step 7: Testing and Optimization**
- Test the app for responsiveness (mobile, tablet, desktop) using Tailwind’s responsive classes.
- Ensure AI-generated content is professional and ATS-friendly.
- Test PDF downloads for formatting consistency across templates.
- Optimize performance using Next.js features like static generation or server-side rendering.

**Step 8: Deployment**
- Deploy to Vercel: `vercel --prod`.
- Set up environment variables for OpenAI API keys on Vercel.
- Test the deployed app for functionality and performance.

#### 4. User Flow
1. User lands on the homepage and clicks “Generate Resume.”
2. User is taken to the template selection page, chooses one of 10 templates.
3. User is redirected to the customization page, where AI prompts for name, education, and skills via clickable options (e.g., HSC, BS, Python).
4. AI generates a professional resume with a summary, education, and skills sections based on selections.
5. User sees a live preview, makes minor edits if needed, and proceeds to the overview page.
6. On the overview page, user reviews the final resume, edits if necessary, and downloads it as a PDF.

#### 5. Design Considerations
- **Simplicity**: Use Canva-inspired clean, professional aesthetics with minimal colors and clear typography.
- **Template Variety**: Ensure templates cater to different industries (e.g., tech, finance, creative) while remaining ATS-friendly.
- **AI Interaction**: Minimize user typing by providing clickable options for common fields (e.g., education: HSC, BS; skills: Python, Leadership).
- **Editable**: Allow users to tweak AI-generated content (e.g., summary, bullet points) via text inputs if needed.
- **Downloadable**: Ensure PDF exports are high-quality and match the previewed design.

#### 6. Challenges and Solutions
- **Challenge**: AI-generated content may not always be accurate or relevant.
  - **Solution**: Fine-tune OpenAI prompts to focus on professional, industry-specific language. Allow users to regenerate or edit content.
- **Challenge**: Ensuring templates are ATS-friendly.
  - **Solution**: Avoid complex graphics, use standard fonts, and test templates with ATS parsers.
- **Challenge**: Managing state across pages.
  - **Solution**: Use Zustand for lightweight state management to store template ID, user inputs, and resume data.

#### 7. Future Enhancements (Optional)
- Add user authentication (NextAuth.js) to save resumes.
- Integrate a job description analyzer to tailor resumes to specific job postings.
- Add cover letter generation using the same AI prompts.
- Support multiple languages for resume content using OpenAI’s translation capabilities.

### Summary of Pages and Tools
- **Pages**: 4 (Landing, Template Selection, Resume Customization, Resume Overview).
- **Tools**: Next.js, OpenAI Agents SDK, Tailwind CSS, ShadcnUI/Ant Design, jsPDF, React Context/Zustand, Vercel.
- **Focus**: Simple, professional design with AI-driven prompts, clickable options for minimal typing, and editable/downloadable resumes.

This path ensures a streamlined development process, delivering a Canva-like experience with a focus on user simplicity and professional output. For further details on pricing or OpenAI API integration, check https://x.ai/api.[](https://www.canva.com/ai-resume-builder/)[](https://github.com/vercel/ai)    













mojhe ek ai resume builder bnana he using nextjs openai-agents sdk gewith simple resume design 10 template user select any one and start working , ai ask what's your education your name and create resume perfect professional like canva give me path i have landing page only where one button generate resume make sure ai khod option de user ko kam na karna parhy wo bas edution select kary skills select kary sara kam selection ho bas nameing wgahera jo uski personal he wo usko lkni parhy resume overview and resume editable downloadable ho nextjs frontend simple hoe many pages are required ??? dont't giv eme code i want path and tools recently design multiple design when i click one design deisgn show properly then i click custumaize design so ai ask question and inside teplate user ko type na karna parhy sab ke prompt ho jese HSC School BS  sab ke div ho user click akry aur wo add hojay 











<!-- ..................... -->Mera plan he ke koi bhi shaks agar template par ay to select template akrny par us ke pass 2 option hon samjh lo ek card jis me likhe ho ke new cv generete karni he ya excesting  to us ke pass 2 option hon ek upload resume wo apna porana resume upload kary to , jo template usne select kari hen us me upload hony waly resume ki detail auto matic add ho jay ye kam bhaly tu openai agents sdk se karwalo jo ke already summary ke liye design hoa he , sara old data khod input me a jay user bas previw button par click kary preview show ho aur phir download button to he hi, sab se pehly me openaiagents sdk ka code de rhi hon taky agar tumhen use karna ho to  backend code make sure karo model config external client dotenv ho mere pass gemini api key he import os
from datetime import datetime
from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from notion_client import Client, errors # Import errors from notion_client
import pymysql.cursors
import json
import pdfplumber
from openai import OpenAI
from agents import Agent, Runner, AsyncOpenAI, OpenAIChatCompletionsModel, RunConfig
from pathlib import Path

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# --- CORS Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-vercel-app.vercel.app"],  # Replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Environment Variable Loading ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# --- AI Agent Initialization (Gemini via OpenAI SDK compatibility) ---
external_client = AsyncOpenAI(
    api_key=GEMINI_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

model = OpenAIChatCompletionsModel(
    openai_client=external_client,
    model="gemini-2.0-flash",
)

config = RunConfig(
    model=model,
    model_provider=external_client,
    tracing_disabled=True,
)

# Pydantic model for request body
class ResumeInput(BaseModel):
    education: list[str]
    skills: list[str]
    # extra: list[str]
    # student: list[str]
    # experience: list[str]
    # language: list[str]
    # award: list[str]




@app.post("/api/resume")
async def generate_resume_summary(input_data: ResumeInput):
    try:
        # Convert lists to comma-separated strings for the prompt
        education_str = ", ".join(input_data.education)
        skills_str = ", ".join(input_data.skills)
        # extra_str = ", ".join(input_data.extra)
        # student_str = ", ".join(input_data.student)
        # experiene_str = ", ".join(input_data.experience)
        # language_str = ", ".join(input_data.language)
        # award_str = ", ".join(input_data.award)

        # Call Gemini model via OpenAI SDK compatibility
        response = await external_client.chat.completions.create(
            model="gemini-2.0-flash",
            messages=[
                {
                    "role": "user",
                    "content": f"Generate a professional resume summary for a candidate with education: {education_str} and skills: {skills_str}. Keep it concise, professional, and ATS-friendly. Limit to 3-4 sentences."
                }
            ]
        )

        summary = response.choices[0].message.content or ""
        return {"summary": summary}

    except Exception as e:
        print(f"Error generating resume summary: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate summary: {str(e)}")

@app.get("/")
async def root():
    return {"message": "FastAPI resume backend with Gemini is running."} ab template me jo selet button he wahn click akrny par jo mene uepr option baten hen ke resume new create karna he ja excesting use karna he wo show ho 'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useResumeStore } from '../../../lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/app/components/ui/card';
import { Button } from '../components/ui/button';

// Templates array with isPro flag
const templates = [
  {
    id: '1',
    name: 'Chameleon Pro Resume',
    description: 'Clean, ATS-friendly design with customizable colors to match your personal brand.',
    image: '/Template/template1.png',
    isPro: true,
  },
  {
    id: '2',
    name: 'Modern',
    description: 'Two-column, professional layout',
    image: '/Template/template2.png',
    isPro: true,
  },
  {
    id: '3',
    name: 'Elegant',
    description: 'Subtle colors with strong typography',
    image: '/images/templates/template3.png',
    isPro: false,
  },
  {
    id: '4',
    name: 'Bold',
    description: 'High contrast and modern layout',
    image: '/images/templates/template4.png',
    isPro: false,
  },
  {
    id: '5',
    name: 'Compact',
    description: 'Space-saving, ideal for 1-page resumes',
    image: '/images/templates/template5.png',
    isPro: false,
  },
  {
    id: '6',
    name: 'Creative',
    description: 'For design-heavy resumes',
    image: '/images/templates/template6.png',
    isPro: false,
  },
  {
    id: '7',
    name: 'Classic',
    description: 'Traditional format, safe for all roles',
    image: '/images/templates/template7.png',
    isPro: false,
  },
  {
    id: '8',
    name: 'Tech',
    description: 'Ideal for developers and engineers',
    image: '/images/templates/template8.png',
    isPro: false,
  },
  {
    id: '9',
    name: 'Functional',
    description: 'Highlights skills over chronology',
    image: '/images/templates/template9.png',
    isPro: false,
  },
  {
    id: '10',
    name: 'Executive',
    description: 'Clean with subtle sophistication',
    image: '/images/templates/template10.png',
    isPro: false,
  },
];

export default function Templates() {
  const { setTemplateId } = useResumeStore();

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
        <span className="text-6xl">C</span>hoose <span className="text-6xl">Y</span>our <span className="text-6xl">R</span>esume <span className="text-6xl">T</span>emplate<span className="text-6xl">!</span>
      </h2>
      <hr className="mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="transition-shadow hover:shadow-xl hover:border-blue-500 bg-white"
          >
            <div className="relative w-full h-[430px] rounded-t-md overflow-hidden">
              <Image
                src={template.image}
                alt={template.name}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />

              {template.isPro && (
                <div className="absolute bottom-2 right-2 bg-[#6e0d25] w-7 h-7 flex items-center justify-center rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#f7c948"
                    className="w-6 h-6"
                  >
                    <path d="M12 3l2.39 4.85 5.34.78-3.87 3.77.91 5.33L12 15.77l-4.77 2.51.91-5.33-3.87-3.77 5.34-.78L12 3z" />
                  </svg>
                </div>
              )}
            </div>

            <CardHeader className="border-none pb-0 mt-4">
              <CardTitle className="text-xl text-gray-900 text-center flex">
                <div className="bg-yellow-400 mt-2 w-[12px] h-[12px] rounded-full border"></div>
                <span className="ml-2">{template.name}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-2 text-center">
              <p className="text-gray-700">{template.description}</p>
              <Link href={`/resume/customize/${template.id}`}>
                <Button
                  className="mt-4 w-full"
                  onClick={() => setTemplateId(template.id)}
                >
                  Select Template
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} mene abhi tak template 1 hi bnai he baki demo he ye store he// lib/store.ts
import { create } from 'zustand';

export interface ResumeState {
  templateId: string | null;
  resumeData: {
    profession: string;
    name: string;
    email: string;
    location: string;
    number: string;
    websites: string[];
    image: string;
    links: string[];
    extra: string[];
    education: string[];
    student: string[];
    experience: string[];
    languages: string[];
    awards: string[];
    skills: string[];
    summary: string;
    headerColor: string;
    skillsColor: string; // Color for Top Skills
    nameFontStyle: 'regular' | 'bold' | 'italic' | 'bold-italic';
    nameFontSize: number;
    summaryFontStyle: 'regular' | 'bold' | 'italic' | 'bold-italic';
    summaryFontSize: number;
    courses: string[];
    internships: string[];
    extracurriculars: string[];
    hobbies: string[];
    references: string[];
  };
  setTemplateId: (id: string) => void;
  setResumeData: (data: Partial<ResumeState['resumeData']>) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  templateId: null,
  resumeData: {
    name: '',
    email: '',
    location: '',
    number: '',
    websites: [],
    image: '',
    links: [],
    extra: [],
    education: [],
    student: [],
    experience: [],
    languages: [],
    awards: [],
    skills: [],
    summary: '',
    headerColor: '#aad6f2',
    skillsColor: '', // Default empty, can be set later
    nameFontStyle: 'regular',
    nameFontSize: 18,
    summaryFontStyle: 'regular',
    summaryFontSize: 12,
    courses: [''],
    internships: [''],
    extracurriculars: [''],
    hobbies: [''],
    references: [''],
    profession: ''
  },
  setTemplateId: (id) => set({ templateId: id }),
  setResumeData: (data) =>
    set((state) => ({
      resumeData: { ...state.resumeData, ...data },
    })),
})); ye sari input fields he hen agar user new select kary to yahn input add akrna parhy agar user pdf uplaod kary to pdf me mojood cheezon ke hisab se automatic fil hojay // src/app/resume/customize/[templateid]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useResumeStore } from "../../../../../lib/store";
import { Button } from "../../../components/ui/button";
import Template1 from "../../../components/templates/Template1";
import Template2 from "../../../components/templates/Template2";
import axios from "axios";

// Import constants from resumeConstants.ts
import {
  professionTypes,
  skillByProfession,
  workingOptions,
  studentOptions,
  educationLevels,
  languages,
  predefinedColors,
} from "../../../../../lib/resumeConstants";


export default function Customize({
  params,
}: {
  params: { templateId: string };
}) {
  const { templateId, resumeData, setResumeData } = useResumeStore();

  const [name, setName] = useState(resumeData.name || "");
  const [email, setEmail] = useState(resumeData.email || "");
  const [location, setLocation] = useState(resumeData.location || "");
  const [number, setNumber] = useState(resumeData.number || "");
  const [websites, setWebsites] = useState(resumeData.websites || [""]);
  const [customColor, setCustomColor] = useState(""); // State for custom color input
  const [selectedProfession, setSelectedProfession] = useState("");
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // New state for font styles and sizes
  const fontStyles = ["regular", "bold", "italic", "bold-italic"];
  const fontSizes = [10, 12, 14, 16, 18, 20, 24, 28, 32]; // Options for font size

  const handleColorSelect = (color: string) => {
    setResumeData({ headerColor: color });
    setCustomColor(""); // Clear custom color input when a predefined color is selected
  };
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    // Validate hex color (basic validation)
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      setResumeData({ headerColor: color });
    }
  };

  useEffect(() => {
    setName(resumeData.name || "");
    setEmail(resumeData.email || "");
    setLocation(resumeData.location || "");
    setNumber(resumeData.number || "");

    // setWebsite(resumeData.website || "");

    setWebsites(resumeData.websites.length > 0 ? resumeData.websites : [""]);
    setSelectedSkills(resumeData.skills || []);
  }, [resumeData]);

  useEffect(() => {
    const skills = skillByProfession[selectedProfession] || [];
    setAvailableSkills(skills);
    setSelectedSkills([]); // Reset selected skills when profession changes
  }, [selectedProfession]);

  const handleSkillChange = (skill: string) => {
    const updatedSkills = resumeData.skills.includes(skill)
      ? resumeData.skills.filter((item) => item !== skill)
      : [...resumeData.skills, skill];
    setSelectedSkills(updatedSkills); // Update local state
    setResumeData({ skills: updatedSkills }); // Update global state
  };

  useEffect(() => {
    const skills = skillByProfession[selectedProfession] || [];
    console.log(
      "Selected Profession:",
      selectedProfession,
      "Available Skills:",
      skills
    );
    setAvailableSkills(skills);
    setSelectedSkills([]); // Reset selected skills when profession changes
  }, [selectedProfession]);

  const handleEducation = (edu: string) => {
    const updatedEducation = resumeData.education.includes(edu)
      ? resumeData.education.filter((item) => item !== edu)
      : [...resumeData.education, edu];
    setResumeData({ education: updatedEducation });
  };

  const handleExperience = (exp: string) => {
    const updatedExperience = resumeData.experience.includes(exp)
      ? resumeData.experience.filter((item) => item !== exp)
      : [...resumeData.experience, exp];
    setResumeData({ experience: updatedExperience });
  };

  const handleStudent = (stu: string) => {
    const updatedStudent = resumeData.student.includes(stu)
      ? resumeData.student.filter((item) => item !== stu)
      : [...resumeData.student, stu];
    setResumeData({ student: updatedStudent });
  };

  const handleSkillSelect = (skill: string) => {
    const updatedSkills = resumeData.skills.includes(skill)
      ? resumeData.skills.filter((item) => item !== skill)
      : [...resumeData.skills, skill];
    setResumeData({ skills: updatedSkills });
  };

  const handleWebsiteChange = (index: number, value: string) => {
    const updatedWebsites = [...websites];
    updatedWebsites[index] = value;
    setWebsites(updatedWebsites);
    setResumeData({ websites: updatedWebsites.filter((w) => w.trim() !== "") });
  };

  const addWebsiteField = () => {
    setWebsites([...websites, ""]);
  };

  const removeWebsiteField = (index: number) => {
    const updatedWebsites = websites.filter((_, i) => i !== index);
    setWebsites(updatedWebsites.length > 0 ? updatedWebsites : [""]);
    setResumeData({
      websites: updatedWebsites.filter((w) => w.trim() !== ""),
    });
  };

  const generateSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/resume", {
        education: resumeData.education,
        skills: resumeData.skills,
      });
      const data = response.data as { summary: string };
      setResumeData({ summary: data.summary });
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setError("Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    router.push(`/resume/preview/${templateId}`);
  };

  const TemplateComponent = templateId === "1" ? Template1 : Template2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col md:flex-row p-4 md:p-8 gap-8">
      {/* Left Panel: Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 border-2 bg-white rounded-2xl shadow-xl p-6 md:p-8"
        role="form"
        aria-label="Resume customization form"
      >
        <h2 className="text-3xl md:text-4xl mt-6 font-bold text-gray-800 mb-4 text-center">
          Build Your Professional Resume
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Customize your resume with ease and preview it in real-time.
        </p>
        <hr className="mb-4" />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-700 p-3 rounded-lg mb-4"
            role="alert"
          >
            {error}
          </motion.div>
        )}

        {/* Name Input with Font Style and Size */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setResumeData({ name: e.target.value });
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your full name"
            aria-required="true"
          />
          <div className="flex gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Style
              </label>
              <select
                value={resumeData.nameFontStyle}
                onChange={(e) =>
                  setResumeData({
                    nameFontStyle: e.target.value as
                      | "regular"
                      | "bold"
                      | "italic"
                      | "bold-italic",
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {fontStyles.map((style) => (
                  <option key={style} value={style}>
                    {style.charAt(0).toUpperCase() +
                      style.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <select
                value={resumeData.nameFontSize}
                onChange={(e) =>
                  setResumeData({ nameFontSize: parseInt(e.target.value) })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Your Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setResumeData({ email: e.target.value });
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your Email"
            aria-required="true"
          />
        </div>

        {/* Number */}
        <div className="mb-6">
          <label
            htmlFor="number"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Your Contact Number
          </label>
          <input
            id="number"
            type="text"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              setResumeData({ number: e.target.value });
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your Phone Number"
            aria-required="false"
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label
            htmlFor="location"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Your Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setResumeData({ location: e.target.value });
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your Location"
            aria-required="true"
          />
        </div>

        {/* Website , Portfolios */}

        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Websites, Portfolios or Social Links
          </label>
          {websites.map((website, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={website}
                onChange={(e) => handleWebsiteChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter a website or portfolio link"
                aria-label={`Website or portfolio link ${index + 1}`}
              />
              {websites.length > 1 && (
                <Button
                  variant="destructive"
                  onClick={() => removeWebsiteField(index)}
                  className="px-3 py-2"
                  aria-label={`Remove website field ${index + 1}`}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            onClick={addWebsiteField}
            // className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            className="bg-yellow-300 rounded-full text-black px-8 py-3  border-2 hover:bg-violet-500 mt-2"
            aria-label="Add another website field"
          >
            Add More
          </Button>
        </div>

        {/* Profile Picture Upload and Color Picker */}

        <div className="mb-6 border p-4 rounded-2xl">
          
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            
            Upload Profile Picture
            
          </label>
          <hr />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setResumeData({ image: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="block w-full text-sm text-gray-500 my-3
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {resumeData.image && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <img
                src={resumeData.image}
                alt="Profile Preview"
                className="h-32 w-32 object-cover rounded-full border"
              />
              <Button
                variant="destructive"
                onClick={() => setResumeData({ image: "" })}
                className="px-4 py-2"
                aria-label="Remove profile image"
              >
                Remove Image
              </Button>
            </div>
          )}
          <hr />

          {/* Color Picker */}

          <div className="mt-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Select Header Color
            </label>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    resumeData.headerColor === color
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={customColor}
                onChange={handleCustomColorChange}
                placeholder="#FFFFFF"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                aria-label="Enter custom hex color"
              />
              <div
                className="w-10 h-10 rounded-full border"
                style={{
                  backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(customColor)
                    ? customColor
                    : "#ffffff",
                }}
              />
            </div>
            {customColor && !/^#[0-9A-Fa-f]{6}$/.test(customColor) && (
              <p className="text-red-500 text-sm mt-2">
                Please enter a valid hex color (e.g., #FFFFFF).
              </p>
            )}
          </div>
        </div>

        {/* Work Experience */}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Work Experience
          </h2>
          <p className="text-gray-600 mb-3">
            Select your experience level to tailor your resume.
          </p>
          <div className="flex flex-wrap gap-2">
            {workingOptions.map((exp) => (
              <Button
                key={exp}
                variant={
                  resumeData.experience.includes(exp) ? "default" : "outline"
                }
                onClick={() => handleExperience(exp)}
                className={`transition-all duration-300 ${
                  resumeData.experience.includes(exp)
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white hover:bg-blue-50 text-gray-700 border-gray-300"
                } rounded-lg px-4 py-2`}
                aria-pressed={resumeData.experience.includes(exp)}
              >
                {exp}
              </Button>
            ))}
          </div>
        </div>

        {/* Student Status */}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Are You a Student?
          </h2>
          <p className="text-gray-600 mb-3">
            Highlight your academic achievements if applicable.
          </p>
          <div className="flex flex-wrap gap-2">
            {studentOptions.map((stu) => (
              <Button
                key={stu}
                variant={
                  resumeData.student.includes(stu) ? "default" : "outline"
                }
                onClick={() => handleStudent(stu)}
                className={`transition-all duration-300 ${
                  resumeData.student.includes(stu)
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white hover:bg-blue-50 text-gray-700 border-gray-300"
                } rounded-lg px-4 py-2`}
                aria-pressed={resumeData.student.includes(stu)}
              >
                {stu}
              </Button>
            ))}
          </div>
        </div>

        {/* Education Level */}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Education Level
          </h2>
          <p className="text-gray-600 mb-3">
            Choose the option that best describes your education.
          </p>
          <div className="flex flex-wrap gap-2">
            {educationLevels.map((edu) => (
              <Button
                key={edu}
                variant={
                  resumeData.education.includes(edu) ? "default" : "outline"
                }
                onClick={() => handleEducation(edu)}
                className={`transition-all duration-300 ${
                  resumeData.education.includes(edu)
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white hover:bg-blue-50 text-gray-700 border-gray-300"
                } rounded-lg px-4 py-2`}
                aria-pressed={resumeData.education.includes(edu)}
              >
                {edu}
              </Button>
            ))}
          </div>
        </div>

        {/* Languages */}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Languages
          </h2>
          <p className="text-gray-600 mb-3">
            Select the languages you are proficient in.
          </p>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Button
                key={lang}
                className=""
                variant={
                  resumeData.languages.includes(lang) ? "default" : "outline"
                }
                onClick={() => {
                  const updatedLanguages = resumeData.languages.includes(lang)
                    ? resumeData.languages.filter((item) => item !== lang)
                    : [...resumeData.languages, lang];
                  setResumeData({ languages: updatedLanguages });
                }}
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>

        {/* Profession , Skills */}

        <div className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold">Choose Your Profession</h2>

          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Profession --</option>
            {professionTypes.map((prof) => (
              <option key={prof} value={prof}>
                {prof}
              </option>
            ))}
          </select>

          {availableSkills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Select Relevant Skills:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availableSkills.map((skill) => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={resumeData.skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {resumeData.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mt-4">Selected Skills:</h3>
              <ul className="list-disc pl-6 text-sm text-gray-700">
                {resumeData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* ----------------------------------------------------- */}

        {/* Summary with Font Style and Size */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Summary
          </label>
          <textarea
            value={resumeData.summary}
            onChange={(e) => setResumeData({ summary: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter or generate your summary"
            rows={4}
          />
          <div className="flex gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Style
              </label>
              <select
                value={resumeData.summaryFontStyle}
                onChange={(e) =>
                  setResumeData({
                    summaryFontStyle: e.target.value as
                      | "regular"
                      | "bold"
                      | "italic"
                      | "bold-italic",
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {fontStyles.map((style) => (
                  <option key={style} value={style}>
                    {style.charAt(0).toUpperCase() +
                      style.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <select
                value={resumeData.summaryFontSize}
                onChange={(e) =>
                  setResumeData({ summaryFontSize: parseInt(e.target.value) })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------ */}

        {/* Action Buttons */}

        <div className="flex gap-4 justify-center mt-10">
          <Button
            onClick={generateSummary}
            disabled={isLoading}
            // className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 disabled:opacity-50"
            className="bg-white rounded-full text-black px-8 py-3  border-2 hover:bg-[#ebedff] mt-2"
            aria-label="Generate resume summary"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Summary"
            )}
          </Button>
          <Button
            onClick={handleSubmit}
            // className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
            className="bg-yellow-300 rounded-full text-black px-8 py-3  border-2 hover:bg-violet-500 mt-2"
            aria-label="Preview resume"
          >
            Preview Resume
          </Button>
        </div>
      </motion.div>

      {/* Right Panel: Preview */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 bg-white border-2 rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="flex">
          <div className="bg-green-400 mt-2 w-[15px] h-[15px] rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 ml-4">
            Live Preview
          </h2>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <TemplateComponent resumeData={resumeData} />
        </div>
      </motion.div>
    </div>
  );
}
input field yhn save ho rhi he 'use client';
// src/app/resume/preview/[resumeid]/page.tsx
import { useResumeStore } from '../../../../../lib/store';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import Template1 from '../../../components/templates/Template1';
import Template2 from '../../../components/templates/Template2';
import ResumePDF from '../../../components/pdf/ResumePDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

export default function Preview({ params }: { params: { resumeId: string } }) {
  const { templateId, resumeData } = useResumeStore();
  const router = useRouter();

  const TemplateComponent = templateId === '1' ? Template1 : Template2;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
          Resume Preview
        </h1>
        <div
          id="resume-to-download"
          className="bg-white shadow-lg rounded-lg p-4 sm:p-6"
          style={{ maxWidth: '210mm', minHeight: '297mm' }} // A4 size
        >
          <TemplateComponent resumeData={resumeData} />
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push(`/resume/customize/${templateId}`)}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
          >
            Edit
          </Button>
          <PDFDownloadLink
            document={<ResumePDF resumeData={resumeData} />}
            fileName={`${resumeData.name || 'resume'}.pdf`}
            className="w-full sm:w-auto"
          >
            {({ loading }) => (
              <Button
                disabled={loading}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
              >
                {loading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
ab ye template 1 ka design he import Link from "next/link";
import { ResumeState } from "../../../../lib/store";
import Image from "next/image";

interface TemplateProps {
  resumeData: ResumeState["resumeData"];
}

export default function Template1({ resumeData }: TemplateProps) {
  // Helper function to determine font styles
  const getFontStyles = (style: string) => {
    switch (style) {
      case "bold":
        return { fontWeight: "bold" };
      case "italic":
        return { fontStyle: "italic" };
      case "bold-italic":
        return { fontWeight: "bold", fontStyle: "italic" };
      default:
        return {};
    }
  };
  return (
    <div className="flex min-h-screen font-sans text-sm">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#2c2c2c] text-white p-6 flex flex-col justify-start">
        {resumeData.image && (
          <div className="w-32 h-32 rounded-full bg-gray-400 mx-auto mb-4">
            <Image
              src={resumeData.image}
              alt="Profile"
              width={96}
              height={96}
              className="w-[130px] h-[130px] rounded-full object-cover mb-4"
            />
          </div>
        )}

        {resumeData.number || resumeData.email || resumeData.location ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <div className="text-left mb-4 text-xs">
              {resumeData.number && <p>Phone Number: {resumeData.number}</p>}
              {resumeData.email && <p>Email: {resumeData.email}</p>}
              {resumeData.location && <p>Location: {resumeData.location}</p>}
            </div>
            <hr className="border-gray-500 my-4" />
          </>
        ) : null}

        {resumeData.websites.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Websites, Portfolios</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="space-y-1 list-disc pl-5 text-xs">
              {resumeData.websites.map((web: string, idx: number) => (
                <li key={idx}>
                  <a
                    href={web.trim()}
                    className="text-blue-300 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {web.trim() || "Website"}
                  </a>
                </li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}
        
        {resumeData.languages.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Languages</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="list-disc pl-5 text-xs">
              {resumeData.languages.map((lang: string, idx: number) => (
                <li key={idx}>{lang}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

        {resumeData.education.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.education.map((edu: string, idx: number) => (
                <li key={idx}>{edu}</li>
              ))}
            </ul>
            <hr className="border-gray-500 my-4" />
          </>
        )}

        {resumeData.student.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Is Student?</h3>
            <hr className="-mt-2 text-gray-700 mb-3" />
            <ul className="pl-5 list-disc text-xs">
              {resumeData.student.map((stu: string, idx: number) => (
                <li key={idx}>{stu}</li>
              ))}
            </ul>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white ">
        <div
          className="h-[150px] w-full flex items-center text-center"
          style={{ backgroundColor: resumeData.headerColor || "#aad6f2" }}
        >
          <h2
            className="text-3xl ml-8 font-medium text-black uppercase"
            style={{
              fontSize: `${resumeData.nameFontSize}px`,
              ...getFontStyles(resumeData.nameFontStyle),
            }}
          >
            {resumeData.name || "Your Name"}
          </h2>
        </div>

        {resumeData.summary && (
          <section className="mb-6 mx-6 mt-8">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Summary
            </h2>
            <p
              style={{
                fontSize: `${resumeData.summaryFontSize}px`,
                ...getFontStyles(resumeData.summaryFontStyle),
              }}
            >
              {resumeData.summary || "AI-generated summary will appear here."}
            </p>
          </section>
        )}

        {resumeData.skills.length > 0 && (
          <section className="mb-6 mx-6 mt-8">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Top Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-black rounded-full text-sm"
                  style={{
                    backgroundColor: resumeData.headerColor || "#aad6f2",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="mb-6 mx-6 mt-8">
            <h3 className="text-base font-semibold uppercase mb-2">
              Experience
            </h3>
            <hr />
            <ul className="pl-5 list-disc">
              {resumeData.experience.map((exp: string, idx: number) => (
                <li key={idx}>{exp}</li>
              ))}
            </ul>
          </section>
        )}

        {resumeData.awards?.length > 0 && (
          <section className="mb-6 mx-6 mt-8">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Awards</h2>
            <ul className="list-disc pl-5">
              {resumeData.awards.map((award: string, idx: number) => (
                <li key={idx}>{award}</li>
              ))}
            </ul>
          </section>
        )}

        {resumeData.extra?.length > 0 && (
          <section className="mb-6 mx-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Extra Section
            </h2>
            <ul className="list-disc pl-5">
              {resumeData.extra.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-gray-500 italic underline">
          <Link href="https://github.com/HadiqaGohar/">
            Powered by Hadiqa Gohar
          </Link>
        </footer>
      </main>
    </div>
  );
}
jo pdf uplaod aur input dono par same rhy ga 1% bhi changing nhi hogi isme  sab hony ke bad ye same design download hojay ga import {
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
    }, // Replace with local file if needed
    {
      src: "https://fonts.gstatic.com/s/helvetica/v25/7c0JxPml9m1H.woff2",
      fontWeight: "bold",
    }, // Replace with local file if needed
    {
      src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2",
      fontWeight: "normal",
      fontStyle: "italic",
    }, // Replace
    {
      src: "https://fonts.gstatic.com/s/helveticaoblique/v25/7c0JxPml9m1H.woff2",
      fontWeight: "bold",
      fontStyle: "italic",
    }, // Replace
  ],
});

// Helper functions
const resizeImage = (imageUrl: string, size: number) => {
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
});

interface ResumePDFProps {
  resumeData: ResumeState["resumeData"];
}

const ResumePDF = ({ resumeData }: ResumePDFProps) => {
  // Validate font sizes
  const nameFontSize = Number.isFinite(resumeData.nameFontSize)
    ? resumeData.nameFontSize
    : 18;
  const summaryFontSize = Number.isFinite(resumeData.summaryFontSize)
    ? resumeData.summaryFontSize
    : 12;

  // Validate image URL
  const isValidImage =
    resumeData.image && resumeData.image.startsWith("data:image/");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Aside (Sidebar) */}
        <View style={styles.aside}>
          {isValidImage && (
            <Image
              src={resizeImage(resumeData.image, 115)}
              style={styles.profileImage}
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
          {resumeData.websites.length > 0 && (
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
          {resumeData.languages.length > 0 && (
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
          {resumeData.education.length > 0 && (
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
          {resumeData.student.length > 0 && (
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
          {resumeData.skills.length > 0 && (
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
          {resumeData.experience.length > 0 && (
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
        {/* Footer */}
      <View style={{ textAlign: 'center', paddingVertical: 8, fontSize: 10, color: '#99A1AF', fontStyle: 'italic', marginLeft: 150 , textDecoration: 'none'}}>
        <Link src="https://github.com/HadiqaGohar/">
          <Text style={{color: '#99A1AF', textDecorationStyle: 'none'}}>Powered by Hadiqa Gohar</Text>
        </Link>
      </View>
      
      </Page>
    </Document>
  );
};

export default ResumePDF;

