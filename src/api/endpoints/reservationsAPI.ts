import type { Reservation } from "../../@types/reservation.type";
import axiosClient from "../axiosClient";

/**
 * API client for reservation-related endpoints.
 */
export const ReservationAPI = {
    /**
     * The result of fetching all reservations from the API.
     */
    getAll: async () => axiosClient.get<Reservation[]>("/reservations")
}