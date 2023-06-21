import { Box, HStack, Text, Image, Heading, VStack, Avatar, Link } from "@chakra-ui/react";

import { HeaderOutput } from "editorjs-react-renderer";
import { FormattedDate } from "../../utils/FormatDate";
import TextTrimmingWithEllipsis from "../../utils/TextTrimming";
import { NavLink } from "react-router-dom";

type ArticleCardProps = {
  Title: any;
  Paragraph: any;
  HeaderImage: string;
  PublishDate: string;
  alt: string;
  AvatarImage: string;
  displayName: string;
  username: string;
  slug: string;
};

const ArticleCard = ({
  Title,
  Paragraph,
  alt,
  HeaderImage,
  PublishDate,
  AvatarImage,
  displayName,
  username,
  slug
}: ArticleCardProps) => {
  const maxLength = 100;

  return (
    <>
      <Box className="selected-div" p={3} borderRadius='10px' boxShadow="xs"  

        >
        
      <Box w="350px" >
        <VStack w="100%" spacing={0}>
          <Box w="100%">
            <Link as={NavLink} to={`/${username}/${slug}`} >
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
          <Heading fontSize='24px'>
           <Link as={NavLink} to={`/${username}/${slug}`}>
            <HeaderOutput  data={Title} />
           </Link>
          </Heading>
          <HStack w="100%" fontSize='14px' spacing={2}>
            <Avatar src={AvatarImage} name={displayName} size={'sm'}/>
            <Text>{FormattedDate(PublishDate)} </Text> <Text>10 Min Read</Text>
          </HStack>
          <Text pt={0}>
            <TextTrimmingWithEllipsis text={Paragraph} maxLength={maxLength} />
          </Text>
        </VStack>
      </Box>
      </Box>
    </>
  );
};

export default ArticleCard;
