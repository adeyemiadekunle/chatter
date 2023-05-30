import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {Box, Icon, Text} from '@chakra-ui/react'
import {  AutoFixHighOutlined, PublishOutlined, StarOutlineOutlined } from '@mui/icons-material'
import ArticleCard from './ArticleCard'


const UserFeed = () => {
  return (
    <Box>
      <Tabs>
  <TabList >
    <Tab py={4} px={8}><Icon as={AutoFixHighOutlined} fontSize={'26px'} /><Text pl={2}>For you</Text></Tab>
    <Tab py={4} px={8}><Icon as={StarOutlineOutlined} fontSize={'26px'} /><Text pl={2}>Featured</Text></Tab>
    <Tab py={4} px={8}><Icon as={PublishOutlined} fontSize={'28px'} /><Text  pl={2}>Recent</Text></Tab>
  </TabList>

  <TabPanels>
    <TabPanel p={0} >
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </TabPanel>
    <TabPanel  p={0}>
    <ArticleCard />
    </TabPanel>
    <TabPanel  p={0}>
    <ArticleCard />
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
  )
}

export default UserFeed