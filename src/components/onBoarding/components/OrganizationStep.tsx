import React, { useEffect } from 'react';
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
import type { OrganizationFormValues } from './types';
import { organizationFormSchema } from './types';
import { toast } from 'sonner';
import { api } from '@/trpc/react';
import { getSlugFromName } from '@/lib/utils';
import { useRouter } from 'next/navigation';
/**
 * Organization details step of the onboarding process
 */
const OrganizationStep: React.FC = () => {
	const router = useRouter();
	const { mutate: checkOrganizationSlug, isPending } =
		api.organization.checkOrganizationSlug.useMutation({
			onSuccess: ({ status }) => {
				if (status) {
					createOrganization({
						name: form.getValues().organizationName,
						slug: form.getValues().slug,
					});
				} else {
					toast.error('Slug is not available');
				}
			},
			onError: () => {
				toast.error('Failed to check slug availability');
			},
		});
	const { mutate: createOrganization, isPending: isCreatingOrganization } =
		api.organization.createOrganization.useMutation({
			onSuccess: () => {
				toast.success('Organization created successfully');
				router.push('/on-boarding/security');
			},
			onError: () => {
				toast.error('Failed to create organization');
			},
		});

	// Initialize form
	const form = useForm<OrganizationFormValues>({
		resolver: zodResolver(organizationFormSchema),
		defaultValues: {
			organizationName: '',
			slug: '',
		},
	});

	// Watch organization name to auto-generate slug
	const organizationName = form.watch('organizationName');

	// Auto-update slug when organization name changes
	useEffect(() => {
		if (organizationName) {
			const generatedSlug = getSlugFromName(organizationName);
			form.setValue('slug', generatedSlug);
		}
	}, [organizationName, form]);

	// Form submission handler
	const handleSubmit = async (data: OrganizationFormValues) => {
		checkOrganizationSlug({ slug: data.slug });
	};

	return (
		<Form {...form}>
			<form
				className='space-y-5 text-left'
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<StepHeader
					title='Create Organization'
					subtitle="Let's set up your organization to get started"
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
					name='slug'
					render={({ field }) => (
						<FormItem className='transition-all duration-200 hover:shadow-sm'>
							<FormLabel className='text-sm font-medium'>
								URL Slug <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='organization-slug'
									className='focus-visible:ring-primary/50 transition-all'
								/>
							</FormControl>
							<FormDescription className='text-xs'>
								This will be used in your organization's URL: {window.location.hostname}/
								<strong>{field.value || 'your-slug'}</strong>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end pt-6'>
					<Button
						type='submit'
						disabled={isPending || isCreatingOrganization}
						loading={isPending || isCreatingOrganization}
						loadingText='Processing...'
						className='group'
					>
						<span className='flex items-center'>
							Create Organization
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
