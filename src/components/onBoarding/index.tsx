'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTrigger,
} from '@/components/ui/stepper';

import OrganizationStep from './components/OrganizationStep';
import SecurityStep from './components/SecurityStep';
import { generateSecurePassword, copyToClipboard } from './utils';
import type { FormData, OrganizationFormValues, SecurityFormValues } from './components/types';
import { LoadingSpinner } from '../ui/spinner';

// Constants
const STEPS = [1, 2];

/**
 * OnBoarding component that manages the multi-step onboarding process
 */
export default function OnBoarding() {
	// State
	const [currentStep, setCurrentStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [passwordCopied, setPasswordCopied] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		organizationName: '',
		organizationDescription: '',
		sudoPassword: '',
		autoGeneratePassword: false,
		confirmPassword: '',
	});

	// Handlers
	const handleOrganizationNext = (data: OrganizationFormValues) => {
		setIsLoading(true);

		// Update form data
		setFormData((prev) => ({
			...prev,
			organizationName: data.organizationName,
			organizationDescription: data.organizationDescription || '',
		}));

		// Advance to next step
		setTimeout(() => {
			setCurrentStep((prev) => prev + 1);
			setIsLoading(false);
		}, 800);
	};

	const handleSecuritySubmit = (data: SecurityFormValues) => {
		setIsLoading(true);

		// Combine all form data
		const finalFormData = {
			...formData,
			sudoPassword: data.sudoPassword,
			confirmPassword: data.confirmPassword,
			autoGeneratePassword: data.autoGeneratePassword,
		};

		// Here you would typically submit the form data to your backend
		setTimeout(() => {
			// Simulate successful submission
			setIsLoading(false);
			console.log('Form submitted:', finalFormData);
			// You could redirect or show a success message here
		}, 1500);
	};

	const handleGeneratePassword = () => {
		const password = generateSecurePassword();

		// Show password briefly when generated
		setShowPassword(true);
		setTimeout(() => setShowPassword(false), 2000);

		return password;
	};

	const handleCopyPassword = async () => {
		await copyToClipboard(formData.sudoPassword);
		setPasswordCopied(true);
		setTimeout(() => setPasswordCopied(false), 2000);
	};

	// Render the current step
	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<OrganizationStep
						isLoading={isLoading}
						onNext={handleOrganizationNext}
					/>
				);
			case 2:
				return (
					<SecurityStep
						isLoading={isLoading}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						passwordCopied={passwordCopied}
						onGeneratePassword={() => {
							const password = handleGeneratePassword();
							setFormData((prev) => ({
								...prev,
								sudoPassword: password,
								confirmPassword: password,
							}));
						}}
						onCopyPassword={handleCopyPassword}
						onPrevious={() => setCurrentStep(1)}
						onSubmit={handleSecuritySubmit}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className='mx-auto space-y-8 relative'>
			<Stepper
				value={currentStep}
				onValueChange={setCurrentStep}
				className='mb-8'
			>
				{STEPS.map((step) => (
					<StepperItem
						key={step}
						step={step}
						className='not-last:flex-1'
						loading={isLoading && currentStep === step}
					>
						<StepperTrigger asChild>
							<StepperIndicator className='transition-all duration-300 data-[active=true]:scale-110 data-[active=true]:shadow-md' />
						</StepperTrigger>
						{step < STEPS.length && (
							<StepperSeparator className='transition-all duration-500 data-[active=true]:bg-primary' />
						)}
					</StepperItem>
				))}
			</Stepper>

			<LoadingSpinner className='absolute top-1/2 left-1/2 origin-center  z-[1] ' />
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentStep}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.3 }}
					style={{
						zIndex: '100',
						background: 'var(--card)',
						position: 'relative'
					}}
				>
					{renderStepContent()}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
