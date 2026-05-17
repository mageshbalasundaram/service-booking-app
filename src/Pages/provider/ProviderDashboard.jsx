import { useEffect, useState } from "react";
import { acceptJob, completeJob, listenToNewJobs, listenToProviderJobs, startJob, updateJobStatus } from "../../Services/jobservice";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/layout/NavBar";
import Button from "../../Components/ui/Button";

export default function ProviderDashboard() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [availableJobs, setAvailableJobs] = useState([]);
    const [acceptedJobs, setAcceptedJobs] = useState([]);
    const [pendingJobs, setPendingJobs] = useState([]);
    const [ongoingJobs, setOngoingJobs] = useState([]);
    const [completedJobs, setCompletedJobs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!user) return
        const unsubscribeAvailable = listenToNewJobs(setAvailableJobs);
        const unsubscribeAccepted = listenToProviderJobs(
            user.uid,
            (jobs) => {
                setAcceptedJobs(jobs);

                setPendingJobs(jobs.filter(job => job.status === "accepted"));
                setOngoingJobs(jobs.filter(job => job.status === "in_progress"));
                setCompletedJobs(jobs.filter(job => job.status === "completed"))
            }
        );

        return () => {
            unsubscribeAvailable();
            unsubscribeAccepted();
        }

    }, [user]);

    // actions

    const handleAccept = async (jobId) => {

        try {
            await acceptJob(jobId, user.uid);

            setAvailableJobs(prev => prev.filter(job => job.id !== jobId))

        } catch (error) {
            setError(error.message)
        }

    }
    const handlestart = async (jobId) => {

        try {
            await startJob(jobId);
        } catch (error) {
            setError(error.message)
        }

    };

    const handleComplete = async (jobId) => {
        try {
            await completeJob(jobId);

        } catch (error) {
            setError(error.message)
        }
    }

    const handleStatusChange = async (jonId, status) => {
        try{
            await updateJobStatus(jobId, status);

        }catch(error){
            console.error("Error updating status:", error);
            setError(error.message);

        }
    }

    const username = user?.email?.split("@")[0];


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Hero header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <p className="text-sm text-gray-400 font-medium tracking-widest uppercase mb-1">
                        Provider Dashboard
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back,{" "}
                        <span className="text-blue-600 capitalize">{username}</span> 👋
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Here's an overview of your service bookings.
                    </p>
                    {error && (
                                        <p className="text-red-500 text-sm">
                                            {error}
                                        </p>
                                    )}
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 items-start justify-between">
                <div className="grid grid-cols-4 w-full gap-5" >
                    <div className="bg-white p-3.5 rounded-lg min-h-100 max-h-150 overflow-y-auto border border-gray-100 flex flex-col gap-5 shadow-sm">
                        
                        <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-blue-600">Available Jobs</h3>
                            <p className="rounded-full bg-blue-50 px-3 text-lg"> {availableJobs.length}</p>
                        </div>
                        <div className="flex flex-col gap-5 overflow-y-auto">
                            {availableJobs.length === 0 && <p className=" bg-gray-50 border border-gray-100 rounded  p-2 shadow text-gray-500 ">Currently No Jobs </p>}

                            {availableJobs.map(job => (

                                <div key={job.id} className="flex flex-col gap-2.5 bg-blue-50/30 border border-gray-100 rounded  p-2 shadow ">
                                    <h3 className="font-bold capitalize text-blue-600">{job.service} </h3>
                                    <p className="capitalize"><span className="font-medium cap">Description: </span >{job.description}</p>
                                    <p className="capitalize"><span className="font-medium">Location:</span> {job.location}</p>
                                    <Button onClick={() => handleAccept(job.id)}>Accept ✅</Button>
                                    <p className="text-[9px] text-gray-500">If you dont want leave as it is, anaother provider will pick it</p>
                                    
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="bg-white p-3.5 rounded-lg min-h-100 max-h-150 border border-gray-100 flex flex-col gap-5 shadow-sm">

                        <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-orange-600">Accepted Jobs</h3>
                        <p className="rounded-full bg-orange-50 px-3 text-lg"> {pendingJobs.length}</p>
                        </div>
                        <div className="flex flex-col gap-5 overflow-y-auto">
                            {pendingJobs.length === 0 && <p className=" bg-gray-50 border border-gray-100 rounded  p-2 shadow text-gray-500 ">No jobs Available</p>}
                            {pendingJobs.map(job => (

                                <div key={job.id} className="flex flex-col gap-2.5 bg-orange-50/30 border border-gray-100 rounded  p-2 shadow ">
                                    <h3 className="font-bold capitalize text-orange-600">{job.service} </h3>
                                    <p className="capitalize"><span className="font-medium cap">Description: </span >{job.description}</p>
                                    <p className="capitalize"><span className="font-medium">Location:</span> {job.location}</p>

                                    <Button onClick={() => handlestart(job.id)}>Start Job</Button>
                                    
                                </div>

                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg min-h-100 max-h-150 border border-gray-50 flex flex-col gap-5 shadow-sm">
                       <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-green-600">Ongoing/IN Progress</h3>
                        
                        <p className="rounded-full bg-green-50 px-3 text-lg"> {ongoingJobs.length}</p>

                       </div>
        
                        <div className="flex flex-col gap-5 overflow-y-auto">
                            {ongoingJobs.length === 0 && <p className=" bg-white border border-gray-100 rounded  p-2 shadow text-gray-500 ">No OnGoing jobs</p>}
                            {ongoingJobs.map(job => (
                                <div key={job.id} className="flex flex-col gap-2.5 bg-green-50/30 border border-gray-100 rounded  p-2 shadow">
                                    <h3 className="font-bold capitalize text-green-600">{job.service} </h3>
                                    <p className="capitalize"><span className="font-medium cap">Description: </span >{job.description}</p>
                                    <p className="capitalize"><span className="font-medium">Location:</span> {job.location}</p>
                                    <Button onClick={() => handleComplete(job.id)}>Complete Job</Button>
                                    

                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg min-h-100 max-h-150  border border-gray-100 flex flex-col gap-5 shadow-sm">

                        <div className="flex  justify-between"><h3 className="text-lg font-medium text-green-700">Completed Jobs</h3>
                        <p className="rounded-full bg-green-100 px-3 text-lg"> {completedJobs.length}</p>
                        

                            </div>
                        <div className="flex flex-col gap-5 overflow-y-auto">
                            {completedJobs.length === 0 && <p className=" bg-white border border-gray-100 rounded  p-2 shadow text-gray-500 ">No Completed Jobs</p>}
                            {completedJobs.map(job => (
                                <div key={job.id} className="flex flex-col gap-2.5 bg-green-50/50 border border-gray-100 rounded  p-2 shadow ">
                                    <h3 className="font-bold capitalize text-green-700">{job.service} </h3>
                                    <p className="capitalize"><span className="font-medium cap">Description: </span >{job.description}</p>
                                    <p className="capitalize"><span className="font-medium">Location:</span> {job.location}</p>
                                    <select className="border border-gray-300 rounded p-2 w-ful text-gray-500 text-sm" onChange={(e) => updateStatusChange(job.id, e.target.value)}>
                                        <option className="border border-gray-300 rounded p-2 w-full" value="">Change Status</option>
                                        <option className="border border-gray-300 rounded p-2 w-full" value="accepted">Pending</option>
                                        <option className="border border-gray-300 rounded p-2 w-full" value="in_progress">Ongoing</option>
                                    </select>
                                    
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )

}