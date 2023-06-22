import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  fetchArticle,
  Article,
  fetchAuthorData,
  Author,
} from "../utils/helperFunctions";
import Output from "editorjs-react-renderer";
import { HeaderOutput } from "editorjs-react-renderer";
import {
  VStack, Box, HStack, Image, Tag, TagLabel, Heading, Avatar, Text,  Flex, Link, Divider, Icon, 
  LightMode, 
} from "@chakra-ui/react";
import { styles } from "../components/ArticleStyle";
import { FormattedDate } from "../utils/FormatDate";
import { BookmarkAddOutlined, FavoriteBorderOutlined, AnalyticsOutlined, BookmarkAddedOutlined, ForumOutlined, ShareOutlined} from '@mui/icons-material'
import  AuthorArticles  from "../components/Author/AuthorsArticle";  
import ArticleHeading from "../components/ArticleHeading";
import { followAuthor } from "../components/FollowingAuthor";
import {auth } from '../utils/firebase'
import StickyMenu from "../utils/StickyMenu";


const ArticleDetails = () => {
  const [contents, setContents] = useState<Article["content"]>({ blocks: [] });
  const [authorsData, setAuthorsData] = useState({} as Author);
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const { slug } = useParams<{ slug: string }>();
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    const getArticle = async () => {
      const article = await fetchArticle(slug ?? "");
      if (article) {
        const { content, headerImage, tags, authorId, publishAt } = article;
        setContents(content);
        setImageUrl(headerImage);
        setSelectedTags(tags);
        setAuthor(authorId);
        setPublishDate(publishAt);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getArticle();
  }, [slug]);

  useEffect(() => {
    const fetchAuthor = async (authorId: string) => {
      const data = await fetchAuthorData(authorId);
      if (data !== null) {
        const { followers } = data;
        setAuthorsData(data);
        if (currentUser !== undefined) {
          setIsFollowing(followers.includes(currentUser));
        }
      }
    };

    fetchAuthor(author);
  }, [contents, currentUser]);

  
  const handleFollow = async () => {
    setIsFollowing(!isFollowing); // Toggle the value of isFollowing
    if (currentUser !== undefined) {
      await followAuthor(author, isFollowing, currentUser); // Pass the updated value to followAuthor
    }
  };
  

  const ArticleHeaderLevel1 = (blocks: any) => {
    return blocks.find(
      (block: any) => block.type === "header" && block.data.level === 1
    );
  };

  const headerBlocksArticle = ArticleHeaderLevel1(
    contents.blocks.length > 0 ? contents?.blocks : []
  );

  return (
    <Box  position='relative' >  
      <Box>
        <ArticleHeading></ArticleHeading>
      </Box>  
      <Box maxW={{ base: "100%", md: "1000px" }} m="0 auto"  >
        <VStack>
          <HStack  >
            <Box  w={{base: '100%', md: '90%' }} m='0 auto'  >
              <Heading fontSize={{base: '34px', md: '48px'}} textAlign="center" mt={12} >
                <HeaderOutput data={headerBlocksArticle?.data} />
              </Heading>
            </Box>
          </HStack>
          <VStack
            minH="100px"
            w="100%"
            justifyContent="center"
            spacing={4}
            py={{base: '2', md: '4'}}
          >
              <Flex alignItems='center' gap={3}   > 
               <Flex gap={2} alignItems='center'  >
                  <Box  pb={{base: '3', md: '0'}}>
                        <Avatar
                          size="lg"
                          src={authorsData.photoURL}
                          name={authorsData.displayName}
                        />
                  </Box>
                  <VStack fontSize='14px' alignItems='flex-start' >
                    <HStack>
                      <Text fontWeight="600">{authorsData.displayName}</Text>
                      <Text>·</Text>
                        {isFollowing ? (
                          <Text color="blue.500" onClick={handleFollow} cursor='pointer' >
                            Following
                          </Text>
                        ) : (
                          <Text color="blue.500" onClick={handleFollow} cursor='pointer'>
                            Follow
                          </Text>
                        )
                        }
                    </HStack>
                    <HStack>
                         <Text>10 min Read</Text>
                         <Text>·</Text>
                        <Text>{FormattedDate(publishDate)} </Text>
                        
                    </HStack>
                  </VStack>
                </Flex>
              </Flex>
           
          </VStack>
          <Box w='100%'>
            <Image src={imageUrl} h={{base: '100%', md: '500px' }} w='100%' objectFit='cover'  />
          </Box>

          <Box px={{base: '4', md: '0'}}  maxW={{ base: "100%", md: "800px" }} m="0 auto"   >
            <Output data={contents} style={styles} />

            <VStack mt={'60px'} w='100%' mb={'60px'}>

              {/*   */}
            <StickyMenu >
              <LightMode>
              <HStack borderRadius='10px' px={3} py={2}  bg='brand.600' borderColor='brand.600'  color='primary.white'  >
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                     _hover={{ bg: 'gray.100', color: 'black', cursor: 'pointer' }}     
                    >
                        <Icon as={FavoriteBorderOutlined} /> <Text>10</Text>
                    </Flex>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', color: 'black', cursor: 'pointer' }}     
                    >
                        <Icon as={AnalyticsOutlined}  /> <Text>1</Text>
                    </Flex>
                    <Flex gap={1}  w={'60px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', color: 'black', cursor: 'pointer' }}     
                    >
                        <Icon as={ForumOutlined}  /> 
                          <Text>3</Text>
                    </Flex>

                    <Flex gap={1}  w={'40px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', color: 'black', cursor: 'pointer' }}     
                    >
                        <Icon as={BookmarkAddOutlined}  />
                    </Flex>

                    <Flex gap={1}  w={'40px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                   _hover={{ bg: 'gray.100', color: 'black', cursor: 'pointer' }}     
                    >
                        <Icon as={ShareOutlined}  />
                    </Flex>
                     
                </HStack>
                </LightMode>

                </StickyMenu>
         
            </VStack>

                  {/*  Tags */}
              <Box mb={3}>
                <HStack p={2} justifyContent='center' flexWrap='wrap' >
                  {selectedTags.map((tag: any) => (
                  <Link as={NavLink} to={`/t/${tag.hash}`}>
                    <Tag size="md" key={tag.hash}>
                      <TagLabel>{tag.name}</TagLabel>
                    </Tag>
                  </Link>
                  ))}
                </HStack>
              </Box>
          </Box>
        </VStack>
        <Divider/>
      </Box>
      <Box minH='300px' w='100%' mt={3} pb='100px' >
        <HStack w='100%' justifyContent='center' >
          <Text fontWeight='500' p={1}  fontSize='18px' >
            More Article
          </Text>
        </HStack>
        <AuthorArticles userId={author} />
      </Box>
    </Box>
  );
};

export default ArticleDetails;
