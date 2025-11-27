"use server";
import { authClient } from "@/lib/auth-client";

type SignInFormData = {
	email: string;
	password: string;
};

export async function signInUser(formData: SignInFormData) {
	const { email, password } = formData;

	const { data, error } = await authClient.signIn.email({
		email,
		password,
		callbackURL: "/dashboard",
		rememberMe: false,
	});

	if (error) {
		console.error("Sign in error", error);
		return;
	}

	console.log("Sign-in success:", data);

	// If no redirect automatically happened:
	if (data?.session) {
		window.location.assign("/dashboard");
	}
}
