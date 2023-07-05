import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ArticleCard from "../ArticleCard";
import { Author, fetchAuthorData } from "../../utils/helperFunctions";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

interface TagsArticleProps {
  hash: any;
}

interface TagsArticles {
  id: string;
  publishAt: string;
  heading: string;
  headerImage: string;
  tags: { name: string; hash: string }[];
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

//   Tags  List of Articles
export const TagsHot = ({ hash }: TagsArticleProps) => {
  const [tagArticles, setTagArticles] = useState([] as TagsArticles[]);
  const [authorsData, setAuthorsData] = useState({} as Author);

  useEffect(() => {
    const fetchTagArticle = async () => {
      try {
        const articlesCollection = collection(db, "articles");
        const articlesQuery = query(articlesCollection);
        const unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
          const updatedArticles: TagsArticles[] = [];

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
              slug,
            } = doc.data() as DocumentData;

            if (tags.some((tag: { name: any }) => tag.name === hash)) {
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
                slug: slug || "",
              });
            }
          });
          setTagArticles(updatedArticles);
        });
        return unsubscribe;
      } catch (error) {
        console.log(error);
      }
    };

    fetchTagArticle();
  }, [hash]);


  useEffect(() => {
    const fetchAuthor = async (authorId: string) => {
      const data = await fetchAuthorData(authorId);
      if (data !== null) {
        setAuthorsData(data);
      }
    };

    tagArticles.forEach((article) => {
      fetchAuthor(article.authorId);
    });
  }, [tagArticles]);

 
  const ArticleParagraph = (blocks: any[]) => {
    const firstParagraph = blocks.find((block) => block.type === "paragraph");
    return firstParagraph;
  };

  const paragraphBlocksArticle = ArticleParagraph(
    tagArticles.length > 0 ? tagArticles[0].content.blocks : []
  );

  return (
    <div>
      {tagArticles.length > 0 ? (
        tagArticles.map((article) => (
          <Box key={article.id}>
            <ArticleCard
              key={article.id}
              Title={article.heading}
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
          </Box>
        ))
      ) : (
        <Box p={4}>
          <h1>No Articles Found</h1>
        </Box>
      )}
    </div>
  );
};
