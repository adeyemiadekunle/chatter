import {
  Box,
  Skeleton,
  SkeletonText,
  HStack,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <>
      <Box w={{ base: "100%", md: "90%" }} p={5}>
        <Box mb={3}>
          <HStack spacing={3}>
            <SkeletonCircle size="12" />
            <Stack w='50%' spacing={3}>
              <SkeletonText noOfLines={1} spacing="4" w='50%' skeletonHeight='4'  />
              <SkeletonText noOfLines={1} spacing="4" w='40%' skeletonHeight='3' />
            </Stack>
          </HStack>
        </Box>

        <Stack spacing={3}>
          <SkeletonText noOfLines={1} skeletonHeight='6' w='50%' />
          <SkeletonText noOfLines={3} spacing={2} skeletonHeight='3' w='90%'  />
        </Stack>

        <Box mt={3}>
          <Skeleton h={{ base: "170px", md: "200px" }} w={"100%"} />
        </Box>

        <Box mt={2}>
          <SkeletonText noOfLines={1} skeletonHeight='3'  />
        </Box>
      </Box>
    </>
  );
};

export default SkeletonCard;
