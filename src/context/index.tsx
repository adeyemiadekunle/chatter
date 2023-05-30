import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged, provider, signOut, db, doc, collection, getDoc, setDoc, getRedirectResult, signInWithRedirect } from '../utils/firebase';



const FirebaseContext = createContext({
    isAuth: false,
    GoogleSignIn: () => { },
    GoogleSignOut: () => { }
});

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuth, setIsAuth] = useState(false);

    // let navigate = useNavigate();

    // listen for auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                setIsAuth(true);
                const displayName = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                const emailVerified = user.emailVerified;
                const uid = user.uid;

                // Create user document in Firestore with uid as document ID
                const usersCollection = collection(db, 'users'); // Replace 'users' with your desired collection name
                const userDocRef = doc(usersCollection, uid);

                getDoc(userDocRef)
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            // User document already exists
                            console.log('User document already exists with ID:', uid);
                        } else {
                            // User document does not exist, create a new one
                            const newUser = {
                                displayName,
                                email,
                                photoURL,
                                emailVerified,
                            };

                            setDoc(userDocRef, newUser)
                                .then(() => {
                                    console.log('User document created with ID:', uid);
                                })
                                .catch((error) => {
                                    console.error('Error creating user document:', error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking user document:', error);
                    });

                // ...
            } else {
                // User is signed out
                // ...
            }
        });
        return unsubscribe;
    }, []);


    const GoogleSignIn = () => {
        signInWithRedirect(auth, provider)
            .then(() => {
                // console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    //get result of sign in
    useEffect(() => {
        getRedirectResult(auth)
            .then(() => {
                // The signed-in user info.
                // const user = result?.user;
                // console.log(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
                // The email of the user's account used.
            });

    }, []);

    const GoogleSignOut = () => {
        signOut(auth).then(() => {
            setIsAuth(false);
            // Sign-out successful.
            console.log('Sign-out successful.');
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <FirebaseContext.Provider value={{ isAuth, GoogleSignIn, GoogleSignOut }}>
            {children}
        </FirebaseContext.Provider>

    );

}

export const useFirebaseContext = () => useContext(FirebaseContext);
