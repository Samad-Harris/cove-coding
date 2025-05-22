import React from "react";
import type { Reservation } from "../../@types/reservation.type";
import { ReservationCard } from "../cards/ReservationCard";

interface ReservationListProps {
  reservations: Reservation[];
}

/**
 * A component that renders a list of reservations.
 *
 * @component
 * @example
 * ```tsx
 * const reservations = [{ id: '1', ... }, { id: '2', ... }];
 * <ReservationList reservations={reservations} />
 * ```
 *
 * @param props.reservations - An array of reservation objects to be rendered as cards
 * @returns A div containing a list of ReservationCard components
 */
export const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
}) => (
  <div className="space-y-6">
    {reservations.map((reservation) => (
      <ReservationCard key={reservation.id} reservation={reservation} />
    ))}
  </div>
);
