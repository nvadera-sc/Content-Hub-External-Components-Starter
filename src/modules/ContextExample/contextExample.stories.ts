import type { Meta, StoryObj } from "@storybook/react";
import ContextExample from "./contextExample";
import { CreateMockModuleProps } from "@/lib/mockData";

const mockProps = CreateMockModuleProps();
mockProps.user!.userName = "John Smith";

const meta = {
  title: "Modules/Context Example",
  component: ContextExample,
  args: mockProps,
  tags: ["autodocs"],
} satisfies Meta<typeof ContextExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
