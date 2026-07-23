import api from "./api";

export const getNotifications = async (userId) => {
    const { data } = await api.get(
        `/Notification/${userId}`
    );

    return data;
};

export const createNotification = async (request) => {
    const { data } = await api.post(
        "/Notification",
        request
    );

    return data;
};

export const markAsRead = async (notificationId) => {
    const { data } = await api.put(
        `/Notification/${notificationId}/read`
    );

    return data;
};

const notificationService = {
    getNotifications,
    createNotification,
    markAsRead,
};

export default notificationService;