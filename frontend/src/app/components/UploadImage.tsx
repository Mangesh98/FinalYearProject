import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Loading from "../loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadImage() {
	const [uploading, setUploading] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const [result, setResult] = useState("");
	const [processedImage1, setProcessedImage1] = useState<string>("");
	const [processedImage2, setProcessedImage2] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleUpload = async () => {
		setUploading(true);
		try {
			const file = fileInputRef.current?.files?.[0];

			if (!file) {
				return toast.error("Please select a file to upload");
			}
			// console.log(file);

			const formData = new FormData();
			formData.append("file", file);

			const response = await axios.post("/api/processImage", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			// console.log(response.data);

			if (response.data.success) {
				// Update state with processed image data received from response
				setProcessedImage1(response.data.threshold_image);
				setProcessedImage2(response.data.grayscale_image);
				setResult(response.data.result);
				console.log(result);
				
				toast.success("Image processed successfully");
			} else {
				toast.error("An error occurred during processing");
			}
		} catch (error) {
			// console.error(error);
			toast.error("An error occurred during upload");
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			<div className="toaster">
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
			</div>
			{uploading ? (
				<Loading />
			) : (
				<div className="">
					<form encType="multipart/form-data">
						<label htmlFor="file">
							<input
								className="text-white hidden"
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
							<div className="w-80 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
								{selectedImage ? (
									<Image
										height={200}
										width={200}
										src={selectedImage}
										alt="Uploaded Image"
									/>
								) : (
									<p className="text-gray-400">Select an image</p>
								)}
							</div>
							{/* className="w-full h-full object-cover" */}
						</label>
						{selectedImage ? (
							<button
								onClick={handleUpload}
								disabled={uploading}
								style={{ opacity: uploading ? ".5" : "1" }}
								className="bg-red-600 text-center text-white p-3 my-2 rounded w-32"
							>
								{uploading ? "Processing..." : "Process"}
							</button>
						) : (
							<button
								disabled
								onClick={handleUpload}
								style={{ opacity: uploading ? ".5" : "1" }}
								className="cursor-not-allowed bg-red-600 text-center text-white p-3 my-2 rounded w-32"
							>
								{uploading ? "Processing..." : "Process"}
							</button>
						)}
					</form>

					<div>
						{/* Display processed images */}
						{processedImage1 && (
							<>
								<span className="w-52 text-red-700 block font-bold p-4 m-4 border border-red-600">{result}</span>
								<Image
									src={processedImage1}
									alt="Processed Image 1"
									width={200}
									height={200}
								/>
							</>
						)}
						{processedImage2 && (
							<Image
								src={processedImage2}
								alt="Processed Image 2"
								width={200}
								height={200}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}
