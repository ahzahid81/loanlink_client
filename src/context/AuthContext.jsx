import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConfig";
import axiosSecure from "../services/axiosSecure";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password) => {
        setLoading(true);
        try{
            return await createUserWithEmailAndPassword(auth, email, password);
        }
        catch(err){
            setLoading(false);
            throw err;
        }
    }

    const loginUser = async (email, password) => {
        setLoading(true);
        try{
            return await signInWithEmailAndPassword(auth, email, password);
        }catch(err){
            setLoading(false);
            throw err;
        }
    }

    const googleLogin = async () => {
        setLoading(true);
        try{
            return await signInWithPopup(auth, googleProvider);
        } catch(err){
            setLoading(false);
            throw err;
        }
    }

    const logoutUser = async () => {
        setLoading(true);
        try {
            await axiosSecure.post("/logout");
            await signOut(auth);
            setUser(null);
            setRole(null);
        } catch(err){
            console.error("Logout Failed", err)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                try {
                    const res = await axiosSecure.post("/jwt", {
                        email: currentUser.email,
                        name: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    });
                    setRole(res.data.role)
                } catch (err) {
                    console.error("JWT Error", err);
                    setRole(null);
                }
            }
            else {
                setRole(null);
            }

            setLoading(false);
        });


        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        role,
        loading,
        createUser,
        googleLogin,
        logoutUser,
        loginUser
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}