import { useState, useEffect } from "react";
import {Box, Flex, Image, Text, HStack, Link, Avatar, Skeleton,  SkeletonCircle, Heading} from '@chakra-ui/react'
import { fetchAuthorData, Author  } from "../../utils/helperFunctions";
import { FormattedDate } from '../../utils/FormatDate'
import { NavLink } from "react-router-dom";




const PostCard = ({authorId, PublishDate, isLoading, HeaderImage, Title, slug}) => {
    const [author, setAuthor] = useState<Author | null>(null);
    const [AuthorLoading, setAuthorLoading] = useState(true);
   // fetch Author Data

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = await fetchAuthorData(authorId);
      setAuthor(authorData);
      setAuthorLoading(false);
    };

    fetchAuthor();
  }, [authorId]);


  return (
    <>
      <Link as={NavLink} to={`/${author?.userName}/${slug}`}  >
            
        <HStack  justifyContent='space-between' p={{base: '1', md: '6'}} h={{base: '150px', md: '180px'}} _hover={{bg: 'gray.100'}} borderBottom='1px solid white' >
              <Box w='65%' >
                  <Box w='100%' >
                      <HStack>
                      <SkeletonCircle size='12' isLoaded={!AuthorLoading} >
                        <Avatar src={author?.photoURL} name={author?.displayName} size={'md'}></Avatar>
                      </SkeletonCircle>
                      <Box w='100%' >
                          <Skeleton isLoaded={!AuthorLoading} >
                              <Heading fontSize='base' fontWeight={'700'}>{author?.displayName}</Heading>
                          </Skeleton>
                        <Flex gap={4}  pt={1} >
                          <Skeleton isLoaded={!isLoading} >
                              <Text  fontSize='sm' >{FormattedDate(PublishDate)} </Text> 
                            </Skeleton>
                          <Text  fontSize='sm' >10 Min Read</Text> </Flex>
                    </Box>

                      </HStack>
                      <Skeleton isLoaded={!isLoading}  >
                          <Heading as='h3' fontSize='md' fontWeight={'700'} cursor='pointer'  mt={3}   >
                            {Title}
                          </Heading>
                    </Skeleton>

                  </Box>
              </Box>
          <Box w='35%'  my={3} >
                <Skeleton isLoaded={!isLoading} >
                      <Image src={HeaderImage}  h={{base:'80px', md: '100px' }} w={'100%'} borderRadius={'5px'}  boxShadow='xs'  rounded='md'  objectFit='cover' />
                </Skeleton>
          </Box>
        </HStack>
      </Link>
    </>
  )
}

export default PostCard