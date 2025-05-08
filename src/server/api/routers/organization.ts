import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { auth } from '@/lib/auth';

export const organizationRouter = createTRPCRouter({
	checkOrganizationSlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.mutation(async ({ input }) => {
			const { slug } = input;
			try {
				const organization = await auth.api.checkOrganizationSlug({
					body: {
						slug,
					},
				});
				return organization;
			} catch (error) {
				console.error('Error checking organization slug:', error);
				return { status: false };
			}
		}),
	createOrganization: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				slug: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			
			const { name, slug } = input;
			const organization = await auth.api.createOrganization({
				body: {
					name,
					slug,
					userId: ctx.session.user.id,
				},
			});

			if (!organization) {
				throw new Error('Failed to create organization');
			}

			await ctx.db.user.update({
				where: {
					id: ctx.session.user.id,
				},
				data: {
					defaultOrganizationSlug: slug,
				},
			});

			await auth.api.setActiveOrganization({
				headers: ctx.headers,
				body: {
					organizationId: organization.id,
				},
			});
			return organization;
		}),
});
