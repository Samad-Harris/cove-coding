import { useQuery } from '@tanstack/react-query';

import { CoveAPI } from '../CoveAPI';
import type { Reservation } from '../../@types/reservation.type';

const RESERVATIONS_KEY = 'RESERVATIONS';

/**
 * Custom hook to fetch all reservations.
 * 
 * @returns - The query object containing the reservations data and status.
 * 
 * @example
 * const { data: reservations, isLoading } = useGetReservations();
 * 
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 * 
 * return (
 *   <ul>
 *     {reservations.map(reservation => (
 *       <li key={reservation.id}>{reservation.room.name}</li>
 *     ))}
 *   </ul>
 * );
 */
export const useGetReservations = () => {
  return useQuery<Reservation[]>({
    queryKey: [RESERVATIONS_KEY],
    queryFn: async () => {
      const response = await CoveAPI.reversions.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Stay fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep cache for 30 minutes
  });
};
