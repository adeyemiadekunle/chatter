import React, { useEffect, useState } from "react";
import { getDocs, collection, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebaseConfig";

const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch the tags from Firestore
    const fetchTags = async () => {
      const querySnapshot = await getDocs(collection(db, "tags"));
      const tagsData = querySnapshot.docs.map((doc) => doc.data());
      setTags(tagsData);
    };

    fetchTags();
  }, []);

  const handleTagToggle = async (tagId, isFollowing) => {
    const tagRef = doc(db, "tags", tagId);

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

  return (
    <div>
      <h2>Tags</h2>
      {tags.map((tag) => (
        <label key={tag.id}>
          <input
            type="checkbox"
            checked={tag.followers.includes(userId)}
            onChange={() =>
              handleTagToggle(tag.id, tag.followers.includes(userId))
            }
          />
          {tag.name}
        </label>
      ))}
    </div>
  );
};

export default TagList;
