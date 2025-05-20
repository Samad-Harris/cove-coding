import axiosClient from "../axiosClient";

/**
 * API client for reservation-related endpoints.
 */
export const ReservationAPI = {
    /**
     * The result of fetching all reservations from the API.
     * @returns {Promise<AxiosResponse>} A promise containing the reservation data.
     */
    getAll: axiosClient.get("/reservations")
}