import { collection, doc, setDoc, addDoc, getDoc, deleteDoc, query, getDocs, where, QuerySnapshot, Unsubscribe, onSnapshot, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import { db, auth } from './firebase';
import draft from "../msc/draft";

// Fetch Login User Data
 export interface UserData {
  displayName: string;
  email: string;
  photoURL: string;
  userName: string;
  userBio: string;
  userTagLine: string;
  techStack: string[];
  location: string;
} ;

export const fetchUserData = async () => {
  try {
    const user = auth.currentUser?.uid;
    if (!user ) {
      console.error("User not logged in");
      return null;
    }

    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { displayName, email, photoURL, userName, userBio, userTagLine, techStack, location } = docSnap.data() as UserData;
      return { displayName, email, photoURL, userName, userBio, userTagLine, techStack, location };
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};




//  update LoginUserData
export const updateUserData = async (userData: UserData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData, { merge: true });
    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};




// Fetch All Dynamic Users
export interface Users {
  userId: string;
  displayName: any;
  email: any;
  photoURL: any;
  userName: any;
  userBio: any;
  userTagLine: any;
  techStack: any;
  location: any;
  url: string;
}

export const fetchAllUsers = async (): Promise<Users[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users: Users[] = [];

    querySnapshot.forEach((doc) => {
      const { displayName, email, photoURL, userName, userBio, userTagLine, techStack, location } = doc.data();
      const userId = doc.id;

      users.push({
        userId,
        displayName,
        email,
        photoURL,
        userName,
        userBio,
        userTagLine,
        techStack,
        location,
        url: `/${userName}`,
      });
    });

    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
};



//  createDraft
const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Let's write some Articles!",
        level: 1,
      },
    },
  ],
};


export const createDraft = async (callback: (arg0: string) => void) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not logged in");
    return;
  } try {
    
    const draftRef = await addDoc(collection(db, "drafts"), {
      DraftAt: new Date().toISOString(),
      authorId: auth.currentUser?.uid,
      headerImage: '',
      content: DEFAULT_INITIAL_DATA
    });

    if ( typeof callback === 'function'){
      callback(draftRef.id)
    }

     
    console.log("Draft saved with ID:", draftRef.id);
  } catch (error) {
    console.error("Error saving article:", error);
  }
};



// updateDraft
export const updateDraft = async (draftId: string, headerImage: string, content: string) => {
  try {
    const draftRef = doc(db, "drafts", draftId);
    const snapshot = await getDoc(draftRef);

    if (snapshot.exists() && snapshot.data()?.authorId === auth.currentUser?.uid) {
      await setDoc(draftRef, {
        DraftAt: new Date().toISOString(),
        headerImage,
        content
      }, { merge: true });

      console.log("Draft updated:", draftId);
    } else {
      console.error("Unauthorized access or draft does not exist.");
    }
  } catch (error) {
    console.error("Error updating draft:", error);
  }
};



//  publishDraft
export const publishDraft = async (draftId: string, tags: string[], slug: string) => {
  try {
    const draftRef = doc(db, "drafts", draftId);
    const draftDoc = await getDoc(draftRef);

    if (draftDoc.exists()) {
      const { headerImage, content } = draftDoc.data();

      const articleRef = await addDoc(collection(db, "articles"), {
      publishAt: new Date().toISOString(),
      authorId: auth.currentUser?.uid,
      headerImage,
      slug,
      tags,
      content,
      likes: [],
      comments: [],
      views: [],
      });
      console.log("Draft published with ID:", articleRef.id);

      await deleteDoc(draftRef);
      console.log("Draft deleted:", draftId);
    } else {
      console.log("Draft does not exist:", draftId);
    }
  } catch (error) {
    console.error("Error publishing draft:", error);
  }
};





//  fetchDraft a single draft
export const fetchDraft = async (draftId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not logged in");
      return null;
    }

    const docRef = doc(db, "drafts", draftId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data()?.authorId === user.uid) {
      const { headerImage, content } = docSnap.data() as {
        headerImage: string;
        content: string;
      };
      return { headerImage, content };
    } else {
      console.log("Draft not found or unauthorized access");
      return null;
    }
  } catch (error) {
    console.error("Error fetching draft:", error);
    return null;
  }
};



//  deleteDraft
export const deleteDraft = async (draftId: string) => {
  try {
    const docRef = doc(db, "drafts", draftId);
    await deleteDoc(docRef);
    console.log("Draft deleted successfully", draftId);
  } catch (error) {
    console.error("Error deleting draft:", error);
  }
};


//  Fetch LoginUser Drafts
 export interface Drafts {
  id: string;
  headerImage: string;
  content: {
    blocks: {
      type: string;
      data: {
        text: string;
      };
    }[];
  };
}
 
export const fetchUserDrafts = async (): Promise<Drafts[]> => {
  const user = auth.currentUser;
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "drafts"), where("authorId", "==", user?.uid))
    );

    const draftsData: Drafts[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      headerImage: doc.data().headerImage || '', // Provide a default value or modify as needed
      content: doc.data().content || {} // Provide a default value or modify as needed
      // ... other properties
    }));

    return draftsData;
  } catch (error) {
    console.error("Error fetching user drafts:", error);
    return [];
  }
};



// for LoginUser All Published  Articles
 export interface UserArticles {
  id: string;
  headerImage: string;
  content: {
    blocks: {
      type: string;
      data: {
        text: string;
      };
    }[];
  };
}

export const fetchUserArticles = async (): Promise<UserArticles[]> => {
  const user = auth.currentUser;
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "articles"), where("authorId", "==", user?.uid))
    );

    const UserArticleData: UserArticles[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      headerImage: doc.data().headerImage || '', // Provide a default value or modify as needed
      content: doc.data().content || {} // Provide a default value or modify as needed
      // ... other properties
    }));
    return UserArticleData;
  } catch (error) {
    console.error("Error fetching user articles:", error);
    return [];
  }
}


//  Fetch a single Author Data for Article Card
export interface Author {
    displayName: string;
    email: string;
    photoURL: string;
    userTagLine: string  
    userName: string;
}

export const fetchAuthorData = async (authorId: string) => {
  try {
    const docRef = doc(db, "users", authorId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { displayName, email, photoURL, userTagLine, userName } = docSnap.data() as Author;
      return { displayName, email, photoURL, userTagLine, userName };
    } else {
      console.log("Author not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching author data:", error);
    return null;
  }
};



// Fetch a single Article to view a single article
export interface Article {
  publishAt: string; 
  headerImage: string; 
  tags: string[];
  content: string; 
  authorId: string;
  likes: string[];
  comments: string[];
  views: string[];
}

export const fetchArticle = async (slug: string) => {
  try {
    const articlesRef = collection(db, "articles");
    const querySnapshot = query(articlesRef, where("slug", "==", slug));
    const queryDocs = await getDocs(querySnapshot);

    if (!queryDocs.empty) {
      const docSnapshot = queryDocs.docs[0];
      const {
        publishAt, headerImage, tags, content, authorId, likes, comments, views,
      } = docSnapshot.data() as Article;

      return {
        publishAt,  headerImage, tags, content, authorId, likes, comments, views,
      };
    } else {
      console.log("Article not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};


export interface AuthorArticles {
  id: string;
  publishAt: string;
  headerImage: string;
  tags: string[];
  content: string;
  authorId: string;
  likes: string[];
  comments: string[];
  views: string[];
}


export const fetchAuthorArticles = async (authorId: string): Promise<AuthorArticles[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));

    const articlesData: AuthorArticles[] = querySnapshot.docs
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
      .filter((article) => article.authorId === authorId); // Filter articles based on authorId

    return articlesData;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};



// Fetch List of Recent Articles List
export interface RecentArticles {
  id: string;
  publishAt: string;
  headerImage: string;
  tags: { name: string; hash: string }[]
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
}

export const fetchArticles = (callback: (articles: RecentArticles[]) => void): Unsubscribe => {
  const articlesCollectionRef = collection(db, "articles");

  const unsubscribe = onSnapshot(articlesCollectionRef, (querySnapshot: QuerySnapshot) => {
    const articlesData: RecentArticles[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        articlesData.push({
          id: doc.id,
          publishAt: doc.data().publishAt || "",
          headerImage: doc.data().headerImage || "",
          tags: doc.data().tags || [],
          content: doc.data().content || {},
          authorId: doc.data().authorId || "",
          likes: doc.data().likes || [],
          comments: doc.data().comments || [],
          views: doc.data().views || [],
          slug: doc.data().slug || "",
          // ... other properties
        });
      });
    }

    callback(articlesData);
  });

  return unsubscribe;
};



//  Fetch Tags Categories
export interface Tags {
  id: string;
  name: string;
  image: string;
  followers: string[];
  hash: string;
  follow: () => Promise<void>;
  unfollow: () => Promise<void>;
}

export const fetchAllTags = (): Promise<Tags[]> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(query(collection(db, "tags")), (snapshot) => {
      const tags: Tags[] = [];

      snapshot.forEach((docSnapshot) => {
        const { name, image, followers, hash } = docSnapshot.data();
        const tagsId = docSnapshot.id;

        tags.push({
          id: tagsId,
          name: name || "",
          image: image || "",
          followers: followers || [],
          hash: hash || "",
          follow: async () => {
            try {
              const currentUser = auth.currentUser?.uid; // Function to get the current user ID
              const tagRef = doc(db, "tags", tagsId);

              await updateDoc(tagRef, {
                followers: arrayUnion(currentUser),
              });

              console.log(`User ${currentUser} followed tag ${tagsId}.`);
            } catch (error) {
              console.error(`Error following tag ${tagsId}:`, error);
            }
          },
          unfollow: async () => {
            try {
              const currentUser = auth.currentUser?.uid; // Function to get the current user ID
              const tagRef = doc(db, "tags", tagsId);

              await updateDoc(tagRef, {
                followers: arrayRemove(currentUser),
              });

              console.log(`User ${currentUser} unfollowed tag ${tagsId}.`);
            } catch (error) {
              console.error(`Error unfollowing tag ${tagsId}:`, error);
            }
          },
        });
      });

      resolve(tags);
    }, reject);

    // Cleanup the listener when needed
    return () => unsubscribe();
  });
};


