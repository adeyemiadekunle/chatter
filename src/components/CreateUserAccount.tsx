import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  FormHelperText,
  Heading,
  Text,
  Link,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { fetchAllUsers } from "../utils/helperFunctions";

interface UserDataFormProps {
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  photoURL: string;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  userTagLine: string;
  setUserTagLine: React.Dispatch<React.SetStateAction<string>>;
  userData: any;
  isUserNameAvailable: boolean | null;
  setIsUserNameAvailable: React.Dispatch<React.SetStateAction<boolean | null>>;
 
}

const UserDataForm = ({
  displayName,
  setDisplayName,
  photoURL,
  userName, 
  setUserName,
  email,
  userTagLine,
  setUserTagLine,
  userData,
  isUserNameAvailable,
  setIsUserNameAvailable,
  
}: UserDataFormProps) => {
  // const [isUserNameAvailable, setIsUserNameAvailable] = useState<boolean | null>(null);
  const [userNameLoading, setUserNameLoading] = useState(false);

  const checkUsernameAvailability = async (username: string) => {
    setUserNameLoading(true);

    if (username.trim() === "") {
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

    if (value === "" || alphanumericRegex.test(value)) {
      setUserName(value);
      checkUsernameAvailability(value);
    }
  };

  // Avatart Fallback
  const avatarFallback = (
    <Avatar
      name={displayName || ""}
      bg="red.500"
      size="xl"
      fontSize="2xl"
      color="white"
    >
    </Avatar>
  );

  const avatarImage = (
    <Avatar name={displayName || ""} src={photoURL} size="xl" />
  );

  return (
    <Box mb={"20px"}>
      {userData ? (
        <form>
          <VStack spacing={5}>
            <VStack w="100%" mb={4} mt={6}>
              <Box> {userData.photoURL ? avatarImage : avatarFallback}</Box>
              <Heading mt={4} as="h4" fontSize="24px">
                Create your account
              </Heading>
              <Text> Let's git init you into Chatter journey</Text>
            </VStack>

            <FormControl isRequired>
              <FormLabel fontSize={{ base: "14px", md: "16px" }}>
                Full Name
              </FormLabel>
              <Input
                fontSize='base' 
                name="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                bg="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize={{ base: "14px", md: "16px" }}>
                Pick a username
              </FormLabel>
              <Input
                fontSize='base' 
                name="userName"
                value={userName}
                onChange={handleUserNameChange}
                isInvalid={!isUserNameAvailable && userName.length >= 3}
                errorBorderColor="red.300"
                pattern="[a-zA-Z0-9]+"
                placeholder="Pick a username..."
                bg="white"
              />

              <FormHelperText>
                {userNameLoading && userName.length >= 4
                  ? "Checking for availability..."
                  : userName.length >= 4
                  ? !isUserNameAvailable && !userNameLoading
                    ? "Username is already taken"
                    : isUserNameAvailable && !userNameLoading
                    ? "Congrats! That's available"
                    : null
                  : null}
              </FormHelperText>
            </FormControl>

            <FormControl isReadOnly isRequired>
              <FormLabel fontSize={{ base: "14px", md: "16px" }}>
                Your email address
              </FormLabel>
              <Input fontSize='base'  name="email" value={email} bg="white" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize={{ base: "14px", md: "16px" }}>
                Enter your Tagline. Tell us about what you do
              </FormLabel>
              <Input
                fontSize='base' 
                name="userTagLine"
                value={userTagLine}
                onChange={(e) => setUserTagLine(e.target.value)}
                placeholder="Enter your tagline..."
                bg="white"
              />
            </FormControl>

            <Box mt={5}>
              <Text fontStyle="italic" fontSize="14px">
                By continue to the next step, you are agreeing to Chatter's{" "}
                <Link as="a" color="blue">
                  terms of service
                </Link>
                and
                <Link as="a" color="blue">
                  the privacy policy.
                </Link>
              </Text>
            </Box>
          </VStack>
        </form>
      ) : (
        <p>Loading user data...</p>
      )}
    </Box>
  );
};

export default UserDataForm;
