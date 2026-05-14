import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"
import { useEffect, useState } from "react";
import { getProviderDetails, listenToNewJobs, listenToUserJobs } from "../../Services/jobservice";
import { logoutUser } from "../../Services/authservice";
import { getJobStatusMessage } from "../../utils/JobStatusMessage";
import Navbar from "../../Components/layout/NavBar";





const UserHome = () => {

  const services = [
        { name: "electrician", icon: "⚡" },
        { name: "plumber", icon: "🚰" },
        { name: "carpenter", icon: "🪚" },
        { name: "ac_service", icon: "❄" }
    ]

  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const [providers, setProviders] = useState({});

  const activeJobs = jobs.filter(
    job => job.status !== "completed"
  );

  const completedJobs = jobs.filter(
    job => job.status === "completed"
  )

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToUserJobs(user.uid, setJobs);
    return () => unsubscribe();

  }, [user]);

  useEffect(() => {

    jobs.forEach(async (job) => {

      if (job.providerId && !providers[job.providerId]) {

        const providerData = await getProviderDetails(job.providerId);

        setProviders(prev => ({
          ...prev,
          [job.providerId]: providerData
        }));
      }
    })

  }, [jobs]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center">
      <div className="w-300 flex flex-col items-center align-middle gap-5 py-10">
        <h2 className="text-6xl">Welcome {user?.email?.split("@")[0]}</h2>
        <h3 className="text-2xl">Explore a service</h3>
        <div className="flex ">
        {services.map(service => (
                    <div key={service.name} style={{ border: "1px solid #ddd", cursor: "pointer", borderRadius: "10px", margin: "10px", padding: "10px" }} onClick={() => navigate(`/user/create-Job?service=${service}`)}>
                        <h2>{service.icon}</h2>
                        <p>{service.name}</p>
                    </div>
                ))}
                </div>
  
        {/* <button onClick={() => navigate("/user/create-job")}>CreateJob</button> */}
        <h3>Your Request</h3>

        {jobs.length === 0 && <p> No Jobs yet</p>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
          {jobs.map(job => (

            <div key={job.id} style={{ border: "1px solid grey", margin: "10px", padding: "10px", borderRadius: "10px", background: "#fafafa" }}>
              <h4>{job.service}</h4>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Status: {getJobStatusMessage(job.status)}</p>
              {job.status === "accepted" && (
                <p style={{ color: "green" }}>
                  ✔ Provider accepted your request
                </p>
              )}

              {job.status === "in_progress" && (
                <p style={{ color: "orange" }}>
                  🔧 Work has started
                </p>
              )}

              {job.status === "completed" && (
                <p style={{ color: "blue" }}>
                  ✅ Job completed
                </p>
              )}


              {job.providerId && providers[job.providerId] && (

                <div style={{
                  background: "#f2f2f2", padding: "10px", marginTop: "10px",
                  borderRadius: "6px"
                }}>
                  <p><strong>Provider Assigned</strong></p>
                  <p>Name: {providers[job.providerId].name}</p>
                  <p>Phone: {providers[job.providerId].phone}</p>



                </div>
              )}


            </div>
          ))}
        </div>


        <h3>Active Jobs</h3>
        {activeJobs.length === 0 && <p>No active jobs</p>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
          {activeJobs.map(job => (
            <div key={job.id} style={{ border: "1px solid grey", margin: "10px", padding: "10px", borderRadius: "10px", background: "#fafafa" }}>
              <h4>{job.service}</h4>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Status: {job.status}</p>
              {job.providerId && <p>Provider Assigned</p>}



            </div>
          ))}
        </div>

        <h3>Completed Jobs</h3>

        {completedJobs.length === 0 && <p>No completed Jobs</p>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px" }}>
          {completedJobs.map(job => (
            <div key={job.id} style={{ border: "1px solid grey", margin: "10px", padding: "10px", borderRadius: "10px", background: "#fafafa" }}>
              <h4>{job.service}</h4>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Status: {job.status}</p>

            </div>
          ))}
        </div>
      </div>
      </div>
    </>

  )
}

export default UserHome