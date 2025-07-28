import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = false;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const UsersService = () => {
    const getUsers = async () => {
        const response = await axios.get('/users/all');
        return response;
    };

    const createUser = async (userData) => {
        const response = await axios.post('/users/create', userData);
        return response.data;
    };
    const getUserById = async (id) => {
        const response = await axios.get(`/users/id/${id}`);
        return response.data;
    };

    const updateUser = async (id, userData) => {
        const response = await axios.put(`/users/update/${id}`, userData);
        return response.data;
    };

    const deleteUser = async (id) => {
        const response = await axios.delete(`/users/delete/${id}`);
        return response.data;
    };

    return {
        getUsers,
        createUser,
        getUserById,
        updateUser,
        deleteUser
    };
};