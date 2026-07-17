import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7288/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            if (isRefreshing) {

                return new Promise((resolve, reject) => {

                    failedQueue.push({
                        resolve,
                        reject,
                    });

                }).then((token) => {

                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    return api(originalRequest);

                });

            }

            originalRequest._retry = true;

            isRefreshing = true;

            try {

                const refreshToken =
                    localStorage.getItem("refreshToken");

                const response = await axios.post(
                    "https://localhost:7288/api/Login/refresh-token",
                    {
                        refreshToken,
                    }
                );

                const newAccessToken =
                    response.data.accessToken;

                const newRefreshToken =
                    response.data.refreshToken;

                localStorage.setItem(
                    "token",
                    newAccessToken
                );

                localStorage.setItem(
                    "refreshToken",
                    newRefreshToken
                );

                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (err) {

                processQueue(err);

                localStorage.clear();

                window.location.href = "/login";

                return Promise.reject(err);

            } finally {

                isRefreshing = false;

            }

        }

        return Promise.reject(error);

    }
);

export default api;