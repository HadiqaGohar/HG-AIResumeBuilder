"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResumeStore } from "../../../../../lib/store";
import TemplateRenderer from "../../../../app/components/TemplateRenderer";
import { generatePDF } from "../../../../../lib/pdfGenerator";

// PDF generation is now handled by our custom generatePDF function
import {
  fontStyles,
  fontSizes,
  predefinedColors,
} from "../../../../../lib/resumeConstants";

interface ResumeState {
  templateId: string | null;
  resumeData: {
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
    headerColor?: string;
    nameFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
    nameFontSize?: number;
    tagFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
    tagFontSize?: number;
    summaryFontStyle?: "regular" | "bold" | "italic" | "bold-italic";
    summaryFontSize?: number;
    image?: string;
  };
  setTemplateId: (id: string) => void;
  setResumeData: (data: Partial<ResumeState["resumeData"]>) => void;
}

export default function AITemplatePreview({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId, resumeData, setResumeData, setTemplateId } =
    useResumeStore();
  const router = useRouter();
  const [currentTemplateId, setCurrentTemplateId] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(resumeData);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    resumeData.image || null
  );
  const [customColor, setCustomColor] = useState(resumeData.headerColor || "");
  const [
    // websites
    , setWebsites] = useState<string[]>(
    resumeData.websites ?? [""]
  );
  const [
    // education
    , setEducation] = useState<string[]>(
    resumeData.education ?? [""]
  );
  const [
    // skills
    , setSkills] = useState<string[]>(resumeData.skills ?? [""]);
  const [
    // experience
    , setExperience] = useState<string[]>(
    resumeData.experience ?? [""]
  );
  const [
    // student
    , setStudent] = useState<string[]>(resumeData.student ?? [""]);
  const [
    // courses
    , setCourses] = useState<string[]>(resumeData.courses ?? [""]);
  const [
    // internships
    , setInternships] = useState<string[]>(
    resumeData.internships ?? [""]
  );
  const [
    // extracurriculars
    , setExtracurriculars] = useState<string[]>(
    resumeData.extracurriculars ?? [""]
  );
  const [
    // hobbies
    , setHobbies] = useState<string[]>(resumeData.hobbies ?? [""]);
  const [
    // references
    , setReferences] = useState<string[]>(
    resumeData.references ?? [""]
  );
  const [
    // languages
    , setLanguages] = useState<string[]>(
    resumeData.languages ?? [""]
  );

  useEffect(() => {
    const resolveParams = async () => {
      const { templateId: paramTemplateId } = await params;
      setCurrentTemplateId(paramTemplateId);
      setTemplateId(paramTemplateId);
      if (templateId !== paramTemplateId) {
        router.push("/upload-resume/ai-templates");
      }
    };
    resolveParams();

    setEditedData(resumeData);
    setImagePreview(resumeData.image || null);
    setCustomColor(resumeData.headerColor || "");
    const updatedState = {
      websites: resumeData.websites ?? [""],
      education: resumeData.education ?? [""],
      skills: resumeData.skills ?? [""],
      experience: resumeData.experience ?? [""],
      student: resumeData.student ?? [""],
      courses: resumeData.courses ?? [""],
      internships: resumeData.internships ?? [""],
      extracurriculars: resumeData.extracurriculars ?? [""],
      hobbies: resumeData.hobbies ?? [""],
      references: resumeData.references ?? [""],
      languages: resumeData.languages ?? [""],
    };
    setWebsites(updatedState.websites);
    setEducation(updatedState.education);
    setSkills(updatedState.skills);
    setExperience(updatedState.experience);
    setStudent(updatedState.student);
    setCourses(updatedState.courses);
    setInternships(updatedState.internships);
    setExtracurriculars(updatedState.extracurriculars);
    setHobbies(updatedState.hobbies);
    setReferences(updatedState.references);
    setLanguages(updatedState.languages);
  // }, [templateId, params, router, resumeData]);
  }, [templateId, params, router, resumeData, setTemplateId]);


  const handleColorSelect = (color: string) => {
    setCustomColor(color);
    setEditedData((prev) => ({ ...prev, headerColor: color }));
    setResumeData({ headerColor: color });
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      setEditedData((prev) => ({ ...prev, headerColor: color }));
      setResumeData({ headerColor: color });
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
  };

  const handleSave = () => {
    setResumeData(editedData);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setEditedData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    field: keyof typeof resumeData,
    value: string | string[]
  ) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
    setResumeData({ [field]: value });
  };

  const handleArrayChange = (
    field: keyof typeof resumeData,
    index: number,
    value: string
  ) => {
    const updatedArray = [...((editedData[field] as string[]) || [])];
    updatedArray[index] = value;
    setEditedData((prev) => ({
      ...prev,
      [field]: updatedArray.filter((v) => v.trim() !== ""),
    }));
    setResumeData({ [field]: updatedArray.filter((v) => v.trim() !== "") });
    if (field === "websites") setWebsites(updatedArray);
    if (field === "education") setEducation(updatedArray);
    if (field === "skills") setSkills(updatedArray);
    if (field === "experience") setExperience(updatedArray);
    if (field === "student") setStudent(updatedArray);
    if (field === "courses") setCourses(updatedArray);
    if (field === "internships") setInternships(updatedArray);
    if (field === "extracurriculars") setExtracurriculars(updatedArray);
    if (field === "hobbies") setHobbies(updatedArray);
    if (field === "references") setReferences(updatedArray);
    if (field === "languages") setLanguages(updatedArray);
  };

  const addArrayField = (field: keyof typeof resumeData) => {
    const updatedArray = [...((editedData[field] as string[]) || []), ""];
    setEditedData((prev) => ({ ...prev, [field]: updatedArray }));
    setResumeData({ [field]: updatedArray });
    if (field === "websites") setWebsites(updatedArray);
    if (field === "education") setEducation(updatedArray);
    if (field === "skills") setSkills(updatedArray);
    if (field === "experience") setExperience(updatedArray);
    if (field === "student") setStudent(updatedArray);
    if (field === "courses") setCourses(updatedArray);
    if (field === "internships") setInternships(updatedArray);
    if (field === "extracurriculars") setExtracurriculars(updatedArray);
    if (field === "hobbies") setHobbies(updatedArray);
    if (field === "references") setReferences(updatedArray);
    if (field === "languages") setLanguages(updatedArray);
  };

  const removeArrayField = (field: keyof typeof resumeData, index: number) => {
    const updatedArray = ((editedData[field] as string[]) || []).filter(
      (_, i) => i !== index
    );
    setEditedData((prev) => ({
      ...prev,
      [field]: updatedArray.length > 0 ? updatedArray : [""],
    }));
    setResumeData({ [field]: updatedArray.length > 0 ? updatedArray : [""] });
    if (field === "websites")
      setWebsites(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "education")
      setEducation(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "skills")
      setSkills(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "experience")
      setExperience(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "student")
      setStudent(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "courses")
      setCourses(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "internships")
      setInternships(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "extracurriculars")
      setExtracurriculars(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "hobbies")
      setHobbies(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "references")
      setReferences(updatedArray.length > 0 ? updatedArray : [""]);
    if (field === "languages")
      setLanguages(updatedArray.length > 0 ? updatedArray : [""]);
  };

  const renderField = (label: string, field: keyof typeof resumeData) => {
    if (isEditing) {
      if (Array.isArray(editedData[field])) {
        const arrayData =
          ((editedData[field] as string[]) || []).length > 0
            ? (editedData[field] as string[])
            : [""];
        return (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            {arrayData.map((value, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleArrayChange(field, index, e.target.value)
                  }
                  placeholder={`Enter ${label.toLowerCase()} ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                />
                {arrayData.length > 1 && (
                  <button
                    onClick={() => removeArrayField(field, index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    aria-label={`Remove ${label.toLowerCase()} field ${index + 1}`}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayField(field)}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              aria-label={`Add another ${label.toLowerCase()} field`}
            >
              + Add {label}
            </button>
          </div>
        );
      }
      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {field === "summary" ? (
            <textarea
              value={(editedData[field] as string) || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={(editedData[field] as string) || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            />
          )}
          {(field === "name" || field === "tag" || field === "summary") && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Font Style
                </label>
                <select
                  value={
                    editedData[
                      `${field}FontStyle` as keyof typeof resumeData
                    ] || "regular"
                  }


                  onChange={(e) => {
                    const newStyle = e.target.value as
                      | "regular"
                      | "bold"
                      | "italic"
                      | "bold-italic";
                    setEditedData({
                      ...editedData,
                      [`${field}FontStyle`]: newStyle,
                    });
                    setResumeData({
                      [`${field}FontStyle`]: newStyle,
                    });
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
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
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Font Size
                </label>
                <select
                  value={
                    editedData[`${field}FontSize` as keyof typeof resumeData] ||
                    12
                  }
                  onChange={(e) => {
                    const newSize = parseInt(e.target.value);
                    setEditedData({
                      ...editedData,
                      [`${field}FontSize`]: newSize,
                    });
                    setResumeData({
                      [`${field}FontSize`]: newSize,
                    });
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                >
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}px
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="py-2 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-gray-700">{label}:</span>
          <span className="text-sm text-gray-600 text-right max-w-xs">
            {Array.isArray(resumeData[field])
              ? (resumeData[field] as string[])?.join(", ") || "Not provided"
              : resumeData[field] || "Not provided"}
          </span>
        </div>
        {(field === "name" || field === "tag" || field === "summary") && (
          <div className="mt-1 text-xs text-gray-500">
            Style: {resumeData[`${field}FontStyle` as keyof typeof resumeData] || "Regular"} | 
            Size: {resumeData[`${field}FontSize` as keyof typeof resumeData] || 12}px
          </div>
        )}
      </div>
    );
  };

  // const TemplateComponent =
  //   currentTemplateId === "1"
  //     ? Template1
  //     : currentTemplateId === "2"
  //     ? Template2
  //     : Template3;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                AI Template {currentTemplateId} Editor
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Object.keys(editedData).filter(key => editedData[key as keyof typeof editedData]).length * 10)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {Math.min(100, Object.keys(editedData).filter(key => editedData[key as keyof typeof editedData]).length * 10)}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setIsEditing(true)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                isEditing
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Edit Resume
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                !isEditing
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Preview
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Editor */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm border p-6"
            role="form"
            aria-label="AI Resume editing form"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? 'Edit Resume Data' : 'Resume Information'}
              </h2>
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Data
                  </button>
                )}
              </div>
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6"
                role="alert"
              >
                {error}
              </motion.div>
            )}
            {isEditing && (
              <div className="space-y-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  {imagePreview && (
                    <div className="mt-4 flex items-center gap-4">
                      <Image
                        src={imagePreview}
                        alt="Profile Preview"
                        width={60}
                        height={60}
                        className="rounded-full border"
                      />
                      <button
                        onClick={() => {
                          setEditedData((prev) => ({ ...prev, image: "" }));
                          setImagePreview(null);
                          setResumeData({ image: "" });
                        }}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        aria-label="Remove profile image"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Header Color
                  </label>
                  <div className="grid grid-cols-8 gap-2 mb-4">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          editedData.headerColor === color
                            ? "border-blue-500 scale-110"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select header color ${color}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={customColor}
                      onChange={handleCustomColorChange}
                      placeholder="#FFFFFF"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                      aria-label="Enter custom header color"
                    />
                    <div
                      className="w-8 h-8 rounded-lg border border-gray-300"
                      style={{
                        backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(customColor)
                          ? customColor
                          : "#ffffff",
                      }}
                    />
                  </div>
                  {customColor && !/^#[0-9A-Fa-f]{6}$/.test(customColor) && (
                    <p className="text-red-500 text-xs mt-2">
                      Please enter a valid hex color (e.g., #FFFFFF).
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {renderField("Name", "name")}
              {renderField("Tag", "tag")}
              {renderField("Email", "email")}
              {renderField("Phone Number", "number")}
              {renderField("Location", "location")}
              {renderField("Summary", "summary")}
              {renderField("Websites", "websites")}
              {renderField("Skills", "skills")}
              {renderField("Education", "education")}
              {renderField("Experience", "experience")}
              {renderField("Student Status", "student")}
              {renderField("Courses", "courses")}
              {renderField("Internships", "internships")}
              {renderField("Extracurriculars", "extracurriculars")}
              {renderField("Hobbies", "hobbies")}
              {renderField("References", "references")}
              {renderField("Languages", "languages")}
            </div>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm border"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Live Preview
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Template {currentTemplateId}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="border border-gray-200 rounded-lg bg-white p-1 mb-4 overflow-auto max-h-[700px] shadow-inner">
                <div className="transform scale-[0.8] origin-top-left w-[125%] h-fit">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <TemplateRenderer templateId={currentTemplateId} data={editedData} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={async () => {
                    const filename = `${editedData.name || "resume"}-ai-template${currentTemplateId}.pdf`;
                    await generatePDF(editedData, filename, currentTemplateId, true); // true = AI Generated
                  }}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Template {currentTemplateId} PDF
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Template {currentTemplateId} Active</span>
              </div>
              <div className="text-sm text-gray-500">
                Last saved: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push("/upload-resume/ai-templates")}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Templates
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
