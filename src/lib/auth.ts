import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { env } from '@/env';

import { organization } from 'better-auth/plugins';

const prisma = new PrismaClient();
export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql', // or "mysql", "postgresql", ...etc
	}),
	databaseHooks: {
		session: {
			create: {
				before: async (session) => {
					const user = await prisma.user.findUnique({
						where: {
							id: session.userId
						},
						select: {
							defaultOrganizationSlug: true
						}
					});
					
					if (user?.defaultOrganizationSlug) {
						const organization = await prisma.organization.findFirst({
							where: {
								slug: user.defaultOrganizationSlug
							},
							select: {
								id: true
							}
						});

						return {
							data: {
								...session,
								activeOrganizationId: organization?.id,
							},
						};
					}
					return { data: session };
				},
			}
		}
	},
	plugins: [organization()],
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}
	}
});
