import React, { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, app } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

import {
  Input,
  Button,
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";

const AddTagForm: React.FC = () => {
  const [tagName, setTagName] = useState<string>("");
  const [tagImage, setTagImage] = useState<File | null>(null);
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if a tag image is selected
    if (!tagImage) {
      console.error("Please select a tag image");
      return;
    }
       const storage = getStorage(app);
    // Upload the tag image to Firebase Storage
    const storageRef = ref(storage, `tag_images/${tagImage.name}`);
    try {
      await uploadBytes(storageRef, tagImage);
      console.log("Tag image uploaded successfully");

      // Get the download URL of the uploaded image from Firebase Storage
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image download URL:", downloadURL);

      // Create the tag document in Firestore
      try {
        const tagData = {
          name: tagName,
          image: downloadURL,
          followers: [],
        };

        const docRef = await addDoc(collection(db, "tags"), tagData);
        console.log("Tag added with ID: ", docRef.id);

        // Reset the form
        setTagName("");
        setTagImage(null);
      } catch (error) {
        console.error("Error adding tag: ", error);
      }
    } catch (error) {
      console.error("Error uploading tag image: ", error);
    }
  };

  const handleTagNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  const handleTagImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTagImage(e.target.files[0]);
    }
  };

  return (
    <>
      <VStack mt={"200px"}>
        <Box maxW={"600px"}>
          <Heading as="h1" size="lg" mb={6}>
            Add a Tag
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Tag Name</FormLabel>
              <Input
                type="text"
                value={tagName}
                onChange={handleTagNameChange}
                required
                mb={2}
              />
             
              <FormLabel>Tag Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleTagImageChange}
                required
              />
              <HStack justifyContent="center" mt={5}>
                <Button type="submit" width="100%">
                  Add Tag
                </Button>
              </HStack>
            </FormControl>
          </form>
        </Box>
      </VStack>
    </>
  );
};

export default AddTagForm;
