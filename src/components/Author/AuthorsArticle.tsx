import { useEffect, useState } from "react";
import { onSnapshot, collection, query, DocumentData } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Box, Flex} from '@chakra-ui/react'
import UserArticleCard from '../Author/UserArticleCard'
import { fetchAuthorData, Author } from "../../utils/helperFunctions";

interface AuthorArticleProps {
  userId: string;
}

export interface AuthorArticles {
  id: string;
  publishAt: string;
  headerImage: string;
  tags: string[];
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
}

const AuthorArticle = ({ userId }: AuthorArticleProps) => {
  const [userArticles, setUserArticles] = useState<AuthorArticles[]>([]);
  const [authorsData, setAuthorsData] = useState({} as Author);

  useEffect(() => {
    const fetchAuthorArticles = async () => {
      try {
        const articlesCollection = collection(db, "articles");
        const articlesQuery = query(articlesCollection);
        const unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
          const updatedArticles: AuthorArticles[] = [];

          snapshot.forEach((doc) => {
            const {
              publishAt,
              headerImage,
              tags,
              content,
              authorId,
              likes,
              comments,
              views,
              slug
            } = doc.data() as DocumentData;

            if (authorId === userId) { // Compare with userId prop instead of authorId
              updatedArticles.push({
                id: doc.id,
                publishAt: publishAt || "",
                headerImage: headerImage || "",
                tags: tags || [],
                content: content || "",
                authorId: authorId || "",
                likes: likes || [],
                comments: comments || [],
                views: views || [],
                slug: slug || ""
                // ... other properties
              });
            }
          });

          setUserArticles(updatedArticles);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchAuthorArticles();
  }, [userId]);  


  
  useEffect(() => {
    const fetchAuthor = async (authorId: string) => {
      const data = await fetchAuthorData(authorId);
      if (data !== null) {
        setAuthorsData(data);
      }
    };

  userArticles.forEach((article) => {
      fetchAuthor(article.authorId);
      console.log(article.authorId);
    });
  }, [userArticles]);


  // console.log(userArticles)

  const ArticleHeaderLevel1 = (blocks: any) => {
    return blocks.find(
      (block: any) => block.type === "header" && block.data.level === 1
    );
  };
  const headerBlocksArticle = ArticleHeaderLevel1(
    userArticles.length > 0 ? userArticles[0].content.blocks : []
  );

  const ArticleParagraph = (blocks: any[]) => {
    const firstParagraph = blocks.find((block) => block.type === "paragraph");
    return firstParagraph;
  };

  const paragraphBlocksArticle = ArticleParagraph(
    userArticles.length > 0 ? userArticles[0].content.blocks : []
  );



  return (
       <>
       <Flex minH='400px' pt={4} gap={5}  maxW={{base: '100%', md: '1280px'}} m ='0 auto' flexDir={{base: 'column', md: 'row'}} alignItems={{base: 'center', md: 'flex-start'}}  >
          {
            userArticles.length > 0 ? userArticles.map((article) => (
                <UserArticleCard
                  key={article.id}
                  Title={headerBlocksArticle.data}
                  Paragraph={paragraphBlocksArticle.data.text}
                  HeaderImage={article.headerImage}
                  PublishDate={article.publishAt}
                  alt={article.id}
                  AvatarImage={authorsData.photoURL}
                  displayName={authorsData.displayName}
                  slug={article.slug}
                  username={authorsData.userName}
                />
            )) : 
            <Box   w='100%'mt={3} > 
                 No Articles Publish yet
            </Box>
          }
       </Flex>
     </>
  );
};

export default AuthorArticle;

