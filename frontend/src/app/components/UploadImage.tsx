import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";

export default function UploadImage() {
	const [uploading, setUploading] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [processedImage1, setProcessedImage1] = useState<string>("");
	const [processedImage2, setProcessedImage2] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const baseUrl = "http://127.0.0.1:5000";
	const handleUpload = async () => {
		setUploading(true);
		try {
			const file = fileInputRef.current?.files?.[0];

			if (!file) {
				return alert("Please select a file to upload");
			}
			// console.log(file);

			const formData = new FormData();
			formData.append("file", file);

			const response = await axios.post("/api/processImage", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response.data);

			if (response.data.success) {
				// Update state with processed image data received from response
				setProcessedImage1(response.data.imageUrl);
				console.log(processedImage1);
				console.log(response.data.imageUrl);
			} else {
				alert("An error occurred during processing");
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred during upload");
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			<div className="max-w-4xl mx-auto p-20 space-y-6">
				<form encType="multipart/form-data">
					<label htmlFor="file">
						<input
							ref={fileInputRef}
							name="image"
							type="file"
							id="file"
							onChange={() => {
								if (fileInputRef.current?.files) {
									const file = fileInputRef.current.files[0];
									setSelectedImage(URL.createObjectURL(file));
								}
							}}
						/>
						<div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
							{selectedImage ? (
								<Image
									height={50}
									width={50}
									src={selectedImage}
									alt="Uploaded Image"
									className="w-full h-full object-cover"
								/>
							) : (
								<p className="text-gray-400">Select an image</p>
							)}
						</div>
					</label>

					<button
						onClick={handleUpload}
						disabled={uploading}
						style={{ opacity: uploading ? ".5" : "1" }}
						className="bg-red-600 text-center text-white p-3 rounded w-32"
					>
						{uploading ? "Uploading..." : "Upload Image"}
					</button>
				</form>

				<div>
					{/* Display processed images */}
					{processedImage1 && (
						<Image
							src={processedImage1}
							alt="Processed Image 1"
							width={400}
							height={300}
						/>
					)}
					{processedImage2 && (
						<Image
							src={processedImage2}
							alt="Processed Image 2"
							width={400}
							height={300}
						/>
					)}
				</div>
			</div>
		</>
	);
}
