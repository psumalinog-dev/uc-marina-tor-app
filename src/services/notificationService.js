import api from "./api";

export const createNotification = async (notification) => {
    const { data } = await api.post("/Notification", notification);
    return data;
};

export const getNotifications = async (userId) => {
    const { data } = await api.get(`/Notification/${userId}`);
    return data;
};