import { db } from "../utils/firebase";
import { updateDoc, doc, arrayUnion, arrayRemove,  } from "firebase/firestore";


export const Like = async (articleId: string, isLiking: boolean, userId: string) => {
    try {
      const articleRef = doc(db, "articles", articleId);
      if (isLiking) {
        await updateDoc(articleRef, {
         likes : arrayRemove(userId),
        });
        console.log(`User ${userId} unlike article ${articleId}.`);
      } else {
        await updateDoc(articleRef, {
          likes: arrayUnion(userId ),
        });
        console.log(`User ${userId} like article ${articleId}.`);
      }
    } catch (error) {
        console.error(error);
    }
  };
  

  

