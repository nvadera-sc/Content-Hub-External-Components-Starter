import CultureInfo from "@sitecore/sc-contenthub-webclient-sdk/dist/culture-info";

export type LoadOptions = {
  relations?: string[];
  properties?: string[];
  cultures?: CultureInfo[];
};
