import { Box, Icon, Text, Link, Divider, Flex } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AutoFixHighOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";

const TagsFeed = () => {
  return (
    <Box mb='100px'>
      <Flex gap={2} overflowX={"auto"}>
        <Link
          as={NavLink}
          to="hot"
          display={"flex"}
          alignItems={"center"}
          px={6}
          py={4}
          _hover={{ bg: "gray.100", color: "black" }}
          borderBottom={"1px solid #E2E8F0"}
          _activeLink={{ color: "blue", borderBottom: " 1px solid blue" }}
        >
          <Icon as={AutoFixHighOutlined} fontSize={"26px"} />
          <Text pl={1} whiteSpace={"nowrap"}>
            Hot
          </Text>
        </Link>
        <Link
          as={NavLink}
          to="new"
          display={"flex"}
          alignItems={"center"}
          px={6}
          py={4}
          _hover={{ bg: "gray.100", color: "black" }}
          borderBottom={"1px solid #E2E8F0"}
          _activeLink={{ color: "blue", borderBottom: " 1px solid blue" }}
        >
          <Icon as={StarOutlineOutlined} fontSize={"26px"} />
          <Text pl={1}>New</Text>
        </Link>
      </Flex>
      <Divider />

      <Outlet />
    </Box>
  );
};

export default TagsFeed;
