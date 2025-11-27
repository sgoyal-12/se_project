"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	HomeIcon,
	InboxIcon,
	FileTextIcon,
	CalendarIcon,
	Search,
	Settings,
	ShoppingBasket,
	Info,
	Menu,
	X,
	Trash2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const headerLinks = [
	{ name: "Home", href: "/dashboard", icon: <HomeIcon className="w-4 h-4" /> },
	{ name: "Track", href: "/dashboard/track", icon: <InboxIcon className="w-4 h-4" /> },
	{ name: "Items", href: "/dashboard/items", icon: <ShoppingBasket className="w-4 h-4" /> },
];

type HeaderProps = {
	username?: string;
	avatar?: string;
}

export default function Header(props: HeaderProps) {
	const username = props.username || "John Doe";
	const pathname = usePathname();
	const initials = username.split(" ").map((name) => name[0]).join("").toUpperCase();
	const [open, setOpen] = useState(false);
	const { setTheme } = useTheme();
	const { cart, removeFromCart } = useCart();

	const total = cart.reduce((acc, item) => acc + item.price, 0);
	const discountPercentage = 10;
	const discountAmount = (total * discountPercentage) / 100;
	const finalTotal = total - discountAmount;

	const NavLinks = ({ vertical = false }: { vertical?: boolean }) => (
		<div className={`flex ${vertical ? "flex-col space-y-1" : "space-x-4"} text-sm`}>
			{headerLinks.map((link) => {
				const isActive = pathname === link.href;
				return (
					<Button
						asChild
						key={link.name}
						variant="ghost"
						size="sm"
						className={`relative h-16 px-4 justify-start rounded-none ${isActive && !open
								? "text-primary font-semibold hover:bg-background after:content-[''] after:absolute after:bottom-0 after:translate-x-1/2 after:w-1/2 after:border-b-3 after:border-primary"
								: "text-muted-foreground"
							}`}
					>
						<Link href={link.href} onClick={() => setOpen(false)} className="flex items-center space-x-1">
							{link.icon}
							<span>{link.name}</span>
						</Link>
					</Button>
				);
			})}
		</div>
	);

	return (
		<header className="w-full h-16 px-[5%] flex items-center justify-between border-b bg-background">
			{/* Left side: Logo + Nav (on md+) */}
			<div className="flex items-center space-x-4 md:space-x-10">
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center text-sm font-bold">
						TF
					</div>
					<span className="font-bold text-sm">
						Trace<span className="text-primary">Fresh</span>
					</span>
				</div>

				{/* Desktop Nav */}
				<div className="hidden md:flex">
					<NavLinks />
				</div>
			</div>

			{/* Right side: actions + avatar */}
			<div className="flex items-center space-x-4">
				{/* Mobile Hamburger */}
				<div className="md:hidden">
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-64 p-4 pt-8">
							<NavLinks vertical />
						</SheetContent>
					</Sheet>
				</div>

				{/* Utility Icons (shown always) */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="relative">
							<ShoppingBasket className="w-5 h-5" />
							{cart.length > 0 && (
								<Badge
									variant="destructive"
									className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0"
								>
									{cart.length}
								</Badge>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-80">
						{cart.length > 0 ? (
							<>
								{cart.map((item) => (
									<DropdownMenuItem key={item.id}>
										<div className="flex items-center justify-between w-full">
											<div className="flex items-center space-x-2">
												<Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md" />
												<div>
													<p className="font-semibold">{item.name}</p>
													<p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
												</div>
											</div>
											<Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
												<Trash2 className="w-4 h-4 text-red-500" />
											</Button>
										</div>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<div className="p-2">
									<Alert className="bg-yellow-100 border-yellow-300 text-yellow-800">
										<AlertDescription>
											10% Discount Applied (-35 EcoCoins)
										</AlertDescription>
									</Alert>
								</div>
								<DropdownMenuSeparator />
								<div className="p-2 space-y-1">
									<div className="flex justify-between">
										<p className="text-sm">Subtotal</p>
										<p className="text-sm font-semibold">${total.toFixed(2)}</p>
									</div>
									<div className="flex justify-between">
										<p className="text-sm">Discount</p>
										<p className="text-sm font-semibold">-${discountAmount.toFixed(2)}</p>
									</div>
									<div className="flex justify-between font-bold">
										<p>Total</p>
										<p>${finalTotal.toFixed(2)}</p>
									</div>
								</div>
								<DropdownMenuItem>
									<Button className="w-full">Proceed to Checkout</Button>
								</DropdownMenuItem>
							</>
						) : (
							<DropdownMenuItem>
								<p>Your cart is empty.</p>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<Settings className="w-5 h-5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => setTheme("light")}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Avatar */}
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar className="bg-primary/30">
							<AvatarImage src={props.avatar} alt={username} />
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem onClick={async () => await authClient.signOut()}>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}