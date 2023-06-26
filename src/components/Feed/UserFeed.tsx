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

      <Outlet />
    </Box>
  );
};

export default UserFeed;


{/* <Flex onClick={handleCreateDraft} bg='brand.800'  justifyContent='center' alignItems='center'  w='50px' borderRadius='full'  hideFrom= 'md' position='fixed' zIndex='4' right='4' bottom='20'  h={'50px'} >
                    <Icon color='primary.white' fontSize='xl' as={Add}/>
              </Flex> */}