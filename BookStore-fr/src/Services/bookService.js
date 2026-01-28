import api from './api';

export const getBooks = (params) => api.get('/book', { params });
export const getBookById = (id) => api.get(`/book/${id}`);
export const searchBooks = (params) => api.get('/book/search', { params });
export const getFeaturedBooks = (params) => api.get('/book/featured', { params });
export const getBestSellers = (limit = 10) => api.get('/book/best-sellers', { params: { limit } });

// Admin endpoints
export const createBook = (bookData) => api.post('/book/create-book', bookData);
export const updateBook = (id, bookData) => api.put(`/book/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/book/${id}`);
export const setFeatured = (id, featured) => api.put(`/book/${id}/featured`, null, { params: { featured } });

export const getGenres = () => api.get('/book/genres');
export const getAuthors = () => api.get('/api/v1/auth/users');
