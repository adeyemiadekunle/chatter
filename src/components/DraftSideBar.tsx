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
import { HeaderOutput } from "editorjs-react-renderer";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot, where, query } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { deleteDraft, } from "../utils/helperFunctions";

export interface Drafts {
  id: string;
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

export interface UserArticles {
  id: string;
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


  const DraftHeaderLevel1 = (blocks: any) => {
    return blocks.filter(
      (block: any) => block.type === "header" && block.data.level === 1
    );
  };

  const headerBlocks = DraftHeaderLevel1(
    drafts.length > 0 ? drafts[0].content.blocks : []
  );
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



const ArticleHeaderLevel1 = (blocks: any) => {
  return blocks.filter(
    (block: any) => block.type === "header" && block.data.level === 1
  );
};
 
const headerBlocksArticle = ArticleHeaderLevel1(
  articles.length > 0 ? articles[0].content.blocks : []
);
const ArticleCount = articles.length;


  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple={true}>
        <AccordionItem borderStyle={"none"}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              MY DRAFT ({DraftCount})
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Box>
            {
               drafts.length > 0 ? (
                    drafts.map((draft) => (
                      <Box key={draft.id}>
                        <Box key={draft.id}   >
                            {headerBlocks.map((headerBlock: any) => (
                             <>
                               <Flex alignItems='center' justifyContent='space-between' >
                                  <Text > <HeaderOutput key={headerBlock.id} data={headerBlock.data} />  </Text>
                                    <Menu >
                                      <MenuButton  mb={-2}  >
                                        <Icon as={MoreVertIcon} boxSize={4}  />
                                      </MenuButton>
                                      <MenuList  minW='50px' >
                                        <MenuItem onClick={()=> navigate(`/draft/${draft.id}`)}  >Edit</MenuItem>
                                        <MenuItem onClick={()=> handleDelete(`${draft.id}`) }  >Delete</MenuItem>
                                      </MenuList>             
                                    </Menu>
                               </Flex>
                             </>
                            ))}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Text>No Saved Draft</Text>
                  )
                }
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderStyle={"none"}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              PUBLISHED ({ArticleCount})
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Box>
                {
                  articles.length > 0 ? (
                    articles.map((article) => (
                      <Box key={article.id}>
                        <Box  key={article.id} cursor={'pointer'}>
                          {headerBlocksArticle.map((headerBlock: any) => (
                            <HeaderOutput key={headerBlock.id} data={headerBlock.data} />
                          ))}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Text>No Published Articles</Text>
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
