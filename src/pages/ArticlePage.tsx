import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { doc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";
import {
  fetchArticle,
  Article,
  fetchAuthorData,
  Author,
} from "../utils/helperFunctions";
import EditorJs from "@natterstefan/react-editor-js";
import { EDITOR_JS_TOOLS } from "../components/RichEditor/constant";  
import {
  VStack,
  Box,
  HStack,
  Image,
  Tag,
  TagLabel,
  Heading,
  Avatar,
  Text,
  Flex,
  Link,
  Divider,
  Icon,
  LightMode,
} from "@chakra-ui/react";
import { FormattedDate } from "../utils/FormatDate";
import {
  BookmarkAddOutlined,
  FavoriteBorderOutlined,
  AnalyticsOutlined,
  ForumOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AuthorArticles from "../components/Author/AuthorsArticle";
import ArticleHeading from "../components/ArticleHeading";
import { followAuthor } from "../components/FollowingAuthor";
import { auth, db } from "../utils/firebase";
import StickyMenu from "../utils/StickyMenu";
import { BookMark } from "../components/Bookmark";
import { Like } from "../components/Like";
import ReactGA from "react-ga";
import SEO from "../components/SEO";

const ArticlePage = () => {
  const [contents, setContents] = useState<Article["content"]>({ blocks: [] });
  const [authorsData, setAuthorsData] = useState({} as Author);
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [heading, setHeading] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [articleId, setArticleId] = useState<string | undefined>(undefined);

  const { slug } = useParams<{ slug: string }>();
  const currentUser = auth.currentUser?.uid;

  // fetch article data
  useEffect(() => {
    const getArticle = async () => {
      const article = await fetchArticle(slug ?? "");
      if (article) {
        const articleId = article.id;
        const { content, headerImage, tags, authorId, publishAt, heading } = article;
        setContents(content);
        setHeading(heading);
        setImageUrl(headerImage);
        setSelectedTags(tags);
        setAuthor(authorId);
        setPublishDate(publishAt);
        setLoading(false);
        setArticleId(articleId);
      } else {
        setLoading(false);
      }
    };

    getArticle();
  }, [slug]);

  // View Analystics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    if (articleId !== undefined) {
      const articleRef = doc(db, "articles", articleId);

      // Update the views array in Firestore
      updateDoc(articleRef, {
        views: arrayUnion({ userId: currentUser, timestamp: new Date() }),
      })
        .then(() => {
          console.log("Article view recorded in Firestore");
        })
        .catch((error) => {
          console.error("Error recording article view in Firestore:", error);
        });
    }
  }, [articleId, currentUser]);

  // fetch author data
  useEffect(() => {
    if (author !== "") {
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
    }
  }, [currentUser, author]);


  // Like
  useEffect(() => {
    if (currentUser !== undefined && articleId !== undefined) {
      const articleRef = doc(db, "articles", articleId);
      const unsubscribe = onSnapshot(articleRef, (doc) => {
        if (doc.exists()) {
          const { likes } = doc.data();
          setIsLiking(likes.includes(currentUser));
          setLikesCount(likes.length);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser, articleId]);

  // Bookmark
  useEffect(() => {
    if (currentUser !== undefined) {
      const userRef = doc(db, "users", currentUser);
      // console.log(userRef);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const { bookmarks } = doc.data();
          setIsBookmarking(bookmarks?.includes(articleId));
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser, articleId]);

  const handleLike = async () => {
    if (currentUser !== undefined && articleId !== undefined) {
      console.log("clicked");
      await Like(articleId, isLiking, currentUser);
    }
  };

  const handleBookmark = async () => {
    if (currentUser !== undefined && articleId !== undefined) {
      await BookMark(articleId, isBookmarking, currentUser);
    }
  };

    //  Follow
  const handleFollow = async () => {
    setIsFollowing(!isFollowing); // Toggle the value of isFollowing
    if (currentUser !== undefined) {
      await followAuthor(author, isFollowing, currentUser); // Pass the updated value to followAuthor
    }
  };

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


  // Get the first header block of the article
 

  return (
    <>
      <SEO title={`${heading}`} description='' name={authorsData.displayName} type="Post"  />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box position="relative"  bg='white'>
            <Box>
              <ArticleHeading></ArticleHeading>
            </Box>
            <Box maxW={{ base: "100%", md: "1000px" }} m="0 auto" bg='white'>
              <VStack>
                <HStack>
                  <Box w='100%' m="0 auto">
                    <Heading
                      fontSize={{ base: "34px", md: "48px" }}
                      textAlign="center"
                      mt={12}
                      whiteSpace='nowrap'
                    >
                      {heading}
                    </Heading>
                  </Box>
                </HStack>
                <VStack
                  minH="100px"
                  w="100%"
                  justifyContent="center"
                  spacing={4}
                  py={{ base: "2", md: "4" }}
                >
                  <Flex alignItems="center" gap={3}>
                    <Flex gap={2} alignItems="center">
                      <Box pb={{ base: "3", md: "0" }}>
                        <Avatar
                          size="lg"
                          src={authorsData.photoURL}
                          name={authorsData.displayName}
                        />
                      </Box>
                      <VStack fontSize="14px" alignItems="flex-start">
                        <HStack>
                          <Text fontWeight="600">
                            {authorsData.displayName}
                          </Text>
                          <Text>·</Text>
                          {isFollowing ? (
                            <Text
                              color="blue.500"
                              onClick={handleFollow}
                              cursor="pointer"
                            >
                              Following
                            </Text>
                          ) : (
                            <Text
                              color="blue.500"
                              onClick={handleFollow}
                              cursor="pointer"
                            >
                              Follow
                            </Text>
                          )}
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
                <Box w="100%">
                  <Image
                    src={imageUrl}
                    h={{ base: "100%", md: "500px" }}
                    w="100%"
                    objectFit="cover"
                  />
                </Box>

                <Box
                  px={{ base: "4", md: "0" }}
                  maxW={{ base: "100%", md: "800px" }}
                  m="0 auto"
                >
                  <Box >
                    <EditorJs
                      tools={EDITOR_JS_TOOLS}
                      data={contents}
                      readOnly={true}
                    />
                  </Box>

                  <VStack mt={"80px"} w="100%" mb={"60px"}>
                    {/*   */}
                    <StickyMenu>
                      <LightMode>
                        <HStack
                          borderRadius="10px"
                          px={3}
                          py={2}
                          bg="whiteAlpha.900"
                          boxShadow="lg"
                          color="primary.black"
                        >
                          {isLiking ? (
                            <Flex
                              gap={1}
                              w={"60px"}
                              borderRadius={"15px"}
                              p={0.5}
                              justifyContent={"center"}
                              alignItems={"center"}
                              _hover={{
                                bg: "gray.100",
                                color: "brand.800",
                                cursor: "pointer",
                              }}
                              onClick={handleLike}
                            >
                              <Icon as={FavoriteIcon} color="red" />{" "}
                              <Text>{likesCount}</Text>
                            </Flex>
                          ) : (
                            <Flex
                              gap={1}
                              w={"60px"}
                              borderRadius={"15px"}
                              p={0.5}
                              justifyContent={"center"}
                              alignItems={"center"}
                              _hover={{
                                bg: "gray.100",
                                color: "brand.800",
                                cursor: "pointer",
                              }}
                              onClick={handleLike}
                            >
                              <Icon as={FavoriteBorderOutlined} />
                              <Text>{likesCount}</Text>
                            </Flex>
                          )}
                          <Flex
                            gap={1}
                            w={"60px"}
                            borderRadius={"15px"}
                            p={0.5}
                            justifyContent={"center"}
                            alignItems={"center"}
                            _hover={{
                              bg: "gray.100",
                              color: "black",
                              cursor: "pointer",
                            }}
                          >
                            <Icon as={AnalyticsOutlined} /> <Text>{viewCount}</Text>
                          </Flex>
                          <Flex
                            gap={1}
                            w={"60px"}
                            borderRadius={"15px"}
                            p={0.5}
                            justifyContent={"center"}
                            alignItems={"center"}
                            _hover={{
                              bg: "gray.100",
                              color: "black",
                              cursor: "pointer",
                            }}
                          >
                            <Icon as={ForumOutlined} />
                            <Text>3</Text>
                          </Flex>

                          {isBookmarking ? (
                            <Flex
                              w={"40px"}
                              h={"40px"}
                              borderRadius={"60px"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              _hover={{
                                bg: "gray.100",
                                cursor: "pointer",
                                color: "blue.500",
                              }}
                              onClick={handleBookmark}
                            >
                              <Icon
                                as={BookmarkAddedIcon}
                                color="brand.800"
                                fontSize={"28px"}
                              />
                            </Flex>
                          ) : (
                            <Flex
                              w={"40px"}
                              h={"40px"}
                              borderRadius={"60px"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              _hover={{
                                bg: "gray.100",
                                cursor: "pointer",
                                color: "blue.500",
                              }}
                              onClick={handleBookmark}
                            >
                              <Icon
                                as={BookmarkAddOutlined}
                                fontSize={"28px"}
                              />
                            </Flex>
                          )}
                          <Flex
                            gap={1}
                            w={"40px"}
                            borderRadius={"15px"}
                            p={0.5}
                            justifyContent={"center"}
                            alignItems={"center"}
                            _hover={{
                              bg: "gray.100",
                              color: "black",
                              cursor: "pointer",
                            }}
                          >
                            <Icon as={ShareOutlined} />
                          </Flex>
                        </HStack>
                      </LightMode>
                    </StickyMenu>
                  </VStack>

                  {/*  Tags */}
                  <Box mb={3}>
                    <HStack p={2} justifyContent="center" flexWrap="wrap">
                      {selectedTags.map((tag: any) => (
                        <Link as={NavLink} to={`/t/${tag.hash}`} key={tag.hash}>
                          <Tag size="md" key={tag.hash}>
                            <TagLabel>{tag.name}</TagLabel>
                          </Tag>
                        </Link>
                      ))}
                    </HStack>
                  </Box>
                </Box>
              </VStack>
              <Divider />
            </Box>
            <Box minH="300px" w="100%" mt={3} pb="100px">
              <HStack w="100%" justifyContent="center">
                <Text fontWeight="500" p={1} fontSize="18px">
                  More Article
                </Text>
              </HStack>
              <AuthorArticles userId={author} />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ArticlePage;
