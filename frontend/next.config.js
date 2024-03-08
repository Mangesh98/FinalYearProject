/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https", 
				hostname: "tecdn.b-cdn.net",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "http",
				hostname: "127.0.0.1",
			},
		],
	},
};

module.exports = nextConfig;
