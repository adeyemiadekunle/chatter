import {Box, Flex, Text, VStack,  Tabs, TabList, TabPanels, Tab, TabPanel, Link, Icon } from '@chakra-ui/react'
import OnboardImage from '../assets/onboarding.png'
import { NavLink } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'

import Register from '../components/Register'
import Login from '../components/Login'


const Onboarding = () => {

  return (
    <Box  minH={{base: '90vh', md: '100vh'}} >
      <Flex>
        <Box flex={1}  bgImage={OnboardImage} bgSize={'cover'} bgPosition={'center'} bgRepeat={'no-repeat'}  minH={'100vh'} display={{base: 'none', md: 'block'}} >
          <VStack h={'100%'}  bgColor={'blackAlpha.700'} color={'whiteAlpha.900'}  justifyContent={'center'}>
              <Box fontSize={'42px'} px={3} py={1} bg={'#543EE0'} fontWeight={700} color={'white'} mt={'-60px'}> Chatte</Box>
              <Text w={'72%'} pt={1} fontSize={'24px'} fontWeight={'600'}>Unleash the Power of Words, Connect with Like-minded Readers and Writers</Text>
          </VStack>
        </Box>

        <VStack  overflow={'auto'}  flex={1} justifyContent={'center'}  >
            <Box  w={{base: '90%', md: '70%'}} minH={{base: '90vh', md: '100vh'}} mt={5} mb={{base: '0', md: '50px'}}  >
               <Link as={NavLink} to='/' display={'flex'} alignItems={'center'} fontSize={'13px'} mt={3} mb={2}> <Icon fontSize={'md'} as={ArrowBack}/> <Text pl={1}>Back</Text> </Link>
                <Tabs align='center' isFitted  defaultIndex={1}  >
                  <TabList>
                    <Tab fontSize='base' >Register</Tab>
                    <Tab fontSize='base' >Log In</Tab>
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