import { collection, doc, setDoc, addDoc, getDoc, deleteDoc, query, getDocs, where, QuerySnapshot, Unsubscribe, onSnapshot, orderBy} from "firebase/firestore";
import { db, auth } from './firebase';


export interface Tags {
  id: string;
  name: string;
  image: string;
  hash: string;
  followers: string[];
}


// Fetch Login User Data
 export interface UserData {
  displayName: string;
  email: string;
  photoURL: string;
  userName: string;
  userBio: string;
  userTagLine: string;
  techStack: Tags[];
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
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "",
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
      content: DEFAULT_INITIAL_DATA,
      heading : '',
    });

    if ( typeof callback === 'function'){
      callback(draftRef.id)
    }

     
    console.log("Draft saved with ID:", draftRef.id);
  } catch (error) {
    console.error("Error saving article:", error);
  }
};

type Block = {
  time: number;
  blocks: {
    type: string;
    data: {
      text: string;
    };
  }[];
}

// updateDraft
export const updateDraft = async (draftId: string, headerImage: string, content: Block, heading: string) => {
  try {
    const draftRef = doc(db, "drafts", draftId);
    const snapshot = await getDoc(draftRef);

    if (snapshot.exists() && snapshot.data()?.authorId === auth.currentUser?.uid) {
      await setDoc(draftRef, {
        DraftAt: new Date().toISOString(),
        headerImage,
        content,
        heading
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
export const publishDraft = async (draftId: string, tags: Tags[], slug: string, _heading: string) => {
  try {
    const draftRef = doc(db, "drafts", draftId);
    const draftDoc = await getDoc(draftRef);

    if (draftDoc.exists()) {
      const { headerImage, content, heading } = draftDoc.data();

      const articleRef = await addDoc(collection(db, "articles"), {
      publishAt: new Date().toISOString(),
      authorId: auth.currentUser?.uid,
      headerImage,
      heading,
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
      const { headerImage, content, heading } = docSnap.data() as {
        headerImage: string;
        content: Block;
        heading: string;
      };
      return { headerImage, content, heading };
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
      content: doc.data().content || {}, // Provide a default value or modify as needed
      heading: doc.data().heading || ''
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
      content: doc.data().content || {},
      heading: doc.data().heading || '' // Provide a default value or modify as needed
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
    followers: string[];
    
}

export const fetchAuthorData = async (authorId: string) => {
  try {
    const docRef = doc(db, "users", authorId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { displayName, email, photoURL, userTagLine, userName, followers } = docSnap.data() as Author;
      console.log("Author found:", displayName);
      return { displayName, email, photoURL, userTagLine, userName, followers };
      
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
  id: string;
  publishAt: string; 
  headerImage: string; 
  heading: string;
  tags: string[];
  content: {
    blocks: {
      type: string;
      data: {
        level: number;
        text: string;
      };
    }[];
  };
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
    
      const { publishAt, headerImage, heading, tags, content, authorId, likes, comments, views, } = docSnapshot.data() as Article;
      const id = docSnapshot.id;
      return {
         id, publishAt, headerImage, heading, tags, content, authorId, likes, comments, views, 
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
  heading: string;
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


//   Fetch List of Recent Articles List by Publish Date
export const fetchRecents = (callback: (articles: RecentArticles[]) => void, publishAt?: string): Unsubscribe => {
  const articlesCollectionRef = collection(db, "articles");
  let articlesQuery = query(articlesCollectionRef);

  if (publishAt) {
    // If a publishAt date is provided, filter the articles based on it
    articlesQuery = query(articlesCollectionRef, orderBy("publishAt", "desc"), where("publishAt", "<=", publishAt));
  } else {
    // If no publishAt date is provided, fetch all articles ordered by publishAt date in descending order
    articlesQuery = query(articlesCollectionRef, orderBy("publishAt", "desc"));
  }

  const unsubscribe = onSnapshot(articlesQuery, (querySnapshot: QuerySnapshot) => {
    const articlesData: RecentArticles[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        articlesData.push({
          id: doc.id,
          publishAt: doc.data().publishAt || "",
          headerImage: doc.data().headerImage || "",
          heading: doc.data().heading || "",
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



// fetch For You Articles this function prioritizes the articles based on the tags and author followed by the user

export const fetchForYou = (callback: (articles: RecentArticles[]) => void, publishAt?: string): Unsubscribe => {
  const articlesCollectionRef = collection(db, "articles");
  let articlesQuery = query(articlesCollectionRef);

  const currentUser = auth.currentUser;
  const userId = currentUser?.uid;

  if (publishAt) {
    // If a publishAt date is provided, filter the articles based on it
    articlesQuery = query(articlesCollectionRef, orderBy("publishAt", "desc"), where("publishAt", "<=", publishAt));
  } else {
    // If no publishAt date is provided, fetch all articles ordered by publishAt date in descending order
    articlesQuery = query(articlesCollectionRef, orderBy("publishAt", "desc"));
  }

  const unsubscribe = onSnapshot(articlesQuery, async (querySnapshot: QuerySnapshot) => {
    const articlesData: RecentArticles[] = [];

    if (!querySnapshot.empty) {
      const followedAuthors: string[] = [];
      const followedTags: string[] = [];

      if (userId) {
        // Fetch followed authors and tags by the current user
        // Replace 'authors' with the collection reference for the authors in your Firestore
        const followedAuthorsQuery = query(collection(db, "users"), where("followers", "array-contains", userId));
        const followedTagsQuery = query(collection(db, "tags"), where("followers", "array-contains", userId));

        const followedAuthorsSnapshot = await getDocs(followedAuthorsQuery);
        const followedTagsSnapshot = await getDocs(followedTagsQuery);

        followedAuthorsSnapshot.forEach((doc) => {
          followedAuthors.push(doc.id);
        });

        followedTagsSnapshot.forEach((doc) => {
          followedTags.push(doc.id);
        });
      }

      querySnapshot.forEach((doc) => {
        const articleData = {
          id: doc.id,
          publishAt: doc.data().publishAt || "",
          headerImage: doc.data().headerImage || "",
          heading: doc.data().heading || "",
          tags: doc.data().tags || [],
          content: doc.data().content || {},
          authorId: doc.data().authorId || "",
          likes: doc.data().likes || [],
          comments: doc.data().comments || [],
          views: doc.data().views || [],
          slug: doc.data().slug || "",
          // ... other properties
        };

        const { authorId, tags } = articleData;
        const followsAuthor = followedAuthors.includes(authorId);
        const followsTags = tags.some((tag: { hash: string }) => followedTags.includes(tag.hash));

        // Add articles where the user follows the author or tags at the beginning of the list
        if (followsAuthor || followsTags) {
          articlesData.unshift(articleData);
        } else {
          articlesData.push(articleData);
        }
      });
    }

    callback(articlesData);
  });

  return unsubscribe;
};


// fetch Popular Articles by views and likes
export const fetchFeatured = (callback: (articles: RecentArticles[]) => void): Unsubscribe => {
  const articlesCollectionRef = collection(db, "articles");

  const unsubscribe = onSnapshot(articlesCollectionRef, (querySnapshot: QuerySnapshot) => {
    const articlesData: RecentArticles[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        articlesData.push({
          id: doc.id,
          publishAt: doc.data().publishAt || "",
          headerImage: doc.data().headerImage || "",
          heading: doc.data().heading || "",
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

    // Sort the articles array based on views and likes
    const sortedArticles = articlesData.sort((a, b) => {
      const aLikes = a.likes.length;
      const bLikes = b.likes.length;
      const aViews = a.views.length;
      const bViews = b.views.length;

      // First, compare the number of likes
      if (aLikes > bLikes) {
        return -1;
      } else if (aLikes < bLikes) {
        return 1;
      }

      // If the number of likes is the same, compare the number of views
      if (aViews > bViews) {
        return -1;
      } else if (aViews < bViews) {
        return 1;
      }

      // If both likes and views are the same, maintain the original order
      return 0;
    });

    callback(sortedArticles);
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
        });
      });

      resolve(tags);
    }, reject);

    // Cleanup the listener when needed
    return () => unsubscribe();
  });
};




// Trending Tags

type Tag = {
  name: string;
  image: string;
  hash: string;
};

export type TagCount = {
  tag: Tag;
  count: number;
};

export const getTagCounts = async (): Promise<TagCount[]> => {
  try {
    // Fetch all articles
    const articlesCollection = collection(db, 'articles');
    const articlesQuery = query(articlesCollection);
    const querySnapshot = await getDocs(articlesQuery);

    const tagCounts: Record<string, TagCount> = {};

    // Iterate through articles and collect tag counts
    querySnapshot.forEach((doc) => {
      const { tags } = doc.data();
      tags.forEach((tag: Tag) => {
        const { hash } = tag;
        if (tagCounts[hash]) {
          tagCounts[hash].count++;
        } else {
          tagCounts[hash] = {
            tag,
            count: 1,
          };
        }
      });
    });

    // Convert tag counts to an array and sort by count in descending order
    const sortedTagCounts = Object.values(tagCounts).sort((a, b) => b.count - a.count);

    return sortedTagCounts;
  } catch (error) {
    console.log('Error fetching tag counts:', error);
    return [];
  }
};


