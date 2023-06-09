import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { Button, Icon } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Box, VStack,  } from "@chakra-ui/react";
import { ImageOutlined } from "@mui/icons-material";

interface ImageUploaderProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  setImageUrl,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleImageUpload = async (): Promise<void> => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const storage = getStorage(app);
        const storageRef: StorageReference = ref(storage, file.name);

        try {
          setIsLoading(true); // Set loading state to true
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          localStorage.setItem("uploadedImageUrl", downloadUrl);
          setImageUrl(downloadUrl);
          setIsLoading(false); // Set loading state to false
        } catch (error) {
          console.error("Error uploading image:", error);
          setIsLoading(false); // Set loading state to false in case of error
        }
      }
    });
  };

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("uploadedImageUrl");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, [setImageUrl]);

  useEffect(() => {
    const handleRemoveLocalStorage = (): void => {
      localStorage.removeItem("uploadedImageUrl");
    };

    handleRemoveLocalStorage();
    return () => {
      handleRemoveLocalStorage();
    };
  }, [location]);

  return (
    <Box minH={"100px"}>
      {!imageUrl && (
        <VStack h={"100px"} justifyContent={"center"} alignItems={"left"}>
          <Button
            isLoading={isLoading}
            loadingText='Uploading'
            colorScheme='teal'
            variant="outline"
            _hover={{ bg: "gray.200" }}
            w={"150px"}
            onClick={handleImageUpload}
          >
            <Icon as={ImageOutlined} w={6} h={6} mr={2} />
            Add Cover
          </Button>
        </VStack>
      )}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </Box>
  );
};

export default ImageUploader;
