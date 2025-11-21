import imageCompression from "browser-image-compression";

const compressImage = async ({ image }) => {
  console.log(`originalFile size ${image.size / 1024 / 1024} MB`);
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(image, options);
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
    return compressedFile;
  } catch (e) {
    console.log("Error during image compression: ", e);
    return null;
  }
};

export default compressImage;
