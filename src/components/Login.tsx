import { useState, useEffect } from 'react';
import { GitHub, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Text, Link, FormControl, FormLabel, InputGroup, InputRightElement, FormErrorMessage,  Input,  Heading, VStack, Button } from '@chakra-ui/react';
import { userAuth} from '../context/Firebase';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { fetchUserData } from '../utils/helperFunctions';
import SEO from '../components/SEO';


type LoginFormValues = {
  email: string;
  password: string;

};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const { GoogleSignIn,  signIn, isAuth, isLoading, GithubSignIn } = userAuth();
  const { handleSubmit, register, formState: { errors }, getValues } = useForm<LoginFormValues>();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleGoogleSignIn = async () => {
    try {
       GoogleSignIn();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleGithubSigIn = async() => {
    try{
      GithubSignIn();
    } catch(error){
      console.error('error github sigin in', error)
    }
  };
  

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signIn(data.email, data.password);
          } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password');
      } else {
        setErrorMessage('An error occurred: ' + error.message);
      }
    }
  };




  useEffect(() => {
    const checkUserData = async () => {
      if (isAuth && !isLoading && auth.currentUser) {
        const  user = await fetchUserData();
        console.log('user', user);
        if (user?.userName !== '' && user?.userTagLine !== '' && user?.techStack?.length !== undefined && user?.techStack?.length > 0) {
          console.log('User data is complete, navigate to feed');
          navigate('/feed');
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
      <SEO title='Login/Register to Chatter' description='' name='' type='' />
      <Heading fontSize='md' py={5}>Welcome Back</Heading>
      <form onSubmit={handleSubmit(onSubmit)} >
        <FormControl isRequired >
          <FormLabel >Email</FormLabel>
          <Input  type='email' placeholder='johndoe@gmail.com' {...register('email', { required: 'Email is required' })} />
          {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}

          <FormControl isRequired  isInvalid={!!errors.password || !!errorMessage} >
            <FormLabel  pt={2} htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                {...register('password', {
                  required: 'Password is required',
                  validate: value => {
                    const password = getValues('password'); // Get the password value
                    return value === password || 'Incorrect password';
                  }
                })}
              />
              <InputRightElement color={'gray.600'}>
                {showPassword ? <VisibilityOff onClick={handleClickPassword} /> : <Visibility onClick={handleClickPassword} />}
              </InputRightElement>
            </InputGroup>
            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
            {errors.password?.type === 'validate' && (<Text color={'red'} mt={2}>  {errors.password.message}</Text>)}
          </FormControl>

          <Box pt={5}>
            <Button w={'100%'} isLoading={isLoading} color={'white'}  bg='brand.800' type='submit'> Log In</Button>
          </Box>
          <Link><Text pt={2} fontSize={'14px'} >Reset forgotten Password</Text></Link>
          <VStack spacing={4} mt={3}>
            <Button w={'100%'} variant='outline' leftIcon={<Google />}  color='red'  onClick={handleGoogleSignIn}> Log In with Google</Button>
            <Button w={'100%'} bg={'blackAlpha.900'} color={'white'}   onClick={handleGithubSigIn} variant='outline' leftIcon={<GitHub />} >Log In with GitHub</Button>
          </VStack>
        </FormControl>
      </form>
    </>
  );
};

export default Login;
