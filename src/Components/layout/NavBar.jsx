import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { logoutUser } from "../../Services/authservice";

export default function Navbar(){

    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    return(
        <div style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"10px 20px",
      borderBottom:"1px solid #ddd"
    }}>
        <h3 className="font-bold text-5xl" style={{cursor:"pointer"}} onClick={() => navigate("/")}>HomeServices</h3>

        <div>
            <span style={{marginRight:"20px"}}>{user?.email}</span>
            <button onClick={handleLogout}>Logout</button>
        </div>

        </div>
    )
}