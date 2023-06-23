import React, { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import {collection, doc, getDoc, getDocs, DocumentData } from "firebase/firestore";
import { Author, fetchAuthorData } from "../utils/helperFunctions";
import {Box,  Text, VStack, Heading} from "@chakra-ui/react";
import { Container } from "../components/ArticleContainer";
import ArticleCard from "../components/ArticleCard";

interface Article {
  id: string;
  publishAt: string;
  headerImage: string;
  tags: { name: string; hash: string }[]
  content: {
    blocks: {
      type: string;
      data: {
        text: string;
      };
    }[];
  };
  authorId: string;
  likes: string[];
  comments: string[];
  views: string[];
  slug: string;
  // Add any other fields from your articles collection
}

const Bookmarks: React.FC = () => {
  const [userBookmarks, setUserBookmarks] = useState<Article[]>([]);
  const [authorsData, setAuthorsData] = useState({} as Author);
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(collection(db, "users"), currentUser);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            const { bookmarks } = userDoc.data() as DocumentData;
            const articlesCollectionRef = collection(db, "articles");
            const querySnapshot = await getDocs(articlesCollectionRef);
            const bookmarkedArticles: Article[] = [];
  
            querySnapshot.forEach((articleDoc) => {
              const {
                publishAt,
                headerImage,
                tags,
                content,
                authorId,
                likes,
                comments,
                views,
                slug,
              } = articleDoc.data() as DocumentData;
  
              if (bookmarks?.includes(articleDoc.id)) {
                bookmarkedArticles.push({
                  id: articleDoc.id,
                  publishAt: publishAt || "",
                  headerImage: headerImage || "",
                  tags: tags || [],
                  content: content || "",
                  authorId: authorId || "",
                  likes: likes || [],
                  comments: comments || [],
                  views: views || [],
                  slug: slug || "",
                });
              }
            });
  
            setUserBookmarks(bookmarkedArticles);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error retrieving user document:", error);
        }
      }
    };
  
    fetchData();
  }, [currentUser]);
  
   
  
  useEffect(() => {
    const fetchAuthor = async (authorId: string) => {
      const data = await fetchAuthorData(authorId);
      if (data !== null) {
        setAuthorsData(data);
      }
    };

  userBookmarks.forEach((article) => {
      fetchAuthor(article.authorId);
    });
  }, [userBookmarks]);

  
  const ArticleHeaderLevel1 = (blocks: any) => {
    return blocks.find(
      (block: any) => block.type === "header" && block.data.level === 1
    );
  };
  const headerBlocksArticle = ArticleHeaderLevel1(
    userBookmarks.length > 0 ? userBookmarks[0].content.blocks : []
  );

  const ArticleParagraph = (blocks: any[]) => {
    const firstParagraph = blocks.find((block) => block.type === "paragraph");
    return firstParagraph;
  };

  const paragraphBlocksArticle = ArticleParagraph(
    userBookmarks.length > 0 ? userBookmarks[0].content.blocks : []
  );
  


  return (

    <>
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
              <VStack  height='200px' justifyContent='center' >
                   <Heading>
                    Bookmarks
                   </Heading>
                   <Text>
                    All your bookmarks in one place on Chatter
                   </Text>
              </VStack>
             </Container>
          </Box>
          <Box>
            <Container height={"400px"} display={"block"}>
              {
                userBookmarks.length > 0 ? (
                  userBookmarks.map((article) => (
                    <ArticleCard
                    key={article.id}
                    Title={headerBlocksArticle.data}
                    displayName={authorsData?.displayName}
                    userTagLine={authorsData?.userTagLine}
                    AvatarImage={authorsData?.photoURL}
                    HeaderImage={article.headerImage}
                    tags={article.tags}
                    PublishDate={article.publishAt}
                    Paragraph={paragraphBlocksArticle.data.text}
                    username={authorsData?.userName}
                    slug={article.slug}
                    articleId={article.id}
                    />
                  ))
                ) : (
                  <Box>
                    <Text>No Bookmarks Yet</Text>
                  </Box>
                )
              }
            </Container>
          </Box>
        </Box>

        {/* RightBar */}
        <Box w={{ base: "none", md: "300px" }}>
          <Container height={"300px"} display={{ base: "none", md: "block" }}>
            <h2>Hello</h2>

      
          </Container>
        </Box>
      </Box>
    </Box>
    </>
   
  );
};

export default Bookmarks;


// <div>
// <h2>Bookmarks</h2>
// {userBookmarks.map((bookmark) => (
//   <div key={bookmark.id}>
//     <div>{bookmark.id} </div>
  
//   </div>
// ))}
// </div>