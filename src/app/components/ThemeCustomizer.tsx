// "use client";

// import React, { useState } from "react";
// import { useResumeStore } from "../../../lib/store";
// import {
//   FiDroplet,
//   FiType,
//   FiImage,
//   FiSettings,
 
// } from "react-icons/fi";
// import { predefinedColors } from "../../../lib/resumeConstants";
// import Image from "next/image";

// const ThemeCustomizer: React.FC = () => {
//   const { resumeData, setResumeData } = useResumeStore();
//   const [activeSection, setActiveSection] = useState<string>("colors");
//   const [customColor, setCustomColor] = useState("");

//   const fontStyles = ["regular", "bold", "italic", "bold-italic"];
//   const fontSizes = [10, 12, 14, 16, 18, 20, 24, 28, 32];

//   const themes = [
//     { name: "Professional Blue", primary: "#3b82f6", secondary: "#1e40af" },
//     { name: "Corporate Purple", primary: "#7c3aed", secondary: "#5b21b6" },
//     { name: "Modern Green", primary: "#10b981", secondary: "#047857" },
//     { name: "Creative Orange", primary: "#f59e0b", secondary: "#d97706" },
//     { name: "Elegant Pink", primary: "#ec4899", secondary: "#be185d" },
//     { name: "Tech Gray", primary: "#6b7280", secondary: "#374151" },
//   ];

//   const handleColorSelect = (color: string) => {
//     setResumeData({ headerColor: color });
//     setCustomColor("");
//   };

//   const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const color = e.target.value;
//     setCustomColor(color);
//     if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
//       setResumeData({ headerColor: color });
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setResumeData({ image: reader.result as string });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setResumeData({ image: "" });
//   };

//   const applyTheme = (theme: (typeof themes)[0]) => {
//     setResumeData({ headerColor: theme.primary });
//   };

//   const sections = [
//     { id: "colors", label: "Colors & Themes", icon: FiDroplet },
//     { id: "fonts", label: "Typography", icon: FiType },
//     { id: "image", label: "Profile Picture", icon: FiImage },
//     { id: "advanced", label: "Advanced", icon: FiSettings },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//         <FiDroplet className="mr-2" />
//         Customize Your Resume
//       </h3>

//       {/* Section Navigation */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {sections.map((section) => {
//           const IconComponent = section.icon;
//           return (
//             <button
//               key={section.id}
//               onClick={() => setActiveSection(section.id)}
//               className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
//                 activeSection === section.id
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               <IconComponent className="w-4 h-4 mr-2" />
//               {section.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* Colors & Themes Section */}
//       {activeSection === "colors" && (
//         <div className="space-y-6">
//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Quick Themes
//             </h4>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {themes.map((theme, index) => (
//                 <button
//                   key={index}
//                   onClick={() => applyTheme(theme)}
//                   className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors group"
//                 >
//                   <div className="flex items-center space-x-2 mb-2">
//                     <div
//                       className="w-4 h-4 rounded-full"
//                       style={{ backgroundColor: theme.primary }}
//                     ></div>
//                     <div
//                       className="w-4 h-4 rounded-full"
//                       style={{ backgroundColor: theme.secondary }}
//                     ></div>
//                   </div>
//                   <p className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
//                     {theme.name}
//                   </p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Predefined Colors
//             </h4>
//             <div className="grid grid-cols-8 gap-2">
//               {predefinedColors.map((color, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleColorSelect(color)}
//                   className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
//                     resumeData.headerColor === color
//                       ? "border-gray-800 ring-2 ring-purple-400"
//                       : "border-gray-300"
//                   }`}
//                   style={{ backgroundColor: color }}
//                   title={color}
//                 />
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Custom Color
//             </h4>
//             <div className="flex items-center space-x-4">
//               <input
//                 type="color"
//                 value={resumeData.headerColor || "#3b82f6"}
//                 onChange={(e) => handleColorSelect(e.target.value)}
//                 className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
//               />
//               <input
//                 type="text"
//                 value={customColor || resumeData.headerColor || ""}
//                 onChange={handleCustomColorChange}
//                 placeholder="#3b82f6"
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Typography Section */}
//       {activeSection === "fonts" && (
//         <div className="space-y-6">
//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Name Styling
//             </h4>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Font Style
//                 </label>
//                 <select
//                   value={resumeData.nameFontStyle || "regular"}
//                   onChange={(e) =>
//                     setResumeData({ nameFontStyle: e.target.value as "regular" | "bold" | "italic" | "bold-italic" })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 >
//                   {fontStyles.map((style) => (
//                     <option key={style} value={style}>
//                       {style.charAt(0).toUpperCase() +
//                         style.slice(1).replace("-", " ")}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Font Size
//                 </label>
//                 <select
//                   value={resumeData.nameFontSize || 18}
//                   onChange={(e) =>
//                     setResumeData({ nameFontSize: parseInt(e.target.value) })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 >
//                   {fontSizes.map((size) => (
//                     <option key={size} value={size}>
//                       {size}px
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Title Styling
//             </h4>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Font Style
//                 </label>
//                 <select
//                   value={resumeData.tagFontStyle || "regular"}
//                   onChange={(e) =>
//                     setResumeData({ tagFontStyle: e.target.value as "regular" | "bold" | "italic" | "bold-italic" })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 >
//                   {fontStyles.map((style) => (
//                     <option key={style} value={style}>
//                       {style.charAt(0).toUpperCase() +
//                         style.slice(1).replace("-", " ")}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Font Size
//                 </label>
//                 <select
//                   value={resumeData.tagFontSize || 14}
//                   onChange={(e) =>
//                     setResumeData({ tagFontSize: parseInt(e.target.value) })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 >
//                   {fontSizes.map((size) => (
//                     <option key={size} value={size}>
//                       {size}px
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Summary Styling
//             </h4>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Font Style
//                 </label>
//                 <select
//                   value={resumeData.summaryFontStyle || "regular"}
//                   onChange={(e) =>
//                     setResumeData({ summaryFontStyle: e.target.value as "regular" | "bold" | "italic" | "bold-italic" })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 >
//                   {fontStyles.map((style) => (
//                     <option key={style} value={style}>
//                       {style.charAt(0).toUpperCase() +
//                         style.slice(1).replace("-", " ")}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Font Size
//                 </label>
//                 <select
//                   value={resumeData.summaryFontSize || 12}
//                   onChange={(e) =>
//                     setResumeData({ summaryFontSize: parseInt(e.target.value) })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
//                 >
//                   {fontSizes.map((size) => (
//                     <option key={size} value={size}>
//                       {size}px
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Profile Picture Section */}
//       {activeSection === "image" && (
//         <div className="space-y-6">
//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Profile Picture
//             </h4>

//             {resumeData.image ? (
//               <div className="text-center">
//                 <Image
//                   src={resumeData.image}
//                   alt="Profile Preview"
//                   className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4"
//                   width={32}
//                   height={32}
//                   style={{ borderColor: resumeData.headerColor || "#3b82f6" }}
//                 />
//                 <div className="space-x-4">
//                   <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
//                     <FiImage className="w-4 h-4 mr-2" />
//                     Change Picture
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                     />
//                   </label>
//                   <button
//                     onClick={removeImage}
//                     className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                   >
//                     Remove Picture
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center">
//                 <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center border-4 border-dashed border-gray-400">
//                   <FiImage className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 cursor-pointer transition-all duration-300 transform hover:scale-105">
//                   <FiImage className="w-5 h-5 mr-2" />
//                   Upload Profile Picture
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </label>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Recommended: Square image, at least 200x200px
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-50 rounded-lg p-4">
//             <h5 className="font-semibold text-gray-800 mb-2">
//               Tips for Great Profile Pictures:
//             </h5>
//             <ul className="text-sm text-gray-600 space-y-1">
//               <li>• Use a professional, high-quality photo</li>
//               <li>• Ensure good lighting and clear visibility</li>
//               <li>• Dress appropriately for your industry</li>
//               <li>• Keep the background simple and clean</li>
//               <li>• Smile naturally and look confident</li>
//             </ul>
//           </div>
//         </div>
//       )}

//       {/* Advanced Section */}
//       {activeSection === "advanced" && (
//         <div className="space-y-6">
//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Template Settings
//             </h4>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-sm text-gray-600 mb-4">
//                 More advanced customization options will be available soon,
//                 including:
//               </p>
//               <ul className="text-sm text-gray-600 space-y-2">
//                 <li className="flex items-center">
//                   <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
//                   Layout variations and spacing options
//                 </li>
//                 <li className="flex items-center">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
//                   Section reordering and visibility controls
//                 </li>
//                 <li className="flex items-center">
//                   <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
//                   Custom CSS styling options
//                 </li>
//                 <li className="flex items-center">
//                   <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
//                   Export format preferences
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 mb-4">
//               Reset Options
//             </h4>
//             <div className="space-y-3">
//               <button
//                 onClick={() => setResumeData({ headerColor: "#3b82f6" })}
//                 className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
//               >
//                 Reset Colors to Default
//               </button>
//               <button
//                 onClick={() =>
//                   setResumeData({
//                     nameFontStyle: "regular",
//                     nameFontSize: 18,
//                     tagFontStyle: "regular",
//                     tagFontSize: 14,
//                     summaryFontStyle: "regular",
//                     summaryFontSize: 12,
//                   })
//                 }
//                 className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Reset Typography to Default
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ThemeCustomizer;

"use client";
// headerColor

import React, { useState } from "react";
import { useResumeStore } from "../../../lib/store";
import { FiDroplet, FiType, FiImage, FiSettings } from "react-icons/fi";
import { predefinedColors } from "../../../lib/resumeConstants";
import Image from "next/image";

const ThemeCustomizer: React.FC = () => {
  const { resumeData, setResumeData } = useResumeStore();
  
  
  const [activeSection, setActiveSection] = useState<string>("colors");
  const [customColor, setCustomColor] = useState("");

  const fontStyles = ["regular", "bold", "italic", "bold-italic"];
  const fontSizes = [10, 12, 14, 16, 18, 20, 24, 28, 32];

  const themes = [
    { name: "Professional Blue", primary: "#3b82f6", secondary: "#1e40af" },
    { name: "Corporate Purple", primary: "#7c3aed", secondary: "#5b21b6" },
    { name: "Modern Green", primary: "#10b981", secondary: "#047857" },
    { name: "Creative Orange", primary: "#f59e0b", secondary: "#d97706" },
    { name: "Elegant Pink", primary: "#ec4899", secondary: "#be185d" },
    { name: "Tech Gray", primary: "#6b7280", secondary: "#374151" },
  ];

  const handleColorSelect = (color: string) => {
    setResumeData({ headerColor: color });
    setCustomColor("");
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      setResumeData({ headerColor: color });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setResumeData({ profileImage: null });
  };

  const applyTheme = (theme: (typeof themes)[0]) => {
    setResumeData({ headerColor: theme.primary });
  };

  const sections = [
    { id: "colors", label: "Colors & Themes", icon: FiDroplet },
    { id: "fonts", label: "Typography", icon: FiType },
    { id: "image", label: "Profile Picture", icon: FiImage },
    { id: "advanced", label: "Advanced", icon: FiSettings },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FiDroplet className="mr-2" />
        Customize Your Resume
      </h3>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Colors & Themes Section */}
      {activeSection === "colors" && (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Themes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {themes.map((theme, index) => (
                <button
                  key={index}
                  onClick={() => applyTheme(theme)}
                  className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors group"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.secondary }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                    {theme.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Predefined Colors
            </h4>
            <div className="grid grid-cols-8 gap-2">
              {predefinedColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                    resumeData.headerColor === color
                      ? "border-gray-800 ring-2 ring-purple-400"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Custom Color
            </h4>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={resumeData.headerColor || "#3b82f6"}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={customColor || resumeData.headerColor || ""}
                onChange={handleCustomColorChange}
                placeholder="#3b82f6"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Typography Section */}
      {activeSection === "fonts" && (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Name Styling
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Style
                </label>
                <select
                  value={resumeData.nameFontStyle || "regular"}
                  onChange={(e) =>
                    setResumeData({
                      nameFontStyle: e.target.value as
                        | "regular"
                        | "bold"
                        | "italic"
                        | "bold-italic",
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <select
                  value={resumeData.nameFontSize || 18}
                  onChange={(e) =>
                    setResumeData({ nameFontSize: parseInt(e.target.value) })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Title Styling
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Style
                </label>
                <select
                  value={resumeData.tagFontStyle || "regular"}
                  onChange={(e) =>
                    setResumeData({
                      tagFontStyle: e.target.value as
                        | "regular"
                        | "bold"
                        | "italic"
                        | "bold-italic",
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <select
                  value={resumeData.tagFontSize || 14}
                  onChange={(e) =>
                    setResumeData({ tagFontSize: parseInt(e.target.value) })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Summary Styling
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Style
                </label>
                <select
                  value={resumeData.summaryFontStyle || "regular"}
                  onChange={(e) =>
                    setResumeData({
                      summaryFontStyle: e.target.value as
                        | "regular"
                        | "bold"
                        | "italic"
                        | "bold-italic",
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <select
                  value={resumeData.summaryFontSize || 12}
                  onChange={(e) =>
                    setResumeData({ summaryFontSize: parseInt(e.target.value) })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
        </div>
      )}

      {/* Profile Picture Section */}
      {activeSection === "image" && (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Profile Picture
            </h4>

            {resumeData.profileImage ? (
              <div className="text-center">
                <Image
                  src={resumeData.profileImage}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4"
                  width={128} // Updated to match visible size
                  height={128}
                  style={{ borderColor: resumeData.headerColor || "#3b82f6" }}
                />
                <div className="space-x-4">
                  <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                    <FiImage className="w-4 h-4 mr-2" />
                    Change Picture
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={removeImage}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove Picture
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center border-4 border-dashed border-gray-400">
                  <FiImage className="w-12 h-12 text-gray-400" />
                </div>
                <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 cursor-pointer transition-all duration-300 transform hover:scale-105">
                  <FiImage className="w-5 h-5 mr-2" />
                  Upload Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Recommended: Square image, at least 200x200px
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-2">
              Tips for Great Profile Pictures:
            </h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use a professional, high-quality photo</li>
              <li>• Ensure good lighting and clear visibility</li>
              <li>• Dress appropriately for your industry</li>
              <li>• Keep the background simple and clean</li>
              <li>• Smile naturally and look confident</li>
            </ul>
          </div>
        </div>
      )}

      {/* Advanced Section */}
      {activeSection === "advanced" && (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Template Settings
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">
                More advanced customization options will be available soon,
                including:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Layout variations and spacing options
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Section reordering and visibility controls
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Custom CSS styling options
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Export format preferences
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Reset Options
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => setResumeData({ headerColor: "#3b82f6" })}
                className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Reset Colors to Default
              </button>
              <button
                onClick={() =>
                  setResumeData({
                    nameFontStyle: "regular",
                    nameFontSize: 18,
                    tagFontStyle: "regular",
                    tagFontSize: 14,
                    summaryFontStyle: "regular",
                    summaryFontSize: 12,
                  })
                }
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset Typography to Default
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeCustomizer;
