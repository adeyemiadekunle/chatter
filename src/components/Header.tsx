// Note: Header component
import {useState, useEffect} from 'react'
import { Box, HStack,  Link,  Icon, Stack, InputGroup, InputLeftElement, Input, Text, Avatar, MenuButton, Menu, MenuList, MenuItem, MenuDivider, VStack, Button, useDisclosure } from '@chakra-ui/react'
import { MoonIcon, SunIcon, BellIcon, SearchIcon, HamburgerIcon,  } from '@chakra-ui/icons'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useFirebaseContext } from '../context'
import {CreateOutlined, DescriptionOutlined, CollectionsBookmarkOutlined, Settings, LogoutOutlined, PostAddOutlined} from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom'
import MobileSidebar from './MobileSidebar'
import { createDraft, fetchUserData, UserData } from '../utils/helperFunctions'


const Profile = () => {

    const { GoogleSignOut } = useFirebaseContext();
    const navigate = useNavigate();

     const handleGoogleSignOut = async () => {
        try {
            GoogleSignOut();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
   

 //  User Data
const [userData, setUserData] = useState({} as UserData);

useEffect(() => {
    const fetchUser = async () => {
        const data = await fetchUserData();
        if (data !== null) {
            setUserData(data);
        }
    };

    fetchUser();
}, []);

  console.log(userData);


    return (
        <Menu>
            <MenuButton role='profile' as={Avatar} src={userData.photoURL} size='sm' cursor={'pointer'} />
            <MenuList width={'300px'} p={0} >
                <MenuItem >
                    <HStack py={3} spacing={6}>
                        <Avatar src={userData.photoURL}  />
                        <VStack alignItems={'start'} fontWeight={'500'} fontSize={'16px'} spacing={0} >
                            <Text>{userData.displayName}</Text>
                            <Text color={'grey'}>@adeyemidev</Text>
                        </VStack>
                    </HStack>
                </MenuItem>
                <MenuDivider m={0} />
                 <Link as={NavLink} to='/new' ><MenuItem py={4} hideFrom='md'> <Icon as={PostAddOutlined} /><Text pl={2}>Create Post</Text></MenuItem></Link>
                <MenuItem py={4}> <Icon as={DescriptionOutlined} /><Text pl={2}>My Drafts</Text></MenuItem>
                <MenuItem py={4}><Icon as={CollectionsBookmarkOutlined} /> <Text pl={2}>My Bookmarks</Text></MenuItem>
                <MenuItem py={4}><Icon as={Settings} /><Text pl={2}>Account Settings</Text></MenuItem>
                <MenuDivider m={0} />
                <MenuItem py={4} onClick={handleGoogleSignOut}> <Icon  as={LogoutOutlined} /> <Text pl={3}>Log Out</Text></MenuItem>
            </MenuList>
        </Menu>

    )
}




const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('white', '#0F172A')
    const color = useColorModeValue('#0F172A', 'white')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()


    const handleToggleColorMode = () => {
        toggleColorMode();
    };
     
    const handleCreateDraft = () => {
       
        createDraft( (draftId) => {
          navigate(`/draft/${draftId}`);
        });
      };


      

   
    return (
        <Box px={{base: '3', md: '8'}} py={{base: '3', md: '5'}} bg={bg} color={color}  className='header'  display={'flex'} flexDir={'column'} alignItems={'center'} >
            <HStack spacing={10} justify={'space-between'} bg={bg} maxW={'1280px'} w={'100%'} >
                <HStack spacing={4}  >
                    <VStack hideFrom='md'>
                        <HamburgerIcon onClick={onOpen} boxSize={'32px'} />
                    </VStack>
                    <Link as={NavLink} to='/' ><Box fontSize={{base: '22px', md: '28px'}} px={3} py={1} bg={'#543EE0'} fontWeight={700} color={'white'}> Chatter</Box></Link>
                </HStack>
                
                <HStack spacing={8} hideBelow='md'>
                  <Link as={NavLink} to='/feed/personalize' ><Button color={'#543EE0'}>My Feed</Button></Link>
                    <InputGroup >
                        <InputLeftElement w={'30px'} h={'30px'} children={<Icon as={SearchIcon} color={'grey'} boxSize={'15px'} />}  ml={2} mt={1} />
                        <Input placeholder="Search Chatter" size='md' minWidth={'500px'}  variant={'outline'}  focusBorderColor='#543EE0' />
                    </InputGroup>
                </HStack>
                <HStack spacing={2} >
                    <Link  onClick={handleCreateDraft} hideBelow='md' >
                        <Button  bg={'#543EE0'} borderColor={'#543EE0'} color={'white'}
                        _hover={{ bg: 'white', border: '#543EE0', color: 'black'}}
                        transition={'all .3s ease-in-out'}
                        >
                        <Icon as={CreateOutlined} ></Icon>
                        <Text pl={2}> Post </Text>
                        </Button>
                    </Link>

                    <Stack hideFrom='md'>
                        <SearchIcon boxSize={'22px'} />
                    </Stack>
                    <Stack borderRadius={'50px'} _hover={{ backgroundColor: '#E2E8F0', color: 'black' }} padding={2} cursor={'pointer'} >
                        <Icon onClick={handleToggleColorMode} as={colorMode === 'light' ? MoonIcon : SunIcon} boxSize={'20px'} />
                    </Stack>

                    <Stack borderRadius={'50px'} _hover={{ backgroundColor: '#E2E8F0', color: 'black' }} padding={2} cursor={'pointer'} hideBelow='md' >
                        <Icon as={BellIcon} boxSize={'22px'} />
                    </Stack>
                    <Box>
                         <Profile />
                    </Box>
                </HStack>
            </HStack>
            {/* Mobile Sidebar */}
            <MobileSidebar isOpen={isOpen} onClose={onClose}  />
        </Box>
    )
}

export default Header