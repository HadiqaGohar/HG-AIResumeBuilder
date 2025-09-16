// 'use client';

// import React, { useState, useEffect } from 'react';
// import { FiMail, FiUsers, FiCalendar, FiDownload, FiLock, FiEye, FiEyeOff, FiZap, FiTrendingUp, FiAward, FiRefreshCw } from 'react-icons/fi';

// interface Subscriber {
//   _id: string;
//   email: string;
//   type: string;
//   timestamp?: string;
//   subscribedAt?: string;
//   subscribed: boolean;
// }

// interface Stats {
//   count: number;
//   newsletter: number;
//   template_updates: number;
// }

// export default function NotificationsAdmin() {
//   const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [stats, setStats] = useState<Stats>({ 
//     count: 0, 
//     newsletter: 0, 
//     template_updates: 0 
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginError, setLoginError] = useState('');

//   useEffect(() => {
//     // Check if already authenticated in session storage
//     const authenticated = sessionStorage.getItem('admin_authenticated');
//     if (authenticated === 'true') {
//       setIsAuthenticated(true);
//       fetchSubscribers();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoginError('');
    
//     // Check credentials
//     if (email === 'hg12@gmail.com' && password === 'hg1234') {
//       setIsAuthenticated(true);
//       sessionStorage.setItem('admin_authenticated', 'true');
//       fetchSubscribers();
//     } else {
//       setLoginError('Invalid email or password');
//     }
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     sessionStorage.removeItem('admin_authenticated');
//     setEmail('');
//     setPassword('');
//   };

//   const fetchSubscribers = async () => {
//     try {
//       setRefreshing(true);
//       const response = await fetch('/api/notifications');
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setSubscribers(data.notifications || []);
//       setStats({ 
//         count: data.count || 0, 
//         newsletter: data.stats?.newsletter || 0,
//         template_updates: data.stats?.template_updates || 0
//       });
//     } catch (error) {
//       console.error('Error fetching subscribers:', error);
//       alert('Failed to fetch subscribers. Please check the console for details.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const exportEmails = () => {
//     const emails = subscribers.map(s => s.email).join('\n');
//     const blob = new Blob([emails], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'email-subscribers.txt';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const getTypeDisplayName = (type: string) => {
//     switch (type) {
//       case 'newsletter': return 'Newsletter';
//       case 'template_updates': return 'Template Updates';
//       default: return type;
//     }
//   };

//   // Login form if not authenticated
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
//         {/* Background decorative elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
//         </div>

//         <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
//           <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//             <div className="text-center mb-8">
//               <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FiLock className="text-2xl text-white" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
//               <p className="text-gray-600">Sign in to access email subscribers dashboard</p>
//             </div>
            
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter admin email"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
//                     placeholder="Enter password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
              
//               {loginError && (
//                 <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-3 rounded-lg">
//                   {loginError}
//                 </div>
//               )}
              
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
//               >
//                 Sign In
//               </button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-500">
//                 Secure admin access for email subscriber management
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading subscribers...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6">
//             <FiMail className="text-3xl text-white" />
//           </div>
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
//             Email Subscribers Dashboard
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
//             Manage and monitor email subscriptions for template updates and notifications
//           </p>
//           <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-6">
//             <div className="flex items-center">
//               <FiUsers className="mr-1 text-purple-500" />
//               Subscriber Management
//             </div>
//             <div className="flex items-center">
//               <FiTrendingUp className="mr-1 text-green-500" />
//               Analytics Dashboard
//             </div>
//             <div className="flex items-center">
//               <FiAward className="mr-1 text-yellow-500" />
//               Export Tools
//             </div>
//           </div>
//           <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          
//           {/* Logout Button */}
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={handleLogout}
//               className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               Logout
//             </button>
//             <button
//               onClick={fetchSubscribers}
//               disabled={refreshing}
//               className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
//             >
//               <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-full">
//                 <FiUsers className="text-2xl text-white" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Total Subscribers</p>
//                 <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{stats.count}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
//                 <FiMail className="text-2xl text-white" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Newsletter</p>
//                 <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{stats.newsletter}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full">
//                 <FiZap className="text-2xl text-white" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Template Updates</p>
//                 <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">{stats.template_updates}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-full">
//                 <FiCalendar className="text-2xl text-white" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-600">Latest Signup</p>
//                 <p className="text-sm font-medium bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
//                   {subscribers.length > 0 
//                     ? new Date(subscribers[0].timestamp || subscribers[0].subscribedAt || '').toLocaleDateString()
//                     : 'No signups yet'
//                   }
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mb-6 border border-white/20">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Subscriber List</h2>
//               <button
//                 onClick={exportEmails}
//                 disabled={subscribers.length === 0}
//                 className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <FiDownload className="mr-2" />
//                 Export Emails ({subscribers.length})
//               </button>
//             </div>
//           </div>

//           {/* Subscribers List */}
//           <div className="overflow-x-auto">
//             {subscribers.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 <FiMail className="text-4xl mx-auto mb-4 opacity-50" />
//                 <p>No email subscriptions yet</p>
//                 <button 
//                   onClick={fetchSubscribers}
//                   className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//                 >
//                   Refresh Data
//                 </button>
//               </div>
//             ) : (
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date Subscribed
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {subscribers.map((subscriber) => (
//                     <tr key={subscriber._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {subscriber.email}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           subscriber.type === 'newsletter' 
//                             ? 'bg-blue-100 text-blue-800' 
//                             : 'bg-purple-100 text-purple-800'
//                         }`}>
//                           {getTypeDisplayName(subscriber.type)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(subscriber.timestamp || subscriber.subscribedAt || Date.now()).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           subscriber.subscribed
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {subscriber.subscribed ? 'Active' : 'Inactive'}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>

//         {/* Instructions */}
//         <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-2xl p-6">
//           <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">📧 How to Send Notifications</h3>
//           <div className="text-gray-700 space-y-2">
//             <p className="flex items-center"><span className="text-blue-500 mr-2">1.</span> Export the email list using the button above</p>
//             <p className="flex items-center"><span className="text-purple-500 mr-2">2.</span> Use an email service like Mailchimp, SendGrid, or Gmail to send updates</p>
//             <p className="flex items-center"><span className="text-green-500 mr-2">3.</span> Create a template announcing new resume templates</p>
//             <p className="flex items-center"><span className="text-yellow-500 mr-2">4.</span> Send to all subscribers when you launch new templates</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState, useEffect } from "react";
import { FiMail, FiUsers, FiCalendar, FiDownload, FiLock, FiEye, FiEyeOff, FiZap, FiTrendingUp, FiAward, FiRefreshCw, FiTrash2 } from "react-icons/fi";

interface Subscriber {
  _id: string;
  email: string;
  type: string;
  timestamp?: string;
  subscribedAt?: string;
  subscribed: boolean;
}

interface Stats {
  count: number;
  newsletter: number;
  template_updates: number;
}

export default function NotificationsAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<Stats>({ count: 0, newsletter: 0, template_updates: 0 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const authenticated = sessionStorage.getItem("admin_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchSubscribers();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (email === "hg12@gmail.com" && password === "hg1234") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      fetchSubscribers();
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setEmail("");
    setPassword("");
  };

  const fetchSubscribers = async () => {
    try {
      setRefreshing(true);
      const response = await fetch("/api/notifications");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubscribers(data.notifications || []);
      setStats({
        count: data.count || 0,
        newsletter: data.stats?.newsletter || 0,
        template_updates: data.stats?.template_updates || 0,
      });
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      alert("Failed to fetch subscribers. Please check the console for details.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const exportEmails = () => {
    const emails = subscribers.map((s) => s.email).join("\n");
    const blob = new Blob([emails], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-subscribers.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this subscriber?")) {
      try {
        const response = await fetch(`/api/notifications/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setSubscribers(subscribers.filter((s) => s._id !== id));
          setStats((prev) => ({
            ...prev,
            count: prev.count - 1,
            [subscribers.find((s) => s._id === id)?.type]: (prev[subscribers.find((s) => s._id === id)?.type as keyof Stats] || 0) - 1,
          }));
        } else {
          throw new Error("Failed to delete subscriber");
        }
      } catch (error) {
        console.error("Error deleting subscriber:", error);
        alert("Failed to delete subscriber. Please check the console for details.");
      }
    }
  };

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case "newsletter":
        return "Newsletter";
      case "template_updates":
        return "Template Updates";
      default:
        return type;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden p-2 sm:p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 sm:-top-40 -right-32 sm:-right-40 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-32 sm:-bottom-40 -left-32 sm:-left-40 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-md">
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                <FiLock className="text-xl sm:text-2xl text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Admin Access</h1>
              <p className="text-gray-600 text-sm sm:text-base">Sign in to access email subscribers dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-2 rounded-lg">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg text-sm"
              >
                Sign In
              </button>
            </form>

            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                Secure admin access for email subscriber management
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-2 sm:p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-600 mx-auto mb-2 sm:mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-2 sm:mb-4">
            <FiMail className="text-2xl sm:text-3xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            Email Subscribers Dashboard
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-2 sm:mb-4">
            Manage and monitor email subscriptions for template updates and notifications
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500 mb-2 sm:mb-4">
            <div className="flex items-center">
              <FiUsers className="mr-1 text-purple-500" />
              Subscriber Management
            </div>
            <div className="flex items-center">
              <FiTrendingUp className="mr-1 text-green-500" />
              Analytics Dashboard
            </div>
            <div className="flex items-center">
              <FiAward className="mr-1 text-yellow-500" />
              Export Tools
            </div>
          </div>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto rounded-full mb-2 sm:mb-4"></div>

          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            <button
              onClick={handleLogout}
              className="px-3 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              Logout
            </button>
            <button
              onClick={fetchSubscribers}
              disabled={refreshing}
              className="px-3 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            >
              <FiRefreshCw className={`w-3 sm:w-4 h-3 sm:h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-1 sm:p-2 rounded-full">
                <FiUsers className="text-lg sm:text-2xl text-white" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Total Subscribers</p>
                <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {stats.count}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-1 sm:p-2 rounded-full">
                <FiMail className="text-lg sm:text-2xl text-white" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Newsletter</p>
                <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {stats.newsletter}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-1 sm:p-2 rounded-full">
                <FiZap className="text-lg sm:text-2xl text-white" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Template Updates</p>
                <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
                  {stats.template_updates}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-1 sm:p-2 rounded-full">
                <FiCalendar className="text-lg sm:text-2xl text-white" />
              </div>
              <div className="ml-2 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-600">Latest Signup</p>
                <p className="text-xs sm:text-sm font-medium bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {subscribers.length > 0
                    ? new Date(subscribers[0].timestamp || subscribers[0].subscribedAt || "").toLocaleDateString()
                    : "No signups yet"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6 border border-white/20">
          <div className="p-2 sm:p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-0">
                Subscriber List
              </h2>
              <button
                onClick={exportEmails}
                disabled={subscribers.length === 0}
                className="flex items-center px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <FiDownload className="mr-1 sm:mr-2" />
                Export Emails ({subscribers.length})
              </button>
            </div>
          </div>

          {/* Subscribers List */}
          <div className="overflow-x-auto">
            {subscribers.length === 0 ? (
              <div className="p-2 sm:p-4 text-center text-gray-500">
                <FiMail className="text-2xl sm:text-4xl mx-auto mb-2 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base">No email subscriptions yet</p>
                <button
                  onClick={fetchSubscribers}
                  className="mt-2 sm:mt-4 px-2 sm:px-4 py-1 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm sm:text-base"
                >
                  Refresh Data
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Subscribed
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber._id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {subscriber.email}
                      </td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${
                            subscriber.type === "newsletter"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {getTypeDisplayName(subscriber.type)}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {new Date(
                          subscriber.timestamp || subscriber.subscribedAt || Date.now()
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${
                            subscriber.subscribed
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {subscriber.subscribed ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDelete(subscriber._id)}
                          className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-lg sm:rounded-2xl p-2 sm:p-4">
          <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">
            📧 How to Send Notifications
          </h3>
          <div className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <p className="flex items-center">
              <span className="text-blue-500 mr-1 sm:mr-2">1.</span> Export the email list using the button above
            </p>
            <p className="flex items-center">
              <span className="text-purple-500 mr-1 sm:mr-2">2.</span> Use an email service like Mailchimp, SendGrid, or Gmail to send updates
            </p>
            <p className="flex items-center">
              <span className="text-green-500 mr-1 sm:mr-2">3.</span> Create a template announcing new resume templates
            </p>
            <p className="flex items-center">
              <span className="text-yellow-500 mr-1 sm:mr-2">4.</span> Send to all subscribers when you launch new templates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
