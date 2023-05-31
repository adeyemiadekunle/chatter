import { Box, HStack, Heading,  Icon, Stack, InputGroup, InputLeftElement, Input, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, VStack, Button } from '@chakra-ui/react'
import { MoonIcon, SunIcon, BellIcon, SearchIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import { useFirebaseContext } from '../context'
import { useColorModeValue } from '@chakra-ui/react'
import {CreateOutlined, DescriptionOutlined, CollectionsBookmarkOutlined, Settings, LogoutOutlined} from '@mui/icons-material'


const Profile = () => {

    const { GoogleSignOut } = useFirebaseContext();
   
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
                <MenuItem py={4} onClick={GoogleSignOut}> <Icon  as={LogoutOutlined} /> <Text pl={3}>Log Out</Text></MenuItem>
            </MenuList>
        </Menu>

    )
}




const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('white', '#0F172A')
    const color = useColorModeValue('#0F172A', 'white')
    // const [rotation, setRotation] = useState(0);
    const [isAuth, setisAuth] = useState(true)

    // const { isAuth } = useFirebaseContext();

    
    const handleToggleColorMode = () => {
        toggleColorMode();
    };


    if (!isAuth) {
        return (
            <>
            <Box px={12} py={4} >
                <HStack spacing={10} justifyContent={'space-between'}>
                    <Box fontSize={'36px'} fontWeight={700} color={'#543EE0'}> CHATTER</Box>
                    <HStack spacing={8}>
                        <Box>My Feed</Box>
                        <Box>Write</Box> 
                    </HStack>
                    <HStack  spacing={8} justifyContent={'center'}  alignItems={'center'}>
                        <Button m={0} width={120} bg={'white'} borderColor={'#543EE0'}
                        transition={'all .3s ease-in-out'}
                        _hover={{color:'white', bg:'#543EE0' }}
                        > Log In</Button>
                        <Button m={0} width={120} color={'white'} bg={'#543EE0'} borderColor={'#543EE0'}
                          transition={'all 0.3s ease-in-out'}
                          _hover={{color:'black', bg:'white', borderColor:'#543EE0' }}
                        
                        > Sign Up</Button> 
                    </HStack>
                </HStack>
            </Box>
            </>
        )  
    }



    return (
        <Box px={12} py={5} bg={bg} color={color} borderBottom={'1px solid #E2E8F0'} >
            <HStack spacing={10} justify={'space-between'} bgColor={'white'}>
                <HStack>
                    <Heading as='h1' >
                        Chatter
                    </Heading>
                </HStack>
                
                <HStack spacing={8}>
                    <Button>My Feed</Button>
                    <InputGroup >
                        <InputLeftElement w={'30px'} h={'30px'} children={<Icon as={SearchIcon} color={'grey'} boxSize={'15px'} />}  ml={2} mt={1} />
                        <Input placeholder="search chatter" size='md' minWidth={'500px'}  variant={'outline'}  focusBorderColor='#543EE0' />
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