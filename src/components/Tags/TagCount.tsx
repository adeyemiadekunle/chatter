import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { Text, Box } from '@chakra-ui/react';

type TagCounts = Record<string, number>;

type TagCountsComponentProps = {
  hash: string;
};

const TagCountsComponent: React.FC<TagCountsComponentProps> = ({ hash }) => {
  const [tagCounts, setTagCounts] = useState<TagCounts>({});

  useEffect(() => {
    const fetchTagCounts = async () => {
      try {
        const articlesCollection = collection(db, 'articles');
        const articlesQuery = query(articlesCollection);
        const unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
          const counts: TagCounts = {};

          snapshot.forEach((doc) => {
            const { tags } = doc.data() as DocumentData;

            tags.forEach((tag: { hash: string }) => {
              if (tag.hash === hash) {
                const tagHash = tag.hash;
                counts[tagHash] = (counts[tagHash] || 0) + 1;
              }
            });
          });

          setTagCounts(counts);
        });

        return unsubscribe;
      } catch (error) {
        console.log('Error fetching tag counts:', error);
      }
    };

    fetchTagCounts();
  }, [hash]);

  return (
        <Box>
      {Object.entries(tagCounts).length > 0 ? (
      Object.entries(tagCounts).map(([tagHash, count]) => (
        <Text key={tagHash}>{count} {count === 1 ? 'Article' : 'Articles'}</Text>
          ))
        ) : (
          <Text>0 Articles</Text>
        )}
  </Box>
  
  );
};

export default TagCountsComponent;