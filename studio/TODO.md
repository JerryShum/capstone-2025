# StoryWeaver - Studio

Studio portion / package for the entire StoryWeaver application. This is going to be where users interact with custom nodes to create and generate the video for their story.

### TODO

- [ ] Complete the custom node components --> define styles & flesh out components
   - [x] Character Node
   - [x] Script Node
   - [x] Environment Node
   - [x] ProjectSettings Node
   - [ ] Scene Node

- [ ] Maybe move project settings to a global setting
   - [ ] Convert topleft panel into a drop down (similar to figma)
   - [ ] User can:
      - [ ] Go back to the dashboard
      - [ ] Edit project settings
      - [ ] Project settings can be saved to its own store / state

- [ ] Add right click functionality to the nodes
   - [ ] Delete nodes
   - [ ] Lock position of nodes ?

- [ ] Figure out how to save the graph locally
   - [ ] zustand persist middleware

- [ ] Figure out how to save graph to a database
   - [ ] Loaders in router --> auto save & fetch from database?
   - [ ] Implement a timer --> save every 2 seconds? --> streaming approach?

### Completed Tasks ✓

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
