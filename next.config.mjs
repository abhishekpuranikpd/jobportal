/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', // Single hostname as a string
        port: '', // Optional: leave empty if no specific port
        pathname: '/**', // Allow all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Another hostname as a separate object
        port: '', // Optional: leave empty if no specific port
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
