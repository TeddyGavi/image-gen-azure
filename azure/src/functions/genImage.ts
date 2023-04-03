import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import axios from "axios";
import {
  generateSaSToken,
  storageName,
  blobName,
  storageUrl,
} from "../../lib/genSAStoken";
import openai from "../../lib/openai";
import { BlobServiceClient } from "@azure/storage-blob";
type JsonPrimitive = string | number | boolean | null;
export type returnFromAI = { [Key in string]?: JsonPrimitive };

export async function genImage(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const { prompt }: any | string = await request.json();

  console.log(prompt);

  const responseDalle = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = responseDalle.data.data[0].url;

  const axiosRes = await axios.get(imageUrl!, { responseType: "arraybuffer" });
  const buffer = axiosRes.data;
  const sasToken = await generateSaSToken();

  const blobServiceClient = new BlobServiceClient(`${storageUrl}?${sasToken}`);

  const containerClient = blobServiceClient.getContainerClient(blobName);

  // timestamp
  const timestamp = new Date().getTime();
  const fileName = `${prompt}_${timestamp}.png`;

  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    await blockBlobClient.uploadData(buffer);
    console.log(`upload all good!`);
  } catch (error: any) {
    context.log(error.message);
  }

  return { body: `Successful` };
}

app.http("genImage", {
  methods: ["POST"],
  authLevel: "function",
  handler: genImage,
});
