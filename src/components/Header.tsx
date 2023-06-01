import { Box, HStack, Heading, Link,  Icon, Stack, InputGroup, InputLeftElement, Input, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, VStack, Button } from '@chakra-ui/react'
import { MoonIcon, SunIcon, BellIcon, SearchIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'
import { useFirebaseContext } from '../context'
import { useColorModeValue } from '@chakra-ui/react'
import {CreateOutlined, DescriptionOutlined, CollectionsBookmarkOutlined, Settings, LogoutOutlined} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


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
   
    return (
        <Menu>
            <MenuButton role='profile' as={Avatar} size='sm' cursor={'pointer'} />
            <MenuList width={'300px'} p={0} >
                <MenuItem >
                    <HStack py={3} spacing={6}>
                        <Avatar />
                        <VStack alignItems={'start'} fontWeight={'500'} fontSize={'16px'} spacing={0} >
                            <Text>Adeyemi Adekunle</Text>
                            <Text color={'grey'}>@adeyemidev</Text>
                        </VStack>
                    </HStack>
                </MenuItem>
                <MenuDivider m={0} />
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
   
    
   
    const { isAuth } = useFirebaseContext();

    const handleToggleColorMode = () => {
        toggleColorMode();
    };


    if (!isAuth) {
        return (
            <>
            <Box px={12} py={4} >
                <HStack spacing={10} justifyContent={'space-between'}>
                    {/* logo */}
                    <Box fontSize={'26px'} px={3} py={1} bg={'#543EE0'} fontWeight={700} color={'white'}> Chatter</Box>
                    <HStack spacing={8}>
                        <Box>My Feed</Box>
                        <Box>Write</Box> 
                    </HStack>
                    <HStack  spacing={8} justifyContent={'center'}  alignItems={'center'}>

                        <Link as={NavLink} to='/onboard' >
                                <Button m={0} width={120} bg={'white'} borderColor={'#543EE0'}
                                transition={'all .3s ease-in-out'}
                                _hover={{color:'white', bg:'#543EE0' }}
                                > Log In</Button>
                        </Link>

                        <Link as={NavLink} to='/onboard' >
                            <Button m={0} width={120} color={'white'} bg={'#543EE0'} borderColor={'#543EE0'}
                            transition={'all 0.3s ease-in-out'}
                            _hover={{color:'black', bg:'white', borderColor:'#543EE0' }}
                            > Sign Up</Button> 
                        </Link>
                        
                    </HStack>
                </HStack>
            </Box>
            </>
        )  
    }



    return (
        <Box px={12} py={5} bg={bg} color={color}  className='header' >
            <HStack spacing={10} justify={'space-between'} bg={bg}>
                <HStack>
                <Box fontSize={'26px'} px={3} py={1} bg={'#543EE0'} fontWeight={700} color={'white'}> Chatter</Box>
                </HStack>
                
                <HStack spacing={8}>
                    <Button color={'#543EE0'}>My Feed</Button>
                    <InputGroup >
                        <InputLeftElement w={'30px'} h={'30px'} children={<Icon as={SearchIcon} color={'grey'} boxSize={'15px'} />}  ml={2} mt={1} />
                        <Input placeholder="Search Chatter" size='md' minWidth={'500px'}  variant={'outline'}  focusBorderColor='#543EE0' />
                    </InputGroup>
                </HStack>
                <HStack spacing={2} >
                    <Button  bg={'#543EE0'} borderColor={'#543EE0'} color={'white'}
                    _hover={{ bg: 'white', border: '#543EE0', color: 'black'}}
                    transition={'all .3s ease-in-out'}
                    >
                        <Icon as={CreateOutlined} ></Icon>
                       <Text pl={2}> Post a Content</Text>
                    </Button>

                    <Stack borderRadius={'50px'} _hover={{ backgroundColor: '#E2E8F0', color: 'black' }} padding={2} cursor={'pointer'} >
                        <Icon onClick={handleToggleColorMode} as={colorMode === 'light' ? MoonIcon : SunIcon} boxSize={'20px'} />
                    </Stack>

                    <Stack borderRadius={'50px'} _hover={{ backgroundColor: '#E2E8F0', color: 'black' }} padding={2} cursor={'pointer'} >
                        <Icon as={BellIcon} boxSize={'22px'} />
                    </Stack>
                    <div >
                        <Profile />
                    </div>
                </HStack>
            </HStack>
        </Box>
    )
}

export default Header