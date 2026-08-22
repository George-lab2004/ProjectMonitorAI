import axios from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})
export const axiosBaseQuery: BaseQueryFn = async ({ url, method, data, params }) => {
    try {
        const result = await axiosInstance({
            url,
            method,
            data,
            params
        })
        return {
            data: result.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                error: {
                    status: error.response?.status,
                    data: error.response?.data
                }
            }
        }
        return {
            error: {
                status: 500,
                data: 'An unexpected error occurred'
            }
        }
    }
}
export default axiosBaseQuery