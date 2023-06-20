import Header from "../Header"
import { Outlet } from "react-router-dom"
import { Box } from "@chakra-ui/react";
import Sidebar from "../Sidebar"


const Layout = () => {

    return (

        <Box minH={'100vh'} >
            <Box >
                <Header/>
            </Box>
            <Box display={{base: 'block', md: 'flex'}} maxW={{base: '100%', md: '1280px', lg: '1400px'}} m='0 auto' >
             {/* Sidebar */}
                <Box w={{base: '0', md: '250px' }} hideBelow='md' >
                    <Sidebar/>
                </Box>
                 <Box flex={{base: 'none', md: '1'}} overflow='auto'>
                    <Outlet/>
                </Box>
            </Box>
        </Box>
        
    )
}

export default Layout



