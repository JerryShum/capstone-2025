# StoryWeaver

### Tasks / Ideas

- [] Studio --> refactor the graphutils functions to allow understanding of previous scenes and what happened.
   - [] --> maybe we need to incorporate some "thumbnail" / last frame system to give reference images to the video generation.

### Completed Tasks ✓

- [x] Server --> handle requests to update the project settings
   - [x] Update the DB to include projectSettings (maybe object or separate columns)
      - [x] Update the schema to inlcude the additional fields
      - [x] Push / migrate the changes
   - [x] Create a new route and properly handle the update request.

- [x] Server --> create api endpoint to sort and understand graph / state coming from studio
- [x] Server --> create System prompts to help text-model understand the meaning of graph --> create a prompt for a scene
- [x] Server --> understand the graph coming from studio --> programatically piece out and translate the graph into something AI can understand.

- [x] Create TODO.md
