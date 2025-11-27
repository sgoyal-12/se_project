"use server";
import { authClient } from "@/lib/auth-client"; //import the auth client

type SignUpFormData = {
	email: string;
	password: string;
	name: string;
	role: string;
};

export async function signUpUser(formData: SignUpFormData) {
	const { email, password, name, role } = formData;
	console.table(formData);
	const { data, error } = await authClient.signUp.email(
		{
			email,
			password,
			name,
			callbackURL: "/dashboard",
		},
		{
			onRequest: (ctx) => {
				console.log("Signing up user", ctx);
			},
			onSuccess: (ctx) => {
				console.log("Sign up successful", ctx.data);
			},
			onError: (ctx) => {
				console.error(ctx.error);
			},
		},
	);

	return { data, error };
}
