import { RelationQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/relation-query-filter";
import { Query } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/query";
import { USER_PROFILE } from "../constants/schema";
import { IExtendedContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/extended-client";
import { LoadOptions } from "./types";
import { entityLoadConfigurationFromOptions } from "./dataHelpers";

export const getUserProfileFromUserId = async (client: IExtendedContentHubClient, userId: number, loadOptions: LoadOptions) => {
  const query = new Query({
    filter: new RelationQueryFilter({ relation: USER_PROFILE.relations.userToUserProfile, parentId: userId }),
  });
  return await client.querying.singleAsync(query, entityLoadConfigurationFromOptions(loadOptions));
};
