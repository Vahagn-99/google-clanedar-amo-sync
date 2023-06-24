
import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://widgets-api.dicitech.com/api/widgets/",
    // You can also configure headers, timeouts, interceptors, etc. here
});

// Helper function to get widget id
async function getWidgetId() {
    const { data: { data: { id: widgetId } } } = await apiClient.get('info/calendar');
    return widgetId;  // assuming the id is in the 'id' property
}

apiClient.interceptors.request.use(async (config) => {
    const id = await getWidgetId();
    config.url = `${config.url}${id}/`; // append the widget id to the endpoint
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default apiClient;
