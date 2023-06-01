import {Box, useColorModeValue} from '@chakra-ui/react'
import {VStack, Heading, Text, List, ListIcon, ListItem, Icon, Divider} from '@chakra-ui/react'
import { ExploreOffOutlined, TrendingUpOutlined, EditNoteOutlined, BookmarkAddedOutlined, PublishedWithChangesOutlined, AnalyticsOutlined, PermIdentityOutlined, NotificationsNoneOutlined, Settings, LogoutOutlined } from '@mui/icons-material'

const Sidebar = () => {
    const bg = useColorModeValue('white', '#0F172A')
    const color = useColorModeValue('#0F172A', 'white')
  return (
    <Box bg={bg} color={color} minH={'100vh'} mt={5} ml={4} borderRadius={'8px'}  className='selected-div'>
      <VStack mt={4} mb={4} >
        <Box px={12} py={4}>
          <List spacing={5} pl={3}>
            <ListItem display={'flex'}>
              <ListIcon as={ExploreOffOutlined} fontSize={'xlg'}  />
             <Text>Explore</Text>
            </ListItem>
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
        
        <Divider/>

        <Box px={12} py={4} >
          <Heading as='h3' fontSize={'18px'} pb={3} textAlign={'left'} display={'flex'}> <Text whiteSpace={'nowrap'} >Trending Tags</Text> <Icon as={TrendingUpOutlined} />
           </Heading>
          <VStack  spacing={4} alignItems={'flex-start'} pl={5}>
            <Text>Programming</Text>
            <Text>Data Science</Text>
            <Text>Technology</Text>
            <Text>Machine Learning</Text>
            <Text>Web Development</Text>
          </VStack>  
        </Box>
          <Divider/>
        <Box  px={12} py={4}>
          <Heading as='h3' fontSize={'18px'} pb={5} textAlign={'left'} >Personal</Heading>
          <List spacing={5} pl={3}>
            <ListItem display={'flex'}>
              <ListIcon as={PermIdentityOutlined} fontSize={'xlg'}  />
             <Text>Account</Text>
            </ListItem>
            <ListItem display={'flex'} >
              <ListIcon as={NotificationsNoneOutlined} fontSize={'xlg'} />
             <Text>Notification</Text>
            </ListItem>
            <ListItem display={'flex'}>
              <ListIcon as={Settings} fontSize={'xlg'} />
             <Text> Settings</Text>
            </ListItem >
            <ListItem display={'flex'} color={'red'}>
              <ListIcon as={LogoutOutlined} fontSize={'xlg'} />
             <Text> Log Out</Text>
            </ListItem>
          
          </List>

        </Box>

      </VStack>
    </Box>
  )
}

export default Sidebar