import { Box, Icon, Text, Link, Divider, Flex } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AutoFixHighOutlined,
  PublishOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";

const UserFeed = () => {
  return (
    <Box>
      <Flex gap={2} overflowX={'auto'} >
        <Link
          as={NavLink}
          to="personalize"
          display={"flex"}
          alignItems={"center"}
          px={6}
          py={4}
          _hover={{bg: 'gray.100', color: 'black'}}
          borderBottom={'1px solid #E2E8F0'}
          _activeLink={{color: 'blue', borderBottom: ' 1px solid blue'}}
        >
          <Icon as={AutoFixHighOutlined} fontSize={"26px"} />
          <Text pl={1} whiteSpace={"nowrap"}>
            For you
          </Text>
        </Link>
        <Link
          as={NavLink}
          to="featured"
          display={"flex"}
          alignItems={"center"}
          px={6}
          py={4}
          _hover={{bg: 'gray.100', color: 'black'}}
          borderBottom={'1px solid #E2E8F0'}
          _activeLink={{color: 'blue', borderBottom: ' 1px solid blue'}}
        >
          <Icon as={StarOutlineOutlined} fontSize={"26px"} />
          <Text pl={1}>Featured</Text>
        </Link>
        <Link
          as={NavLink}
          to="recent"
          display={"flex"}
          alignItems={"center"}
          px={6}
          py={4}
          _hover={{bg: 'gray.100', color: 'black'}}
          borderBottom={'1px solid #E2E8F0'}
          _activeLink={{color: 'blue', borderBottom: ' 1px solid blue'}}
        >
          <Icon as={PublishOutlined} fontSize={"28px"} />
          <Text pl={1}>Recent</Text>
        </Link>
      </Flex>
      <Divider />

      <Outlet />
    </Box>
  );
};

export default UserFeed;
