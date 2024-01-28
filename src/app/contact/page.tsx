"use client";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactPage() {
	return (
		<>
			<div className="w-full fixed bg-gray-100">
				<Navbar />
			</div>
			<Contact />

			<div className="mt-10">
				<Footer />
			</div>
		</>
	);
}
