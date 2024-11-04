/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import { Toaster } from "react-hot-toast";
import useAxiosCommon from "../Hooks/useAxiosCommon";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);
    const axiosCommon = useAxiosCommon();

    // create user with email

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update user profile
    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    };

    // sign in with email

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // sign in with google

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // sign in with github

    const signInWithGitHub = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider)
    }

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            await axiosCommon.post('/logout');
            setUser(null);
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLoading(false);
        }
    };


    // auth state change 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                try {
                    await axiosCommon.post('/jwt', userInfo);
                } catch (error) {
                    console.error("Error during JWT request:", error);
                    // Optionally, set an error state here to display to the user
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [axiosCommon]);


    const authInfo = {
        loading,
        user,
        setUser,
        createUser,
        updateUserProfile,
        signIn,
        signInWithGoogle,
        signInWithGitHub,
        logout

    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <Toaster position="top-center" />
        </AuthContext.Provider>
    )
};

export default AuthProvider;