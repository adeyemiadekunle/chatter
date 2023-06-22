
import { Box, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Icon, List, ListItem, ListIcon, Text, VStack, Link } from '@chakra-ui/react'
import { AnalyticsOutlined, BookmarkAddedOutlined, EditNoteOutlined, HomeOutlined, PublishedWithChangesOutlined, TrendingUpOutlined } from '@mui/icons-material'
import { CloseIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'

 interface MobileSidebarProps {
    onClose: () => void;
    isOpen: boolean;
}

const MobileSidebar = ({onClose, isOpen}: MobileSidebarProps) => {
    return (
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}  >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                   <HStack justifyContent={'space-between'} >  
                    <Box fontSize={'22px'} px={3} py={1} bg={'#543EE0'} fontWeight={700} color={'white'}> Chatter</Box> 
                    <Box>
                        <CloseIcon onClick={onClose} boxSize={'22px'} />
                    </Box> 
                    </HStack>
                </DrawerHeader>
                    <DrawerBody>
                        <VStack alignItems={'left'} >
                        <Box px={0} py={4}>
                            <List spacing={5} pl={3}>
                                <Link as={NavLink} to='/feed/recent' >
                                    <ListItem display={'flex'}>
                                        <ListIcon as={HomeOutlined} fontSize={'xlg'}  />
                                        <Text>Home</Text>
                                    </ListItem>
                                </Link>
                                <ListItem display={'flex'}>
                                <ListIcon as={BookmarkAddedOutlined} fontSize={'xlg'} />
                                <Text>Bookmarks</Text>
                                </ListItem>
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
                            <VStack  spacing={4} alignItems={'flex-start'} pl={4}>
                                <Text>Programming</Text>
                                <Text>Data Science</Text>
                                <Text>Technology</Text>
                                <Text>Machine Learning</Text>
                                <Text>Web Development</Text>
                            </VStack>  
                        </Box>
                        </VStack>
                       
                    </DrawerBody>
                <DrawerFooter>
                    
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
 )
}

export default MobileSidebar