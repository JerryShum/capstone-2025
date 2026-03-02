import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { ApiResponse } from '@shared';
import { updateProjectSchema } from '@shared/schemas/updateProjectSchema';
import { db } from '@server/db';
import { projectsTable } from '@server/db/schemas/schema';
import { initialNodes, initialEdges } from '@shared';
import { desc, eq } from 'drizzle-orm';

export const studioRoute = new Hono()
   .get('/hello', async (c) => {
      const data: ApiResponse = {
         message: 'hello',
         success: true,
      };

      return c.json(data, { status: 200 });
   })
   .get('/list', async (c) => {
      //! This route is for getting all of the user's projects
      const projects = await db
         .select()
         .from(projectsTable)
         .orderBy(desc(projectsTable.updatedAt));

      if (!projects) {
         return c.json({ error: 'Projects not found' }, 404);
      }

      return c.json(projects, { status: 200 });
   })
   .post('/create', async (c) => {
      //! This route is for creating a new project

      //@ get validated data from zValidator
      const [newProject] = await db
         .insert(projectsTable)
         .values({
            projectTitle: 'Untitled Project',
            flowData: { nodes: initialNodes, edges: initialEdges },
         })
         .returning();

      return c.json({ id: newProject?.id }, 201);
   })
   .get('/:id', async (c) => {
      //! This route is for loading/getting a single project (whenever the user clicks on a project card from the dashboard)
      const projectID = parseInt(c.req.param('id'), 10);

      const [project] = await db
         .select()
         .from(projectsTable)
         .where(eq(projectsTable.id, projectID));

      if (!project) {
         return c.json({ error: 'Project not found' }, 404);
      }

      return c.json(project, 200);
   })
   .patch('/update/:id', zValidator('json', updateProjectSchema), async (c) => {
      //! This route is for updating/saving a pre-existing project

      const projectID = parseInt(c.req.param('id'), 10);
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
         .where(eq(projectsTable.id, projectID));

      return c.json({ message: 'success' }, 200);
   });
