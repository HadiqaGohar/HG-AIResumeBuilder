// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export default function TermsOfUse() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 py-12 font-sans">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-10"
//         >
//           {/* <div className="inline-flex items-center gap-3 px-5 py-2 bg-violet-200 text-sm font-bold text-gray-900 rounded-full shadow-sm">
//             <span className="w-4 h-4 bg-violet-600 rounded-full shadow-md"></span>
//             <span>TERMS OF USE</span>
//           </div> */}
//            <div className="inline-flex items-center gap-2 px-4 py-1 bg-violet-100 text-sm font-semibold text-gray-900 rounded-full mb-6">
//             <span className="w-3 h-3 bg-violet-500 rounded-full shadow-md"></span>
//             <span>TERMS OF USE</span>
//           </div>
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text  text-transparent bg-gradient-to-r from-purple-600 to-blue-600  mt-4">
//             Using Our Platform
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mt-4">
//             Welcome to Resume Generator! These Terms of Use govern your use of our services. By accessing our platform, you agree to these terms.
//           </p>
//         </motion.div>

//         {/* Decorative Bar */}
//         <div className="flex justify-center mb-12">
//           <motion.div
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ duration: 0.7, ease: 'easeOut' }}
//             className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-full w-3/4 h-2 shadow-lg hover:scale-105 transition-transform duration-300"
//           />
//         </div>

//         {/* Terms Content */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 space-y-8"
//         >
//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">1. Acceptance of Terms</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               By using Resume Generator, you agree to these Terms of Use. If you do not agree, please do not use our services.
//             </p>
//           </section>

//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">2. Use of Services</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               You may use our platform to create, edit, and download resumes. You agree to:
//               <ul className="list-disc pl-6 mt-2 space-y-1">
//                 <li>Provide accurate information.</li>
//                 <li>Not use our services for illegal purposes.</li>
//                 <li>Not attempt to hack or disrupt our platform.</li>
//               </ul>
//             </p>
//           </section>

//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">3. User Content</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               You retain ownership of any content you upload (e.g., resume data). By uploading, you grant us a non-exclusive license to process and display your content to provide our services.
//             </p>
//           </section>

//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">4. Intellectual Property</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               All templates, designs, and content provided by Resume Generator are our property. You may use them for personal resume creation but not for commercial purposes without permission.
//             </p>
//           </section>

//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">5. Account Responsibility</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               You are responsible for maintaining the security of your account. Do not share your login credentials. Notify us immediately of any unauthorized access.
//             </p>
//           </section>

//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">6. Termination</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               We may suspend or terminate your access if you violate these terms. You may also delete your account at any time.
//             </p>
//           </section>

//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">7. Limitation of Liability</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
// {'              Our services are provided "as is." We are not liable for any damages arising from your use of the platform, including errors in resume content.'}            </p>
//           </section>

//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">8. Changes to Terms</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               We may update these Terms of Use periodically. Changes will be posted on this page with an updated effective date.
//             </p>
//           </section>

//           <section className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
//             <h2 className="text-2xl font-semibold text-purple-700 mb-3">9. Contact Us</h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               Questions about these terms? Reach out via our{' '}
//               <Link href="/contact" className="text-purple-600 hover:underline font-semibold">
//                 Contact Page
//               </Link>.
//             </p>
//           </section>
//         </motion.div>

//         {/* Call to Action */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="flex justify-center gap-4 mt-10"
//         >
//           <Link href="/template">
//             <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 sm:px-10 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition duration-300 shadow-md">
//               Create Your CV
//             </button>
//           </Link>
//           <Link href="/contact">
//             <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 sm:px-10 py-3 rounded-full font-semibold hover:bg-purple-100 hover:border-purple-700 transition duration-300 shadow-md">
//               Contact Us
//             </button>
//           </Link>
//         </motion.div>

//         {/* Decorative Curve */}
//         {/* <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="flex justify-center mt-10"
//         >
//           <svg
//             width="60"
//             height="60"
//             viewBox="0 0 60 40"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M5 35C20 15 40 15 55 35"
//               stroke="#7B61FF"
//               strokeWidth="3"
//               strokeLinecap="round"
//             />
//             <circle cx="55" cy="35" r="4" fill="#7B61FF" />
//           </svg>
//         </motion.div> */}
//       </div>
//     </main>
//   );
// }


"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-2 sm:px-4 lg:px-8 py-4 sm:py-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 bg-violet-100 text-sm font-semibold text-gray-900 rounded-full mb-2 sm:mb-4">
            <span className="w-2 sm:w-3 h-2 sm:h-3 bg-violet-500 rounded-full shadow-md"></span>
            <span>TERMS OF USE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mt-2 sm:mt-4">
            Using Our Platform
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mt-2 sm:mt-4">
            Welcome to Resume Generator! These Terms of Use govern your use of our services. By accessing our platform, you agree to these terms.
          </p>
        </motion.div>

        {/* Decorative Bar */}
        <div className="flex justify-center mb-4 sm:mb-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-full w-1/2 sm:w-3/4 h-1 sm:h-2 shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Terms Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6"
        >
          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">1. Acceptance of Terms</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              By using Resume Generator, you agree to these Terms of Use. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">2. Use of Services</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              You may use our platform to create, edit, and download resumes. You agree to:
              <ul className="list-disc pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1">
                <li>Provide accurate information.</li>
                <li>Not use our services for illegal purposes.</li>
                <li>Not attempt to hack or disrupt our platform.</li>
              </ul>
            </p>
          </section>

          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">3. User Content</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              You retain ownership of any content you upload (e.g., resume data). By uploading, you grant us a non-exclusive license to process and display your content to provide our services.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">4. Intellectual Property</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              All templates, designs, and content provided by Resume Generator are our property. You may use them for personal resume creation but not for commercial purposes without permission.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">5. Account Responsibility</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              You are responsible for maintaining the security of your account. Do not share your login credentials. Notify us immediately of any unauthorized access.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">6. Termination</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              We may suspend or terminate your access if you violate these terms. You may also delete your account at any time.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">7. Limitation of Liability</h2>
            <p className="text-gray-600 text-sm sm:text-base">
  Our services are provided &quot;as is.&quot; We are not liable for any damages arising from your use of the platform, including errors in resume content.
</p>

          </section>

          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">8. Changes to Terms</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              We may update these Terms of Use periodically. Changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section className="hover:bg-gray-50 p-2 sm:p-3 rounded-lg transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-1 sm:mb-2">9. Contact Us</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Questions about these terms? Reach out via our{' '}
              <Link href="/contact" className="text-purple-600 hover:underline font-semibold">
                Contact Page
              </Link>.
            </p>
          </section>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4 sm:mt-8"
        >
          <Link href="/template">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition duration-300 shadow-md text-sm sm:text-base">
              Create Your CV
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-white border-2 border-purple-600 text-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-purple-100 hover:border-purple-700 transition duration-300 shadow-md text-sm sm:text-base">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
