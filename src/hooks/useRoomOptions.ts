import { useMemo } from 'react';
import type { Reservation } from '../@types/reservation.type';
import type { SelectOption } from '../@types/SelectOption.type';

/**
 * Custom hook to generate room options from reservations data
 * 
 * @param reservations - The reservations data containing room information
 * @returns An array of SelectOption objects for room selection
 */
export const useRoomOptions = (reservations: Reservation[] | undefined): SelectOption[] => {
  return useMemo(() => {
    if (!reservations) return [];
    
    // Create a map to ensure unique room IDs
    const map = new Map(reservations.map(({ room }) => [room.id, room]));

    // Convert map values to select options
    return Array.from(map.values()).map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }, [reservations]);
};
