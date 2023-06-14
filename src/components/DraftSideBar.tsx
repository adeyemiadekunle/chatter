import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import { fetchUserDrafts, Drafts, fetchUserArticles, UserArticles } from "../utils/helperFunctions";
import { HeaderOutput } from "editorjs-react-renderer";
import { useNavigate } from "react-router-dom";



const DraftSidebar = () => {
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState([] as Drafts[]);
  const [articles, setArticles] = useState([] as UserArticles[]);
  
//  for Drafts
  useEffect(() => {
    const fetchDrafts = async () => {
      const fetchedDrafts = await fetchUserDrafts();
      setDrafts(fetchedDrafts);
    };

    fetchDrafts();
  }, []);


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
  const fetchArticles = async () => {
    const fetchedArticles = await fetchUserArticles();
    setArticles(fetchedArticles);
  };
   fetchArticles();
}
, []);

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
                        <Box key={draft.id} cursor={'pointer'} onClick={()=> navigate(`/draft/${draft.id}`)} >
                          {headerBlocks.map((headerBlock: any) => (
                            <HeaderOutput key={headerBlock.id} data={headerBlock.data} />
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
