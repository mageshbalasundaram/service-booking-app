import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { createJob } from "../../Services/jobservice";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function CreateJob() {

    const { user } = useAuth();



    const [searchParams] = useSearchParams();
    const defaultService = searchParams.get("service") || "";

    const [service, setService] = useState(defaultService);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createJob({
                service,
                description,
                location,
                scheduleDate,
                scheduleTime,
                customerId: user.uid
            });

            alert("Job Created succesfully");


            setService("");
            setDescription("");
            setLocation("");
            setScheduleDate("");
            setScheduleTime("");

            navigate("/user")

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col  items-center  bg-blue-50 p-5 rounded-2xl gap-5">

            <h2 className=" flex text-3xl text-center">
                Book a New Service
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-60 md:w-96">


                <select className="border border-b-black rounded p-2 w-ful" onChange={(e) => setService(e.target.value)} requried>

                    <option value="">Select service</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="ac_service">AC Service</option>
                </select>
                <input className="border border-b-black rounded p-2 w-full" type="date" value={scheduleDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setScheduleDate(e.target.value)} required />
                <input className="border border-b-black rounded p-2 w-full" type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} required />
                <input className="border border-b-black rounded p-2 w-full" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                 <textarea className="border border-b-black rounded p-2 w-ful" placeholder="Describe the problem" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <button type="submit">Create Job</button>
            </form>
        </div>
    )
}