import { useMemo, useCallback } from 'react';
import { compareAsc, isSameDay, parseISO } from 'date-fns';
import type { Reservation } from '../@types/reservation.type';

/**
 * Custom hook to handle date availability from reservations
 * 
 * @param reservations - The reservations data containing date information
 * @returns An object with available dates, the first available date, and a function to check if a date is available
 */
export const useDateAvailability = (reservations: Reservation[] | undefined) => {
  // Extract all unique dates that have reservations
  const availableDates = useMemo(() => {
    if (!reservations) return [];

    const uniqueDates = [
      ...new Set(reservations.map(({ start }) => start.split('T')[0])),
    ];
    
    // convert date strings to Date objects
    return uniqueDates.map(dateStr => parseISO(dateStr));
  }, [reservations]);

  // Get the first available date (the earliest date with a reservation)
  const firstAvailableDate = useMemo(() => {
    if (availableDates.length === 0) return undefined;
    
    // Sort dates in ascending order using date-fns compareAsc function
    return [...availableDates].sort((a, b) => compareAsc(a, b))[0];
  }, [availableDates]);

  const isDateAvailable = useCallback(
    (date: Date) => 
      availableDates.length === 0 ||
      availableDates.some(availableDate => isSameDay(date, availableDate)),
    [availableDates]
  );

  return { availableDates, firstAvailableDate, isDateAvailable };
};
