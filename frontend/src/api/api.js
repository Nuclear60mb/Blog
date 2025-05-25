import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (err) {
    console.error('Ошибка при выходе из аккаунта', err);
  }
};