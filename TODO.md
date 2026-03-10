# StoryWeaver

### Tasks / Ideas

---

### Client / Server Tasks

- [ ] Authentication
   - [ ] Ensure users can login with google, etc.
   - [ ] Automatically route them to the studio dashboard
   - [ ] Edit server DB schema to include a users table --> links to projects & videos table
   - [ ] Edit projects & videos table to make them link to users properly
   - [ ] Edit server queries to account for users

- [ ]

### Studio Tasks

- [ ] Incorporate local storage using zustand middleware (persist)

- [ ] Allow users to view their generated clips with an overview?
   - [ ] "view videos" page in the dashboard
   - [ ] Custom video view component in the dashboard

- [ ] Studio --> refactor the graphutils functions to allow understanding of previous scenes and what happened.
   - [ ] --> maybe we need to incorporate some "thumbnail" / last frame system to give reference images to the video generation.
   - [ ] Scene Node --> add a "previous scene" reference toggle --> if toggled on, add the previous scene to the prompt.

- [x] Dashboard page --> retrieve list of projects from DB
   - [x] Tanstack query to manage requests (maybe)
   - [x] Map out and render projectcards based on the information from DB
   - [x] Figure out how to re-fetch data after updating it on the studio side
      - [x] --> invalidate the query within persistence.ts (after a successful update)

### Completed Tasks ✓

- [x] Add right click functionality to the nodes
   - [x] Context menu --> shadcn?
   - [x] Delete nodes
   - [x] Lock position of nodes --> maybe create a "locked" state for each node (small icon in the corner?)
- [x] Complete the custom node components --> define styles & flesh out components
   - [x] Character Node
   - [x] Script Node
   - [x] Environment Node
   - [x] ProjectSettings Node
   - [x] Scene Node

- [x] Add projectSettings to the save logic.
   - [x] Create a new observer for projectSettingsStore
   - [x] Use the same debounce / save function

- [x] Figure out how to save graph to a database
   - [x] Auto-save --> look into debouncing --> whenever the user is moving --> reset our "save timer" --> even if user is moving, we will still save to the DB every 10 / 30 seconds.
      - [x] Create an "observer"
         - [x] zustand subscribe allows us to "watch the store"
         - [x] within here, we can define and call the debounce save logic
         - [x] save the nodes and edges arrays to the database

- [x] Maybe move project settings to a global setting
   - [x] Convert topleft panel into a drop down (similar to figma)
   - [x] User can:
      - [x] Go back to the dashboard
      - [x] Edit Project Settings --> Side sheet

- [x] Project Settings Side Sheet
   - [x] Triggered by the panelMenu dropdown
   - [x] Opens the shadcn side sheet
   - [x] Replaces the projectSettings node content

- [x] Create a "general" updateNode function --> used to update all custom nodes
   - [x] refactor current updateScript function
   - [x] look into generics --> allows us to dynamically type the function
- [x] Add "addNode" functionality to the studio.
   - [x] Update FlowStore interface -- add "addNode"
   - [x] Create "addNode" function / state inside the store
   - [x] Create custom buttons on the <Flow> component bottom panels
   - [x] Custom buttons --> onClick will call the addNode function
   - [x] addNode will use the blueprints to populate the "data" property for their respective node
   - [x] Involves completing the "nodeBlueprint.ts" file --> used for default values

- [x] useFlowStore --> updateNode Data (right now the "data" property of each node doesn't actually update whenever we change the info within the fields)
   - [x] unique functions for each node that updates their specific data points
   - [x] onChange event --> calls updateNode --> replaces their "data" property --> return nodes array

- [x] Server --> handle requests to update the project settings
   - [x] Update the DB to include projectSettings (maybe object or separate columns)
      - [x] Update the schema to inlcude the additional fields
      - [x] Push / migrate the changes
   - [x] Create a new route and properly handle the update request.

- [x] Server --> create api endpoint to sort and understand graph / state coming from studio
- [x] Server --> create System prompts to help text-model understand the meaning of graph --> create a prompt for a scene
- [x] Server --> understand the graph coming from studio --> programatically piece out and translate the graph into something AI can understand.

- [x] Create TODO.md
