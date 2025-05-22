import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

// NOTE: Some states might not be used in the component, but are included for demonstration purposes.

const meta: Meta<typeof DatePicker> = {
  title: "Components/Inputs/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    onChange: { action: "date changed" },
    dateFormat: { control: "text" },
    placeholderText: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Base story with default values
export const Default: Story = {
  args: {
    value: "2025-05-20",
    onChange: (date: Date | null) => console.log("Date selected:", date),
  },
};

// Story with a specific date
export const WithPresetDate: Story = {
  args: {
    value: "2025-12-25",
    onChange: (date: Date | null) => console.log("Date selected:", date),
  },
};

// Story with custom date format
export const CustomDateFormat: Story = {
  args: {
    value: "2025-05-21",
    dateFormat: "MMMM d, yyyy",
    onChange: (date: Date | null) => console.log("Date selected:", date),
  },
};

// Story with custom placeholder
export const CustomPlaceholder: Story = {
  args: {
    value: "",
    placeholderText: "Choose your reservation date",
    onChange: (date: Date | null) => console.log("Date selected:", date),
  },
};

// Story with date filtering (only allow weekdays)
export const WithDateFiltering: Story = {
  args: {
    value: "2025-05-20",
    filterDate: (date: Date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6; // Filter out weekends (0 = Sunday, 6 = Saturday)
    },
    onChange: (date: Date | null) => console.log("Date selected:", date),
  },
};

// Story with read-only state
export const ReadOnly: Story = {
  args: {
    value: "2025-05-20",
    readOnly: true,
    onChange: (date: Date | null) => console.log("Date selected:", date),
  },
};

// Story demonstrating date range selection
export const WithMinMaxDates: Story = {
  args: {
    value: "2025-05-20",
    minDate: new Date("2025-05-15"), // 5 days before
    maxDate: new Date("2025-05-25"), // 5 days after
    onChange: (date: Date | null) => console.log("Date selected:", date),
  },
};
