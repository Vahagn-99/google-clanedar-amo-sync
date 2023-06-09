import axios from "axios";


const apiClient = axios.create({
    baseURL: "https://widgets-api.dicitech.com/api/widget-calendar/v1/"
    //  baseURL: "https://widgets-api.dicitech.com/api/widget-calendar/v1/",
});

export default apiClient;