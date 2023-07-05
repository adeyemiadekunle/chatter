import {
  Box,
  HStack,
  VStack,
  Text,
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
import SEO from "./SEO";
import Header from "./Header";


const LandingPage = () => {
  return (
    <>
     <SEO title="Chatte" description="Chatte is a platform for writers to share their stories and connect with readers." name='' type=""  />
      <Header />
      <Box>
        <Box
          mx={0}
          height='600px'
          bgImage={Herobg}
          bgSize={"cover"}
          bgRepeat={"no-repeat"}
        >
          {/* Overlay */}
          <Box
            height='600px'
            bgColor={"blackAlpha.700"}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Box ml={{base: '0', md: '150'}} color={"white"} maxW={{base: '100%', md: '80%'}} px={2}>

              <Heading
                as="h1"
                pb={"25px"}
                fontSize='2xl'
                lineHeight={{base:'50px', md: "72px"}}
                fontWeight={700}
                textAlign={{base: 'center', md: 'left'}}
              
              >
                Welcome to Chatter: A Haven for Text Based Content
              </Heading>
              <Text fontSize='md' textAlign={{base: 'center', md: 'left'}} pb={"25px"} fontWeight={600}>
                Unleash the Power of Words, Connect with Like-minded Readers
                <br /> and Writers
              </Text>
              <Box  display={{base:' flex', md: 'block'}} justifyContent='center'  >
               <Link as={NavLink} to='/onboard' >
               <Button
                  bg='brand.800'
                  fontSize='base'
                  width={150}
                  p={6}
                  ml={0}
                  _hover={{ bg: 'brand.700'}}
                  transition={"all .3s ease-in-out"}
                >
                  Get Started
                </Button>
               </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        <Container maxWidth={"1400px"} minH={"100vh"} px={{base: '5', md: '12'}}  >
          {/* About Chatter */}
          <Flex minH={"550px"}  flexDir={{base: 'column', md: 'row'}}  >
            <Box flex={1}  pl={{base: ' 0', md: '10'}} >
              <Heading
                as="h2"
                pt={{base: '30px', md: "100px"}}
                pb={{base: '', md: "20px" }}
                fontSize='lg'
                fontWeight={700}
                lineHeight='tall'
              >
                About Chatter
              </Heading>
            <Text fontSize='base' lineHeight='base' width={{base: '100%', md: '90%'}}>
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
              width={{base: '100%', md: "48%"}}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              py={{base: '10', md: '0'}}
              px={{base: '2', md: '0'}}
            >
              <Image
                src={AboutImage}
                alt="aboutImage"
                objectFit={{base: 'cover', md: 'contain'}}
                boxSize={{base: '400px', md:'500px'}}
                borderRadius='10px'
              ></Image>
            </Box>
          </Flex>

          {/* why should join chatter */}
          <VStack minH={"500px"} mx={{base: '0', md: '100px'}} pb={"70px"}  mt={{base: '5', md: '0'}} >
            <Box>
              <Heading as='h2' fontSize='lg' pb={"20px"}  >Why you should join Chatter</Heading>
            </Box>
            <Box>
              <Text fontSize='base' pb={"40px"} mx={{base: '0', md: '30px'}}>
                Our goal is to make writers and readers see our platform as
                their next heaven for blogging, ensuring ease in interactions,
                connecting with like-minded peers, have access to favorite
                content based on interests and able to communicate your great
                ideas with people
              </Text>
            </Box>
            <HStack spacing={{base: '0', md: '12'}}  flexDir={{base: 'column', md: 'row'}} gap={{base: '24px', md: '0'}} >
              <Card
                width={{base: '95%', md: '300px'}}
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
                <Heading as="h3" fontSize='md' py={"15px"}>
                  Analytics
                </Heading>
                <Text fontSize='base'>
                  Analytics to track the number of views, likes and comment and
                  also analyze the performance of your articles over a period of
                  time
                </Text>
              </Card>
              <Card
                width={{base: '95%', md: '300px'}}
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
                <Heading as="h3" fontSize='md' py={"15px"}>
                  Social interactions
                </Heading>
                <Text fontSize='base'>
                  Users on the platform can interact with posts they like,
                  comment and engage in discussions
                </Text>
              </Card>
              <Card
                width={{base: '95%', md: '300px'}}
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
                <Heading as="h3" fontSize='md' py={"15px"}>
                  Content creation
                </Heading>
                <Text fontSize='base'>
                  Write nice and appealing with our in-built markdown, a rich
                  text editor
                </Text>
              </Card>
              
            </HStack>
          </VStack>
        </Container>


        {/* Testimonial */}
         <VStack bg={"#FFEDCC80"}  minH={"400px"}  >
          <Box  px={6} display={"flex"} maxW='1400px' >
            <Center
              w={"400px"}
              display={{base: 'none', md: 'flex'}}
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
            <Box flex={1} textAlign={{base: 'center', md: 'left'}} px={{base: '2', md: '0'}} >
              <Text fontSize='base' width={{base: '100%', md: '90%'}} pb={"48px"} mt={{base: '40px', md: '80px'}}  >
                "Chatter has become an integral part of my online experience. As a
                user of this incredible blogging platform, I have discovered a
                vibrant community of individuals who are passionate about sharing
                their ideas and engaging in thoughtful discussions.”
              </Text>

              <Center
              w={"100%"}
              display={{base: 'flex', md: 'none'}}
              justifyContent={"center"}
              alignItems={"center"}
              mb={6}
              >
              <Image
                w={"250pxpx"}
                h={"250px"}
                borderRadius={"150px"}
                src={Testimonial}
                alt="testmonial person"
              />
            </Center>

              <Text fontSize='md' fontWeight={"500"} as="h4">
                Andrew Campbell,{" "}
                <span style={{ fontSize: 'base' }}>
                  Software Developer at Apple
                </span>
              </Text>
              <Button
                mt={"38px"}
                ml={0}
                mb={{base: '45px', md: '0'}}
                bg='brand.800'
                fontSize='base'
                color={"white"}
                _hover={{ bg: "brand.700" }}
                transition={"all .3s ease-in-out"}
              >
                Join Chatter
              </Button>
            </Box>
          </Box>

        </VStack>

        {/* Get Started */}
        <VStack px={{base: '4', md: '0'}}  pb={{base: '60px', md: '0'}} >
          <Box minH={"500px"} display={"flex"} px={{base:'0', md: '10'}}  flexDir={{base: 'column', md: 'row'}} maxW='1400px' >
            <Box width={{base: '100%', md: '500px'}} justifyContent='center' display={{base: 'none', md: 'flex'}}  >
              <HStack h={"450px"} mt={"25px"}   >
                <VStack
                  gap={"50px"}
                  h={"450px"}
                  justifyContent={"center"}
                  alignItems='center'
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
                <VStack   h='450px' justifyContent='center' alignItems='center'  >
                  <Image
                    src={Getstarted3}
                    w={"150px"}
                    h={"150px"}
                    borderRadius={"100px"}
                  />
                </VStack>
              </HStack>
            </Box>

            <Box flex={1} textAlign={{base: 'center', md: 'left'}} >
              <Heading as="h3"  fontSize='xl'  lineHeight={{base:'45px', md: "70px"}} mt={{base: '45px', md: "92px"}}  textAlign={{base: 'center', md: 'left'}}>
                Write, read and connect <br /> with great minds on chatter
              </Heading>

              <Box width='100%' justifyContent='center' display={{base: 'flex', md: 'none'}} >
                <HStack  >
                  <VStack
                    gap={"50px"}
                    h={"450px"}
                    justifyContent={"center"}
                    alignItems='center'  
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
                  <VStack   h='450px' justifyContent='center' alignItems='center'  >
                    <Image
                      src={Getstarted3}
                      w={"150px"}
                      h={"150px"}
                      borderRadius={"100px"}
                    />
                  </VStack>
                </HStack>
            </Box>
              <Text fontSize={"18px"} textAlign={{base: 'center', md: 'left'}} width={{base: '100%', md: "90%"}} mt={{base: '0', md: "24px"}}>
                Share people your great ideas, and also read write-ups based on
                your interests. connect with people of same interests and goals
              </Text>

              <Button
                mt={"36px"}
                ml={0}
                  bg='brand.800'
                fontSize='base'
                color={"white"}
                width={"150px"}
                _hover={{ bg: "brand.700" }}
                transition={"all .3s ease-in-out"}
              >
                Get started
              </Button>
            </Box>
          </Box>
        </VStack>

        <Box h={"300px"} bg={"#FFEDCC80"}>
          Footer
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
