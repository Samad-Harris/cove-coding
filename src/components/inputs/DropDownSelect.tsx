import { memo, useId } from "react";
import type { SelectOption } from "../../@types/SelectOption.type";

interface DropDownSelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange" | "ref"
  > {
  value: string | null;
  onChange: (value: string | null) => void;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Renders a drop-down select component with an optional placeholder and custom ID.
 *
 * @param value - The currently selected value, or null if none is selected.
 * @param onChange - Callback function triggered when the selected option changes.
 * @param options - Array of options to display in the dropdown. Each option has a value and label.
 * @param placeholder - Text displayed when no option is selected.
 * @param id - The HTML ID attribute for the select element; generated automatically if not provided.
 * @returns A memoized drop-down select component.
 */
export const DropDownSelect = memo(
  ({
    value,
    onChange,
    options,
    placeholder = "All rooms",
    id,
    ...rest
  }: DropDownSelectProps) => {
    const autoId = useId();
    const selectId = id ?? autoId;

    return (
      <select
        id={selectId}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        aria-label="Room selector"
        className={`bg-white`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
);

DropDownSelect.displayName = "DropDownSelect";
