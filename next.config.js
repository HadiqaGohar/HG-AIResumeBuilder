
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cv-creator.co.uk",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "file.aiquickdraw.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "website.cdn.novoresume.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    esmExternals: "loose", // ESM packages like @react-pdf/renderer ke liye
    turbo: false,        // Agar turbopack issue kare to isko uncomment kar sakti ho
  },
};

module.exports = nextConfig;
