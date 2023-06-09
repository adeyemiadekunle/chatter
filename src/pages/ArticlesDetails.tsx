import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../utils/helperFunctions";
import Output from 'editorjs-react-renderer';

import { VStack, Box, HStack, Image, Tag, TagLabel } from '@chakra-ui/react';

type State = {
  contents: string;
  imageUrl: string;
  selectedTags: string[];
  loading: boolean;
};

type Action =
  | { type: "SET_CONTENTS"; payload: string }
  | { type: "SET_IMAGE_URL"; payload: string }
  | { type: "SET_SELECTED_TAGS"; payload: string[] }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: State = {
  contents: "",
  imageUrl: "",
  selectedTags: [],
  loading: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CONTENTS":
      return { ...state, contents: action.payload };
    case "SET_IMAGE_URL":
      return { ...state, imageUrl: action.payload };
    case "SET_SELECTED_TAGS":
      return { ...state, selectedTags: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const ArticleDetails: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { contents, imageUrl, selectedTags, loading } = state;
  const { articleId } = useParams();

  useEffect(() => {
    const getArticle = async () => {
      const article = await fetchArticle(articleId);
      const articleContent = article ? article.content : "";
      const articleImage = article ? article.image : "";
      const articleTags = article ? article.tags : [];

      dispatch({ type: "SET_CONTENTS", payload: articleContent });
      dispatch({ type: "SET_IMAGE_URL", payload: articleImage });
      dispatch({ type: "SET_SELECTED_TAGS", payload: articleTags });
      dispatch({ type: "SET_LOADING", payload: false });
    };

    getArticle();
  }, [articleId]);

  return (
    <>
      <Box>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <VStack>
            <Box>
              <Image src={imageUrl} />
            </Box>
            <Box>
              <HStack>
                {selectedTags.map((tag) => (
                  <Tag size="lg" key={tag}>
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                ))}
              </HStack>
            </Box>
            <Box>
              <Output data={contents} />
            </Box>
          </VStack>
        )}
      </Box>
    </>
  );
};

export default ArticleDetails;
