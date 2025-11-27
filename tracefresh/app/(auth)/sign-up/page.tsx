"use client";
import React, { useState } from "react";
import {
	Box,
	Mail,
	Lock,
	User,
	ArrowRight,
	Loader2,
	CheckCircle,
	AlertCircle,
} from "lucide-react";
import { signUpUser } from "@/app/(auth)/sign-up/actions";

// --- Styled Components (Matching Landing Page) ---

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

const Button = ({ children, isLoading, className = "", ...props }) => (
	<button
		className={`
      w-full relative flex items-center justify-center py-4 px-6 
      bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl 
      shadow-lg shadow-gray-900/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
      transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed
      ${className}
    `}
		disabled={isLoading}
		{...props}
	>
		{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
	</button>
);

// --- Main Page Component ---

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	// Validation Logic
	const validate = () => {
		const newErrors = {};
		if (formData.name.length < 2)
			newErrors.name = "Name must be at least 2 characters.";
		if (!formData.email.includes("@"))
			newErrors.email = "Please enter a valid email address.";
		if (formData.password.length < 6)
			newErrors.password = "Password must be at least 6 characters.";
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		const validationErrors = validate();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsLoading(true);

		try {
			const payload = { ...formData, role: "supplier" };
			const { data, error } = await signUpUser(payload);

			if (error) {
				console.error("Signup error:", error);
			} else {
				console.log("Signup successful:", data);
				setIsSuccess(true);
			}
		} catch (error) {
			console.error("Signup failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden font-sans selection:bg-emerald-100 selection:text-emerald-900">
			{/* Background Decor (Same as Landing Page) */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-gray-50 to-white rounded-full blur-3xl -z-10 opacity-60"></div>
			<div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-40"></div>
			<div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>

			{/* Main Card */}
			<div className="w-full max-w-lg px-6 relative z-10">
				{/* Logo */}
				<div className="flex justify-center mb-8">
					<a href="/" className="flex items-center space-x-2 group">
						<div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 transform group-hover:rotate-12 transition-transform duration-300">
							<Box size={24} strokeWidth={2.5} />
						</div>
						<span className="text-2xl font-bold tracking-tight text-gray-900">
							TraceFresh
						</span>
					</a>
				</div>

				<div className="w-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-10 relative overflow-hidden ring-1 ring-gray-900/5">
					{isSuccess ? (
						<div className="text-center py-10 animate-in fade-in zoom-in duration-300">
							<div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<CheckCircle className="w-8 h-8" />
							</div>
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								Welcome aboard!
							</h2>
							<p className="text-gray-500 mb-8">
								Your supplier account has been created successfully.
							</p>
							<Button onClick={() => (window.location.href = "/dashboard")}>
								Go to Dashboard
							</Button>
						</div>
					) : (
						<>
							<div className="text-center mb-10">
								<h1 className="text-2xl font-bold text-gray-900 mb-2">
									Create your account
								</h1>
								<p className="text-gray-500 text-sm">
									Join the network of transparent suppliers.
								</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-5">
								<Input
									label="Full Name"
									placeholder="John Doe"
									type="text"
									icon={<User className="w-5 h-5" />}
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									error={errors.name}
								/>

								<Input
									label="Work Email"
									placeholder="name@company.com"
									type="email"
									icon={<Mail className="w-5 h-5" />}
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									error={errors.email}
								/>

								<Input
									label="Password"
									placeholder="••••••••"
									type="password"
									icon={<Lock className="w-5 h-5" />}
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									error={errors.password}
								/>

								<div className="pt-2">
									<Button type="submit" isLoading={isLoading}>
										Sign Up <ArrowRight className="w-4 h-4 ml-2" />
									</Button>
								</div>

								<p className="text-xs text-center text-gray-400 mt-4">
									By clicking sign up, you agree to our{" "}
									<a href="#" className="underline hover:text-emerald-600">
										Terms of Service
									</a>{" "}
									and{" "}
									<a href="#" className="underline hover:text-emerald-600">
										Privacy Policy
									</a>
									.
								</p>
							</form>
						</>
					)}
				</div>

				{/* Footer Link */}
				<div className="mt-8 text-center">
					<p className="text-gray-600">
						Already have an account?{" "}
						<a
							href="/sign-in"
							className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
						>
							Sign in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
