import api from "./api";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

const saveRefreshToken = (token) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

const saveUser = (user) => {
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(USER_KEY);
    }
};

export const login = async ({ username, password }) => {
    const { data } = await api.post("/Login/authentication", {
        username,
        password,
    });

    saveToken(data.accessToken);
    saveRefreshToken(data.refreshToken);
    saveUser(data.user);

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

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const { data } = await api.post("/Login/refresh-token", {
        refreshToken,
    });

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
};

export const requestPasswordReset = async (email) => {
    const { data } = await api.post("/Login/request-password-reset", {
        email,
    });

    return data;
};

export const verifyResetToken = async (token) => {
    const { data } = await api.get(
        `/Login/verify-reset?token=${encodeURIComponent(token)}`
    );

    return data;
};

export const resetPassword = async (token, newPassword) => {
    const { data } = await api.post("/Login/reset-password", {
        token,
        newPassword,
    });

    return data;
};

export const getStoredUser = () => {
    const user = localStorage.getItem(USER_KEY);

    if (!user || user === "undefined") {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch {
        localStorage.removeItem(USER_KEY);
        return null;
    }
};

export const getStoredToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
    return !!getStoredToken();
};