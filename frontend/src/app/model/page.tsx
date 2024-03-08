"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadImage from "../components/UploadImage";

export default function Model() {
	const [imagePath, setImagePath] = useState("path/to/your/image.jpg");

	const processImage = async () => {
		try {
			const response = await fetch("/api/processImage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ image_path: imagePath }),
			});

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Error during API call:", error);
		}
	};
	return (
		<>
			<div className="w-full fixed bg-gray-100 ">
				<Navbar />
			</div>
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 mt-24">
				<UploadImage />
			</div>
		</>
	);
}
