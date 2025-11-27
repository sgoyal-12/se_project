"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
	Box,
	Mail,
	Lock,
	ArrowRight,
	Loader2,
	Github,
	AlertCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

// --- Styled Components (Reused from Sign Up for consistency) ---

const Input = ({ label, icon, error, ...props }) => (
	<div className="space-y-2">
		<label className="text-sm font-medium text-gray-700 block ml-1">
			{label}
		</label>
		<div className="relative group">
			<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors">
				{icon}
			</div>
			<input
				className={`
          w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl 
          text-gray-900 placeholder:text-gray-400 
          focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
          transition-all duration-200
          ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
        `}
				{...props}
			/>
		</div>
		{error && (
			<div className="flex items-center text-red-500 text-xs mt-1 ml-1">
				<AlertCircle className="w-3 h-3 mr-1" />
				{error}
			</div>
		)}
	</div>
);

const Button = ({
	children,
	isLoading,
	variant = "primary",
	className = "",
	...props
}) => {
	const variants = {
		primary:
			"bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-900/20",
		outline:
			"bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm",
	};

	return (
		<button
			className={`
        w-full relative flex items-center justify-center py-4 px-6 font-semibold rounded-xl 
        hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
		</button>
	);
};

// --- Main Sign In Component ---

export default function SignInPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSocialLoading, setIsSocialLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await authClient.signIn.email(
				{
					email: formData.email,
					password: formData.password,
				},
				{
					onSuccess: () => {
						// The callbackURL in config usually handles redirect,
						// but we can ensure it here if needed.
						window.location.href = "/dashboard";
					},
					onError: (ctx) => {
						setError(ctx.error.message || "Invalid email or password");
						setIsLoading(false);
					},
				},
			);
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
			setIsLoading(false);
		}
	};

	const handleSocialSignIn = async () => {
		setIsSocialLoading(true);
		try {
			await authClient.signIn.social({
				provider: "github",
				callbackURL: "/dashboard",
			});
		} catch (err) {
			setError("Failed to connect to GitHub");
			setIsSocialLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden font-sans selection:bg-emerald-100 selection:text-emerald-900">
			{/* Background Decor */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-gray-50 to-white rounded-full blur-3xl -z-10 opacity-60"></div>
			<div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-40"></div>
			<div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>

			{/* Main Container */}
			<div className="w-full max-w-lg px-6 relative z-10">
				{/* Logo */}
				<div className="flex justify-center mb-8">
					<Link href="/" className="flex items-center space-x-2 group">
						<div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 transform group-hover:rotate-12 transition-transform duration-300">
							<Box size={24} strokeWidth={2.5} />
						</div>
						<span className="text-2xl font-bold tracking-tight text-gray-900">
							TraceFresh
						</span>
					</Link>
				</div>

				<div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-10 relative overflow-hidden ring-1 ring-gray-900/5">
					<div className="text-center mb-8">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							Welcome Back
						</h1>
						<p className="text-gray-500 text-sm">
							Enter your credentials to access your dashboard.
						</p>
					</div>

					{error && (
						<div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start text-red-600 text-sm animate-in slide-in-from-top-2">
							<AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
							<span>{error}</span>
						</div>
					)}

					<div className="space-y-4">
						{/* Social Login */}
						<Button
							variant="outline"
							onClick={handleSocialSignIn}
							isLoading={isSocialLoading}
							className="gap-3"
						>
							<Github className="w-5 h-5" />
							Sign in with GitHub
						</Button>

						<div className="relative flex py-2 items-center">
							<div className="flex-grow border-t border-gray-200"></div>
							<span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase font-medium">
								Or continue with
							</span>
							<div className="flex-grow border-t border-gray-200"></div>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							<Input
								label="Email Address"
								placeholder="name@company.com"
								type="email"
								icon={<Mail className="w-5 h-5" />}
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								required
							/>

							<div className="space-y-2">
								<Input
									label="Password"
									placeholder="••••••••"
									type="password"
									icon={<Lock className="w-5 h-5" />}
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									required
								/>
								<div className="flex justify-end">
									<Link
										href="/forgot-password"
										className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
									>
										Forgot password?
									</Link>
								</div>
							</div>

							<div className="pt-2">
								<Button type="submit" isLoading={isLoading}>
									Sign In <ArrowRight className="w-4 h-4 ml-2" />
								</Button>
							</div>
						</form>
					</div>
				</div>

				{/* Footer Link */}
				<div className="mt-8 text-center">
					<p className="text-gray-600">
						Don't have an account?{" "}
						<Link
							href="/sign-up"
							className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
