import {
   integer,
   jsonb,
   pgTable,
   varchar,
   timestamp,
   text,
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema';

export const projectsTable = pgTable('projects', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   userID: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
   projectTitle: varchar({ length: 255 }).notNull().default('Untitled Project'),
   aspectRatio: varchar({ length: 10 }).notNull().default('16:9'),
   engine: varchar({ length: 50 }).notNull().default('veo'),
   globalNegativePrompt: varchar({ length: 1000 }).notNull().default(''),
   executiveSummary: text().notNull().default(''),
   cinematicPreset: varchar({ length: 100 }).notNull().default('None'),
   flowData: jsonb('flow_data').notNull(),
   updatedAt: timestamp('updated_at').defaultNow(),
});

export const videoOperationsTable = pgTable('videoOperations', {
   name: varchar({ length: 255 }).primaryKey(),
   userID: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
   projectID: integer('project_id')
      .notNull()
      .references(() => projectsTable.id, { onDelete: 'cascade' }),
   status: varchar({ length: 50 }).notNull().default('PROCESSING'),
   videosURL: varchar({ length: 2048 }),
   geminiVideoUri: varchar({ length: 2048 }),  // Gemini Files API URI — used for native Veo extension (<48h)
   createdAt: timestamp('created_at').defaultNow(),
});

export * from './auth-schema';
