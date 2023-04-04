import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import {
  storageKey,
  storageName,
  blobName,
  blobClient,
  generateSaSToken,
  storageUrl,
} from "../../lib/genSAStoken";

type UrlEntry = {
  url?: string;
  name?: string;
};

export async function getImages(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const containerClient = blobClient.getContainerClient(blobName);

  const imageUrls: UrlEntry[] = [];
  const sasToken = await generateSaSToken();

  for await (const blob of containerClient.listBlobsFlat()) {
    const oneUrl = `${blob.name}?${sasToken}`;
    const url = `${storageUrl}/images/${oneUrl}`;

    imageUrls.push({ url, name: blob.name });
  }
  // A mouse riding a horse_1680551355416.png
  const sortedImagesUrls = imageUrls.sort((a, b) => {
    const aTime = +a.url.split("_").pop().toString().split(".").shift();
    const bTime = +b.url.split("_").pop().toString().split(".").shift();

    return bTime - aTime;
  });

  return {
    jsonBody: {
      imageUrls: sortedImagesUrls,
    },
  };
}

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getImages,
});
