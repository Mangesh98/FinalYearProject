import Image from "next/image";

export default function Review() {
	return (
		<>
			<div className="grid my-8 max-w-6xl gap-8 md:my-24 md:grid-cols-3">
				{/* Card 1 */}
				<figure className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
					<figcaption className="flex flex-col items-center justify-center">
						<Image
							width={96}
							height={96}
							className="rounded-full h-24 w-24 mb-4 object-cover"
							src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1706009888/mwvhe87ynej0ppjaqpks.jpg"
							alt="profile picture"
						/>
						<blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								The ease and speed of the service are simply outstanding. It&apos;s a
								game-changer in eye care.
							</h3>
						</blockquote>
						<div className="space-y-0.5 font-medium dark:text-white text-center rtl:text-center">
							<div>Bonnie Green</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Health Consultant, MedTech
							</div>
						</div>
					</figcaption>
				</figure>

				{/* Card 2 */}
				<figure className="dark:bg-gray-800 flex flex-col items-center justify-center p-8 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
					<figcaption className="flex flex-col items-center justify-center">
						<Image
							width={96}
							height={96}
							className="rounded-full h-24 w-24 mb-4 object-cover"
							src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1706009888/uqbb6nsv8ro1ypqkuoiz.jpg"
							alt="profile picture"
						/>
						<blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								It proved immensely helpful in the early detection of my eye
								disease. Absolutely invaluable!
							</h3>
						</blockquote>
						<div className="space-y-0.5 font-medium dark:text-white text-center rtl:text-center">
							<div>Roberta Casas</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Patient, Eye-checkup
							</div>
						</div>
					</figcaption>
				</figure>

				{/* Card 3 */}
				<figure className="dark:bg-gray-800 flex flex-col items-center justify-center p-8 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
					<figcaption className="flex flex-col items-center justify-center">
						<Image
							width={96}
							height={96}
							className="rounded-full h-24 w-24 mb-4 object-cover"
							src="https://res.cloudinary.com/dbyioi2qq/image/upload/v1706009888/lw56b6ikxanfuh9o4ha9.jpg"
							alt="profile picture"
						/>
						<blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Highly recommended! You&apos;ll get fast, accurate results.
								It&apos;s a must for all healthcare providers.
							</h3>
						</blockquote>
						<div className="space-y-0.5 font-medium dark:text-white text-center rtl:text-center">
							<div>Jese Leos</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Health Consultant, MedTech
							</div>
						</div>
					</figcaption>
				</figure>
			</div>
		</>
	);
}
