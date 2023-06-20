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
  Flex,
  VStack,
  Link,
} from "@chakra-ui/react";
import { BookmarkAddOutlined, FavoriteBorderOutlined, AnalyticsOutlined, BookmarkAddedOutlined, ForumOutlined} from '@mui/icons-material'
import { HeaderOutput } from 'editorjs-react-renderer'
import { FormattedDate } from '../utils/FormatDate'
import TextTrimmingWithEllipsis from "../utils/TextTrimming";
import { NavLink } from "react-router-dom";


 type ArticleCardProps = {
  displayName: string;
  Title: any;
  Paragraph: any;
  tags: { name: string; hash: string }[]
  HeaderImage: string;
  AvatarImage: string;
  PublishDate: string;
  userTagLine: string
  username: string
  slug: string
};


const ArticleCard = ({displayName, Title, Paragraph, tags, HeaderImage, AvatarImage, PublishDate, username, slug,  }: ArticleCardProps ) => {
  const maxLength = 150;

 console.log( '',  tags)


  return (
    <Box  m={0} >
      <Box w={{base: '100%', md: '90%'}} p={5}    >
        <Box >
          <HStack spacing={3}>
            <Avatar src={AvatarImage} size={'md'}></Avatar>
            <Box>
              <Link as={NavLink} to={`/${username}`} ><Heading fontSize={'16px'} fontWeight={'700'}>{displayName}</Heading></Link>
              <Flex gap={4} fontSize={'14px'} pt={1}> <Text>{FormattedDate(PublishDate)} </Text> <Text>10 Min Read</Text> </Flex>
            </Box>
          </HStack>
        </Box>
        <Box> 
          <Link as={NavLink} to={`/${username}/${slug}`} >
          <Heading as='h3' fontSize={'28px'} fontWeight={'700'} cursor='pointer'   >
            <HeaderOutput data={Title} />
          </Heading>
         </Link>
        <Text pt={0}  >
            <TextTrimmingWithEllipsis text={Paragraph} maxLength={maxLength} /> 
      </Text>
       
        </Box>
        <Link as={NavLink} to={`/${username}/${slug}`} >
          <Box mt={2} >
              <Image src={HeaderImage}  h={{base:'170px', md: '200px' }} w={'100%'} borderRadius={'5px'}  boxShadow='xs' p='6' rounded='md'  objectFit='cover' />
          </Box>
        </Link>
        <Box>
               {/* Desktop */}
            <HStack display={{base: 'none', md: 'flex'}}  justifyContent={'space-between'} mt={1}  gap={{base: '10px'}}>
                <HStack>
                    <Flex w={'40px'} h={'40px'} borderRadius={'60px'} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer', color: 'blue.500' }}
                    ><Icon as={BookmarkAddOutlined} color={'gray.700'} fontSize={'28px'}/>
                    </Flex>
                    <Flex gap={2}>
                          {tags.map((tag) => (
                            <Link as={NavLink} to={`/t/${tag.hash}`} key={tag.hash}>
                              <Button variant="outline" borderRadius="15px" colorScheme="blue" size="sm">
                                {tag.name}
                              </Button>
                            </Link>
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

            {/* Mobile */}

            <VStack display={{base: 'block', md: 'none'}}      justifyContent={'space-between'} mt={1} wrap={{base: 'wrap', md: 'nowrap' }} gap={{base: '10px'}}>
                <HStack>
                <Flex gap={2}>
                          {tags.map((tag) => (
                            <Link as={NavLink} to={`/t/${tag.hash}`} key={tag.hash}>
                              <Button variant="outline" borderRadius="15px" colorScheme="blue" size="sm">
                                {tag.name}
                              </Button>
                            </Link>
                          ))}
                      </Flex>
                </HStack>
                <HStack justifyContent='space-between'  >
                     <HStack>
                     <Flex w={'40px'} h={'40px'} borderRadius={'60px'} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer', color: 'blue.500' }}
                    ><Icon as={BookmarkAddOutlined} color={'gray.700'} fontSize={'28px'}/>
                    </Flex>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}     
                    >
                        <Icon as={FavoriteBorderOutlined} color={'gray.700'} /> <Text>10</Text>
                    </Flex>
                     </HStack>

                    <HStack>
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

            </VStack>
        </Box>
      </Box>
        <Divider mb={'auto'} pt={1} />
    </Box>
  );
};

export default ArticleCard;

