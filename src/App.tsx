import { useState, useMemo, useCallback } from "react";
import { isSameDay, parseISO } from "date-fns";
import { useGetReservations } from "./api/hooks/useGetReservations";
import { DatePicker } from "./components/inputs/DatePicker";
import { DropDownSelect } from "./components/inputs/DropDownSelect";
import { useRoomOptions } from "./hooks/useRoomOptions";
import { useDateAvailability } from "./hooks/useDateAvailability";
import { useFilterSelections } from "./hooks/useFilterSelections";
import { useFilteredReservations } from "./hooks/useFilteredReservations";

const App: React.FC = () => {
  /**
   * -----------------------------
   *     Data Fetching Layer
   * -----------------------------
   */
  const {
    data: reservations,
    isLoading,
    isError,
    refetch,
  } = useGetReservations();

  /**
   * -----------------------------
   *     Custom Hooks Layer
   * -----------------------------
   */
  // Filter selection state (date and room)
  const { selectedDate, selectedRoomId, handleDateChange, handleRoomChange } =
    useFilterSelections();

  // Room options for dropdown
  const roomOptions = useRoomOptions(reservations);

  // Date availability filtering
  const { isDateAvailable } = useDateAvailability(reservations  );

  // Filtered reservations based on selections
  const filteredReservations = useFilteredReservations(
    reservations,
    selectedDate,
    selectedRoomId
  );

  /**
   * -----------------------------
   *            Render
   * -----------------------------
   */
  return (
    <div className="app mx-auto max-w-4xl p-4">
      {/* Filters */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          filterDate={isDateAvailable}
        />
        <DropDownSelect
          placeholder="Select a room"
          value={selectedRoomId ?? ""}
          onChange={handleRoomChange}
          options={roomOptions}
        />
      </header>

      {/* Reservation List */}
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
    </div>
  );
};

export default App;
