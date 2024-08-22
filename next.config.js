

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
      }
      
    ],
  },



  webpack(config, { webpack, isServer }) {
    //console.log(webpack.version); // Check webpack version (should be v5+)
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

