
// "use client";

// import { useState } from "react";

// function Contact() {
//   const [selected, setSelected] = useState(""); // Track selected option
//   const [open, setOpen] = useState(false); // Track dropdown open/close

//   const options = [
//     { value: "", label: "Select a topic" },
//     { value: "ResumeReview", label: "Resume Review" },
//     { value: "TemplateInquiry", label: "Template Inquiry" },
//     { value: "Support", label: "Support" },
//     { value: "FeatureRequest", label: "Feature Request" },
//   ];

//   return (
//     <div className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen flex items-center justify-center px-4">
//       <section className="max-w-3xl mx-auto p-6 my-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xlg">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 px-4 py-1 bg-violet-100 text-sm font-semibold text-gray-900 rounded-full mb-6">
//             <span className="w-3 h-3 bg-violet-500 rounded-full shadow-md"></span>
//             <span>Resume Builder Support</span>
//           </div>
//           <h3 className="text-4xl font-bold text-gray-900 mt-2 bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
//             Let’s Craft Your Perfect Resume
//           </h3>
//           <p className="text-gray-600 mt-3 max-w-md mx-auto text-lg">
//             Have questions or need assistance? Contact us for resume support,
//             templates, or feature suggestions!
//           </p>
//         </div>

//         {/* Decorative Bar */}
//         <div className="flex justify-center mb-10">
//           <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-full w-1/2 h-1.5 transform transition-all duration-500 hover:scale-110" />
//         </div>

//         {/* Contact Form */}
//         <form
//           action="https://api.web3forms.com/submit"
//           method="POST"
//           className="space-y-6 p-6 bg-white rounded-xl"
//         >
//           <input
//             type="hidden"
//             name="access_key"
//             value="671277a9-3056-46df-ae88-682920d99420"
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="fullName"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 placeholder="Enter your full name"
//                 className="w-full p-3 border-b focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
//                 required
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Your Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 className="w-full p-3 border-b focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
//                 required
//               />
//             </div>
//           </div>

//           {/* Custom Dropdown */}
//           <div className="w-full">
//             <label
//               htmlFor="query"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Inquiry Type
//             </label>

//             {/* hidden input for form submit */}
//             <input type="hidden" name="query" value={selected} />

//             <div className="relative">
//               {/* Button */}
//               <div
//                 onClick={() => setOpen(!open)}
//                 className="p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer flex justify-between items-center"
//               >
//                 {selected
//                   ? options.find((opt) => opt.value === selected)?.label
//                   : "Select a topic"}
//                 <span className="ml-2 text-gray-500">▼</span>
//               </div>

//               {/* Options */}
//               {open && (
//                 <ul className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-lg bg-white shadow-md z-10">
//                   {options.map((opt) => (
//                     <li
//                       key={opt.value}
//                       onClick={() => {
//                         setSelected(opt.value);
//                         setOpen(false);
//                       }}
//                       className="cursor-pointer hover:bg-purple-100 p-2 rounded"
//                     >
//                       {opt.label}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="message"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               placeholder="Type your message here..."
//               className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 resize-y"
//               rows={5}
//               required
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition duration-300 shadow-md"
//           >
//             Send Message
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

// export default Contact;




"use client";

import { useState } from "react";

function Contact() {
  const [selected, setSelected] = useState(""); // Track selected option
  const [open, setOpen] = useState(false); // Track dropdown open/close

  const options = [
    { value: "", label: "Select a topic" },
    { value: "ResumeReview", label: "Resume Review" },
    { value: "TemplateInquiry", label: "Template Inquiry" },
    { value: "Support", label: "Support" },
    { value: "FeatureRequest", label: "Feature Request" },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen flex items-center justify-center px-2 sm:px-4">
      <section className="max-w-3xl mx-auto p-2 sm:p-4 my-4 sm:my-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl sm:rounded-2xl">
        {/* Header Section */}
        <div className="text-center mb-2 sm:mb-4">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-1 bg-violet-100 text-xs sm:text-sm font-semibold text-gray-900 rounded-full sm:rounded-lg mb-2 sm:mb-4">
            <span className="w-2 sm:w-3 h-2 sm:h-3 bg-violet-500 rounded-full shadow-md"></span>
            <span>Resume Builder Support</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Let’s Craft Your Perfect Resume
          </h3>
          <p className="text-gray-600 mt-1 sm:mt-2 max-w-md mx-auto text-sm sm:text-lg">
            Have questions or need assistance? Contact us for resume support,
            templates, or feature suggestions!
          </p>
        </div>

        {/* Decorative Bar */}
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-full w-1/3 sm:w-1/2 h-1 sm:h-1.5 transition-all duration-500 hover:scale-110" />
        </div>

        {/* Contact Form */}
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-2 sm:space-y-4 p-2 sm:p-4 bg-white rounded-lg sm:rounded-xl"
        >
          <input
            type="hidden"
            name="access_key"
            value="671277a9-3056-46df-ae88-682920d99420"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full p-1 sm:p-2 border-b focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-xs sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-1 sm:p-2 border-b focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-xs sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Custom Dropdown */}
          <div className="w-full">
            <label
              htmlFor="query"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Inquiry Type
            </label>

            {/* hidden input for form submit */}
            <input type="hidden" name="query" value={selected} />

            <div className="relative">
              {/* Button */}
              <div
                onClick={() => setOpen(!open)}
                className="p-1 sm:p-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer flex justify-between items-center text-xs sm:text-sm"
              >
                {selected
                  ? options.find((opt) => opt.value === selected)?.label
                  : "Select a topic"}
                <span className="ml-1 sm:ml-2 text-gray-500">▼</span>
              </div>

              {/* Options */}
              {open && (
                <ul className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-lg bg-white shadow-md z-10">
                  {options.map((opt) => (
                    <li
                      key={opt.value}
                      onClick={() => {
                        setSelected(opt.value);
                        setOpen(false);
                      }}
                      className="cursor-pointer hover:bg-purple-100 p-1 sm:p-2 rounded text-xs sm:text-sm"
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              className="w-full p-1 sm:p-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 resize-y text-xs sm:text-sm"
              rows={3}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-1 sm:py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition duration-300 shadow-md text-xs sm:text-sm"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
