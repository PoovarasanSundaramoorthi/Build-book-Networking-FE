/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL, // Replace with your API's base URL
        });

        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const cleanedToken = token.replace(/^"(.*)"$/, '$1');
                    config.headers.Authorization = `Bearer ${cleanedToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
    async CreateUser(data) {
        return this.api.post('/api/v1/user/create', data, { params: data });
    }
    async AddBook(data) {
        return this.api.post('/api/v1/books', data);
    }
    async GetAllBooks(data) {
        return this.api.get('/api/v1/books', { params: { data } });
    }
    async GetAllUsers(data) {
        return this.api.get('/api/v1/user/', { params: { data } });
    }
    async AddUserBooks({ bookId, userId }) {
        return this.api.post(`/api/v1/user/books/${userId}`, { bookId: bookId });
    }
    async GetUserBooks({ userId }) {
        return this.api.get(`/api/v1/user/books/${userId}`);
    }
}

export default new ApiService();