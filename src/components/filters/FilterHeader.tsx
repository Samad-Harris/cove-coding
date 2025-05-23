import React from "react";
import { DatePicker } from "../inputs/DatePicker";
import { DropDownSelect } from "../inputs/DropDownSelect";
import type { SelectOption } from "../../@types/SelectOption.type";

interface FilterHeaderProps {
  selectedDate?: Date;
  selectedRoomId: string | null;
  handleDateChange: (date: Date | null) => void;
  handleRoomChange: (roomId?: string | null) => void;
  roomOptions: SelectOption[];
  isDateAvailable: (date: Date) => boolean;
  firstAvailableDate?: Date;
}

/**
 * Component that renders the filter header with date and room selection
 */
export const FilterHeader: React.FC<FilterHeaderProps> = ({
  selectedDate,
  selectedRoomId,
  handleDateChange,
  handleRoomChange,
  roomOptions,
  isDateAvailable,
  firstAvailableDate,
}) => (
  <header className="flex flex-col gap-4 p-4 bg-gray-100 sm:flex-row sm:justify-end">
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      filterDate={isDateAvailable}
      openToDate={firstAvailableDate}
    />
    <DropDownSelect
      placeholder="Select a room"
      value={selectedRoomId ?? ""}
      onChange={handleRoomChange}
      options={roomOptions}
    />
  </header>
);
