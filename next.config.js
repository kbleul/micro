

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "mullet-ready-suitably.ngrok-free.app",
        protocol: "https",
      },
      {
        hostname: "t3.ftcdn.net",
        protocol: "https",

      },
      {
        hostname: "100.42.183.54",
        protocol: "http",
      },
      {
        hostname: "dummyimage.com",
        protocol: "https",
      }
      
    ],
  },



  webpack(config, { webpack, isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false, os: false };
    }
    // Enable WebAssembly experiments
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };


    return config;
  },

};


module.exports = nextConfig;

