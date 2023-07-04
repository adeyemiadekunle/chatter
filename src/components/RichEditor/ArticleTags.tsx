import { useState, useRef, ChangeEvent, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import {
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  VStack,
  HStack,
  List,
  ListItem,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import { Tags } from "../../utils/helperFunctions";
import placeholder from '../../assets/placeholder.avif'


type PostTagsProps = {
  selectedTags: Tags[];
  setSelectedTags: (tags: Tags[]) => void;
};



const PostTags: React.FC<PostTagsProps> = ({
  selectedTags,
  setSelectedTags,
}: PostTagsProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [availableTags, setAvailableTags] = useState<Tags[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch the tags from Firestore
    const fetchTags = async () => {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagsData: Tags[] = querySnapshot.docs.map(
        (doc) => doc.data() as Tags
      );
      setAvailableTags(tagsData);
    };

    fetchTags();
  }, []);

  const handleTagSelect = (tag: Tags): void => {
    if (!selectedTags.some((selectedTag) => selectedTag.hash === tag.hash)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchValue("");
    inputRef.current?.focus();
  };

  const handleTagDeselect = (hash: string): void => {
    const index = selectedTags.findIndex((tag) => tag.hash === hash);
    if (index !== -1) {
      const newTags = [...selectedTags];
      newTags.splice(index, 1);
      setSelectedTags(newTags);
    }
  };
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  console.log(selectedTags);

  return (
    <VStack align="flex-start" minH="200px" mt="40px" mb="50px" position="relative">
      <Text fontWeight="600" color="gray.500">
        SELECT TAGS
      </Text>

      <Box style={{ position: "relative" }} w="100%">
        <Input
          ref={inputRef}
          placeholder="Start typing to search..."
          fontSize="14px"
          value={searchValue}
          onChange={handleInputChange}
        />

        {searchValue !== "" && (
          <List
            spacing={2}
            listStyleType="none"
            border="1px solid gray.50"
            w="100%"
            minH="200px"
            position="absolute"
            zIndex={1}
            bg="white"
            top="100%"
            boxShadow="base"
            py="3"
            rounded="md"
          >
            {availableTags
              .filter((tag) =>
                tag.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tag) => (
                <ListItem
                  w="100%"
                  p={3}
                  key={tag.id}
                  _hover={{
                    backgroundColor: "gray.50",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTagSelect(tag)}
                >
                  <HStack>
                   {tag.image ?  <Image src={tag.image} boxSize="30px" /> : <Image src ={placeholder} boxSize="30px" />}
                    <Text>{tag.name}</Text>
                  </HStack>
                </ListItem>
              ))}
          </List>
        )}
      </Box>

      <HStack flexWrap="wrap" gap={4} p={2}>
        {selectedTags.map((tag) => (
          <Tag key={tag.id} size="lg" variant="solid" colorScheme="teal">
            <TagLabel fontSize='base' display='flex' alignItems='center' color="whiteAlpha.900"><Image boxSize='20px' mr={2} src={tag.image}/> {tag.name}</TagLabel>
            <TagCloseButton onClick={() => handleTagDeselect(tag.hash)} />
          </Tag>
        ))}
      </HStack>
    </VStack>
  );
};

export default PostTags;
