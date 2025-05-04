import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, RefreshCw, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
import type { SecurityStepProps, SecurityFormValues } from './types';
import { securityFormSchema } from './types';

/**
 * Security setup step of the onboarding process
 */
const SecurityStep: React.FC<SecurityStepProps> = ({
	isLoading,
	showPassword,
	setShowPassword,
	passwordCopied,
	onGeneratePassword,
	onCopyPassword,
	onPrevious,
	onSubmit,
}) => {
	// Initialize form
	const form = useForm<SecurityFormValues>({
		resolver: zodResolver(securityFormSchema),
		defaultValues: {
			sudoPassword: '',
			confirmPassword: '',
			autoGeneratePassword: false,
		},
	});

	// Handle auto-generate password toggle
	const handleAutoGenerate = (checked: boolean | 'indeterminate') => {
		form.setValue('autoGeneratePassword', checked === true);

		if (checked === true) {
			onGeneratePassword();
		} else {
			form.setValue('sudoPassword', '');
			form.setValue('confirmPassword', '');
		}
	};

	// Handle form submission
	const handleSubmit = (data: SecurityFormValues) => {
		onSubmit(data);
	};

	return (
		<Form {...form}>
			<form
				className='space-y-5 text-left'
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<StepHeader
					title='Security Setup'
					subtitle='Set a sudo password that will be used to encrypt your secrets and secure your environment'
				/>

				<Card className='border border-primary/10 bg-primary/5 shadow-sm p-4 mb-4'>
					<CardContent className='p-0 text-sm'>
						<p className='text-muted-foreground'>
							Your sudo password is used to encrypt sensitive data. Make sure to keep it secure and
							don't share it with others.
						</p>
					</CardContent>
				</Card>

				<FormField
					control={form.control}
					name='autoGeneratePassword'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0 mb-4 p-2 rounded-md transition-colors hover:bg-muted/30'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={(checked) => {
										field.onChange(checked);
										handleAutoGenerate(checked);
									}}
									className='data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel className='cursor-pointer font-medium'>
									Auto-generate secure password
								</FormLabel>
								<FormDescription className='text-xs'>
									We'll create a strong, random password for you
								</FormDescription>
							</div>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='sudoPassword'
					render={({ field }) => (
						<FormItem className='transition-all duration-200 hover:shadow-sm'>
							<FormLabel className='text-sm font-medium'>
								Sudo Password <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										{...field}
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter sudo password'
										disabled={form.watch('autoGeneratePassword')}
										className='pr-20 focus-visible:ring-primary/50 transition-all'
									/>
									<div className='absolute right-0 top-0 flex'>
										{form.watch('autoGeneratePassword') && field.value && (
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															type='button'
															variant='ghost'
															size='icon'
															onClick={onCopyPassword}
															className='h-10 w-10'
														>
															{passwordCopied ? (
																<CheckCircle2
																	size={16}
																	className='text-green-500'
																/>
															) : (
																<Copy size={16} />
															)}
														</Button>
													</TooltipTrigger>
													<TooltipContent>
														<p>{passwordCopied ? 'Copied!' : 'Copy password'}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										)}
										<Button
											type='button'
											variant='ghost'
											size='icon'
											onClick={() => setShowPassword(!showPassword)}
											className='h-10 w-10'
										>
											{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
										</Button>
									</div>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{!form.watch('autoGeneratePassword') && (
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem className='transition-all duration-200 hover:shadow-sm'>
								<FormLabel className='text-sm font-medium'>
									Confirm Password <span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type={showPassword ? 'text' : 'password'}
										placeholder='Confirm sudo password'
										className='focus-visible:ring-primary/50 transition-all'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{form.watch('autoGeneratePassword') && (
					<div className='flex justify-center mt-4'>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={onGeneratePassword}
							className='flex items-center group hover:border-primary/50 transition-all'
						>
							<RefreshCw
								size={14}
								className='mr-2 group-hover:rotate-90 transition-transform duration-300'
							/>
							Regenerate Password
						</Button>
					</div>
				)}

				<div className='flex justify-between pt-6'>
					<Button
						type='button'
						variant='outline'
						onClick={onPrevious}
						disabled={isLoading}
						className='group transition-all duration-300 hover:pl-5'
					>
						<ArrowLeft
							size={16}
							className='mr-2 group-hover:-translate-x-1 transition-transform'
						/>
						Back
					</Button>
					<Button
						type='submit'
						disabled={isLoading}
						className='bg-primary hover:bg-primary/90 transition-colors'
					>
						{isLoading ? (
							<span className='flex items-center'>
								<span className='animate-spin mr-2'>
									<RefreshCw size={16} />
								</span>
								Processing...
							</span>
						) : (
							'Complete Setup'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default SecurityStep;
