export const getJobStatusMessage = (status) => {

    switch(status){

        case "created":
            return "waiting for provider";

        case "accepted":
            return "Provider accepted you request";
        
        case "in_progress":
            return "Provider started working";

        case "completed":
            return "Job completed";

        default:
            return status;
    }


};