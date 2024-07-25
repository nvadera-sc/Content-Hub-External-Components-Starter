import type { Meta, StoryObj } from "@storybook/react";
import ClientExample, { ClientExampleConfig } from "./clientExample";
import { CreateMockEntity, CreateMockModuleProps, CreateMockQueryResponse, MockApiHandler, MockBaseUrl, MockEntityId, MockRoutes } from "@/lib/mockData";
import { http, HttpResponse } from "msw";

const mockedPropertyName = "title";
const mockedPropertyValue = "Hello World!";

const meta = {
  title: "Modules/Client Example",
  component: ClientExample,
  args: {
    ...CreateMockModuleProps<ClientExampleConfig>({ propertyName: mockedPropertyName }),
    options: {
      entityId: MockEntityId,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ClientExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        MockApiHandler,
        http.post(MockRoutes.entities_by_query.href, () => {
          const entity = CreateMockEntity({ [mockedPropertyName]: mockedPropertyValue });
          return HttpResponse.json(CreateMockQueryResponse([entity]));
        }),
      ],
    },
  },
  args: {},
};
