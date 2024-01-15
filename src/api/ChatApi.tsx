import axios from 'axios';
import TokenManager from './TokenManager';

axios.defaults.baseURL = 'http://localhost:8080';

const ChatApi = {
    sendChatMessage: (message) =>
        axios.post('/chat', message, {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        }),

    getAllChatMessages: (movieId) =>
        axios.get(`/chat/messages?movieId=${movieId}`, {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        }).then((response) => response.data),
};

export default ChatApi;
