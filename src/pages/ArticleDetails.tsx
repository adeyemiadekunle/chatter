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
  VStack, Box, HStack, Image, Tag, TagLabel, Heading, Avatar, Text, Button, Flex, Link, Divider,Spacer, Icon
} from "@chakra-ui/react";
import { styles } from "../components/ArticleStyle";
import { FormattedDate } from "../utils/FormatDate";
import { BookmarkAddOutlined, FavoriteBorderOutlined, AnalyticsOutlined, BookmarkAddedOutlined, ForumOutlined, ShareOutlined} from '@mui/icons-material'
import  AuthorArticles  from "../components/Author/AuthorsArticle";  



const ArticleDetails = () => {
  const [contents, setContents] = useState<Article["content"]>({ blocks: [] });
  const [authorsData, setAuthorsData] = useState({} as Author);
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();

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
        setAuthorsData(data);
      }
    };

    fetchAuthor(author);
  }, [contents]);

  console.log(author);

  const ArticleHeaderLevel1 = (blocks: any) => {
    return blocks.find(
      (block: any) => block.type === "header" && block.data.level === 1
    );
  };

  const headerBlocksArticle = ArticleHeaderLevel1(
    contents.blocks.length > 0 ? contents?.blocks : []
  );

  return (
    <Box>
      <Box maxW={{ base: "100%", md: "1000px" }} m="0 auto"  >
        <VStack>
          <Box>
            <Box>
              <Heading fontSize={{base: '34px', md: '48px'}} textAlign="center" mt={12}>
                <HeaderOutput data={headerBlocksArticle?.data} />
              </Heading>
            </Box>
          </Box>
          <VStack
            minH="100px"
            w="100%"
            justifyContent="center"
            spacing={4}
            py={6}
          >
              <Flex alignItems='center' gap={3}  flexDir={{base: 'column', md: 'row'}} >
                <HStack spacing={1}>
                  <Avatar
                    size="md"
                    src={authorsData.photoURL}
                    name={authorsData.displayName}
                  />
                  <Text fontWeight="700">{authorsData.userName}</Text>
                </HStack>
                <Text  display={{base: 'none', md: 'block'}} >·</Text>
                <HStack>
                <Text>
                  <Text>{FormattedDate(publishDate)} </Text>
                </Text>
                   <Text>·</Text>
                <Text>10 min Read</Text>
                </HStack>
              </Flex>
          
          </VStack>
          <Box w='100%'>
            <Image src={imageUrl} h={{base: '100%', md: '500px' }} w='100%' objectFit='cover'  />
          </Box>

          <Box px={{base: '4', md: '0'}}  maxW={{ base: "100%", md: "800px" }} m="0 auto"   >
            <Output data={contents} style={styles} />

            <VStack mt={'60px'} w='100%' mb={'60px'}>
            <HStack  border='1px solid gray' borderRadius='50px' px={3} py={2}  >
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

                    <Flex gap={1}  w={'40px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}     
                    >
                        <Icon as={BookmarkAddOutlined} color={'gray.700'} />
                    </Flex>

                    <Flex gap={1}  w={'40px'} borderRadius={'15px'} p={0.5} justifyContent={'center'} alignItems={'center'}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}     
                    >
                        <Icon as={ShareOutlined} color={'gray.700'} />
                    </Flex>
                     
                </HStack>
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
        <Divider></Divider>
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
