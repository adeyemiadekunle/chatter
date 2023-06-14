import { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, provider, signOut, db, getRedirectResult, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../utils/firebase';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";




interface FirebaseContextProps {
    isAuth: boolean;
    GoogleSignIn: () => void;
    GoogleSignOut: () => void;
    signUp: (email: string, password: string, fistName: string, lastName: string ) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    user: any;
    isLoading: boolean;
  }

  const FirebaseContext = createContext<FirebaseContextProps>({
    isAuth: false,
    GoogleSignIn: () => {},
    GoogleSignOut: () => {},
    signUp: () => Promise.resolve(),
    signIn: () => Promise.resolve(),
    user: null,
    isLoading: false,
  });


export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // listen for auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
           
            if (user !== null) {
                setIsAuth(true);
                // Create user document in Firestore with uid as document ID
                const usersCollection = collection(db, 'users'); // Replace 'users' with your desired collection name
                const userDocRef = doc(usersCollection, user.uid);

                getDoc(userDocRef)
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            // User document already exists
                                                    } else {
                            // User document does not exist, create a new one
                            const newUser = {
                                displayName: user.displayName || null,
                                email: user.email || null,
                                photoURL: user.photoURL || null,
                                emailVerified: user.emailVerified,
                                userRole: 'noRole',
                                userName: '',
                                userBio: '',
                                userTagline: '',
                                techStack: [],
                                location: '',
                            };

                            setDoc(userDocRef, newUser)
                                .then(() => {
                                    setUser(user);
                                    console.log('User document created with ID:', user.uid);
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
        signInWithPopup(auth, provider)
            .then(() => {
                setIsLoading(true);
                // console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }


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
            setUser(null);
            // Sign-out successful.
            console.log('Sign-out successful.');
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
          setIsLoading(true); // Set isLoading to true when signup starts
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          setIsAuth(true);

                // Check if user already exists in Firestore
            const usersCollection = collection(db, 'users');     
       
            const userDocRef = doc(usersCollection, user.uid);
            const newUser = {
            displayName: `${firstName} ${lastName}`,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            userRole: 'noRole',
            userName: '',
            userBio: '',
            userTagline: '',
            techStack: [],
            location: '',
          };
          await setDoc(userDocRef, newUser);
          setUser(user);
      
          console.log(user);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false); // Set isLoading to false regardless of success or error
          }
      };

      
    const signIn = async (email: string, password: string) => {
        try {
            setIsLoading(true);  // Set isLoading to true when signup starts
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setIsAuth(true);
            setUser(user);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false); // Set isLoading to false regardless of success or error
        }
    };



    return (
        <FirebaseContext.Provider value={{ isAuth, GoogleSignIn, GoogleSignOut, signUp, signIn, user, isLoading }}>
            {children}
        </FirebaseContext.Provider>

    );

}

export const useFirebaseContext = () => useContext(FirebaseContext);
