import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getMany = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query('users').collect();
        return users;
    },
});

export const add = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error('Unauthorized: User must be authenticated to add a user');
        }
        const userId = await ctx.db.insert('users', {
            name: 'Kevin'
        });

        return userId;
    },
});