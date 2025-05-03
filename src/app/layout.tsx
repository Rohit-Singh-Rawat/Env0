import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import { TRPCReactProvider } from '@/trpc/react';

export const metadata: Metadata = {
	title: 'Env0',
	description: 'Streamlined environment variable management for developers',
};

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang='en'
			className={`${geist.className}`}
		>
			<head>
				<meta
					name='apple-mobile-web-app-title'
					content='MyWebSite'
				/>
			</head>
			<body>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}
