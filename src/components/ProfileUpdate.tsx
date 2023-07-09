import {
  Heading,
  HStack,
  VStack,
  Input,
  Textarea,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import AvatarUploader from "./AvatarUpload";
// import ArticleTags from "./RichEditor/ArticleTags";
import UpdateTags from "./UpdateTags";



const ProfileUpdate = ({
  displayName,
  setDisplayName,
  userTagLine,
  setUserTagLine,
  location,
  setLocation,
  userBio,
  setUserBio,
  photoURL,
  setPhotoURL,
  techStack,
  setTechStack,
  userName,
  setUserName,
  email,
  setEmail,
}) => {
  return (
    <>
      <HStack spacing={{base: '0', md: '10'}} px={{base: '3', md: '6'}} alignItems='flex-start' flexDir={{base: 'column', md: 'row'}}>
        <VStack w={{base: '100%', md: '50%'}} spacing={8}>
          <Heading fontSize="xbase" mt={3}>
            Basic Info
          </Heading>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              bg="white"
              fontSize="base"
              placeholder="Full Name"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Profile Tagline</FormLabel>
            <Input
              value={userTagLine}
              onChange={(e) => setUserTagLine(e.target.value)}
              bg="white"
              fontSize="base"
              placeholder="Profile Tagline"
            />
          </FormControl>

          <FormControl pb={4}>
            <FormLabel>Profile Photo</FormLabel>
            <AvatarUploader photoUrl={photoURL} setPhotoUrl={setPhotoURL}  />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              fontSize="base"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>About You</FormLabel>
            <Textarea
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
              fontSize="base"
              placeholder="About You"
              minH="200px"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tech Stack</FormLabel>
            <UpdateTags  selectedTags={techStack} setSelectedTags={setTechStack} />
          </FormControl>
        </VStack>

        <VStack w={{base: '100%', md: '50%'}}  spacing={8}>
        <Heading fontSize="xbase" mt={3}>
            Profile Indentity
          </Heading>
           <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              fontSize="base"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
           </FormControl>

            <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              fontSize="base"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </FormControl>
            
        </VStack>
      </HStack>
    </>
  );
};

export default ProfileUpdate;
