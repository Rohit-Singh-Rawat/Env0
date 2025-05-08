'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth.client';
import type { Organization } from 'better-auth/plugins';

type Props = {};
const page = (props: Props) => {
	const [organization, setOrganization] = useState<Organization | null>(null);

	useEffect(() => {
		const fetchOrganization = async () => {
			try {
				const org = await authClient.organization.getFullOrganization({
					query: {
						organizationId: 'org_123',
					},
				});
				setOrganization(org);
			} catch (error) {
				console.error('Failed to fetch organization:', error);
			}
		};

		fetchOrganization();
	}, []);

	return <div>page</div>;
};
export default page;
