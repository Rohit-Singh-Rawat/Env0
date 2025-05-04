import React from 'react';
import type { StepHeaderProps } from './types';

/**
 * A reusable header component for onboarding steps
 */
const StepHeader: React.FC<StepHeaderProps> = ({ title, subtitle }) => (
	<div className='mb-6'>
		<h2 className='text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
			{title}
		</h2>
		{subtitle && (
			<p className='text-sm text-center text-muted-foreground mt-2 mx-auto'>{subtitle}</p>
		)}
	</div>
);

export default StepHeader;
