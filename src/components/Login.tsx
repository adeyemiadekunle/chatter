import {useState} from 'react'
import { GitHub, Google, Visibility, VisibilityOff } from '@mui/icons-material'
import {Box,  FormControl, FormLabel, InputGroup, InputRightElement, FormErrorMessage, Select, Input, Flex,  Heading, VStack,  Button } from '@chakra-ui/react'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickPassword = () => setShowPassword(!showPassword)

  return (
    <>
    <Heading fontSize={'24px'} py={5}>Welcome Back</Heading>
    <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type='email' placeholder='johndoe@gmail.com'/>

        <FormControl  isRequired>
            <FormLabel pt={2} htmlFor="password">Password</FormLabel>
                <InputGroup>
                    <Input  name='password'   type={showPassword ? 'text' : 'password'} placeholder="Enter Password" />
                        <InputRightElement color={'gray.600'}>
                                {showPassword ? <VisibilityOff onClick={handleClickPassword} /> : <Visibility onClick={handleClickPassword} /> }
                        </InputRightElement>              
                    </InputGroup>                 
        </FormControl>

        <Box pt={5}> <Button w={'100%'} color={'white'} bg={'#543EE0'} type='submit'> Log In</Button></Box>
        <VStack spacing={4} mt={3}>
            <Button w={'100%'} variant='outline' leftIcon={<Google/>}  > Log In with Google</Button>
            <Button w={'100%'} bg={'blackAlpha.900'} color={'white'} variant='outline' leftIcon={<GitHub/>} >Log In with GitHub</Button>
        </VStack>

    </FormControl>
    </>
  )
}

export default Login