import { useEffect, useState } from 'react';
import { useSearchParams} from 'react-router-dom';
import { fetchAllUsers, RecentArticles, Users, fetchArticles, fetchAllTags, Tags } from '../utils/helperFunctions';
import { Input, Box, Flex, Link, Text } from '@chakra-ui/react';

const Search = () => {
  const [peoples, setPeoples] = useState<Users[]>([]);
  const [articles, setArticles] = useState<RecentArticles[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState<(Users | RecentArticles | Tags)[]>([]);
  const [filterType, setFilterType] = useState<'users' | 'articles' | 'tags'>('articles');
  const searchTerm = searchParams.get('q') || '';

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
    const getArticle = fetchArticles((fetchedArticles) => {
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
    if (searchTerm !== '') {
      filterData(searchTerm, filterType);
      setSearchParams({ q: searchTerm, filter: filterType });
    } else {
      setSearchParams({});
      setFilteredData([]);
    }
  }, [searchTerm, filterType]);


  useEffect(() => {
    const urlFilter = searchParams.get('filter');
    if (urlFilter === 'users' || urlFilter === 'articles' || urlFilter === 'tags') {
      setFilterType(urlFilter);
    } else {
      setFilterType('articles');
    }
  }, []);


  const filterData = (searchTerm: string, type: 'users' | 'articles' | 'tags') => {
    if (type === 'articles') {
      const filteredArticles = articles.filter((article) =>
        article.content.blocks[0].data.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredArticles.map((article) => ({ ...article, type: 'articles' })));
    } else if (type === 'users') {
      const filteredUsers = peoples.filter((people) =>
        people.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredUsers.map((user) => ({ ...user, type: 'users' })));
    } else if (type === 'tags') {
      const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredTags.map((tag) => ({ ...tag, type: 'tags' })));
    }
  };


  // handleInputChange
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    if (newSearchTerm === '') {
      setSearchParams({});
      setFilteredData([]);
    } else {
      setSearchParams({ q: newSearchTerm, filter: filterType });
      filterData(newSearchTerm, filterType);
    }
  };

  const handleFilterArticles = () => {
    setFilterType('articles');
    setSearchParams({ q: searchTerm, filter: 'articles' });
  };

  const handleFilterUsers = () => {
    setFilterType('users');
    setSearchParams({ q: searchTerm, filter: 'users' });
  };

 
  const handleFilterTags = () => {
    setFilterType('tags');
    setSearchParams({ q: searchTerm, filter: 'tags' });
  };

  return (
    <>
    <Box bg='primary.white' minH='90vh' >
      <Box maxW={['100%', '800px']} m="0 auto" p={[4, 0]}  >
        <Box pt={10} pb={6} >
        <Input
          borderRadius="full"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        </Box>
        <Flex mt={4} gap={6} >
          <Link onClick={handleFilterArticles} fontWeight={filterType === 'articles' ? 'bold' : 'normal'}  
            bg={filterType === 'articles' ? 'gray.100' : 'none'} p={1} px={2}
            transition=' 0.3s ease-in-out'
           _hover={{ color: 'brand.800' }}
           >
            Articles
          </Link>
          <Link onClick={handleFilterUsers} fontWeight={filterType === 'users' ? 'bold' : 'normal'} 
            bg={filterType === 'users' ? 'gray.100' : 'none'} p={1} px={2}
            transition=' 0.3s ease-in-out'
           _hover={{ color: 'brand.800' }}
           >
            Users
          </Link>
          <Link onClick={handleFilterTags} fontWeight={filterType === 'tags' ? 'bold' : 'normal'} 
            bg={filterType === 'tags' ? 'gray.100' : 'none'} p={1} px={2}
            transition=' 0.3s ease-in-out'
           _hover={{ color: 'brand.800' }}
           >
            Tags
          </Link>
        </Flex>
        <Box  mt={10} minH='500px'>
          {searchTerm === '' ? (
            <Box w='100%'>
              <Text  textAlign='center' fontSize='md' fontWeight='500'>Search for articles, users or tags</Text>
            </Box>
          ) : (
            <>
              {searchTerm !== '' && filterType === 'users' && (
                <Box>
                  {filteredData
                    .filter((item) => 'type' in item && item.type === 'users')
                    .sort((a, b) => (a as Users).displayName.localeCompare((b as Users).displayName))
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
              {searchTerm !== '' && filterType === 'articles' && (
                <Box>
                  {filteredData
                    .filter((item) => 'type' in item && item.type === 'articles')
                    .sort((a, b) => (a as RecentArticles).slug.localeCompare((b as RecentArticles).slug))
                    .map((item) => (
                      <Box key={(item as RecentArticles).id}>
                        <Link href={`/userName/${(item as RecentArticles).id}`}>
                          <Flex>
                            <Text>{(item as RecentArticles).slug}</Text>
                            <Text>{(item as RecentArticles).authorId}</Text>
                          </Flex>
                        </Link>
                      </Box>
                    ))}
                </Box>
              )}
              {searchTerm !== '' && filterType === 'tags' && (
                <Box>
                  {filteredData
                    .filter((item) => 'type' in item && item.type === 'tags')
                    .sort((a, b) => (a as Tags).name.localeCompare((b as Tags).name))
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
            </>
          )}
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Search;
