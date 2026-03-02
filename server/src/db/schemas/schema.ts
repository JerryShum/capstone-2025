import {
   integer,
   jsonb,
   pgTable,
   varchar,
   timestamp,
   text,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   name: varchar({ length: 255 }).notNull(),
   age: integer().notNull(),
   email: varchar({ length: 255 }).notNull().unique(),
});

export const projectsTable = pgTable('projects', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   projectTitle: varchar({ length: 255 }).notNull().default('Untitled Project'),
   aspectRatio: varchar({ length: 10 }).notNull().default('16:9'),
   engine: varchar({ length: 50 }).notNull().default('veo'),
   globalNegativePrompt: varchar({ length: 1000 }).notNull().default(''),
   executiveSummary: text().notNull().default(''),
   cinematicPreset: varchar({ length: 100 }).notNull().default('None'),
   flowData: jsonb('flow_data').notNull(),
   updatedAt: timestamp('updated_at').defaultNow(),
});
