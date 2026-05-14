import { useEffect, useState } from "react";
import { loginUser } from "../../Services/authservice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { role, loading } = useAuth();

    const [searchParams] = useSearchParams();
    const selectedService = searchParams.get("service");

    // if (role === "user") {
    //     navigate(`/user/create-job?service=${selectedService || ""}`);
    // }

    useEffect(() => {
        if (!loading) {
            if (role === "user") navigate("/user")
            if (role === "provider") navigate("/provider")
        }

    }, [role, loading, navigate])




    const handleLogin = async (e) => {
        e.preventDefault();
         console.log("handleLogin fired", email, password); // add this
        try {
            await loginUser(email, password);


        } catch (error) {
            alert(error.message);
        }
    }
    
    

    return (
        <div className="flex justify-center py-5 align-middle w-full h-dvh">
            
            <form onSubmit={handleLogin} className=" flex flex-col self-center w-1/2 h-fit gap-2.5 p-5 border border-gray-300 rounded-xl">
            <h1 className="text-2xl font-bold text-center">Login</h1>

                <Input type="email" placeholder="Enter you email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <Button type="submit">Login</Button>

                <p className="text-xs">
                    Don't have an account? <a className="text-blue-800" href="/register">Register</a>
                </p>
                <p className="text-xs">
                    <a className="text-blue-800" href="/forgot-password">Forgot password</a>
                </p>
            </form>
        </div>

    )
}