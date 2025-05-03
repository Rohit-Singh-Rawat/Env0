'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth.client';

interface OAuthButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	type: 'Google' | 'GitHub';
	variant?: 'default' | 'outline';
}

const OAuthButton: React.FC<OAuthButtonProps> = ({
	type,
	variant = 'outline',
	className,
	...props
}) => {
	// Define color schemes for each provider
	const providerStyles = {
		Google: {
			default: 'bg-[#4285F4] hover:bg-[#4285F4]/90 text-white',
			outline: 'border-border/30 hover:bg-accent/5 text-foreground',
		},
		GitHub: {
			default: 'bg-[#181717] hover:bg-[#181717]/90 text-white',
			outline: 'border-border/30 hover:bg-accent/5 text-foreground',
		},
	};

	const renderIcon = () => {
		switch (type) {
			case 'Google':
				return (
					<svg
						width='20'
						height='20'
						viewBox='0 0 48 48'
						className='size-5 mr-2 flex-shrink-0'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill='#4285F4'
							d='M47.532 24.545c0-1.636-.146-3.182-.418-4.636H24v9.273h13.236c-.573 2.909-2.182 5.345-4.545 7.018v5.818h7.364c4.309-3.955 6.818-9.773 6.818-17.455z'
						/>
						<path
							fill='#34A853'
							d='M24 48c6.364 0 11.636-2.091 15.455-5.682l-7.364-5.818c-2.045 1.364-4.636 2.182-8.091 2.182-6.227 0-11.455-4.227-13.318-9.955H3.455v6.045C7.273 42.545 14.909 48 24 48z'
						/>
						<path
							fill='#FBBC05'
							d='M10.682 28.727A14.727 14.727 0 019.273 24c0-1.636.291-3.182.818-4.727V13.227H3.455A23.964 23.964 0 000 24c0 3.818.909 7.455 2.545 10.773l8.137-6.046z'
						/>
						<path
							fill='#EA4335'
							d='M24 9.545c3.455 0 6.545 1.182 8.955 3.455l6.818-6.818C35.636 2.909 30.364 0 24 0 14.909 0 7.273 5.455 3.455 13.227l8.045 6.045C12.545 14.318 17.773 9.545 24 9.545z'
						/>
					</svg>
				);
			case 'GitHub':
				return (
					<svg
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						className='size-5 mr-2 flex-shrink-0'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill={variant === 'default' ? 'white' : 'currentColor'}
							d='M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.091-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.42-1.305.763-1.605-2.665-.303-5.466-1.333-5.466-5.93 0-1.31.467-2.381 1.236-3.221-.124-.303-.536-1.523.116-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.241 2.873.118 3.176.77.84 1.236 1.911 1.236 3.221 0 4.61-2.803 5.625-5.475 5.921.43.37.823 1.102.823 2.222v3.293c0 .319.22.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z'
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	const handleSignUp = () => {
		authClient.signIn.social({
			provider: type === 'GitHub' ? 'github' : 'google',
			newUserCallbackURL: '/onBoard',
		});
	};

	return (
		<Button
			className={cn(
				'w-full relative font-medium rounded-md transition-all shadow-sm',
				'flex items-center justify-center px-4 py-2.5',
				providerStyles[type][variant],
				className
			)}
			variant={variant === 'default' ? 'default' : 'outline'}
			type='button'
			onClick={handleSignUp}
			{...props}
		>
			{renderIcon()}
			<span>Sign in with {type}</span>
		</Button>
	);
};

export default OAuthButton;
