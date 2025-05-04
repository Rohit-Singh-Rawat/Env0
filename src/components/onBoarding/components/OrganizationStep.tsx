import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import StepHeader from './StepHeader';
import type { OrganizationStepProps, OrganizationFormValues } from './types';
import { organizationFormSchema } from './types';

/**
 * Organization details step of the onboarding process
 */
const OrganizationStep: React.FC<OrganizationStepProps> = ({ isLoading, onNext }) => {
	// Initialize form
	const form = useForm<OrganizationFormValues>({
		resolver: zodResolver(organizationFormSchema),
		defaultValues: {
			organizationName: '',
			organizationDescription: '',
		},
	});

	// Form submission handler
	const handleSubmit = (data: OrganizationFormValues) => {
		onNext(data);
	};

	return (
		<Form {...form}>
			<form
				className='space-y-5 text-left'
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<StepHeader
					title='Organization Details'
					subtitle="Let's set up your organization to get started with Env0"
				/>

				<FormField
					control={form.control}
					name='organizationName'
					render={({ field }) => (
						<FormItem className='transition-all duration-200 hover:shadow-sm'>
							<FormLabel className='text-sm font-medium'>
								Organization Name <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Enter your organization name'
									className='focus-visible:ring-primary/50 transition-all'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='organizationDescription'
					render={({ field }) => (
						<FormItem className='transition-all duration-200 hover:shadow-sm'>
							<FormLabel className='text-sm font-medium'>Description (Optional)</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Briefly describe your organization'
									className='focus-visible:ring-primary/50 transition-all'
								/>
							</FormControl>
							<FormDescription className='text-xs'>
								This helps identify your organization's purpose
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end pt-6'>
					<Button
						type='submit'
						disabled={isLoading}
						loading={isLoading}
						loadingText='Processing...'
						className='group'
					>
						<span className='flex items-center'>
							Next
							<ArrowRight
								size={16}
								className='ml-2 group-hover:translate-x-1 transition-transform'
							/>
						</span>
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default OrganizationStep;
