import React, { useEffect, useState } from "react";
import { TagCount, getTagCounts } from "../../../utils/helperFunctions";
import { Box, Text, List, ListItem, Link, Flex, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import placeholder from "../../../assets/placeholder.avif";

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
    <Box px={3}>
      {tagCounts.length > 0 ? (
        <List>
          {tagCounts.slice(0, 5).map((tagCount) => (
            <Link
              as={NavLink}
              to={`/t/${tagCount.tag.hash}`}
              key={tagCount.tag.hash}
              cursor="pointer"
            >
              <ListItem key={tagCount.tag.hash} pb={2} pt={3}>
                <Flex  alignItems="center" justifyContent='space-between'>
                  <Flex gap={3}>
                    {tagCount.tag.image ? (
                      <Image
                        src={tagCount.tag.image}
                        alt={tagCount.tag.name}
                        boxSize="30px"
                      />
                    ) : (
                      <Image
                        src={placeholder}
                        alt={tagCount.tag.name}
                        boxSize="30px"
                      />
                    )}
                    <Text fontSize="base" whiteSpace="nowrap">
                      {tagCount.tag.name}
                    </Text>
                  </Flex>
                        <Text fontSize='12px'> 
                {tagCount.count === 1 ? (
                    <Text  fontSize='14px' >{tagCount.count} Article</Text>
                ) : tagCount.count >= 2 ? (
                    <Text fontSize='14px' >{tagCount.count} Articles</Text>
                ) : null}
                         </Text>
                </Flex>
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
