
// import useArticleManagement from "../hooks/useArticleManagement";
import { UserFeed } from "../components/index";
import { Box, useColorModeValue } from "@chakra-ui/react";



const Home = () => {
  // const { createDraftArticle } = useArticleManagement();
  const bg = useColorModeValue('white', '#0F172A')
  const color = useColorModeValue('#0F172A', 'white')

  
  return (
    <Box  display={'flex'}>
      {/* Main */}     
      <Box flex={1}  mt={5} ml={4} mr={4} minH={'600px'}  bg={bg} color={color} borderRadius={'8px 8px 0 0' } className='selected-div' >
        <UserFeed />
      </Box>
      {/* RightBar */}
      <Box w={'300px'} mt={5}  mr={4} h={'100vh'}  bg={bg} color={color} borderRadius={'8px' } className='selected-div'  >
      </Box>
      
    </Box>
  );
};

export default Home;
