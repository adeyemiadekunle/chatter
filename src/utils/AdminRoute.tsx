import { useState, useEffect } from "react";
import { useFirebaseContext } from "../context";
import { Outlet } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";

interface UserData {
  userRole?: string;
}

const Loading = () => {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

const AdminRoute = () => {
  const [userRole, setUserRole] = useState<string | undefined>("");
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const getUserRole = async () => {
  
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data() as UserData;
        setUserRole(userData?.userRole); 
    };
    getUserRole();
  }, [user?.uid]);

  return (
    <>
      {userRole === "" ? (
        <Loading />
      ) : userRole === "admin" ? (
        <Outlet />
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default AdminRoute;
