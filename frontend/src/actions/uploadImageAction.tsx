import axios from "axios";

interface UploadImageResponse {
	success: boolean;
	message?: string;
	imageUrl?: string;
	processedImage1?: string;
	processedImage2?: string;
}

const uploadImage = async (file: unknown): Promise<UploadImageResponse> => {
	try {
		const formData = new FormData();
		formData.append("file", file);

		console.log(formData);

		const response = await axios.post("/api/processImage", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		return response.data;
	} catch (error) {
		console.error("An error occurred during upload", error);
		return { success: false, message: "An error occurred during upload" };
	}
};

export default uploadImage;
