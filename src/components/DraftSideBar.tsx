import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Icon,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot, where, query } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { deleteDraft, } from "../utils/helperFunctions";

export interface Drafts {
  id: string;
  headerImage: string;
  heading: string;
  content: {
    blocks: {
      type: string;
      data: {
        text: string;
      };
    }[];
  };
}

export interface UserArticles {
  id: string;
  heading: string;
  headerImage: string;
  content: {
    blocks: {
      type: string;
      data: {
        text: string;
      };
    }[];
  };
}

const DraftSidebar = () => {
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState([] as Drafts[]);
  const [articles, setArticles] = useState([] as UserArticles[]);
  
  const currentUser = auth.currentUser?.uid;


//  for Drafts
useEffect(() => {
  const unsubscribe = onSnapshot(
    
    query(collection(db, "drafts"), where("authorId", "==", currentUser)),
    (snapshot) => {
      const draftsData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      })) as Drafts[];
      setDrafts(draftsData);
    }
  );
  // Cleanup the listener when the component unmounts
  return () => {
    unsubscribe();
  };
}, [])


 const DraftCount = drafts.length;


 
//  for Published Articles
useEffect(() => {
  const unsubscribe = onSnapshot(
    
    query(collection(db, "articles"), where("authorId", "==", currentUser)),
    (snapshot) => {
      const ArticlesData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      })) as Drafts[];
      setArticles(ArticlesData);
    }
  );
  // Cleanup the listener when the component unmounts
  return () => {
    unsubscribe();
  };
}, [])


const handleDelete = (id: string) => {
  deleteDraft(id);
};


const ArticleCount = articles.length;


  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple={true}>
        <AccordionItem borderStyle={"none"}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontSize='base'>
              MY DRAFT ({DraftCount})
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Box>
            {
               drafts.length > 0 ? (
                        <Box >
                            {drafts.map((draft: any) => (
                             <>
                               <Flex alignItems='center' justifyContent='space-between' key={draft.id} >
                                  {draft.heading === "" ? (
                                    <Text fontSize='sm' >Untitled</Text>
                                  ) : (
                                    <Text fontSize='sm' >{draft.heading}</Text>
                                  )}
                                    <Menu >
                                      <MenuButton  mb={-2}  >
                                        <Icon as={MoreVertIcon} boxSize={4}  />
                                      </MenuButton>
                                      <MenuList  minW='50px' >
                                        <MenuItem onClick={()=> navigate(`/edit/${draft.id}`)}  >Edit</MenuItem>
                                        <MenuItem onClick={()=> handleDelete(`${draft.id}`) }  >Delete</MenuItem>
                                      </MenuList>             
                                    </Menu>
                               </Flex>
                             </>
                            ))}
                        </Box>
                  ) : (
                    <Text fontSize='sm'>No Saved Draft</Text>
                  )
                }
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderStyle={"none"}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontSize='base'>
              PUBLISHED ({ArticleCount})
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Box>
                {
                  articles.length > 0 ? (
                        <Box  cursor={'pointer'}>
                          {articles.map((article: any) => (
                            <Text>
                               {article.heading }
                            </Text>
                          ))}
                        </Box>
                  ) : (
                    <Text fontSize='sm'>No Published Articles</Text>
                  )
                }
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default DraftSidebar;
