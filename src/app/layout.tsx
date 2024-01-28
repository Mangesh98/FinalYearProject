// import { ToastContainer } from "react-toastify";
import "./globals.css";
// import "react-toastify/dist/ReactToastify.css";

export const metadata = {
	title: "EyeQ",
	description: "Eye disease classification model",
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
