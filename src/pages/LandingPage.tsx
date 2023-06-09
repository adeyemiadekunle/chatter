import {
  Box,
  HStack,
  VStack,
  Stack,
  Text,
  Avatar,
  Center,
  Image,
  Flex,
  Container,
  Heading,
  Button,
  Card,
  Link
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Herobg from "../assets/herobg.png";
import AboutImage from "../assets/aboutImage.png";
import Analytics from "../assets/carbon_analytics.png";
import Social from "../assets/social.png";
import Content from "../assets/content.png";
import Testimonial from "../assets/Testimonial_Image.png";
import Getstarted1 from "../assets/getstarted1.png";
import Getstarted2 from "../assets/getstarted2.png";
import Getstarted3 from "../assets/getstarted3.png";

const Header = () => {
  return (
    <>
      <Box px={12} py={4}>
        <HStack spacing={10} justifyContent={"space-between"}>
          {/* logo */}
          <Box
            fontSize={"26px"}
            px={3}
            py={1}
            bg={"#543EE0"}
            fontWeight={700}
            color={"white"}
          >
            {" "}
            Chatter
          </Box>
          <HStack spacing={8}>
           <Link as={NavLink} to='/feed' > <Button color={'#543EE0'}>My Feed</Button></Link>
            <Box>Write</Box>
          </HStack>
          <HStack spacing={8} justifyContent={"center"} alignItems={"center"}>
            <Link as={NavLink} to="/onboard">
              <Button
                m={0}
                width={120}
                bg={"white"}
                borderColor={"#543EE0"}
                transition={"all .3s ease-in-out"}
                _hover={{ color: "white", bg: "#543EE0" }}
              >
                {" "}
                Log In
              </Button>
            </Link>

            <Link as={NavLink} to="/onboard">
              <Button
                m={0}
                width={120}
                color={"white"}
                bg={"#543EE0"}
                borderColor={"#543EE0"}
                transition={"all 0.3s ease-in-out"}
                _hover={{ color: "black", bg: "white", borderColor: "#543EE0" }}
              >
                Sign Up
              </Button>
            </Link>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

const LandingPage = () => {
  return (
    <>
      <Header />
      <Box>
        <Box
          mx={0}
          height={"600px"}
          bgImage={Herobg}
          bgSize={"cover"}
          bgRepeat={"no-repeat"}
        >
          <Box
            height={"600px"}
            bgColor={"blackAlpha.700"}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Box ml={150} color={"white"}>
              <Heading
                as="h1"
                pb={"25px"}
                fontSize={"56px"}
                lineHeight={"82px"}
                fontWeight={700}
              >
                Welcome to Chatter: A Haven for Text <br /> Based Content
              </Heading>
              <Text fontSize={"20px"} pb={"25px"} fontWeight={600}>
                Unleash the Power of Words, Connect with Like-minded Readers{" "}
                <br /> and Writers{" "}
              </Text>
              <Button
                bg={"#543EE0"}
                borderColor={"#543EE0"}
                width={150}
                p={6}
                ml={0}
                _hover={{
                  bg: "white",
                  border: " 1px solid #543EE0",
                  color: "black",
                }}
                transition={"all .3s ease-in-out"}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>

        <Container maxWidth={"1400px"} minH={"100vh"} px={12}>
          {/* About Chatter */}
          <Flex minH={"550px"}>
            <Box flex={1}>
              <Heading
                as="h2"
                pt={"100px"}
                pb={"34px"}
                fontSize={"48px"}
                fontWeight={700}
                lineHeight={"72px"}
              >
                {" "}
                About Chatter
              </Heading>
              <Text fontSize={"18px"} lineHeight={"27px"} width={"90%"}>
                Chatter is a multi-functional platform where authors and readers
                can have access to their own content. It aims to be a
                traditional bookworm’s heaven and a blog to get access to more
                text based content. Our vision is to foster an inclusive and
                vibrant community where diversity is celebrated. We encourage
                open-mindedness and respect for all individuals, regardless of
                their backgrounds or beliefs. By promoting dialogue and
                understanding, we strive.
              </Text>
            </Box>
            <Box
              width={"42%"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src={AboutImage}
                alt="aboutImage"
                objectFit="contain"
                boxSize="500px"
              ></Image>
            </Box>
          </Flex>

          {/* why should join chatter */}
          <VStack minH={"500px"} mx={"100px"} pb={"70px"}>
            <Box>
              <Heading pb={"20px"}>Why you should join Chatter</Heading>
            </Box>
            <Box>
              <Text fontSize={"18px"} pb={"40px"} mx={"30px"}>
                Our goal is to make writers and readers see our platform as
                their next heaven for blogging, ensuring ease in interactions,
                connecting with like-minded peers, have access to favorite
                content based on interests and able to communicate your great
                ideas with people
              </Text>
            </Box>
            <HStack spacing={12}>
              <Card
                width={"300px"}
                p={4}
                height={"300px"}
                border={"1px solid grey"}
              >
                <Box
                  borderRadius="100px"
                  bg={"gray.100"}
                  width={"70px"}
                  height={"70px"}
                  p={3}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image w={"30px"} src={Analytics}></Image>
                </Box>
                <Heading as="h3" fontSize={"24px"} py={"15px"}>
                  Analytics
                </Heading>
                <Text fontSize={"18px"}>
                  Analytics to track the number of views, likes and comment and
                  also analyze the performance of your articles over a period of
                  time
                </Text>
              </Card>
              <Card
                width={"300px"}
                p={4}
                height={"300px"}
                border={"1px solid grey"}
              >
                <Box
                  borderRadius="100px"
                  bg={"gray.100"}
                  width={"70px"}
                  height={"70px"}
                  p={3}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image w={"30px"} src={Social}></Image>
                </Box>
                <Heading as="h3" fontSize={"24px"} py={"15px"}>
                  Social interactions
                </Heading>
                <Text fontSize={"18px"}>
                  Users on the platform can interact with posts they like,
                  comment and engage in discussions
                </Text>
              </Card>
              <Card
                width={"300px"}
                p={4}
                height={"300px"}
                border={"1px solid grey"}
              >
                <Box
                  borderRadius="100px"
                  bg={"gray.100"}
                  width={"70px"}
                  height={"70px"}
                  p={3}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image w={"30px"} src={Content}></Image>
                </Box>
                <Heading as="h3" fontSize={"24px"} py={"15px"}>
                  Content creation
                </Heading>
                <Text fontSize={"18px"}>
                  Write nice and appealing with our in-built markdown, a rich
                  text editor
                </Text>
              </Card>
            </HStack>
          </VStack>
        </Container>
        {/* Testimonial */}
        <Box minH={"400px"} bg={"#FFEDCC80"} px={6} display={"flex"}>
          <Center
            w={"400px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              w={"250pxpx"}
              h={"250px"}
              borderRadius={"150px"}
              src={Testimonial}
              alt="testmonial person"
            />
          </Center>
          <Box flex={1}>
            <Text fontSize={"18px"} width={"90%"} pb={"48px"} mt={"80px"}>
              {" "}
              "Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.”{" "}
            </Text>
            <Text fontSize={"22px"} fontWeight={"500"} as="h4">
              Andrew Campbell,{" "}
              <span style={{ fontSize: "18px" }}>
                {" "}
                Software Developer at Apple
              </span>
            </Text>
            <Button
              mt={"38px"}
              ml={0}
              bg={"#543EE0"}
              color={"white"}
              _hover={{
                bg: "white",
                border: " 1px solid #543EE0",
                color: "black",
              }}
              transition={"all .3s ease-in-out"}
            >
              Join Chatter
            </Button>
          </Box>
        </Box>

        {/* Get Started */}
        <Box minH={"500px"} display={"flex"} px={10}>
          <Box width={"500px"}>
            <HStack h={"450px"} mt={"25px"}>
              <VStack
                flex={1}
                gap={"50px"}
                h={"450px"}
                justifyContent={"center"}
                alignItems={"flex-end"}
              >
                <Image
                  src={Getstarted1}
                  w={"150px"}
                  h={"150px"}
                  borderRadius={"100px"}
                />
                <Image
                  src={Getstarted2}
                  w={"150px"}
                  h={"150px"}
                  borderRadius={"100px"}
                />
              </VStack>
              <Box flex={1}>
                <Image
                  src={Getstarted3}
                  w={"150px"}
                  h={"150px"}
                  borderRadius={"100px"}
                />
              </Box>
            </HStack>
          </Box>
          <Box flex={1}>
            <Heading as="h3" fontSize={"48px"} lineHeight={"68px"} mt={"92px"}>
              Write, read and connect <br /> with great minds on chatter
            </Heading>
            <Text fontSize={"18px"} width={"90%"} mt={"24px"}>
              Share people your great ideas, and also read write-ups based on
              your interests. connect with people of same interests and goals
            </Text>
            <Button
              mt={"36px"}
              ml={0}
              bg={"#543EE0"}
              color={"white"}
              width={"150px"}
              _hover={{
                bg: "white",
                border: " 1px solid #543EE0",
                color: "black",
              }}
              transition={"all .3s ease-in-out"}
            >
              Get started
            </Button>
          </Box>
        </Box>

        <Box h={"300px"} bg={"#FFEDCC80"}>
          Footer
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
