import { collection, doc, setDoc, addDoc, getDoc, deleteDoc, query, getDocs, where } from "firebase/firestore";
import { db, auth } from './firebase';


//  createDraft
export const createDraft = async (headerImage: string, tags: string[], content: string) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not logged in");
    return;
  } try {
    const userDocRef = doc(db, "users", user.uid);
    const draftRef = await addDoc(collection(userDocRef, "drafts"), {
      DraftAt: new Date().toISOString(),
      headerImage,
      tags,
      content,
    });
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
    await setDoc(doc(db, "drafts", draftId), {
       DraftAt: new Date().toISOString(),
       headerImage, 
       content
       }, { merge: true });
    console.log("Draft updated:", draftId);
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

//  fetchDrafts 
export const fetchDraft = async (draftId: string) => {
  try {
    const docRef = doc(db, "drafts", draftId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { headerImage, content } = docSnap.data() as { headerImage: string, content: string };
      return { headerImage, content };
    } else {
      console.log("Draft not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching draft:", error);
    return null;
  }
};

export const fetchArticle = async (articleId: string) => {
  try {
    const docRef = doc(db, "articles", articleId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { 
        headerImage,
        tags,
        content,
        authorId,
        likes,
        comments,
        views,
       } = docSnap.data() as { headerImage: string, tags: string[], content: string, authorId: string, likes: string[], comments: string[], views: string[] };
      return { headerImage, tags, content, authorId, likes, comments, views };
    } else {
      console.log("Article not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

// Fetch articles by author ID
const fetchArticlesByAuthor = async (authorId: string) => {
  try {
    // Get a reference to the articles collection
    const articlesRef = collection(db, 'articles');

    // Query the articles collection for articles with the specified author ID
    const q = query(articlesRef, where('authorId', '==', authorId));
    const querySnapshot = await getDocs(q);

    // Map the query snapshot to an array of article objects
    const  article = querySnapshot.docs.map((doc) => doc.data() as any);
    return article;

  } catch (error) {
    console.error('Error fetching articles by author:', error);
    return [];
  }
};
