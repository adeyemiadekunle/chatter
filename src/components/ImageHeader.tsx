import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
  deleteObject,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { Button, Icon } from "@chakra-ui/react";
import { Box, VStack, Image  } from "@chakra-ui/react";
import { ImageOutlined, DeleteOutlined } from "@mui/icons-material";

interface ImageUploaderProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  setImageUrl,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


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
          setImageUrl(downloadUrl);
          setIsLoading(false); // Set loading state to false
        } catch (error) {
          console.error("Error uploading image:", error);
          setIsLoading(false); // Set loading state to false in case of error
        }
      }
    });
  };

  const handleDeleteImage = async (): Promise<void> => {
    if (imageUrl) {
      const storage = getStorage(app);
      const imageRef: StorageReference = ref(storage, imageUrl);

      try {
        await deleteObject(imageRef);
        setImageUrl(""); // Clear the imageUrl state
        // You can also delete the image reference from Firestore if necessary
        // const imageDocRef = doc(db, "images", imageId);
        // await deleteDoc(imageDocRef);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };



  return (
    <Box
     minH={"100px"}
     position='relative'
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
     maxW={'800px'}
     >


      {!imageUrl && (
        <VStack h={"100px"} justifyContent={"center"} alignItems={"left"}  >
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

      {imageUrl && imageUrl && (
        <>
          <Box 
          position={'relative'}
          display='inline-block'
          zIndex='0'
          >
            <Image src={imageUrl} alt="Uploaded"  htmlHeight='100%' htmlWidth='100%' fit='cover'  />
            {isHovered && (
                  <Button
                    position="absolute"
                    top="5px"
                    right="5px"
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    onClick={handleDeleteImage}
                  >
                    <Icon as={DeleteOutlined} />
                  </Button>
                )}
          </Box>
      </>)}

    </Box>
  );
};

export default ImageUploader;
