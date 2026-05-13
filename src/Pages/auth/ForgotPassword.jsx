import { useState } from "react";
import { resetPassword } from "../../Services/authservice";


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
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Send Rest Link</button>
    </form>
)
}