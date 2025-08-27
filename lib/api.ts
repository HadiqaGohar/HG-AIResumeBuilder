// // lib/api.ts
// import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000, // 30 seconds timeout
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Types
// export interface ResumeData {
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
// }

// export interface ResumeInput {
//   education: string[];
//   skills: string[];
// }

// export interface OptimizationResponse {
//   optimized_summary: string;
//   suggested_skills: string[];
//   keyword_matches: string[];
//   improvement_suggestions: string[];
// }

// export interface JobDescriptionInput {
//   job_description: string;
//   resume_data: ResumeData;
// }

// // API Functions
// export const resumeAPI = {
//   // Health check
//   async healthCheck(): Promise<{ api_status: string; gemini_status: string }> {
//     try {
//       const response = await apiClient.get('/health');
//       return response.data;
//     } catch (error) {
//       console.error('Health check failed:', error);
//       throw new Error('Backend service is unavailable');
//     }
//   },

//   // Generate resume summary
//   async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
//     try {
//       const response = await apiClient.post('/api/resume/summary', data);
//       return response.data;
//     } catch (error) {
//       console.error('Generate summary failed:', error);
//       throw new Error(error.response?.data?.detail || 'Failed to generate summary');
//     }
//   },

//   // Extract resume data from file
//   async extractResumeData(file: File): Promise<ResumeData> {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
      
//       const response = await apiClient.post('/api/resume/extract', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Extract resume data failed:', error);
//       throw new Error(error.response?.data?.detail || 'Failed to extract resume data');
//     }
//   },

//   // Optimize resume for job description
//   async optimizeResume(data: JobDescriptionInput): Promise<OptimizationResponse> {
//     try {
//       const response = await apiClient.post('/api/resume/optimize', data);
//       return response.data;
//     } catch (error) {
//       console.error('Optimize resume failed:', error);
//       throw new Error(error.response?.data?.detail || 'Failed to optimize resume');
//     }
//   },

//   // Edit resume data
//   async editResumeData(data: ResumeData): Promise<ResumeData> {
//     try {
//       const response = await apiClient.post('/api/resume/edit', data);
//       return response.data;
//     } catch (error) {
//       console.error('Edit resume data failed:', error);
//       throw new Error(error.response?.data?.detail || 'Failed to edit resume data');
//     }
//   },

//   // Suggest skills
//   async suggestSkills(profession: string, currentSkills: string[] = []): Promise<{ suggested_skills: string[] }> {
//     try {
//       const response = await apiClient.post('/api/resume/skills/suggest', {
//         profession,
//         current_skills: currentSkills,
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Suggest skills failed:', error);
//       throw new Error(error.response?.data?.detail || 'Failed to suggest skills');
//     }
//   },
// };

// // Frontend API functions (using Next.js API routes as proxy)
// export const frontendAPI = {
//   // Upload resume via Next.js API route (proxy to backend)
//   async uploadResume(file: File): Promise<ResumeData> {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
      
//       const response = await fetch('/api/upload-resume', {
//         method: 'POST',
//         body: formData,
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to upload resume');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Upload resume failed:', error);
//       throw error;
//     }
//   },

//   // Generate summary via Next.js API route (proxy to backend)
//   async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
//     try {
//       const response = await fetch('/api/resume', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to generate summary');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Generate summary failed:', error);
//       throw error;
//     }
//   },
// };

// // Utility functions
// export const apiUtils = {
//   // Check if backend is available
//   async isBackendAvailable(): Promise<boolean> {
//     try {
//       await resumeAPI.healthCheck();
//       return true;
//     } catch {
//       return false;
//     }
//   },

//   // Validate file type
//   isValidFileType(file: File): boolean {
//     const validTypes = [
//       'application/pdf',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ];
//     return validTypes.includes(file.type);
//   },

//   // Format file size
//   formatFileSize(bytes: number): string {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   },

//   // Validate resume data
//   validateResumeData(data: ResumeData): string[] {
//     const errors: string[] = [];
    
//     if (!data.name?.trim()) {
//       errors.push('Name is required');
//     }
    
//     if (!data.email?.trim()) {
//       errors.push('Email is required');
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//       errors.push('Invalid email format');
//     }
    
//     if (!data.skills?.length) {
//       errors.push('At least one skill is required');
//     }
    
//     return errors;
//   },
// };

// export default resumeAPI;

// // // lib/api.ts
// // import axios from 'axios';
// // import type { AxiosError } from 'axios/lib/core/AxiosError';


// // const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

// // // Create axios instance with default config
// // const apiClient = axios.create({
// //   baseURL: API_BASE_URL,
// //   timeout: 30000, // 30 seconds timeout
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Types
// // export interface ResumeData {
// //   name?: string;
// //   tag?: string;
// //   email?: string;
// //   location?: string;
// //   number?: string;
// //   summary?: string;
// //   websites?: string[];
// //   skills?: string[];
// //   education?: string[];
// //   experience?: string[];
// //   student?: string[];
// //   courses?: string[];
// //   internships?: string[];
// //   extracurriculars?: string[];
// //   hobbies?: string[];
// //   references?: string[];
// //   languages?: string[];
// // }

// // export interface ResumeInput {
// //   education: string[];
// //   skills: string[];
// // }

// // export interface OptimizationResponse {
// //   optimized_summary: string;
// //   suggested_skills: string[];
// //   keyword_matches: string[];
// //   improvement_suggestions: string[];
// // }

// // export interface JobDescriptionInput {
// //   job_description: string;
// //   resume_data: ResumeData;
// // }

// // // Error response type for backend errors
// // interface ApiErrorResponse {
// //   detail?: string;
// //   error?: string;
// // }

// // // API Functions
// // export const resumeAPI = {
// //   // Health check
// //   async healthCheck(): Promise<{ api_status: string; gemini_status: string }> {
// //     try {
// //       const response = await apiClient.get<{ api_status: string; gemini_status: string }>('/health');
// //       return response.data;
// //     } catch (error) {
// //       const axiosError = error as AxiosError<ApiErrorResponse>;
// //       console.error('Health check failed:', axiosError);
// //       throw new Error(axiosError.response?.data?.detail || 'Backend service is unavailable');
// //     }
// //   },

// //   // Generate resume summary
// //   async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
// //     try {
// //       const response = await apiClient.post<{ summary: string }>('/api/resume/summary', data);
// //       return response.data;
// //     } catch (error) {
// //       const axiosError = error as AxiosError<ApiErrorResponse>;
// //       console.error('Generate summary failed:', axiosError);
// //       throw new Error(axiosError.response?.data?.detail || 'Failed to generate summary');
// //     }
// //   },

// //   // Extract resume data from file
// //   async extractResumeData(file: File): Promise<ResumeData> {
// //     try {
// //       const formData = new FormData();
// //       formData.append('file', file);

// //       const response = await apiClient.post<ResumeData>('/api/resume/extract', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       return response.data;
// //     } catch (error) {
// //       const axiosError = error as AxiosError<ApiErrorResponse>;
// //       console.error('Extract resume data failed:', axiosError);
// //       throw new Error(axiosError.response?.data?.detail || 'Failed to extract resume data');
// //     }
// //   },

// //   // Optimize resume for job description
// //   async optimizeResume(data: JobDescriptionInput): Promise<OptimizationResponse> {
// //     try {
// //       const response = await apiClient.post<OptimizationResponse>('/api/resume/optimize', data);
// //       return response.data;
// //     } catch (error) {
// //       const axiosError = error as AxiosError<ApiErrorResponse>;
// //       console.error('Optimize resume failed:', axiosError);
// //       throw new Error(axiosError.response?.data?.detail || 'Failed to optimize resume');
// //     }
// //   },

// //   // Edit resume data
// //   async editResumeData(data: ResumeData): Promise<ResumeData> {
// //     try {
// //       const response = await apiClient.post<ResumeData>('/api/resume/edit', data);
// //       return response.data;
// //     } catch (error) {
// //       const axiosError = error as AxiosError<ApiErrorResponse>;
// //       console.error('Edit resume data failed:', axiosError);
// //       throw new Error(axiosError.response?.data?.detail || 'Failed to edit resume data');
// //     }
// //   },

// //   // Suggest skills
// //   async suggestSkills(profession: string, currentSkills: string[] = []): Promise<{ suggested_skills: string[] }> {
// //     try {
// //       const response = await apiClient.post<{ suggested_skills: string[] }>('/api/resume/skills/suggest', {
// //         profession,
// //         current_skills: currentSkills,
// //       });
// //       return response.data;
// //     } catch (error) {
// //       const axiosError = error as AxiosError<ApiErrorResponse>;
// //       console.error('Suggest skills failed:', axiosError);
// //       throw new Error(axiosError.response?.data?.detail || 'Failed to suggest skills');
// //     }
// //   },
// // };

// // // Frontend API functions (using Next.js API routes as proxy)
// // export const frontendAPI = {
// //   // Upload resume via Next.js API route (proxy to backend)
// //   async uploadResume(file: File): Promise<ResumeData> {
// //     try {
// //       const formData = new FormData();
// //       formData.append('file', file);

// //       const response = await fetch('/api/upload-resume', {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json() as ApiErrorResponse;
// //         throw new Error(errorData.error || errorData.detail || 'Failed to upload resume');
// //       }

// //       return await response.json();
// //     } catch (error) {
// //       console.error('Upload resume failed:', error);
// //       throw error;
// //     }
// //   },

// //   // Generate summary via Next.js API route (proxy to backend)
// //   async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
// //     try {
// //       const response = await fetch('/api/resume', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(data),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json() as ApiErrorResponse;
// //         throw new Error(errorData.error || errorData.detail || 'Failed to generate summary');
// //       }

// //       return await response.json();
// //     } catch (error) {
// //       console.error('Generate summary failed:', error);
// //       throw error;
// //     }
// //   },
// // };

// // // Utility functions
// // export const apiUtils = {
// //   // Check if backend is available
// //   async isBackendAvailable(): Promise<boolean> {
// //     try {
// //       await resumeAPI.healthCheck();
// //       return true;
// //     } catch {
// //       return false;
// //     }
// //   },

// //   // Validate file type
// //   isValidFileType(file: File): boolean {
// //     const validTypes = [
// //       'application/pdf',
// //       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// //     ];
// //     return validTypes.includes(file.type);
// //   },

// //   // Format file size
// //   formatFileSize(bytes: number): string {
// //     if (bytes === 0) return '0 Bytes';
// //     const k = 1024;
// //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// //   },

// //   // Validate resume data
// //   validateResumeData(data: ResumeData): string[] {
// //     const errors: string[] = [];

// //     if (!data.name?.trim()) {
// //       errors.push('Name is required');
// //     }

// //     if (!data.email?.trim()) {
// //       errors.push('Email is required');
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
// //       errors.push('Invalid email format');
// //     }

// //     if (!data.skills?.length) {
// //       errors.push('At least one skill is required');
// //     }

// //     return errors;
// //   },
// // };

// // // export default resumeAPI;
// // lib/api.ts
// import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000, // 30 seconds timeout
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Types
// export interface ResumeData {
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
// }

// export interface ResumeInput {
//   education: string[];
//   skills: string[];
// }

// export interface OptimizationResponse {
//   optimized_summary: string;
//   suggested_skills: string[];
//   keyword_matches: string[];
//   improvement_suggestions: string[];
// }

// export interface JobDescriptionInput {
//   job_description: string;
//   resume_data: ResumeData;
// }

// // API Functions
// export const resumeAPI = {


// //   // Health check
// //   async healthCheck(): Promise<{ api_status: string; gemini_status: string }> {
// //     try {
// //       const response = await apiClient.get('/health');
// //       return response.data;
// //     } catch (error) {
// //       console.error('Health check failed:', error);
// //       throw new Error('Backend service is unavailable');
// //     }
// //   },  
//   // Health check
//  async healthCheck(): Promise<{ api_status: string; gemini_status: string }> {
//   try {
//     const response = await apiClient.get('/health');
//     return response.data as { api_status: string; gemini_status: string };
//   } catch (error) {
//     console.error('Health check failed:', error);
//     throw new Error('Backend service is unavailable');
//   }
// },


//   // Generate resume summary
//   // async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
//   //   try {
//   //     const response = await apiClient.post('/api/resume/summary', data);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Generate summary failed:', error);
//   //     throw new Error(error.response?.data?.detail || 'Failed to generate summary');
//   //   }
//   // },
//   // Generate resume summary
// async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
//   try {
//     const response = await apiClient.post<{ summary: string }>(
//       '/api/resume/summary',
//       data
//     );

//     // Ensure at least empty fallback
//     return response.data ?? { summary: '' };
//   } catch (error) {
//     console.error('Generate summary failed:', error);
//     throw new Error(error.response?.data?.detail || 'Failed to generate summary');
//   }
// },


//   // Extract resume data from file
//   async extractResumeData(file: File): Promise<ResumeData> {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
      
//       const response = await apiClient.post('/api/resume/extract', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error('Extract resume data failed:', error);
//       throw new Error(error.response?.data?.detail || 'Failed to extract resume data');
//     }
//   },

//   // // Optimize resume for job description
//   // async optimizeResume(data: JobDescriptionInput): Promise<OptimizationResponse> {
//   //   try {
//   //     const response = await apiClient.post('/api/resume/optimize', data);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Optimize resume failed:', error);
//   //     throw new Error(error.response?.data?.detail || 'Failed to optimize resume');
//   //   }
//   // },

//   // Optimize resume for job description
// async optimizeResume(
//   data: JobDescriptionInput
// ): Promise<OptimizationResponse> {
//   try {
//     const response = await apiClient.post<OptimizationResponse>(
//       '/api/resume/optimize',
//       data
//     );

//     // Ensure fallback if backend doesn't return properly
//     return (
//       response.data ?? {
//         optimized_summary: '',
//         suggested_skills: [],
//         keyword_matches: [],
//         improvement_suggestions: [],
//       }
//     );
//   } catch (error) {
//     console.error('Optimize resume failed:', error);
//     throw new Error(
//       error.response?.data?.detail || 'Failed to optimize resume'
//     );
//   }
// },


//   // Edit resume data
//   async editResumeData(data: ResumeData): Promise<ResumeData> {
//     try {
//       const response = await apiClient.post('/api/resume/edit', data);
//       return response.data;
//     } catch (error) {
//       console.error('Edit resume data failed:', error);
//       throw new Error(error.response?.data?.detail || 'Failed to edit resume data');
//     }
//   },

//   // Suggest skills
//   // async suggestSkills(profession: string, currentSkills: string[] = []): Promise<{ suggested_skills: string[] }> {
//   //   try {
//   //     const response = await apiClient.post('/api/resume/skills/suggest', {
//   //       profession,
//   //       current_skills: currentSkills,
//   //     });
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Suggest skills failed:', error);
//   //     throw new Error(error.response?.data?.detail || 'Failed to suggest skills');
//   //   }
//   // },
//   // Suggest skills
// async suggestSkills(profession: string, currentSkills: string[] = []) {
//   try {
//     const response = await apiClient.post('/api/resume/skills/suggest', {
//       profession,
//       current_skills: currentSkills,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error suggesting skills:", error);
//     throw new Error(error.response?.data?.detail || "Failed to suggest skills");
//   }
// }

// };

// // Frontend API functions (using Next.js API routes as proxy)
// export const frontendAPI = {
//   // Upload resume via Next.js API route (proxy to backend)
//   async uploadResume(file: File): Promise<ResumeData> {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
      
//       const response = await fetch('/api/upload-resume', {
//         method: 'POST',
//         body: formData,
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to upload resume');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Upload resume failed:', error);
//       throw error;
//     }
//   },

//   // Generate summary via Next.js API route (proxy to backend)
//   async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
//     try {
//       const response = await fetch('/api/resume', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to generate summary');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Generate summary failed:', error);
//       throw error;
//     }
//   },
// };

// // Utility functions
// export const apiUtils = {
//   // Check if backend is available
//   async isBackendAvailable(): Promise<boolean> {
//     try {
//       await resumeAPI.healthCheck();
//       return true;
//     } catch {
//       return false;
//     }
//   },

//   // Validate file type
//   isValidFileType(file: File): boolean {
//     const validTypes = [
//       'application/pdf',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ];
//     return validTypes.includes(file.type);
//   },

//   // Format file size
//   formatFileSize(bytes: number): string {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   },

//   // Validate resume data
//   validateResumeData(data: ResumeData): string[] {
//     const errors: string[] = [];
    
//     if (!data.name?.trim()) {
//       errors.push('Name is required');
//     }
    
//     if (!data.email?.trim()) {
//       errors.push('Email is required');
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//       errors.push('Invalid email format');
//     }
    
//     if (!data.skills?.length) {
//       errors.push('At least one skill is required');
//     }
    
//     return errors;
//   },
// };

// export default resumeAPI;

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface ResumeData {
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
}

export interface ResumeInput {
  education: string[];
  skills: string[];
}

export interface OptimizationResponse {
  optimized_summary: string;
  suggested_skills: string[];
  keyword_matches: string[];
  improvement_suggestions: string[];
}

export interface SuggestSkillsResponse {
  suggested_skills: string[];
}

export interface JobDescriptionInput {
  job_description: string;
  resume_data: ResumeData;
}

// API Functions
export const resumeAPI = {
  // Health check
  async healthCheck(): Promise<{ api_status: string; gemini_status: string }> {
    try {
      const response = await apiClient.get('/health');
      return response.data as { api_status: string; gemini_status: string };
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Backend service is unavailable');
    }
  },

  // Generate resume summary
  async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
    try {
      const response = await apiClient.post<{ summary: string }>(
        '/api/resume/summary',
        data
      );
      return response.data ?? { summary: '' };
    } catch (error) {
      console.error('Generate summary failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to generate summary');
    }
  },

  // Extract resume data from file
  async extractResumeData(file: File): Promise<ResumeData> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/api/resume/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Extract resume data failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to extract resume data');
    }
  },

  // Optimize resume for job description
  async optimizeResume(data: JobDescriptionInput): Promise<OptimizationResponse> {
    try {
      const response = await apiClient.post<OptimizationResponse>(
        '/api/resume/optimize',
        data
      );
      return (
        response.data ?? {
          optimized_summary: '',
          suggested_skills: [],
          keyword_matches: [],
          improvement_suggestions: [],
        }
      );
    } catch (error) {
      console.error('Optimize resume failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to optimize resume');
    }
  },

  // Edit resume data
  async editResumeData(data: ResumeData): Promise<ResumeData> {
    try {
      const response = await apiClient.post('/api/resume/edit', data);
      return response.data;
    } catch (error) {
      console.error('Edit resume data failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to edit resume data');
    }
  },

  // Suggest skills
  async suggestSkills(profession: string, currentSkills: string[] = []): Promise<SuggestSkillsResponse> {
    try {
      const response = await apiClient.post<SuggestSkillsResponse>('/api/resume/skills/suggest', {
        profession,
        current_skills: currentSkills,
      });
      return response.data ?? { suggested_skills: [] };
    } catch (error) {
      console.error('Suggest skills failed:', error);
      throw new Error(error.response?.data?.detail || 'Failed to suggest skills');
    }
  },
};

// Frontend API functions (using Next.js API routes as proxy)
export const frontendAPI = {
  // Upload resume via Next.js API route (proxy to backend)
  async uploadResume(file: File): Promise<ResumeData> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload resume');
      }
      return await response.json();
    } catch (error) {
      console.error('Upload resume failed:', error);
      throw error;
    }
  },

  // Generate summary via Next.js API route (proxy to backend)
  async generateSummary(data: ResumeInput): Promise<{ summary: string }> {
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate summary');
      }
      return await response.json();
    } catch (error) {
      console.error('Generate summary failed:', error);
      throw error;
    }
  },
};

// Utility functions
export const apiUtils = {
  // Check if backend is available
  async isBackendAvailable(): Promise<boolean> {
    try {
      await resumeAPI.healthCheck();
      return true;
    } catch {
      return false;
    }
  },

  // Validate file type
  isValidFileType(file: File): boolean {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    return validTypes.includes(file.type);
  },

  // Format file size
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Validate resume data
  validateResumeData(data: ResumeData): string[] {
    const errors: string[] = [];
    if (!data.name?.trim()) {
      errors.push('Name is required');
    }
    if (!data.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }
    if (!data.skills?.length) {
      errors.push('At least one skill is required');
    }
    return errors;
  },
};

export default resumeAPI;