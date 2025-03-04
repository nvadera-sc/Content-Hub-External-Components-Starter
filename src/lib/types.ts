import type { Optional } from "@sitecore/sc-contenthub-webclient-sdk";
import type { IContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
import type { IExtendedContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/extended-client";
import type { RelationRole } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/base";
import type CultureInfo from "@sitecore/sc-contenthub-webclient-sdk/dist/culture-info";
import type { FieldFilterRequestResource } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/field-filter-request-resource";
import type { SearchRequest } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/search/search-request";

export type IContext<T = any> = {
  api: {
    search: {
      activate: (serchIdentifier: string) => void;
      addFilters: (searchIdentifier: string, filters: Array<FieldFilterRequestResource>) => void;
      addListener: (searchIdentifier: string, eventName: string, listener: (options: { searchRequest: SearchRequest }) => void) => () => void;
      clearFullTextFilter: (searchIdentifier: string) => void;
      getEventSearchIdentifier: (searchIdentifier: string) => string;
      updateFullTextFilter: (searchIdentifier: string, text: string) => void;
      updateQuery: (searchIdentifier: string, query: string) => void;
    };
    notifier: {
      notifySuccess: (message: string) => void;
      notifyError: (message: string) => void;
      notifyWarning: (message: string) => void;
      notifyInfo: (message: string) => void;
    };
    selection: {
      addToSelection: (ids: Array<number>, selectionPoolIdentifier: string, subPoolId?: number) => void;
      removeFromSelection: (ids: Array<number>, selectionPoolIdentifier: string, subPoolId?: number) => void;
      clearSelection: (selectionPoolIdentifier: string, subPoolId?: number, definitionNames?: Array<string>) => void;
    };
    details: {
      setEntitySource: (identifier: string, entityId: number) => void;
    };
  };
  client: IContentHubClient;
  config: T;
  entity?: {
    permissions: Record<string, Optional<boolean>>;
    properties: Record<string, any>;
    relations: Record<string, Array<number>>;
    renditions: Record<string, Array<string>>;
    systemProperties: {
      id: number;
      identifier: string;
      isnew: boolean;
      createdon: string;
      createdby: number;
      modifiedon: string;
      modifiedby: number;
      lockedon?: string;
      lockedby?: number;
      isroottaxonomyitem: boolean;
      ispathroot: boolean;
      inheritssecurity: boolean;
      issystemowned: boolean;
      version: number;
    };
    setPropertyValue: (property: string, value: any, culture?: CultureInfo) => void;
    setRelatedIds: (relationName: string, ids: number[], role?: RelationRole) => void;
  };
  name: string;
  icon: {
    insertContentHubIconInElement: (icon: string, htmlElement: HTMLElement) => Promise<void>;
  };
  options: {
    culture?: CultureInfo;
    editingMode?: "readonly" | "edit" | "inherit";
    entityId?: number;
    isDisabled?: boolean;
    isEditing?: boolean;
    isInModal?: boolean;
    isInSidebar?: boolean;
    isInTab?: boolean;
    modalEntityId?: number;
    modalPageName?: string;
    nestingLevel?: number;
    setCulture?: (culture: CultureInfo) => void;
    setEntityId?: (entityId: number) => void;
    setModalOperations?: (operations: ModalOperationConfig[]) => void;
  };
  theme: any;
  user: {
    id: number;
    privileges: String[];
    userGroups: String[];
    userName: string;
  };
};

export type IModuleProps<T = any> = IContext<T> & {
  createClient: () => IExtendedContentHubClient;
};

export type ModalOperationConfig = {
  name: string;
  id: string;
  label: string;
  displayType?: "link" | "default" | "primary" | "secondary" | "none";
  className?: string;
  onValidate?: () => boolean | Promise<boolean>;
  onClick?: (event?: unknown) => void | Promise<void>;
  onMouseOver?: (event?: unknown) => void | Promise<void>;
  onContextMenu?: (event?: unknown) => void | Promise<void>;
};
