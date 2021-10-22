import React, { useState, useEffect, useContext, createContext } from "react"
import nookies from "nookies"
import { auth } from "../Firebase/initFirebase";
import usertype from "../types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification, confirmPasswordReset } from "firebase/auth"

// import "firebase/storage"
// import "firebase/firestore"
// import "firebase/analytics"
// import "firebase/performance"


const Authcontext = createContext({});

export default function AuthContext ({ children }): JSX.Element  {
    const [user, setUser] = useState<usertype>(null)

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged(async (user: usertype) => {
            console.log("state was changed")
            console.log(user ? user.uid: "nothing")
            if(!user) {
                nookies.set(undefined, "token", "", {})
            }
            const token = await user.getIdToken();
            setUser(user)
            nookies.set(undefined, "token", token, {})
        }, (e) => {
            console.log(e)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function register(email: string, password: string) {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    async function login(email: string, password: string) {
        await signInWithEmailAndPassword(auth, email, password)
    }

    async function verifyEmail() {
        await sendEmailVerification(user)
    }

    async function logout() {
        await signOut(auth)
    }

    async function forgotPassword (email: string) {
        await sendPasswordResetEmail(auth, email, {
            url: `${process.env.REACT_APP_URL}/reset-password`  
        })
    }

    async function resetPassword (oobcode, password: string) {
        await confirmPasswordReset(auth, oobcode, password)
    }

    async function updateEmail(email: string) {
        await user.updateEmail(email)
    }
    
    async function updatePassword(password: string) {
        await user.updatePassword(password)
    }

    const val = {
        user,
        register,
        login,
        logout,
        resetPassword,
        verifyEmail,
        updateEmail,
        forgotPassword,
        updatePassword
    }

    return <Authcontext.Provider value={val}>{ children }</Authcontext.Provider>
}

export const useAuth = () => useContext(Authcontext)
