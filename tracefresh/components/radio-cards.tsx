"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface RadioCardsProps {
	value?: string
	onValueChange?: (value: string) => void
	name?: string
	className?: string
}

export function RadioCards({ value, onValueChange, name = "radio-cards", className }: RadioCardsProps) {
	return (
		<RadioGroup value={value} onValueChange={onValueChange} className={`grid gap-3 ${className}`}>
			<div className="relative">
				<RadioGroupItem value="supplier" id={`${name}-supplier`} className="peer sr-only" />
				<Label htmlFor={`${name}-supplier`} className="cursor-pointer">
					<Card
						className={`p-4 border-2 transition-all duration-200 ${value === "supplier" ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/50"
							}`}
					>
						<div className="flex items-center space-x-3 w-full">
							<div
								className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${value === "supplier"
									? "border-primary bg-primary shadow-[inset_0_0_0_2px_white]"
									: "border-muted-foreground"
									}`}
							/>
							<div className="grid gap-1 w-full">
								<div className="font-medium text-sm">Supplier</div>
								<div className="text-xs text-muted-foreground">Register as a supplier to offer your services</div>
							</div>
						</div>
					</Card>
				</Label>
			</div>

			<div className="relative">
				<RadioGroupItem value="customer" id={`${name}-customer`} className="peer sr-only" />
				<Label htmlFor={`${name}-customer`} className="cursor-pointer">
					<Card
						className={`p-4 border-2 transition-all duration-200 ${value === "customer" ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/50"
							}`}
					>
						<div className="flex items-center space-x-3">
							<div
								className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${value === "customer"
									? "border-primary bg-primary shadow-[inset_0_0_0_2px_white]"
									: "border-muted-foreground"
									}`}
							/>
							<div className="grid gap-1">
								<div className="font-medium text-sm">Customer</div>
								<div className="text-xs text-muted-foreground">Register as a customer to find and hire services</div>
							</div>
						</div>
					</Card>
				</Label>
			</div>
		</RadioGroup>
	)
}

