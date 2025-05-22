import type { Meta, StoryObj } from "@storybook/react";
import { DropDownSelect } from "./DropDownSelect";

/**
 * Example Storybook Story for DropDownSelect component
 *
 */

const meta: Meta<typeof DropDownSelect> = {
  title: "Components/Inputs/DropDownSelect",
  component: DropDownSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    onChange: { action: "selection changed" },
    options: { control: "object" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DropDownSelect>;

const sampleOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

// Base story with default values
export const Default: Story = {
  args: {
    value: "option1",
    options: sampleOptions,
    onChange: (value: string | null) =>
      console.log("Selection changed to:", value),
  },
};

// Story with many options
export const ManyOptions: Story = {
  args: {
    value: "option1",
    options: [
      ...sampleOptions,
      { value: "option4", label: "Option 4" },
      { value: "option5", label: "Option 5" },
      { value: "option6", label: "Option 6" },
      { value: "option7", label: "Option 7" },
    ],
    onChange: (value: string | null) =>
      console.log("Selection changed to:", value),
  },
};

// Story with a preselected value
export const WithPreselection: Story = {
  args: {
    value: "option3",
    options: sampleOptions,
    onChange: (value: string | null) =>
      console.log("Selection changed to:", value),
  },
};

// Story with custom placeholder
export const CustomPlaceholder: Story = {
  args: {
    value: null,
    options: sampleOptions,
    placeholder: "Select a room type",
    onChange: (value: string | null) =>
      console.log("Selection changed to:", value),
  },
};

// Story with no selection (showing placeholder)
export const NoSelection: Story = {
  args: {
    value: null,
    options: sampleOptions,
    onChange: (value: string | null) =>
      console.log("Selection changed to:", value),
  },
};

// Story with disabled state
export const Disabled: Story = {
  args: {
    value: "option1",
    options: sampleOptions,
    disabled: true,
    onChange: (value: string | null) =>
      console.log("Selection changed to:", value),
  },
};

// Story with required field
export const Required: Story = {
  args: {
    value: "option1",
    options: sampleOptions,
    required: true,
    onChange: (value: string | null) =>
      console.log("Selection changed to:", value),
  },
};
