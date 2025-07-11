import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = false;

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export const TripsService = () => {
  const urlGetAll = '/destinations';
  const getTrips = async () => {
    const response = await axios.get(urlGetAll);
    return response;
  };

  const getTripsOrderByAuthUser = async () => {
    const response = await axios.get(`/destinations/user`);
    return response;
  };

  const getTripById = async (id) => {
    const response = await axios.get(`/destinations/${id}`);
    return response;
  };

  return {
    getTrips,
    getTripsOrderByAuthUser,
    getTripById
  }
}