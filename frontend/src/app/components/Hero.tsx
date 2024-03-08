"use client";

import Link from "next/link";

export default function Hero() {
	return (
		<>
			<div className="my-24 w-full flex overflow-auto items-center flex-col">
				<div className="mx-auto text-center max-w-screen-lg">
					<h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
						<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
							Eye Disease Classification
						</span>{" "}
						Model.
					</h1>
				</div>

				<div className="mt-10 flex flex-row">
					<Link
						href="/model"
						type="button"
						className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						Get Started
					</Link>
					<button
						type="button"
						className="text-gray-900 hover:text-white hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
					>
						Learn More →
					</button>
				</div>
			</div>
		</>
	);
}
