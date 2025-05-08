import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getSlugFromName(name: string) {
	return name
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '_'); 
}
