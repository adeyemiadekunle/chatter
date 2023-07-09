import {Box, useColorModeValue} from '@chakra-ui/react'
import {VStack, Heading, Text, List, ListIcon, ListItem, Icon, Divider, Link, useDisclosure} from '@chakra-ui/react'
import { TrendingUpOutlined, EditNoteOutlined, BookmarkAddedOutlined, PublishedWithChangesOutlined, AnalyticsOutlined } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import TagsRatingComponent from './Tags/SideBar/TrendingTags'


const Sidebar = () => {
    const bg = useColorModeValue('white', '#0F172A')
    const color = useColorModeValue('#0F172A', 'white')
    const { onClose} = useDisclosure()

  return (
    <Box bg={bg} color={color} minH={'80vh'} mt={5} ml={4} borderRadius={'5px'}  className='selected-div'>
      <VStack mt={4} mb={4} >
        <Box px={12} py={4}>
          <List spacing={5} pl={3}>
            {/* <ListItem display={'flex'}>
              <ListIcon as={ExploreOffOutlined} fontSize={'xlg'}  />
             <Text>Explore</Text>
            </ListItem> */}
            <Link as={NavLink}  to='/bookmarks'>
            <ListItem display={'flex'}>
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
        
        <Divider/>

        <Box px={12} py={4} >
          <Heading as='h3' fontSize='md' pb={3} textAlign={'left'} display={'flex'}> <Text whiteSpace={'nowrap'} >Trending Tags</Text> <Icon as={TrendingUpOutlined} />
           </Heading>
          <VStack alignItems={'flex-start'} pl={1}>
            <TagsRatingComponent onClose={onClose} />
            <Box>
              <Link as={NavLink}  fontSize={'base'} color={'blue.500'} fontWeight={'bold'} >View All Tags</Link>
            </Box>
          </VStack>  
        </Box>

      </VStack>
    </Box>
  )
}

export default Sidebar