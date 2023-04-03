import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { generateSaSToken } from "../../lib/genSAStoken";

export const getSASToken = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> => {
  try {
    const token = await generateSaSToken();
    return { body: token };
  } catch (error) {
    context.log(error);
    return { jsonBody: error };
  }
};

app.http("getSASToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getSASToken,
});
