
import UserFeed from "./UserFeed";
import { Box, Image} from "@chakra-ui/react";
import { Container } from "../ArticleContainer";
import Banner from "../../assets/Banner.png";
// import { userAuth } from "../../context/Firebase";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'

import Rightbar from "../Rightbar";


const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const {isAuth} = userAuth()

  return (
    <Box
        display={{ base: "block", md: "flex" }}
        maxW={{ base: "100%,", md: "1100px" }}
        m="0 auto"
        gap={8}
        mt={5}
        ml={[0, 8]}
      >
        {/* Main */}
        <Box flex={{ base: "none", md: "1" }}>
          <Box mb={8}>
            <Container height={"200px"} display={"block"}   >
              <Image src={Banner} h='200px' w='100%' objectFit='cover' borderRadius='5px' alt="banner" />
            </Container>
          </Box>
          <Box>
            <Container height={"600px"} display={"block"}>
              <UserFeed onOpen={onOpen} />
            </Container>
          </Box>
        </Box>

        {/* RightBar Desktop */}
         <Box w='300px' hideBelow='md'>
          <Rightbar />  
         </Box>

        {/* Mobile */}
        <Box hideFrom='md'>
          <Drawer isOpen={isOpen}
           size={'full'}
            placement='right'
             onClose={onClose}
             >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton borderStyle='none' fontSize='md' mr={2} />
              <DrawerBody>
                <Box mt={'60px'}>
                   <Rightbar />
                </Box>
              </DrawerBody>
              </DrawerContent>
          </Drawer>
        </Box>

      </Box>
  );
};

export default Home;
