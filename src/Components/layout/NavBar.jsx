import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { logoutUser } from "../../Services/authservice";
import Button from "../ui/Button";

export default function Navbar() {

    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    return (
        <div className="bg-gray-50 w-full flex justify-center items-center border-b-2 border-b-gray-200" >
            <div className="max-w-7xl w-full flex justify-between py-2.5 px-5  ">


                <h3 className="font-bold text-3xl text-blue-600 align-middle" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>ETNow</h3>
                    <Button onClick={handleLogout}>Logout</Button>
               

            </div>
        </div>
    )
}