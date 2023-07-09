// Note: Header component

import { Box, HStack, VStack,  Link, Image, Icon, Stack,  Text, Button, useDisclosure } from '@chakra-ui/react'
import { useColorMode, useColorModeValue} from '@chakra-ui/react'
import {  HamburgerIcon } from '@chakra-ui/icons'
import { userAuth } from '../context/Firebase'
import {CreateOutlined} from '@mui/icons-material'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { NavLink, useNavigate } from 'react-router-dom'
import { createDraft} from '../utils/helperFunctions'
import MobileSidebar from './MobileSidebar'
import Logo from '../assets/logo.png'
import { Profile } from './Header'



const HeaderAlt = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('white', '#0F172A')
    const color = useColorModeValue('#0F172A', 'white')
    const navigate = useNavigate()
    const {isAuth } = userAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()
   


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
                        <Icon fontSize='md' onClick={onOpen} as={HamburgerIcon}></Icon>
                    </VStack>
                    <Link as={NavLink} to='/' >
                        <HStack>
                             <Image src={Logo} /> <Text fontSize='lg' fontWeight='700'  hideBelow='md'>chatte</Text>
                       </HStack>
                    </Link>
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
            
        </Box>
    )
}

export default HeaderAlt