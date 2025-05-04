import * as z from 'zod';

// Zod Schemas
export const organizationFormSchema = z.object({
	organizationName: z.string().min(1, { message: 'Organization name is required' }),
	organizationDescription: z.string().optional(),
});

export const securityFormSchema = z
	.object({
		autoGeneratePassword: z.boolean().default(false),
		sudoPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z.string(),
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
	organizationDescription: string;
	sudoPassword: string;
	autoGeneratePassword: boolean;
	confirmPassword: string;
}

// Component Props
export interface StepHeaderProps {
	title: string;
	subtitle?: string;
}

export interface OrganizationStepProps {
	isLoading: boolean;
	onNext: (data: OrganizationFormValues) => void;
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
