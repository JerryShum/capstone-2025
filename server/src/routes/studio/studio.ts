import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { ApiResponse } from '@shared';
import { updateProjectSchema } from '@shared/schemas/updateProjectSchema';
import { db } from '@server/db';
import { projectsTable } from '@server/db/schemas/schema';
import { initialNodes, initialEdges } from '@shared';
import { desc, eq, and } from 'drizzle-orm';
import type { Env } from '@server/lib/auth';

export const studioRoute = new Hono<Env>()
   .get('/hello', async (c) => {
      const data: ApiResponse = {
         message: 'hello',
         success: true,
      };

      return c.json(data, { status: 200 });
   })
   .get('/list', async (c) => {
      //! This route is for getting all of the user's projects
      const user = c.get('user');

      const projects = await db
         .select()
         .from(projectsTable)
         .where(eq(projectsTable.userID, user.id))
         .orderBy(desc(projectsTable.updatedAt));

      if (!projects) {
         return c.json({ error: 'Projects not found' }, 404);
      }

      return c.json(projects, { status: 200 });
   })
   .post('/create', async (c) => {
      //! This route is for creating a new project

      const user = c.get('user');

      //@ get validated data from zValidator
      const [newProject] = await db
         .insert(projectsTable)
         .values({
            userID: user.id,
            projectTitle: 'Untitled Project',
            flowData: { nodes: initialNodes, edges: initialEdges },
            executiveSummary:
               'This is a simple animation following a baby chick going around his daily life around the bard.',
         })
         .returning();

      return c.json({ id: newProject?.id }, 201);
   })
   .get('/:id', async (c) => {
      //! This route is for loading/getting a single project (whenever the user clicks on a project card from the dashboard)
      const projectID = parseInt(c.req.param('id'), 10);
      const user = c.get('user');

      const [project] = await db
         .select()
         .from(projectsTable)
         .where(and(
            eq(projectsTable.id, projectID),
            eq(projectsTable.userID, user.id)
         ));

      if (!project) {
         return c.json({ error: 'Project not found' }, 404);
      }

      return c.json(project, 200);
   })
   .patch('/update/:id', zValidator('json', updateProjectSchema), async (c) => {
      //! This route is for updating/saving a pre-existing project

      const projectID = parseInt(c.req.param('id'), 10);
      const user = c.get('user');
      const validatedData = c.req.valid('json');
      const {
         projectTitle,
         flowData,
         aspectRatio,
         engine,
         globalNegativePrompt,
         executiveSummary,
         cinematicPreset,
      } = validatedData;

      await db
         .update(projectsTable)
         .set({
            projectTitle: projectTitle,
            flowData: flowData,
            aspectRatio,
            engine,
            globalNegativePrompt,
            executiveSummary,
            cinematicPreset,
            updatedAt: new Date(),
         })
         .where(and(
            eq(projectsTable.id, projectID),
            eq(projectsTable.userID, user.id)
         ));

      return c.json({ message: 'success' }, 200);
   });
