import React from 'react';

// Main App component that renders the two cards
export default function App() {
  return (
    <div className="min-h-[500px] bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 font-sans">
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl w-full flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-10">
        {/* BUILD Card */}
        <Card
          title="BUILD."
          description="Start building your perfect resume with our tools and tips to land your dream IT job ($60,000 - $75,000) in 4 months!"
          buttonText="GET STARTED."
        />

        {/* ENHANCE Card */}
        <Card
          title="ENHANCE."
          description="Take your resume to the next level! Enhance it with hackathon projects and submit for expert feedback."
          buttonText="SUBMIT RESUME."
        />
      </div>
    </div>
  );
}

// Reusable Card Component
type CardProps = {
  icon?: string;
  title: string;
  description: string;
  buttonText: string;
};

function Card({ icon, title, description, buttonText }: CardProps) {
  return (
    <div className="bg-transparent border-amber-50 border-2 rounded-2xl text-center">
      {/* Decorative lines */}
      <div className="flex justify-between px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-1 sm:py-1 md:py-2">
        <div className="w-1/4 sm:w-1/4 md:w-1/3 lg:w-1/3 h-1 bg-amber-50"></div>
        <div className="w-1/4 sm:w-1/4 md:w-1/3 lg:w-1/3 h-1 bg-amber-50"></div>
      </div>
      {/* Card Content */}
      <div className="p-2 sm:p-3  lg:p-6 xl:p-8 text-white">
        {icon && <div className="text-2xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl mb-1 sm:mb-2 md:mb-2 lg:mb-2">{icon}</div>}
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-2 lg:mb-2">{title}</h2>
        <p className="mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 md:p-4 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl">{description}</p>
        <button className="bg-yellow-300 rounded-full text-black px-4 sm:px-3 md:px-4 lg:px-8 xl:px-10 py-1 sm:py-2 md:py-2 lg:py-3 xl:py-3 border border-gray-800 text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

// // Main App component that renders the two cards
// export default function App() {
//   return (
//     <div className="h-[500px] bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center p-4 font-sans">
      
//       <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8">
//         {/* START Card */}
//         {/* <Card
       
//           title="START."
//           description="I'll show you how to START a successful IT Career the modern way and help you land your first job ($60,000 - $75,000) in just 4 months."
//           buttonText="LEARN MORE."
//         /> */}

//         {/* UPGRADE Card */}
//         {/* <Card
          
//           title="UPGRADE."
//           description="I'll help you and show you how to UPGRADE your current IT position to a six-figure engineer salary position in the next 4 months."
//           buttonText="LEARN MORE."
//         /> */}
//          {/* BUILD Card */}
//         <Card
//           title="BUILD."
//           description="Start building your perfect resume with our tools and tips to land your dream IT job ($60,000 - $75,000) in 4 months!"
//           buttonText="GET STARTED."
//         />

//         {/* ENHANCE Card */}
//         <Card
//           title="ENHANCE."
//           description="Take your resume to the next level! Enhance it with hackathon projects and submit for expert feedback."
//           buttonText="SUBMIT RESUME."
//         />
//       </div>
//     </div>
//   );
// }

// // Reusable Card Component (updated based on your input)
// type CardProps = {
//   icon?: string;
//   title: string;
//   description: string;
//   buttonText: string;
// };

// function Card({ icon, title, description, buttonText }: CardProps) {
//   return (
//     <div className='bg-transparent border-amber-50 border-2 rounded-2xl bottom-[4f449d] text-center'> {/* Corrected class syntax */}
//       {/* line both color */}
//       <div>
//         <div></div>
//         <div></div>
//       </div>
//       {/* Card Start and premium */}
//       <div className="p-6 text-white">
//         {icon && <div className="text-4xl mb-2">{icon}</div>}
//         <h2 className="text-4xl font-bold mb-2">{title}</h2>
//         <p className="mb-4 p-7">{description}</p>
//         <button className="bg-yellow-300 rounded-full text-black px-8 py-3 border border-gray-800 ">{buttonText}</button>
//       </div>
//     </div>
//   )
// }
