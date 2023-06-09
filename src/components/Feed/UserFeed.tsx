import { Box, Icon, Text, Link, Divider, Flex } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AutoFixHighOutlined,
  PublishOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";
import ToogleBtn from "../ToogleBtn";

type UserFeedProps = {
  onOpen: () => void;
};

const UserFeed = ({onOpen}:UserFeedProps) => {
  return (
    <Box  mb={'100px'}>
      <Flex gap={1} overflowX={'auto'} justifyContent={{base: 'space-between', md: 'flex-start'}}  >
        <Link
          as={NavLink}
          to="personalize"
          display={"flex"}
          alignItems={"center"}
          px={4}
          py={4}
          _hover={{bg: 'gray.100', color: 'black'}}
          borderBottom={'1px solid #E2E8F0'}
          _activeLink={{color: 'brand.800', borderBottom: ' 1px solid #0057C2'}}
        >
          <Icon as={AutoFixHighOutlined} fontSize='md' />
          <Text pl={1} whiteSpace={"nowrap"}>
            For you
          </Text>
        </Link>
        <Link
          as={NavLink}
          to="featured"
          display={"flex"}
          alignItems={"center"}
          px={4}
          py={4}
          _hover={{bg: 'gray.100', color: 'black'}}
          borderBottom={'1px solid #E2E8F0'}
          _activeLink={{color: 'brand.800', borderBottom: ' 1px solid #0057C2'}}
        >
          <Icon as={StarOutlineOutlined} fontSize='md' />
          <Text pl={1}>Featured</Text>
        </Link>
        <Link
          as={NavLink}
          to="recent"
          display={"flex"}
          alignItems={"center"}
          px={4}
          py={4}
          _hover={{bg: 'gray.100', color: 'black'}}
          borderBottom={'1px solid #E2E8F0'}
          _activeLink={{color: 'brand.800', borderBottom: ' 1px solid #0057C2'}}
        >
          <Icon as={PublishOutlined} fontSize='md' />
          <Text pl={1}>Recent</Text>
        </Link>
      </Flex>
      <Divider />
         {/* Rightbar Toogle */}
          <ToogleBtn Toogle={onOpen} />
      <Outlet />
    </Box>
  );
};

export default UserFeed;

