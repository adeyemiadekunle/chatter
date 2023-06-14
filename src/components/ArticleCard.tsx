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
import { BookmarkAddOutlined, FavoriteBorderOutlined, AnalyticsOutlined, BookmarkAddedOutlined, ForumOutlined} from '@mui/icons-material'
import { HeaderOutput, ParagraphOutput } from 'editorjs-react-renderer'
import { FormattedDate } from '../utils/FormatDate'

 type ArticleCardProps = {
  displayName: string;
  Title: any;
  Paragraph: any;
  tags: string[];
  HeaderImage: string;
  AvatarImage: string;
  PublishDate: string;
  userTagLine: string
};


const ArticleCard = ({displayName, Title, Paragraph, tags, HeaderImage, AvatarImage, PublishDate, userTagLine}: ArticleCardProps ) => {

  return (
    <Box  m={0}  >
      <Box w={{base: '100%', md: '90%'}} p={5}>
        <Box>
          <HStack spacing={3}>
            <Avatar src={AvatarImage} size={'lg'}></Avatar>
            <Box>
              <Heading fontSize={'16px'} fontWeight={'700'}>{displayName}</Heading>
              <Flex gap={2} fontSize={'14px'} pt={2}><Text>{userTagLine}</Text> <Text>{FormattedDate(PublishDate)} </Text></Flex>
            </Box>
          </HStack>
        </Box>
        <Box> 
        <Heading as='h3' fontSize={'28px'} fontWeight={'700'} pt={2}  pb={2}>
          <HeaderOutput data={Title} />
        </Heading>
        <Text>10 Min Read</Text>
        <Text pt={2}>
          <ParagraphOutput data={Paragraph} />
        </Text>
        </Box>
        <Box mt={2}>
            <Image src={HeaderImage}  h={{base:'150px', md: '200px' }} w={'100%'} borderRadius={'5px'}  objectFit='cover' >
            </Image>
        </Box>
        <Box>
            <HStack justifyContent={'space-between'} mt={1} wrap={{base: 'wrap-reverse', md: 'nowrap' }} gap={{base: '10px'}}>
                <HStack>
                    <Flex w={'40px'} h={'40px'} borderRadius={'60px'} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer', color: 'blue.500' }}
                    ><Icon as={BookmarkAddOutlined} color={'gray.700'} fontSize={'28px'}/>
                    </Flex>
                    <Flex gap={2}>
                       {tags.map((tag: string) => (
                           <Button key={tag} variant={'outline'} borderRadius={'15px'} colorScheme={'blue'} size={'sm'}>{tag}</Button>
                        ))}
                    </Flex>
                </HStack>
                <HStack >
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
        <Divider mb={'auto'} pt={1} />
    </Box>
  );
};

export default ArticleCard;
