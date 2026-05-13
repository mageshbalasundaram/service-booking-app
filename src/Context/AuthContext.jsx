
import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc} from "firebase/firestore";
import { onAuthStateChanged} from "firebase/auth";
import { auth, db } from "../Services/firebase"; 


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

            if (firebaseUser) {
                setUser(firebaseUser);


                const docRef = doc(db, "users", firebaseUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRole(docSnap.data().role);
                }
            } else{
                setUser(null);
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();

    }, []);

    return(
        <AuthContext.Provider value={{user, role, loading}}>

            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}

