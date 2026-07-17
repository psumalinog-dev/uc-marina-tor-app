import api from "./api";

export const getDashboardStatistics = async () => {
    const { data } = await api.get("/Dashboard/dashboard-statistics");
    return data;
};

export const getTorRequests = async () => {
    const { data } = await api.get("/Dashboard/tor-requests");
    return data;
};

export const createTorRequest = async (request) => {
    const { data } = await api.post("/Dashboard/tor-request", request);
    return data;
};

export const updateTorRequest = async (id, request) => {
    const { data } = await api.put(`/Dashboard/tor-request/${id}`, request);
    return data;
};