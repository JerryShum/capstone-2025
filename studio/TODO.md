# StoryWeaver - Studio

Studio portion / package for the entire StoryWeaver application. This is going to be where users interact with custom nodes to create and generate the video for their story.

### TODO

- [ ] Complete the custom node components --> define styles & flesh out components
   - [x] Character Node
   - [x] Script Node
   - [x] Environment Node
   - [x] ProjectSettings Node
   - [ ] Scene Node

- [x] Add right click functionality to the nodes
   - [x] Context menu --> shadcn?
   - [x] Delete nodes
   - [ ] Lock position of nodes --> maybe create a "locked" state for each node (small icon in the corner?)

- [ ] Figure out how to save the graph locally
   - [ ] zustand persist middleware

- [ ] Figure out how to save graph to a database
   - [ ] Auto-save --> look into debouncing --> whenever the user is moving --> reset our "save timer" --> even if user is moving, we will still save to the DB every 10 / 30 seconds.
      - [ ] Create an "observer"
         - [ ] zustand subscribe allows us to "watch the store"
         - [ ] within here, we can define and call the debounce save logic
         - [ ] save the nodes and edges arrays to the database

### Completed Tasks ✓

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
