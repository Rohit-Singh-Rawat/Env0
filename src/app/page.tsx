'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Env0Logo from '@/components/shared/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconBrandGithub, IconBrandTwitter, IconPlus, IconFileDescription, IconUser } from '@tabler/icons-react';

export default function Home() {
	return (
		<main className='min-h-screen bg-background text-foreground'>
			{/* Navbar */}
			<nav className='flex items-center justify-between px-6 py-4 border-b border-border/20 backdrop-blur-sm sticky top-0 z-10 bg-background/80'>
				<div className='flex items-center'>
					<Link
						href='https://github.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-foreground hover:text-foreground/80 transition-colors'
						aria-label='GitHub'
					>
						<IconBrandGithub className='size-5' />
					</Link>
					<Link
						href='https://twitter.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-foreground hover:text-foreground/80 transition-colors ml-4'
						aria-label='Twitter'
					>
						<IconBrandTwitter className='size-5' />
					</Link>
				</div>
				<div className='flex items-center justify-center'>
					<Link
						href='/'
						aria-label='Home'
					>
						<Env0Logo
							size='md'
							variant='small'
						/>
					</Link>
				</div>
				<div>
					<Link
						href='/auth'
						className='inline-flex items-center px-4 py-2 rounded-md font-medium text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20'
					>
						Sign In
					</Link>
				</div>
			</nav>

			{/* Hero Section */}
			<section className='py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-background/95'>
				<div className='max-w-5xl mx-auto text-center'>
					<div className='mb-16 p-4 md:p-8 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-lg'>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
							Self-Service <span className='text-primary'>Cloud</span> Environments
						</h1>
						<p className='text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto'>
							Empower your developers with on-demand cloud environments for development, testing, and
							production.
						</p>
						<div className='flex flex-col sm:flex-row justify-center gap-4'>
							<Button
								size='lg'
								className='bg-primary hover:bg-primary/90 shadow-md border border-primary/50 text-white text-shadow'
							>
								Get Started
							</Button>
							<Button
								variant='outline'
								size='lg'
								className='border-border/30 hover:bg-accent/5 shadow-sm'
							>
								Schedule Demo
							</Button>
						</div>
					</div>

					<div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-8'>
						<Card className='border-border/30 hover:border-border/50 transition-all hover:shadow-md'>
							<CardHeader className='pb-2'>
								<div className='bg-primary/10 text-primary size-12 rounded-lg mb-4 flex items-center justify-center mx-auto border border-primary/20'>
									<IconPlus className='size-6' />
								</div>
								<CardTitle className='text-xl font-semibold text-center'>Instant Environments</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-muted-foreground text-center'>
									Spin up fully configured environments in minutes, not days.
								</p>
							</CardContent>
						</Card>
						<Card className='border-border/30 hover:border-border/50 transition-all hover:shadow-md'>
							<CardHeader className='pb-2'>
								<div className='bg-primary/10 text-primary size-12 rounded-lg mb-4 flex items-center justify-center mx-auto border border-primary/20'>
									<IconFileDescription className='size-6' />
								</div>
								<CardTitle className='text-xl font-semibold text-center'>Cost Optimization</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-muted-foreground text-center'>
									Automatically shut down idle environments to reduce cloud costs.
								</p>
							</CardContent>
						</Card>
						<Card className='border-border/30 hover:border-border/50 transition-all hover:shadow-md'>
							<CardHeader className='pb-2'>
								<div className='bg-primary/10 text-primary size-12 rounded-lg mb-4 flex items-center justify-center mx-auto border border-primary/20'>
									<IconUser className='size-6' />
								</div>
								<CardTitle className='text-xl font-semibold text-center'>Developer Friendly</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-muted-foreground text-center'>
									Simple interface designed for developers, not cloud experts.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</main>
	);
}
