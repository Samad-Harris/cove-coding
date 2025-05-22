import { useState, useCallback } from 'react';

/**
 * Custom hook to manage filter selections (date and room)
 * 
 * @returns Object containing selected values and handler functions
 */
export const useFilterSelections = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Handle date changes
  const handleDateChange = useCallback(
    (date: Date | null) => date && setSelectedDate(date),
    []
  );

  // Handle room changes
  const handleRoomChange = useCallback(
    (roomId?: string | null) => setSelectedRoomId(roomId ?? null),
    []
  );

  return {
    selectedDate,
    selectedRoomId,
    handleDateChange,
    handleRoomChange
  };
};
