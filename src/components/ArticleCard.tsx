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
  LightMode,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import { BookmarkAddOutlined, FavoriteBorderOutlined, AnalyticsOutlined,  ForumOutlined,} from '@mui/icons-material'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { FormattedDate } from '../utils/FormatDate'
import TextTrimmingWithEllipsis from "../utils/TextTrimming";
import { NavLink } from "react-router-dom";
import { BookMark } from "./Bookmark";
import { auth, db } from "../utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { fetchAuthorData, Author  } from "../utils/helperFunctions";


 type ArticleCardProps = {
  Title: any;
  Paragraph: any;
  tags: { name: string; hash: string }[]
  HeaderImage: string;
  PublishDate: string;
  slug: string
  articleId: string;
  authorId: string;
  isLoading: boolean;
  
};


const ArticleCard = ({ Title, Paragraph, tags, HeaderImage, PublishDate, slug, articleId, authorId,  isLoading }: ArticleCardProps ) => {
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [author, setAuthor] = useState<Author | null>(null);
  const [AuthorLoading, setAuthorLoading] = useState(true);
  
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

// Likes count
useEffect (() => {
   if (currentUser !== undefined) {
    const articleRef = doc(db, "articles", articleId);  
    const unsubscribe = onSnapshot(articleRef,(doc) => {
      if (doc.exists()) {
        const { likes } = doc.data();
        setLikesCount(likes.length);
      }
    });
    return () => {
      unsubscribe();
    };
    }
}, [currentUser, articleId]);


  // View Count
  useEffect(() => {
    if (currentUser !== undefined && articleId !== undefined) {
      const articleRef = doc(db, "articles", articleId);
      const unsubscribe = onSnapshot(articleRef, (doc) => {
        if (doc.exists()) {
          const { views } = doc.data();
          setViewCount(views.length);
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
   }
   
  };

  // fetch Author Data
  useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = await fetchAuthorData(authorId);
      setAuthor(authorData);
      setAuthorLoading(false);
    };

    fetchAuthor();
  }, [authorId]);




  return (
    <Box  m={0} >
      <Box w={{base: '100%', md: '90%'}} p={5}    >
        <Box >
          <HStack spacing={3}>
            <SkeletonCircle size='12' isLoaded={!AuthorLoading} >
               <Avatar src={author?.photoURL} name={author?.displayName} size={'md'}></Avatar>
            </SkeletonCircle>
            <Box>
              <Link as={NavLink} to={`/u/${author?.userName}`} >
                <Skeleton isLoaded={!AuthorLoading} >
                    <Heading fontSize='base' fontWeight={'700'}>{author?.displayName}</Heading>
                </Skeleton>
                </Link>
              <Flex gap={4}  pt={1} >
                 <Skeleton isLoaded={!isLoading} >
                    <Text  fontSize='sm' >{FormattedDate(PublishDate)} </Text> 
                  </Skeleton>
                 <Text  fontSize='sm'  >10 Min Read</Text> </Flex>
            </Box>
          </HStack>
        </Box>
        <Box> 
          <Link as={NavLink} to={`/${author?.userName}/${slug}`} >
            <Skeleton isLoaded={!isLoading} w='70%' >
              <Heading as='h3' fontSize='md' fontWeight={'700'} cursor='pointer' my={2}   >
                {Title}
              </Heading>
          </Skeleton>
         </Link>
         <SkeletonText isLoaded={!isLoading} noOfLines={3} skeletonHeight='4'  >
            <Text pt={0}  fontSize={{base: 'sm', md: 'base'}} >
                <TextTrimmingWithEllipsis text={Paragraph} maxLength={maxLength} /> 
            </Text>
          </SkeletonText>
       
        </Box>
        <Link as={NavLink} to={`/${author?.userName}/${slug}`} >
          <Box mt={2} pb={2}>
            <Skeleton isLoaded={!isLoading} >
              <Image src={HeaderImage}  h={{base:'170px', md: '200px' }} w={'100%'} borderRadius={'5px'}  boxShadow='xs'  rounded='md'  objectFit='cover' />
            </Skeleton>
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
                        ><Icon as={BookmarkAddedIcon} color='brand.800' fontSize={'28px'}/>
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
                  <Flex gap={2} flexShrink='wrap'>
                        {tags.slice(0, 2).map((tag) => (
                          <Link as={NavLink} to={`/t/${tag.hash}`} key={tag.hash}>
                            <Skeleton isLoaded={!isLoading} borderRadius="15px"  >
                              <Button variant="outline" borderRadius="15px" color='brand.800' size="sm">
                                {tag.name}
                              </Button>
                            </Skeleton>

                          </Link>
                        ))}
                        {tags.length > 2 && (
                          <Button variant="outline" borderRadius="15px" color='brand.800' size="sm">
                            + {tags.length - 2} more
                          </Button>
                        )}  
                </Flex>
                </HStack>
                 <LightMode>
                  <HStack >    
                    <Link as={NavLink} to={`/${author?.userName}/${slug}`} >
                      <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                          _hover={{ bg: 'gray.100',  color: 'brand.800', cursor: 'pointer' }}     
                         
                          >
                              <Icon as={FavoriteBorderOutlined}  /> <Text>{likesCount}</Text>
                          </Flex>
                    </Link>
                      <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                     _hover={{ bg: 'gray.100',  color: 'brand.800', cursor: 'pointer' }}    
                      >
                          <Icon as={AnalyticsOutlined}  /> <Text>{viewCount} </Text>
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

            <VStack display={{base: 'block', md: 'none'}} justifyContent={'space-between'} mt={1} wrap={{base: 'wrap', md: 'nowrap' }} gap={{base: '10px'}}>
                <HStack>
                <Flex gap={2} flexShrink='wrap'>
                  {tags.slice(0, 2).map((tag) => (
                    <Link as={NavLink} to={`/t/${tag.hash}`} key={tag.hash}>
                      <Button variant="outline" borderRadius="15px" color='brand.800' size="sm">
                        {tag.name}
                      </Button>
                    </Link>
                  ))}
                  {tags.length > 2 && (
                    <Button variant="outline" borderRadius="15px" color='brand.800' size="sm">
                      + {tags.length - 2} more
                    </Button>
                  )}
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
                        ><Icon as={BookmarkAddedIcon} color='brand.800'  fontSize={'28px'}/>
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
                        <Link as={NavLink} to={`/${author?.userName}/${slug}`}  >
                          <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                            _hover={{ bg: 'gray.100',  color: 'brand.800', cursor: 'pointer' }}     
                            >
                                <Icon as={FavoriteBorderOutlined}  /> <Text>{likesCount}</Text>
                            </Flex>
                        </Link> 
                     </HStack>

                    <HStack>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                   _hover={{ bg: 'gray.100', color: 'brand.800', cursor: 'pointer' }}       
                    >
                        <Icon as={AnalyticsOutlined}  /> <Text> {viewCount} </Text>
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

