

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
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

