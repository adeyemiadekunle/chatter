
import { Box, Button, FormControl, FormLabel, Input, Textarea, Avatar, FormHelperText } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { fetchUserData, updateUserData, UserData, fetchAllUsers } from '../utils/helperFunctions';

const UserDataForm = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isUserNameAvailable, setIsUserNameAvailable] = useState<boolean | null>(null);
  const [userNameLoading, setUserNameLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userTagLine, setUserTagLine] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserData();
      setUserData(data);
      setDisplayName(data?.displayName || '');
      setEmail(data?.email || '');
      setUserName(data?.userName || '');
      setUserBio(data?.userBio || '');
      setUserTagLine(data?.userTagLine || '');
      setTechStack(data?.techStack || []);
      setLocation(data?.location || '');
      setPhotoURL(data?.photoURL || '');
      // Set initial values for other input fields
    };

    fetchUser();
  }, []);;


  const handleUpdate = async () => {

    if (userName.length < 4 || !isUserNameAvailable) {
      // Handle the case when the username is invalid
      return;
    }

    if (userData) {
      const updatedUserData: UserData = {
        ...userData,
        displayName,
        email,
        userName,
        userBio,
        userTagLine,
        techStack,
        location,
        photoURL,
        // Add other updated fields
      };
      await updateUserData(updatedUserData);
    }
  };

  const checkUsernameAvailability = async (username: string) => {
    setUserNameLoading(true);
    
    if (username.trim() === '') {
      setIsUserNameAvailable(null);
      setUserNameLoading(false);
      return;
    }
  
    const allUsers = await fetchAllUsers();
    const existingUser = allUsers.find((user) => user.userName === username);
    setIsUserNameAvailable(!existingUser);
    setUserNameLoading(false);
  };
  

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const alphanumericRegex = /^[a-zA-Z0-9]+$/; // Regular expression for alphanumeric characters only
  
    if (value === '' || alphanumericRegex.test(value)) {
      setUserName(value);
      checkUsernameAvailability(value);
    }
  };
  
  

  const avatarFallback = (
    <Avatar
      name={displayName || ''}
      bg="red.500"
      size="xl"
      fontSize="2xl"
      color="white"
    >
      {/* {displayName?.split(' ').map(name => name[0].toUpperCase()).join('')} */}
    </Avatar>
  );
  

  const avatarImage = (
    <Avatar
      name={displayName || ''}
      src={photoURL}
      size="xl"
    />
  );
  
  return (
    <Box>
      {userData ? (
        <form>

          <FormControl>
            <FormLabel>Photo URL</FormLabel>
              <Box display="flex" alignItems="center">
              {userData.photoURL ? avatarImage : avatarFallback}
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>Display Name</FormLabel>
            <Input name="displayName" value={displayName} onChange={e => setDisplayName(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={email} onChange={e=> setEmail(e.target.value)} />
          </FormControl>


          <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="userName"
                value={userName}
                onChange={handleUserNameChange}
                isInvalid={!isUserNameAvailable && userName.length >= 3}
                errorBorderColor='red.300'
                pattern="[a-zA-Z0-9]+"
              />

              <FormHelperText>
              {userNameLoading && userName.length >= 4 ? 'Checking for availability...'
             : userName.length >= 4 ? !isUserNameAvailable && !userNameLoading ? 'Username is already taken'
             : isUserNameAvailable && !userNameLoading ? "Congrats! That's available" : null
             : null}
              </FormHelperText>
          </FormControl>


          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea name="userBio" value={userBio} onChange={e => setUserBio(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Tagline</FormLabel>
            <Input name="userTagLine" value={userTagLine} onChange={e => setUserTagLine(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={location} onChange={e => setLocation(e.target.value)} />
          </FormControl>

          <Button mt={4} colorScheme="teal" onClick={handleUpdate}>
            Update
          </Button>
        </form>
      ) : (
        <p>Loading user data...</p>
      )}
    </Box>
  );
};

export default UserDataForm;