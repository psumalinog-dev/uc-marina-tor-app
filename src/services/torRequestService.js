import api from "./api";

export const getTorRequests = async () => {
    const response = await api.get("/torrequests");
    return response.data;
};

export const createTorRequest = async (request) => {
    const response = await api.post("/torrequests", request);
    return response.data;
};

export const updateTorStatus = async (request) => {
    const response = await api.put("/torrequests", request);
    return response.data;
};