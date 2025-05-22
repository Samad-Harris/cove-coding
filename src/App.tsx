import { useGetReservations } from "./api/hooks/useGetReservations";
import { FilterHeader } from "./components/filters/FilterHeader";
import { ReservationContent } from "./components/content/ReservationContent";
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
  // Date availability filtering
  const { isDateAvailable, firstAvailableDate } = useDateAvailability(reservations);
  
  // Filter selection state (date and room)
  const { selectedDate, selectedRoomId, handleDateChange, handleRoomChange } =
    useFilterSelections();

  // Room options for dropdown
  const roomOptions = useRoomOptions(reservations);

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
      <FilterHeader
        selectedDate={selectedDate}
        selectedRoomId={selectedRoomId}
        handleDateChange={handleDateChange}
        handleRoomChange={handleRoomChange}
        roomOptions={roomOptions}
        isDateAvailable={isDateAvailable}
        firstAvailableDate={firstAvailableDate}
      />

      {/* Reservation Content */}
      <ReservationContent
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        filteredReservations={filteredReservations}
      />
    </div>
  );
};

export default App;
