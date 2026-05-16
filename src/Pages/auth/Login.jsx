import { useEffect, useState } from "react";
import { loginUser } from "../../Services/authservice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";
import Service from "../../Components/ui/Service";


export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { role, loading } = useAuth();

    const [searchParams] = useSearchParams();
    const selectedService = searchParams.get("service");

    useEffect(() => {
        if (!loading) {
            if (role === "user") navigate("/user")
            if (role === "provider") navigate("/provider")
        }

    }, [role, loading, navigate])




    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);


        } catch (error) {
            alert(error.message);
        }
    }
    
    return (
        <div className="flex flex-col justify-center py-5 align-middle w-full h-dvh gap-5">

           <h1 className="text-3xl font-bold text-center ">Book your Service Now in <span className="text-4xl text-blue-600">ETNow</span></h1>
           
           <p className="text-lg text-gray-400 text-center ">Plumber? Electrician? AC techician? Find them all in <span className=" text-blue-600 font-medium">ETNow </span>app.</p>
           <div ></div>
            
        <form onSubmit={handleLogin} className=" flex flex-col self-center w-150 h-fit gap-2.5 p-5 border border-gray-100 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center">LOGIN</h2>

                <Input type="email" placeholder="Enter you email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <Button variant="primary" type="submit">Login</Button>
                <Button  variant="secondary" className=" ">
                    <a className="" href="/forgot-password">Forgot password?</a>
                </Button>

                <div className="w-full flex flex-col p-5 mt-10 rounded bg-gray-50 border border-gray-100 gap-5">
                     <p className="text-lg text-center">
                    Don't have an account? </p>
                <Button variant="secondary"><a className="text-blue-600"  href="/register">Register</a>
                </Button>

                </div>

               

                
            </form>
        </div>

    )
}