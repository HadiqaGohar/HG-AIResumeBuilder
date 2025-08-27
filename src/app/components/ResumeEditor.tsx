"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useResumeStore, ResumeData } from "../../../lib/store";
import { resumeAPI, apiUtils } from "../../../lib/api";
import { toast } from "react-hot-toast";
import {
  FiPlus,
  FiX,
  FiSave,
  FiRefreshCw,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiBook,
  FiBriefcase,
  FiAward,
  FiHeart,
} from "react-icons/fi";
import ImageUpload from "./ImageUpload";

interface ResumeEditorProps {
  onSave?: () => void;
  showSaveButton?: boolean;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({
  onSave,
  showSaveButton = true,
}) => {
  const { resumeData, setResumeData } = useResumeStore();
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);

  // Handle input changes with stable references
  const handleInputChange = useCallback(
    (field: keyof ResumeData) => {
      return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setResumeData({ [field]: e.target.value });
      };
    },
    [setResumeData]
  );

  // Handle array field changes with stable references
  const handleArrayChange = useCallback(
    (field: keyof ResumeData, index: number) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentArray = (resumeData[field] as string[] | undefined) || [];
        const newArray = [...currentArray];
        newArray[index] = e.target.value;
        setResumeData({ [field]: newArray });
      };
    },
    [resumeData, setResumeData]
  );

  // Add item to array
  const addArrayItem = useCallback(
    (field: keyof ResumeData) => {
      return () => {
        const currentArray = (resumeData[field] as string[] | undefined) || [];
        const newArray = [...currentArray, ""];
        setResumeData({ [field]: newArray });
      };
    },
    [resumeData, setResumeData]
  );

  // Remove item from array
  const removeArrayItem = useCallback(
    (field: keyof ResumeData, index: number) => {
      return () => {
        const currentArray = (resumeData[field] as string[] | undefined) || [];
        const newArray = currentArray.filter((_, i) => i !== index);
        setResumeData({ [field]: newArray });
      };
    },
    [resumeData, setResumeData]
  );

  // Generate AI summary
  const generateSummary = useCallback(async () => {
    if (!resumeData.education?.length || !resumeData.skills?.length) {
      toast.error(
        "Please add education and skills first to generate a summary"
      );
      return;
    }

    setIsGeneratingSummary(true);
    try {
      const response = await resumeAPI.generateSummary({
        education: resumeData.education,
        skills: resumeData.skills,
      });

      setResumeData({ summary: response.summary });
      toast.success("AI summary generated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to generate summary");
    } finally {
      setIsGeneratingSummary(false);
    }
  }, [resumeData.education, resumeData.skills, setResumeData]);

  // Suggest skills
  const suggestSkills = useCallback(async () => {
    if (!resumeData.tag) {
      toast.error("Please add a professional title/tag first");
      return;
    }

    setIsSuggestingSkills(true);
    try {
      const response = await resumeAPI.suggestSkills(
        resumeData.tag,
        resumeData.skills || []
      );

      const currentSkills = resumeData.skills || [];
      const newSkills = [
        ...currentSkills,
        ...response.suggested_skills.slice(0, 5),
      ];
      setResumeData({ skills: newSkills });

      toast.success(
        `Added ${
          response.suggested_skills.slice(0, 5).length
        } suggested skills!`
      );
    } catch (error) {
      toast.error(error.message || "Failed to suggest skills");
    } finally {
      setIsSuggestingSkills(false);
    }
  }, [resumeData.tag, resumeData.skills, setResumeData]);

  // Handle image change
  const handleImageChange = useCallback(
    (imageData: string | null) => {
      setResumeData({ profileImage: imageData });
    },
    [setResumeData]
  );

  // Save resume data
  const handleSave = useCallback(async () => {
    try {
      const validationErrors = apiUtils.validateResumeData(resumeData);
      if (validationErrors.length > 0) {
        toast.error(`Please fix: ${validationErrors.join(", ")}`);
        return;
      }

      await resumeAPI.editResumeData(resumeData);
      toast.success("Resume data saved successfully!");
      onSave?.();
    } catch (error) {
      toast.error(error.message || "Failed to save resume data");
    }
  }, [resumeData, onSave]);

  // Memoized array fields to prevent re-renders
  const websitesArray = useMemo(() => {
    const arr = resumeData.websites || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.websites]);

  const skillsArray = useMemo(() => {
    const arr = resumeData.skills || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.skills]);

  const educationArray = useMemo(() => {
    const arr = resumeData.education || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.education]);

  const languagesArray = useMemo(() => {
    const arr = resumeData.languages || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.languages]);

  const experienceArray = useMemo(() => {
    const arr = resumeData.experience || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.experience]);

  const coursesArray = useMemo(() => {
    const arr = resumeData.courses || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.courses]);

  const internshipsArray = useMemo(() => {
    const arr = resumeData.internships || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.internships]);

  const extracurricularsArray = useMemo(() => {
    const arr = resumeData.extracurriculars || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.extracurriculars]);

  const hobbiesArray = useMemo(() => {
    const arr = resumeData.hobbies || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.hobbies]);

  const referencesArray = useMemo(() => {
    const arr = resumeData.references || [];
    return arr.length > 0 ? arr : [""];
  }, [resumeData.references]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Edit Resume</h2>
        {showSaveButton && (
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <FiSave className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Personal Information
          </h3>

          <div className="space-y-4">
            <ImageUpload
              currentImage={resumeData.profileImage}
              onImageChange={handleImageChange}
              size="lg"
              label="Profile Picture"
            />

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FiUser className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={resumeData.name || ""}
                onChange={handleInputChange("name")}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FiBriefcase className="w-4 h-4 mr-2" />
                Professional Title
              </label>
              <input
                type="text"
                value={resumeData.tag || ""}
                onChange={handleInputChange("tag")}
                placeholder="e.g., Software Engineer, Marketing Manager"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FiMail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={resumeData.email || ""}
                onChange={handleInputChange("email")}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FiPhone className="w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={resumeData.number || ""}
                onChange={handleInputChange("number")}
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FiMapPin className="w-4 h-4 mr-2" />
                Location
              </label>
              <input
                type="text"
                value={resumeData.location || ""}
                onChange={handleInputChange("location")}
                placeholder="City, State, Country"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Professional Summary
          </h3>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Summary
              </label>
              <button
                onClick={generateSummary}
                disabled={isGeneratingSummary}
                className="flex items-center px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors disabled:opacity-50"
              >
                <FiRefreshCw
                  className={`w-3 h-3 mr-1 ${
                    isGeneratingSummary ? "animate-spin" : ""
                  }`}
                />
                {isGeneratingSummary ? "Generating..." : "AI Generate"}
              </button>
            </div>
            <textarea
              value={resumeData.summary || ""}
              onChange={handleInputChange("summary")}
              placeholder="Write a compelling professional summary..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Websites & Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FiGlobe className="w-4 h-4 mr-2" />
                Websites & Links
              </label>
              <button
                type="button"
                onClick={addArrayItem("websites")}
                className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                <FiPlus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {websitesArray.map((item, index) => (
                <div
                  key={`websites-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={item || ""}
                    onChange={handleArrayChange("websites", index)}
                    placeholder="https://linkedin.com/in/yourname"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {websitesArray.length > 1 && (
                    <button
                      type="button"
                      onClick={removeArrayItem("websites", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Remove item"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FiAward className="w-4 h-4 mr-2" />
                Skills
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={addArrayItem("skills")}
                  className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <FiPlus className="w-3 h-3 mr-1" />
                  Add
                </button>
                <button
                  onClick={suggestSkills}
                  disabled={isSuggestingSkills}
                  className="flex items-center px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors disabled:opacity-50"
                >
                  <FiRefreshCw
                    className={`w-3 h-3 mr-1 ${
                      isSuggestingSkills ? "animate-spin" : ""
                    }`}
                  />
                  {isSuggestingSkills ? "Suggesting..." : "AI Suggest"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {skillsArray.map((item, index) => (
                <div
                  key={`skills-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={item || ""}
                    onChange={handleArrayChange("skills", index)}
                    placeholder="e.g., JavaScript, Project Management"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {skillsArray.length > 1 && (
                    <button
                      type="button"
                      onClick={removeArrayItem("skills", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Remove skill"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FiBook className="w-4 h-4 mr-2" />
                Education
              </label>
              <button
                type="button"
                onClick={addArrayItem("education")}
                className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                <FiPlus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {educationArray.map((item, index) => (
                <div
                  key={`education-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={item || ""}
                    onChange={handleArrayChange("education", index)}
                    placeholder="e.g., Bachelor of Science in Computer Science, MIT"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {educationArray.length > 1 && (
                    <button
                      type="button"
                      onClick={removeArrayItem("education", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Remove item"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FiGlobe className="w-4 h-4 mr-2" />
                Languages
              </label>
              <button
                type="button"
                onClick={addArrayItem("languages")}
                className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                <FiPlus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {languagesArray.map((item, index) => (
                <div
                  key={`languages-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={item || ""}
                    onChange={handleArrayChange("languages", index)}
                    placeholder="e.g., English (Native), Spanish (Fluent)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {languagesArray.length > 1 && (
                    <button
                      type="button"
                      onClick={removeArrayItem("languages", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Remove item"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Work Experience */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FiBriefcase className="w-4 h-4 mr-2" />
                Work Experience
              </label>
              <button
                type="button"
                onClick={addArrayItem("experience")}
                className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                <FiPlus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {experienceArray.map((item, index) => (
                <div
                  key={`experience-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={item || ""}
                    onChange={handleArrayChange("experience", index)}
                    placeholder="e.g., Software Engineer at Google (2020-2023)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {experienceArray.length > 1 && (
                    <button
                      type="button"
                      onClick={removeArrayItem("experience", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Remove item"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Courses & Certifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FiAward className="w-4 h-4 mr-2" />
                Courses & Certifications
              </label>
              <button
                type="button"
                onClick={addArrayItem("courses")}
                className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                <FiPlus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {coursesArray.map((item, index) => (
                <div
                  key={`courses-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={item || ""}
                    onChange={handleArrayChange("courses", index)}
                    placeholder="e.g., AWS Certified Solutions Architect"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {coursesArray.length > 1 && (
                    <button
                      type="button"
                      onClick={removeArrayItem("courses", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Remove item"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Internships */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FiBriefcase className="w-4 h-4 mr-2" />
                Internships
              </label>
              <button
                type="button"
                onClick={addArrayItem("internships")}
                className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                <FiPlus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {internshipsArray.map((item, index) => (
                <div
                  key={`internships-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={item || ""}
                    onChange={handleArrayChange("internships", index)}
                    placeholder="e.g., Software Development Intern at Microsoft"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {internshipsArray.length > 1 && (
                    <button
                      type="button"
                      onClick={removeArrayItem("internships", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Remove item"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Extracurricular Activities */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FiHeart className="w-4 h-4 mr-2" />
                Extracurricular Activities
              </label>
              <button
                type="button"
                onClick={addArrayItem("extracurriculars")}
                className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                <FiPlus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>

            <div className="space-y-2">
              {extracurricularsArray.map((item, index) => (
                <div
                  key={`extracurriculars-${index}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={item || ""}
                    onChange={handleArrayChange("extracurriculars", index)}
                    placeholder="e.g., President of Computer Science Club"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                  {extracurricularsArray.length > 1 && (
                    <button
                      type="button"
                      onClick={removeArrayItem("extracurriculars", index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Remove item"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        {/* Hobbies & Interests */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <FiHeart className="w-4 h-4 mr-2" />
              Hobbies & Interests
            </label>
            <button
              type="button"
              onClick={addArrayItem("hobbies")}
              className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              <FiPlus className="w-3 h-3 mr-1" />
              Add
            </button>
          </div>

          <div className="space-y-2">
            {hobbiesArray.map((item, index) => (
              <div
                key={`hobbies-${index}`}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={item || ""}
                  onChange={handleArrayChange("hobbies", index)}
                  placeholder="e.g., Photography, Hiking, Reading"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                />
                {hobbiesArray.length > 1 && (
                  <button
                    type="button"
                    onClick={removeArrayItem("hobbies", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Remove item"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* References */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <FiUser className="w-4 h-4 mr-2" />
              References
            </label>
            <button
              type="button"
              onClick={addArrayItem("references")}
              className="flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              <FiPlus className="w-3 h-3 mr-1" />
              Add
            </button>
          </div>

          <div className="space-y-2">
            {referencesArray.map((item, index) => (
              <div
                key={`references-${index}`}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={item || ""}
                  onChange={handleArrayChange("references", index)}
                  placeholder="e.g., John Doe, Manager at ABC Corp"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                />
                {referencesArray.length > 1 && (
                  <button
                    type="button"
                    onClick={removeArrayItem("references", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Remove item"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
