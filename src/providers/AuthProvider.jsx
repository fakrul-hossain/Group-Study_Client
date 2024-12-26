import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import auth from '../Firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';



export const AuthContext = createContext(null);

// google authentication

const googleProvider = new GoogleAuthProvider()

 const AuthProvider = ({children}) => {

  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)
    // create user
    const createUser = (email,password) =>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password)
        
    }
    // sign in user
    const signInUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    // sign in with google

    const signInWithGoogle = () =>{
        
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const updateAUser = (displayName,photoURL) =>{
        return updateProfile(auth.currentUser,{displayName,photoURL})
    }


    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }
    // observe auth state change
//    useEffect(()=>{
//     const unSubscribe = onAuthStateChanged(auth,createUser =>{
        
//         // console.log('current user value of the current user.',createUser);
//         setUser(createUser)
//         setLoading(false);

       
//     });

//     return () =>{
//         unSubscribe();
//     }
//    },[])



    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          try {
            if (currentUser?.email) {
              await axios.post(`
                ${import.meta.env.VITE_API_URL}/jwt`,
                { email: currentUser.email },
                { withCredentials: true }
              );
              setUser(currentUser);
            } else {
              await axios.get(`${import.meta.env.VITE_API_URL}/logout`);
              setUser(currentUser);
            }
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        });
        return () => unsubscribe();
    },[]);

    const authInfo = {
        user,
        createUser,
        signInUser,
        logOut,
        loading,
        signInWithGoogle,
        updateAUser,setUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

    AuthProvider.propTypes ={
        children: PropTypes.node
    }

// 



// 