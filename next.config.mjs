/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'utfs.io', // The external domain you want to allow images from
          port: '', // Leave this empty if there is no specific port
          pathname: '/**', // Allow all paths under the domain
        },
      ],
    },
  };
  
  export default nextConfig;
  