import EditorComponent from "../../components/RichEditor/new";
import {
  Box,
  Flex,
  useDisclosure,
  Text,
  CloseButton,
  Link,
  IconButton,
  Divider
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";


const NewArticle = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex minH={"100vh"}>
        
        <Box
          w={{ base: isOpen ? '100%': '0' , md: isOpen ? "300px" : '0'  }}
          position="fixed"
          overflow="hidden"
          h={"100vh"}
          border={{base:'none', md: ' 1px solid grey' }}
       
        >
          <Box mb={4} >
          <CloseButton hideFrom='md' size='lg' onClick={onToggle} ml={'auto'}/>
          </Box>
          <Box  mb={3}>
            <Link as={NavLink} to='/feed/personalize' px={3} >
              <IconButton
                aria-label="Go Back"
                icon={<ArrowBackOutlined />}
                size="lg"
              />
            </Link>
            <Divider mt={3}/>
          </Box>
          <Box px={3} py={2}>
            <Text fontSize={'18px'} fontWeight={600} >New Article</Text>
          </Box>
          
            
        </Box>

        <Box
          flex={isOpen ? 1 : "none"}
          ml={isOpen ? "300px" : "0"}
          w={"100%"}
          overflowY="auto"
          display={{base: isOpen ? 'none': 'block', md: 'block'}}
        >
          <EditorComponent IsOpen={isOpen} onToggle={onToggle} />
        </Box>
      </Flex>
    </>
  );
};

export default NewArticle;
