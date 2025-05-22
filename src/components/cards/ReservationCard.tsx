import React from "react";
import type { Reservation } from "../../@types/reservation.type";
import { format } from "date-fns";

export const ReservationCard: React.FC<{ reservation: Reservation }> = ({
  reservation,
}) => {
  const { room, start, end } = reservation;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const timeRange = `${format(startDate, "h:mma")} – ${format(
    endDate,
    "h:mma"
  )}`;
  const dateLabel = format(startDate, "MMM d yyyy");

  /** Fallback image if API doesn’t provide one */
  const imgSrc =
    room?.imageUrl ??
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=60";

  return (
    // used article element to improve semantics and accessibility
    <article className="flex flex-col sm:flex-row gap-4 rounded-sm shadow-md p-4 bg-white">
      {/* Room image */}
      <img
        src={imgSrc}
        alt={room?.name ?? "Room image"}
        className="h-40 w-full sm:w-48 object-cover"
        loading="lazy" // Used to defer loading of offscreen images
        decoding="async" // Used to improve performance by allowing the browser to decode the image in the background
        fetchPriority="low" // Used to indicate that the image is not critical for the initial rendering
        // TODO: we can use tools like vite-imagetools to generate srcset for different resolutions
        // this way we can serve different image sizes based on the device and have a better performance
      />

      {/* Reservation details */}
      <div className="flex flex-1 flex-col sm:flex-row justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-wide">{timeRange}</h3>
          <p className="text-sm text-gray-600">{dateLabel}</p>
        </div>

        {/* Right‑aligned room label on desktop, inline on mobile */}
        <div className="mt-2 sm:mt-0 ">
          <span className="text-base font-medium">{room?.name}</span>
        </div>
      </div>
    </article>
  );
};
