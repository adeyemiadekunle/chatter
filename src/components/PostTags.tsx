import { useState, useRef, ChangeEvent, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
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

type PostTagsProps = {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
};

type TagData = {
  id: string;
  name: string;
  image: string;
};

const PostTags: React.FC<PostTagsProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [availableTags, setAvailableTags] = useState<TagData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch the tags from Firestore
    const fetchTags = async () => {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagsData: TagData[] = querySnapshot.docs.map(
        (doc) => doc.data() as TagData
      );
      setAvailableTags(tagsData);
    };

    fetchTags();
  }, []);

  const handleTagSelect = (tag: TagData): void => {
    const tagName = tag.name;
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    }
    setSearchValue("");
    inputRef.current?.focus();
  };

  const handleTagDeselect = (tagName: string): void => {
    setSelectedTags(
      selectedTags.filter((selectedTag) => selectedTag !== tagName)
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  return (
    <VStack
      align="flex-start"
      minH="200px"
      mt="40px"
      mb="50px"
      position="relative"
    >
      <Text fontWeight="600" color="gray.500">
        SELECT TAGS
      </Text>

      <Box style={{ position: "relative" }} w='100%'   >
        <Input
          ref={inputRef}
          placeholder=" Start typing to search..."
          fontSize='14px'
          value={searchValue}
          onChange={handleInputChange}
        />

        {searchValue !== "" && (
          <List
            spacing={2}
            listStyleType="none"
            border={"1px solid gray.50"}
            w={"100%"}
            h={"200px"}
            // overflowY={"scroll"}
            position="absolute"
            zIndex={1}
            bg="white"
            top="100%"
            boxShadow='base' py='3' rounded='md'
          >
            {availableTags
              .filter((tag) =>
                tag.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tag) => (
                <ListItem
                  w={"100%"}
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
                    <Image src={tag.image} boxSize="30px" />
                    <Text>{tag.name}</Text>
                  </HStack>
                </ListItem>
              ))}
          </List>
        )}
      </Box>

      <HStack flexWrap="wrap" gap={4} p={2}  >
        {selectedTags?.map(
          (tag) =>
            tag && (
              <Tag key={tag} size="lg" variant="solid" colorScheme="teal">
                <TagLabel color={"whiteAlpha.900"}>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleTagDeselect(tag)} />
              </Tag>
            )
        )}
      </HStack>
    </VStack>
  );
};

export default PostTags;
