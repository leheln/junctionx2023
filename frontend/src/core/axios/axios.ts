import Axios from 'axios';

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

axios.interceptors.request.use((config) => {
    config.headers.Accept = 'application/json';
    return config;
})

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            // Network error or the request was not completed
            return Promise.reject(error);
        }

        const { status } = error.response;

        if (status === 401) {
            window.location.href = 'login';
        } else {
            return Promise.reject(error);
        }
    }
);