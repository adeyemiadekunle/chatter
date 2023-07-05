import Feed from '../components/Feed/Feed'
import { userAuth } from '../context/Firebase'
import { auth } from '../utils/firebase'
import LandingPage from '../components/LandingPage'

const Home = () => {
    const {isAuth} = userAuth()
    const user = auth.currentUser
  return (
    <>
    {isAuth && user ? <Feed /> : <LandingPage />}
    </>
  )
}

export default Home