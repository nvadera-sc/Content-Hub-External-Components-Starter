import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Field } from "./field";
import { Select } from "../Select";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Enter value:",
  },
};

export const SelectComponent: Story = {
  args: {
    as: Select,
    label: "Select value:",
    children: (
      <>
        <option>a</option>
        <option>b</option>
        <option>c</option>
      </>
    ),
  },
};
