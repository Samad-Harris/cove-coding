import { useState, useMemo, useCallback } from "react";
import { isSameDay, parseISO } from "date-fns";
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

  const roomOptions: SelectOption[] = useMemo(() => {
    if (!reservations) return [];
    const map = new Map(reservations.map(({ room }) => [room.id, room]));

    return Array.from(map.values()).map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }, [reservations]);

  const availableDates = useMemo(() => {
    if (!reservations) return [];

    const uniqueDates = [
      ...new Set(reservations.map(({ start }) => start.split("T")[0])),
    ];

    return uniqueDates.map((dateStr) => parseISO(dateStr));
  }, [reservations]);

  // Check if the selected date is available
  const isDateAvailable = useCallback(
    (date: Date) =>
      availableDates.length === 0 ||
      availableDates.some((availableDate) => isSameDay(date, availableDate)),
    [availableDates]
  );

  // Filter reservations based on selected date and room
  const filteredReservations = useMemo(() => {
    if (!reservations) return [];

    return reservations.filter(
      ({ room, start }) =>
        // If no date is selected, show all reservations for the selected room
        (selectedDate ? isSameDay(new Date(start), selectedDate) : true) &&
        // If no room is selected, show all reservations for the selected date
        (selectedRoomId ? room.id === selectedRoomId : true)
    );
  }, [reservations, selectedDate, selectedRoomId]);

  // Handle date and room changes
  const handleDateChange = useCallback(
    (date: Date | null) => date && setSelectedDate(date),
    []
  );

  // Handle room change
  const handleRoomChange = useCallback(
    (roomId?: string | null) => setSelectedRoomId(roomId ?? null),
    []
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
