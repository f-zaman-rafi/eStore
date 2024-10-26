import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const hasInterceptorRef = useRef(false); // Prevent multiple registrations

    useEffect(() => {
        if (!hasInterceptorRef.current) {
            axiosSecure.interceptors.response.use(
                res => res, // Pass through successful responses
                async error => {
                    console.log('Interceptor error:', error.response);
                    if (error.response.status === 401 || error.response.status === 403) {
                        await logout(); // Handle logout
                        navigate('/sign-in'); // Redirect to sign-in
                    }
                    return Promise.reject(error); // Propagate the error
                }
            );
            hasInterceptorRef.current = true; // Set the ref to true to avoid re-registration
        }
    }, [logout, navigate]);

    return axiosSecure; // Return the secure axios instance
};

export default useAxiosSecure;
