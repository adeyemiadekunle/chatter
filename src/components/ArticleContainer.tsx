import { Box, useColorModeValue } from "@chakra-ui/react";

interface RightBarContainerProps {
    children: React.ReactNode;
    height: string;
    display: any;
  }

export const Container = ({ children, height, display }: RightBarContainerProps) => {
    const bg = useColorModeValue("white", "#0F172A");
    const color = useColorModeValue("#0F172A", "white");
  
    return (
      <Box
        display={display}
        bg={bg}
        color={color}
        borderRadius={"2px"}
        className="selected-div"
        minH={height}
      >
        {children}
      </Box>
    );
  };