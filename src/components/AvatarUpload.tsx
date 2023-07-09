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
import { Box, Stack, Avatar } from "@chakra-ui/react";
import {  DeleteOutlined } from "@mui/icons-material";

interface ImageUploaderProps {
  photoUrl: string;
  setPhotoUrl: (url: string) => void;
}

const AvatarUploader: React.FC<ImageUploaderProps> = ({
  photoUrl,
  setPhotoUrl,
}) => {

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
          await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(storageRef);
          setPhotoUrl(downloadUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    });
  };

  const handleDeleteImage = async (): Promise<void> => {
    if (photoUrl) {
      const storage = getStorage(app);
      const imageRef: StorageReference = ref(storage, photoUrl);

      try {
        await deleteObject(imageRef);
        setPhotoUrl(""); // Clear the imageUrl state
        // You can also delete the image reference from Firestore if necessary
        // const imageDocRef = doc(db, "images", imageId);
        // await deleteDoc(imageDocRef);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  return (
    <Stack position="relative" w='100px' h='100px'  borderRadius='full'>
      {!photoUrl && (
        <Avatar
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          size='2xl'
          onClick={handleImageUpload}
          cursor="pointer"
          loading='lazy'
        >
        </Avatar>
      )}

      {photoUrl && photoUrl && (
        <>
          <Box position={"relative"} display="inline-block" zIndex="0"   w='100px' h='100px' borderRadius='full' >

                <Avatar src={photoUrl}  size='2xl' />
                <Button
                    position="absolute"
                    top="0px"
                    right="-8px"
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    onClick={handleDeleteImage}
                    borderRadius="full"
                    w='30px' h='30px'
                    bg='transparent'
                >
                <Icon as={DeleteOutlined} />
                </Button>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default AvatarUploader;
