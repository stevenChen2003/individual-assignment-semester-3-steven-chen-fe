import axios from "axios";
import TokenManager from "./TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const UserApi = {
    getUsers: () => axios.get(`/users`, 
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then(response => response.data.users),

    getUser: (userId) => axios.get(`/users/${userId}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then((response) => response.data),

    addUser: (newUser) => axios.post(`/users`, newUser),

    updateUser: (updateUser) => axios.put(`/users/${updateUser.id}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    deleteUser: (userId) => axios.delete(`/users/${userId}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then((response) => response.data)
}

export default UserApi