import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; // Import axios for HTTP requests

export async function POST(req: NextRequest) {
	const baseUrl = process.env.BACKEND_URL;
	const formData = await req.formData();
	const file = formData.get("file") as File;

	if (!file) {
		return NextResponse.json({ message: "No image found", success: false });
	}

	try {
		// Send the image data to Flask API
		const response = await axios.post(`${baseUrl}/upload_image`, formData);

		console.log(response.data);

		// Handle successful response from Flask API
		if (response.data.success) {
			let imageUrl = baseUrl + response.data.imageUrl;
			return NextResponse.json({
				message: "Image uploaded successfully",
				imageUrl: imageUrl,
				success: true,
			});
		} else {
			// console.error("Error processing image in Flask API:", response.data);
			return NextResponse.json({
				message: "Error processing image",
				success: false,
			});
		}
	} catch (error) {
		// console.error("Error sending image to Flask API:", error);
		return NextResponse.json({
			message: "Error sending image to Flask API:",
			success: false,
		});
	}
}
