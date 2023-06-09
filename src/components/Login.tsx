import { useState, useEffect } from 'react';
import { GitHub, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Text, Link, FormControl, FormLabel, InputGroup, InputRightElement, FormErrorMessage,  Input,  Heading, VStack, Button } from '@chakra-ui/react';
// import { useDisclosure } from '@chakra-ui/react';
import { useFirebaseContext} from '../context';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import PasswordReset from './PasswordReset';


type LoginFormValues = {
  email: string;
  password: string;

};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const { GoogleSignIn,  signIn, isAuth, isLoading } = useFirebaseContext();
  const { handleSubmit, register, formState: { errors }, getValues } = useForm<LoginFormValues>();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // const  { isOpen, onOpen, onClose } = useDisclosure();


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
    if (isAuth && !isLoading) {
      navigate('/feed');
    }
  }, [isAuth, navigate, isLoading]);

  return (
    <>
      <Heading fontSize={'24px'} py={5}>Welcome Back</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder='johndoe@gmail.com' {...register('email', { required: 'Email is required' })} />
          {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}

          <FormControl isRequired  isInvalid={!!errors.password || !!errorMessage}>
            <FormLabel pt={2} htmlFor="password">Password</FormLabel>
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
            <Button w={'100%'} color={'white'} bg={'#543EE0'} type='submit'> Log In</Button>
          </Box>
          <Link><Text pt={2} fontSize={'14px'} >Reset forgotten Password</Text></Link>
          <VStack spacing={4} mt={3}>
            <Button w={'100%'} variant='outline' leftIcon={<Google />} onClick={GoogleSignIn}> Log In with Google</Button>
            <Button w={'100%'} bg={'blackAlpha.900'} color={'white'} variant='outline' leftIcon={<GitHub />} >Log In with GitHub</Button>
          </VStack>
        </FormControl>
      </form>
    </>
  );
};

export default Login;
