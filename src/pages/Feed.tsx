// import useArticleManagement from "../hooks/useArticleManagement";
import UserFeed from "../components/Feed/UserFeed";
import { Box, } from "@chakra-ui/react";
import { Container } from "../components/ArticleContainer";

const Home = () => {


  return (
    <Box
        display={{ base: "block", md: "flex" }}
        maxW={{ base: "100%,", md: "1100px" }}
        m="0 auto"
        gap={8}
        mt={5}
        ml={[0, 8]}
      >
        {/* Main */}
        <Box flex={{ base: "none", md: "1" }}>
          <Box mb={8}>
            <Container height={"200px"} display={"block"}>
            </Container>
          </Box>
          <Box>
            <Container height={"600px"} display={"block"}>
              <UserFeed />
            </Container>
          </Box>
        </Box>

        {/* RightBar */}
        <Box w={{ base: "none", md: "300px" }}>
          <Container height={"300px"} display={{ base: "none", md: "block" }}>
            <h2>Hello</h2>
          </Container>
        </Box>
      </Box>
  );
};

export default Home;
