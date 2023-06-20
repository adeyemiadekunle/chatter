import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const GeneralLayout = () => {
  return (
    <Box minH={"100vh"}>
      <Box>
        <Header />
      </Box>
      <Box flex={{ base: "none", md: "1" }} overflow="auto">
        <Outlet />
      </Box>
    </Box>
  );
};

export default GeneralLayout;
