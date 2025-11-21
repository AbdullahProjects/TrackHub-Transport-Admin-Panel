export const uploadFileToCloudinary = async (file) => {
  try {
    if (!file) return { url: null, error: "No file selected" };

    // Cloudinary details
    const CLOUD_NAME = "dxdqfepzt"; 
    const UPLOAD_PRESET = "track-hub-upload-preset"; 

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    // Cloudinary returns `secure_url`
    if (data.secure_url) {
      return { url: data.secure_url, error: null };
    }

    return { url: null, error: data.error?.message || "Upload failed" };
  } catch (err) {
    return { url: null, error: err.message };
  }
};
