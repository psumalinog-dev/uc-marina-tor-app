import api from "./api";

export const getBerths = async () => {
    const { data } = await api.get("/Berths");
    return data;
};

export const getBerth = async (id) => {
    const { data } = await api.get(`/Berths/${id}`);
    return data;
};

export const createBerth = async (berth) => {
    const { data } = await api.post("/Berths", berth);
    return data;
};

export const updateBerth = async (id, berth) => {
    const { data } = await api.put(`/Berths/${id}`, berth);
    return data;
};