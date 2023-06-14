import { useState, useEffect } from "react";
import { Box, Input, Text, VStack} from "@chakra-ui/react";

function createSlug(title: string): string {
  let slug = title.toLowerCase();

  slug = slug.replace(/[^a-zA-Z0-9\s-]/g, "");
  slug = slug.trim().replace(/\s+/g, "-");

  slug = slug.replace(/\b(a|an|and|but)\b/g, "");

  slug = slug.slice(0, 50);

  // Add forward slash at the beginning of the slug
  slug = "/" + slug;

  // Generate a random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  // Append the random number to the slug
  slug += "-" + randomNum;

  return slug;
}


interface SlugProps {
  slug: string;
  content: any;
  setSlug: any;
}

function Slug({ slug, content, setSlug }: SlugProps) {

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    async function extractHeaderLevel1() {
      if (content && content.blocks) {
        const headerBlock = content.blocks.find(
          (block: { type: string; data: { level: number; }; }) => block.type === "header" && block.data.level === 1
        );
        return headerBlock ? headerBlock.data.text : "";
      }
      return "";
    }

    function generateSlug() {
      const generatedSlug = createSlug(title);
      return generatedSlug;
    }

    const unscribe = async () => {
      const headerTitle = await extractHeaderLevel1();
      setTitle(headerTitle);
      const generatedSlug = generateSlug();
      setSlug(generatedSlug);
    };
    unscribe();
  }, [content, setTitle, title, setSlug]);

  return (
    <>
      <VStack  alignItems='left' >
        <Text color='gray.500' fontWeight='600' >ARTICLE SLUG</Text>
        <Input value={slug}  readOnly  />
      </VStack>
    </>
  );
}

export default Slug;
