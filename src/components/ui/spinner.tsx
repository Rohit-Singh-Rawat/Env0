import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
	className?: string;
	color?: string;
	size?: string;
	speed?: number;
	dotCount?: number;
}

export function LoadingSpinner({
	className,
	color,
	size = "5",
	speed = 0.6,
	dotCount = 12
}: LoadingSpinnerProps) {
	return (
		<div className={cn(`h-${size} w-${size}`, className)}>
			<div
				style={{
					position: 'relative',
					top: '50%',
					left: '50%',
          
				}}
				className={cn('loading-spinner', `h-${size} w-${size}`, className)}
			>
				{[...Array(dotCount)].map((_, i) => (
					<div
						key={i}
						style={{
							animationDelay: `${-0.7 + (0.7 / dotCount) * i}s`,
							position: 'absolute',
							borderRadius: '1rem',
							width: '27%',
							height: '7%',
							left: '-8%',
							top: '-3%',
							transform: `rotate(${(360 / dotCount) * i}deg) translate(130%)`,
							background: color,
							animationDuration: `${speed}s`
						}}
						className={cn(
							'animate-spinner',
							!color && 'bg-primary/70 dark:bg-primary/90'
						)}
					/>
				))}
			</div>
		</div>
	);
}
