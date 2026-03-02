import { hc } from 'hono/client';
import { type ApiRoutes } from '@server/api-schema';

const client = hc<ApiRoutes>('/');

export const api = client.api;
