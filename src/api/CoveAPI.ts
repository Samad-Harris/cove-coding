import { ReservationAPI } from "./endpoints/reservationsAPI";

/**
 * Main API client for Cove services.
 * @namespace
 * @property {ReservationAPI} reversions - API for managing reservations
 */
export const CoveAPI = {
    reversions: ReservationAPI
}