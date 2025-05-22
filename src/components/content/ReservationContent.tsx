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
  <main className="mt-6 space-y-2">
    {isLoading && <div>Loading reservations…</div>}

    {isError && (
      <div className="text-red-600">
        Failed to load reservations.{" "}
        <button onClick={() => refetch()}>Retry</button>
      </div>
    )}

    {!isLoading && !filteredReservations.length && (
      <div>No reservations found for the chosen filters.</div>
    )}

    <ReservationList reservations={filteredReservations} />
  </main>
);
