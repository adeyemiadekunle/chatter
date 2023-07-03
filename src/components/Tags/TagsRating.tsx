import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { Text, Box, Image, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';


type TagCounts = Record<string, number>;
type TagData = {
  tag: string;
  count: number;
  image: string;
  name: string;
  hash: string;
};

const TagsRatingComponent: React.FC = () => {
  const [tagData, setTagData] = useState<TagData[]>([]);

  useEffect(() => {
    const fetchTagCounts = async () => {
      try {
        const articlesCollection = collection(db, 'articles');
        const articlesQuery = query(articlesCollection);
        const unsubscribe = onSnapshot(articlesQuery, async (snapshot) => {
          const counts: TagCounts = {};

          snapshot.forEach((doc) => {
            const { tags } = doc.data() as DocumentData;

            tags.forEach((tag: { hash: string }) => {
              const tagHash = tag.hash;
              counts[tagHash] = (counts[tagHash] || 0) + 1;
            });
          });

          // Convert the counts object to an array of TagData objects
          const tagDataArray: TagData[] = [];

          for (const [tagHash, count] of Object.entries(counts)) {
            const tagDocRef = doc(db, 'tags', tagHash);
            const tagDocSnapshot = await getDoc(tagDocRef);

            if (tagDocSnapshot.exists()) {
              const { name, image, hash } = tagDocSnapshot.data() as DocumentData;
              tagDataArray.push({
                tag: tagHash,
                count,
                image,
                name,
                hash,
              });
            }
          }

          // Sort the tagDataArray in descending order based on the article count
          tagDataArray.sort((a, b) => b.count - a.count);

          setTagData(tagDataArray);
        });

        return unsubscribe;
      } catch (error) {
        console.log('Error fetching tag counts:', error);
      }
    };

    fetchTagCounts();
  }, []);

  return (
    <Box>
      {tagData.length > 0 ? (
        tagData.slice(0, 5).map(({ tag, count, image, name, hash }) => (
          <Link as={NavLink} to={`/t/${hash}`} key={tag} display="flex" alignItems="center" _hover={{ textDecoration: 'none' }}>
          <Box key={tag} display="flex" alignItems="center">
            <Image src={image} alt={name} width={10} height={10} marginRight={2} />
            <Text>{name} - {count} Article{count !== 1 ? 's' : ''}</Text>
          </Box>
          </Link>
        ))
      ) : (
        <Text>No tags found.</Text>
      )}
    </Box>
  );
};

export default TagsRatingComponent;
