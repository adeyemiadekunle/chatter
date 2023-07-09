import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard";
import { Box } from "@chakra-ui/react";
import SEO from "../SEO";
import SkeletonCard from "../Skeleton/SkeletonCard";

import { fetchRecents, RecentArticles } from "../../utils/helperFunctions";

const Recent = () => {
  const [articles, setArticles] = useState([] as RecentArticles[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArticle = fetchRecents((fetchedArticles) => {
      setArticles(fetchedArticles);
      setIsLoading(false);
    });

    return () => {
      getArticle();
    };
  }, []);

  const ArticleParagraph = (blocks: any[]) => {
    const firstParagraph = blocks.find((block) => block.type === "paragraph");
    return firstParagraph?.data?.text || "";
  };

  return (
    <>
      <SEO title="Recent posts on Chatte" description="" name="" type="" />
      <Box>
        {isLoading ? (
          [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            {articles.map((article) => {
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
            })}
          </>
        )}
      </Box>
    </>
  );
};

export default Recent;
