import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw"
        })
        
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error("Public ID is required for deletion");
    }

   
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw", 
    });

    if (response.result !== 'ok') {
      throw new Error(`Failed to delete file with public_id: ${publicId}`);
    }

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return { success: false, message: error.message };
  }
};

export {uploadOnCloudinary, deleteFromCloudinary}