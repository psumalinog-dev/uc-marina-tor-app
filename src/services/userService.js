import api from "./api";
import { getStoredToken } from "./authService";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getStoredToken()}`
    }
});

export const getUsers = async () => {
    const { data } = await api.get("/User", authHeader());
    return data;
};

export const getUserById = async (id) => {
    const { data } = await api.get(`/User/${id}`, authHeader());
    return data;
};

export const updateUser = async (id, request) => {
    const { data } = await api.put(`/User/${id}`, request, authHeader());
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await api.delete(`/User/${id}`, authHeader());
    return data;
};