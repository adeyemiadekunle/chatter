import { useState, useEffect } from "react";
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
  LightMode
} from "@chakra-ui/react";
import { BookmarkAddOutlined, FavoriteBorderOutlined, AnalyticsOutlined,  ForumOutlined} from '@mui/icons-material'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { HeaderOutput } from 'editorjs-react-renderer'
import { FormattedDate } from '../utils/FormatDate'
import TextTrimmingWithEllipsis from "../utils/TextTrimming";
import { NavLink } from "react-router-dom";
import { BookMark } from "./Bookmark";
import { auth, db } from "../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";


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
  articleId: string;
};


const ArticleCard = ({displayName, Title, Paragraph, tags, HeaderImage, AvatarImage, PublishDate, username, slug, articleId }: ArticleCardProps ) => {
  const [isBookmarking, setIsBookmarking] = useState(false);
  const maxLength = 150;
  const currentUser = auth.currentUser?.uid;

useEffect(() => {

  if (currentUser !== undefined) {
    const userRef = doc(db, "users", currentUser);
    const unsubscribe = onSnapshot(userRef,(doc) => {
      if (doc.exists()) {
        const { bookmarks } = doc.data();
        setIsBookmarking(bookmarks.includes(articleId));
      }
    });
    return () => {
      unsubscribe();
    };
  }

}, [currentUser, articleId]);




const handleBookmark = async () => {
   if (currentUser !== undefined) {
  
     await BookMark(articleId, isBookmarking, currentUser);
    //  setIsBookmarking(!isBookmarking);
   }
   
  };


  return (
    <Box  m={0} >
      <Box w={{base: '100%', md: '90%'}} p={5}    >
        <Box >
          <HStack spacing={3}>
            <Avatar src={AvatarImage} name={displayName} size={'md'}></Avatar>
            <Box>
              <Link as={NavLink} to={`/${username}`} ><Heading fontSize='base' fontWeight={'700'}>{displayName}</Heading></Link>
              <Flex gap={4}  pt={1} > <Text  fontSize='sm' >{FormattedDate(PublishDate)} </Text> <Text  fontSize='sm'  >10 Min Read</Text> </Flex>
            </Box>
          </HStack>
        </Box>
        <Box> 
          <Link as={NavLink} to={`/${username}/${slug}`} >
          <Heading as='h3' fontSize='md' fontWeight={'700'} cursor='pointer'   >
            <HeaderOutput data={Title} />
          </Heading>
         </Link>
        <Text pt={0}  fontSize='base' >
            <TextTrimmingWithEllipsis text={Paragraph} maxLength={maxLength} /> 
      </Text>
       
        </Box>
        <Link as={NavLink} to={`/${username}/${slug}`} >
          <Box mt={2} pb={2}>
              <Image src={HeaderImage}  h={{base:'170px', md: '200px' }} w={'100%'} borderRadius={'5px'}  boxShadow='xs'  rounded='md'  objectFit='cover' />
          </Box>
        </Link>
        <Box>
               {/* Desktop */}
            <HStack display={{base: 'none', md: 'flex'}}  justifyContent={'space-between'} mt={1}  gap={{base: '10px'}}>
                <HStack>
                     {
                       isBookmarking ?
                       (
                        <Flex w={'40px'} h={'40px'} borderRadius={'60px'} justifyContent={'center'} alignItems={'center'}
                        _hover={{ bg: 'gray.100', cursor: 'pointer', color: 'blue.500' }}
                        onClick={handleBookmark}
                        ><Icon as={BookmarkAddedIcon} fontSize={'28px'}/>
                      </Flex>
                       )
                        :
                        (
                          <Flex w={'40px'} h={'40px'} borderRadius={'60px'} justifyContent={'center'} alignItems={'center'}
                          _hover={{ bg: 'gray.100', cursor: 'pointer', color: 'blue.500' }}
                          onClick={handleBookmark}
                          ><Icon as={BookmarkAddOutlined} fontSize={'28px'}/>
                        </Flex>
                        )
                     }
                    <Flex gap={2}>
                          {tags.map((tag) => (
                            <Link as={NavLink} to={`/t/${tag.hash}`} key={tag.hash}>
                              <Button fontSize='sm' variant="outline" borderRadius="15px" colorScheme="blue" size="sm">
                                {tag.name}
                              </Button>
                            </Link>
                          ))}
                      </Flex>
                </HStack>
                 <LightMode>
                  <HStack >
                      <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                     _hover={{ bg: 'gray.100',  color: 'brand.800', cursor: 'pointer' }}  
                      >
                          <Icon as={FavoriteBorderOutlined}  /> <Text>10</Text>
                      </Flex>
                      <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                     _hover={{ bg: 'gray.100',  color: 'brand.800', cursor: 'pointer' }}    
                      >
                          <Icon as={AnalyticsOutlined}  /> <Text>1</Text>
                      </Flex>
                      <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                      _hover={{ bg: 'gray.100',  color: 'brand.800', cursor: 'pointer' }}     
                      >
                          <Icon as={ForumOutlined} /> <Text>3</Text>
                      </Flex>
                  </HStack>
                 </LightMode>
            </HStack>

            {/* Mobile */}

            <VStack display={{base: 'block', md: 'none'}}      justifyContent={'space-between'} mt={1} wrap={{base: 'wrap', md: 'nowrap' }} gap={{base: '10px'}}>
                <HStack>
                <Flex gap={2} flexShrink='wrap'>
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
                     {
                       isBookmarking ?
                       (
                        <Flex w={'40px'} h={'40px'} borderRadius={'60px'} justifyContent={'center'} alignItems={'center'}
                        _hover={{ bg: 'gray.100', cursor: 'pointer', color: 'blue.500' }}
                        onClick={handleBookmark}
                        ><Icon as={BookmarkAddedIcon} fontSize={'28px'}/>
                      </Flex>
                       )
                        :
                        (
                          <Flex w={'40px'} h={'40px'} borderRadius={'60px'} justifyContent={'center'} alignItems={'center'}
                          _hover={{ bg: 'gray.100', cursor: 'pointer', color: 'blue.500' }}
                          onClick={handleBookmark}
                          ><Icon as={BookmarkAddOutlined} fontSize={'28px'}/>
                        </Flex>
                        )
                     }

                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100',  color: 'brand.800', cursor: 'pointer' }}   
                    >
                        <Icon as={FavoriteBorderOutlined}  /> <Text>10</Text>
                    </Flex>
                     </HStack>

                    <HStack>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                   _hover={{ bg: 'gray.100', color: 'brand.800', cursor: 'pointer' }}       
                    >
                        <Icon as={AnalyticsOutlined}  /> <Text>1</Text>
                    </Flex>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100',  color: 'brand.800', cursor: 'pointer' }}     
                    >
                        <Icon as={ForumOutlined}  /> <Text>3</Text>
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

