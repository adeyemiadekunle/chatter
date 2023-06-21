import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../utils/helperFunctions';
import Output from 'editorjs-react-renderer';
import {
  VStack,
  Box,
  HStack,
  Image,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import {styles} from '../components/ArticleStyle'

// interface TagData {
//   name: string;
//   hash: string;
//   tags: string[];
// }

// interface ArticleDetailsProps {
//   user?: string;
//   tags: TagData[];
// }

const ArticleDetails = () => {
  const [contents, setContents] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const getArticle = async () => {
      const article = await fetchArticle(slug ?? '');
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
    <Box >
      <Box maxW={{base: '100%', md: '800px'}} m='0 auto' >
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
            <Output data={contents} style={styles} />
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ArticleDetails;
