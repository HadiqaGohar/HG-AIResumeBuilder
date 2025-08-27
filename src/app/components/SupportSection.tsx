'use client';
import React, { useState } from 'react';
import { HiChat, HiMail, HiBookOpen } from "react-icons/hi";
import { HiBugAnt } from "react-icons/hi2";
import BugReportModal from './BugReportModal';

const SupportSection = () => {
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  



  const supportOptions = [
    {
      icon: HiBugAnt,
      title: "Report a Bug",
      description: "Found an issue? Help us fix it quickly",
      action: () => setIsBugModalOpen(true),
      color: "orange"
    },
    {
      icon: HiChat,
      title: "Live Chat",
      description: "Chat with our support team",
      action: () => console.log("Open chat"),
      color: "blue"
    },
    {
      icon: HiMail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: () => window.location.href = "mailto:support@resumecraft.com",
      color: "green"
    },
    {
      icon: HiBookOpen,
      title: "Help Center",
      description: "Browse our knowledge base",
      action: () => console.log("Open help center"),
      color: "purple"
    }
  ];

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
          height: 230px;
        }
        .card:hover {
          transform: rotate(0deg) scale(1.05) translateZ(10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl uppercase mt-20 font-light text-gray-900 mb-4 animate-fadeInUp">
          Need Help? <span className="font-black">{"We're Here"} </span> for You
        </h2>
        
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-10 animate-fadeInUp">
          Get support, report issues, or find answers to common questions
        </p>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={index}
                onClick={option.action}
                className="card bg-white rounded-xl shadow-md p-6 border-2 border-purple-200 transition-all duration-300 hover:animate-liftHover cursor-pointer"
              >
                <IconComponent className="w-14 h-14 mx-auto mb-4 text-purple-600 transition-transform hover:rotate-12" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        {/* <div className="bg-white rounded-xl shadow-md border-2 border-purple-200 overflow-hidden animate-fadeInUp">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'faq'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'status'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              System Status
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'faq' && (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      <span className="text-purple-600 group-open:rotate-180 transition-transform duration-200">
                        ▼
                      </span>
                    </summary>
                    <div className="mt-2 p-4 text-gray-600 bg-white border-l-4 border-purple-600">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            )}

            {activeTab === 'status' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Resume Builder</span>
                  </div>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Template System</span>
                  </div>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">PDF Export</span>
                  </div>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">AI Suggestions</span>
                  </div>
                  <span className="text-yellow-600 font-medium">Maintenance</span>
                </div>
              </div>
            )}
          </div>
        </div> */}

        {/* Contact Info */}
        <div className="mt-10 animate-fadeInUp space-x-8">
          <a
            href="mailto:support@resumecraft.com"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold text-lg hover:animate-liftHover inline-block"
            aria-label="Email Support"
          >
            Email Support
          </a>
          <a
            href="/contact"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold text-lg hover:animate-liftHover inline-block"
            aria-label="Call Support"
          >
            Contact Us
          </a>
        </div>
        <p className="text-gray-400 text-xs mt-6 animate-fadeInUp">
          Support Available 24/7 - Last Updated: 04:24 PM PKT, Aug 03, 2025
        </p>
      </div>

      {/* Bug Report Modal */}
      <BugReportModal 
        isOpen={isBugModalOpen} 
        onClose={() => setIsBugModalOpen(false)} 
      />
    </section>
  );
};

export default SupportSection;