import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";

interface Tag {
  id: string;
  name: string;
  followers: string[];
}

const TagList: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchTags = async () => {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagsData = querySnapshot.docs.map((doc) => doc.data() as Tag);
      setTags(tagsData);
    };

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(collection(db, "tags"), (snapshot) => {
      const updatedTagsData = snapshot.docs.map((doc) => doc.data() as Tag);
      setTags(updatedTagsData);
    });

    fetchTags();

    // Unsubscribe from real-time updates when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleTagToggle = async (tagId: string, isFollowing: boolean) => {
    const tagRef = doc(db, "tags", tagId);

    console.log(tagRef)
    // Update the followers array in Firestore
    if (isFollowing) {
      await updateDoc(tagRef, {
        followers: arrayRemove(userId),
      });
    } else {
      await updateDoc(tagRef, {
        followers: arrayUnion(userId),
      });
    }
  };
  
  // ...
  


  return (
    <div>
      <h2>Tags</h2>
      {tags.map((tag) => (
    <label key={tag.id}>
      <input
        type="checkbox"
        checked={tag.followers?.includes(userId || "") ?? false}
        onChange={() =>
          handleTagToggle(tag.id, tag.followers?.includes(userId || "") ?? false)
        }
        key={tag.id}
      />
      {tag.name}
    </label>
  ))}
    </div>
  );
};

export default TagList;
