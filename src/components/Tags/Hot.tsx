import { useEffect, useState } from "react";
import { TagsHot } from "./TagHot";
import { fetchAllTags, Tags } from "../../utils/helperFunctions";
import { useParams } from "react-router-dom";

const Hot = () => {
  const [tags, setTags] = useState([] as Tags[]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await fetchAllTags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  const { hash } = useParams();
  const tag = tags.find((t) => t.hash === hash);

  if (!tag) {
    return <div>Tag not found.</div>;
  }

  return (
    <>
      <TagsHot hash={tag.name} />
    </>
  );
};

export default Hot;
