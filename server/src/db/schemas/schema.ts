import {
   integer,
   jsonb,
   pgTable,
   varchar,
   timestamp,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   name: varchar({ length: 255 }).notNull(),
   age: integer().notNull(),
   email: varchar({ length: 255 }).notNull().unique(),
   password: varchar({length: 255}).notNull(),
});

export const projectsTable = pgTable('projects', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   projectTitle: varchar({ length: 255 }).notNull(),
   flowData: jsonb('flow_data').notNull(),
   updatedAt: timestamp('updated_at').defaultNow(),
});
