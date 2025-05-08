import Env0Logo from '@/components/shared/Logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import OAuthButton from '@/components/auth/OAuthButton';

type Props = {};
const page = (props: Props) => {
	return (
		<div className='flex h-screen w-screen items-center justify-center bg-background flex-col gap-6 p-4'>
			<div className='mb-2'>
				<Env0Logo
					size='sm'
					variant='full'
				/>
			</div>
			<div className='p-2.5 border-2 border-border/20 rounded-3xl bg-card/70  backdrop-blur-md '>
				<Card className='w-full max-w-md border-border/40 py-14 shadow-[0_4px_20px_rgba(0,2,0,0.95)] '>
					<CardHeader className='space-y-2 text-center'>
						<CardTitle className='text-2xl font-semibold'>Welcome Back</CardTitle>
						<CardDescription>Sign in to your account to continue</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4 px-8 flex flex-col'>
						<OAuthButton
							type='Google'
							variant='outline'
							className='h-11 mb-3'
						/>
						<OAuthButton
							type='GitHub'
							variant='outline'
							className='h-11 mb-3'
						/>
						<div className='mt-8 text-center text-xs text-muted-foreground'>
							<p>
								By signing in, you agree to our{' '}
								<a
									href='#'
									className='text-primary hover:underline'
								>
									Terms of Service
								</a>{' '}
								and{' '}
								<a
									href='#'
									className='text-primary hover:underline'
								>
									Privacy Policy
								</a>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
export default page;
