const [tags, setTags] = useState([] as string[]);

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
        tags.every((tag) => article.tags.includes(tag))
      ) // Filter articles based on matching tags
      .sort((a, b) => b.views - a.views); // Sort articles based on views in descending order

    setTagsArticles(articlesData);
  });

  return unsubscribe;
}, [tags]);