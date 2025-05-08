import { cn } from '@/lib/utils';

type LoadingProps = {
	className?: string;
	text?: string;
};

const Loading = ({ className, text }: LoadingProps) => {
	return (
		<div className={cn('flex items-center justify-center', className)}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 302 105'
				preserveAspectRatio='xMidYMid'
				className={cn('loading-pulse', 'size-40', 'relative')}
			>
				<path
					className='logo-path-shimmer'
					d='M300.5 53L300.4 72.3C300.4 87.5 274.3 96.6 259.1 96.6C230.3 96.6 202.9 77.5 199.1 65.1C198.7 63.8 198.5 62.5 198.5 61.2L198.6 42.3C205.7 54.4 232.7 71 259.3 71C279 71.1 294.9 61.4 300.5 53Z'
				/>
				<path
					className='logo-path-shimmer'
					d='M299.9 39.9C294.9 23.4 263.2 10.1 244.4 8.60001C232.4 7.60001 221.2 10.2 211.3 16.1C201 22.3 196.9 29.2 199.2 36.7C201.3 43.5 207.8 50.1 218.7 56.4C232.1 64.1 246.1 68.2 259.3 68.2C277 68.2 304.9 56.5 299.9 39.9ZM258 52.8C247.4 51 228.1 42 223 33.4C221.8 31.3 221.2 28.9 226 26C230.6 23.2 235.9 22.9 241.2 23.8C251.8 25.7 271.1 34.6 276.2 43.2C280.2 50.2 267.6 54.5 258 52.8Z'
				/>
			</svg>
			{text && <span className='ml-3 text-muted-foreground'>{text}</span>}
		</div>
	);
};

export default Loading;
