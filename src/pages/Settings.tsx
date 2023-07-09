import { useState, useEffect } from "react";
import {
  fetchUserData,
  updateUserData,
  UserData,
  Tags,
} from "../utils/helperFunctions";
import {
  Box,
  Text,
  Flex,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import { Container } from "../components/ArticleContainer";
import HeaderAlt from "../components/HeaderAlt";
import ProfileUpdate from "../components/ProfileUpdate";

const Settings = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userTagLine, setUserTagLine] = useState("");
  const [techStack, setTechStack] = useState<Tags[]>([]);
  const [location, setLocation] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserData();
      setUserData(data);
      setDisplayName(data?.displayName || "");
      setEmail(data?.email || "");
      setUserName(data?.userName || "");
      setUserBio(data?.userBio || "");
      setUserTagLine(data?.userTagLine || "");
      setTechStack(data?.techStack || []);
      setLocation(data?.location || "");
      setPhotoURL(data?.photoURL || "");
      // Set initial values for other input fields
    };

    fetchUser();
  }, []);

  
  const handleUpdate = async () => {
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


  return (
    <>
      <HeaderAlt />
        <Tabs  variant='unstyled' >
        <HStack  spacing={{base: '0', md: '8'}} maxW='1280px' m='0 auto' mt={10}  alignItems='flex-start' flexDir={{base: 'column', md: 'row'}} >
          <Flex w={{base: '100%', md: '300px'}} flexDir='column' gap={2} >

            <Container display={"block"} height={"50px"}>
              <HStack height='50px' w='100%' >
                <Text fontSize='20px' textAlign='center' fontWeight='600' w='100%'>User Settings </Text>
              </HStack>
            </Container>

            <Container display={"block"} height={"50px"} >
              <TabList display='flex' flexDir={{base: 'row', md: 'column'}}>
                  <Tab  _hover={{bg: 'gray.100'}} _selected={{color: 'brand.800'}} >
                    <HStack py={2} w='100%'> 
                      <Text w='100%' textAlign='center'>Profile</Text>  
                    </HStack>
                </Tab>
                <Tab _hover={{bg: 'gray.100'}}  _selected={{color: 'brand.800'}}>      
                  <HStack py={2} w='100%'>
                     <Text w='100%' textAlign='center'>Account</Text>  
                  </HStack>
                </Tab>
              </TabList>
            </Container>
          </Flex>

          <Box flex={{base: '0', md: '1'}} w='100%' pt={{base: '5', md: '0'}} >
            <TabPanels>
              <TabPanel p={0}>
                <Container display={"block"} height={"300px"}>
                 <Box pb='100px'>
                  <ProfileUpdate
                      displayName={displayName}
                      setDisplayName={setDisplayName}
                      userTagLine={userTagLine}
                      setUserTagLine={setUserTagLine}
                      location={location}
                      setLocation={setLocation}
                      userBio={userBio}
                      setUserBio={setUserBio}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                      techStack={techStack}
                      setTechStack={setTechStack}
                      userName={userName}
                      setUserName={setUserName}
                      email={email}
                      setEmail={setEmail}
                    />
                    <Box  mt={10} px={6}>
                       <Button fontSize='base' onClick={handleUpdate} color='brand.800' variant='outline' colorScheme="brand.800">
                          Update
                       </Button>
                    </Box>
                  </Box>
                </Container>
              </TabPanel>
              <TabPanel p={0}>
                <Container display={"block"} height={"300px"}>
                  <Text>Account</Text>
                </Container>
              </TabPanel>
            </TabPanels>
          </Box>
        </HStack>
      </Tabs>

     
    </>
  );
};

export default Settings;
