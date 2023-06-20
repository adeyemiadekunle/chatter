import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../utils/helperFunctions";
import Output from "editorjs-react-renderer";
import { VStack, Box, HStack, Image, Tag, TagLabel } from "@chakra-ui/react";

interface TagData {
  name: string;
  hash: string;
}

interface ArticleDetailsProps {
  user?: string;
  tags: TagData[];
}


const ArticleDetails: React.FC<ArticleDetailsProps> = () => {
  const [contents, setContents] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const getArticle = async () => {
      const article = await fetchArticle(slug ?? "");
      if (article) {
        const { content, headerImage, tags } = article;
        setContents(content);
        setImageUrl(headerImage);
        setSelectedTags(tags);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getArticle();
  }, [slug]);

  return (
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
              {selectedTags.map((tag: any) => (
                <Tag size="lg" key={tag.hash}>
                  <TagLabel>{tag.name}</TagLabel>
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
  );
};

export default ArticleDetails;
