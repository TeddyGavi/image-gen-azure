import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import openai from "../../lib/openai";

export async function getGPTSuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Write a random text prompt for DALL-E-2 to generate an image, this prompt will be shown to the user, include details such as genre, and what type of image it should be, options can include, oil painting, watercolor, digital, 4k, modern, painting etc. The image should be in a randomly chosen style from the previous century. Do not wrap the answer in quotes.",
      max_tokens: 100,
      temperature: 0.8,
    });

    const text = (res.data.choices[0].text ||=
      "Create an oil painting of a mountain Landscape in the style of Bob Ross");

    return { body: text };
  } catch (error) {
    context.log(error);
    return { jsonBody: error.message };
  }
}

app.http("getGPTSuggestion", {
  methods: ["GET", "POST"],
  authLevel: "function",
  handler: getGPTSuggestion,
});
