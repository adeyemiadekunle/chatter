import { useEffect, useRef, useReducer, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./constant";
import {  updateDraft, publishDraft, fetchDraft } from "../../utils/helperFunctions";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
import ImageHeader from "../ImageHeader";
import PublishDrawer from "../PublishDrawer";


const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};
const initialState = {
  imageUrl: "",
  selectedTags: [],
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE_URL":
      return { ...state, imageUrl: action.payload };
    case "SET_SELECTED_TAGS":
      return { ...state, selectedTags: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};



const EditorComponent = () => {
  const ejInstance = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { imageUrl, selectedTags, isLoading } = state;
  const { draftId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const btnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getEditorContent = useCallback(async () => {
    return await ejInstance.current.saver.save();
  }, []);

  const handleEditorChange = useCallback(async () => {
    const content = await getEditorContent();

    // Save or update the draft using updateDraft(content)
    localStorage.setItem(`content-${draftId}`, JSON.stringify(content));
  }, [getEditorContent, draftId]);

  const initEditor = useCallback(async () => {

    // Retrieve the initial data from the database
    const existingData = await fetchDraft(draftId);
    const initialData = existingData ? existingData.content : DEFAULT_INITIAL_DATA;
    const existingImage = existingData ? existingData.image : "";
    setImageUrl(existingImage);

    // Retrieve the content from local storage
    const storedContent = localStorage.getItem(`content-${draftId}`);
    const parsedContent = storedContent ? JSON.parse(storedContent) : null;

    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
        setIsLoading(false);
      },
      autofocus: true,
      data: parsedContent || initialData,
      onChange: handleEditorChange,
      tools: EDITOR_JS_TOOLS,
      inlineToolbar: true,
    });
  }, [draftId,  handleEditorChange]);

  const handleUpdateDraft = useCallback(async () => {
    const content = await getEditorContent();
    const image = imageUrl;
    updateDraft(draftId, image, content);
  }, [draftId, getEditorContent, imageUrl]);



  const handlePublish = useCallback(async () => {
    const content = await getEditorContent();
    const image = imageUrl;
    const tags = selectedTags;

    if (draftId) {
      // Update existing draft and publish
      updateDraft(draftId, image, content);
      publishDraft(draftId, tags);
      navigate("/");
    } else {
      // Publish a new draft
      console.log("No draft ID available. Cannot publish.");
    }
  }, [draftId, getEditorContent, imageUrl, selectedTags, navigate]);


  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);


  // Remove the content from local storage when the user navigates away from the page
  useEffect(() => {
    const handleRemoveLocalStorage = () => {
      localStorage.removeItem(`content-${draftId}`);
    };
    handleRemoveLocalStorage();
    return () => {
      handleRemoveLocalStorage();
    };
  }, [location, draftId]);

  const setImageUrl = (imageUrl) => {
    dispatch({ type: "SET_IMAGE_URL", payload: imageUrl });
  };
  
  const setSelectedTags = (tags) => {
    dispatch({ type: "SET_SELECTED_TAGS", payload: tags });
  };
  
  const setIsLoading = (loading) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ImageHeader imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <div id="editorjs"></div>
      <PublishDrawer onClick={handlePublish} isOpen={isOpen} onClose={onClose} btnRef={btnRef} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <Button onClick={handleUpdateDraft}>Update Draft</Button>
      <Button ref={btnRef} onClick={onOpen}>Publish</Button>
    </div>
  );
};

export default EditorComponent;
