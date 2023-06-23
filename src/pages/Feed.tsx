// import useArticleManagement from "../hooks/useArticleManagement";
import UserFeed from "../components/Feed/UserFeed";
import { Box, useColorModeValue, Text } from "@chakra-ui/react";

const Home = () => {
  // const { createDraftArticle } = useArticleManagement();
  const bg = useColorModeValue("white", "#0F172A");
  const color = useColorModeValue("#0F172A", "white");

  return (
    <Box display={{ base: "block", md: "flex" }} >
      {/* Main */}
      <Box flex={{ base: "none", md: "1" }} mt={5} ml={{base: '0', md: '6'}} mr={{base: '0', md: '6'}} minH={"600px"} bg={bg}
        color={color}
        borderRadius={"2px 2px 0 0"}
        className="selected-div"
      >
        <UserFeed />
      </Box>
      {/* RightBar */}
      <Box w={{ base: "none", md: "300px" }} display={{ base: "none", md: "block" }} mt={5} mr={4} h={"100vh"} bg={bg}
        color={color}
        borderRadius={"2px"}
        className="selected-div"
      >
        <Text>RightBar</Text>
      </Box>
    </Box>
  );
};

export default Home;
