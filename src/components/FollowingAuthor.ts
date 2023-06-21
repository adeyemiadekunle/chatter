

import { arrayRemove, arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { db } from "../utils/firebase";

export const followAuthor = async (
    userId: string,
    isFollowing: boolean,
    currentUser: string
  ) => {
    try {
      const userRef = doc(db, "users", userId);
      let currentUserRef = null;
  
      if (currentUser) {
        currentUserRef = doc(db, "users", currentUser);
      } else {
        console.log("currentUser is undefined or null");
      }
  
      if (isFollowing) {
        // Remove the current user from the target user's followers array
        await updateDoc(userRef, {
          followers: arrayRemove(currentUser),
        });
  
        // Remove the target user from the current user's following array
        if (currentUserRef) {
          await updateDoc(currentUserRef, {
            following: arrayRemove(userId),
          });
        } else {
          console.error("currentUserRef is null");
        }
  
        console.log(`User ${currentUser} unfollowed user ${userId}.`);
      } else {
        // Add the current user to the target user's followers array
        await updateDoc(userRef, {
          followers: arrayUnion(currentUser),
        });
  
        // Add the target user to the current user's following array
        if (currentUserRef) {
          await updateDoc(currentUserRef, {
            following: arrayUnion(userId),
          });
        } else {
          console.error("currentUserRef is null");
        }
  
        console.log(`User ${currentUser} followed user ${userId}.`);
      }
    } catch (error) {
      console.error(`Error updating tag ${userId}:`, error);
    }
  };