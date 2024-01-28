"use client";
import Navbar from "@/app/components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
	return (
		<>
			<div className="w-full flex z-50  fixed items-center flex-col bg-gray-100">
				<Navbar />
			</div>
			<div className="flex-none w-full h-auto flex mt-24 mb-16 items-start justify-center border-b border-gray-200 dark:border-gray-600">
				<Hero />
			</div>
			<div className="flex-none w-full h-auto flex items-center justify-center border-b border-gray-200 dark:border-gray-600">
				<Features />
			</div>
			<div className="flex-none w-full h-auto flex items-center justify-center border-b border-gray-200 dark:border-gray-600">
				<Contact />
			</div>
			<div className="mt-10 ">
				<Footer />
			</div>
		</>
	);
}
