import { collection, doc, setDoc, addDoc, getDoc, deleteDoc, query, getDocs, where } from "firebase/firestore";
import { db, auth } from './firebase';

// Fetch User Data
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


//  updateUserData
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


// fetchAllUsers
export const fetchAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users: UserData[] = [];

    querySnapshot.forEach((doc) => {
      const { displayName, email, photoURL, userName, userBio, userTagLine, techStack, location,
      } = doc.data();

      users.push({ displayName, email, photoURL, userName, userBio, userTagLine, techStack, location,
      });
    });

    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
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


// publishArticle
// export const publishArticle = async (headerImage: string, tags: string[], content: string) => {
//   try {
//     const articleRef = await addDoc(collection(db, "articles"), {
//       publishAt: new Date().toISOString(),
//       authorId: auth.currentUser?.uid,
//       headerImage,
//       tags,
//       content,
//       likes: [],
//       comments: [],
//       views: [],
//     });
//     console.log("Article published with ID:", articleRef.id);
//   } catch (error) {
//     console.error("Error publishing article:", error);
//   }
// };

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



//  fetchDraft
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
    console.log("Draft deleted successfully");
  } catch (error) {
    console.error("Error deleting draft:", error);
  }
};


//  Fetch User Drafts
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


// for User Published Articles

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


//  Fetch Author Data

export interface Author {
    displayName: string;
    email: string;
    photoURL: string;
    userTagLine: string  
}


export const fetchAuthorData = async (authorId: string) => {
  try {
    const docRef = doc(db, "users", authorId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { displayName, email, photoURL, userTagLine } = docSnap.data() as Author;
      return { displayName, email, photoURL, userTagLine };
    } else {
      console.log("Author not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching author data:", error);
    return null;
  }
};





// Fetch Article
interface Article {
  publishAt: string; 
  headerImage: string; 
  tags: string[];
  content: string; 
  authorId: string;
  likes: string[];
  comments: string[];
  views: string[];
}

export const fetchArticle = async (articleId: string) => {
  try {
    const docRef = doc(db, "articles", articleId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const {
        publishAt, headerImage,  tags, content, authorId, likes, comments, views,
      } = docSnap.data() as Article;

      return {
        publishAt, headerImage, tags, content, authorId, likes, comments, views,
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




// Fetch Articles

export interface Articles {
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
}

export const fetchArticles = async (): Promise<Articles[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));

    const articlesData: Articles[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      publishAt: doc.data().publishAt || '', 
      headerImage: doc.data().headerImage || '', 
      tags: doc.data().tags || [], 
      content: doc.data().content || {}, 
      authorId: doc.data().authorId || '', 
      likes: doc.data().likes || [], 
      comments: doc.data().comments || [], 
      views: doc.data().views || [], 
      // ... other properties
    }));

    return articlesData;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

