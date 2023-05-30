import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, setDoc, doc, getDocs, addDoc, deleteDoc, getDoc, auth, collection, where, query, updateDoc } from '../utils/firebase';

type Article = {
  id: string;
  title: string;
  content: string;
  // Add other properties as needed
};

const useArticleManagement = () => {
  const [articles, setArticles] = useState<Article[]>([]); // Explicitly define the type
  const [draftArticle, setDraftArticle] = useState<{ id: string; title: string; content: string }>({ id: '', title: '', content: '' });
  const [draftArticles, setDraftArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch published articles
    const fetchPublishedArticles = async () => {
      setIsLoading(true);
      try {
        // Create a query for filtering documents
        const articlesQuery = query(collection(db, 'articles'), where('published', '==', true));

        // Execute the query
        const querySnapshot = await getDocs(articlesQuery);;
        const publishedArticles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Article[];
        setArticles(publishedArticles);
      } catch (error) {
        console.error('Error fetching published articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishedArticles(); // Fetch published articles on component mount
  }, []);


  // Function to create a new draft article
  // Function to create a new draft article
const createDraftArticle = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated.');
    }
    
    const userDocRef = doc(db, 'users', user.uid); // Reference to the user document
    const draftsCollectionRef = collection(userDocRef, 'drafts'); // Reference to the drafts subcollection
    
    const newDraftArticleRef = await addDoc(draftsCollectionRef, { title: '', content: '' });
    const draftArticleId = newDraftArticleRef.id;

    // Update the URL with the draft article ID

    navigate(`/draft/${draftArticleId}`);

    console.log('Draft article created successfully!');
  } catch (error) {
    console.error('Error creating draft article:', error);
  }
};



  // Function to save/update a draft article
// Function to save/update a draft article
const saveDraftArticle = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated.');
    }

    const draftArticleRef = doc(db, 'users', user.uid, 'drafts', draftArticle.id);

    await setDoc(draftArticleRef, {
      title: draftArticle.title,
      content: draftArticle.content,
      updatedAt: new Date().toISOString(),
    });

    console.log('Draft article saved successfully!');
  } catch (error) {
    console.error('Error saving draft article:', error);
  }
};

  
  
  


  // Function to fetch draft articles
  const fetchDraftArticles = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated.');
      }

      const draftsQuery = query(collection(db, 'users', user.uid, 'drafts'));
      const querySnapshot = await getDocs(draftsQuery);
      const fetchedDraftArticles = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Article[];
      setDraftArticles(fetchedDraftArticles);
    } catch (error) {
      console.error('Error fetching draft articles:', error);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
  if (user) {
    fetchDraftArticles(); // Fetch draft articles if the user is authenticated
  }
  }, []);



  // Function to open a draft article for editing
  const openDraftArticle = async (articleId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated.');
      }
      const draftArticleRef = doc(
        collection(db, 'users', user.uid, 'drafts', articleId)
      );
      const draftSnapshot = await getDoc(draftArticleRef);
      const draftData = draftSnapshot.data() as Article | undefined;
      setDraftArticle(draftData?.id ? draftData : { id: '', title: '', content: '' });
    } catch (error) {
      console.error('Error opening draft article:', error);
    }
  }


  // Function to publish a draft article
  const publishDraftArticle = async (draftId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated.');
      }

      const draftRef = doc(db, 'users', user.uid, 'drafts', draftId);
      const draftSnapshot = await getDoc(draftRef);
      const draftData = draftSnapshot.data();

      const articlesRef = collection(db, 'articles');
      const newArticleRef = doc(articlesRef, draftId);

      const newArticleData = {
        title: draftData?.title || '', // Use draftData's title if available, otherwise use an empty string
        content: draftData?.content || '', // Use draftData's content if available, otherwise use an empty string
        publicationDate: new Date().toISOString(),
        authorId: user.uid,
        authorName: user.displayName,
        authorProfileImage: user.photoURL,
        likes: 0,
        comments: 0,
        views: 0,
      };

      await setDoc(newArticleRef, newArticleData);

      // Delete the draft once it is published
      await deleteDoc(draftRef);

      console.log('Draft published successfully.');
    } catch (error) {
      console.error('Error publishing draft:', error);
    }
  };



  return {
    articles,
    draftArticle,
    isLoading,
    draftArticles,
    setDraftArticle,
    createDraftArticle,
    saveDraftArticle,
    publishDraftArticle,
    openDraftArticle,
    fetchDraftArticles
  };
};

export default useArticleManagement;
