import {  onSnapshot, doc, collection,  } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { createContext, useEffect, useState } from "react";

const FirestoreContext = createContext<any>(null);

interface FirestoreProviderProps {
  children: React.ReactNode;
}

const FirestoreProvider = ({ children }: FirestoreProviderProps) => {

  const [TagsArticles, setTagsArticles] = useState(tags);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "articles"), (querySnapshot) => {
      const articlesData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          publishAt: doc.data().publishAt || "",
          headerImage: doc.data().headerImage || "",
          tags: doc.data().tags || [],
          content: doc.data().content || {},
          authorId: doc.data().authorId || "",
          likes: doc.data().likes || [],
          comments: doc.data().comments || [],
          views: doc.data().views || [],
          // ... other properties
        }))
        .filter((article) =>
          article.tags.some((tag: any) => tags.includes(tag))
        ); // Filter articles based on matching tags
  
      setTagsArticles(articlesData);
    });
  
    return unsubscribe;
  }, [tags]);

    
 

  return (
    <FirestoreContext.Provider value={{TagsArticles }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export { FirestoreContext, FirestoreProvider };
