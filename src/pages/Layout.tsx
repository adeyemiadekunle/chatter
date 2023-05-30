import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import { Box } from "@chakra-ui/react";
import {Sidebar} from "../components/index"


const Layout = () => {
    return (

        <Box minH={'100vh'} >
            <Box >
                <Header/>
            </Box>
            <Box display={'flex'} >
             {/* Sidebar */}
                <Box w={'250px'} >
                <Sidebar/>
                </Box>
                <Box flex={1} overflow='auto'>
                    <Outlet/>
                </Box>
            </Box>
        </Box>
        
    )
}

export default Layout



// <Box as='main' display="flex" minH={'100vh'}  >
           
//             <Box w='250px' flexShrink={0} position={'fixed'} h={'100vh'} >
//              
//             </Box>

//             <Box flex={1} overflow='auto' ml={'250px'}>
//                 {/* Top Nav */}
//                 <Box >
//                      <Header />
//                 </Box>
//                 {/* Main Content */}
//                 <Box  minH={"600px"} >
//                     <Outlet />
//                 </Box>

//             </Box>
        
//         </Box>