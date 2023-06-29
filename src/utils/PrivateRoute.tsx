
import { userAuth } from '../context/Firebase';
import { Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { isAuth } = userAuth();

  
  return isAuth ? <Outlet /> : null;
};
