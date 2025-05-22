import { useMemo } from 'react';
import { isSameDay } from 'date-fns';
import type { Reservation } from '../@types/reservation.type';

/**
 * Custom hook to filter reservations based on selected date and room
 * 
 * @param reservations - The reservations data to filter
 * @param selectedDate - The currently selected date (optional)
 * @param selectedRoomId - The currently selected room ID (optional)
 * @returns Filtered array of reservations
 */
export const useFilteredReservations = (
  reservations: Reservation[] | undefined,
  selectedDate?: Date,
  selectedRoomId: string | null = null
) => {
  return useMemo(() => {
    if (!reservations) return [];

    return reservations.filter(
      ({ room, start }) =>
        // If no date is selected, show all reservations for the selected room
        (selectedDate ? isSameDay(new Date(start), selectedDate) : true) &&
        // If no room is selected, show all reservations for the selected date
        (selectedRoomId ? room.id === selectedRoomId : true)
    );
  }, [reservations, selectedDate, selectedRoomId]);
};
