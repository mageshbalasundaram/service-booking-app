import { useEffect, useState } from "react";
import { acceptJob, completeJob, listenToNewJobs, listenToProviderJobs, startJob, updateJobStatus } from "../../Services/jobservice";
import { useAuth } from "../../Context/AuthContext";
import { logoutUser } from "../../Services/authservice";
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
        await acceptJob(jobId, user.uid);

        setAvailableJobs(prev => prev.filter(job => job.id !== jobId))
    };

    const handlestart = async (jobId) => {
        await startJob(jobId);
    };

    const handleComplete = async (jobId) => {
        await completeJob(jobId);


    }

    const handleMarkOngoing = async (jobId) => {
        await updateJobStatus(jobId, "in_progress")
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
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 items-start justify-between">
                <div className="grid grid-cols-4 w-full gap-5" >
                    <div className="bg-green-50/10 p-3.5 rounded-lg min-h-100 max-h-150 overflow-y-auto border border-green-100 flex flex-col gap-5 shadow-sm">
                        <h3 className="text-lg font-medium">Available Jobs</h3>
                        <div className="flex flex-col gap-2.5 overflow-y-auto">
                            {availableJobs.length === 0 && <p className=" bg-white border border-gray-100 rounded  p-2 shadow text-gray-500 ">Currently No Jobs </p>}

                            {availableJobs.map(job => (

                                <div key={job.id} className="flex flex-col gap-2.5 bg-white border border-gray-100 rounded  p-2 shadow ">
                                    <h3 className="font-bold capitalize">{job.service} </h3>
                                    <p className="capitalize"><span className="font-medium cap">Description: </span >{job.description}</p>
                                    <p className="capitalize"><span className="font-medium">Location:</span> {job.location}</p>
                                    <Button onClick={() => handleAccept(job.id)}>Accept ✅</Button>
                                    <p className="text-[9px] text-gray-500">If you dont want leave as it is, anaother provider will pick it</p>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="bg-green-50 p-3.5 rounded-lg min-h-100 max-h-150 border border-green-100 flex flex-col gap-5 shadow-sm">

                        <h3 className="text-lg font-medium">Accepted Jobs</h3>
                        <div className="flex flex-col gap-2.5 overflow-y-auto">
                            {pendingJobs.length === 0 && <p className=" bg-white border border-gray-100 rounded  p-2 shadow text-gray-500 ">No jobs Available</p>}
                            {pendingJobs.map(job => (

                                <div key={job.id} className="flex flex-col gap-2.5 bg-white border border-gray-100 rounded  p-2 shadow ">
                                    <h3 className="font-bold capitalize">{job.service} </h3>
                                    <p className="capitalize"><span className="font-medium cap">Description: </span >{job.description}</p>
                                    <p className="capitalize"><span className="font-medium">Location:</span> {job.location}</p>

                                    <Button onClick={() => handlestart(job.id)}>Start Job</Button>
                                </div>

                            ))}
                        </div>
                    </div>

                    <div className="bg-green-100 p-3.5 rounded-lg min-h-100 max-h-150 border border-green-200 flex flex-col gap-5 shadow-sm">
                        <h3 className="text-lg font-medium">Ongoing/IN Progress</h3>
                        <div className="flex flex-col gap-2.5 overflow-y-auto">
                            {ongoingJobs.length === 0 && <p className=" bg-white border border-gray-100 rounded  p-2 shadow text-gray-500 ">No OnGoing jobs</p>}
                            {ongoingJobs.map(job => (
                                <div key={job.id} className="flex flex-col gap-2.5 bg-white border border-gray-100 rounded  p-2 shadow">
                                    <h3 className="font-bold capitalize">{job.service} </h3>
                                    <p className="capitalize"><span className="font-medium cap">Description: </span >{job.description}</p>
                                    <p className="capitalize"><span className="font-medium">Location:</span> {job.location}</p>
                                    <Button onClick={() => handleComplete(job.id)}>Complete Job</Button>

                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-green-200 p-3.5 rounded-lg min-h-100 max-h-150  border border-green-300 flex flex-col gap-5 shadow-sm">

                        <h3 className="text-lg font-medium">Completed Jobs</h3>
                        <div className="flex flex-col gap-2.5 overflow-y-auto">
                            {completedJobs.length === 0 && <p className=" bg-white border border-gray-100 rounded  p-2 shadow text-gray-500 ">No Completed Jobs</p>}
                            {completedJobs.map(job => (
                                <div key={job.id} className="flex flex-col gap-2.5 bg-white border border-gray-100 rounded  p-2 shadow ">
                                    <h3 className="font-bold capitalize">{job.service} </h3>
                                    <p className="capitalize"><span className="font-medium cap">Description: </span >{job.description}</p>
                                    <p className="capitalize"><span className="font-medium">Location:</span> {job.location}</p>
                                    <p className="font-bold text-green-600 ">Job Completed</p>
                                    <select className="border border-gray-300 rounded p-2 w-ful text-gray-500 text-sm" onChange={(e) => updateJobStatus(job.id, e.target.value)}>
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