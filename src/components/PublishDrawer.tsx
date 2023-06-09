import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button
  } from '@chakra-ui/react'

  import PostTags from './PostTags';
  
  type PublishDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    btnRef: React.MutableRefObject<any>;
    onClick: () => void;
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
  };
  
  const PublishDrawer: React.FC<PublishDrawerProps> = ({
    isOpen,
    onClose,
    btnRef,
    onClick,
    selectedTags,
    setSelectedTags
  }) => {
    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
          size={'md'}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Publish your Article</DrawerHeader>
            <DrawerBody>
              <PostTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={onClick} colorScheme='blue'>Publish</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  
  // PublishDrawer.propTypes = {
  //   isOpen: PropTypes.bool.isRequired,
  //   onClose: PropTypes.func.isRequired,
  //   btnRef: PropTypes.object.isRequired,
  //   onClick: PropTypes.func.isRequired,
  //   selectedTags: PropTypes.array.isRequired,
  //   setSelectedTags: PropTypes.func.isRequired,
  // }
  
  export default PublishDrawer;
  