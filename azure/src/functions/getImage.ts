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

export async function getImage(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const prompt = await request
    .json()
    .then((data: { prompt: string }): string => data.prompt);

  console.log(prompt);

  const responseDalle = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = responseDalle.data.data[0].url;

  const axiosRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
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
  } catch (error) {
    context.log(error);
  }

  return { body: `Successful` };
}

app.http("getImage", {
  methods: ["POST"],
  authLevel: "function",
  handler: getImage,
});
