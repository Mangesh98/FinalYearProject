// import { ToastContainer } from "react-toastify";
import "./globals.css";
// import "react-toastify/dist/ReactToastify.css";

export const metadata = {
	title: {
		default: "EyeQ - Eye Disease Classification Model",
		template: "%s | EyeQ",
	},
	description: "Eye Disease Classification Model",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={"dark:bg-gray-900"}>{children}</body>
		</html>
	);
}
