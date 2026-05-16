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

      <div className="flex flex-col justify-center py-5 align-middle w-full h-dvh gap-5">

          

    <form onSubmit={handleReset} className=" flex flex-col self-center w-150 h-fit gap-2.5 p-5 border border-gray-100 rounded-xl shadow-lg">
        <h1 className="text-2xl font-medium text-center mb-3">Forgot Password</h1>
        <Input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit">Send Rest Link</Button>

        <div className="w-full flex flex-col p-5 mt-5 rounded bg-gray-50 border border-gray-100 gap-5">
                     <p className="text-lg text-center text-gray-400">
                    Go Back to Login  </p>
                <Button variant="secondary"><a className="text-blue-600"  href="/login">Login</a>
                </Button>

                </div>

        
    </form>

    </div>
)
}