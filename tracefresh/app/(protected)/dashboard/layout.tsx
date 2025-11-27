"use client";
import Header from "@/components/header";
import { authClient } from "@/lib/auth-client";
import { Toaster } from "sonner";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, isPending, error } = authClient.useSession();
	if (!session && !isPending) {
		window.location.href = "/sign-in";
	}
	return (
		<html lang="en">
			<body className="dark">
				<Toaster richColors position="top-right" />
				{children}
			</body>
		</html>
	);
}
