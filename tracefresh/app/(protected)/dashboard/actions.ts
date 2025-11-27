"use server";

import { prisma } from "@/lib/prisma";

type ShipmentData = {
	name: string;
	destination: string;
	items: string;
	shipmentDate: Date | string;
	user: any;
	userId: string;
};

export async function addShipment(data: ShipmentData) {
	const { name, destination, items, shipmentDate, userId } = data;

	try {
		const shipment = await prisma.shipment.create({
			data: {
				name,
				destination,
				items,
				shippedAt:
					typeof shipmentDate === "string"
						? new Date(shipmentDate)
						: shipmentDate,
				user: { connect: { id: userId } },
			},
		});
		console.log("Shipment created successfully:", shipment);

		const { id } = shipment;

		const body = {
			shipmentId: id,
		};

		const response = await fetch("http://localhost:7777/api/predictions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch predictions");
		}

		const prediction = await response.json();
		console.log("Prediction received:", prediction);

		const shipmentWithPrediction = await prisma.idealConditions.create({
			data: {
				shipmentId: id,
				minTemperature: prediction.minTemperature,
				maxTemperature: prediction.maxTemperature,
				minHumidity: prediction.minHumidity,
				maxHumidity: prediction.maxHumidity,
			},
		});

		return { success: true, shipment, prediction: shipmentWithPrediction };
	} catch (error) {
		console.error("Error creating shipment:", error);
		return { success: false, error: error };
	}
}
