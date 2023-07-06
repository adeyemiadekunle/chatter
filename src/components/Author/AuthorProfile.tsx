import { useState, useEffect } from "react";
import { Box, HStack, Text, Avatar, VStack, Button, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { followAuthor } from "../FollowingAuthor";
import SkeletonPage from "../Skeleton/SkeletonPage";

interface UserProfileProps {
  users: any[];
  currentUser: any;
}

interface UserProfileProps {
  users: any[];
  currentUser: any;
  isLoading: boolean;
}

const AuthorProfile = ({ users, currentUser, isLoading }: UserProfileProps) => {
  const [user, setUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [FollowingCount, setFollowingCount] = useState(0);
  const [FollowersCount, setFollowersCount] = useState(0);

  const { username } = useParams();

  useEffect(() => {
    const selectedUser = users.find((u) => u.userName === username);
    setUser(selectedUser);
    const userRef = doc(db, "users", selectedUser.userId);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const { followers, following } = doc.data();
        setIsFollowing(followers.includes(currentUser));
        setFollowersCount(followers?.length);
        setFollowingCount(following?.length);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [users, username, currentUser]);

  const handleFollow = async () => {
    await followAuthor(user.userId, isFollowing, currentUser); // Pass the updated value to followAuthor
  };

  if (!user) {
    // Handle case when user is not found
    return <SkeletonPage />;
  }

  // Render the user profile using the user object
  return (
    <>
      <Box maxW={{ base: "100%", md: "1280px" }} m="0 auto" px={[4, 0]}  >
        <VStack
          // border={"1px solid #E2E8F0"}
          minH="300px"
          maxW={{ base: "100%", md: "1024px" }}
          m="0 auto"
          borderRadius="10px"
          mt={6}
          p={4}
          className="selected-div"
          boxShadow="xs"
        >
          <VStack hideFrom="md" spacing={2} w="100%" >
            <Box>
               <SkeletonCircle size="24" isLoaded={!isLoading} >
                  <Avatar size="xl" name={user.displayName} src={user.photoURL} />
               </SkeletonCircle>
            </Box>
            <Box>
            <SkeletonText  noOfLines={1}  skeletonHeight='5'   isLoaded={!isLoading}  >
                  <Text fontSize="32px" fontWeight="700" whiteSpace='nowrap'>
                    {user.displayName}
                  </Text>
            </SkeletonText>
            </Box>

           <Box>
              <SkeletonText  noOfLines={1}  skeletonHeight='3'  isLoaded={!isLoading}  >
                    <Text fontWeight="500">{user.userTagLine} </Text>
              </SkeletonText>
           </Box>
           
            <Box>
              <HStack>
                {isFollowing ? (
                  <Button
                    fontSize='base'
                    isDisabled={currentUser === user.userId}
                    onClick={handleFollow}
                    rightIcon={<CheckIcon />}
                  >
                    Unfollow
                  </Button>
                ) : (
                   <Button
                   fontSize='base'
                    isDisabled={currentUser === user.userId}
                    onClick={handleFollow}
                    rightIcon={<AddIcon />}
                  >
                    Follow
                  </Button>
                )}
              </HStack>
            </Box>
            <HStack>
              <Text fontWeight="500">{FollowersCount} Followers</Text>
              <Text fontWeight="500"> {FollowingCount} Following </Text>
            </HStack>

            <HStack w="100%" py={1} justifyContent="center" spacing={5}>
              <Text>Twitter</Text>
              <Text>Facebook</Text>
              <Text>Github</Text>
            </HStack>
          </VStack>

          {/* Desktop  */}
          <HStack
            minH="250px"
            justifyContent="space-between"
            px="100px"
            w="100%"
            hideBelow="md"
          >
            <HStack justifyContent="space-between" spacing={5}>
              <Box>
                <Skeleton size='12' borderRadius='full'  isLoaded={!isLoading} >
                <Avatar
                  size="2xl"
                  name={user.displayName}
                  src={user.photoURL}
                />
                </Skeleton>
              </Box>
              <VStack alignItems="flex-start">
               <Box>
                  <SkeletonText  noOfLines={1}  skeletonHeight='6'  isLoaded={!isLoading}  >
                      <Text fontSize="32px" fontWeight="700">
                        {user.displayName}
                      </Text>
                    </SkeletonText>
               </Box>
                <Box>
                  <SkeletonText  noOfLines={1}  skeletonHeight='3'   isLoaded={!isLoading} >
                    <Text fontWeight="500">{user.userTagLine} </Text>
                  </SkeletonText>
                </Box>
                <HStack>
                  <Text fontWeight="500">{FollowersCount} Followers</Text>
                  <Text fontWeight="500"> {FollowingCount} Following </Text>
                </HStack>
              </VStack>
            </HStack>
            <Box>
              <HStack>
                {isFollowing ? (
                  <Button
                  fontSize='base'
                    isDisabled={currentUser === user.userId}
                    onClick={handleFollow}
                    rightIcon={<CheckIcon />}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                  fontSize='base'
                    isDisabled={currentUser === user.userId}
                    onClick={handleFollow}
                    rightIcon={<AddIcon />}
                  >
                    Follow
                  </Button>
                )}
              </HStack>
            </Box>
          </HStack>
          <HStack
            w="100%"
            py={1}
            justifyContent="center"
            spacing={5}
            hideBelow="md"
          >
            <Text>Twitter</Text>
            <Text>Facebook</Text>
            <Text>Github</Text>
          </HStack>
        </VStack>
      </Box>

      <Box
        display={{ base: "row", md: "flex" }}
        maxW={{ base: "100%", md: "1024px" }}
        m={{ base: "0", md: " 24px auto" }}
        justifyContent={{ base: "center", md: "space-between" }}
        flexDir={{ base: "column", md: "row" }}
        p={{ base: 4, md: 0 }}
      >
        <Box
           className="selected-div"
           boxShadow="xs"
          w={{ base: "100%", md: "300px" }}
          h="300px"
          borderRadius="10px"
          p={4}
        >
          <Text fontWeight="500" fontSize="20px" mb={2}>
            About Me
          </Text>
        </Box>

        <Box
           className="selected-div"
           boxShadow="xs"
          w={{ base: "100%", md: "300px" }}
          h="300px"
          borderRadius="10px"
          p={4}
          mt={{ base: 6, md: 0 }}
        >
          <Text fontWeight="500" fontSize="20px" mb={2}>
            {" "}
            My Tech Stack
          </Text>
          {user.techStack.map((tag) => (
            <Button
              key={tag.hash}
              m={1}
              variant={"outline"}
              borderRadius={"15px"}
              colorScheme={"blue"}
              size={"sm"}
            >
              {tag.name}
            </Button>
          ))}
        </Box>

        <Box
         className="selected-div"
         boxShadow="xs"
          w={{ base: "100%", md: "300px" }}
          h="300px"
          borderRadius="10px"
          p={4}
          mt={{ base: 6, md: 0 }}
        >
          <Text fontWeight="500" fontSize="20px" mb={2}>
            I am availabe for
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default AuthorProfile;
