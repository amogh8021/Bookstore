import api from './api';

export const addToWishlist = (bookId) => {
    return api.post(`/api/wishlist/add?bookId=${bookId}`);
};

export const removeFromWishlist = (bookId) => {
    return api.delete(`/api/wishlist/delete?bookId=${bookId}`);
};

export const getWishlist = () => {
    return api.get('/api/wishlist/books');
};
