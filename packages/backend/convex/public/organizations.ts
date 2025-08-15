import { v } from 'convex/values';
import { action, mutation } from '../_generated/server';
import { create } from 'domain';
import { createClerkClient } from '@clerk/backend';

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY || '',
});

export const validate = action({
    args: {
        organizationId: v.string(),
    },
    handler: async (_ctx, args) => {
        try {
            await clerkClient.organizations.getOrganization({
                organizationId: args.organizationId,
            });

            return { valid: true };
        } catch (error) {
            return { valid: false, reason: 'Invalid organization ID' };
        }
    },
});
