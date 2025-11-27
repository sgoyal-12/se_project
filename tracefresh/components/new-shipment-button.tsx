"use client";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
	DialogOverlay,
	DialogContent,
	Dialog,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { prisma } from "@/lib/prisma";
import { authClient } from "@/lib/auth-client";
import { addShipment } from "@/app/(protected)/dashboard/actions";
import { toast } from "sonner";

export function NewShipmentButton({ onShipmentCreated }: any) {
	const { register, handleSubmit } = useForm<any>();
	const { data: session } = authClient.useSession();
	const [shipments, setShipments] = useState<any[]>([]);

	const onSubmit: SubmitHandler<any> = async (data) => {
		const dataToCreate = {
			name: data.shipmentName,
			destination: data.destination,
			shipmentDate: date?.toLocaleString(),
			user: session?.user,
			items: data.items,
			userId: session?.user.id,
		};

		console.log("Creating shipment with data:", dataToCreate);
		const { success, shipment } = await addShipment(dataToCreate);
		console.log("Shipment creation response:", { success, shipment });

		if (success) {
			toast.success("Shipment added successfully!");
			onShipmentCreated(shipment);
			shipments.push(shipment);
		} else {
			toast.error("Failed to add shipment. Please try again.");
		}
	};

	const [date, setDate] = useState<Date | undefined>(undefined);
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={"ghost"} className="font-bold text-primary">
					<Plus /> New Shipment
				</Button>
			</DialogTrigger>

			<DialogContent>
				<h3 className="text-lg font-bold">Add New Shipment</h3>
				<p className="-mt-3 text-muted-foreground">
					Add a new shipment and share it with your customers
				</p>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Label htmlFor="shipmentName">Shipment Name</Label>
					<Input
						id="shipmentName"
						placeholder="Enter shipment name"
						className="mt-2"
						{...register("shipmentName")}
					/>

					<Label htmlFor="shipmentStatus" className="mt-3">
						Shipment Status
					</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className="flex justify-between w-full mt-3"
							>
								{" "}
								{date ? date.toLocaleDateString() : "Shipment Date"}
								<CalendarIcon className="ml-2 h-4 w-4" />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<Calendar
								mode="single"
								selected={date || undefined}
								onSelect={setDate}
								className="w-full"
							/>
						</PopoverContent>
					</Popover>

					<Label htmlFor="shipmentDestination" className="mt-3">
						Shipment Destination
					</Label>
					<Input
						id="shipmentDestination"
						placeholder="Enter shipment destination"
						{...register("destination")}
						className="mt-2"
					/>

					<Label htmlFor="trackingNumber" className="mt-3">
						Items
					</Label>
					<Textarea
						id="trackingNumber"
						placeholder="Enter items in shipment"
						className="mt-2 h-24"
						{...register("items")}
					/>

					<Button type="submit" className="w-full mt-3">
						Add Shipment
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
