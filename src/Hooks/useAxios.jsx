import axios from 'axios';

export const axioss = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxios = () => {
    return axioss;
}

export default useAxios;