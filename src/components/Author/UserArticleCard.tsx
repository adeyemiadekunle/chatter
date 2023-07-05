import { Box, HStack, Text, Image, Heading, VStack, Avatar, Link } from "@chakra-ui/react";
import { fetchAuthorData, Author  } from "../../utils/helperFunctions";
import { HeaderOutput } from "editorjs-react-renderer";
import { FormattedDate } from "../../utils/FormatDate";
import TextTrimmingWithEllipsis from "../../utils/TextTrimming";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

type ArticleCardProps = {
  Title: any;
  Paragraph: any;
  HeaderImage: string;
  PublishDate: string;
  alt: string;
  slug: string;
  authorId: string;
};

const ArticleCard = ({
  Title,
  Paragraph,
  alt,
  HeaderImage,
  PublishDate,
  slug,
  authorId
}: ArticleCardProps) => {

  const [author, setAuthor] = useState<Author | null>(null);
  const maxLength = 100;


    // fetch Author Data
    useEffect(() => {
      const fetchAuthor = async () => {
        const authorData = await fetchAuthorData(authorId);
        setAuthor(authorData);
      };
  
      fetchAuthor();
    }, [authorId]);

  return (
    <>
      <Box className="selected-div" p={3} borderRadius='10px' boxShadow="xs"  >
        
      <Box w="350px" >
        <VStack w="100%" spacing={0}>
          <Box w="100%" mb={1}>
            <Link as={NavLink} to={`/${author?.userName}/${slug}`} >
            <Image
              src={HeaderImage}
              alt={alt}
              h={{ base: "170px", md: "200px" }}
              w={"100%"}
              borderRadius={"5px"}
              rounded="md"
              objectFit="cover"
            />
            </Link>
          </Box>
          <Heading fontSize='md'>
           <Link as={NavLink} to={`/${author?.userName}/${slug}`}>
            <HeaderOutput  data={Title} />
           </Link>
          </Heading>
          <HStack w="100%"  spacing={2}>
            <Avatar src={author?.photoURL} name={author?.displayName} size={'sm'}/>
            <Text fontSize='sm'>{FormattedDate(PublishDate)} </Text> <Text fontSize='sm'>10 Min Read</Text>
          </HStack>
          <Text pt={0} fontSize='base'>
            <TextTrimmingWithEllipsis text={Paragraph} maxLength={maxLength} />
          </Text>
        </VStack>
      </Box>
      </Box>
    </>
  );
};

export default ArticleCard;
