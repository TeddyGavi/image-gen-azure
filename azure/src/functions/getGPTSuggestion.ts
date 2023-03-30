import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function getGPTSuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  //   const name = request.query.get("name") || (await request.text()) || "world";

  return { body: `Hello, World!` };
}

app.http("getGPTSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getGPTSuggestion,
});
