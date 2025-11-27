"use client"

import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { ShoppingCart, Plus, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function EcommerceGrid() {
	const { addToCart } = useCart()

	const products = [
		{ id: 1, name: "Organic Bananas", weight: "2 kg", price: 3.99, image: "https://images.pexels.com/photos/2280926/pexels-photo-2280926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", status: "in-stock" },
		{ id: 2, name: "Fresh Strawberries", weight: "1 kg", price: 5.49, image: "https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", status: "in-stock" },
		{ id: 3, name: "Avocados", weight: "3 pieces", price: 4.99, image: "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", status: "unavailable" },
		{ id: 4, name: "Whole Grain Bread", weight: "24 oz", price: 3.29, image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", status: "in-stock" },
		{ id: 6, name: "Organic Eggs", weight: "12 count", price: 4.49, image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", status: "in-stock" },
		{ id: 7, name: "Salmon Fillet", weight: "1.5 kg", price: 12.99, image: "https://images.pexels.com/photos/840216/pexels-photo-840216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", status: "unavailable" },
		{
			id: 9,
			name: "Chicken Breast",
			weight: "2 kg",
			price: 8.99,
			image: "https://images.pexels.com/photos/6107771/pexels-photo-6107771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
			status: "arriving-soon",
			shippingDetails: {
				source: "Punjab Poultry Farms",
				currentLocation: "Warehouse Hub, Delhi",
				distanceLeft: "45km",
				eta: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000), // 12 hours from now
				carbonFootprint: "0.15kg",
				status: "Slight Delay",
			},
		},
		{ id: 12, name: "Sweet Potatoes", weight: "3 kg", price: 4.29, image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", status: "in-stock" },
		{
			id: 16,
			name: "Olive Oil",
			weight: "16.9 fl oz",
			price: 7.99,
			image: "https://images.pexels.com/photos/1410226/pexels-photo-1410226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
			status: "arriving-soon",
			shippingDetails: {
				source: "Rajasthan Olive Groves",
				currentLocation: "En route via Cargo Ship",
				distanceLeft: "800km",
				eta: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
				carbonFootprint: "1.2kg",
				status: "On-Time",
			},
		},
	]

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">Fresh Groceries</h2>
					<p className="text-gray-600">Discover our selection of fresh, high-quality products</p>
				</div>

				{/* Product Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{products.map((product) => (
						<Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
							<CardContent className="px-4">
								<div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-gray-100">
									<Image
										src={product.image || "/placeholder.svg"}
										alt={product.name}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-200"
									/>
								</div>
								<div className="space-y-2">
									<h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{product.name}</h3>
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-500 font-medium">{product.weight}</span>
										<span className="text-lg font-bold text-green-600">${product.price}</span>
									</div>
								</div>
							</CardContent>
							<CardFooter className="px-4 pt-0">
								{product.status === "in-stock" && (
									<Button onClick={() => addToCart(product)} className="w-full py-5" size="sm">
										<Plus className="h-4 w-4 mr-2" />
										Add to Cart
									</Button>
								)}
								{product.status === "unavailable" && (
									<Button variant="outline" className="w-full py-5" size="sm">
										<Bell className="h-4 w-4 mr-2" />
										Notify Me
									</Button>
								)}
								{product.status === "arriving-soon" && (
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="secondary" className="w-full py-5" size="sm">
												Arriving Soon
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>{product.name} - Shipping Details</DialogTitle>
											</DialogHeader>
											{product.shippingDetails && (
												<div className="py-4 space-y-2">
													<p>
														<span className="font-semibold">Source:</span> {product.shippingDetails.source}
													</p>
													<p>
														<span className="font-semibold">Current Location:</span> {product.shippingDetails.currentLocation} ({product.shippingDetails.distanceLeft} left)
													</p>
													<p>
														<span className="font-semibold">ETA:</span>{" "}
														{product.shippingDetails.eta.toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}
													</p>
													<p>
														<span className="font-semibold">Carbon Footprint:</span> {product.shippingDetails.carbonFootprint}
													</p>
													<p>
														<span className="font-semibold">Status:</span> {product.shippingDetails.status}
													</p>
												</div>
											)}
										</DialogContent>
									</Dialog>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			</main>
		</div>
	)
}

