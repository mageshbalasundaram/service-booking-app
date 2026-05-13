import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../Context/AuthContext';

const LandingPage = () => {

    const navigate = useNavigate();
    const { user, role, loading } = useAuth();

    const services = [
        { name: "electrician", icon: "⚡" },
        { name: "plumber", icon: "🚰" },
        { name: "carpenter", icon: "🪚" },
        { name: "ac_service", icon: "❄" }
    ]

    const handleServiceClick = (service) => {

        if (!user) {
            navigate(`/login?service=${service}`)
        } else {
            navigate(`/user/create-Job?service=${service}`)
        }
    }

    useEffect(() => {

        if (!loading && user) {
            if (role === "user") {
                navigate("/user");
            }
            if (role === "provider") {
                navigate("/provider");
            }
        }
    }, [user, role, loading, navigate])

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Home Service Booking Platform</h1>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "40px"
            }}>


                {services.map(service => (
                    <div key={service.name} style={{ border: "1px solid #ddd", cursor: "pointer", borderRadius: "10px", margin: "10px", padding: "10px" }} onClick={() => handleServiceClick(service.name)}>
                        <h2>{service.icon}</h2>
                        <p>{service.name}</p>
                    </div>
                ))}

                
            </div>
            <div style={{display:"flex", gap:"10px", alignItems:"center", justifyContent:"center", marginTop:"20px"}}>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
            </div>
        </div>
    )
}

export default LandingPage