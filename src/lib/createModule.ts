declare const BUILD_FOR_PORTAL_ASSET: string | undefined;

import type { ReactNode } from "react";
import type { IContext, IModuleProps } from "./types";
import type { Root } from "react-dom/client";
import type { IExtendedContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/extended-client";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk";

export default <T>(render: (props: IModuleProps<T>) => ReactNode, dispose?: () => void) => {
  return (container: HTMLElement, clientBuilder: (constructor: typeof ContentHubClient) => IExtendedContentHubClient) => {
    let root: Root;
    return {
      async render(context: IContext<T>) {
        const createClient = () => clientBuilder(ContentHubClient);
        const props = Object.assign({ createClient }, context) as IModuleProps<T>;
        const { createRoot } = BUILD_FOR_PORTAL_ASSET ? await import(/* webpackMode: "eager" */ "react-dom/client") : await import("react-dom/client");
        root = createRoot(container);
        root.render(render(props));
      },
      unmount() {
        if (dispose) dispose();
        root.unmount();
      },
    };
  };
};
