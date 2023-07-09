import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { Box, Text, VStack, Heading, Image, HStack } from "@chakra-ui/react";
import { Container } from "../components/ArticleContainer";
import ArticleCard from "../components/ArticleCard";
import SEO from "../components/SEO";
import { fetchBookmarkData, RecentArticles } from "../utils/helperFunctions";
import SkeletonCard from "../components/Skeleton/SkeletonCard";
import ToogleBtn from "../components/ToogleBtn";
import Rightbar from "../components/Rightbar";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Logo from "../assets/logo.png";

const Bookmarks: React.FC = () => {
  const [userBookmarks, setUserBookmarks] = useState<RecentArticles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    if (!currentUser) return;

    const fetchBookmarks = async () => {
      const bookmarkData = await fetchBookmarkData({ currentUser });
      setUserBookmarks(bookmarkData || []);
      setIsLoading(false);
    };

    fetchBookmarks();
  }, []);

  const ArticleParagraph = (blocks: any[]) => {
    const firstParagraph = blocks.find((block) => block.type === "paragraph");
    return firstParagraph?.data?.text || "";
  };

  return (
    <>
      <SEO title=" Bookmarks - Chatte" description="" name="" type="" />
      <Box>
        <Box
          display={{ base: "block", md: "flex" }}
          // mx={{ base: "0", md: "100px" }}
          maxW={{ base: "100%,", md: "1100px" }}
          m="0 auto"
          gap={8}
          mt={8}
        >
          {/* Main */}
          <Box flex={{ base: "none", md: "1" }}>
            <Box mb={8}>
              <Container height={"200px"} display={"block"}>
                <VStack height="200px" justifyContent="center">
                  <Heading fontSize="xl">Bookmarks</Heading>
                  <Text>All your bookmarks in one place on Chatter</Text>
                </VStack>
              </Container>
            </Box>
            <Box>
              <Container height={"400px"} display={"block"}>
                {isLoading ? (
                  [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
                ) : (
                  <>
                    {userBookmarks.length > 0 ? (
                      userBookmarks.map((article) => {
                        const paragraphBlocksArticle = ArticleParagraph(
                          article.content.blocks
                        );
                        return (
                          <ArticleCard
                            key={article.id}
                            Title={article.heading}
                            HeaderImage={article.headerImage}
                            tags={article.tags}
                            PublishDate={article.publishAt}
                            Paragraph={paragraphBlocksArticle}
                            authorId={article.authorId}
                            slug={article.slug}
                            articleId={article.id}
                            isLoading={isLoading}
                          />
                        );
                      })
                    ) : (
                      <Box>
                        <Text
                          fontSize="md"
                          fontWeight="600"
                          color="gray.500"
                          textAlign="center"
                        >
                          You currently have no bookmarks
                        </Text>
                      </Box>
                    )}
                  </>
                )}
              </Container>
            </Box>
          </Box>

          {/* RightBar */}
          <Box w="300px" hideBelow="md">
            <Rightbar />
          </Box>

          {/* Toogle Btn */}
          <ToogleBtn Toogle={onOpen} />

          {/* Mobile */}

          <Box hideFrom="md">
            <Drawer
              isOpen={isOpen}
              size={"full"}
              placement="right"
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton borderStyle="none" fontSize="md" mr={2} />
                <DrawerBody>
                  <Box mt={"60px"}>
                    <Rightbar />
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box>
        <Box h="200px" bg="blue.800" mt="100px">
          <VStack h="inherit" justifyContent="center">
            <HStack>
              <Image src={Logo} boxSize="40px" />
              <Text fontSize="md" fontWeight="600" color="white">
                chatte
              </Text>
            </HStack>
            <Text color="white">Made with love by Adekunle Adeyemi</Text>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default Bookmarks;
