import React from 'react'
import { useNavigate } from 'react-router'


const Service = () => {

    const navigate = useNavigate();

    const services = [
        { name: "Electrician", icon: "⚡" },
        { name: "Plumber", icon: "🚰" },
        { name: "Carpenter", icon: "🪚" },
        { name: "AC Service", icon: "❄" }
    ]
    return (
        <div className="flex ">
            {services.map(service => (
                <div key={service.name} style={{ border: "1px solid #ddd", cursor: "pointer", borderRadius: "10px", margin: "10px", padding: "10px" }} onClick={() => navigate(`/user/create-job?service=${service.name}`)}>
                    <h2>{service.icon}</h2>
                    <p>{service.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Service