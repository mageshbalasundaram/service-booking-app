import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const registerUser = async (email, password, role, name, phone) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);



    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
        name: name,
        phone: phone,
        createAt: serverTimestamp()
    });

    return user;
};


export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const logoutUser = async () => {
    return await signOut(auth);
}

export const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
}