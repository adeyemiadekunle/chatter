import { useState, useEffect } from "react";
import { fetchFeatured, RecentArticles } from "../../utils/helperFunctions";
import ArticleCard from "../ArticleCard";
import SkeletonCard from "../Skeleton/SkeletonCard";
import { Box } from "@chakra-ui/react";
import SEO from "../SEO";

const Featured = () => {
  const [articles, setArticles] = useState([] as RecentArticles[]);
  const [isLoading, setIsLoading] = useState(true);

  //  for Published Articles for user for follow tags and author
  useEffect(() => {
    const getArticle = fetchFeatured((fetchedArticles) => {
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
      <SEO title="chatte.space" description="" name="" type="" />
      <Box>
        {isLoading ? (
          [...Array(5)].map((_, i) => <SkeletonCard key={i} />) // [1,2,3,4,5]
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

export default Featured ;
