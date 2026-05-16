import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"
import { useEffect, useState } from "react";
import { getProviderDetails, listenToNewJobs, listenToUserJobs } from "../../Services/jobservice";
import { logoutUser } from "../../Services/authservice";
import { getJobStatusMessage } from "../../utils/JobStatusMessage";
import Navbar from "../../Components/layout/NavBar";
import Service from "../../Components/ui/Service";
import CreateJob from "./CreateJob";
import StatusBadge from "../../Components/ui/StatusBadge";





const UserHome = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [providers, setProviders] = useState({});

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


  return (
    <>

      <Navbar />
      <div className="w-full flex justify-center items-center">
        <div className="w-300 flex gap-5 py-10 justify-between">
          <div className="flex-1 flex flex-col  items-start gap-5 w-[65%] ">
            <h2 className="text-4xl">Welcome {user?.email?.split("@")[0]}</h2>
            <h3 className="text-2xl">My Bookings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {jobs.map((job) => (

                <div key={job.id} className="bg-white border border-gray-200 rounded-2xl p-5  shadow-sm ">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-semibold capitalize">{job.service}</h4>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                    <StatusBadge status={job.status} />

                  </div>
                  <p className="text-gray-700 text-sm mb-4">{job.description}</p>
                  {job.providerId && providers[job.providerId] && (
                    <div className="bg-gray-50 rounded-xl p-3 border">
                      <p className="font-medium text-sm mb-1">Assigned Provider</p>
                      <p className="text-sm"> 👤 {providers[job.providerId].name}</p>
                      <p className="text-sm">  📞 {providers[job.providerId].phone}</p>
                    </div>

                  )}

                </div>

              ))}

            </div>
          </div>
          <div className="flex items-start w-[35%]">
            <div className="">
              <CreateJob />

            </div>

          </div>
        </div>
      </div>
    </>

  )
}

export default UserHome