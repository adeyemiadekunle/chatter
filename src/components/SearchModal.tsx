import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fetchAllUsers,
  RecentArticles,
  Users,
  fetchRecents,
  fetchAllTags,
  Tags,
} from "../utils/helperFunctions";
import {
  Input,
  Box,
  Flex,
  Link,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import PostCard from "./Search/PostCard";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const Search = ({ isOpen, onClose }: SearchProps) => {
  const [peoples, setPeoples] = useState<Users[]>([]);
  const [articles, setArticles] = useState<RecentArticles[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState<
    (Users | RecentArticles | Tags)[]
  >([]);
  const [filterType, setFilterType] = useState<"users" | "articles" | "tags">(
    "articles"
  );
  const searchTerm = searchParams.get("q") || "";

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchAllUsers();
      setPeoples(users);
    };
    fetchUsers();
  }, []);

  // fetch all articles
  useEffect(() => {
    const getArticle = fetchRecents((fetchedArticles) => {
      setArticles(fetchedArticles);
    });

    return () => {
      getArticle();
    };
  }, []);

  // fetch all tags
  useEffect(() => {
    const fetchTags = async () => {
      const tags = await fetchAllTags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      filterData(searchTerm, filterType);
      setSearchParams({ q: searchTerm, filter: filterType });
    } else {
      setSearchParams({});
      setFilteredData([]);
    }
  }, [searchTerm, filterType]);

  useEffect(() => {
    const urlFilter = searchParams.get("filter");
    if (
      urlFilter === "users" ||
      urlFilter === "articles" ||
      urlFilter === "tags"
    ) {
      setFilterType(urlFilter);
    } else {
      setFilterType("articles");
    }
  }, []);

  const filterData = (
    searchTerm: string,
    type: "users" | "articles" | "tags"
  ) => {
    if (type === "articles") {
      const filteredArticles = articles.filter((article) =>
        article.content.blocks[0].data.text
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredData(
        filteredArticles.map((article) => ({ ...article, type: "articles" }))
      );
    } else if (type === "users") {
      const filteredUsers = peoples.filter((people) =>
        people.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(
        filteredUsers.map((user) => ({ ...user, type: "users" }))
      );
    } else if (type === "tags") {
      const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredTags.map((tag) => ({ ...tag, type: "tags" })));
    }
  };

  // handleInputChange
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    if (newSearchTerm === "") {
      setSearchParams({});
      setFilteredData([]);
    } else {
      setSearchParams({ q: newSearchTerm, filter: filterType });
      filterData(newSearchTerm, filterType);
    }
  };

  const handleFilterArticles = () => {
    setFilterType("articles");
    setSearchParams({ q: searchTerm, filter: "articles" });
  };

  const handleFilterUsers = () => {
    setFilterType("users");
    setSearchParams({ q: searchTerm, filter: "users" });
  };

  const handleFilterTags = () => {
    setFilterType("tags");
    setSearchParams({ q: searchTerm, filter: "tags" });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl"   >
        <ModalOverlay  bg='blackAlpha.300' backdropFilter='blur(2px) '/>
        <ModalContent >
          <ModalBody p={0} borderRadius='20px'>
            <Box bg="primary.white" minH="10vh" borderRadius='10px'>
              <Box >
                <Box pt={10} pb={6} px={[4]}>
                  <Input
                  fontSize='base'
                    borderRadius="full"
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search..."
                  />
                </Box>

                <Box mt={2}  w="100%">
                  {searchTerm === "" ? (
                    <Box w="100%" mb={5} >
                      <Text textAlign="center" fontSize="md" fontWeight="500">
                        Search for articles, users or tags
                      </Text>
                    </Box>
                  ) : (
                    <>
                      <Flex mt={4} gap={6}>
                        <Link
                          onClick={handleFilterArticles}
                          fontWeight={
                            filterType === "articles" ? "bold" : "normal"
                          }
                          bg={filterType === "articles" ? "gray.100" : "none"}
                          p={1}
                          px={2}
                          transition=" 0.3s ease-in-out"
                          _hover={{ color: "brand.800" }}
                        >
                          Articles
                        </Link>
                        <Link
                          onClick={handleFilterUsers}
                          fontWeight={
                            filterType === "users" ? "bold" : "normal"
                          }
                          bg={filterType === "users" ? "gray.100" : "none"}
                          p={1}
                          px={2}
                          transition=" 0.3s ease-in-out"
                          _hover={{ color: "brand.800" }}
                        >
                          Users
                        </Link>
                        <Link
                          onClick={handleFilterTags}
                          fontWeight={filterType === "tags" ? "bold" : "normal"}
                          bg={filterType === "tags" ? "gray.100" : "none"}
                          p={1}
                          px={2}
                          transition=" 0.3s ease-in-out"
                          _hover={{ color: "brand.800" }}
                        >
                          Tags
                        </Link>
                      </Flex>
                      <Box h="360px" overflowY="scroll">
                        {searchTerm !== "" && filterType === "users" && (
                          <Box>
                            {filteredData
                              .filter(
                                (item) =>
                                  "type" in item && item.type === "users"
                              )
                              .sort((a, b) =>
                                (a as Users).displayName.localeCompare(
                                  (b as Users).displayName
                                )
                              )
                              .map((item) => (
                                <Box key={(item as Users).userId}>
                                  <Link href={`/${(item as Users).userName}`}>
                                    <Flex>
                                      <Text>{(item as Users).displayName}</Text>
                                    </Flex>
                                  </Link>
                                </Box>
                              ))}
                          </Box>
                        )}
                        {searchTerm !== "" && filterType === "articles" && (
                          <Box>
                            {filteredData
                              .filter(
                                (item) =>
                                  "type" in item && item.type === "articles"
                              )
                              .sort((a, b) =>
                                (a as RecentArticles).slug.localeCompare(
                                  (b as RecentArticles).slug
                                )
                              )
                              .map((item) => (
                                <Box key={(item as RecentArticles).id}>
                                          
                                    <PostCard
                                    authorId={(item as RecentArticles).authorId}
                                    PublishDate={(item as RecentArticles).publishAt}
                                    HeaderImage={(item as RecentArticles).headerImage}
                                      slug={(item as RecentArticles).slug}
                                      Title={(item as RecentArticles).heading}
                                      isLoading={false}
                                    />
                                </Box>
                              ))}
                          </Box>
                        )}
                        {searchTerm !== "" && filterType === "tags" && (
                          <Box>
                            {filteredData
                              .filter(
                                (item) => "type" in item && item.type === "tags"
                              )
                              .sort((a, b) =>
                                (a as Tags).name.localeCompare((b as Tags).name)
                              )
                              .map((item) => (
                                <Box key={(item as Tags).id}>
                                  <Link href={`/tags/${(item as Tags).id}`}>
                                    <Flex>
                                      <Text>{(item as Tags).name}</Text>
                                    </Flex>
                                  </Link>
                                </Box>
                              ))}
                          </Box>
                        )}
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
