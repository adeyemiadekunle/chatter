import {Box, VStack, Skeleton} from '@chakra-ui/react';

const SkeletonPage = () => {
  return (
    <>
    <VStack spacing={8} p={4} >
      
          <Box h="300px" w={{ base: "100%", md: "1000px" }} >
            <Skeleton height="100%" />
          </Box>

          <Box h="30px" w={{ base: "100%", md: "1000px" }} ><Skeleton height="100%" /></Box>
          <Box h="30px" w={{ base: "100%", md: "1000px" }} ><Skeleton height="100%" /></Box>
          <Box h="30px" w={{ base: "100%", md: "1000px" }} ><Skeleton height="100%" /></Box>
          <Box h="30px" w={{ base: "100%", md: "1000px" }} ><Skeleton height="100%" /></Box>
  
    </VStack>
    </>
  )
}

export default SkeletonPage