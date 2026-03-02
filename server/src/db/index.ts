import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres'
import * as schema from './schemas/schema'

// stup connection link
export const db_conn = process.env.DATABASE_URL!;

// client (driver)
const client = postgres(db_conn, {prepare: false});

// the database (drizzle instance)
export const db = drizzle(client, {schema})