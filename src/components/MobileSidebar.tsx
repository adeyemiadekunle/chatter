
import { Box, Image, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Icon, List, ListItem, ListIcon, Text, VStack, Link } from '@chakra-ui/react'
import { AnalyticsOutlined, BookmarkAddedOutlined, EditNoteOutlined, HomeOutlined, PublishedWithChangesOutlined, TrendingUpOutlined } from '@mui/icons-material'
import { CloseIcon } from '@chakra-ui/icons'
import { NavLink} from 'react-router-dom'
import TagsRatingComponent from './Tags/SideBar/TrendingTags'
import Logo from '../assets/logo.png'

 interface MobileSidebarProps {
    onClose: () => void;
    isOpen: boolean 
}

const MobileSidebar = ({onClose, isOpen}: MobileSidebarProps) => {

    return (
        <Box >
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}   >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                   <HStack justifyContent={'space-between'} >  
                     <HStack>
                          <Image src={Logo} /> <Text fontSize='lg' fontWeight='700'>chatte</Text>
                     </HStack>
                    <Box>
                        <CloseIcon onClick={onClose} boxSize={'18px'} />
                    </Box> 
                    </HStack>
                </DrawerHeader>
                    <DrawerBody>
                        <VStack alignItems={'left'} >
                        <Box px={0} py={4}>
                            <List spacing={5} pl={3} >

                                <Link as={NavLink} to='/' >
                                    <ListItem display={'flex'}  >
                                        <ListIcon as={HomeOutlined} fontSize={'xlg'}  />
                                        <Text>Home</Text>
                                    </ListItem>
                                </Link>
                           
                                
                                <Link as={NavLink} to='/bookmarks' >
                                    <ListItem display={'flex'} mt={4}>
                                        <ListIcon as={BookmarkAddedOutlined} fontSize={'xlg'} />
                                        <Text>Bookmarks</Text>
                                    </ListItem>
                                </Link>
                              
                                 
                                <ListItem display={'flex'}>
                                    <ListIcon as={EditNoteOutlined} fontSize={'28px'} />
                                    <Text> Drafts</Text>
                                </ListItem >
                                <ListItem display={'flex'}>
                                <ListIcon as={PublishedWithChangesOutlined} fontSize={'xlg'} />
                                <Text> Published</Text>
                                </ListItem>
                                <ListItem display={'flex'}>
                                <ListIcon as={AnalyticsOutlined} fontSize={'xlg'} />
                                <Text> Analytics</Text>
                                </ListItem>
                            </List>
                        </Box>
                        <Box px={0} py={4} >
                            <Heading as='h3' fontSize={'18px'} pb={3} textAlign={'left'} display={'flex'}> <Text whiteSpace={'nowrap'} >Trending Tags</Text> <Icon as={TrendingUpOutlined} />
                            </Heading>
                            <VStack  alignItems={'flex-start'} pl={1}>
                                <TagsRatingComponent />
                                <Box>
                                     <Link as={NavLink}  fontSize={'base'} color={'blue.500'} fontWeight={'bold'} >View All Tags</Link>
                                </Box>
                            </VStack>  
                        </Box>
                        </VStack>
                       
                    </DrawerBody>
                <DrawerFooter>
                    
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </Box>
 )
}

export default MobileSidebar