"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
	QrCode,
	Thermometer,
	Droplets,
	Calendar,
	MapPin,
	Package,
	ArrowLeft,
	ChevronLeft,
	ChevronRight,
	Loader2,
	AlertCircle,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility for Tailwind Classes ---
function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// --- Mock Data Helpers ---
const formatDistanceToNow = (date) => {
	const now = new Date();
	const diffInSeconds = Math.floor((now - date) / 1000);

	if (diffInSeconds < 60) return "just now";
	if (diffInSeconds < 3600)
		return `${Math.floor(diffInSeconds / 60)} minutes ago`;
	if (diffInSeconds < 86400)
		return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

// --- Components ---

const Button = React.forwardRef(
	(
		{ className, variant = "primary", size = "md", children, ...props },
		ref,
	) => {
		const variants = {
			primary:
				"bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/10",
			ghost:
				"bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
			outline:
				"bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50",
		};
		const sizes = {
			sm: "h-8 px-3 text-xs",
			md: "h-10 px-4 text-sm",
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

// --- Simulated QR Code Component ---
const QRCode = ({ value, className }) => (
	<div
		className={cn(
			"bg-white p-4 rounded-xl border border-gray-200 shadow-sm",
			className,
		)}
	>
		<div className="w-full h-full bg-gray-900 relative overflow-hidden rounded-lg flex items-center justify-center">
			{/* Abstract QR Pattern */}
			<div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-2">
				{[...Array(36)].map((_, i) => (
					<div
						key={i}
						className={cn(
							"bg-white rounded-sm",
							Math.random() > 0.5 ? "opacity-100" : "opacity-20",
						)}
					/>
				))}
			</div>
			{/* Center Icon */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="bg-white p-2 rounded-full shadow-lg">
					<QrCode className="w-6 h-6 text-gray-900" />
				</div>
			</div>
		</div>
		<div className="text-center mt-3 text-xs text-gray-500 font-mono truncate px-2">
			{value}
		</div>
	</div>
);

// --- Main Tracking Page ---

export default function TrackingPage() {
	// get shipmentId from the url path
	const shipmentId = window.location.pathname.split("/").pop();

	const [shipment, setShipment] = useState(null);
	const [logs, setLogs] = useState([]);
	const [loadingLogs, setLoadingLogs] = useState(true);
	const [prediction, setPrediction] = useState(null);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 7;

	const paginatedLogs = useMemo(() => {
		return logs.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage,
		);
	}, [logs, currentPage]);

	// --- Data Fetching Simulation ---
	useEffect(() => {
		if (!shipmentId) return;
		const fetchShipment = async () => {
			try {
				const response = await fetch(`/api/shipments/${shipmentId}`);
				if (!response.ok) {
					throw new Error("Failed to fetch shipment details");
				}
				const data = await response.json();
				setShipment(data);
			} catch (error) {
				console.error("Error fetching shipment:", error);
			}
		};

		const fetchLogs = async () => {
			setLoadingLogs(true); // Set loading to true before fetching
			try {
				const response = await fetch(`/api/shipments/${shipmentId}/logs`);
				if (!response.ok) {
					throw new Error("Failed to fetch shipment logs");
				}
				const data = await response.json();
				console.log("Shipment logs:", data);
				setLogs(data);
			} catch (error) {
				console.error("Error fetching shipment logs:", error);
			} finally {
				setLoadingLogs(false); // Set loading to false after fetch completes (success or error)
			}
		};

		const fetchPrediction = async () => {
			try {
				const response = await fetch(`/api/predictions`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ shipmentId }),
				});
				if (!response.ok) {
					throw new Error("Failed to fetch shipment prediction");
				}
				const data = await response.json();
				setPrediction(data);
			} catch (error) {
				console.error("Error fetching shipment prediction:", error);
			}
		};

		fetchShipment();
		fetchLogs();
		fetchPrediction();

		const interval = setInterval(() => {
			console.log("Polling logs...");
			fetchLogs();
		}, 5000);

		return () => clearInterval(interval);
	}, [shipmentId]);

	return (
		<div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900 pb-20">
			{/* Header */}
			<header className="bg-white border-b border-gray-100 sticky top-0 z-10">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center gap-4">
						<Button
							variant="outline"
							size="icon"
							className="rounded-full w-8 h-8 border-gray-200 cursor-pointer"
							onClick={() => window.history.back()}
						>
							<ArrowLeft size={16} />
						</Button>
						<div>
							<div className="flex items-center gap-3">
								<h1 className="text-xl font-bold tracking-tight">
									Tracking Shipment
								</h1>
								<span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium border border-blue-100">
									In Transit
								</span>
							</div>
							<p className="text-sm text-gray-500 font-mono mt-0.5">
								ID: {shipmentId}
							</p>
						</div>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-6 py-8 space-y-8">
				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column: QR & Visuals */}
					<div className="lg:col-span-1 space-y-6">
						{/* Carbon Footprint Card (Bonus UI from description) */}
						<div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
							<div className="relative z-10">
								<div className="flex items-center gap-2 mb-2 text-emerald-200 text-sm font-medium">
									<Package size={16} />
									Carbon Footprint
								</div>
								<div className="text-3xl font-bold mb-1">
									0.45{" "}
									<span className="text-lg font-normal text-emerald-300">
										kgCO₂e
									</span>
								</div>
								<p className="text-xs text-emerald-400">
									12% lower than average route
								</p>
							</div>
							<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-30"></div>
						</div>
					</div>

					{/* Right Column: Details & Logs */}
					<div className="lg:col-span-2 space-y-8">
						{/* Shipment Details Card */}
						<div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-bold">Shipment Details</h2>
								{shipment && (
									<span className="text-sm text-gray-400">
										Updated {formatDistanceToNow(new Date())}
									</span>
								)}
							</div>

							{shipment ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
									<div className="space-y-1">
										<span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
											Shipment Name
										</span>
										<p className="font-medium text-gray-900 flex items-center gap-2">
											<Package size={16} className="text-gray-400" />
											{shipment.name}
										</p>
									</div>
									<div className="space-y-1">
										<span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
											Destination
										</span>
										<p className="font-medium text-gray-900 flex items-center gap-2">
											<MapPin size={16} className="text-gray-400" />
											{shipment.destination}
										</p>
									</div>
									<div className="space-y-1">
										<span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
											Shipped At
										</span>
										<p className="font-medium text-gray-900 flex items-center gap-2">
											<Calendar size={16} className="text-gray-400" />
											{formatDistanceToNow(new Date(shipment.shippedAt))}
										</p>
									</div>
									<div className="col-span-full space-y-1 pt-4 border-t border-gray-50">
										<span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
											Contents
										</span>
										<p className="font-medium text-gray-900">
											{shipment.items}
										</p>
									</div>
								</div>
							) : (
								<div className="h-40 flex items-center justify-center">
									<Loader2 className="animate-spin text-emerald-500 w-8 h-8" />
								</div>
							)}
						</div>

						{/* Logs Section */}
						<div>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold">Sensor Logs</h2>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
										disabled={currentPage === 1 || loadingLogs}
									>
										<ChevronLeft size={16} />
									</Button>
									<span className="flex items-center text-sm font-medium text-gray-600 px-2">
										Page {currentPage}
									</span>
									<Button
										variant="outline"
										size="sm"
										onClick={() => setCurrentPage((p) => p + 1)}
										disabled={
											!logs.length ||
											currentPage * itemsPerPage >= logs.length ||
											loadingLogs
										}
									>
										<ChevronRight size={16} />
									</Button>
								</div>
							</div>

							<div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
								{loadingLogs ? (
									<div className="p-12 flex flex-col items-center justify-center text-gray-400">
										<Loader2 className="w-8 h-8 animate-spin mb-2" />
										<p className="text-sm">Syncing sensor data...</p>
									</div>
								) : (
									<div className="overflow-x-auto">
										<table className="w-full text-sm text-left">
											<thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
												<tr>
													<th className="px-6 py-4 font-semibold w-1/3">
														Timestamp
													</th>
													<th className="px-6 py-4 font-semibold">
														Temperature (°C)
													</th>
													<th className="px-6 py-4 font-semibold">
														Humidity (%)
													</th>
													<th className="px-6 py-4 font-semibold text-right">
														Status
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-50">
												{paginatedLogs.map((log) => {
													const temp = parseFloat(log.temperature);
													const isCritical =
														prediction &&
														(temp < prediction.minTemperature ||
															temp > prediction.maxTemperature);

													return (
														<tr
															key={log.id}
															className="hover:bg-gray-50/50 transition-colors"
														>
															<td className="px-6 py-4 font-medium text-gray-600">
																{formatDistanceToNow(new Date(log.timestamp))}
															</td>
															<td className="px-6 py-4">
																<div className="flex items-center gap-2">
																	<Thermometer
																		size={16}
																		className={
																			isCritical
																				? "text-red-500"
																				: "text-gray-400"
																		}
																	/>
																	<span
																		className={cn(
																			"font-semibold",
																			isCritical
																				? "text-red-700"
																				: "text-gray-900",
																		)}
																	>
																		{log.temperature}°C
																	</span>
																</div>
															</td>
															<td className="px-6 py-4">
																<div className="flex items-center gap-2">
																	<Droplets
																		size={16}
																		className="text-blue-400"
																	/>
																	<span className="text-gray-700">
																		{log.humidity}%
																	</span>
																</div>
															</td>
															<td className="px-6 py-4 text-right">
																{isCritical ? (
																	<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
																		Critical
																	</span>
																) : (
																	<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
																		Normal
																	</span>
																)}
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								)}

								{!loadingLogs && logs.length === 0 && (
									<div className="p-12 text-center text-gray-500">
										<AlertCircle className="w-10 h-10 mx-auto mb-3 text-gray-300" />
										<p>No sensor logs recorded yet.</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
