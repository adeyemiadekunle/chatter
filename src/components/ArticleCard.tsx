import {
  Box,
  Button,
  HStack,
  Divider,
  Icon,
  Text,
  Avatar,
  Image,
  Heading,
  Flex
} from "@chakra-ui/react";
import { BookmarkAddOutlined, FavoriteBorderOutlined, AnalyticsOutlined,BookmarkAddedOutlined, ForumOutlined} from '@mui/icons-material'

import Join_Now from '../assets/join_now.jpg'
import AvatarImage from '../assets/getstarted1.png'

const ArticleCard = () => {
  return (
    <Box  m={0}>
      <Box w={'90%'} p={5}>
        <Box>
          <HStack spacing={3}>
            <Avatar src={AvatarImage} size={'lg'}></Avatar>
            <Box>
              <Heading fontSize={'16px'} fontWeight={'700'}> Grace Ikpang</Heading>
              <Flex gap={2} fontSize={'14px'} pt={2}><Text>Product Designer</Text>  <Text>May 25th, 2023</Text></Flex>
            </Box>
          </HStack>
        </Box>
        <Box> 
        <Heading as='h3' fontSize={'24px'} fontWeight={'700'} pt={2}  pb={2}>Starting out as a Product Designer</Heading>
        <Text>10 Min Read</Text>
        <Text pt={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          consequatur! Sunt dolorem cupiditate obcaecati ipsam sit neque
          officia. Amet,  ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          consequatur! Sunt dolorem cupiditate obcaecati ipsam sit neque.
        </Text>
        </Box>
        <Box mt={2}>
            <Image src={Join_Now} h={'250px'} w={'100%'} borderRadius={'5px'}  >
            </Image>
        </Box>
        <Box>
            <HStack justifyContent={'space-between'} mt={1}>
                <HStack>
                    <Flex w={'40px'} h={'40px'} borderRadius={'60px'} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer', color: 'blue.500' }}
                    ><Icon as={BookmarkAddOutlined} color={'gray.700'} fontSize={'28px'}/>
                    </Flex>
                    <Flex gap={2}>
                       <Button variant='outline' size='sm' fontSize={'14px'} color='gray.600' >JavaScript</Button>
                       <Button variant='outline' size='sm' fontSize={'14px'} color='gray.600' >CSS</Button>
                    </Flex>
                </HStack>
                <HStack>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}     
                    >
                        <Icon as={FavoriteBorderOutlined} color={'gray.700'} /> <Text>10</Text>
                    </Flex>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}     
                    >
                        <Icon as={AnalyticsOutlined} color={'gray.700'} /> <Text>1</Text>
                    </Flex>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}     
                    >
                        <Icon as={ForumOutlined} color={'gray.700'} /> <Text>3</Text>
                    </Flex>
                </HStack>
            </HStack>
        </Box>
      </Box>
        <Divider mb={'auto'} pt={7} />
    </Box>
  );
};

export default ArticleCard;
