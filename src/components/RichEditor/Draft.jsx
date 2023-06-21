import { useEffect, useRef, useState, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import {  updateDraft, publishDraft, fetchDraft } from "../../utils/helperFunctions";
import { useParams, useNavigate } from "react-router-dom";
import { Button, useDisclosure, Flex, HStack, IconButton, Tooltip, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Input} from "@chakra-ui/react";
import ImageHeader from "./ImageHeader";
import PublishDrawer from "./PublishDrawer";
import { ViewSidebarOutlined } from "@mui/icons-material";
import { create, debounce,} from "lodash"

// editorjs tools
import Undo from 'editorjs-undo';
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Raw from '@editorjs/raw'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import editorjsCodeflask from '@calumk/editorjs-codeflask';
import ImageToolsConfig from './ImageToolsConfig'


const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Let`s write an awesome article!",
        level: 1,
      },
    },
  ],
};


const EditorComponent = ({ IsOpen, onToggle }) => {
  const ejInstance = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [slugUrl, setSlugUrl] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const { draftId } = useParams();
  const navigate = useNavigate();
  const btnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()



  const handleUpdateDraft = useCallback(
    debounce(async () => {
      const content = await getEditorContent()
      const image = imageUrl;
      updateDraft(draftId, image, content);
      <Alert status="success">
        <AlertIcon/>
         Draft Saved
      </Alert>
    }, 30000), // 5 minutes in milliseconds
    [draftId, imageUrl]
    
  );


  const initEditor = useCallback(async () => {
    // Retrieve the initial data from the database
    const existingData = await fetchDraft(draftId);
    const initialData = existingData ? existingData.content : DEFAULT_INITIAL_DATA;
    const existingImage = existingData ? existingData.headerImage : "";
    setImageUrl(existingImage);
   

    const editor = new EditorJS({
      holder: "editorjs",
      onReady: async () => {
        ejInstance.current = editor;
        new Undo({ editor });
      },
      autofocus: true,
      data: initialData,
      onChange: handleUpdateDraft,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        text: {
          class: Paragraph,
          inlineToolbar: true,
        },
        embed: Embed,
        inlineCode: InlineCode,
        quote: Quote,
        marker: Marker,
        checklist: CheckList,
        raw: Raw,
        code : editorjsCodeflask,            
        table: Table,
        list: List,
        image: ImageToolsConfig,
      },
      inlineToolbar: true,
    });
  }, [draftId,  handleUpdateDraft]);


  const getEditorContent = async () => {
    return await ejInstance.current.saver.save();
  };

  const handleSaveDraft = useCallback(async () => {
    const content = await getEditorContent();
    const image = imageUrl;
    updateDraft(draftId, image, content, );
  }, [draftId, imageUrl, getEditorContent]);
  


// Get the editor content and save it to state
 useEffect(() => {
  async function getEditorContent() {
    const content = await ejInstance.current.saver.save();
    setContent(content);
  }
  getEditorContent();
}, [ejInstance.current]);

//


  const handlePublish = useCallback(async () => {
    const content = await getEditorContent();
    const image = imageUrl;
    const tags = selectedTags;
    const slug = slugUrl;

    if (draftId) {
      // Update existing draft and publish
      updateDraft(draftId, image, content);
      publishDraft(draftId, tags, slug );
      navigate("/feed/recent");
    } else {
      // Publish a new draft
      console.log("No draft ID available. Cannot publish.");
    }
  }, [draftId, getEditorContent, imageUrl, selectedTags, navigate, slugUrl]);


  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  
  return (
     <>
        <Box minH={"100vh"} pb={'200px'} >
          <HStack justifyContent={"space-between"} mt={2} p={3} mb={3}  >
            <Box>
              <Tooltip label="Toggle Sidebar" aria-label="Open Sidebar" hideBelow='md' hasArrow>
                <IconButton  aria-label="Open Sidebar" onClick={onToggle} icon={<ViewSidebarOutlined/>}/>
              </Tooltip>
            </Box>
            <HStack spacing={8}>
              <Button onClick={handleSaveDraft}>Save</Button>
              <Button ref={btnRef} onClick={onOpen}>
                Publish
              </Button>
            </HStack>
          </HStack>

          <Box px={{base: '30px', md: '100px'}}  >
            <Flex flexDir={"column"}  >
              <ImageHeader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              
              <Box id="editorjs" ></Box>
              <PublishDrawer
                onClick={handlePublish}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                slug={slugUrl}
                setSlug={setSlugUrl}
                content={content}
              />
            </Flex>
          </Box>
        </Box>
     </>
  );
};

export default EditorComponent;
