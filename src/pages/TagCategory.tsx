import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useParams } from "react-router-dom";
import {  auth } from '../utils/firebase';
import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import TagsFeed from "../components/Tags/TagsFeed";
import { TagsProfile } from "../components/Tags/TagProfile";

interface RightBarContainerProps {
  children: React.ReactNode;
  height: string;
  display: any;
}

  
interface Tags {
  id: string;
  name: string;
  image: string;
  followers: string[];
  hash: string;
}

const Container = ({ children, height, display }: RightBarContainerProps) => {
  const bg = useColorModeValue("white", "#0F172A");
  const color = useColorModeValue("#0F172A", "white");

  return (
    <Box
      display={display}
      bg={bg}
      color={color}
      borderRadius={"8px"}
      className="selected-div"
      minH={height}
    >
      {children}
    </Box>
  );
};

//  TagCategory
const TagCategory = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const  [articleCount, setArticleCount] = useState(0);
  const user = auth.currentUser?.uid;

  useEffect(() => {
    const fetchAllTags = (): Promise<Tags[]> => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(collection(db, "tags"), (snapshot) => {
          const updatedTags: Tags[] = [];

          snapshot.forEach((doc) => {
            const { name, image, followers, hash } = doc.data();
            const tagId = doc.id;

            updatedTags.push({
              id: tagId,
              name: name || "",
              image: image || "",
              followers: followers || [],
              hash: hash || "",
      
            });
          });

          resolve(updatedTags);
        }, reject);

        // Cleanup the listener when needed
        return unsubscribe;
      });
    };

    fetchAllTags()
      .then((tags) => setTags(tags))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);



  const { hash } = useParams();
  const tag = tags.find((t) => t.hash === hash);
  console.log("hash", hash);

  if (!tag) {
    return <Box>Tag not found.</Box>;
  }


  return (
    <>
      <Box
        display={{ base: "block", md: "flex" }}
        // mx={{ base: "0", md: "100px" }}
        maxW={{ base: "100%,", md: "1280px" }}
        m="0 auto"
        gap={8}
        mt={8}
      >
        {/* Main */}
        <Box flex={{ base: "none", md: "1" }}>
          <Box mb={8}>
            <Container height={"300px"} display={"block"}>
              <TagsProfile tags={tags} user={user} ArticleCount={articleCount} />
            </Container>
          </Box>
          <Box>
            <Container height={"600px"} display={"block"}>
              <TagsFeed />
            </Container>
          </Box>
        </Box>

        {/* RightBar */}
        <Box w={{ base: "none", md: "300px" }}>
          <Container height={"300px"} display={{ base: "none", md: "block" }}>
            <h2>Hello</h2>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default TagCategory;
