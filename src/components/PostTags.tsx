import { useState, useRef, ChangeEvent } from 'react';
import { Tag, TagLabel, TagCloseButton, Input, VStack, HStack, List, ListItem } from '@chakra-ui/react';


const availableTags: string[] = ['JavaScript', 'TypeScript', 'React', 'AI', 'Health', 'AWS', 'Google'];

type PostTagsProps = {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
};

const PostTags: React.FC<PostTagsProps> = ({ selectedTags, setSelectedTags }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTags: string[] = availableTags.filter((tag) =>
    tag.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleTagSelect = (tag: string): void => {
    setSelectedTags([...selectedTags, tag]);
    setSearchValue('');
    setIsInputFocused(true);
    inputRef.current?.focus();
  };

  const handleTagDeselect = (tag: string): void => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleInputFocus = (): void => {
    setIsInputFocused(true);
  };

  const handleInputBlur = (): void => {
    setIsInputFocused(false);
  };

  return (
    <VStack align="flex-start">
      <HStack>
        {selectedTags?.map((tag) => (
          <Tag
            key={tag}
            size="lg"
            variant="solid"
            colorScheme="teal"
          >
            <TagLabel color={'whiteAlpha.900'}>{tag}</TagLabel>
            <TagCloseButton onClick={() => handleTagDeselect(tag)} />
          </Tag>
        ))}
      </HStack>
      <br />
      <Input
        ref={inputRef}
        placeholder="Add tags"
        value={searchValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        variant='flushed'
      />
      {(isInputFocused || searchValue !== '') && (
        <List spacing={2} listStyleType="none" border={'1px solid gray.50'} w={'100%'} height={'300px'} overflowY={'scroll'}>
          {filteredTags.map((tag) => (
            <ListItem
              w={'100%'}
              p={3}
              key={tag}
              _hover={{ backgroundColor: 'gray.50', color: 'black', cursor: 'pointer' }}
              onClick={() => handleTagSelect(tag)}
            >
              {tag}
            </ListItem>
          ))}
        </List>
      )}
    </VStack>
  );
};

// PostTags.propTypes = {
//   selectedTags: PropTypes.array.isRequired,
//   setSelectedTags: PropTypes.func.isRequired,
// };

export default PostTags;
