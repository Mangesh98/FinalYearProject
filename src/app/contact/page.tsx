"use client";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactPage() {
	return (
		<>
			<div className="w-full fixed bg-gray-100 ">
				<Navbar />
			</div>
			<div className="contact mb-24 border-b border-gray-200 dark:border-gray-600">
				<Contact />
			</div>

			<div className="mt-10">
				<Footer />
			</div>
		</>
	);
}
