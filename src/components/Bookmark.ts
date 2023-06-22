import { db } from "../utils/firebase";
import { updateDoc, doc, arrayUnion, arrayRemove,  } from "firebase/firestore";


export const BookMark = async (articleId: string, isBookmarking: boolean, userId: string) => {
    try {
      const usersRef = doc(db, "users", userId);
      if (isBookmarking) {
        await updateDoc(usersRef, {
          bookmarks: arrayRemove(articleId),
        });
        console.log(`User ${userId} removed article ${articleId} from bookmarks.`);
      } else {
        await updateDoc(usersRef, {
          bookmarks: arrayUnion(articleId),
        });
        console.log(`User ${userId} bookmarked article ${articleId}.`);
      }
    } catch (error) {
        console.error(error);
    }
  };
  

  

