import { Box, HStack, Text, Image, Heading, VStack } from "@chakra-ui/react";

import { HeaderOutput } from "editorjs-react-renderer";
import { FormattedDate } from "../../utils/FormatDate";
import TextTrimmingWithEllipsis from "../../utils/TextTrimming";

type ArticleCardProps = {
  Title: any;
  Paragraph: any;
  HeaderImage: string;
  PublishDate: string;
  alt: string;
};

const ArticleCard = ({
  Title,
  Paragraph,
  alt,
  HeaderImage,
  PublishDate,
}: ArticleCardProps) => {
  const maxLength = 100;

  return (
    <>
      <Box w="350px" >
        <VStack w="100%" spacing={0}>
          <Box w="100%">
            <Image
              src={HeaderImage}
              alt={alt}
              h={{ base: "170px", md: "200px" }}
              w={"100%"}
              borderRadius={"5px"}
              boxShadow="xs"
              rounded="md"
              objectFit="cover"
            />
          </Box>
          <Heading fontSize='24px'>
            <HeaderOutput  data={Title} />
          </Heading>
          <HStack w="100%" fontSize='14px'>
            <Text>{FormattedDate(PublishDate)} </Text> <Text>10 Min Read</Text>
          </HStack>
          <Text pt={0}>
            <TextTrimmingWithEllipsis text={Paragraph} maxLength={maxLength} />
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default ArticleCard;
