import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard";
import { Box } from "@chakra-ui/react";
import { auth, firestore } from '../../utils/firebase';


import {
  fetchArticles,
  fetchAuthorData,
  RecentArticles,
  Author,
} from "../../utils/helperFunctions";


const Recent = () => {
  const [articles, setArticles] = useState([] as RecentArticles[]);
  const [authorsData, setAuthorsData] = useState({} as Author);
  const [currentUser, setCurrentUser] = useState(null); // State for current user
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]); // State for bookmarked articles

  // Fetch current user's bookmarked articles
  useEffect(() => {
    const fetchBookmarkedArticles = async () => {
      try {
        const userSnapshot = await firestore.collection("users").doc(currentUser.uid).get();
        const userData = userSnapshot.data();
        if (userData && userData.bookmarks) {
          setBookmarkedArticles(userData.bookmarks);
        }
      } catch (error) {
        console.log("Error fetching bookmarked articles: ", error);
      }
    };

    if (currentUser) {
      fetchBookmarkedArticles();
    }
  }, [currentUser]);

  // Fetch articles
  useEffect(() => {
    const getArticle = fetchArticles((fetchedArticles) => {
      setArticles(fetchedArticles);
    });

    return () => {
      getArticle();
    };
  }, []);

  // Fetch author data
  useEffect(() => {
    const fetchAuthor = async (authorId: string) => {
      const data = await fetchAuthorData(authorId);
      if (data !== null) {
        setAuthorsData(data);
      }
    };

    articles.forEach((article) => {
      fetchAuthor(article.authorId);
    });
  }, [articles]);

  // Handle bookmarking an article
  const handleBookmark = async (articleId: string) => {
    try {
      // Add articleId to bookmarkedArticles state
      setBookmarkedArticles((prevBookmarkedArticles) => [
        ...prevBookmarkedArticles,
        articleId,
      ]);

      // Update the bookmark field in the user collection
      await firestore
        .collection("users")
        .doc(currentUser.uid)
        .update({
          bookmarks: firestore.FieldValue.arrayUnion(articleId),
        });

      console.log("Article bookmarked successfully!");
    } catch (error) {
      console.log("Error bookmarking article: ", error);
    }
  };

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

  // Set the current user when authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
          onBookmark={() => handleBookmark(article.id)} // Pass the handleBookmark function as a prop to the ArticleCard component
          isBookmarked={bookmarkedArticles.includes(article.id)} // Check if the article is bookmarked by the current user
        />
      ))}
    </Box>
  );
};

export default Recent;
