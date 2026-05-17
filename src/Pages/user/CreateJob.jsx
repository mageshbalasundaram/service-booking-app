import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { createJob } from "../../Services/jobservice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";


export default function CreateJob() {

    const { user } = useAuth();



    const [searchParams] = useSearchParams();
    const defaultService = searchParams.get("service") || "";
    const [service, setService] = useState(defaultService);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            await createJob({
                service,
                description,
                location,
                scheduleDate,
                scheduleTime,
                customerId: user.uid
            });

            setSuccess("Job Created succesfully");
            setTimeout(() => {
                setSuccess("")
            }, 2000);
            setService("");
            setDescription("");
            setLocation("");
            setScheduleDate("");
            setScheduleTime("");
           

        } catch (error) {
            setError(error.message);
            setTimeout(()=> {setError("")}, 2000)
        }
    };

    return (
        <div className="flex flex-col  items-center  bg-blue-50/50 p-5 rounded-2xl gap-5 shadow-lg border border-blue-100">

            <h2 className=" flex text-3xl text-center">
                Book a New Service
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-60 md:w-96">


                <select className=" text-gray-500 text-sm border border-gray-300 rounded p-2 w-ful" onChange={(e) => setService(e.target.value)} required>

                    <option value="">Select service</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="carpenter">Carpenter</option>
                    <option value="ac_service">AC Service</option>
                </select>
                <Input className="text-gray-500 text-sm border border-gray-300 rounded p-2 w-full" type="date" value={scheduleDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setScheduleDate(e.target.value)} required />
                <Input className="border border-gray-300 rounded p-2 w-full" type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} required />
                <Input className="border border-gray-300 rounded p-2 w-full" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                 <textarea className="border border-gray-300 rounded p-2 w-ful" placeholder="Describe the problem" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <Button type="submit">Create Job</Button>
                {error && (
                    <p className="text-sm text-black bg-red-200 text-center p-2 rounded">{error}</p>
                )}
                {success && (
                    <p className="text-sm text-black text-center p-2 bg-green-200 rounded">{success}</p>
                )}
                
                
            </form>
        </div>
    )
}