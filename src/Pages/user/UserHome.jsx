import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useRef, useState } from "react";
import {
  getProviderDetails,
  listenToUserJobs,
} from "../../Services/jobservice";
import Navbar from "../../Components/layout/NavBar";
import CreateJob from "./CreateJob";
import StatusBadge from "../../Components/ui/StatusBadge";


const UserHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [providers, setProviders] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchingRef = useRef(new Set());

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const unsubscribe = listenToUserJobs(user.uid, (data) => {
      setJobs(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // FIX: added `providers` to dependency array to avoid stale closure


  useEffect(() => {
    jobs.forEach(async (job) => {
      if (!job.providerId) return;
      if (providers[job.providerId]) return;
      if (fetchingRef.current.has(job.providerId)) return;

      fetchingRef.current.add(job.providerId);

      try {
        const providerData = await getProviderDetails(job.providerId);
        setProviders((prev) => ({ ...prev, [job.providerId]: providerData }));

      } catch (err) {
        console.error("Failed to fetch provider:", err);

      } finally {
        fetchingRef.current.delete(job.providerId);
      }
    });
  }, [jobs]);

  const username = user?.email?.split("@")[0];



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-sm text-gray-400 font-medium tracking-widest uppercase mb-1">
            Dashboard
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

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8 items-start justify-between">

        {/* Left: Bookings list */}
        <section className="w-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-800">
              My Bookings
            </h2>
            {!loading && (
              <span className="text-sm text-gray-400">
                {jobs.length} {jobs.length === 1 ? "booking" : "bookings"}
              </span>
            )}
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="flex flex-col gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse"
                >
                  <div className="flex justify-between mb-3">
                    <div>
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                      <div className="h-3 w-24 bg-gray-100 rounded" />
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-3/4 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && jobs.length === 0 && (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="text-gray-700 font-semibold text-lg mb-1">
                No bookings yet
              </h3>
              <p className="text-gray-400 text-sm">
                Create your first service request using the form on the right.
              </p>
            </div>
          )}

          {/* Booking cards */}
          {!loading && jobs.length > 0 && (
            <div className=" grid grid-cols-2! w-full!  gap-4">
              {jobs.map((job) => {
                const provider = job.providerId
                  ? providers[job.providerId]
                  : null;

                return (
                  <div
                    key={job.id}
                    className=" bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Card header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900 capitalize">
                          {job.service}
                        </h4>
                        <p className="text-sm text-gray-400 flex items-center gap-1 mt-0.5">
                          <span>📍</span> {job.location}
                        </p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>

                    {/* Description */}
                    {job.description && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                        {job.description}
                      </p>
                    )}

                    {/* Divider + provider section */}
                    
                    {provider && (
                      <div className="border-t border-gray-100 pt-4 mt-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                          Assigned Provider
                        </p>
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm flex items-center justify-center shrink-0">
                            {provider.name?.charAt(0).toUpperCase() ?? "?"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {provider.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              📞 {provider.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Loading provider */}
                    {job.providerId && !provider && (
                      <div className="border-t border-gray-100 pt-4 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse" />
                          <div>
                            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                            <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Right: Create Job — sticky sidebar */}
        <aside className="lg:sticky lg:top-6 w-fit ">
          <CreateJob />
        </aside>
      </div>
    </div>
  );
};

export default UserHome;