import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { Box, Text, VStack, Heading } from "@chakra-ui/react";
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
    return firstParagraph;
  };

  const paragraphBlocksArticle = ArticleParagraph(
    userBookmarks.length > 0 ? userBookmarks[0].content.blocks : []
  );

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
                {userBookmarks.length > 0 ? (
                  userBookmarks.map((article) => (
                    <ArticleCard
                      key={article.id}
                      Title={article.heading}
                      HeaderImage={article.headerImage}
                      tags={article.tags}
                      PublishDate={article.publishAt}
                      Paragraph={paragraphBlocksArticle.data.text}
                      authorId={article.authorId}
                      slug={article.slug}
                      articleId={article.id}
                      isLoading={isLoading}
                    />
                  ))
                ) : isLoading ? (
                  [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
                ) : (
                  <Box>
                    <Text>No Bookmarks Yet</Text>
                  </Box>
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
                <DrawerCloseButton borderStyle="none" fontSize="md" mr={2}  />
                <DrawerBody>
                  <Box mt={"60px"}>
                    <Rightbar />
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Bookmarks;
