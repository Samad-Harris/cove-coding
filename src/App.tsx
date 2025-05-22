import { useState, useMemo, useCallback } from "react";
import { isSameDay } from "date-fns";
import { useGetReservations } from "./api/hooks/useGetReservations";
import { DatePicker } from "./components/inputs/DatePicker";
import { DropDownSelect } from "./components/inputs/DropDownSelect";
import { ReservationList } from "./components/lists/ReservationList";
import type { SelectOption } from "./@types/SelectOption.type";

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
   *        UI State Layer
   * -----------------------------
   */
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  /**
   * Build a unique, memo‑ised list of room options once we have data.
   */
  const roomOptions: SelectOption[] = useMemo(() => {
    if (!reservations) return [];
    // Create a map to ensure unique room IDs
    const map = new Map(reservations.map(({ room }) => [room.id, room]));

    return Array.from(map.values()).map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }, [reservations]);

  /**
   * Filter reservations on every relevant change.
   */
  const filteredReservations = useMemo(() => {
    if (!reservations) return [];

    return reservations.filter(({ room, start }) => {
      // If no date is selected, show all reservations for the selected room
      const sameDay = selectedDate
        ? isSameDay(new Date(start), selectedDate)
        : true;

      // If no room is selected, show all reservations for the selected date
      const matchesRoom = selectedRoomId ? room.id === selectedRoomId : true;
      return sameDay && matchesRoom;
    });
  }, [reservations, selectedDate, selectedRoomId]);

  /**
   * Stable handlers (prevent unnecessary renders downstream).
   */
  const handleDateChange = useCallback((date: Date | null) => {
    if (date) setSelectedDate(date);
  }, []);

  const handleRoomChange = useCallback((roomId?: string | null) => {
    setSelectedRoomId(roomId ?? null);
  }, []);

  /**
   * -----------------------------
   *            Render
   * -----------------------------
   */
  return (
    <div className="app mx-auto max-w-4xl p-4">
      {/* Filters */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
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
