import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Input,
  Flex,
  Heading,
  VStack,
  Button,
} from '@chakra-ui/react';
import { GitHub, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { useFirebaseContext } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { handleSubmit, register, formState: { errors }, watch } = useForm<RegisterFormData>();
  const { signUp, GoogleSignIn, isLoading, } = useFirebaseContext();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleGoogleSignUp = () => {
    try {
      GoogleSignIn();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  // const usersCollection = collection(db, 'users');
  // const querySnapshot = await getDocs(query(usersCollection, where('email', '==', email)));
  // if (!querySnapshot.empty) {
  // // User already exists, handle accordingly (e.g., show error message)
  // toast.error('User with this email address already exists');
  // return;
  // }



  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data.email, data.password, data.firstName, data.lastName); 
        
      navigate('/onboard/create-account');
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      toast.error(`Firebase Error: ${errorMessage}`);

  };

}

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const password = watch('password');
  const validateConfirmPassword = (confirmPassword: string) => {
    return confirmPassword === password;
  };

  return (
    <>
      <Heading fontSize='md' py={5}>Welcome to Chatter</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <Flex gap={2}>
            <Box flex={1} >
              <FormLabel >First name</FormLabel>
              <Input  type='text' placeholder="John" {...register('firstName', { required: 'First name is required' })} />
            </Box>
            <Box flex={1}>
              <FormLabel  >Last Name</FormLabel>
              <Input  type='text' placeholder="Doe" {...register('lastName', { required: 'Last name is required' })} />
            </Box>
          </Flex>
        </FormControl>

        <FormControl isRequired>   
            <FormLabel pt={2}>Email Address</FormLabel>
            <Input type="email" placeholder="johndoe@gmail.com" {...register('email', { required: 'Email is required' })} />
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel pt={2} htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              {...register('password', {
                required: 'Password is required',
                validate: {
                  validPassword: value => validatePassword(value) || 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
                }
              })}
            />
            <InputRightElement color={'gray.600'}>
              {showPassword ? <VisibilityOff onClick={handleClickPassword} /> : <Visibility onClick={handleClickPassword} />}
            </InputRightElement>
          </InputGroup>
          {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword} isRequired>
          <FormLabel pt={2} htmlFor="confirmPassword">Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Comfirm Password"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: {
                  validConfirmPassword: value => validateConfirmPassword(value) || 'Passwords do not match.'
                }
              })}
            />
            <InputRightElement color={'gray.600'}>
              {showConfirmPassword ? <VisibilityOff onClick={handleClickConfirmPassword} /> : <Visibility onClick={handleClickConfirmPassword} />}
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>}
        </FormControl>

        <Box pt={5}>
          <Button w={'100%'} color={'white'} bg={'#543EE0'} type='submit' isLoading={isLoading}>
            Create Account
          </Button>
        </Box>
      </form>

      <VStack spacing={4} mt={3}>
        <Button w={'100%'} variant='outline' leftIcon={<Google />}  onClick={handleGoogleSignUp} > Sign up with Google</Button>
        <Button w={'100%'} bg={'blackAlpha.900'} color={'white'} variant='outline' leftIcon={<GitHub />} >Sign up with GitHub</Button>
      </VStack>
    </>
  );
}

export default Register;
