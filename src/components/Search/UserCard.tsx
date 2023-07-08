
import {Box, Text, HStack, Link, Avatar, Skeleton,  SkeletonCircle, Heading} from '@chakra-ui/react'
import { NavLink } from "react-router-dom";


const SearchCard = ({photoURL, displayName, isLoading, userName, tagLine}) => {
  return (
    <>
     <Link as={NavLink} to={`/u/${userName}`}  >
      <Box p={5} borderBottom='1px solid white' _hover={{bg: 'gray.100'}} >
          <HStack spacing={3}>
          <SkeletonCircle size='12' isLoaded={!isLoading} >
                <Avatar src={photoURL} name={displayName} size={'md'}></Avatar>
            </SkeletonCircle>
            <Box>
            <Skeleton isLoaded={!isLoading} >
              <Heading fontSize='base' fontWeight={'700'}>{displayName}</Heading>
            </Skeleton>
              <Text fontSize="sm">{`@${userName}`}</Text>
              <Text>{tagLine}</Text>
            </Box>
          </HStack>
      </Box>
     </Link>
    </>
  )
}

export default SearchCard