import { memo } from "react";
import ReactDatePicker from "react-datepicker";
import type { DatePickerProps as RDDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Renders a memoized date picker component with customizable date format,
 * placeholder text, and optional additional class names.
 *
 * @param props.value - The current date value (in a string format that can be parsed).
 * @param props.dateFormat - The date display format (default is "yyyy-MM-dd").
 * @param props.placeholderText - Placeholder displayed when no date is selected (default is "Select a date").
 * @returns A React DatePicker component.
 */
export const DatePicker = memo(
  ({
    value,
    dateFormat = "yyyy-MM-dd",
    placeholderText = "Select a date",
    ...rest
  }: RDDatePickerProps) => (
    <ReactDatePicker
      selected={value ? new Date(value) : null}
      dateFormat={dateFormat}
      placeholderText={placeholderText}
      aria-label="Date picker"
      {...rest}
    />
  )
);

DatePicker.displayName = "DatePicker";
