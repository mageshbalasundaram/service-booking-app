import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/authservice";


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

        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
            />
            <input type="email" placeholder="Enter you email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            <select onChange={(e) => setRole(e.target.value)}>

                <option value="user">Customer</option>
                <option value="provider">Service Provider</option>

            </select>
            <button type="submit">Register</button>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>

        </form>
    )


}