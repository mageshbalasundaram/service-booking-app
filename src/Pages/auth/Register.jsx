import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/authservice";
import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";


export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("user");


    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerUser(email, password, role, name, phone);
            alert("Registration Successfull");

            navigate("/login");

        } catch (error) {
            alert(error.message);

        }
    };

    return (

        <div className="flex flex-col justify-center py-5 align-middle w-full h-dvh gap-5">

           <h1 className="text-3xl font-bold text-center ">Book your Service Now in <span className="text-4xl text-blue-600">ETNow</span></h1>
           
           <p className="text-lg text-gray-400 text-center ">Plumber? Electrician? AC techician? Find them all in <span className=" text-blue-600 font-medium">ETNow </span>app.</p>
           <div ></div>
         

        <form onSubmit={handleRegister} className=" flex flex-col self-center w-150 h-fit gap-2.5 p-5 border border-gray-100 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center">Register</h2>
            <Input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                type="text"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
            />
            <Input type="email" placeholder="Enter you email" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <select className="border border-gray-300 rounded p-2 w-ful text-gray-500 text-sm"  placeholder="Choose" onChange={(e) => setRole(e.target.value)}>

                <option className="border border-gray-300 rounded p-2 w-full" value="user">Customer</option>
                <option className="border border-gray-300 rounded p-2 w-full" value="provider">Service Provider</option>

            </select>
            <Button type="submit">Register</Button>

            
            <div className="w-full flex flex-col p-2 mt-5 rounded bg-gray-50 border border-gray-100 gap-3">
                     <p className="text-lg text-center text-gray-400">
                    Already have an account?  </p>
                <Button variant="secondary"><a className="text-blue-600"  href="/login">Login</a>
                </Button>

                </div>

        </form>
        </div>
    )


}