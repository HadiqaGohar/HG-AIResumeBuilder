// components/CVSecion.js

import React from 'react';
import Image from 'next/image'; // For optimized images
import Link from 'next/link';

const CVSecion = () => {
  return (
    <section className="py-8 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Section: Image and Content Cards */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-start">
          {/* Main image - replace with your actual image path */}
          {/* This is a placeholder for the main image illustration */}
          <div className="relative w-full max-w-lg aspect-[4/3] md:aspect-[5/4]">
             <Image
              src="/hero_tutorial.png" // Replace with your actual image path
              alt="CV Building Illustration"
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>

          {/* Overlay Cards - Position these absolutely based on your exact design */}
          {/* Card 1 */}
          {/* <div className="absolute top-[10%] left-[15%] bg-purple-100 rounded-lg shadow-lg p-3 w-64 transform -translate-x-1/2 -translate-y-1/2 scale-90 md:scale-100">
            <div className="flex items-start">
                
              <div>
                <span className="text-xs font-semibold text-gray-700 block mb-1">Expert Recommended</span>
                <p className="text-sm text-gray-600">Monitored cash intake and deposit records, increasing accuracy and reducing discrepancies.</p>
              </div>
            </div>
          </div> */}

          {/* Card 2 */}
          {/* <div className="absolute top-[40%] left-[50%] bg-green-100 rounded-lg shadow-lg p-3 w-64 transform -translate-x-1/2 -translate-y-1/2 scale-90 md:scale-100">
            <div className="flex items-start">
             <div>
                <span className="text-xs font-semibold text-gray-700 block mb-1">Expert Recommended</span>
                <p className="text-sm text-gray-600">Helped with planning schedules and delegating assignments to meet coverage and service demands.</p>
              </div>
            </div>
          </div> */}

          {/* Card 3 (Staff education) */}
          {/* <div className="absolute top-[70%] left-[20%] bg-blue-100 rounded-lg shadow-lg p-3 w-64 transform -translate-x-1/2 -translate-y-1/2 scale-90 md:scale-100">
            <div className="flex items-start">
              <p className="text-sm text-gray-600">Staff education and training</p>
            </div>
          </div> */}

          {/* Card 4 (POS systems expert) */}
          {/* <div className="absolute top-[85%] left-[60%] bg-yellow-100 rounded-lg shadow-lg p-3 w-64 transform -translate-x-1/2 -translate-y-1/2 scale-90 md:scale-100">
            <div className="flex items-start">
             <p className="text-sm text-gray-600">POS systems expert</p>
            </div>
          </div> */}

          {/* Skills Section - This looks like a separate floating card */}
          {/* <div className="absolute bottom-[0%] right-[-10%] bg-gray-100 rounded-lg shadow-lg p-4 w-56 transform -translate-y-1/2 scale-90 md:scale-100">
            <div className="mb-2">
              <p className="text-sm font-semibold text-gray-800">MS Office</p>
              <div className="flex text-yellow-400">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="text-gray-500 text-xs ml-1">(42)</span>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-sm font-semibold text-gray-800">Hardware development</p>
              <div className="flex text-yellow-400">
                {Array(4).fill(0).map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                 {Array(1).fill(0).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">C++ proficiency</p>
              <div className="flex text-yellow-400">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </div> */}

           {/* Small green plant pot image, adjust positioning */}
           {/* <div className="absolute bottom-[-18%] left-[15%] transform translate-y-1/2">
             <Image
              src="https://file.aiquickdraw.com/imgcompressed/img/compressed_b4418ce4c2c9c8ce844f5de5950bf982.webp" // Replace with your actual plant image path
              alt="Small Plant"
              width={300} // Adjust size as needed
              height={300} // Adjust size as needed
              objectFit="contain"
              quality={100}
            />
           </div> */}
        </div>

        {/* Right Section: Features List */}
        <div className="w-full md:w-1/2">
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 text-sm font-bold mr-3">
                1
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                  Enhance your CV with our expert content
                </h3>
                <p className="text-gray-600">
                  Choose from thousands of top-rated phrases for your CV. Click to insert them directly. Use the star rating system to indicate your skill level.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-bold mr-3">
                2
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  CV and cover letter in one place
                </h3>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mr-3">
                3
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Professionally designed templates
                </h3>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-700 text-sm font-bold mr-3">
                4
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Expert tips & guidance
                </h3>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold mr-3">
                5
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Apply for jobs with confidence
                </h3>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-md hover:bg-yellow-500 transition duration-300 ease-in-out">
          Create new CV
        </button>
       <Link href='/resume/upload'>
        <button className="px-8 py-3 border border-black text-black font-semibold rounded-full shadow-md hover:bg-blue-50 transition duration-300 ease-in-out">
          Improve my CV
        </button>
       </Link>
      </div>
    </section>
  );
};

export default CVSecion;