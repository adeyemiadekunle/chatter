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



