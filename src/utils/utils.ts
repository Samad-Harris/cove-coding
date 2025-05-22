import { compareAsc } from 'date-fns';
import type { Reservation } from '../@types/reservation.type';
import { reservationMock } from '../mock/reservation.mock';



/**
 * Creates a reservation object with the given start and end times
 * Optionally can use room data from mock if available
 */
export const createReservation = (
  startTime: string, 
  endTime: string, 
  useRoomFromMock: boolean = false
): Reservation => {
  const roomData = useRoomFromMock && reservationMock.length > 0 
    ? reservationMock[0].room 
    : {
        id: "mock-room-id",
        name: "Mock Room",
        imageUrl: ""
      };
  
  return {
    id: `mock-reservation-${Date.now()}`,
    start: startTime,
    end: endTime,
    room: roomData
  };
};

/**
 * @returns true if any 2 reservations conflict
 *   - reservations conflict if their times overlap in any way
 *   - reservations DO NOT conflict if they are just touching each other (reservation1.end === reservation2.start)
 */
export const isScheduleConflict = (reservations: Reservation[]): boolean => {
  // If there are less than 2 reservations, there can't be any conflicts
  if (reservations.length < 2) {
    return false;
  }

  // Sort reservations by start time for more efficient checking
  const sortedReservations = [...reservations].sort((a, b) => 
    compareAsc(new Date(a.start), new Date(b.start))
  );

  // Check each reservation against the next one in sorted order
  return sortedReservations.some((current, index) => {
    if (index === sortedReservations.length - 1) return false;
    const next = sortedReservations[index + 1];
    return new Date(current.end) > new Date(next.start);
  });
};

/**
 * Creates a time slot reservation for a specific date (2023-05-20).
 * 
 * @param start - The start time in the format "HH:MM"
 * @param end - The end time in the format "HH:MM"
 * @returns A reservation object created by the createReservation function with properly formatted ISO datetime strings
 * 
 * @example
 * // Creates a reservation from 9:00 to 10:00 on May 20, 2023
 * const timeSlot = createTimeSlot('09:00', '10:00');
 */
export const createTimeSlot = (start: string, end: string) =>
  createReservation(`2023-05-20T${start}:00`, `2023-05-20T${end}:00`);