import { FaAsterisk, FaAtom, FaBahai, FaBullseye } from "react-icons/fa";

export default function Features() {
	return (
		<>
			<div className="gap-12 w-full flex max-w-6xl items-center pt-16 px-12 pb-16 flex-col justify-start">
				<div className="flex items-center flex-col justify-start">
					<h2 className="text-white text-3xl m-2 md:text-5xl lg:text-6xl">
						Transcending Traditional Diagnosis Methods
					</h2>
				</div>
				<div className="flex items-center flex-col justify-start">
					<div className="container mx-auto py-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
							<FeatureItem
								icon={<FaAsterisk className="text-4xl dark:text-red-600" />}
								title="Accurate Results"
								description="Substitute uncertainty with our model's precise diagnostics, minimizing the risk of human error."
							/>
							<FeatureItem
								icon={<FaAtom className="text-4xl dark:text-blue-700" />}
								title="Efficient Diagnosis"
								description="Reduce your waiting time significantly, get a competent diagnosis within moments."
							/>
							<FeatureItem
								icon={<FaBahai className="text-4xl dark:text-green-600" />}
								title="Affordability"
								description="Cost-effective solution that elevates your health status without breaking your bank."
							/>
							<FeatureItem
								icon={<FaBullseye className="text-4xl dark:text-yellow-600" />}
								title="Accessible Anywhere"
								description="With our online platform, gaining insights into your eye health has never been easier."
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

interface FeatureItemProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
	return (
		<div className="flex items-center">
			<div className="icon rounded-full border-2 border-transparent mr-4 p-4">
				{icon}
			</div>
			<div>
				<h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
				<p className="text-gray-900 dark:text-white">{description}</p>
			</div>
		</div>
	);
}
