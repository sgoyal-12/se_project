import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	const { shipmentId, temperature, humidity } = await req.json();
	if (!shipmentId || !temperature || !humidity) {
		return new Response("All fields are required", { status: 400 });
	}

	type LogData = {
		shipmentId: string;
		temperature: number;
		humidity: number;
		timestamp: Date;
	};

	const data: LogData = {
		shipmentId,
		temperature: temperature,
		humidity: humidity,
		timestamp: new Date(),
	};

	const log = await prisma.logs.create({
		data,
	});

	return new Response(JSON.stringify(log), {
		headers: { "Content-Type": "application/json" },
	});
}

export async function GET(req: Request) {
	// url: http://localhost:3000/api/shipments/cmcgru0ke000alu7pjyiwi16h/logs
	const url = new URL(req.url);
	const shipmentId = url.pathname.split("/").at(-2);

	if (!shipmentId) {
		return new Response("Shipment ID is required", { status: 400 });
	}

	const logs = await prisma.logs.findMany({
		where: { shipmentId },
		orderBy: { timestamp: "desc" },
	});

	return new Response(JSON.stringify(logs), {
		headers: { "Content-Type": "application/json" },
	});
}
