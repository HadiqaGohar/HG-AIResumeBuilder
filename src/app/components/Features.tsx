'use client'
import Link from "next/link";
import { HiSparkles, HiTemplate, HiDocumentDownload, HiEye } from "react-icons/hi";

export default function Features() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 md:px-8">
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes liftHover {
          0% {
            transform: rotate(0deg) scale(1) translateZ(0);
          }
          100% {
            transform: rotate(2deg) scale(1.05) translateZ(10px);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        .hover\\:animate-liftHover:hover {
          animation: liftHover 0.3s ease-in-out forwards;
          z-index: 10;
        }
        .card {
          transition: all 0.3s ease;
        }
        .card:nth-child(1) { height: 230px; }
        .card:nth-child(2) { height: 230px; }
        .card:nth-child(3) { height: 230px; }
        .card:nth-child(4) { height: 230px; }
        .card:hover {
          transform: rotate(0deg) scale(1.05) translateZ(10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl uppercase mt-20 font-light text-gray-900 mb-4 animate-fadeInUp">
          Unleash Your <span className="font-black">Resume </span> Potential
        </h2>
        
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-10 animate-fadeInUp">
          Elevate your job applications with cutting-edge AI tools.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-white rounded-xl shadow-md p-6 border-2 border-purple-200 transition-all duration-300 hover:animate-liftHover">
            <HiSparkles className="w-14 h-14 mx-auto mb-4 text-purple-600 transition-transform hover:rotate-12" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              AI-Enhanced Summaries
            </h3>
            <p className="text-gray-600 text-sm">
              Create tailored summaries with our intelligent AI assistant.
            </p>
          </div>
          <div className="card bg-white rounded-xl shadow-md p-6 border-2 border-purple-200 transition-all duration-300 hover:animate-liftHover">
            <HiTemplate className="w-14 h-14 mx-auto mb-4 text-purple-600 transition-transform hover:rotate-12" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Stylish Templates
            </h3>
            <p className="text-gray-600 text-sm">
              Select from a range of elegant, customizable designs.
            </p>
          </div>
          <div className="card bg-white rounded-xl shadow-md p-6 border-2 border-purple-200 transition-all duration-300 hover:animate-liftHover">
            <HiDocumentDownload className="w-14 h-14 mx-auto mb-4 text-purple-600 transition-transform hover:rotate-12" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Instant PDF Export
            </h3>
            <p className="text-gray-600 text-sm">
              Export your resume as a professional PDF in seconds.
            </p>
          </div>
          <div className="card bg-white rounded-xl shadow-md p-6 border-2 border-purple-200 transition-all duration-300 hover:animate-liftHover">
            <HiEye className="w-14 h-14 mx-auto mb-4 text-purple-600 transition-transform hover:rotate-12" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Live Editing Preview
            </h3>
            <p className="text-gray-600 text-sm">
              Watch your changes live as you build your resume.
            </p>
          </div>
        </div>
        <div className="mt-10 animate-fadeInUp space-x-8">
          <Link href="/template">
            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold text-lg hover:animate-liftHover"
              aria-label="Start Building Your Resume"
            >
              Build New Resume
            </button>
          </Link>
          <Link href="/upload-resume">
            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold text-lg hover:animate-liftHover"
              aria-label="Start Building Your Resume"
            >
              Enhance Existing Resume
            </button>
          </Link>
        </div>
        <p className="text-gray-400 text-xs mt-6 animate-fadeInUp">
          Last Updated: 04:24 PM PKT, Aug 03, 2025
        </p>
      </div>
    </section>
  );
}