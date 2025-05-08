import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';

import { TRPCReactProvider } from '@/trpc/react';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
	title: 'Env0',
	description: 'Streamlined environment variable management for developers',
};

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang='en'
			className={`${geistMono.className}`}
		>
			<head>
				<meta
					name='apple-mobile-web-app-title'
					content='Env0'
				/>
			</head>
			<body>
				<TRPCReactProvider>
					{children}
					<Toaster />
				</TRPCReactProvider>
			</body>
		</html>
	);
}
