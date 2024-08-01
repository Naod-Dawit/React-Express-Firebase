import { storage } from "../firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param {File} file - The file to upload.
 * @param {string} path - The path where the file will be stored.
 * @returns {Promise<string>} - The download URL of the uploaded file.
 */

export const uploadFile = async (file, path) => {
    try {
      const fileRef = ref(storage, path);
      console.log("Uploading file to path:", path);
      console.log("File size:", file.size);


      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);
      
      return fileURL;
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw new Error("Failed to upload file.");
    }
  };