import { collection, doc, setDoc, addDoc, getDoc, deleteDoc, query, getDocs, where } from "firebase/firestore";
import { db, auth } from './firebase';

//  User Data
 export interface UserData {
  displayName: string;
  email: string;
  photoURL: string;
}

export const fetchUserData = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not logged in");
      return null;
    }

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { displayName, email, photoURL } = docSnap.data() as {
        displayName: string;
        email: string;
        photoURL: string;
      };
      return { displayName, email, photoURL };
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};


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


//  createDraft
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
export const publishArticle = async (headerImage: string, tags: string[], content: string) => {
  try {
    const articleRef = await addDoc(collection(db, "articles"), {
      publishAt: new Date().toISOString(),
      authorId: auth.currentUser?.uid,
      headerImage,
      tags,
      content,
      likes: [],
      comments: [],
      views: [],
    });
    console.log("Article published with ID:", articleRef.id);
  } catch (error) {
    console.error("Error publishing article:", error);
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
export const publishDraft = async (draftId: string, tags: string[]) => {
  try {
    const draftRef = doc(db, "drafts", draftId);
    const draftDoc = await getDoc(draftRef);

    if (draftDoc.exists()) {
      const { headerImage, content } = draftDoc.data();

      const articleRef = await addDoc(collection(db, "articles"), {
      publishAt: new Date().toISOString(),
      authorId: auth.currentUser?.uid,
      headerImage,
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
 export interface Draft {
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

export const fetchUserDrafts = async (): Promise<Draft[]> => {
  const user = auth.currentUser;
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "drafts"), where("authorId", "==", user?.uid))
    );

    const draftsData: Draft[] = querySnapshot.docs.map((doc) => ({
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

 export interface Article {
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

export const fetchUserArticles = async (): Promise<Article[]> => {
  const user = auth.currentUser;
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "articles"), where("authorId", "==", user?.uid))
    );

    const UserArticleData: Article[] = querySnapshot.docs.map((doc) => ({
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
}


export const fetchAuthorData = async (authorId: string) => {
  try {
    const docRef = doc(db, "users", authorId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { displayName, email, photoURL } = docSnap.data() as {
        displayName: string;
        email: string;
        photoURL: string;
      };
      return { displayName, email, photoURL };
    } else {
      console.log("Author not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching author data:", error);
    return null;
  }
};

//  Fetch Article
export const fetchArticle = async (articleId: string) => {
  try {
    const docRef = doc(db, "articles", articleId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { 
        publishAt,
        headerImage,
        tags,
        content,
        authorId,
        likes,
        comments,
        views,
       } = docSnap.data() as { publishAt: string, headerImage: string, tags: string[], content: string, authorId: string, likes: string[], comments: string[], views: string[] };
      return {publishAt, headerImage, tags, content, authorId, likes, comments, views };
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

export interface Article {
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

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));

    const articlesData: Article[] = querySnapshot.docs.map((doc) => ({
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

