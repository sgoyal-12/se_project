"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InboxPage() {
	const [trackingNumber, setTrackingNumber] = useState("");
	return (
		<div className="w-full h-full flex items-center justify-start px-[5%] mt-5">
			<div className="flex flex-col w-1/3 gap-2">
				<h1 className="text-2xl font-bold">Track a Shipment</h1>
				<div className="flex gap-2">
					<Input className="w-full bg-secondary py-5" placeholder="Enter Tracking Number" onChange={(e) => setTrackingNumber(e.target.value)} />
					<Button className="py-5 font-bold" disabled={trackingNumber === ""} asChild>
						<Link href={`/dashboard/track/${trackingNumber}`}>
							Track Shipment
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
