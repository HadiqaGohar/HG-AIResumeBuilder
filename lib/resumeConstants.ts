// Profession Types
export const professionTypes: string[] = [
  "Software Developer",
  "Call Center Agent",
  "Carpenter",
  "Boutique Owner",
  "Office Assistant",
  "Teacher",
  "Student",
  "Freelancer",
  "Other",
];

// All skills for developers (categorized)
export const programmingLanguages: string[] = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "SQL",
  "R",
];

export const webDevelopment: string[] = [
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "Bootstrap",
  "OpenAIAgentsSDK",
];

export const mobileDevelopment: string[] = [
  "React Native",
  "Flutter",
  "Kotlin",
  "Swift",
];

export const devOpsTools: string[] = [
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub",
  "CI/CD",
  "Linux",
  "AWS",
  "Firebase",
  "Vercel",
  "Netlify",
];

export const dataML: string[] = [
  "Data Analysis",
  "Pandas",
  "NumPy",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Machine Learning",
  "Deep Learning",
  "Power BI",
  "Tableau",
];

export const databases: string[] = [
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "Redis",
];

export const softSkills: string[] = [
  "Communication",
  "Leadership",
  "Teamwork",
  "Problem-Solving",
  "Creativity",
  "Critical Thinking",
  "Time Management",
  "Adaptability",
];

export const businessSkills: string[] = [
  "Project Management",
  "Agile",
  "Scrum",
  "Business Analysis",
  "SEO",
  "Digital Marketing",
  "Copywriting",
];

export const designSkills: string[] = [
  "Figma",
  "Adobe XD",
  "Canva",
  "Photoshop",
  "UI/UX Design",
  "Wireframing",
  "Prototyping",
];

export const generalTech: string[] = [
  "APIs",
  "REST",
  "GraphQL",
  "WebSockets",
  "Authentication",
  "Security",
];

export const otherSkills: string[] = [
  "Content Writing",
  "Blogging",
  "Public Speaking",
  "Teaching",
  "Mentoring",
  "Research",
];

// Combine all tech-related skills
export const allTechSkills: string[] = [
  ...programmingLanguages,
  ...webDevelopment,
  ...mobileDevelopment,
  ...devOpsTools,
  ...dataML,
  ...databases,
  ...generalTech,
];

// Skill by profession
export const skillByProfession: Record<string, string[]> = {
  "Call Center Agent": [
    "Communication",
    "Customer Support",
    "CRM Software",
    "Time Management",
    "Problem Solving",
  ],
  Carpenter: [
    "Woodworking",
    "Measurements",
    "Blueprint Reading",
    "Tool Handling",
    "Safety Practices",
  ],
  "Boutique Owner": [
    "Fashion Design",
    "Customer Service",
    "Inventory Management",
    "Marketing",
    "Creativity",
  ],
  "Office Assistant": [
    "MS Office",
    "Typing Speed",
    "Scheduling",
    "Organizing Files",
    "Communication",
  ],
  Teacher: [
    "Classroom Management",
    "Lesson Planning",
    "Communication",
    "Subject Knowledge",
    "Assessment",
  ],
  Student: [
    "Time Management",
    "Research",
    "Collaboration",
    "Critical Thinking",
  ],
  Freelancer: [
    "Self-Discipline",
    "Client Communication",
    "Online Tools",
    "Time Tracking",
  ],
  "Software Developer": allTechSkills,
  Other: [...softSkills, ...otherSkills],
};

// Work Experience Options
export const workingOptions: string[] = [
  "No Experience",
  "Less than 3 Years Experience",
  "3-5 Years Experience",
  "5-10 Years Experience",
  "10+ Years Experience",
];

// Student Status Options
export const studentOptions: string[] = [
  "Yes! I'm a Student",
  "No! I'm not a Student",
];

// Education Levels
export const educationLevels: string[] = [
  "Primary School",
  "Middle School",
  "Matric / Secondary School Certificate (SSC)",
  "Intermediate / Higher Secondary Certificate (HSC) - FA / FSc / ICS / ICom",
  "Diploma / Technical or Vocational",
  "Post-Secondary Certificate / High School Diploma",
  "Associate Degree",
  "Bachelor's Degree (BA, BSc, BCom, BBA, etc.)",
  "Master's Degree (MA, MSc, MBA, MCom, etc.)",
  "MPhil / MS",
  "Doctorate (PhD)",
  "Post-Doctoral",
  "Professional Degrees (MBBS, BDS, LLB, DPharm, etc.)",
  "Certification Courses",
  "Online Courses / MOOCs",
  "Short Courses / Workshops",
  "Prefer Not to Answer",
];

// Education Fields
export const educationFields: string[] = [
  "Science",
  "Arts",
  "Commerce",
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Medical",
  "Pharmacy",
  "Law",
  "Social Sciences",
  "Humanities",
  "Education",
  "Architecture",
  "Fine Arts",
  "Agriculture",
  "Economics",
  "Mathematics",
  "Psychology",
  "Political Science",
  "Islamic Studies",
  "Environmental Science",
  "Media & Communication",
  "Hospitality & Tourism",
  "Fashion Design",
  "Performing Arts",
  "Vocational Studies",
  "Others",
];

// Languages
export const languages: string[] = [
  "English",
  "Mandarin Chinese",
  "Hindi",
  "Spanish",
  "Arabic",
  "Bengali",
  "Portuguese",
  "Russian",
  "Urdu",
  "Indonesian",
  "French",
  "German",
  "Japanese",
  "Swahili",
  "Turkish",
  "Korean",
  "Vietnamese",
  "Italian",
  "Persian (Farsi)",
  "Thai",
  "Punjabi",
  "Telugu",
  "Marathi",
  "Tamil",
];

// Predefined Colors
export const predefinedColors: string[] = [
  "#aad6f2", // Default color
  "#ff6b6b", // Red
  "#4ecdc4", // Teal
  "#45b7d1", // Blue
  "#96ce79", // Green
  "#f7a8b8", // Pink
  "#ffd700", // Gold
  "#6b7280", // Gray
  "#9f7aea", // Purple
  "#ff8c00", // Orange
  "#4b5e40", // Dark Green
  "#9810fa", // Dark purple
];

// Font Styles
export const fontStyles: string[] = [
  "regular",
  "bold",
  "italic",
  "bold-italic",
];

// Font Sizes
export const fontSizes: number[] = [10, 12, 14, 16, 18, 20, 24, 28, 32];
// ```


