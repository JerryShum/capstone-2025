import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@server/db';

export const auth = betterAuth({
   database: drizzleAdapter(db, {
      provider: 'pg',
   }),
   baseURL: process.env.BETTER_AUTH_URL, // http://localhost:3000
   basePath: '/api/auth', // Explicitly tell it we are under /api
   emailAndPassword: {
      enabled: true,
   },
   //    socialProviders: {
   //       github: {
   //          clientId: process.env.GITHUB_CLIENT_ID as string,
   //          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
   //       },
   //    },
});
