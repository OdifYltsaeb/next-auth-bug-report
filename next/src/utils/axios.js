import axios from 'axios';
// import Router from 'next/router';
// import { store } from '../stores';
// import { clearAuthenticatedUser } from '../stores/authentication';

// Create axios instance.
const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

export default axiosInstance;

// axiosInstance.interceptors.response.use(
//     (response) =>
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         response,
//     (error) => {
//         const { pathname } = Router;
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         if (error.response?.status) {
//             const {
//                 response: { status },
//             } = error;
//             if (status === 401 || status === 403) {
//                 console.log('ERROR!', error.response);
//                 store.dispatch(clearAuthenticatedUser());
//                 Router.push(`/login?return=${pathname}`);
//             }
//         }
//         return Promise.reject(error);
//     },
// );

const fetcherWithOptions = ({ url, method }) => {
    switch (method) {
        case 'options': {
            return axiosInstance.options(url).then((res) => res.data);
        }
        default:
            return axiosInstance.get(url).then((res) => res.data);
    }
};

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
export { fetcher, fetcherWithOptions };
