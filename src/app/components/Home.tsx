// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="flex items-center justify-center h-[600px] lg:h-[700px] bg-white px-4 font-sans">
//       <div className="text-right space-y-6 w-full max-w-2xl">
//         {/* Learning Management Tag */}
//         <div className="inline-flex items-center gap-2 px-3 text-xs lg:px-4 py-1 bg-violet-100 lg:text-sm font-semibold text-gray-900 rounded-full mr-[20%] sm:mr-[32%] lg:mr-[35%] ">
//           <span className="w-2 h-2 lg:w-3 lg:h-3 bg-violet-500 rounded-full shadow-md"></span>
//           <span className="text-xs">RESUME GENERATER</span>
//         </div>
//         {/* <MouseEffect/> */}

//         {/* Heading */}
//         <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-light text-black mr-[7%] sm:mr-[15%] xl:mr-[10%]">
//           BUILD <span className="font-bold">A WORLD</span> CLASS
//         </h2>

//        <div className="-mt-5 lg:-mt-0">
//          {/* ELITE IT with Yellow Highlight */}
//         <div className="relative inline-block mr-[8%] sm:mr-[15%] lg:mr-[15%] xl:mr-[11%] -mb-20">
//           <span className="absolute inset-0 bg-yellow-300 xl:h-10 top-1/2 -translate-y-1/12 z-0"></span>
//           {/* ELITE IT text ko aur lighter kiya gaya hai */}
//           <span className="relative text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-thin tracking-wider  z-10">
//             ELITE CV
//           </span>
//         </div>

//         {/* ENGINEER Architect*/}
//         <h2 className="flex text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl  font-bold text-black ml-[30%] sm:ml-[43%] md:ml-[48%] lg:ml-[38%] xl:ml-[33%] 2xl:ml-[15%]">
//           DESIGNER <span className="text-black rounded-full">.</span>
//         </h2>

//         {/* Curve with dot */}
//         <div className="flex justify-end mr-[20%] -mt-10">
//           <svg
//             width="80"
//             height="80"
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
//         </div>
//        </div>
//         {/* <p className="text-2xl font-thin mr-[25%]">(Partnered with REDHAT, AWS, and IBM)</p> */}
//         <div className="flex flex-col sm:flex-row gap-4 ml-4 sm:ml-[30%] md:ml-[30%] xl:ml-[20%] 2xl:ml-0 lg:ml-0 items-center sm:items-start">
//   <Link href="/template">
//     <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-2 border-transparent px-4 py-2 sm:px-6 lg:px-8 2xl:px-16 sm:py-2 lg:py-3 rounded-full xl:ml-24 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base lg:text-lg">
//       CREATE RESUME
//     </button>
//   </Link>
//   <Link href="/upload-resume">
//     <button className="bg-white border px-4 py-2 sm:px-6 lg:px-8 2xl:px-16 sm:py-2 lg:py-3 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-md text-sm sm:text-base lg:text-lg transform hover:scale-105">
//       UPLOAD RESUME
//     </button>
//   </Link>
// </div>

//       </div>
//     </main>
//   );
// }






























// // 'use client';

// // import Link from 'next/link';

// // export default function Home() {
// //   return (
// //     <main className="relative flex items-center justify-center h-[600px] lg:h-[700px] bg-white px-4 font-sans overflow-hidden">
// //       {/* Background Circles with Blur */}
// //       <div className="absolute top-10 left-10 w-32 h-32 rounded-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/200/200)' }}>
// //         <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>
// //         <div className="relative z-10 flex items-center justify-center h-full">
// //           <span className="text-sm font-semibold text-white drop-shadow-md">Build</span>
// //         </div>
// //       </div>
// //       <div className="absolute bottom-20 right-12 w-48 h-48 rounded-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/300/300)' }}>
// //         <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>
// //         <div className="relative z-10 flex items-center justify-center h-full">
// //           <span className="text-lg font-semibold text-white drop-shadow-md">Create</span>
// //         </div>
// //       </div>
// //       <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/150/150)' }}>
// //         <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>
// //         <div className="relative z-10 flex items-center justify-center h-full">
// //           <span className="text-xs font-semibold text-white drop-shadow-md">CV</span>
// //         </div>
// //       </div>
// //       <div className="absolute bottom-10 left-1/3 w-64 h-64 rounded-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/400/400)' }}>
// //         <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>
// //         <div className="relative z-10 flex items-center justify-center h-full">
// //           <span className="text-xl font-semibold text-white drop-shadow-md">Design</span>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="relative z-20 text-right space-y-6 w-full max-w-2xl">
// //         {/* Learning Management Tag */}
// //         <div className="inline-flex items-center gap-2 px-3 text-xs lg:px-4 py-1 bg-violet-100 lg:text-sm font-semibold text-gray-900 rounded-full mr-[20%] sm:mr-[32%] lg:mr-[35%]">
// //           <span className="w-2 h-2 lg:w-3 lg:h-3 bg-violet-500 rounded-full shadow-md"></span>
// //           <span className="text-xs">RESUME GENERATOR</span>
// //         </div>

// //         {/* Heading */}
// //         <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-light text-black mr-[7%] sm:mr-[15%] xl:mr-[10%]">
// //           BUILD <span className="font-bold">A WORLD</span> CLASS
// //         </h2>

// //         <div className="-mt-5 lg:-mt-0">
// //           {/* ELITE IT with Yellow Highlight */}
// //           <div className="relative inline-block mr-[8%] sm:mr-[15%] lg:mr-[15%] xl:mr-[11%] -mb-20">
// //             <span className="absolute inset-0 bg-yellow-300 xl:h-10 top-1/2 -translate-y-1/12 z-0"></span>
// //             <span className="relative text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-thin tracking-wider z-10">
// //               ELITE CV
// //             </span>
// //           </div>

// //           {/* DESIGNER */}
// //           <h2 className="flex text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-black ml-[30%] sm:ml-[43%] md:ml-[48%] lg:ml-[38%] xl:ml-[33%] 2xl:ml-[15%]">
// //             DESIGNER <span className="text-black rounded-full">.</span>
// //           </h2>

// //           {/* Curve with dot */}
// //           <div className="flex justify-end mr-[20%] -mt-10">
// //             <svg
// //               width="80"
// //               height="80"
// //               viewBox="0 0 60 40"
// //               fill="none"
// //               xmlns="http://www.w3.org/2000/svg"
// //             >
// //               <path
// //                 d="M5 35C20 15 40 15 55 35"
// //                 stroke="#7B61FF"
// //                 strokeWidth="3"
// //                 strokeLinecap="round"
// //               />
// //               <circle cx="55" cy="35" r="4" fill="#7B61FF" />
// //             </svg>
// //           </div>
// //         </div>

// //         {/* Buttons */}
// //         <div className="flex gap-4 ml-16 sm:ml-[30%] md:ml-[30%] xl:ml-[20%] 2xl:ml-0 lg:ml-0">
// //           <Link href="/template">
// //             <button className="bg-white border-2 px-4 py-2 lg:px-8 2xl:px-16 lg:py-3 rounded-full xl:ml-24 hover:bg-[#ebedff] transition duration-200">
// //               GENERATE CV
// //             </button>
// //           </Link>
// //           <Link href="/upload-resume">
// //             <button className="bg-white border-2 px-4 py-2 lg:px-8 2xl:px-16 lg:py-3 rounded-full hover:bg-[#ebedff] transition duration-200">
// //               Upload CV
// //             </button>
// //           </Link>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }



import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-white px-4 font-sans">
      <div className="text-center md:text-right space-y-4 md:space-y-6 w-full max-w-4xl mx-auto">
        {/* Learning Management Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-xs md:text-sm font-semibold text-gray-900 rounded-full md:mr-[20%] lg:mr-[35%]">
          <span className="w-2 h-2 md:w-3 md:h-3 bg-violet-500 rounded-full shadow-md"></span>
          <span>RESUME GENERATOR</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black md:mr-[15%] lg:mr-[10%]">
          BUILD <span className="font-bold">A WORLD</span> CLASS
        </h2>

        <div className="md:-mt-5 lg:mt-0">
          {/* ELITE CV with Yellow Highlight */}
          <div className="relative inline-block md:-mb-16 lg:-mb-20">
            <span className="absolute inset-0 bg-yellow-300 h-4 md:h-5 lg:h-6 top-1/2 -translate-y-1/2 z-0 transform md:scale-110 lg:scale-125"></span>
            <span className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin tracking-wider z-10 px-2">
              ELITE CV
            </span>
          </div>

          {/* DESIGNER */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mt-2 md:mt-0">
            DESIGNER<span className="text-black">.</span>
          </h2>

          {/* Curve with dot - Hidden on mobile, visible on md+ */}
          <div className="hidden md:flex justify-end mr-[20%] -mt-8 lg:-mt-10">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 lg:w-16 lg:h-16"
            >
              <path
                d="M5 35C20 15 40 15 55 35"
                stroke="#7B61FF"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="55" cy="35" r="4" fill="#7B61FF" />
            </svg>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-end md:mr-[15%] lg:mr-[10%] mt-6 md:mt-8">
          <Link href="/template" className="flex justify-center md:block">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-2 border-transparent px-6 py-2.5 md:px-8 lg:px-12 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base lg:text-lg w-full sm:w-auto">
              CREATE RESUME
            </button>
          </Link>
          <Link href="/upload-resume" className="flex justify-center md:block">
            <button className="bg-white border border-gray-300 px-6 py-2.5 md:px-8 lg:px-12 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-md text-sm md:text-base lg:text-lg w-full sm:w-auto transform hover:scale-105">
              UPLOAD RESUME
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
