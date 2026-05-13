import { useEffect, useState } from "react";
import { acceptJob, completeJob, listenToNewJobs, listenToProviderJobs, startJob, updateJobStatus } from "../../Services/jobservice";
import { useAuth } from "../../Context/AuthContext";
import { logoutUser } from "../../Services/authservice";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/layout/NavBar";

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

    // const handleLogout = async () => {
    //     try {
    //         await logoutUser();
    //         navigate("/login");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return (
        <>
            <Navbar />
            <div className="inner-con">
                <div className="Heading" style={{ fontSize: "30px", textAlign: "center" }}><h2>Provider Dashboard</h2></div>
                <div className="grid" >
                    <div className="column">
                        <h3>Available Jobs</h3>
                        {availableJobs.length === 0 && <p>No jobs </p>}

                        {availableJobs.map(job => (

                            <div key={job.id} className="provider-card available-jobs">
                                <h3>{job.service}</h3>
                                <p><b>Description:</b>{job.description}</p>
                                <p><b>Location:</b> {job.location}</p>
                                <button onClick={() => handleAccept(job.id)}>Accept ✅</button>


                            </div>
                        ))}

                    </div>
                    <div className="column accepted-column">

                        <h3>Accepted Jobs</h3>
                        {pendingJobs.length === 0 && <p>No jobs Available</p>}
                        {pendingJobs.map(job => (

                            <div key={job.id} className="card accepted-jobs">
                                <h3>{job.service}</h3>
                                <p><b>Description:</b>{job.description}</p>
                                <p><b>Location:</b>  {job.location}</p>

                                <button onClick={() => handlestart(job.id)}>Start Job</button>


                            </div>

                        ))}
                    </div>

                    <div className="column ongoing-column">
                        <h3>Ongoing/IN Progress</h3>
                        {ongoingJobs.length === 0 && <p>No OnGoing jobs</p>}
                        {ongoingJobs.map(job => (
                            <div key={job.id} className="card ongoing-jobs">
                                <h3>{job.service}</h3>
                                <p><b>Description:</b>{job.description}</p>
                                <p><b>Location:</b>  {job.location}</p>
                                <button onClick={() => handleComplete(job.id)}>Complete Job</button>

                            </div>
                        ))}
                    </div>

                    <div className="column completed-column">

                        <h3>Completed Jobs</h3>
                        {completedJobs.length === 0 && <p>No completed Jobs</p>}
                        {completedJobs.map(job => (
                            <div key={job.id} className="card">
                                <h3>{job.service}</h3>
                                <p><b>Description:</b>{job.description}</p>
                                <p><b>Location:</b>  {job.location}</p>
                                <p>Job Completed</p>
                                <select onChange={(e) => updateJobStatus(job.id, e.target.value)}>
                                    <option value="">Change Status</option>
                                    <option value="accepted">Pending</option>
                                    <option value="in_progress">Ongoing</option>
                                </select>



                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </>
    )

}