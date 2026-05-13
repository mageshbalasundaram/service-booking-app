import { useEffect, useState } from "react";
import { loginUser } from "../../Services/authservice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { role, loading } = useAuth();

    const [searchParams] = useSearchParams();
    const selectedService = searchParams.get("service");

    if(role === "user"){
        navigate(`/user/create-job?service=${selectedService || ""}`);
    }

    useEffect(() => {
        if(!loading){
        if (role === "user") navigate("/user")
        if (role === "provider") navigate("/provider")
        }

    }, [role, loading, navigate])




    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            alert("Login Successfull")
            

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <form onSubmit={handleLogin}>

            <input type="email" placeholder="Enter you email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            {/* <select onChange={(e) => setRole(e.target.value)}>
                <option value="user">Customers</option>
                <option value="provider">Service Provider</option>
            </select> */}
            <button type="submit">Login</button>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
            <p>
                <a href="/forgot-password">Forgot password</a>
            </p>
        </form>

    )
}