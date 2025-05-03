import * as React from 'react';
import type { SVGProps } from 'react';
import { Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	weight: ['700'],
	display: 'swap',
});

interface LogoProps extends SVGProps<SVGSVGElement> {
	variant?: 'full' | 'small';
	size?: 'sm' | 'md' | 'lg';
	colorMode?: 'light' | 'dark' | 'primary';
}

const Env0Logo = ({
	variant = 'full',
	size = 'md',
	colorMode = 'dark',
	className,
	...props
}: LogoProps) => {
	// Size variants
	const sizeMap = {
		sm: { logo: '30', textSize: '1.5rem' },
		md: { logo: '40', textSize: '2rem' },
		lg: { logo: '60', textSize: '3rem' },
	};

	// Color variants based on Tailwind variables
	const colorMap = {
		light: { textColor: 'text-white', fillColor: 'fill-white' },
		dark: { textColor: 'text-foreground', fillColor: 'fill-foreground' },
		primary: { textColor: 'text-primary', fillColor: 'fill-primary' },
	};

	const { logo, textSize } = sizeMap[size];
	const { textColor, fillColor } = colorMap[colorMode];

	return (
		<div className='flex items-center gap-2'>
			{variant === 'full' && (
				<span
					className={cn(`font-bold ${spaceGrotesk.className}`, textColor)}
					style={{
						fontSize: textSize,
						letterSpacing: '-0.02em',
					}}
				>
					Env
				</span>
			)}
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={props.width || logo}
				height={props.height || logo}
				className={cn(fillColor, className)}
				viewBox='0 0 105 105'
				{...props}
			>
				<path d='m103.5 53-.1 19.3c0 15.2-26.1 24.3-41.3 24.3-28.8 0-56.2-19.1-60-31.5-.4-1.3-.6-2.6-.6-3.9l.1-18.9C8.7 54.4 35.7 71 62.3 71c19.7.1 35.6-9.6 41.2-18z' />
				<path d='M102.9 39.9c-5-16.5-36.7-29.8-55.5-31.3-12-1-23.2 1.6-33.1 7.5C4 22.3-.1 29.2 2.2 36.7c2.1 6.8 8.6 13.4 19.5 19.7 13.4 7.7 27.4 11.8 40.6 11.8 17.7 0 45.6-11.7 40.6-28.3zM61 52.8C50.4 51 31.1 42 26 33.4c-1.2-2.1-1.8-4.5 3-7.4 4.6-2.8 9.9-3.1 15.2-2.2 10.6 1.9 29.9 10.8 35 19.4 4 7-8.6 11.3-18.2 9.6z' />
			</svg>
		</div>
	);
};

export default Env0Logo;
