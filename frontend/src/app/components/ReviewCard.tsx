import Image from "next/image";

interface ReviewCardProps {
	imageSrc: string;
	name: string;
	title: string;
	position: string;
}

// Create a reusable ReviewCard component
function ReviewCard({ imageSrc, name, title, position }: ReviewCardProps) {
	return (
		<figure className="flex flex-col items-center justify-center p-8 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
			<figcaption className="flex flex-col items-center justify-center">
				<Image
					width={96}
					height={96}
					className="rounded-full h-24 w-24 mb-4 object-cover"
					src={imageSrc}
					alt="profile picture"
				/>
				<blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						{title}
					</h3>
				</blockquote>
				<div className="space-y-0.5 font-medium dark:text-white text-center rtl:text-center">
					<div>{name}</div>
					<div className="text-sm text-gray-500 dark:text-gray-400">
						{position}
					</div>
				</div>
			</figcaption>
		</figure>
	);
}

export default function Reviews() {
	return (
		<>
			<div className="grid my-8 max-w-6xl gap-8 md:my-24 md:grid-cols-3">
				<ReviewCard
					imageSrc="https://res.cloudinary.com/dbyioi2qq/image/upload/v1706009888/mwvhe87ynej0ppjaqpks.jpg"
					name="Bonnie Green"
					title="The ease and speed of the service are simply outstanding. It's a game-changer in eye care."
					position="Health Consultant, MedTech"
				/>
				<ReviewCard
					imageSrc="https://res.cloudinary.com/dbyioi2qq/image/upload/v1706009888/uqbb6nsv8ro1ypqkuoiz.jpg"
					name="Roberta Casas"
					title="It proved immensely helpful in the early detection of my eye disease. Absolutely invaluable!"
					position="Patient, Eye-checkup"
				/>
				<ReviewCard
					imageSrc="https://res.cloudinary.com/dbyioi2qq/image/upload/v1706009888/lw56b6ikxanfuh9o4ha9.jpg"
					name="Jese Leos"
					title="Highly recommended! You'll get fast, accurate results. It's a must for all healthcare providers."
					position="Health Consultant, MedTech"
				/>
			</div>
		</>
	);
}
