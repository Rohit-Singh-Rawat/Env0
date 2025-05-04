import { type Organization } from 'better-auth/plugins';
import { betterFetch } from '@better-fetch/fetch';
import { NextRequest, NextResponse } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

// Define route types for better organization
const ROUTES = {
	PUBLIC: ['/auth', '/login', '/register', '/forgot-password'],
	AUTH_REQUIRED: ['/dashboard', '/profile', '/settings'],
	DEFAULT_REDIRECT: '/',
	AUTH_REDIRECT: '/auth',
	ONBOARDING_REDIRECT: '/on-boarding',
};

export async function middleware(request: NextRequest) {
	// Check if the current path is a public route
	const isPublicRoute = ROUTES.PUBLIC.some(
		(route) =>
			request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/')
	);

	const session = getSessionCookie(request);

	// Fetch organization data if session exists
	let organizations: Organization[] = [];
	if (session) {
		const { data: orgs, error: orgsError } = await betterFetch<Organization[]>(
			'/api/auth/organization/list',
			{
				baseURL: request.nextUrl.origin,
				headers: {
					cookie: request.headers.get('cookie') || '',
				},
			}
		);

		if (orgs && !orgsError) {
			organizations = orgs;
		}
	}

	// Handle authentication redirects
	if (!session && !isPublicRoute) {
		// Redirect to auth page if not authenticated and trying to access protected route
		return NextResponse.redirect(new URL(ROUTES.AUTH_REDIRECT, request.url));
	}

	if (session && isPublicRoute) {
		// Redirect to default page if already authenticated and trying to access auth routes
		return NextResponse.redirect(new URL(ROUTES.DEFAULT_REDIRECT, request.url));
	}

	// Handle onboarding redirect
	if (
		session &&
		organizations.length === 0 &&
		request.nextUrl.pathname !== ROUTES.ONBOARDING_REDIRECT
	) {
		// Redirect to onboarding if authenticated but has no organizations
		return NextResponse.redirect(new URL(ROUTES.ONBOARDING_REDIRECT, request.url));
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
