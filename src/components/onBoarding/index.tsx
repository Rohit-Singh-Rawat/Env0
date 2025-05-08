'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import OrganizationStep from './components/OrganizationStep';
import { LoadingSpinner } from '../ui/spinner';
import type { OrganizationFormValues } from './components/types';

// Constants
const STEPS = [1];

/**
 * OnBoarding component that manages the organization creation process
 */
export default function OnBoarding() {
	return (
		<div className='mx-auto space-y-8 relative'>
			<LoadingSpinner className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]' />

			<AnimatePresence mode='wait'>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.3 }}
					style={{
						zIndex: '100',
						background: 'var(--card)',
						position: 'relative',
					}}
				>
					<OrganizationStep />
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
