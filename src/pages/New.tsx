import Draft from "../components/RichEditor/Draft";
import {
  Box,
  Flex,
  useDisclosure,
  CloseButton,
  Link,
  IconButton,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import DraftSideBar from '../components/DraftSideBar'
import SEO from "../components/SEO";




const NewArticle = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <SEO title="New Post" description="" name='' type="Post" />
      <Flex minH={"100vh"}>
        <Box
          w={{ base:  isOpen ? '100%' : '0' , md: isOpen ? '300px' : '0' }}
          position="fixed"
          overflow="hidden"
          h='100%'
          // h={{ base: isOpen ? '100%' : '0' , md: '100%' }}
          border={{ base: 'none', md: '1px solid grey' }}
          >
            <Box px={3} py={3}>      
                <HStack  justifyContent='space-between' >
                      <Box >
                        <Link as={NavLink} to='/' px={3} >
                          <IconButton
                            aria-label="Go Back"
                            icon={<ArrowBackOutlined />}
                            size="lg"
                            color='blue'
                          />
                        </Link>
                      </Box>
                      <Box >
                          <CloseButton hideFrom='md' size='lg' color='blue' onClick={onToggle} ml={'auto'}/>
                      </Box> 
                </HStack>
                  <Divider mt={3}/>
            </Box>

            <Box px={3} py={2}>
               <DraftSideBar/>
            </Box>

          </Box>

          <Box
            flex={isOpen ? 1 : "none"}
            ml={isOpen ? "300px" : "0"}
            w={"100%"}
            overflowY="auto"
            display={{base: isOpen ? 'none': 'block', md: 'block'}} 
          >
            <Draft  onToggle={onToggle} /> 
            {/* <New onToggle={onToggle} /> */}
              {/* Draft */}
          </Box>
      </Flex>
    </>
  );
};

export default NewArticle;
