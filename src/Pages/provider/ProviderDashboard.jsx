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

    // const handleLogout = async () => {
    //     try {
    //         await logoutUser();
    //         navigate("/login");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


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
                <div className="grid" >
                    <div className="column flex flex-col gap-5 shadow-sm bg-white">
                        <h3 className="provider-title">Available Jobs</h3>
                        {availableJobs.length === 0 && <p>No jobs </p>}

                        {availableJobs.map(job => (

                            <div key={job.id} className="provider-card available-jobs ">
                                <h3>{job.service} </h3>
                                <p><b>Description:</b>{job.description}</p>
                                <p><b>Location:</b> {job.location}</p>
                                <Button onClick={() => handleAccept(job.id)}>Accept ✅</Button>
                                


                            </div>
                        ))}

                    </div>
                    <div className="column accepted-column">

                        <h3 className="provider-title">Accepted Jobs</h3>
                        {pendingJobs.length === 0 && <p>No jobs Available</p>}
                        {pendingJobs.map(job => (

                            <div key={job.id} className="card accepted-jobs">
                                <h3>{job.service}</h3>
                                <p><b>Description:</b>{job.description}</p>
                                <p><b>Location:</b>  {job.location}</p>

                                <Button onClick={() => handlestart(job.id)}>Start Job</Button>


                            </div>

                        ))}
                    </div>

                    <div className="column ongoing-column">
                        <h3 className="provider-title">Ongoing/IN Progress</h3>
                        {ongoingJobs.length === 0 && <p>No OnGoing jobs</p>}
                        {ongoingJobs.map(job => (
                            <div key={job.id} className="card ongoing-jobs">
                                <h3>{job.service}</h3>
                                <p><b>Description:</b>{job.description}</p>
                                <p><b>Location:</b>  {job.location}</p>
                                <Button onClick={() => handleComplete(job.id)}>Complete Job</Button>

                            </div>
                        ))}
                    </div>

                    <div className="column completed-column">

                        <h3 className="provider-title">Completed Jobs</h3>
                        {completedJobs.length === 0 && <p>No completed Jobs</p>}
                        {completedJobs.map(job => (
                            <div key={job.id} className="card w-full">
                                <h3>{job.service}</h3>
                                <p><b>Description:</b>{job.description}</p>
                                <p><b>Location:</b>  {job.location}</p>
                                <p>Job Completed</p>
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
    )

}