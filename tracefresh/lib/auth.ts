import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();
export const auth = betterAuth({
	trustedOrigins: ["*"],
	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: "customer",
				validation: {
					required: true,
					enum: ["customer", "supplier"],
				},
				input: true,
			},
		},
	},

	database: prismaAdapter(prisma, {
		provider: "sqlite", // or "mysql", "postgresql", ...etc
	}),

	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
		},
	},
});
