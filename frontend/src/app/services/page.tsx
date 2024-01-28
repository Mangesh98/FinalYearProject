"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Services() {
	return (
		<>
			<div className="w-full fixed bg-gray-100">
				<Navbar />
			</div>
			{/* <div className="container mx-auto mt-24 px-4 py-12"> */}
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 mt-24">
				<h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
					Services
				</h1>

				<p className="text-gray-600 dark:text-gray-400 mb-6">
					Our Eye Disease Classification Model is a cutting-edge artificial
					intelligence (AI) solution designed to assist in the early detection
					and classification of various eye diseases. Leveraging
					state-of-the-art deep learning algorithms, our model analyzes retinal
					images to identify signs of conditions such as diabetic retinopathy,
					glaucoma, and age-related macular degeneration.
				</p>

				<p className="text-gray-600 dark:text-gray-400 mb-6">
					Early detection of eye diseases is crucial for timely intervention and
					prevention of vision loss. Our model is trained on extensive datasets
					and utilizes advanced computer vision techniques to provide accurate
					and efficient classification results.
				</p>

				<p className="text-gray-600 dark:text-gray-400 mb-6">Key Features:</p>

				<ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
					<li>Accurate classification of various eye diseases.</li>
					<li>Rapid analysis of retinal images for quick results.</li>
					<li>
						Integration of advanced AI algorithms for enhanced performance.
					</li>
					<li>User-friendly interface for seamless interaction.</li>
				</ul>

				<p className="text-gray-600 dark:text-gray-400">
					Our mission is to contribute to the improvement of eye health by
					providing accessible and reliable tools for healthcare professionals
					and individuals. If you have any questions or would like to learn more
					about our Eye Disease Classification Model, feel free to contact us.
				</p>
			</div>
			<div className="mt-10">
				<Footer />
			</div>
		</>
	);
}
