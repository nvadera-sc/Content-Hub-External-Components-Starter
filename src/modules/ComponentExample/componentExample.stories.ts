import type { Meta, StoryObj } from "@storybook/react";
import ComponentExample from "./componentExample";

const meta = {
  title: "Modules/Component Example",
  component: ComponentExample,
  tags: ["autodocs"],
} satisfies Meta<typeof ComponentExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
