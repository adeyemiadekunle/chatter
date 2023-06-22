import React, { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import {collection, doc, getDoc, getDocs, DocumentData } from "firebase/firestore";
import { Author, fetchAuthorData } from "../utils/helperFunctions";

interface Article {
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
  // Add any other fields from your articles collection
}

const Bookmarks: React.FC = () => {
  const [userBookmarks, setUserBookmarks] = useState<Article[]>([]);
  const [authorsData, setAuthorsData] = useState({} as Author);
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(collection(db, "users"), currentUser);
      getDoc(userDocRef)
        .then((doc) => {
          if (doc.exists()) {
            const { bookmarks } = doc.data() as DocumentData;
            const articlesCollectionRef = collection(db, "articles");

            getDocs(articlesCollectionRef)
              .then((querySnapshot) => {
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

                  if (bookmarks.includes(articleDoc.id)) {
                    bookmarkedArticles.push({
                      id: doc.id,
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
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error retrieving user document:", error);
        });
    }
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
      console.log(article.authorId);
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
    <div>
      <h2>Bookmarks</h2>
      {userBookmarks.map((bookmark) => (
        <div key={bookmark.id}>
          <div>{bookmark.id} </div>
          {/* <h3>{bookmark.title}</h3> */}
          {/* <p>{bookmark.content}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
