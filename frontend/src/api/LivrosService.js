import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getLivros() {
    return apiClient.get('/livros');
  },
  getLivro(id) {
    return apiClient.get(`/livros/${id}`);
  },
  createLivro(body) {
    return apiClient.post('/livros', body);
  },
  updateLivro(id, body) {
    return apiClient.put(`/livros/${id}`, body);
  },
  deleteLivro(id) {
    return apiClient.delete(`/livros/${id}`);
  },
};