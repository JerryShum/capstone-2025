# StoryWeaver - Studio

Studio portion / package for the entire StoryWeaver application. This is going to be where users interact with custom nodes to create and generate the video for their story.

### TODO

- [ ] Complete the custom node components --> define styles & flush out components
   - [ ] Character Node
   - [ ] Scene Node
   - [ ] ProjectSettings Node
   - [ ] Script Node

- [ ] Create a "general" updateNode function --> used to update all custom nodes
   - [ ] refactor current updateScript function
   - [ ] look into generics --> allows us to dynamically type the function

### Completed Tasks ✓

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
