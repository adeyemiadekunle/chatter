import React, { useEffect, useState } from 'react';
import { TagCount, getTagCounts } from '../../../utils/helperFunctions';
import {Box, Text, List, ListItem, Link} from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';

const TagCountsComponent: React.FC = () => {
  const [tagCounts, setTagCounts] = useState<TagCount[]>([]);

  useEffect(() => {
    const fetchTagCounts = async () => {
      const counts = await getTagCounts();
      setTagCounts(counts);
    };

    fetchTagCounts();
  }, []);

 
  return (
    <Box>
      {tagCounts.length > 0 ? (
        <List>
          {tagCounts.slice(0, 5).map((tagCount) => (
            <Link as={NavLink} to={`/t/${tagCount.tag.hash}`} key={tagCount.tag.hash} cursor='pointer'>
              <ListItem key={tagCount.tag.hash} pb={2}>
                <Text fontSize='base' whiteSpace='nowrap' >{tagCount.tag.name}</Text>
                {/* <Flex gap={2} alignItems='center'>
                <Image src={tagCount.tag.image} alt={tagCount.tag.name} boxSize='20px' /> 
                  <p>Hash: {tagCount.tag.hash}</p>
                  <p>Article Count: {tagCount.count}</p>
                </Flex> */}
              </ListItem>
          </Link>
          ))}
        </List>
      ) : (
        <p>No tag counts available.</p>
      )}
    </Box>
  );
};

export default TagCountsComponent;
