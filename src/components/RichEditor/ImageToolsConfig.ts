import ImageTool from "@editorjs/image";
import { app } from "../../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";


const storage = getStorage(app);

interface UploadResponse {
  success: number;
  file: {
    url: string;
  };
}

const ImageToolsConfig = {
  class: ImageTool,
  type: "image",
  config: {
    uploader: {
      uploadByFile: (file: File): Promise<UploadResponse> => {
        return new Promise<UploadResponse>((resolve, reject) => {
          // Create a unique file name
          const fileName = `${Date.now()}_${file.name}`;
          const storageRef: StorageReference = ref(storage, fileName);

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
    
  },
};

export default ImageToolsConfig;
