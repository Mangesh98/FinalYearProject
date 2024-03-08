"use client";
// Importing necessary dependencies
import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

// Main Contact component
export default function Contact() {
	// State for form data and loading status
	const [contactData, setContactData] = useState({
		username: "",
		email: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [checkboxChecked, setCheckboxChecked] = useState(false);

	// Function to handle form submission
	const onSubmit = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/contact", contactData);
			toast.success(response.data.message);
			setContactData({
				...contactData,
				message: "",
			});
		} catch (error) {
			console.error("Error Sending Message:", error);
			toast.error("Error Sending Message");
		} finally {
			setLoading(false);
		}
	};

	// Fetch user data on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("/api/users/me");
				const userDataFromApi = res.data.data;
				setContactData({
					...contactData,
					username: userDataFromApi.username,
					email: userDataFromApi.email,
				});
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Update button disabled state based on form inputs
	useEffect(() => {
		setButtonDisabled(!contactData.message.trim() || !checkboxChecked);
	}, [contactData.message, checkboxChecked]);

	// Render the component
	return (
		<>
			{/* Toast container for displaying notifications */}
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

			{/* Conditional rendering based on loading state */}
			{loading ? (
				<Loading />
			) : (
				<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 my-24">
					<div className="flex flex-col lg:flex-row">
						{/* Google Map iframe */}
						<div className="lg:w-1/2  mb-4 lg:mb-0 map">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15137.349917208941!2d73.82998565916425!3d18.468366506084312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf8d94414f8f%3A0xc6091a80e79be235!2sSinhgad%20College%20of%20Engineering%2C%20Pune!5e0!3m2!1sen!2sin!4v1706433276766!5m2!1sen!2sin"
								width="100%"
								height="750"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
						</div>

						{/* Contact Form */}
						<div className="lg:w-1/2 dark:text-white">
							<form className="mx-auto max-w-lg">
								{/* Form Header */}
								<p className="text-base text-gray-900 dark:text-white font-semibold">
									Get in Touch Today
								</p>
								<p className="text-4xl text-gray-900 dark:text-white mb-4 font-bold">
									Contact Us
								</p>
								<p className="text-base text-gray-900 dark:text-white font-normal mb-4">
									Connect our team for more information or a free demonstration.
								</p>

								{/* First Name Input */}
								<div className="mb-5">
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										First Name
									</label>
									<input
										type="text"
										id="name"
										value={contactData.username}
										readOnly
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required
									/>
								</div>

								{/* Email Input */}
								<div className="mb-5">
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your email
									</label>
									<input
										type="email"
										id="email"
										value={contactData.email}
										readOnly
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@email.com"
										required
									/>
								</div>

								{/* Message Textarea */}
								<div className="mb-5">
									<label
										htmlFor="message"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your message
									</label>
									<textarea
										name="message"
										id="message"
										rows={15}
										onChange={(e) =>
											setContactData({
												...contactData,
												message: e.target.value,
											})
										}
										value={contactData.message}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Type your message..."
									></textarea>
								</div>

								{/* Checkbox for Terms */}
								<div className="flex items-start mb-5">
									<div className="flex items-center h-5">
										<input
											id="condition"
											type="checkbox"
											checked={checkboxChecked}
											onChange={() => setCheckboxChecked(!checkboxChecked)}
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
											required
										/>
									</div>
									<label
										htmlFor="condition"
										className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										I accept the terms
									</label>
								</div>

								{/* Submit Button with Tooltip */}
								{buttonDisabled ? (
									<button
										type="button"
										data-tooltip-content="Please accept the terms & Write Message"
										data-tooltip-id="submit-tooltip"
										className="cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Submit
									</button>
								) : (
									<button
										onClick={onSubmit}
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Submit
									</button>
								)}
								<Tooltip id="submit-tooltip" />
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
