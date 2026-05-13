import { addDoc, collection, onSnapshot, query, where, serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"


export const createJob = async (jobData) => {
    return await addDoc(collection(db, "jobs"), {
        ...jobData,
        status: "created",
        createdAt: serverTimestamp(),
    });
};

export const listenToNewJobs = (callback) => {

    const q = query(
        collection(db, "jobs"),
        where("status", "==", "created")
    );

    return onSnapshot(q, (snapshot) => {

        const jobs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (typeof callback === "function") {
            callback(jobs);

        }


    });


};

export const listenToUserJobs = (userId, callback) => {

    const q = query(
        collection(db, "jobs"),
        where("customerId", "==", userId)

    );
    return onSnapshot(q, (snapshot) => {

        const jobs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (typeof callback === "function") {
            callback(jobs);

        }
    })

}

export const acceptJob = async (jobId, providerId) => {

    const jobRef = doc(db, "jobs", jobId);

    await updateDoc(jobRef, {
        providerId: providerId,
        status: "accepted"
    });
};

export const listenToProviderJobs = (providerId, callback) => {

    const q = query(

        collection(db, "jobs"),
        where("providerId", "==", providerId)
    );

    return onSnapshot(q, (snapshot) => {
        const jobs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (typeof callback === "function") {
            callback(jobs)
        }
    });
}

export const startJob = async (jobId) => {

    const jobRef = doc(db, "jobs", jobId);

    await updateDoc(jobRef, {
        status: "in_progress"
    });
};

export const completeJob = async (jobId) => {
    const jobRef = doc(db, "jobs", jobId);

    await updateDoc(jobRef, {
        status: "completed"

    });
};

export const getProviderDetails = async (providerId) => {
    const providerRef = doc(db, "users", providerId);
    const providerSnap = await getDoc(providerRef);

    if (providerSnap.exists()) {
        return providerSnap.data();
    }

    return null;

};

export const updateJobStatus = async (jobId, status) => {
    const jobRef = doc(db, "jobs", jobId);

    await updateDoc(jobRef, {
        status: status
    });
}