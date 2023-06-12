import { useEffect, useRef, useReducer } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  useDisclosure,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { ViewSidebarOutlined } from "@mui/icons-material";
// editorjs
import EditorJS from "@editorjs/editorjs";
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


import { createDraft, publishArticle } from "../../utils/helperFunctions";
import { useLocation } from "react-router-dom";
import ImageHeader from "../ImageHeader";
import PublishDrawer from "../PublishDrawer";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: " Let`s write an awesome article!",
        level: 1,
      },
    },
  ],
};

// Define the initial state and reducer function for managing the state
const initialState = {
  imageUrl: "",
  selectedTags: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE_URL":
      return { ...state, imageUrl: action.payload };
    case "SET_SELECTED_TAGS":
      return { ...state, selectedTags: action.payload };
    default:
      return state;
  }
};

const EditorComponent = ({ IsOpen, onToggle }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { imageUrl, selectedTags } = state;
  const ejInstance = useRef();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
        new Undo({ editor });
        loadSavedContent(); // Load saved content from local storage
      },
      placeholder: "Let`s write an awesome article!",
      data: DEFAULT_INITIAL_DATA,
      onChange: handleEditorChange,
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
  };

  const handleEditorChange = async () => {
    const content = await getEditorContent();
    console.log("Content:", content);
    saveContentToLocalStorage(content); // Save content to local storage
  };

  // //  save drafts
  // const handleCreateDraft = async () => {
  //   const image = imageUrl;
  //   const tags = selectedTags;
  //   const content = await getEditorContent();
  //   createDraft(image, tags, content);
  // };

  // publish article
  const handlePublish = async () => {
    const image = imageUrl;
    const tags = selectedTags;
    const content = await getEditorContent();
    publishArticle(image, tags, content);
  };

  const getEditorContent = async () => {
    return await ejInstance.current.saver.save();
  };

  const saveContentToLocalStorage = (content) => {
    localStorage.setItem("editorContent", JSON.stringify(content));
  };

  const loadSavedContent = () => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      ejInstance.current.render(parsedContent);
    }
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  

  const setImageUrl = (imageUrl) => {
    dispatch({ type: "SET_IMAGE_URL", payload: imageUrl });
  };

  const setSelectedTags = (selectedTags) => {
    dispatch({ type: "SET_SELECTED_TAGS", payload: selectedTags });
  };

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
            <Button onClick={handleCreateDraft}>Save</Button>
            <Button ref={btnRef} onClick={onOpen}>
              Publish
            </Button>
          </HStack>
        </HStack>

        <Box px={{base: '30px', md: '100px'}} border={'1px solid red'} >
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
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default EditorComponent;
