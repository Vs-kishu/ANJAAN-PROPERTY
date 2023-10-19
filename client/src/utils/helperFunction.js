export const convertBlobURLsToFiles = (blobURLs) => {
  return Promise.all(
    blobURLs.map(async (blobURL) => {
      const response = await fetch(blobURL);
      const blob = await response.blob();
      const filename = blobURL.split("/").pop();
      return new File([blob], filename, { type: blob.type });
    })
  );
};
