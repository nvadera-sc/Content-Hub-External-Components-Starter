import { EntityLoadConfigurationBuilder } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/entity-load-configuration-builder";
import { LoadOptions } from "./types";

export const entityLoadConfigurationFromOptions = (loadOptions: LoadOptions) => {
  const builder = new EntityLoadConfigurationBuilder();
  if (loadOptions.cultures) builder.inCultures(loadOptions.cultures);
  if (loadOptions.properties) builder.withProperties(loadOptions.properties);
  if (loadOptions.relations) builder.withRelations(loadOptions.relations);
  return builder.build();
};
