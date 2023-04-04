# AI Image Generator

- Bootstrapped with Nextjs
- Tutorial reference [here](https://www.youtube.com/watch?v=0qHnVYSxZ4k&t=5829s)
- Heavily influenced design wise by tutorial and for understanding Microsoft Azure Functions

### Goals

- A User can input text that DALL-E-2 will read and generate an image from. A user can also chose to use a suggested prompt from ChatGPT

- Integrate OpenAI's API service
- Implement Microsoft Azure running cloud functions, tested locally

### Issues

- The set up of `Azure Function Core Tools` was very specific and version had to match precisely if I was to use `TS` on the backend
- Fetching is done for all images in the container, rather than setting up a cached store on the front end
- Easier to allow the refreshing of the images but not efficient at all

### Future Goals

- User Auth
- Client caching
- Efficient refactor of reused code
- Lazy loading of Images
- Re-write sorting functions in conjunction with client caching to avoid reloading all Images whenever an Image is requested

### Tools

- Nextjs 13.2
- TypeScript
- Azure Function Core tools
- Azure CLI
- React Hot Toast
- OpenAI
- swr
