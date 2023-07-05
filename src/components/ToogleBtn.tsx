import { Flex, Icon } from '@chakra-ui/react'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
type ToogleBtnProps = {
    Toogle: () => void
}

const ToogleBtn = ({Toogle}: ToogleBtnProps) => {
  return (
    <>
    <Flex onClick={Toogle} bg='brand.800'  justifyContent='center' alignItems='center'  w='50px' borderRadius='full'  hideFrom= 'md' position='fixed' zIndex='2' right='4' bottom='20'  h={'50px'} >
         <Icon color='primary.white' fontSize='lg' as={WidgetsOutlinedIcon}/>
    </Flex> 
    </>
              
  )
}

export default ToogleBtn