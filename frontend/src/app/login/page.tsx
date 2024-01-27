"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import Image from "next/image";
// import styles from "@/app/styles/styles.css";

export default function LoginPage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: "",
		password: "",
	});
	const [buttonDisabled, setButtonDisabled] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			console.log("Login success", response.data);
			toast.success("Login success");
			router.push("/");
		} catch (error: any) {
			console.log("Login failed", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	const onRegister = () => {
		router.push("/signup");
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		// <div className="flex flex-col items-center justify-center min-h-screen py-2">
		// 	<h1>{loading ? "Processing" : "Login"}</h1>
		// 	<hr />

		// 	<label htmlhtmlFor="email">email</label>
		// 	<input
		// 		className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
		// 		id="email"
		// 		type="text"
		// value={user.email}
		// onChange={(e) => setUser({ ...user, email: e.target.value })}
		// 		placeholder="email"
		// 	/>
		// 	<label htmlhtmlFor="password">password</label>
		// 	<input
		// 		className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
		// 		id="password"
		// 		type="password"
		// 		value={user.password}
		// 		onChange={(e) => setUser({ ...user, password: e.target.value })}
		// 		placeholder="password"
		// 	/>
		// 	<button
		// 		onClick={onLogin}
		// 		className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
		// 	>
		// 		Login here
		// 	</button>
		// 	<Link href="/signup">Visit SignUp page</Link>
		// </div>
		<>
			<div className="min-h-screen flex items-center justify-center">
				<div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
					<form className="max-w-sm mx-auto">
						<div className="mb-8">
							<h1 className="text-4xl font-extrabold text-center dark:text-white">
								Welcome Back
							</h1>
						</div>
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
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="name@email.com"
								required
								value={user.email}
								onChange={(e) => setUser({ ...user, email: e.target.value })}
							/>
						</div>
						<div className="mb-5">
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Your password
							</label>
							<input
								type="password"
								id="password"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
							/>
						</div>
						<div className="flex items-start mb-5">
							<div className="flex items-center h-5">
								<input
									id="remember"
									type="checkbox"
									value=""
									className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
									required
								/>
							</div>
							<label
								htmlFor="remember"
								className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Remember me
							</label>
						</div>
						<div className="flex items-center justify-between mb-5">
							<button
								onClick={onLogin}
								type="submit"
								className="text-white hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
							>
								Submit
							</button>
							<button
								onClick={onRegister}
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Register
								<svg
									className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 10"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M1 5h12m0 0L9 1m4 4L9 9"
									/>
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
