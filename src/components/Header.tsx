// Note: Header component
import {useState, useEffect} from 'react'
import { Box, HStack,  Link, Image, Icon, Stack, InputGroup, InputLeftElement, Input, Text, Avatar, MenuButton, Menu, MenuList, MenuItem, MenuDivider, VStack, Button, useDisclosure, Flex, } from '@chakra-ui/react'
import { SearchIcon, HamburgerIcon,  } from '@chakra-ui/icons'
import { useColorMode, useColorModeValue} from '@chakra-ui/react'
import { userAuth } from '../context/Firebase'
import {CreateOutlined, DescriptionOutlined, CollectionsBookmarkOutlined, Settings, LogoutOutlined, PostAddOutlined} from '@mui/icons-material'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { NavLink, useNavigate } from 'react-router-dom'
import MobileSidebar from './MobileSidebar'
import { createDraft} from '../utils/helperFunctions'
import { auth, db } from '../utils/firebase'
import { onSnapshot, doc } from 'firebase/firestore'
import Search from './SearchModal'
import ModalLogin from './ModalLogin'
import Logo from '../assets/logo.png'



interface HeaderProps {
    handleCreateDraft: (draft: any) => void;
}

 interface UserData {
    displayName: string;
    email: string;
    photoURL: string;
    userName: string;
    userBio: string;
    userTagLine: string;
    techStack: string[];
    location: string;
  } ;

export const Profile = ({handleCreateDraft}: HeaderProps) => {

    const { GoogleSignOut, isAuth } = userAuth();
    const navigate = useNavigate();

    const handleGoogleSignOut = async () => {
        try {
          GoogleSignOut();
          localStorage.removeItem('userData'); // Clear the userData from local storage
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      };
      

 //  User Data
 const [userData, setUserData] = useState<UserData | null>(null);

 useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setUserData(null);
      return; // Return early if there is no authenticated user
    }

    const userDoc = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userDoc, (doc) => {
      if (doc.exists()) {
        const { displayName, email, photoURL, userName, userBio, userTagLine, techStack, location } =
          doc.data() as UserData;
        setUserData({ displayName, email, photoURL, userName, userBio, userTagLine, techStack, location });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

 
    return (
       <>
        <Menu>
            <MenuButton role='profile' as={Avatar} src={userData?.photoURL} name={userData?.displayName} size='sm' cursor={'pointer'}   />
            {
              isAuth ? 
              (
                <MenuList width={'300px'} p={0} >
                <Link  as={NavLink} to={`/u/${userData?.userName}`} >
                    <MenuItem  >
                        <HStack py={3} spacing={6}>
                            <Avatar src={userData?.photoURL} name={userData?.displayName}  />
                            <VStack alignItems={'start'} fontWeight={'500'} fontSize='sm' spacing={0} >
                                <Text>{userData?.displayName}</Text>
                                <Text color={'grey'}  fontSize='14px' >@{userData?.userName}</Text>
                            </VStack>
                        </HStack>
                    </MenuItem>
                </Link>
                <MenuDivider m={0} />
                <MenuItem  cursor='pointer' py={4} hideFrom='md' onClick={handleCreateDraft}  > <Icon as={PostAddOutlined} /><Text pl={2}>New Draft</Text></MenuItem>
                <MenuItem  cursor='pointer' py={4}> <Icon as={DescriptionOutlined} /><Text pl={2}>My Drafts</Text></MenuItem>
                <Link as={NavLink} to='/bookmarks' ><MenuItem py={4}><Icon as={CollectionsBookmarkOutlined} /> <Text pl={2}>My Bookmarks</Text></MenuItem></Link>
                <Link as={NavLink} to='/settings' ><MenuItem  py={4}><Icon as={Settings} /><Text pl={2}>Account Settings</Text></MenuItem></Link>
                <MenuDivider m={0} />
                <MenuItem cursor='pointer'  py={4} onClick={handleGoogleSignOut}> <Icon  as={LogoutOutlined} /> <Text pl={3}>Log Out</Text></MenuItem>
            </MenuList>
              ):
              (
                <>
                 <MenuList w='300px' hideBelow='md' >
                   <ModalLogin/>
                 </MenuList>
                </>
              )
            }
        </Menu>
        
       </>
    )
}



const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('white', '#0F172A')
    const color = useColorModeValue('#0F172A', 'white')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isOpenSearch, onOpen: onOpenSearch, onClose: onCloseSearch } = useDisclosure()
    const navigate = useNavigate()
    const {isAuth } = userAuth();
   


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
                
                {/* Mobile Menu fixed */}
           
              <Flex bg='whiteAlpha.900' color='black'  justifyContent='center' alignItems='center'  w='100%'   hideFrom= 'md' position='fixed' zIndex='4'  bottom='1'  h={'55px'}>
                     <HStack w='100%' justifyContent='space-between' px={5} alignItems='center' h='55px'>
                         <Link as={NavLink} to='/' display='flex'
                         _activeLink={{color: 'brand.800'}}
                         >
                            <Icon fontSize='28px' as={HomeOutlinedIcon}/>
                          </Link>
                        <Link as={NavLink} to='/search' display='flex'  _activeLink={{color: 'brand.800'}}>
                            <Icon fontSize='24px' as={SearchIcon} />
                        </Link>
                       
                        {
                          isAuth ? (
                            <>
                              <Link as={NavLink} to='/bookmarks' display='flex' 
                                _activeLink={{color: 'brand.800'}}
                                >
                                  <Icon  fontSize='26px' as={CollectionsBookmarkOutlined} ></Icon> 
                              </Link>
                            </>
                          ):
                          (
                            <>
                              <Link as={NavLink} to='/onboard' display='flex' 
                              _activeLink={{color: 'brand.800'}}
                              >
                                <Icon  fontSize='26px' as={CollectionsBookmarkOutlined} ></Icon> 
                              </Link>
                            </>
                          )
                        }

                        <Link as={NavLink} to='' display='flex'>
                          <Icon fontSize='28px' as={NotificationsOutlinedIcon}></Icon>
                        </Link>
                     </HStack>
              </Flex>
            

            <HStack spacing={10} justify={'space-between'} bg={bg} maxW={'1280px'} w={'100%'} >
                <HStack spacing={4}  >
                    <VStack hideFrom='md'>
                        <Icon fontSize='md' onClick={onOpen} as={HamburgerIcon}></Icon>
                    </VStack>
                    <Link as={NavLink} to='/' >
                        <HStack>
                             <Image src={Logo} /> <Text fontSize='lg' fontWeight='700'  hideBelow='md'>chatte</Text>
                       </HStack>
                    </Link>
                </HStack>
                
                <HStack spacing={8} hideBelow='md'>
                { isAuth ? <Link as={NavLink} to='/' ><Button color= 'brand.800' fontSize='base' >My Feed</Button></Link> : 
               <Link as={NavLink} to='/onboard' > <Button color= 'brand.800' fontSize='base'  >My Feed</Button></Link> }
                    <InputGroup onClick={onOpenSearch}  >
                        <InputLeftElement w={'30px'} h={'30px'} children={<Icon as={SearchIcon} color={'grey'} boxSize={'15px'} />}  ml={2} mt={1} />
                        <Input  placeholder="Search Chatter" fontSize='base' minWidth={'500px'}  variant={'outline'}  focusBorderColor='#543EE0' />
                    </InputGroup>
                </HStack>

                <HStack spacing={2} >
                    {  isAuth ?  
                      <Link  onClick={handleCreateDraft} hideBelow='md' >
                          <Button  bg= 'brand.800' borderColor='brand.800' color={'white'}
                             _hover={{ bg: 'brand.600'}}
                              transition={'all .3s ease-in-out'}
                            >
                          <Icon as={CreateOutlined} ></Icon>
                              <Text fontSize='base' pl={2}>Post </Text>
                          </Button>
                      </Link>
                        : 
                      <Link as={NavLink}  to='/onboard' hideBelow='md' >
                        <Button bg= 'brand.800' borderColor='brand.800'color={'white'}
                          _hover={{ bg: 'brand.700'}}
                        transition={'all .3s ease-in-out'}
                        >
                        <Icon as={CreateOutlined} ></Icon>
                        <Text pl={2}>Post </Text>
                        </Button>
                      </Link> 
                    }

                   {
                    isAuth ? (
                      <>
                      <Link onClick={handleCreateDraft}>
                        <Stack  borderRadius='full' _hover={{ backgroundColor: '#E2E8F0', color: 'black' }} padding={2} cursor={'pointer'}  hideFrom='md'>
                              <Icon  as={DriveFileRenameOutlineOutlinedIcon} boxSize='30px' />
                        </Stack>
                      </Link>
                      </>
                    ):
                    (
                      <>
                      <Link as={NavLink} to='/onboard' >
                        <Stack  borderRadius='full' _hover={{ backgroundColor: '#E2E8F0', color: 'black' }} padding={2} cursor={'pointer'}  hideFrom='md'>
                              <Icon  as={DriveFileRenameOutlineOutlinedIcon} boxSize='30px' />
                        </Stack>
                     </Link>
                      </>
                    )
                   }

                    <Stack borderRadius={'50px'} _hover={{ backgroundColor: '#E2E8F0', color: 'black' }} padding={2} cursor={'pointer'} >
                        <Icon onClick={handleToggleColorMode} as={colorMode === 'light' ? DarkModeOutlinedIcon : LightModeOutlinedIcon } boxSize={'26px'} />
                    </Stack>

                    <Stack borderRadius={'50px'} _hover={{ backgroundColor: '#E2E8F0', color: 'black' }} padding={2} cursor={'pointer'} hideBelow='md' >
                        <Icon as={NotificationsOutlinedIcon} boxSize={'26px'} />
                    </Stack>
                    <Box>
                         <Profile handleCreateDraft={handleCreateDraft} />
                    </Box>
                </HStack>
            </HStack>
            {/* Mobile Sidebar */}
             <Box hideFrom='md'>
                 <MobileSidebar isOpen={isOpen} onClose={onClose} />
             </Box>

            {/* Desktop  Search */}
            <Search isOpen={isOpenSearch} onClose={onCloseSearch}   />
        </Box>
    )
}

export default Header