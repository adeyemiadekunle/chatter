import { useState, useEffect } from "react";
import { Input, Text, VStack} from "@chakra-ui/react";


interface SlugProps {
  slug: string;
  content: string;
  setSlug: (slug: string) => void;
}

export function createSlug(title: string): string {
  let slug = title.toLowerCase();

  slug = slug.replace(/[^a-zA-Z0-9\s-]/g, "");
  slug = slug.trim().replace(/\s+/g, "-");

  slug = slug.replace(/\b(a|an|and|but)\b/g, "");

  slug = slug.slice(0, 50);


  // Generate a random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  // Append the random number to the slug
  slug += "-" + randomNum;

  return slug;
}

function Slug({ slug, content, setSlug }: SlugProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    // async function extractHeaderLevel1() {
    //   const headerBlock = content?.blocks?.find(
    //     (block: ContentBlock) => block.type === "header" && block.data.level === 1
    //   );
    //   return headerBlock ? headerBlock.data.text : "";
    // }

    function generateSlug() {
      const generatedSlug = createSlug(title);
      return generatedSlug;
    }

    const unsubscribe = async () => {
      setTitle(content);
      const generatedSlug = generateSlug();
      setSlug(generatedSlug);
    };

    unsubscribe();
  }, [content, setTitle, setSlug, title]);

  return (
    <>
      <VStack alignItems='left'>
        <Text color='gray.500' fontWeight='600'>
          ARTICLE SLUG
        </Text>
        <Input value={slug} readOnly />
      </VStack>
    </>
  );
}

export default Slug;
