import { Navigate, Outlet } from 'react-router-dom';
// import { useFirebaseContext } from '../context';
import { auth } from '../utils/firebase';


interface ProtectedRouteProps {
  redirectPath: string;
  children?: React.ReactNode;
   
}

const ProtectedRoute = ({ redirectPath = '/', children }: ProtectedRouteProps) => {
  // const { user } = useFirebaseContext();
  if (!auth) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      {children ? children : <Outlet />}
    </>
  );
};

export default ProtectedRoute;
