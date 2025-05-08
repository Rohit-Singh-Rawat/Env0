import * as z from 'zod';

// Zod Schemas
export const organizationFormSchema = z.object({
	organizationName: z.string().min(1, { message: 'Organization name is required' }),
	slug: z.string().min(1, { message: 'Slug is required' }),
});

export const securityFormSchema = z
	.object({
		sudoPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z.string(),
		autoGeneratePassword: z.boolean().default(false),
	})
	.refine((data) => data.sudoPassword === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

// Types
export type OrganizationFormValues = z.infer<typeof organizationFormSchema>;
export type SecurityFormValues = z.infer<typeof securityFormSchema>;

export interface FormData {
	organizationName: string;
	slug: string;
}

// Component Props
export interface StepHeaderProps {
	title: string;
	subtitle?: string;
}


export interface SecurityStepProps {
	isLoading: boolean;
	showPassword: boolean;
	setShowPassword: (show: boolean) => void;
	passwordCopied: boolean;
	onGeneratePassword: () => void;
	onCopyPassword: () => void;
	onPrevious: () => void;
	onSubmit: (data: SecurityFormValues) => void;
}
