import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/trpc/server';
import { auth } from '@/lib/auth';

interface PageProps {
	params: {
		slug: string;
	};
}

export default async function OrganizationDashboard({ params }: PageProps) {
	// In a real implementation, you would fetch the organization data using the slug
	// For now, we'll just use the slug as the organization name
	const slug = params.slug;
	
	// Simulate checking if organization exists
	// In a real implementation, you would query your database
	if (!slug || slug === 'invalid') {
		notFound();
	}

	return (
		<div className='container mx-auto py-8'>
			<h1 className='text-3xl font-bold mb-8'>{slug} Environment Manager</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
				<StatsCard
					title='Total Environments'
					value='12'
					description='Across all projects'
				/>
				<StatsCard
					title='Active Projects'
					value='5'
					description='Using environment variables'
				/>
				<StatsCard
					title='Team Members'
					value='8'
					description='With access to environments'
				/>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2'>
					<Card>
						<CardHeader>
							<CardTitle>Recent Environments</CardTitle>
							<CardDescription>Your recently updated environment configurations</CardDescription>
						</CardHeader>
						<CardContent>
							<Suspense fallback={<div>Loading environments...</div>}>
								<EnvironmentsList />
							</Suspense>
						</CardContent>
					</Card>
				</div>

				<div>
					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
							<CardDescription>Common environment management tasks</CardDescription>
						</CardHeader>
						<CardContent className='flex flex-col gap-3'>
							<Button className='w-full'>Create New Environment</Button>
							<Button
								className='w-full'
								variant='outline'
							>
								Import Variables
							</Button>
							<Button
								className='w-full'
								variant='outline'
							>
								Manage Access
							</Button>
						</CardContent>
					</Card>

					<Card className='mt-6'>
						<CardHeader>
							<CardTitle>Activity Log</CardTitle>
							<CardDescription>Recent changes to environments</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className='space-y-3'>
								<ActivityItem
									user='John Doe'
									action='updated'
									environment='Production'
									time='2 hours ago'
								/>
								<ActivityItem
									user='Jane Smith'
									action='created'
									environment='Staging'
									time='Yesterday'
								/>
								<ActivityItem
									user='Alex Johnson'
									action='deleted'
									environment='Testing'
									time='3 days ago'
								/>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

// Helper Components
function StatsCard({
	title,
	value,
	description,
}: {
	title: string;
	value: string;
	description: string;
}) {
	return (
		<Card>
			<CardHeader className='pb-2'>
				<CardTitle className='text-xl'>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-3xl font-bold'>{value}</p>
				<p className='text-muted-foreground text-sm'>{description}</p>
			</CardContent>
		</Card>
	);
}

function EnvironmentsList() {
	// This would be fetched from your API in a real implementation
	const environments = [
		{ id: 1, name: 'Production', variables: 24, lastUpdated: '2 hours ago' },
		{ id: 2, name: 'Staging', variables: 18, lastUpdated: 'Yesterday' },
		{ id: 3, name: 'Development', variables: 32, lastUpdated: '3 days ago' },
		{ id: 4, name: 'Testing', variables: 15, lastUpdated: '1 week ago' },
	];

	return (
		<div className='space-y-4'>
			{environments.map((env) => (
				<div
					key={env.id}
					className='flex items-center justify-between p-4 border rounded-lg'
				>
					<div>
						<h3 className='font-medium'>{env.name}</h3>
						<p className='text-sm text-muted-foreground'>{env.variables} variables</p>
					</div>
					<div className='flex items-center gap-3'>
						<span className='text-sm text-muted-foreground'>Updated {env.lastUpdated}</span>
						<Button
							variant='outline'
							size='sm'
						>
							View
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}

function ActivityItem({
	user,
	action,
	environment,
	time,
}: {
	user: string;
	action: string;
	environment: string;
	time: string;
}) {
	return (
		<li className='text-sm'>
			<span className='font-medium'>{user}</span> {action}{' '}
			<span className='font-medium'>{environment}</span> environment
			<div className='text-muted-foreground text-xs'>{time}</div>
		</li>
	);
}
