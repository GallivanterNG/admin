import React, { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addProvider, auth } from "../config/firebase_config";
import { message } from "antd";


const UserContext = createContext();

const loadUserFromLocalStorage = () => {
    const userJSON = localStorage.getItem("user");
    return userJSON ? JSON.parse(userJSON) : null;
};

const saveUserToLocalStorage = (user) => {
    const userJSON = JSON.stringify(user);
    localStorage.setItem("user", userJSON);
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(loadUserFromLocalStorage());
    const [error, setError] = useState("")
    const [userID, setuserID] = useState(user?.uid )

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setuserID(currentUser?.uid)
            saveUserToLocalStorage(currentUser);
            console.log(currentUser)
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signIn = async (email, password) => {
        try {
            // await signInWithEmailAndPassword(auth, email, password);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return user;
        } catch (error) {
            // setError(error)
            console.log(error)
        }
    };

    const signUp = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userUID = userCredential.user.uid.toString();
            
            const userData = userCredential.user;
            const providerData = {
                rating : 0,
                email: userData.email,
                listings: []
            }
            await addProvider("providers", userUID, providerData)
            setuserID(userUID)
        } catch (error) {

        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            setError(error)
        }
    };

    const contextValue = {
        user,
        error,
        userID,
        signIn,
        signUp,
        signOut: signOutUser,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
    return React.useContext(UserContext);
};
