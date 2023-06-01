import {Box, Flex, Text, VStack,  Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import OnboardImage from '../assets/onboarding.png'

// import Register from '../components/Register'
import Register from '../components/Register'
import Login from '../components/Login'


const Onboarding = () => {

  


  return (
    <Box  minH={'100vh'}>
      <Flex>
        <Box flex={1}  bgImage={OnboardImage} bgSize={'cover'} bgPosition={'center'} bgRepeat={'no-repeat'}  minH={'100vh'}>
          <VStack minH={'100%'}  bgColor={'blackAlpha.700'} color={'whiteAlpha.900'} mt={-20} justifyContent={'center'}>
          <Box fontSize={'42px'} px={3} py={1} bg={'#543EE0'} fontWeight={700} color={'white'}> Chatter</Box>
              <Text w={'72%'} pt={1} fontSize={'24px'} fontWeight={'600'}>Unleash the Power of Words, Connect with Like-minded Readers and Writers</Text>
          </VStack>
        </Box>

        <VStack  overflow={'auto'}  flex={1} justifyContent={'center'}  >
            <Box  w='70%' h={'120vh'} mt={5} >
                <Tabs align='center' isFitted  defaultIndex={1}  >
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