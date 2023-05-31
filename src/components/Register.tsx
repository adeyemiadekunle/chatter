import {useState} from 'react'
import {Box,  FormControl, FormLabel, InputGroup, InputRightElement, FormErrorMessage, Select, Input, Flex,  Heading, VStack,  Button } from '@chakra-ui/react'
import { GitHub, Google, Visibility, VisibilityOff } from '@mui/icons-material'

const Register = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
   
    const handleClickPassword = () => setShowPassword(!showPassword)
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)
   
    
    const validatePassword = (password: string) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return regex.test(password);
      };

        //  validate password
    const handlePasswordChange = (event) => {
      const { value } = event.target;
      setPassword(value);
      setIsPasswordInvalid(!validatePassword(value));
    };

        //   validate the confirm password
    const handleConfirmPasswordChange = (event) => {
        const { value } = event.target;
        setConfirmPassword(value);
        setIsConfirmPasswordInvalid(value !== password);
      };
  
    

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validatePassword(password)) {
          setIsPasswordInvalid(true);
          return;
        }
        if (password !== confirmPassword) {
          setIsConfirmPasswordInvalid(true);
          return;
        }
    
        // Handle form submission logic here
      };

  return (
    <>
       <Heading fontSize={'24px'} py={5}>Register as a Writer/Reader</Heading>
            <FormControl onSubmit={handleSubmit} isRequired >

                    <Flex gap={2} >
                        <Box flex={1}>
                            <FormLabel>First name</FormLabel>
                            <Input type='text'  placeholder="John" />       
                        </Box>
                        <Box flex={1}>
                            <FormLabel>Last Name</FormLabel>
                            <Input type='text' placeholder="Doe" />      
                        </Box>
                    </Flex>

                    <FormLabel pt={2}> You are joining as ? </FormLabel>
                        <Select placeholder='Writer' >
                            <option value="reader">Reader</option>
                        </Select>

                    <FormLabel pt={2}>Email Address</FormLabel>
                    <Input type="email" placeholder="johndoe@gmail.com"  /> 
                            
                    <FormControl isInvalid={isPasswordInvalid} isRequired>
                        <FormLabel pt={2} htmlFor="password">Password</FormLabel>
                        <InputGroup>
                            <Input  name='password' value={password} onChange={handlePasswordChange} type={showPassword ? 'text' : 'password'} placeholder="Enter Password" />
                            <InputRightElement color={'gray.600'}>
                                {showPassword ? <VisibilityOff onClick={handleClickPassword} /> : <Visibility onClick={handleClickPassword} /> }
                            </InputRightElement>              
                        </InputGroup>
                            {isPasswordInvalid && ( <FormErrorMessage>
                                                Password must be at least 8 characters long and contain at least
                                                one uppercase letter, one lowercase letter, and one number.
                            </FormErrorMessage> )}
                    </FormControl>

                    <FormControl isInvalid={isConfirmPasswordInvalid} isRequired>
                        <FormLabel pt={2} htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <InputGroup>
                            <Input  type={showConfirmPassword ? 'text' : 'password'} placeholder="Comfirm Password" name='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            <InputRightElement  color={'gray.600'} >
                                {showConfirmPassword ? <VisibilityOff onClick={handleClickConfirmPassword} /> : <Visibility onClick={handleClickConfirmPassword} /> }
                            </InputRightElement>
                        </InputGroup>
                        {isConfirmPasswordInvalid && (  <FormErrorMessage> Passwords do not match.  </FormErrorMessage> )} 
                    </FormControl>
                                                  
                    <Box pt={5}> <Button w={'100%'} color={'white'} bg={'#543EE0'} type='submit'> Create Account</Button></Box>
                </FormControl>

        <VStack spacing={4} mt={3}>
            <Button w={'100%'} variant='outline' leftIcon={<Google/>}  > Sign up with Google</Button>
            <Button w={'100%'} bg={'blackAlpha.900'} color={'white'} variant='outline' leftIcon={<GitHub/>} >Sign up with GitHub</Button>
        </VStack>
    </>

  )
}

export default Register