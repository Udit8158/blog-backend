import { v2 as cloudinary } from "cloudinary";
//@ts-ignore
import generateSafeId from "generate-safe-id";

const uploadImageInCloudinary = async (imagePath: string) => {
  // Configuration
  //@ts-ignore
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const uniqeId = generateSafeId();
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(imagePath, {
      public_id: uniqeId,
      folder: "my-blog",
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(`my-blog/${uniqeId}`, {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  // Transform image auto-crop to square aspect_ratio
  //   const autoCropUrl = cloudinary.url(uniqeId, {
  //     crop: "auto",
  //     gravity: "auto",
  //     width: 500,
  //     height: 500,
  //   });

  //   console.log(autoCropUrl);

  return optimizeUrl;
};

export { uploadImageInCloudinary };
