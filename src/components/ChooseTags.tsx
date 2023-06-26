import PostTags from "./RichEditor/ArticleTags";
import { Box, VStack, Text, Heading } from "@chakra-ui/react";

type TagData = {
  id: string;
  name: string;
  image: string;
  hash : string; 
};

type ChooseTagsProps = {
  selectedTags: TagData[];
  setSelectedTags: (tags: TagData[]) => void;
};



const ChooseTags = ({ selectedTags, setSelectedTags }: ChooseTagsProps) => {
  return (
    <>
     <Box minH='50vh'>
     <VStack w='100%'>
        <Box>
          <Heading mt={10} mb={3} as="h4" fontSize="24px" >Choose your tags</Heading>
          <Text mb={10}>We use tags to personalize your feed and make it easier for you to discover new  and relevant content.</Text>
        </Box>

        <Box w='100%'  >
          <PostTags
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </Box>
      </VStack>
     </Box>
    </>
  );
};

export default ChooseTags;
