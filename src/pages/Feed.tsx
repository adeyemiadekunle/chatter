// import useArticleManagement from "../hooks/useArticleManagement";
import UserFeed from "../components/UserFeed";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Home = () => {
  // const { createDraftArticle } = useArticleManagement();
  const bg = useColorModeValue("white", "#0F172A");
  const color = useColorModeValue("#0F172A", "white");

  return (
    <Box display={{ base: "block", md: "flex" }}>
      {/* Main */}
      <Box
        flex={{ base: "none", md: "1" }}
        mt={5}
        ml={{base: '0', md: '4'}}
        mr={{base: '0', md: '4'}}
        minH={"600px"}
        bg={bg}
        color={color}
        borderRadius={"8px 8px 0 0"}
        className="selected-div"
      >
        <UserFeed />
      </Box>
      {/* RightBar */}
      <Box
        w={{ base: "none", md: "300px" }}
        display={{ base: "none", md: "block" }}
        mt={5}
        mr={4}
        h={"100vh"}
        bg={bg}
        color={color}
        borderRadius={"8px"}
        className="selected-div"
      ></Box>
    </Box>
  );
};

export default Home;
