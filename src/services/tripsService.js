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

  const getTripsOrderByAuthUser = async (userId) => {
    const response = await axios.get(`/destinations/user/${userId}`);
    return response;
  };

  const getTripById = async (id) => {
    const response = await axios.get(`/destinations/${id}`);
    return response;
  };

  const createDestination = async (destinationData) => {
    const response = await axios.post('/destinations', destinationData);
    return response;
  };

  const updateDestination = async (id, destinationData) => {
    const response = await axios.put(`/destinations/${id}`, destinationData);
    return response;
  };

  const deleteDestinationById = async (id) => {
    const response = await axios.delete(`/destinations/${id}`);
    return response;
  };


  return {
    getTrips,
    getTripsOrderByAuthUser,
    getTripById,
    createDestination,
    updateDestination,
    deleteDestinationById
  }
}