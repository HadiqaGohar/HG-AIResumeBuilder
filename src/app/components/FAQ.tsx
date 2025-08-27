"use client";

import React, { useState } from 'react';

export default function FAQSection() {
  const faqs = [
    {
      question: "How can AI enhance my resume in 2 minutes?",
      answer: "Our AI tool analyzes your profile, optimizes keywords, and generates a professional resume within 2 minutes."
    },
    {
      question: "What sets an AI-generated resume apart?",
      answer: "AI ensures ATS compatibility, industry-specific formatting, and a polished layout to impress employers."
    },
    {
      question: "Can I include hackathon projects?",
      answer: "Yes, our AI assists in integrating hackathon projects with detailed descriptions to highlight your skills."
    },
    {
      question: "Is the resume service free?",
      answer: "The basic resume generation is free, with premium features available for advanced customization."
    },
    {
      question: "How do I receive resume feedback?",
      answer: "Submit your resume for AI-driven feedback, providing actionable insights to improve your document."
    },
  ];

  return (
    <section className="w-full py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 2xl:py-20 bg-gray-50 text-gray-900">
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center mb-6 sm:mb-8 md:mb-10 text-gray-800 border-b-2 border-gray-300 pb-2">Frequently Asked Questions</h2>
        <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" bg-white  hover:shadow-md transition-shadow">
      <button
        className="w-full  text-left p-3 sm:p-4 md:p-5 lg:p-6 bg-purple-100 flex justify-between items-center hover:bg-blue-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-900">{question}</span>
        <span className="text-lg sm:text-xl md:text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      <hr className='mt-6'/>
      {isOpen && (
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
}