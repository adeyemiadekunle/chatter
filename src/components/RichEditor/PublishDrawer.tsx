import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";

import PostTags from "./ArticleTags";
import Slug from "./Slug";
import { Tags } from "../../utils/helperFunctions";



type PublishDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<any>;
  onClick: () => void;
  selectedTags: Tags[];
  setSelectedTags: (tags: Tags[]) => void;
  slug: string;
  content: any;
  setSlug: (slug: string) => void;
};

const PublishDrawer: React.FC<PublishDrawerProps> = ({
  isOpen,
  onClose,
  btnRef,
  onClick,
  selectedTags,
  setSelectedTags,
  slug,
  content,
  setSlug,
}) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <HStack>
              <DrawerCloseButton   fontSize='base' />
              <Button onClick={onClick} colorScheme="blue" fontSize='base'>
                Publish
              </Button>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack>
              <Box w="100%">
                <Slug slug={slug} content={content} setSlug={setSlug} />
              </Box>
              <Box w="100%">
                <PostTags
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PublishDrawer;
