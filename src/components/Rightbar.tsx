import {useState, useEffect} from 'react'
import { HStack, Text, Divider, Link, Stack, Skeleton, Box } from "@chakra-ui/react";
import { Container } from "./ArticleContainer";
import TrendingTags from './Tags/RightBar/TrendingTags'
import {NavLink} from 'react-router-dom'
 import { fetchBookmarkData, RecentArticles, fetchAuthorData, Author  } from "../utils/helperFunctions";
 import { auth } from '../utils/firebase';



 export const BookmarkCard = ({heading, authorId, slug}) => {
  const [author, setAuthor] = useState<Author | null>(null)
  const [authorLoading, setAuthorLoading] = useState(true)



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
      <>
        <Box>
           <Link as={NavLink} to={`/${author?.userName}/${slug}`}  >
            <Text fontSize='base' fontWeight='700' >
              {heading}
            </Text>
           </Link>
          <HStack mt={4}>
            <Skeleton isLoaded={!authorLoading} >
              <Link  as={NavLink} to={`/${author?.userName}`} >
                 <Text color="gray.500" >{author?.displayName}</Text>
              </Link>
            </Skeleton>
               <Text></Text>
            <Text color="gray.500" >10 Min Read</Text>
          </HStack>
        </Box>
      </>
    )
  }


const Rightbar = () => {
  const [bookmarks, setBookmarks] = useState<RecentArticles[]>([]);
  const currentUser = auth.currentUser?.uid;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchBookmarks = async () => {
      const bookmarkData = await fetchBookmarkData({ currentUser });
      setBookmarks(bookmarkData || []);
      setIsLoading(false);
    };

    fetchBookmarks();
  }, []);

  console.log( "bookmarks",  bookmarks, "isLoading", isLoading)

  return (
    <>
     <Stack spacing={10} >
          <Container height={"300px"}  display='block'>
               <HStack justifyContent='space-between' py={3} px={2}>
                  <Text fontWeight='600'>Trending Tags</Text> <Link as={NavLink} ><Text>See all</Text></Link>
              </HStack>
                <Divider></Divider>
                <TrendingTags />
          </Container>

          <Container height={"100px"} display='block'>
               <HStack justifyContent='space-between' py={3} px={2}>
                  <Text fontWeight='600'>BookMarks</Text> <Link as={NavLink} ><Text>See all</Text></Link>
              </HStack>
                <Divider></Divider>
                <Box py={4} px={3}>
                  {isLoading ? (
                    <Stack spacing={4}>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                  ) : (
                    <Stack spacing={4}>
                      {bookmarks.map((article) => (
                        <Box key={article.id}>
                          <BookmarkCard heading={article.heading} authorId={article.authorId} slug={article.slug}  />
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Box>
          </Container>
      
        </Stack>
    </>
  )
}

export default Rightbar