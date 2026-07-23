import api from "./api";

export const getAuditTrails = async () => {
    const { data } = await api.get("/AuditTrail");
    return data;
};

export const createAuditTrail = async (request) => {
    const { data } = await api.post("/AuditTrail", request);
    return data;
};

export default {
    getAuditTrails,
    createAuditTrail
};