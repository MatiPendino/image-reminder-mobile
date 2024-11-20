import axios from "axios";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

const api = axios.create({
    baseURL: BACKEND_URL
})

export default api