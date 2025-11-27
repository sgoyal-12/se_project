import { toGeminiSchema } from "gemini-zod";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
	apiKey: "AIzaSyCBpn8jc8ips3UhLKCPKYzWRM_CgSNQxZM",
});

export async function POST(req: Request) {
	const { shipmentId } = await req.json();
	if (!shipmentId) {
		return new Response("Shipment ID is required", { status: 400 });
	}

	// Fetch the shipment from the database
	const shipment = await prisma.shipment.findUnique({
		where: { id: shipmentId },
	});

	if (!shipment) {
		return new Response("Shipment not found", { status: 404 });
	}

	const items = shipment.items || [];

	if (items.length === 0) {
		return new Response("No items found for this shipment", { status: 404 });
	}

	const itemsSchema = z.object({
		minTemperature: z.number(),
		maxTemperature: z.number(),
		minHumidity: z.number(),
		maxHumidity: z.number(),
	});

	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: `Here are the items in a shipment, ${items} your job is to return the collective ideal temperature range and humidity range for these items. In case the items are incompatible with each other, return 'incompatible'. If you are not sure about the ideal temperature and humidity range, return "unknown". Do not return any other text. The temperature should be in Celsius and humidity in percentage.`,
		config: {
			responseMimeType: "application/json",
			responseSchema: toGeminiSchema(itemsSchema),
		},
	});

	const json = response.text;

	return new Response(json, {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
