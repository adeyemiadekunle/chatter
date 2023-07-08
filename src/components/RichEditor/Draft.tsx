import { useEffect, useRef, useState, useCallback } from "react";
import EditorJs from "@natterstefan/react-editor-js";
import {
  updateDraft,
  publishDraft,
  Tags,
  fetchDraft,
} from "../../utils/helperFunctions";
import { useParams, useNavigate,  } from "react-router-dom";
import {
  Button,
  useDisclosure,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  Box,
  Input,
} from "@chakra-ui/react";
import ImageHeader from "./ImageHeader";
import PublishDrawer from "./PublishDrawer";
import { ViewSidebarOutlined } from "@mui/icons-material";
import { debounce } from "lodash";
import { EDITOR_JS_TOOLS } from "./constant";
import {Undo} from 'editorjs-undo'


const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "",
      },
    },
  ],
};



type EditorComponentProps = {
  onToggle: () => void;
};

type Block = {
  time: number;
  blocks: {
    type: string;
    data: {
      text: string;
    };
  }[];
}


const EditorComponent: React.FC<EditorComponentProps> = ({
  onToggle,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [slugUrl, setSlugUrl] = useState("");
  const [contents, setContents] = useState<Block>(DEFAULT_INITIAL_DATA);
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const { draftId } = useParams();
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editorInstanceRef = useRef<any>(null);
 


  useEffect(() => {
    const fetchData = async () => {
   
      try {
        if (!draftId) {
          console.log('Draft ID is undefined');
          return;
        }
        const draftData = await fetchDraft(draftId);

        if (draftData) {
          setImageUrl(draftData.headerImage);
          setContents(draftData.content);
          setTitle(draftData.heading);
          // Process the fetched draft data
        } else {
          // Handle case where draft is not found or unauthorized access
          console.log('Draft not found or unauthorized access');
        }
      } catch (error) {
        // Handle error that occurred during fetching
        console.error('Error fetching draft:', error);
      }
    };

    fetchData();
  }, []);


  const onReady = () => {
    const editor = editorInstanceRef.current;
        new Undo({ editor }); 
    console.log("Editor.js is ready to work!");
  };
   

  const onChange = async () => {
    if (editorInstanceRef.current) {
      const outputData = await editorInstanceRef.current.save();
      setContents(outputData);
    }
    
  };


//  debounce(onChange, 1000)
  useEffect(() => {
    const debouncedUpdateDraft = debounce(async () => {
      const content = contents;
      const image = imageUrl;
      const heading = title;

       if (!draftId){
        return null
       }
      updateDraft(draftId, image, content, heading);
      localStorage.setItem('myeditor', JSON.stringify(contents))
      console.log("Draft saved");
    }, 5000);

    debouncedUpdateDraft();

    return () => {
      debouncedUpdateDraft.cancel();
    };
  }, [contents, draftId, imageUrl, title]);


//  handle publish
  const handlePublish = useCallback(async () => {
    const content = contents;
    const image = imageUrl;
    const tags = selectedTags;
    const slug = slugUrl;
    const heading = title;  

    if (draftId) {
      updateDraft(draftId, image, content, heading);
      publishDraft(draftId, tags, slug, heading);
      navigate("/recent");
      localStorage.removeItem('myeditor')
    } else {
      console.log("No draft ID available. Cannot publish.");
    }
  }, [draftId, contents, imageUrl, selectedTags, navigate, slugUrl, title]);

// handle save
  const onSave = async () => {
    const content = contents;
    const image = imageUrl;
    const heading = title;
    if (draftId) {
      updateDraft(draftId, image, content, heading);
      console.log("Draft saved");
    }
  };

 //  fetch data from localstorage
  let contentDataJson: Block | undefined ;
  const contentData = localStorage.getItem('myeditor')
  if (contentData) {
    contentDataJson = JSON.parse(contentData)
  } 



  return (
    <>
      <Box minH={"100vh"} pb={"200px"}>
        <HStack justifyContent={"space-between"} mt={2} p={3} mb={3}>
          <Box>
            <Tooltip
              label="Toggle Sidebar"
              aria-label="Open Sidebar"
              hideBelow="md"
              hasArrow
            >
              <IconButton
                aria-label="Open Sidebar"
                onClick={onToggle}
                icon={<ViewSidebarOutlined />}
              />
            </Tooltip>
          </Box>
          <HStack spacing={8}>
            <Button fontSize="base" onClick={onSave}>
              Save
            </Button>
            <Button fontSize="base" ref={btnRef} onClick={onOpen}>
              Publish
            </Button>
          </HStack>
        </HStack>

        <Box px={{ base: "30px", md: "100px" }} >
          <Flex flexDir={"column"}>
            <Box bg='white' px={2}>
              <ImageHeader imageUrl={imageUrl} setImageUrl={setImageUrl} />
               <Box >
                <Input
                  placeholder="Let's write Awesome!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant={"unstyled"}
                  fontSize = 'xl'
                  fontWeight='700'
                  py={4}
                />
               </Box>
              <Box>
                <EditorJs
                  data={contentDataJson}
                  holder="editorjs"
                  onReady={onReady}
                  onChange={onChange}
                  autofocus={true}
                  editorInstance={(instance) =>
                    (editorInstanceRef.current = instance)
                  }
                  tools={EDITOR_JS_TOOLS} 
                  placeholder="Let continue writing..."
                />
              </Box>
            </Box>
            <PublishDrawer
              onClick={handlePublish}
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              slug={slugUrl}
              setSlug={setSlugUrl}
              content={title}
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default EditorComponent;


