import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function getImages(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  return { body: `Hello, ${name}!` };
}

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getImages,
});
