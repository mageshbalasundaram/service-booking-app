import { useState } from "react";
import { resetPassword } from "../../Services/authservice";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";


export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        try {

            await resetPassword(email);
            alert("Password reset email set");
        } catch (error) {
            alert(error.message);
        }
    }


return (

    <form onSubmit={handleReset}>
        <h2>Forgot Password</h2>
        <Input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit">Send Rest Link</Button>
        
    </form>
)
}