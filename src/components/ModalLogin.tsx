import {Box, VStack, Text, Button, Avatar} from '@chakra-ui/react'

const ModalLogin = () => {
  return (
    <>
      <Box w="100%" px={{base: '0', md: '3'}} >
        <VStack w="100%" spacing={3} mb={3} mt={3}>
          <Avatar size="lg" />
          <Text fontSize="20px" fontWeight="700">
            Sign up or log in to your Chatte account
          </Text>
          <Button
            bg="brand.800"
            color="white"
            fontSize="base"
            w="100%"
            _hover={{ bg: "brand.700" }}
          >
            Sign up
          </Button>
          <Button
            border="1px solid blue"
            bg="white"
            fontSize="base"
            w="100%"
            _hover={{ bg: "gray.100" }}
          >
            Log in
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default ModalLogin;
