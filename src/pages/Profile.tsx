import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { db, auth } from "../utils/firebase";
import { collection, onSnapshot, query,  DocumentData  } from "firebase/firestore";
import AuthorArticle from "../components/Author/AuthorsArticle";
import AuthorProfile from "../components/Author/AuthorProfile";
import { Box, Divider } from "@chakra-ui/react";
import SEO from "../components/SEO";
import SkeletonPage from "../components/Skeleton/SkeletonPage";

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
}

const Profile = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersQuery = query(usersCollection);
        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
          const updatedUsers: Users[] = [];

          snapshot.forEach((doc) => {
            const { displayName, email, photoURL, userName, userBio, userTagLine, techStack, location } =
              doc.data() as DocumentData;
            const userId = doc.id;

            updatedUsers.push({
              userId, displayName, email, photoURL, userName, userBio, userTagLine, techStack, location,
            });
          });

          setUsers(updatedUsers);
          setIsLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchUsers();
  }, []);

  const { username } = useParams();

  // Find the user object based on the username parameter
  const user = users.find((u) => u.userName === username);

  if (!user) {
    // Handle case when user is not found
    return <SkeletonPage/>;
  }

  return (
   <>
    <SEO title={`${user.displayName} - Chatte`} description='' name='' type='' />
    
    <div>
      <AuthorProfile users={users} currentUser={currentUser} isLoading={isLoading}  />
      <Divider pt={4} ></Divider>
      <AuthorArticle userId={user.userId} />
       <Box  h='200px' bg='blue.800'>
      </Box>
    </div>
   </>
  );
};

export default Profile;







