import {Box, VStack, Skeleton} from '@chakra-ui/react';

const SkeletonPage = () => {
  return (
    <>
    <VStack spacing={12} p={4}>
      
        <Skeleton >
          <Box h="300px" w={{ base: "100%", md: "1000px" }} border={'1px solid blue'}   />
        </Skeleton>
      

      <VStack spacing={5}>
        <Skeleton height="30px"  w={{ base: "100%", md: "1000px" }} />
        <Skeleton height="30px"  w={{ base: "100%", md: "1000px" }} />
        <Skeleton height="30px"  w={{ base: "100%", md: "1000px" }} />
        <Skeleton height="30px"  w={{ base: "100%", md: "1000px" }} />
      </VStack>

    </VStack>
    </>
  )
}

export default SkeletonPage