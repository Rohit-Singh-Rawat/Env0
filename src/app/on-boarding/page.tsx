import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Env0Logo from '@/components/shared/Logo';
import OnBoarding from '@/components/onBoarding';

const page = () => {
	return (
		<div className='flex items-center justify-center h-screen flex-col gap-6 p-4 bg-background'>
			<div className='mb-2'>
				<Env0Logo variant='full' />
			</div>
			<div className='w-full max-w-xl bg-card/80 backdrop-blur-sm rounded-3xl p-2.5 border-2 border-border/20'>
				<Card className='shadow-[0_4px_20px_rgba(0,2,0,0.95)] py-6 w-full'>
					<CardHeader className='text-center'>
						<CardTitle className='text-2xl font-semibold'>Welcome to Env0</CardTitle>
					</CardHeader>
					<CardContent>
						<OnBoarding />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default page;
