import {
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  Box,
  HStack,
  VStack,
  Text,
  Flex,
  Button,
  StepTitle,
  Image
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  fetchUserData,
  updateUserData,
  UserData,
} from "../utils/helperFunctions";
import CreateUserAccount from "../components/CreateUserAccount";
import ChooseTags from "../components/ChooseTags";
import { useNavigate } from "react-router-dom";
import { Tags } from "../utils/helperFunctions";
import SEO from "../components/SEO";
import Logo from '../assets/logo.png'

const steps = [{ title: "First" }, { title: "Final" }];

const StepHeading = [
  <Flex gap={{ base: "3", md: "8" }} alignItems="center" whiteSpace="nowrap">
    <Text fontWeight="bold" fontSize="20px">
      {" "}
      Step 1
    </Text>
    <Text> Create your Account</Text>
  </Flex>,
  <Flex gap={{ base: "3", md: "8" }} alignItems="center" whiteSpace="nowrap">
    <Text fontWeight="bold" fontSize="20px">
      {" "}
      Final Step
    </Text>
    <Text> Choose your tags</Text>
  </Flex>,
];

function CreateAccount() {
  //  User Data
  const [userData, setUserData] = useState<UserData | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userTagLine, setUserTagLine] = useState("");
  const [techStack, setTechStack] = useState<Tags[]>([]);
  const [location, setLocation] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isUserNameAvailable, setIsUserNameAvailable] = useState<
    boolean | null
  >(null);
  const navigate = useNavigate();

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

  console.log(techStack);

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
      navigate("/");
    }
  };

  console.log(userTagLine);

  const [activeStep, setActiveStep] = useState(0);

  const stepContent = [
    <CreateUserAccount
      userData={userData}
      photoURL={photoURL}
      displayName={displayName}
      setDisplayName={setDisplayName}
      userName={userName}
      setUserName={setUserName}
      email={email}
      userTagLine={userTagLine}
      setUserTagLine={setUserTagLine}
      isUserNameAvailable={isUserNameAvailable}
      setIsUserNameAvailable={setIsUserNameAvailable}
    />,
    <ChooseTags selectedTags={techStack} setSelectedTags={setTechStack} />,
  ];

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // checking if the user has entered the required fields in the first step and check if the username is available
  const checkCreateAccount =
    userName.length < 4 || userTagLine === "" || isUserNameAvailable === false;

  const checkChoosetTags = techStack.length < 3;

  return (
    <>
      <SEO title="Create Account" description="" name="" type="" />
      <Box >
        <HStack bg="white" p={4} w="100%" mb="30px" justifyContent="center">
          <HStack>
            <Image src={Logo} /> <Text fontSize='lg' fontWeight='700'>chatte</Text>
          </HStack>
        </HStack>
        <Box
          minH="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mb={{ base: "40px", md: "30px" }}
          px={6}
        >
          <VStack w="100%">
            <Box w={{ base: "100%", md: "50%" }} mb="50px">
              <Box mb={3}>{StepHeading[activeStep]}</Box>
              <Stepper size="md" colorScheme="blue" index={activeStep}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator w={"80px"} h={4}>
                      <StepStatus complete={<StepIcon />} />
                    </StepIndicator>
                    <Box display="none">
                      <StepTitle>{step.title}</StepTitle>
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box w={{ base: "100%", md: "50%" }}>
              <Box>{stepContent[activeStep]}</Box>
            </Box>
          </VStack>

          <Flex
            py={5}
            justifyContent="space-between"
            w={{ base: "100%", md: "50%" }}
            alignItems="center"
          >
            {activeStep === 0 && (
              <Button
                fontSize="base"
                isDisabled={checkCreateAccount}
                w="100%"
                colorScheme="blue"
                onClick={handleNextStep}
              >
                Continue
              </Button>
            )}

            {activeStep === 1 && (
              <Button
                fontSize="base"
                isDisabled={checkChoosetTags}
                colorScheme="blue"
                w="100%"
                onClick={handleUpdate}
              >
                Finish{" "}
              </Button>
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default CreateAccount;
