import {Box, Image, Text, HStack, Link, Skeleton,} from '@chakra-ui/react';
import { NavLink } from "react-router-dom";
import placeholder from "../../assets/placeholder.avif";
import TagCountsComponent from '../Tags/TagCount';

const TagsCard = ({hash, tagCount, followers, image, isLoading}) => {
  return (
    <>
    <Link as={NavLink} to={`/t/${hash}`} >
      <Box  p={5} _hover={{bg: 'gray.100'}} borderBottom='1px solid white' >
        <HStack justifyContent='space-between'>
            <Box>
                <Skeleton isLoaded={!isLoading} ><Text fontSize='md' fontWeight='600' >{`#${hash}`}</Text></Skeleton>
                <HStack>
                  <Text >
                    <TagCountsComponent hash={tagCount} />
                  </Text>
                  <Text >{followers} Followers</Text>
                </HStack>
            </Box>
            <Box>
              <Skeleton isLoaded={!isLoading}>
                 {
                    image ? (
                      <Image
                        src={image}
                        alt={hash}
                        boxSize="60px"
                      />
                    ) : (
                      <Image
                        src={placeholder}
                        alt={hash}
                        boxSize="60px"
                      />
                    )
                 }
              </Skeleton>
            </Box>
        </HStack>
      </Box>
    </Link>
    </>
  )
}

export default TagsCard