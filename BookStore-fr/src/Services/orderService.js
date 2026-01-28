import api from './api';

export const createOrder = () => {
    return api.post('/orders/create');
};

export const getMyOrders = () => {
    return api.get('/orders/my-orders');
};
