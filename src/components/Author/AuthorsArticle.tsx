import { useEffect, useState } from "react";
import { onSnapshot, collection, query, DocumentData } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Box, HStack, VStack} from '@chakra-ui/react'
import UserArticleCard from '../Author/UserArticleCard'

interface AuthorArticleProps {
  userId: string;
}

export interface AuthorArticles {
  id: string;
  publishAt: string;
  heading: string;
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
              heading,
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
                heading: heading || "",
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


  const ArticleParagraph = (blocks: any[]) => {
    const firstParagraph = blocks.find((block) => block.type === "paragraph");
    return firstParagraph;
  };

  const paragraphBlocksArticle = ArticleParagraph(
    userArticles.length > 0 ? userArticles[0].content.blocks : []
  );



  return (
       <>
       <HStack minH='400px' pt={4} spacing={12}   maxW= '1200px' m ='0 auto'  alignItems={{base: 'center', md: 'flex-start'}} hideBelow='md' >
          {
            userArticles.length > 0 ? userArticles.map((article) => (
                <UserArticleCard
                  key={article.id}
                  Title={article.heading}
                  Paragraph={paragraphBlocksArticle.data.text}
                  HeaderImage={article.headerImage}
                  PublishDate={article.publishAt}
                  alt={article.id}
                  authorId={article.authorId}
                  slug={article.slug}
                />
            )) : 
            <Box   w='100%'mt={3} > 
                 No Articles Publish yet
            </Box>
          }
       </HStack>
       <VStack minH='400px' pt={4} spacing={10}  maxW={'100%'} m ='0 auto'  hideFrom='md'  >
          {
            userArticles.length > 0 ? userArticles.map((article) => (
                <UserArticleCard
                  key={article.id}
                  Title={article.heading}
                  Paragraph={paragraphBlocksArticle.data.text}
                  HeaderImage={article.headerImage}
                  PublishDate={article.publishAt}
                  alt={article.id}
                  authorId={article.authorId}
                  slug={article.slug}
                />
            )) : 
            <Box   w='100%'mt={3} > 
                 No Articles Publish yet
            </Box>
          }
       </VStack>




     </>
  );
};

export default AuthorArticle;

