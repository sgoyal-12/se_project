"use client";
import React, { useState, useEffect } from "react";
import {
	Star,
	Truck,
	AlertTriangle,
	Plus,
	Search,
	MoreHorizontal,
	MapPin,
	Calendar,
	Package,
	ArrowUpRight,
	Box,
	LogOut,
	Settings,
	Bell,
	Menu,
	X,
	ChevronRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { authClient } from "@/lib/auth-client";
import { NewShipmentButton } from "@/components/new-shipment-button";

// --- Utility for Tailwind Classes ---
function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// --- Mock Components for Preview ---

const Button = React.forwardRef(
	(
		{ className, variant = "primary", size = "md", children, ...props },
		ref,
	) => {
		const variants = {
			primary:
				"bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/10",
			secondary:
				"bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
			ghost:
				"bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
			outline:
				"bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50",
			emerald:
				"bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20",
		};
		const sizes = {
			sm: "h-8 px-3 text-xs",
			md: "h-10 px-4 text-sm",
			lg: "h-12 px-6 text-base",
			icon: "h-10 w-10 p-0 flex items-center justify-center",
		};

		return (
			<button
				ref={ref}
				className={cn(
					"inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
					variants[variant],
					sizes[size],
					className,
				)}
				{...props}
			>
				{children}
			</button>
		);
	},
);

const Badge = ({ children, variant = "default", className }) => {
	const variants = {
		default: "bg-gray-100 text-gray-800",
		success: "bg-emerald-100 text-emerald-700",
		warning: "bg-yellow-100 text-yellow-700",
		error: "bg-red-100 text-red-700",
		info: "bg-blue-100 text-blue-700",
	};
	return (
		<span
			className={cn(
				"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
				variants[variant],
				className,
			)}
		>
			{children}
		</span>
	);
};

const Card = ({ children, className }) => (
	<div
		className={cn(
			"bg-white rounded-3xl border border-gray-100 shadow-sm",
			className,
		)}
	>
		{children}
	</div>
);

// --- New Stat Card Component ---

const StatCard = ({ name, icon, value, trend, trendUp, colorClass, delay }) => (
	<div
		className={cn(
			"relative overflow-hidden bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group",
			"animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards",
		)}
		style={{ animationDelay: `${delay}ms` }}
	>
		<div className="flex justify-between items-start mb-4">
			<div
				className={cn(
					"p-3 rounded-2xl transition-colors duration-300",
					colorClass,
				)}
			>
				{React.cloneElement(icon, { size: 20 })}
			</div>
			{trend && (
				<div
					className={cn(
						"flex items-center text-xs font-medium px-2 py-1 rounded-full",
						trendUp
							? "bg-emerald-50 text-emerald-600"
							: "bg-red-50 text-red-600",
					)}
				>
					{trendUp ? (
						<ArrowUpRight className="w-3 h-3 mr-1" />
					) : (
						<ArrowUpRight className="w-3 h-3 mr-1 rotate-90" />
					)}
					{trend}
				</div>
			)}
		</div>
		<div>
			<h3 className="text-gray-500 text-sm font-medium mb-1">{name}</h3>
			<p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
		</div>

		{/* Decorative background element */}
		<div className="absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
			{React.cloneElement(icon, { size: 100 })}
		</div>
	</div>
);

// --- Main Dashboard Component ---

export default function DashboardPage() {
	const { data: session, isPending } = authClient.useSession();
	const [shipments, setShipments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const handleNewShipment = (shipment) => {
		setShipments((prev) => [shipment, ...prev]);
	};

	useEffect(() => {
		const fetchShipments = async () => {
			if (session?.user.id) {
				try {
					const response = await fetch(`/api/shipments`);
					if (!response.ok) {
						console.error("Failed to fetch shipments:", response.statusText);
						return;
					}
					const data = await response.json();
					setShipments(data);
				} catch (error) {
					console.error("Error fetching shipments:", error);
					// For preview purposes only, fallback to mock data if fetch fails
					setShipments([
						{
							id: "TRK-9281",
							name: "Fresh Avocados",
							shippedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
							destination: "San Francisco, CA",
							status: "In Transit",
							items: 450,
						},
						{
							id: "TRK-3321",
							name: "Premium Wagyu",
							shippedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
							destination: "New York, NY",
							status: "Delivered",
							items: 120,
						},
						{
							id: "TRK-1102",
							name: "Organic Berries",
							shippedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
							destination: "Seattle, WA",
							status: "Delayed",
							items: 800,
						},
					]);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchShipments();
	}, [session?.user?.id]);

	const stats = [
		{
			name: "Total Shipments",
			value: "1,284",
			icon: <Package />,
			color: "bg-blue-50 text-blue-600",
			trend: "+12%",
			trendUp: true,
		},
		{
			name: "Average Rating",
			value: "4.9",
			icon: <Star className="fill-current" />,
			color: "bg-yellow-50 text-yellow-600",
			trend: "+0.2",
			trendUp: true,
		},
		{
			name: "Active Violations",
			value: "2",
			icon: <AlertTriangle />,
			color: "bg-red-50 text-red-600",
			trend: "-5%",
			trendUp: true, // Decreasing violations is good
		},
		{
			name: "On-Time Rate",
			value: "98.5%",
			icon: <Truck />,
			color: "bg-emerald-50 text-emerald-600",
			trend: "+1.5%",
			trendUp: true,
		},
	];

	if (isPending)
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50/50 flex font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
			{/* Sidebar Navigation */}
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block",
					isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
				)}
			>
				<div className="h-full flex flex-col p-6">
					<div className="flex items-center space-x-3 mb-10">
						<div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
							<Box size={18} strokeWidth={3} />
						</div>
						<span className="text-xl font-bold tracking-tight">TraceFresh</span>
					</div>

					<nav className="flex-1 space-y-1">
						<NavItem icon={<Box size={20} />} label="Overview" active />
					</nav>

					<div className="mt-auto pt-8 border-t border-gray-100">
						<button
							onClick={() => authClient.signOut()}
							className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full"
						>
							<LogOut size={20} />
							<span className="font-medium text-sm ">Sign Out</span>
						</button>
					</div>
				</div>
			</aside>

			{/* Mobile Overlay */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Main Content */}
			<main className="flex-1 min-w-0 overflow-y-auto">
				{/* Top Header */}
				<header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<button
							onClick={() => setSidebarOpen(true)}
							className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
						>
							<Menu size={20} />
						</button>
						<h1 className="text-xl font-semibold text-gray-800">Overview</h1>
					</div>

					<div className="flex items-center space-x-4">
						<button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
							<Bell size={20} />
							<span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
						</button>
						<div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm">
							{session?.user?.name?.charAt(0) || "U"}
						</div>
					</div>
				</header>

				<div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
					{/* Welcome Section */}
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
						<div>
							<h2 className="text-3xl font-bold text-gray-900 tracking-tight">
								Welcome back, {session?.user?.name?.split(" ")[0]}
							</h2>
							<p className="text-gray-500 mt-1">
								Here's what's happening with your supply chain today.
							</p>
						</div>
						{/* Note: This button expects a modal/form implementation which is likely separate */}
						<NewShipmentButton />
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{stats.map((stat, i) => (
							<StatCard
								key={stat.name}
								{...stat}
								colorClass={stat.color}
								delay={i * 100}
							/>
						))}
					</div>

					{/* Recent Shipments Table */}
					<Card className="overflow-hidden border-0 ring-1 ring-gray-100">
						<div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
							<div>
								<h3 className="font-bold text-gray-900 text-lg">
									Recent Shipments
								</h3>
								<p className="text-sm text-gray-500">
									Manage your active logistics
								</p>
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left">
								<thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
									<tr>
										<th className="px-6 py-4 font-semibold">Shipment ID</th>
										<th className="px-6 py-4 font-semibold">Cargo</th>
										<th className="px-6 py-4 font-semibold">Destination</th>
										<th className="px-6 py-4 font-semibold">Status</th>
										<th className="px-6 py-4 font-semibold">Shipped</th>
										<th className="px-6 py-4 text-right">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									{loading
										? [...Array(3)].map((_, i) => (
											<tr key={i} className="animate-pulse">
												<td className="px-6 py-4">
													<div className="h-4 bg-gray-100 rounded w-20"></div>
												</td>
												<td className="px-6 py-4">
													<div className="h-4 bg-gray-100 rounded w-32"></div>
												</td>
												<td className="px-6 py-4">
													<div className="h-4 bg-gray-100 rounded w-24"></div>
												</td>
												<td className="px-6 py-4">
													<div className="h-6 bg-gray-100 rounded-full w-16"></div>
												</td>
												<td className="px-6 py-4">
													<div className="h-4 bg-gray-100 rounded w-24"></div>
												</td>
												<td className="px-6 py-4"></td>
											</tr>
										))
										: shipments.map((shipment) => (
											<tr
												key={shipment.id}
												className="group hover:bg-gray-50/80 transition-colors"
											>
												<td className="px-6 py-4 font-medium text-gray-900">
													{shipment.id}
												</td>
												<td className="px-6 py-4">
													<div className="flex items-center">
														<div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mr-3 text-gray-500">
															<Box size={14} />
														</div>
														<span className="font-medium text-gray-700">
															{shipment.name}
														</span>
													</div>
												</td>
												<td className="px-6 py-4 text-gray-600">
													{shipment.destination}
												</td>
												<td className="px-6 py-4">
													<StatusBadge status={shipment.status} />
												</td>
												<td className="px-6 py-4 text-gray-500">
													{formatDistanceToNow(new Date(shipment.shippedAt), {
														addSuffix: true,
													})}
												</td>
												<td className="px-6 py-4 text-right">
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 text-gray-400 group-hover:text-emerald-600"
														onClick={() => {
															window.location.href = `/dashboard/track/${shipment.id}`;
														}}
													>
														Track
														<ChevronRight size={16} />
													</Button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
						{!loading && shipments.length === 0 && (
							<div className="text-center py-16">
								<div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
									<Package size={24} />
								</div>
								<h3 className="text-gray-900 font-medium mb-1">
									No shipments found
								</h3>
								<p className="text-gray-500 text-sm">
									Create a new shipment to get started
								</p>
							</div>
						)}
					</Card>
				</div>
			</main>
		</div>
	);
}

// --- Sub-components ---

function NavItem({ icon, label, active, badge }) {
	return (
		<a
			href="#"
			className={cn(
				"flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
				active
					? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 font-medium"
					: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
			)}
		>
			<span
				className={cn(
					"transition-colors",
					active ? "text-white" : "text-gray-400 group-hover:text-gray-900",
				)}
			>
				{icon}
			</span>
			<span>{label}</span>
			{badge && (
				<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
					{badge}
				</span>
			)}
		</a>
	);
}

function StatusBadge({ status }) {
	const styles = {
		"In Transit": "bg-blue-50 text-blue-700 ring-1 ring-blue-700/10",
		Delivered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10",
		Delayed: "bg-red-50 text-red-700 ring-1 ring-red-700/10",
		Processing: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-700/10",
	};

	return (
		<span
			className={cn(
				"inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap",
				styles[status] || "bg-gray-100 text-gray-700",
			)}
		>
			{status === "In Transit" && (
				<span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse"></span>
			)}
			{status}
		</span>
	);
}
