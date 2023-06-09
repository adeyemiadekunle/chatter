import { useEffect, useState } from 'react';
import { useSearchParams} from 'react-router-dom';
import { fetchAllUsers, RecentArticles, Users, fetchRecents, fetchAllTags, Tags } from '../utils/helperFunctions';
import { Input, Box, Flex, Link, Text, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SEO from '../components/SEO';
import PostCard from '../components/Search/PostCard';
import UserCard from '../components/Search/UserCard';
import TagCard from '../components/Search/TagCard';


const Search = () => {
  const [peoples, setPeoples] = useState<Users[]>([]);
  const [articles, setArticles] = useState<RecentArticles[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<(Users | RecentArticles | Tags)[]>([]);
  const [filterType, setFilterType] = useState<'users' | 'articles' | 'tags'>('articles');
  const searchTerm = searchParams.get('q') || '';

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchAllUsers();
      setPeoples(users);
      setIsLoading(false);
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
      setIsLoading(false);
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
        article.heading.toLowerCase().includes(searchTerm.toLowerCase())
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
    <SEO title="Search" description="Search for posts, users and tags" name="Search" type="Post" />
    <Box  minH='90vh' >
      <Box maxW={['100%', '800px']} m="0 auto" p={[4, 0]}  >
        <Box pt={10} pb={6} >
          <InputGroup>
            <InputLeftAddon children={<SearchIcon color="gray.300" />} />
            <Input
              type="text"
              placeholder="Search for articles, users or tags"
              value={searchTerm}
              onChange={handleInputChange}
              _focus={{ bg: 'gray.100', color: 'black' }}
            />
          </InputGroup>
        </Box>
        <Flex mt={4} gap={6} >
          <Link onClick={handleFilterArticles} fontWeight={filterType === 'articles' ? 'bold' : 'normal'}  
            bg={filterType === 'articles' ? 'gray.100' : 'none'} p={1} px={2}
            color={filterType === 'articles' ? 'brand.800' : 'gray.500'}
            transition=' 0.3s ease-in-out'
           _hover={{ color: 'brand.800' }}
           >
            Articles
          </Link>
          <Link onClick={handleFilterUsers} fontWeight={filterType === 'users' ? 'bold' : 'normal'} 
            bg={filterType === 'users' ? 'gray.100' : 'none'} p={1} px={2}
            color={filterType === 'users' ? 'brand.800' : 'gray.500'}
            transition=' 0.3s ease-in-out'
           _hover={{ color: 'brand.800' }}
           >
            Users
          </Link>
          <Link onClick={handleFilterTags} fontWeight={filterType === 'tags' ? 'bold' : 'normal'} 
            bg={filterType === 'tags' ? 'gray.100' : 'none'} p={1} px={2}
            color={filterType === 'tags' ? 'brand.800' : 'gray.500'}
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
                         <UserCard
                                  photoURL={(item as Users).photoURL}
                                  displayName={(item as Users).displayName}
                                  userName={(item as Users).userName}
                                  tagLine={(item as Users).userTagLine}
                                  isLoading={isLoading} 
                            />
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
              {searchTerm !== '' && filterType === 'tags' && (
                <Box>
                  {filteredData
                    .filter((item) => 'type' in item && item.type === 'tags')
                    .sort((a, b) => (a as Tags).name.localeCompare((b as Tags).name))
                    .map((item) => (
                      <Box key={(item as Tags).id}>
                          <TagCard
                               hash={(item as Tags).hash}
                               image={(item as Tags).image}
                               tagCount={(item as Tags).hash}
                               followers={(item as Tags).followers.length}
                               isLoading={isLoading}
                           />
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
