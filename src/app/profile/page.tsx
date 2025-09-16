
// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   AiOutlineUser,
//   AiOutlineEdit,
//   AiOutlineSave,
//   AiOutlineClose,
// } from "react-icons/ai";
// import { FiMail, FiMapPin } from "react-icons/fi";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import { useCallback } from "react";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     bio: "",
//     location: "",
//     website: "",
//     phone: "",
//   });

//   const loadProfileData = useCallback(async () => {
//     try {
//       const response = await fetch("/api/user/profile");
//       if (response.ok) {
//         const data = await response.json();
//         setProfileData(data);
//       } else {
//         // If no profile exists, use session data
//         setProfileData({
//           name: session?.user?.name || "",
//           email: session?.user?.email || "",
//           bio: "",
//           location: "",
//           website: "",
//           phone: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error loading profile:", error);
//       // Fallback to session data
//       setProfileData({
//         name: session?.user?.name || "",
//         email: session?.user?.email || "",
//         bio: "",
//         location: "",
//         website: "",
//         phone: "",
//       });
//     }
//   }, [session]);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth/signin");
//     }

//     if (session?.user) {
//       // Load existing profile data
//       loadProfileData();
//     }
//   }, [session, status, router, loadProfileData]);

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const response = await fetch("/api/user/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(profileData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success("Profile updated successfully!");
//         setIsEditing(false);
//         // Reload profile data to ensure consistency
//         await loadProfileData();
//       } else {
//         throw new Error(result.error || "Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Profile update error:", error);
//       toast.error(
//         error instanceof Error ? error.message : "Failed to update profile"
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     // Reset to original data
//     if (session?.user) {
//       setProfileData({
//         name: session.user.name || "",
//         email: session.user.email || "",
//         bio: "",
//         location: "",
//         website: "",
//         phone: "",
//       });
//     }
//     setIsEditing(false);
//   };

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!session?.user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
//             <AiOutlineUser className="text-3xl text-white" />
//           </div>
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
//             My Profile
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
//             Manage your account information and preferences with ease
//           </p>
//           <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
//             <div className="flex items-center">
//               <FiMail className="mr-1 text-blue-500" />
//               Account Settings
//             </div>
//             <div className="flex items-center">
//               <FiMapPin className="mr-1 text-green-500" />
//               Profile Management
//             </div>
//             <div className="flex items-center">
//               <AiOutlineEdit className="mr-1 text-yellow-500" />
//               Easy Editing
//             </div>
//           </div>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
//         </motion.div>

//         {/* Profile Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
//         >
//           {/* Cover Section */}
//           <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
//             <div className="absolute -bottom-16 left-8">
//               <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
//                 {session.user.image ? (
//                   <Image
//                     src={session.user.image}
//                     alt={session.user.name || "User"}
//                     width={128}
//                     height={128}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
//                     <AiOutlineUser className="text-white text-4xl" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Edit Button */}
//             <div className="absolute top-4 right-4">
//               {!isEditing ? (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsEditing(true)}
//                   className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//                 >
//                   <AiOutlineEdit className="text-lg" />
//                   Edit Profile
//                 </motion.button>
//               ) : (
//                 <div className="flex gap-2">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleSave}
//                     disabled={isSaving}
//                     className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isSaving ? (
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <AiOutlineSave className="text-lg" />
//                     )}
//                     {isSaving ? "Saving..." : "Save"}
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleCancel}
//                     className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//                   >
//                     <AiOutlineClose className="text-lg" />
//                     Cancel
//                   </motion.button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Profile Content */}
//           <div className="pt-20 p-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Basic Information */}
//               <div className="space-y-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                   Basic Information
//                 </h2>

//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name
//                   </label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={profileData.name}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, name: e.target.value })
//                       }
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <AiOutlineUser className="text-gray-400" />
//                       <span className="text-gray-900">{profileData.name}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <FiMail className="text-gray-400" />
//                     <span className="text-gray-900">{profileData.email}</span>
//                     <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                       Verified
//                     </span>
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone Number
//                   </label>
//                   {isEditing ? (
//                     <input
//                       type="tel"
//                       value={profileData.phone}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           phone: e.target.value,
//                         })
//                       }
//                       placeholder="Enter your phone number"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <span className="text-gray-500">
//                         {profileData.phone || "Not provided"}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Additional Information */}
//               <div className="space-y-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                   Additional Information
//                 </h2>

//                 {/* Bio */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Bio
//                   </label>
//                   {isEditing ? (
//                     <textarea
//                       value={profileData.bio}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, bio: e.target.value })
//                       }
//                       placeholder="Tell us about yourself..."
//                       rows={4}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                     />
//                   ) : (
//                     <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">
//                       <span className="text-gray-500">
//                         {profileData.bio || "No bio provided"}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Location */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Location
//                   </label>
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       value={profileData.location}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           location: e.target.value,
//                         })
//                       }
//                       placeholder="City, Country"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <FiMapPin className="text-gray-400" />
//                       <span className="text-gray-500">
//                         {profileData.location || "Not provided"}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Website */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Website
//                   </label>
//                   {isEditing ? (
//                     <input
//                       type="url"
//                       value={profileData.website}
//                       onChange={(e) =>
//                         setProfileData({
//                           ...profileData,
//                           website: e.target.value,
//                         })
//                       }
//                       placeholder="https://yourwebsite.com"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   ) : (
//                     <div className="p-3 bg-gray-50 rounded-lg">
//                       {profileData.website ? (
//                         <a
//                           href={profileData.website}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline"
//                         >
//                           {profileData.website}
//                         </a>
//                       ) : (
//                         <span className="text-gray-500">
//                           No website provided
//                         </span>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Account Stats */}
//             <div className="mt-8 pt-8 border-t border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                 Account Statistics
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-blue-50 p-6 rounded-xl">
//                   <div className="text-2xl font-bold text-blue-600">0</div>
//                   <div className="text-sm text-blue-800">Resumes Created</div>
//                 </div>
//                 <div className="bg-green-50 p-6 rounded-xl">
//                   <div className="text-2xl font-bold text-green-600">0</div>
//                   <div className="text-sm text-green-800">Templates Used</div>
//                 </div>
//                 <div className="bg-purple-50 p-6 rounded-xl">
//                   <div className="text-2xl font-bold text-purple-600">
//                     {session.user.email
//                       ? new Date().toLocaleDateString()
//                       : "N/A"}
//                   </div>
//                   <div className="text-sm text-purple-800">Member Since</div>
//                 </div>
//               </div>
//             </div>
//             {/* Development Notice */}
//             <div className="mt-8 pt-8 border-t border-gray-200 text-center">
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-2xl px-6 py-4">
//                 <p className="text-blue-600 font-medium">
//                   🚧 We are working on this page! 🚧
//                 </p>
//                 <p className="text-sm text-gray-600 mt-1">
//                   More features coming soon...
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineUser,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineClose,
} from "react-icons/ai";
import { FiMail, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCallback } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    phone: "",
  });

  const loadProfileData = useCallback(async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        setProfileData({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          bio: "",
          location: "",
          website: "",
          phone: "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setProfileData({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        bio: "",
        location: "",
        website: "",
        phone: "",
      });
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }

    if (session?.user) {
      loadProfileData();
    }
  }, [session, status, router, loadProfileData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        await loadProfileData();
      } else {
        throw new Error(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        email: session.user.email || "",
        bio: "",
        location: "",
        website: "",
        phone: "",
      });
    }
    setIsEditing(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4">
        <div className="w-6 sm:w-8 h-6 sm:h-8 border-2 sm:border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-2 sm:mb-4">
            <AiOutlineUser className="text-2xl sm:text-3xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            My Profile
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-2 sm:mb-4">
            Manage your account information and preferences with ease
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <FiMail className="mr-1 text-blue-500" />
              Account Settings
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-1 text-green-500" />
              Profile Management
            </div>
            <div className="flex items-center">
              <AiOutlineEdit className="mr-1 text-yellow-500" />
              Easy Editing
            </div>
          </div>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-2 sm:mt-4 rounded-full"></div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/20 overflow-hidden"
        >
          {/* Cover Section */}
          <div className="h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6">
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border-2 sm:border-4 border-white bg-white overflow-hidden shadow-lg">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <AiOutlineUser className="text-white text-2xl sm:text-4xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-gray-700 px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <AiOutlineEdit className="text-base sm:text-lg" />
                  Edit Profile
                </motion.button>
              ) : (
                <div className="flex gap-1 sm:gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <div className="w-3 sm:w-4 h-3 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <AiOutlineSave className="text-base sm:text-lg" />
                    )}
                    {isSaving ? "Saving..." : "Save"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <AiOutlineClose className="text-base sm:text-lg" />
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-12 sm:pt-16 p-2 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  Basic Information
                </h2>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <AiOutlineUser className="text-gray-400 text-sm" />
                      <span className="text-gray-900 text-sm">{profileData.name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <FiMail className="text-gray-400 text-sm" />
                    <span className="text-gray-900 text-sm">{profileData.email}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-sm">
                        {profileData.phone || "Not provided"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  Additional Information
                </h2>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-lg min-h-[80px]">
                      <span className="text-gray-500 text-sm">
                        {profileData.bio || "No bio provided"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({ ...profileData, location: e.target.value })
                      }
                      placeholder="City, Country"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <FiMapPin className="text-gray-400 text-sm" />
                      <span className="text-gray-500 text-sm">
                        {profileData.location || "Not provided"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData({ ...profileData, website: e.target.value })
                      }
                      placeholder="https://yourwebsite.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {profileData.website ? (
                        <a
                          href={profileData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {profileData.website}
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          No website provided
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Account Statistics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-blue-50 p-2 sm:p-4 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">0</div>
                  <div className="text-xs sm:text-sm text-blue-800">Resumes Created</div>
                </div>
                <div className="bg-green-50 p-2 sm:p-4 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">0</div>
                  <div className="text-xs sm:text-sm text-green-800">Templates Used</div>
                </div>
                <div className="bg-purple-50 p-2 sm:p-4 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">
                    {session.user.email
                      ? new Date().toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-800">Member Since</div>
                </div>
              </div>
            </div>

            {/* Development Notice */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-lg sm:rounded-2xl px-2 sm:px-4 py-2 sm:py-3">
                <p className="text-blue-600 font-medium text-sm sm:text-base">
                  🚧 We are working on this page! 🚧
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  More features coming soon...
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
