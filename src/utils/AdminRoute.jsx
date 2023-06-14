import { useState, useEffect } from "react";
import { useFirebaseContext } from "../context";
import { Outlet } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";


const Loading = () => {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

const AdminRoute = () => {
  const [userRole, setUserRole] = useState("");
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const getUserRole = async () => {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        setUserRole(userData?.userRole); 
    };
    getUserRole();
  }, [user?.uid]);

  console.log(userRole);

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