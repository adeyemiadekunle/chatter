import { useEffect, useState } from "react";
import {
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import {
  Box,
  HStack,
  VStack,
  Button,
  Image,
  Text,
  Heading,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import TagCountsComponent from "./TagCount";

interface TagsProfileProps {
  tags: any[];
  user?: string;
  isLoading: boolean;

}



const followTag = async (tagId: string, isFollowing: boolean, user: string, ) => {
  try {
    const currentUser = user;
    const tagRef = doc(db, "tags", tagId);
    let currentUserRef: DocumentReference<DocumentData> | null = null;

    if (currentUser) {
      currentUserRef = doc(db, "users", currentUser);
    } else {
      console.log("currentUser is undefined or null");
    }

    if (isFollowing) {
      await updateDoc(tagRef, {
        followers: arrayRemove(currentUser),
      });

      if (currentUserRef) {
        await updateDoc(currentUserRef, {
          tagFollow: arrayRemove(tagId),
        });
      } else {
        console.error("currentUserRef is null");
      }

      console.log(`User ${currentUser} unfollowed tag ${tagId}.`);
    } else {
      await updateDoc(tagRef, {
        followers: arrayUnion(currentUser),
      });

      if (currentUserRef) {
        await updateDoc(currentUserRef, {
          tagFollow: arrayUnion(tagId),
        });
      }

      console.log(`User ${currentUser} followed tag ${tagId}.`);
    }
  } catch (error) {
    console.error(`Error updating tag ${tagId}:`, error);
  }
};

interface Tags {
  id: string;
  name: string;
  image: string;
  followers: string[];
  hash: string;
  user: string;
 
}

// Tags Profile
export const TagsProfile = ({ tags, user, isLoading }: TagsProfileProps) => {
  const [tag, setTag] = useState<Tags | null>(null);
  const { hash } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [FollowersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const selectedTag = tags.find((t) => t.hash === hash);
    setTag(selectedTag);
    const tagRef = doc(db, "tags", selectedTag?.id || "");
    const unsubscribe = onSnapshot(tagRef, (doc) => {
      if (doc.exists()) {
        const { followers } = doc.data();
        setIsFollowing(followers.includes(user || ""));
        setFollowersCount(followers.length);
      }
    });
    return unsubscribe;
  }, [tags, hash]);

  const handleFollowClick = async () => {
    await followTag(tag?.id || "", isFollowing, user || "");
  };

  


  return (
    <VStack h="300px" justifyContent="center">
      <VStack spacing={6} w="100%">
        <HStack spacing={3} justifyContent="center">
          <Skeleton  borderRadius={5}  isLoaded={!isLoading} >
            {tag?.image  ?  <Box borderRadius={5} p={2} border="1px solid gray">
              <Image src={tag?.image} boxSize="50px" />
            </Box> : null}
            </Skeleton>
          <Box>
            <SkeletonText  noOfLines={1} skeletonHeight='4' isLoaded={!isLoading} >
                <Heading as="h3" fontSize="28px">
                  {tag?.name}{" "}
                </Heading>
            </SkeletonText>
            <SkeletonText  noOfLines={1} skeletonHeight='2' isLoaded={!isLoading}  mt={2}>
                 <Text>#{tag?.hash} </Text>
            </SkeletonText>
          </Box>
        </HStack>
        <HStack spacing={4} justifyContent="center">
          {isFollowing ? (
            <Button fontSize='base' onClick={handleFollowClick} rightIcon={<CheckIcon />}>
              Unfollow
            </Button>
          ) : (
            <Button fontSize='base' onClick={handleFollowClick} rightIcon={<AddIcon />}>
              Follow
            </Button>
          )}
          <Button fontSize='base'>Write An Article</Button>
        </HStack>
        <HStack spacing={4} justifyContent="center">
          <Text>{FollowersCount} followers</Text>
             { tag &&  <TagCountsComponent hash={tag.hash} />} 
          <Box>Twitter</Box>
          <Box>Share</Box>
        </HStack>
      </VStack>
    </VStack>
  );
};
