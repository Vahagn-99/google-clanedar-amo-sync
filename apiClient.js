import axios from "axios";


const apiClient = axios.create({
    baseURL: "https://widgets-api.dicitech.com/api/widgets/",
    baseURL: "http://localhost:8080/api/widgets/",
});

export default apiClient;