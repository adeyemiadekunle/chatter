
import { useFirebaseContext } from '../context';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { isAuth } = useFirebaseContext();

  
  return isAuth ? <Outlet /> : null;
};
