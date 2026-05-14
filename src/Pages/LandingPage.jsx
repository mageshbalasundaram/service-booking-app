import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../Context/AuthContext';
import Button from '../Components/ui/Button';
import Service from '../Components/ui/Service';

const LandingPage = () => {

    const navigate = useNavigate();
    const { user, role, loading } = useAuth();



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
            }}><Service/>


            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>

            </div>
        </div>
    )
}

export default LandingPage