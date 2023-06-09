import ImageTool from "@editorjs/simple-image";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const storage = getStorage(app);

const ImageToolsConfig = {
  class: ImageTool,
  type: "image",
  config: {
    uploader: {
      uploadByFile(file) {
        return new Promise((resolve, reject) => {
          // Create a unique file name
          const fileName = `${Date.now()}_${file.name}`;
          const storageRef = ref(storage, fileName);

          uploadBytes(storageRef, file)
            .then((snapshot) => {
              getDownloadURL(snapshot.ref).then((downloadURL) => {
                resolve({
                  success: 1,
                  file: {
                    url: downloadURL,
                  },
                });
              });
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
    withBorder: false,
    withBackground: false,
    stretched: true,
    caption: false,
    actions: [
      {
        name: "delete_image",
        icon: "<svg>...</svg>",
        title: "Delete Image",
        action: async (api, block) => {
          if (!block || !block.data) {
            console.error("Invalid block object:", block);
            return;
          }

          const imageUrl = block.data.file.url; // Assuming the image URL is stored in the "file.url" property

          try {
            // Create a reference to the image file
            const imageRef = ref(storage, imageUrl);

            // Delete the image file from storage
            await deleteObject(imageRef);

            alert("Image deleted successfully");
            api.blocks.delete(block.id); // Remove the block containing the image from the editor
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        },
      },
    ],
  },
};

export default ImageToolsConfig;
