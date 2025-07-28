import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = false;

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthService = () => {
  const urlRegister = '/register';
  const urlLogin = '/login';

  const postRegister = async (data) => {
    const response = await axios.post(urlRegister, data);
    return response;
  };
  
  const postLogin = async (data) => {
    const response = await axios.post(urlLogin, data);
    const { token } = response.data;

      localStorage.setItem('authToken', token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload.sub;
      const id = payload.id;

        const authUser = {};
        if (username) authUser.username = username;
        if (id) authUser.id = id;

        if (Object.keys(authUser).length > 0) {
          localStorage.setItem('authUser', JSON.stringify(authUser));
        }
        return response
  };

  return {
    postRegister,
    postLogin
  }
}