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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  fetchUserData,
  updateUserData,
  UserData,
} from "../utils/helperFunctions";
import CreateUserAccount from "../components/CreateUserAccount";

const steps = [{}, {}, {}];

const StepHeading = [
  <Flex gap={{ base: "3", md: "8" }} fontSize="20px" whiteSpace="nowrap">
    <Text fontWeight="bold"> Step 1</Text>
    <Text> Create your Account</Text>
  </Flex>,
  <Flex gap={{ base: "3", md: "8" }} fontSize="20px" whiteSpace="nowrap">
    <Text fontWeight="bold"> Step 2</Text>
    <Text> </Text> What brings you to Chatter
  </Flex>,
  <Flex gap={{ base: "3", md: "8" }} fontSize="20px" whiteSpace="nowrap">
    <Text fontWeight="bold"> Final Step</Text>
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
  const [techStack, setTechStack] = useState<string[]>([]);
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
    />,
    <div>Step 2 Content</div>,
    <div>Step 3 Content</div>,
  ];

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const isLastStep = activeStep === steps.length - 1;

  // checking if the user has entered the required fields in the first step
  const checkCreateAccount = userName.length < 4 || userTagLine === "";

  return (
    <Box px={6}>
      <Box
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "40px", md: "30px" }}
      >
        <VStack w="100%">
          <HStack bg="white" p={4} w="100%" mb="30px" justifyContent="center">
            <Box
              fontSize={{ base: "28px", md: "30px" }}
              px={3}
              bg={"#543EE0"}
              fontWeight={700}
              color={"white"}
            >
              Chatter
            </Box>
          </HStack>
          <Box w={{ base: "100%", md: "50%" }} mb="50px">
            <Box mb={3}>{StepHeading[activeStep]}</Box>
            <Stepper size="md" colorScheme="blue" index={activeStep}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator w={"80px"} h={4}>
                    <StepStatus complete={<StepIcon />} />
                  </StepIndicator>
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
              isDisabled={checkCreateAccount}
              w="100%"
              colorScheme="blue"
              onClick={handleNextStep}
            >
              Continue
            </Button>
          )}

          {activeStep === 1 && (
            <>
              <Button colorScheme="blue" onClick={handleBackStep}>
                Back{" "}
              </Button>
              <Button colorScheme="blue" onClick={handleNextStep}>
                Continue{" "}
              </Button>
            </>
          )}
          {isLastStep && (
            <Button colorScheme="blue" w="100%" onClick={handleUpdate}>
              Finish{" "}
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default CreateAccount;
