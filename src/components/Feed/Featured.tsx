import {useState, useEffect} from "react";
import {fetchFeatured, RecentArticles} from "../../utils/helperFunctions";
import ArticleCard from "../ArticleCard";
import { Box } from "@chakra-ui/react";
import SEO from "../SEO";

const Featured = () => {

  const [articles, setArticles] = useState([] as RecentArticles[]);  

    //  for Featured Articles
    useEffect(() => {
      const getArticle = fetchFeatured((fetchedArticles) => {
        setArticles(fetchedArticles);
      });
  
      return () => {
        getArticle();
      };
    }, []);

    const ArticleParagraph = (blocks: any[]) => {
      const firstParagraph = blocks.find((block) => block.type === "paragraph");
      return firstParagraph;
    };
  
    const paragraphBlocksArticle = ArticleParagraph(
      articles.length > 0 ? articles[0].content.blocks : []
    );
  
  
  return (
    <>
    <SEO title="Featured posts on Chatte" description='' name='' type='' />
    <Box>
    {articles.map((article) => (
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
        />
      ))}
    </Box>
    </>
  );
};

export default Featured;
