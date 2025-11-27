"use client";
"use client";
import React, { useState, useEffect } from "react";
import {
	MapPin,
	Thermometer,
	Bell,
	ArrowRight,
	Shield,
	CheckCircle,
	Star,
	TrendingUp,
	Users,
	Clock,
	Globe,
	Zap,
	Box,
	Menu,
	X,
	Leaf, // Added Leaf icon for EcoCart
} from "lucide-react";

// --- Components ---

const Button = ({
	children,
	variant = "primary",
	className = "",
	...props
}) => {
	const baseStyle =
		"inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
	const variants = {
		primary:
			"bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 shadow-lg shadow-gray-900/20",
		secondary:
			"bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm",
		ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
		accent:
			"bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-emerald-500/30 shadow-lg",
	};
	const sizes = {
		sm: "h-9 px-4 text-sm",
		md: "h-11 px-6 text-base",
		lg: "h-14 px-8 text-lg",
	};

	return (
		<button
			className={`${baseStyle} ${variants[variant]} ${sizes[props.size || "md"]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

const Badge = ({ children, className = "" }) => (
	<span
		className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 ${className}`}
	>
		{children}
	</span>
);

// --- Main Application ---

export default function App() {
	const [isVisible, setIsVisible] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		setIsVisible(true);
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const features = [
		{
			colSpan: "md:col-span-2",
			bg: "bg-gray-50",
			icon: <MapPin className="w-6 h-6 text-emerald-600" />,
			title: "Real-Time Tracking",
			description:
				"Monitor your shipments in real-time with our interactive map and predictive analytics. Know exactly where your goods are, every second of the day.",
			image: (
				<div className="mt-6 w-full h-32 bg-white rounded-xl border border-gray-200 overflow-hidden relative shadow-sm">
					<div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
					<div className="absolute top-1/2 left-1/4 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
					<div className="absolute top-1/2 left-1/4 w-3 h-3 bg-emerald-500 rounded-full"></div>
					<div className="absolute top-1/3 left-2/3 w-3 h-3 bg-gray-400 rounded-full"></div>
					<svg className="absolute inset-0 w-full h-full pointer-events-none">
						<path
							d="M 120 64 Q 200 20 300 50"
							stroke="#10b981"
							strokeWidth="2"
							fill="none"
							strokeDasharray="4 4"
						/>
					</svg>
				</div>
			),
		},
		{
			colSpan: "md:col-span-1",
			bg: "bg-gray-900 text-white",
			icon: <Thermometer className="w-6 h-6 text-emerald-400" />,
			title: "Condition Monitoring",
			description:
				"Ensure product quality with sensors for temp, humidity, and shock.",
			dark: true,
		},
		{
			colSpan: "md:col-span-1",
			bg: "bg-emerald-50",
			icon: <Bell className="w-6 h-6 text-emerald-600" />,
			title: "Smart Alerts",
			description:
				"Receive intelligent alerts for delays and deviations instantly.",
		},
		{
			colSpan: "md:col-span-2",
			bg: "bg-white border border-gray-200",
			icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
			title: "Predictive Analytics",
			description:
				"Forecast potential disruptions before they happen. Our AI analyzes historical data to suggest the safest and fastest routes for your specific cargo type.",
		},
	];

	const stats = [
		{
			icon: <Shield className="w-5 h-5" />,
			value: "99.9%",
			label: "Uptime Guarantee",
		},
		{
			icon: <Users className="w-5 h-5" />,
			value: "500K+",
			label: "Shipments Tracked",
		},
		{
			icon: <Clock className="w-5 h-5" />,
			value: "50ms",
			label: "Response Time",
		},
	];

	const testimonials = [
		{
			quote:
				"TraceFresh revolutionized our supply chain visibility. We've reduced losses by 40%.",
			author: "Sarah Chen",
			role: "Supply Chain Director",
			company: "FreshCorp",
		},
		{
			quote:
				"The real-time insights helped us optimize our entire logistics operation.",
			author: "Michael Torres",
			role: "Operations Manager",
			company: "GlobalTrade",
		},
	];

	return (
		<div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
			{/* Navigation */}
			<nav
				className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3" : "bg-transparent py-5"}`}
			>
				<div className="container mx-auto px-6 flex justify-between items-center">
					<a href="/" className="flex items-center space-x-2 group">
						<div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform">
							<Box size={20} strokeWidth={2.5} />
						</div>
						<span className="text-xl font-bold tracking-tight">TraceFresh</span>
					</a>

					{/* Desktop Nav */}
					<div className="hidden md:flex items-center space-x-8">
						<a
							href="#features"
							className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
						>
							Features
						</a>
						<a
							href="#testimonials"
							className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
						>
							Testimonials
						</a>

						{/* New EcoCart Link */}
						<a
							href="/ecocart"
							className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5 group/eco"
						>
							<Leaf className="w-4 h-4 text-gray-400 group-hover/eco:text-emerald-500 transition-colors" />
							EcoCart
						</a>

						<div className="flex items-center space-x-2 ml-4">
							<a href="/sign-in">
								<Button size="sm" variant="ghost">
									Sign In
								</Button>
							</a>
							<a href="/sign-up">
								<Button size="sm" variant="primary">
									Sign Up
								</Button>
							</a>
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2 text-gray-600"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Nav */}
				{isMobileMenuOpen && (
					<div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 shadow-xl">
						<a href="#features" className="text-lg font-medium text-gray-900">
							Features
						</a>
						<a
							href="#testimonials"
							className="text-lg font-medium text-gray-900"
						>
							Testimonials
						</a>
						<a
							href="/ecocart"
							className="text-lg font-medium text-gray-900 flex items-center gap-2"
						>
							<Leaf className="w-5 h-5 text-emerald-600" />
							EcoCart
						</a>
						<div className="pt-4 flex flex-col space-y-3 border-t border-gray-100">
							<a href="/sign-in" className="w-full">
								<Button
									size="md"
									variant="ghost"
									className="w-full justify-start"
								>
									Sign In
								</Button>
							</a>
							<a href="/sign-up" className="w-full">
								<Button size="md" className="w-full">
									Sign Up
								</Button>
							</a>
						</div>
					</div>
				)}
			</nav>

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
				{/* Background Gradients */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-gray-50 to-white rounded-full blur-3xl -z-10 opacity-60"></div>
				<div className="absolute top-20 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl -z-10 opacity-40"></div>

				<div className="container mx-auto px-6 text-center">
					<div
						className={`transform transition-all duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
					>
						<div className="flex justify-center mb-8">
							<Badge className="bg-white shadow-sm py-1.5 px-4 text-sm border-gray-200">
								<Zap className="w-3.5 h-3.5 mr-2 text-emerald-500 fill-emerald-500" />
								Introducing: TraceFresh Analytics - Unlock deeper insights!
							</Badge>
						</div>

						<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-gray-900 leading-[0.9]">
							Supply Chain <br className="hidden md:block" />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-emerald-800 to-emerald-600">
								Transparency.
							</span>
						</h1>

						<p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
							Transform your logistics with real-time tracking, condition
							monitoring, and predictive analytics in one elegant dashboard.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
							<a href="/sign-up">
								<Button
									size="lg"
									variant="primary"
									className="w-full sm:w-auto"
								>
									Start Tracking Now
									<ArrowRight className="w-4 h-4 ml-2" />
								</Button>
							</a>
						</div>

						{/* Stats Bar */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
							{stats.map((stat, index) => (
								<div
									key={index}
									className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex items-center text-emerald-600 mb-2 bg-emerald-50 p-2 rounded-full">
										{stat.icon}
									</div>
									<div className="text-3xl font-bold text-gray-900 tracking-tight">
										{stat.value}
									</div>
									<div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Bento Grid Features Section */}
			<section id="features" className="py-24 bg-white relative">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row justify-between items-end mb-16">
						<div className="max-w-xl">
							<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
								Everything you need to <br />
								<span className="text-gray-400">ship with confidence.</span>
							</h2>
							<p className="text-lg text-gray-600">
								A complete suite of tools designed for modern supply chains.
								Simple enough for beginners, powerful enough for enterprises.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{features.map((feature, index) => (
							<div
								key={index}
								className={`
                  ${feature.colSpan} 
                  ${feature.bg} 
                  rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1
                `}
							>
								<div className="relative z-10 flex flex-col h-full justify-between">
									<div>
										<div
											className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.dark ? "bg-gray-800" : "bg-white shadow-sm"}`}
										>
											{feature.icon}
										</div>
										<h3
											className={`text-2xl font-bold mb-3 ${feature.dark ? "text-white" : "text-gray-900"}`}
										>
											{feature.title}
										</h3>
										<p
											className={`leading-relaxed ${feature.dark ? "text-gray-400" : "text-gray-600"}`}
										>
											{feature.description}
										</p>
									</div>
									{feature.image && feature.image}
								</div>
								{/* Hover Effect Background */}
								{!feature.dark && (
									<div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Social Proof / Trust */}
			<section className="py-24 bg-gray-50 border-t border-b border-gray-100">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold mb-4">
							Trusted by industry leaders
						</h2>
						<div className="flex justify-center gap-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className="w-5 h-5 text-emerald-500 fill-emerald-500"
								/>
							))}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
							>
								<div className="mb-6">
									<Globe className="w-8 h-8 text-gray-300 mb-4" />
									<p className="text-xl text-gray-900 font-medium leading-relaxed">
										"{testimonial.quote}"
									</p>
								</div>
								<div className="flex items-center">
									<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-lg mr-4 border-2 border-white shadow-sm">
										{testimonial.author.charAt(0)}
									</div>
									<div>
										<div className="font-bold text-gray-900">
											{testimonial.author}
										</div>
										<div className="text-sm text-gray-500">
											{testimonial.role} at {testimonial.company}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Logo Strip Placeholder */}
					<div className="mt-16 pt-8 border-t border-gray-200 opacity-50 grayscale flex justify-center items-center gap-12 flex-wrap">
						{/* Simple geometric placeholders for logos */}
						<div className="h-8 w-24 bg-gray-300 rounded"></div>
						<div className="h-8 w-24 bg-gray-300 rounded"></div>
						<div className="h-8 w-24 bg-gray-300 rounded"></div>
						<div className="h-8 w-24 bg-gray-300 rounded"></div>
						<div className="h-8 w-24 bg-gray-300 rounded"></div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-32 bg-white relative overflow-hidden">
				<div className="container mx-auto px-6 relative z-10">
					<div className="max-w-4xl mx-auto bg-gray-900 rounded-[2.5rem] p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden">
						{/* Abstract Shapes */}
						<div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
						<div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

						<h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
							Ready to modernize <br />
							your supply chain?
						</h2>
						<p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
							Join thousands of forward-thinking companies already using
							TraceFresh to deliver faster and safer.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a href="/sign-up">
								<Button size="lg" variant="accent" className="w-full sm:w-auto">
									Start Free Trial
								</Button>
							</a>
						</div>
						<p className="mt-8 text-sm text-gray-500">
							No credit card required • 14-day free trial
						</p>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-white py-12 border-t border-gray-100">
				<div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
					<div className="flex items-center space-x-2 mb-4 md:mb-0">
						<div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center text-white">
							<Box size={14} strokeWidth={3} />
						</div>
						<span className="font-semibold text-gray-900">
							TraceFresh © 2024
						</span>
					</div>
					<div className="flex space-x-8">
						<a href="#" className="hover:text-emerald-600 transition-colors">
							Privacy
						</a>
						<a href="#" className="hover:text-emerald-600 transition-colors">
							Terms
						</a>
						<a href="#" className="hover:text-emerald-600 transition-colors">
							Twitter
						</a>
						<a href="#" className="hover:text-emerald-600 transition-colors">
							LinkedIn
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
