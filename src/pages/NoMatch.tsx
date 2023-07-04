import { Box, Link, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import SEO from '../components/SEO';
// import { useNavigate } from 'react-router-dom';

const NoMatch = () => {
  return (
    <>
      <SEO title="404" description="" name="" type="Post" />
      <Box h='100%'  overflow='un'>
         <VStack mt='auto' >
            <h1>404</h1>
            <Link as={NavLink} href="/">Go Back</Link>
         </VStack>
      </Box>
    </>
  );
};

export default NoMatch;
