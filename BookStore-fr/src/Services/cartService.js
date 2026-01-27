import api from './api';

export const addToCart = (bookId, quantity = 1, discountPercent = 0) => {
    return api.post('/cart/add', { book_id: bookId, items: quantity, discountPercent });
};

export const getCart = () => api.get('/cart');

export const removeFromCart = (bookId) => api.delete(`/cart/remove/${bookId}`);

export const updateQuantity = (bookId, quantity) => {
    return api.put(`/cart/update/${bookId}?quantity=${quantity}`);
};

export const clearCart = () => api.delete('/cart/clear');

export const applyCoupon = (couponCode) => {
    return api.post(`/cart/apply-coupon?couponCode=${couponCode}`);
};
