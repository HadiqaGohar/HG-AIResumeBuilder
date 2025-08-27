// // // import type { NextConfig } from "next";

// // // const nextConfig: NextConfig = {
  
// // //   /* config options here */
// // //   images: {
// // //     domains: ['cv-creator.co.uk', "file.aiquickdraw.com", "website.cdn.novoresume.com", "lh3.googleusercontent.com"],
// // //     // If you have other external image domains, add them here too.
// // //     // For example: domains: ['example.com', 'another-domain.net'],
// // //   },
  
// // // };

// // // export default nextConfig;









// // // // Disable Turbopack in next.config.js:
// // // // If Turbopack is enabled by default, disable it in next.config.js:
// // // // js

// // // // Collapse

// // // // Wrap

// // // // Copy
// // // // module.exports = {
// // // //   experimental: {
// // // //     turbo: false,
// // // //   },
// // // // };

// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   images: {
// //     remotePatterns: [
// //       {
// //         protocol: "https",
// //         hostname: "lh3.googleusercontent.com",
// //         port: "",
// //         pathname: "/**",
// //       },
// //       {
// //         protocol: "https",
// //         hostname: "avatars.githubusercontent.com",
// //         port: "",
// //         pathname: "/**",
// //       },
// //       {
// //         protocol: "https",
// //         hostname: "platform-lookaside.fbsbx.com",
// //         port: "",
// //         pathname: "/**",
// //       },
// //       {
// //         protocol: "https",
// //         hostname: "cv-creator.co.uk",
// //         port: "",
// //         pathname: "/**",
// //       },
// //       {
// //         protocol: "https",
// //         hostname: "file.aiquickdraw.com",
// //         port: "",
// //         pathname: "/**",
// //       },
// //       {
// //         protocol: "https",
// //         hostname: "website.cdn.novoresume.com",
// //         port: "",
// //         pathname: "/**",
// //       },
// //     ],
// //   },
  
// //   // experimental: {
// //   //   turbo: false, // Disable Turbopack if causing issues
// //   // },
// // };

// // export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "platform-lookaside.fbsbx.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "cv-creator.co.uk",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "file.aiquickdraw.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "website.cdn.novoresume.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },

//   experimental: {
//     esmExternals: "loose", // ESM packages like @react-pdf/renderer ke liye
//     turbo: false,        // Agar turbopack issue kare to isko uncomment kar sakti ho
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cv-creator.co.uk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "file.aiquickdraw.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "website.cdn.novoresume.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

