import React from "react";
import { ReservationList } from "../lists/ReservationList";
import type { Reservation } from "../../@types/reservation.type";

interface ReservationContentProps {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  filteredReservations: Reservation[];
}

/**
 * Component that renders the reservation content, including loading and error states
 */
export const ReservationContent: React.FC<ReservationContentProps> = ({
  isLoading,
  isError,
  refetch,
  filteredReservations,
}) => (
  <main className="mt-6 space-y-2" aria-live="polite">
    {isLoading && (
      <div role="status" aria-label="Loading reservations">
        <p>Loading reservations…</p>
      </div>
    )}

    {isError && (
      <div role="alert" className="text-red-600">
        <p>Failed to load reservations.</p>
        <button
          onClick={() => refetch()}
          className="underline ml-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Retry loading reservations"
        >
          Retry
        </button>
      </div>
    )}

    {!isLoading && !filteredReservations.length && (
      <div role="status" aria-label="No reservations found">
        <p>No reservations found for the chosen filters.</p>
      </div>
    )}

    {!isLoading && !isError && filteredReservations.length > 0 && (
      <ReservationList reservations={filteredReservations} />
    )}
  </main>
);
