import api from "./api";

export const login = async (credentials) => {
    const { data } = await api.post("/Login/authentication", {
        username: credentials.username,
        password: credentials.password
    });

    if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
    }

    if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data.user;
};

export const register = async (request) => {
    const { data } = await api.post("/Login/register", request);
    return data;
};

export const changePassword = async (request) => {
    const { data } = await api.post("/Login/change-password", request);
    return data;
};

export const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const refreshToken = async (request) => {
    const { data } = await api.post("/Login/refresh-token", request);

    if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
    }

    return data;
};

export const requestPasswordReset = async (email) => {
    const { data } = await api.post("/Login/request-password-reset", {
        email
    });

    return data;
};

export const verifyResetToken = async (token) => {
    const { data } = await api.get(`/Login/verify-reset?token=${token}`);
    return data;
};

export const resetPassword = async (token, newPassword) => {
    const { data } = await api.post("/Login/reset-password", {
        token,
        newPassword
    });

    return data;
};

export const getStoredUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    return JSON.parse(user);
};