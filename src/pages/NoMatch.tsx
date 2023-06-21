import { Box, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const NoMatch = () => {
  return (
    <>
      <Box>
        <h1>404</h1>
        <Link as={NavLink} href="/feed/personalize">Go Back</Link>
      </Box>
    </>
  );
};

export default NoMatch;
