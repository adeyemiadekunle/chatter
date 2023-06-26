
import { useFirebaseContext } from '../context/Firebase';
import { Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { isAuth } = useFirebaseContext();

  
  return isAuth ? <Outlet /> : null;
};
