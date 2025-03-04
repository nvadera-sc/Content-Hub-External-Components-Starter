import type { Meta, StoryObj } from "@storybook/react";
import SimpleReact from "./simpleReact";

const meta = {
  title: "Modules/Simple React",
  component: SimpleReact,
  tags: ["autodocs"],
} satisfies Meta<typeof SimpleReact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
