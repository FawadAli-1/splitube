/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ytimg.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "i9.ytimg.com",
                port: ""
            },
        ]
    }
};

export default nextConfig;
