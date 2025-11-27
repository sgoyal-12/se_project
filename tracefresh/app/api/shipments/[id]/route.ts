import { prisma } from "@/lib/prisma";
export async function GET(req: Request) {
	const id = req.url.split("/").pop(); // Assuming the ID is the last part of the URL
	if (!id) {
		return new Response("Shipment ID is required", { status: 400 });
	}

	const shipment = await prisma.shipment.findUnique({
		where: { id },
		include: { user: true },
	});

	if (!shipment) {
		return new Response("Shipment not found", { status: 404 });
	}

	return new Response(JSON.stringify(shipment), {
		headers: { "Content-Type": "application/json" },
	});
}
