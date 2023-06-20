import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard";
import { Box } from "@chakra-ui/react";

import {
  fetchArticles,
  fetchAuthorData,
  RecentArticles,
  Author,
} from "../../utils/helperFunctions";

const Recent = () => {
  const [articles, setArticles] = useState([] as RecentArticles[]);
  const [authorsData, setAuthorsData] = useState({} as Author);

  //  for Published Articles recently updated
  useEffect(() => {
    const unsubscribe = fetchArticles((fetchedArticles) => {
      setArticles(fetchedArticles);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(articles);


  useEffect(() => {
    const fetchAuthor = async (authorId: string) => {
      const data = await fetchAuthorData(authorId);
      if (data !== null) {
        setAuthorsData(data);
      }
    };

    articles.forEach((article) => {
      fetchAuthor(article.authorId);
      console.log(article.authorId);
    });
  }, [articles]);

  
  const ArticleHeaderLevel1 = (blocks: any) => {
    return blocks.find(
      (block: any) => block.type === "header" && block.data.level === 1
    );
  };
  const headerBlocksArticle = ArticleHeaderLevel1(
    articles.length > 0 ? articles[0].content.blocks : []
  );

  const ArticleParagraph = (blocks: any[]) => {
    const firstParagraph = blocks.find((block) => block.type === "paragraph");
    return firstParagraph;
  };

  const paragraphBlocksArticle = ArticleParagraph(
    articles.length > 0 ? articles[0].content.blocks : []
  );



  return (
    <Box>
      {articles.map((article) => (
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
        />
      ))}
    </Box>
  );
};

export default Recent;
