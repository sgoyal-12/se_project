import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	// get shipments in order by shipmentDate in descending order
	const shipments = await prisma.shipment.findMany({
		orderBy: {
			shippedAt: "desc",
		},
	});
	return NextResponse.json(shipments);
}

export async function POST(request: Request) {
	const data = await request.json();

	const { name, destination, tracking_number, shipmentDate } = data;

	if (!name || !destination || !tracking_number || !shipmentDate) {
		return NextResponse.json({ error: "All fields are required" }, { status: 400 });
	}

	const newShipment = await prisma.shipment.create({
		data: {
			name,
			destination,
			shipmentDate: new Date(shipmentDate),
		},
	});

	return NextResponse.json(newShipment);
}
