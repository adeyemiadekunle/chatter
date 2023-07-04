
import { userAuth } from '../context/Firebase';
import { Outlet } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';


const Loading = () => {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export const PrivateRoute = () => {
  const { isAuth } = userAuth();

  
  return isAuth ? <Outlet /> : !isAuth ? <LandingPage /> : <Loading /> ;
};
