import { type Organization } from 'better-auth/plugins';
import { betterFetch } from '@better-fetch/fetch';
import { NextRequest, NextResponse } from 'next/server';
import type { auth } from './lib/auth';

type Session = typeof auth.$Infer.Session;

// Define route types for better organization
const ROUTES = {
	PUBLIC: ['/auth', '/login', '/register', '/forgot-password', '/', '/playground'],
	AUTH_REQUIRED: ['/dashboard', '/profile', '/settings'],
	DEFAULT_REDIRECT: '/dashboard',
	AUTH_REDIRECT: '/auth',
	ONBOARDING_REDIRECT: '/on-boarding',
};

export async function middleware(request: NextRequest) {
	// Check if the current path is a public route
	const isPublicRoute = ROUTES.PUBLIC.some(
		(route) =>
			request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/')
	);
	const isAuthRoute = ROUTES.AUTH_REQUIRED.some(
		(route) =>
			request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/')
	);
	// Get user session
	const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get('cookie') || '',
		},
	});

	// Handle public routes and authentication
	if (!session?.session && !isPublicRoute) {
		// Redirect to auth page if not authenticated and trying to access protected route
		return NextResponse.redirect(new URL(ROUTES.AUTH_REDIRECT, request.url));
	}
	
	// Only proceed with organization checks if the user is authenticated
	if (session?.session) {
		// If we have an active organization, redirect to that organization
		if (session.session.activeOrganizationId) {
			// Get the slug for the active organization
			const { data: organization } = await betterFetch<Organization>(
				`/api/auth/organization/get-full-organization`,
				{
					baseURL: request.nextUrl.origin,
					headers: {
						cookie: request.headers.get('cookie') || '',
					},
					query: {
						organizationId: session.session.activeOrganizationId,
					},
				}
			);

			// Only redirect if we're not already on the organization's page
			const orgPath = `/${organization?.slug}`;
			if (!request.nextUrl.pathname.startsWith(orgPath)) {
				return NextResponse.redirect(new URL(orgPath, request.url));
			}

			return NextResponse.next();
		}

		// 2. If no active organization, get list of organizations
		const { data: organizations } = await betterFetch<Organization[]>(
			'/api/auth/organization/list',
			{
				baseURL: request.nextUrl.origin,
				headers: {
					cookie: request.headers.get('cookie') || '',
				},
			}
		);

		// 3. If organizations exist, set the first one as active
		if (organizations && organizations.length > 0) {
			// Set the first organization as active
			await betterFetch(`/api/auth/organization/${organizations[0]?.id}/set-active`, {
				method: 'POST',
				baseURL: request.nextUrl.origin,
				headers: {
					cookie: request.headers.get('cookie') || '',
				},
			});

			// Get the slug for the organization we just set as active
			const { data: orgSlug } = await betterFetch<string>(
				`/api/auth/organization/${organizations[0]?.id}/slug`,
				{
					baseURL: request.nextUrl.origin,
					headers: {
						cookie: request.headers.get('cookie') || '',
					},
				}
			);

			// Redirect to the organization's page
			return NextResponse.redirect(new URL(`/org/${orgSlug}`, request.url));
		}

		// 4. No organizations at all, redirect to onboarding
		if (request.nextUrl.pathname !== ROUTES.ONBOARDING_REDIRECT) {
			return NextResponse.redirect(new URL(ROUTES.ONBOARDING_REDIRECT, request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	// Match all routes except for static files, api routes, and _next

	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|public).*)',
	],
};
