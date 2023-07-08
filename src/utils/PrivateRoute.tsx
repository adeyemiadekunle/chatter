import { useEffect } from 'react';
import { userAuth,} from '../context/Firebase';
import { Outlet, useLocation } from 'react-router-dom';
import LandingPage from '../components/LandingPage';


const Loading = () => {

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export const PrivateRoute = () => {
  const location = useLocation();

  useEffect(() => {
     localStorage.removeItem('myeditor')
    // Perform your function or action here for each route change
    console.log('Route changed:', location.pathname);

    // Clean up the effect if needed
    return () => {
      // Cleanup code if necessary
    };
  }, [location]);



  const { isAuth } = userAuth();
  console.log(isAuth);
 
  return (
    <>
     {  isAuth ? <Outlet /> : !isAuth ? <LandingPage /> : <Loading /> }
    </>
  );

};
