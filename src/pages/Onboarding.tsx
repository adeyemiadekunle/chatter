import {Box, Flex, Text, Heading, VStack,  Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import OnboardImage from '../assets/onboarding.png'

import Register from '../components/Register'
import Login from '../components/Login'


const Onboarding = () => {

  


  return (
    <Box  minH={'100vh'}>
      <Flex>
        <Box flex={1}  bgImage={OnboardImage} bgSize={'cover'} bgPosition={'center'} bgRepeat={'no-repeat'}  minH={'100vh'}>
          <VStack minH={'100%'}  bgColor={'blackAlpha.700'} color={'whiteAlpha.900'} justifyContent={'center'}>
              <Heading  fontSize={'48px'} fontWeight={700} lineHeight={'72px'} >CHATTER</Heading>
              <Text w={'60%'}  fontSize={'24px'}>Unleash the Power of Words, Connect with Like-minded Readers and Writers</Text>
          </VStack>
        </Box>

        <VStack  overflow={'auto'}  flex={1} justifyContent={'center'}  >
            <Box  w='70%' h={'120vh'} mt={5} >
                <Tabs align='center' isFitted  >
                  <TabList>
                    <Tab>Register</Tab>
                    <Tab>Log In</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel p={0}>
                      <Register/>
                    </TabPanel>
                    <TabPanel p={0}>
                      <Login/>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
            </Box>
        </VStack>
      </Flex>
    </Box>
  )
}

export default Onboarding