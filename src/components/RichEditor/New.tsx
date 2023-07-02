import { useEffect, useRef, useState, useCallback } from "react";
import EditorJs from "@natterstefan/react-editor-js";
import {
  updateDraft,
  publishDraft,
} from "../../utils/helperFunctions";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  useDisclosure,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import ImageHeader from "./ImageHeader";
import PublishDrawer from "./PublishDrawer";
import { ViewSidebarOutlined } from "@mui/icons-material";
import { debounce } from "lodash";
import { EDITOR_JS_TOOLS } from "./constant";


const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "",
        level: 1,
      },
    },
  ],
};

type TagData = {
  id: string;
  name: string;
  image: string;
  hash: string;
  // followers: string[];
};


type EditorComponentProps = {
  IsOpen: boolean;
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
  IsOpen
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [slugUrl, setSlugUrl] = useState("");
  const [contents, setContents] = useState<Block>(DEFAULT_INITIAL_DATA);
 
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const { draftId } = useParams();
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editorInstanceRef = useRef<any>(null);


  const onReady = () => {
    console.log("Editor.js is ready to work!");
  };
   

  const onChange = async () => {
    if (editorInstanceRef.current) {
      const outputData = await editorInstanceRef.current.save();
      setContents(outputData);
      console.log("Current output:", outputData);
    }
    
  };
  

  useEffect(() => {
    const debouncedUpdateDraft = debounce(async () => {
      const content = contents;
      const image = imageUrl;

       if (!draftId){
        return null
       }
      updateDraft(draftId, image, content);
      localStorage.setItem('image', imageUrl)
      localStorage.setItem('editor', JSON.stringify(contents))
  
      console.log("Draft saved");
    }, 10000);

    debouncedUpdateDraft();

    return () => {
      debouncedUpdateDraft.cancel();
    };
  }, [contents, draftId, imageUrl]);


  const handlePublish = useCallback(async () => {
    const content = contents;
    const image = imageUrl;
    const tags = selectedTags;
    const slug = slugUrl;

    if (draftId) {
      updateDraft(draftId, image, content);
      publishDraft(draftId, tags, slug);
      navigate("/feed/recent");
    } else {
      console.log("No draft ID available. Cannot publish.");
    }
  }, [draftId, contents, imageUrl, selectedTags, navigate, slugUrl]);


  const onSave = async () => {
    const content = contents;
    const image = imageUrl;
    if (draftId) {
      updateDraft(draftId, image, content);
      console.log("Draft saved");
    }
  };

//  fetch data from localstorage
  let contentData = localStorage.getItem('editor')
  const jsonData = contentData ? JSON.parse(contentData) : null;
  // console.log( "localstor", jsonData)



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

        <Box px={{ base: "30px", md: "100px" }}>
          <Flex flexDir={"column"}>
            <ImageHeader imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <Box>
              <EditorJs
                data={jsonData}
                holder="editorjs"
                onReady={onReady}
                onChange={onChange}
                editorInstance={(instance) =>
                  (editorInstanceRef.current = instance)
                }
                tools={EDITOR_JS_TOOLS}
              />
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
              content={contents}
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default EditorComponent;
