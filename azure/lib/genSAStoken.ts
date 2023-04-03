import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";

/* 
storage account
  \- container
    - (may contain many blobs)
    - images
      \- (many images)
    - videos
      \- many videos
*/

export const storageName = process.env.azureStorageName;
export const storageKey = process.env.azureStorageKey;
export const blobName = "images";
export const storageUrl = `https://${storageName}.blob.core.windows.net`;

const sharedKeyCredential = new StorageSharedKeyCredential(
  storageName,
  storageKey
);

//create client to connect to blob
export const blobClient = new BlobServiceClient(
  storageUrl,
  sharedKeyCredential
);

export async function generateSaSToken() {
  const containerClient = blobClient.getContainerClient(blobName);

  // list all rules for connection
  const rules = new BlobSASPermissions();
  rules.write = true;
  rules.create = true;
  rules.read = true;

  const endDate = new Date();
  endDate.setMinutes(endDate.getMinutes() + 10);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: rules,
      expiresOn: endDate,
    },
    sharedKeyCredential
  ).toString();

  return sasToken;
}
