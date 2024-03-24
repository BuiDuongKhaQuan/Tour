import axios from 'axios';

const repuest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, option = {}) => {
    const response = await repuest.get(path, option);
    return response.data;
};

export default repuest;
