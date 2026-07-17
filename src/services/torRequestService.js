import api from "./api";

export const getTorRequests = async () => {
    const { data } = await api.get("/TorRequests");
    return data;
};

export const createTorRequest = async (request) => {
    const { data } = await api.post("/TorRequests", request);
    return data;
};

export const updateTorRequestStatus = async (id, request) => {
    const { data } = await api.put(`/TorRequests/${id}/status`, request);
    return data;
};