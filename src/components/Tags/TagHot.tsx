import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ArticleCard from "../ArticleCard";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import SkeletonCard from "../Skeleton/SkeletonCard";


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
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        });
        return unsubscribe;
      } catch (error) {
        console.log(error);
      }
    };

    fetchTagArticle();
  }, [hash]);


 
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
              HeaderImage={article.headerImage}
              tags={article.tags}
              PublishDate={article.publishAt}
              Paragraph={paragraphBlocksArticle.data.text}
              authorId={article.authorId}
              slug={article.slug}
              articleId={article.id}
              isLoading={isLoading}
            />
          </Box>
        ))
      ) : isLoading ? (
        [...Array(3)].map((_, i) => <SkeletonCard key={i}/>)
      ) : (
        <Box>No Articles Found</Box>
      )
        }
    </div>
  );
};
