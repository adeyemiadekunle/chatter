import { useEffect, useState} from 'react';
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
import { userAuth } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../utils/firebase';
import { fetchUserData } from '../utils/helperFunctions';
// import { set } from 'lodash';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { handleSubmit, register, formState: { errors }, watch } = useForm<RegisterFormData>();
  const { signUp, GoogleSignIn, isLoading, isAuth, GithubSignIn} = userAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword); 

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const password = watch('password');
  const validateConfirmPassword = (confirmPassword: string) => {
    return confirmPassword === password;
  };

  const handleGoogleSignUp =  async () => {
    try {
      GoogleSignIn();
    } catch (e) {
      console.error('Error signing in with Google:', e);
    }
  };

  const handleGithubSigIn = async() => {
    try{
      GithubSignIn();
    } catch(error){
      console.error('error github sigin in', error)
    }
  };
  


  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data.email, data.password, data.firstName, data.lastName);  
    } catch (error: any) {
      toast.error(`${error.message}`, { position: 'top-center' });
  };

}


useEffect(() => {
  const checkUserData = async () => {
    if (isAuth && !isLoading && auth.currentUser) {
      const  user = await fetchUserData();
      console.log('user', user);
      if (user?.userName !== '' && user?.userTagLine !== '' && user?.techStack?.length !== undefined && user?.techStack?.length > 0) {
        console.log('User data is complete, navigate to feed');
        navigate('/');
      } 
      else {
        console.log('User data is incomplete, navigate to create-account page');
        navigate('/onboard/create-account');
      }

    }
  };

  checkUserData();
}, [isAuth, isLoading, navigate, auth]);


  return (
    <>
      <Heading fontSize='md' py={5}>Welcome to Chatter</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <Flex gap={2}>
            <Box flex={1} >
              <FormLabel >First name</FormLabel>
              <Input fontSize='base'   type='text' placeholder="John" {...register('firstName', { required: 'First name is required' })} />
            </Box>
            <Box flex={1}>
              <FormLabel  >Last Name</FormLabel>
              <Input fontSize='base'  type='text' placeholder="Doe" {...register('lastName', { required: 'Last name is required' })} />
            </Box>
          </Flex>
        </FormControl>

        <FormControl isRequired>   
            <FormLabel pt={2}>Email Address</FormLabel>
            <Input fontSize='base'  type="email" placeholder="johndoe@gmail.com" {...register('email', { required: 'Email is required' })} />
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel pt={2} htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
             fontSize='base' 
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
            fontSize='base' 
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
          <Button fontSize='base'  w={'100%'} color={'white'} bg={'#543EE0'} type='submit' isLoading={isLoading}>
            Create Account
          </Button>
        </Box>
      </form>

      <VStack spacing={4} mt={3}>
        <Button fontSize='base'  w={'100%'} variant='outline' leftIcon={<Google />}  onClick={handleGoogleSignUp} > Sign up with Google</Button>
        <Button fontSize='base'  w={'100%'} bg={'blackAlpha.900'} color={'white'} variant='outline' leftIcon={<GitHub />} onClick={handleGithubSigIn} >Sign up with GitHub</Button>
      </VStack>
    </>
  );
}

export default Register;
