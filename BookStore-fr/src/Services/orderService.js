import api from './api';

export const createOrder = () => {
    return api.post('/orders/create');
};
