import { http, HttpResponse } from "msw";
import { IContext, IModuleProps } from "./types";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk";
import { IEntity } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/base/entity";

export const MockBaseUrl = "http://content-hub-client.mock";
export const MockEntityId = 1;
export const MockEntityIdentifier = "MOCK_ENTITY_IDENTIFIER";
export const MockEntityCultures = ["en-US"];
export const MockEntityDefinition = "Mock.Asset";

export const MockContext: Partial<IContext> = {};
export const MockModuleProps: Partial<IModuleProps> = {
  createClient: () => new ContentHubClient(MockBaseUrl),
};

export const CreateMockModuleProps = <T>(config?: T) => {
  return {
    ...MockModuleProps,
    config,
    icon: {
      insertContentHubIconInElement: (icon: string, htmlElement: HTMLElement) => {
        htmlElement.innerText = icon;
        return Promise.resolve();
      },
    },
    user: {
      id: 0,
      userName: "",
      privileges: [],
      userGroups: [],
    },
  } as Partial<IModuleProps>;
};

export const CreateMockEntity = (properties: { [key: string]: string } = {}, relations: { [key: string]: { href: string } } = {}, merge: any = {}) => {
  return {
    id: MockEntityId,
    identifier: MockEntityIdentifier,
    cultures: MockEntityCultures,
    entitydefinition: {
      href: MockRoutes.replace(MockRoutes.entitydefinition_by_name.href, { name: MockEntityDefinition }),
    },
    properties,
    relations,
    ...merge,
  };
};

export const CreateMockQueryResponse = (entities: Partial<IEntity>[] = [], entityDefinitionName: string = MockEntityDefinition) => {
  return {
    items: entities.map(e => ({ entity: e })),
    minimal_schema_list: [
      {
        definition_name: entityDefinitionName,
        properties: Object.keys(entities.at(0)?.properties ?? {}).map(p => ({ name: p, type: "String" })),
        relations: Object.keys(entities.at(0)?.relations ?? {}).map(p => ({ name: p, cardinality: 0, role: 0 })),
      },
    ],
    total_items: entities.length,
    returned_items: entities.length,
  };
};

export const MockApiHandler = http.get(`${MockBaseUrl}/api`, () => {
  return HttpResponse.json({
    file_version: "10.24.34.0",
    product_version: "10.24.34",
    minimum_sdk_version: "3.0.0.0",
    routes: MockRoutes,
  });
});

export const MockRoutes = {
  replace: (template: string, data: any) => {
    const pattern = /{\s*(\w+?)\s*}/g;
    return template.replace(pattern, (_, token) => data[token] || "");
  },
  action_configuration: {
    href: `${MockBaseUrl}/api/actions/{actionType}/configuration`,
    templated: true,
  },
  action_status: {
    href: `${MockBaseUrl}/api/actions/status/{action}`,
    templated: true,
  },
  addsavedselections: {
    href: `${MockBaseUrl}/api/savedselections`,
    templated: true,
  },
  agent_by_id: {
    href: `${MockBaseUrl}/api/agents/{id}`,
    templated: true,
  },
  agents: {
    href: `${MockBaseUrl}/api/agents`,
  },
  aggregates: {
    href: `${MockBaseUrl}/api/aggregates/{name}/{id}{?culture,loadPermissions,loadSettings,loadOptionLists,loadDefinitions,loadEntities,renditions}`,
    templated: true,
  },
  all_roles_for_entity: {
    href: `${MockBaseUrl}/api/entities/{id}/allroles`,
    templated: true,
  },
  allfacets: {
    href: `${MockBaseUrl}/api/search/allfacets`,
    templated: true,
  },
  allsavedselections: {
    href: `${MockBaseUrl}/api/savedselections{?savedSelectionType,fullText,skip,take,sort,order,sortCulture}`,
    templated: true,
  },
  audit: {
    href: `${MockBaseUrl}/api/audit`,
  },
  authenticate: {
    href: `${MockBaseUrl}/api/authenticate/{userName}`,
    templated: true,
  },
  cache: {
    href: `${MockBaseUrl}/api/cache/{name}`,
    templated: true,
  },
  change_password: {
    href: `${MockBaseUrl}/api/account/changepassword`,
    templated: true,
  },
  check_all_entity_state_routing: {
    href: `${MockBaseUrl}/api/entities/{id}/routing`,
    templated: true,
  },
  check_entity_state_routing: {
    href: `${MockBaseUrl}/api/entities/{id}/routing/{stateId}`,
    templated: true,
  },
  check_publishing_audit_index: {
    href: `${MockBaseUrl}/api/publishAudit/checkauditindex`,
    templated: true,
  },
  checkouts: {
    href: `${MockBaseUrl}/api/checkouts`,
  },
  chili: {
    href: `${MockBaseUrl}/api/chili`,
  },
  chili_dam_triggers: {
    href: `${MockBaseUrl}/api/chili/damtriggers/{id?}`,
    templated: true,
  },
  chili_dam_triggers_dropdown_items: {
    href: `${MockBaseUrl}/api/chili/chili_dam_triggers_dropdown_items/{id?}`,
    templated: true,
  },
  chili_frame_triggers: {
    href: `${MockBaseUrl}/api/chili/frametriggers/{id?}`,
    templated: true,
  },
  chili_generate_document: {
    href: `${MockBaseUrl}/api/chili/generatedocument`,
  },
  chili_generate_mass_order: {
    href: `${MockBaseUrl}/api/chili/generatemassorder`,
  },
  chili_generate_order: {
    href: `${MockBaseUrl}/api/chili/generateorder`,
  },
  chili_get_document: {
    href: `${MockBaseUrl}/api/chili/generatedocument/getdocument/{redirect?}/{id?}`,
    templated: true,
  },
  chili_get_task_status: {
    href: `${MockBaseUrl}/api/chili/gettaskstatus/{taskId?}`,
    templated: true,
  },
  chili_gettoken: {
    href: `${MockBaseUrl}/api/chili/token`,
    templated: true,
  },
  chili_load_document: {
    href: `${MockBaseUrl}/api/chili/loaddocument/{type?}/{workspace?}`,
    templated: true,
  },
  chili_prepare_document: {
    href: `${MockBaseUrl}/api/chili/preparedocument/{id?}`,
    templated: true,
  },
  chili_publish: {
    href: `${MockBaseUrl}/api/chili/publish/{id?}`,
    templated: true,
  },
  chili_save_document: {
    href: `${MockBaseUrl}/api/chili/savedocument/{id?}`,
    templated: true,
  },
  chili_studio_generate_document: {
    href: `${MockBaseUrl}/api/chili-studio/generatedocument`,
  },
  chili_studio_get_document: {
    href: `${MockBaseUrl}/api/chili-studio/generatedocument/getdocument/{taskId?}`,
    templated: true,
  },
  chili_studio_get_rendition: {
    href: `${MockBaseUrl}/api/chili-studio/renditions/{identifier?}/{rendition?}`,
    templated: true,
  },
  chili_studio_load_document: {
    href: `${MockBaseUrl}/api/chili-studio/loaddocument/{id?}`,
    templated: true,
  },
  chili_studio_save_document: {
    href: `${MockBaseUrl}/api/chili-studio/savedocument/{id?}`,
    templated: true,
  },
  chili_test_connection: {
    href: `${MockBaseUrl}/api/chili/testconnection`,
  },
  cloud_drive_authenticate: {
    href: `${MockBaseUrl}/api/cloudDrive/authenticate`,
    templated: true,
  },
  cloud_drive_connect: {
    href: `${MockBaseUrl}/api/cloudDrive/connect`,
    templated: true,
  },
  cloud_drive_disconnect: {
    href: `${MockBaseUrl}/api/cloudDrive/disconnect`,
    templated: true,
  },
  cognitive_image_similarity: {
    href: `${MockBaseUrl}/api/cognitive/{identifier}/imagesimilarity`,
    templated: true,
  },
  colorprofiles: {
    href: `${MockBaseUrl}/api/colorprofiles`,
  },
  commands: {
    href: `${MockBaseUrl}/api/commands/{folder}/{command}`,
    templated: true,
  },
  compile_script: {
    href: `${MockBaseUrl}/api/scripts/{scriptContentId}/compile`,
    templated: true,
  },
  componentpermissions: {
    href: `${MockBaseUrl}/api/componentpermissions`,
  },
  conditional_members: {
    href: `${MockBaseUrl}/api/conditionalmembers`,
  },
  contenttype_member: {
    href: `${MockBaseUrl}/api/contenttypes/{definition}/member/{member}`,
    templated: true,
  },
  contenttype_member_group: {
    href: `${MockBaseUrl}/api/contenttypes/{definition}/membergroup/{membergroup}`,
    templated: true,
  },
  contenttype_member_groups: {
    href: `${MockBaseUrl}/api/contenttypes/{definition}/membergroups/{prefix}`,
    templated: true,
  },
  contenttypes: {
    href: `${MockBaseUrl}/api/contenttypes/{definition}/{id}{?culture,skip,take}`,
    templated: true,
  },
  copy: {
    href: `${MockBaseUrl}/api/entities/{id}/copy`,
    templated: true,
  },
  create_api_key: {
    href: `${MockBaseUrl}/api/apikeys/createkey{?keyInfo}`,
    templated: true,
  },
  custom_homepages: {
    href: `${MockBaseUrl}/api/customhomepages`,
    templated: true,
  },
  datasource_by_name: {
    href: `${MockBaseUrl}/api/datasources/{name}{?after}`,
    templated: true,
  },
  datasources: {
    href: `${MockBaseUrl}/api/datasources`,
    templated: true,
  },
  default_theme: {
    href: `${MockBaseUrl}/api/theme`,
  },
  descendants_by_query: {
    href: `${MockBaseUrl}/api/entities/descendants`,
  },
  devex_entityprinting_resource: {
    href: `${MockBaseUrl}/api/resources/entityprintingresources/{name}`,
    templated: true,
  },
  devex_entityprinting_resources: {
    href: `${MockBaseUrl}/api/resources/entityprintingresources`,
    templated: true,
  },
  devex_intellisense_resource: {
    href: `${MockBaseUrl}/api/resources/intellisenseresources/{name}`,
    templated: true,
  },
  devex_intellisense_resources: {
    href: `${MockBaseUrl}/api/resources/intellisenseresources`,
    templated: true,
  },
  domain_by_identifier: {
    href: `${MockBaseUrl}/openapi/{openapiVersion}/{domainIdentifier}/{specificationVersion?}{?openapiVersion,domainIdentifier,specificationVersion}`,
    templated: true,
  },
  download_orders: {
    href: `${MockBaseUrl}/api/downloadorders`,
  },
  download_orders_by_id: {
    href: `${MockBaseUrl}/api/downloadorders/{id}`,
    templated: true,
  },
  entities: {
    href: `${MockBaseUrl}/api/entities`,
  },
  entities_by_definition: {
    href: `${MockBaseUrl}/api/entitydefinitions/{name}/entities{?skip,take,culture,members,nestedRelations}`,
    templated: true,
  },
  entities_by_query: {
    href: `${MockBaseUrl}/api/entities/query`,
    templated: true,
  },
  entities_by_scroll: {
    href: `${MockBaseUrl}/api/entities/scroll{?query,identifier,take,members,renditions,culture,sort,order,sortCulture,nestedRelations}`,
    templated: true,
  },
  entities_by_SearchAfter: {
    href: `${MockBaseUrl}/api/entities/searchAfter{?query,take,members,renditions,culture,sort,order,sortCulture,searchAfter,nestedRelations}`,
    templated: true,
  },
  entity_by_id: {
    href: `${MockBaseUrl}/api/entities/{id}`,
    templated: true,
  },
  entity_by_identifier: {
    href: `${MockBaseUrl}/api/entities/identifier/{identifier}{?culture,members,groups,renditions,nestedRelations,loadPermissions}`,
    templated: true,
  },
  entity_deserialization: {
    href: `${MockBaseUrl}/api/serialization/entity`,
    templated: true,
  },
  entity_relation_by_name: {
    href: `${MockBaseUrl}/api/entities/{id}/relations/{name}{?id,name}`,
    templated: true,
  },
  entity_serialization: {
    href: `${MockBaseUrl}/api/serialization/entity/{identifier}`,
    templated: true,
  },
  entitydefinition_by_id: {
    href: `${MockBaseUrl}/api/entitydefinitions/{id}{?includeConditionalMembers,loadPermissions,after}`,
    templated: true,
  },
  entitydefinition_by_name: {
    href: `${MockBaseUrl}/api/entitydefinitions/{name}`,
    templated: true,
  },
  entitydefinition_by_name_v2: {
    href: `${MockBaseUrl}/api/entitydefinitions/name/{name}{?includeConditionalMembers,loadPermissions,after}`,
    templated: true,
  },
  entitydefinitions: {
    href: `${MockBaseUrl}/api/entitydefinitions*`,
    templated: true,
  },
  execute_script: {
    href: `${MockBaseUrl}/api/scripts/{identifier}/execute`,
    templated: true,
  },
  explain_permissions: {
    href: `${MockBaseUrl}/api/entities/{id}/permissions/{userId}`,
    templated: true,
  },
  feature_flag_by_name: {
    href: `${MockBaseUrl}/api/feature-flags/{name}`,
    templated: true,
  },
  fetchjobs: {
    href: `${MockBaseUrl}/api/fetchjobs{?skip,take}`,
    templated: true,
  },
  fetchjobs_by_id: {
    href: `${MockBaseUrl}/api/fetchjobs/{id}`,
    templated: true,
  },
  flows: {
    href: `${MockBaseUrl}/api/flows`,
    templated: true,
  },
  gateway_by_id: {
    href: `${MockBaseUrl}/api/gateway/id/{id}/{rendition}`,
  },
  gateway_by_identifier: {
    href: `${MockBaseUrl}/api/gateway/identifier/{identifier}/{rendition}`,
  },
  generate_by_id: {
    href: `${MockBaseUrl}/api/print/publication/{id}{?culture,quality,save}`,
    templated: true,
  },
  generate_content_by_ai: {
    href: `${MockBaseUrl}/api/genai/generate`,
    templated: true,
  },
  generate_oauth_token: {
    href: `${MockBaseUrl}/api/account/{userId}/generateoauthtoken{?userId}`,
    templated: true,
  },
  generate_public_link: {
    href: `${MockBaseUrl}/api/public`,
  },
  generate_stateflow_graph: {
    href: `${MockBaseUrl}/api/stateflows/{id}/generate`,
    templated: true,
  },
  get_api_keys: {
    href: `${MockBaseUrl}/api/apikeys/listkeys{?scopes}`,
    templated: true,
  },
  get_comment_info_by_entity_id: {
    href: `${MockBaseUrl}/api/ckeditor/annotations/count/{entityId}`,
    templated: true,
  },
  get_dirty_editors: {
    href: `${MockBaseUrl}/api/editorstatus/{entityId}`,
    templated: true,
  },
  get_entities_by_last_operation_status: {
    href: `${MockBaseUrl}/api/publishAudit/entitiesByLastOperationStatus/{tenant}/{operationStatus}`,
    templated: true,
  },
  get_entity_history: {
    href: `${MockBaseUrl}/api/publishAudit/entityHistory/{tenant}/{entityIdentifier}`,
    templated: true,
  },
  get_entity_history_by_id: {
    href: `${MockBaseUrl}/api/publishAudit/entityHistory/{tenant}/id/{entityId}`,
    templated: true,
  },
  get_entity_publish_status: {
    href: `${MockBaseUrl}/api/publishAudit/entitystatus/{tenant}/{entityIdentifier}`,
    templated: true,
  },
  get_history_in_time_range: {
    href: `${MockBaseUrl}/api/publishAudit/history/{tenant}{?startDate,endDate,searchAfter,take,fullText}`,
    templated: true,
  },
  get_linked_assets_status: {
    href: `${MockBaseUrl}/api/entities/{entityId}/linkedassetsstatus`,
  },
  get_number_of_operations_in_progress: {
    href: `${MockBaseUrl}/api/publishAudit/inProgressCount/{tenant}`,
    templated: true,
  },
  get_performance_snapshot: {
    href: `${MockBaseUrl}/api/publishAudit/performance/snapshot/{tenant}`,
    templated: true,
  },
  get_queues_snapshot: {
    href: `${MockBaseUrl}/api/publishAudit/performance/queues{?culture}`,
    templated: true,
  },
  get_schema_publish_status: {
    href: `${MockBaseUrl}/api/publishAudit/schemastatus/{tenant}`,
    templated: true,
  },
  get_schema_publishing_history: {
    href: `${MockBaseUrl}/api/publishAudit/schemaHistory/{tenant}`,
    templated: true,
  },
  get_status: {
    href: `${MockBaseUrl}/api/status/publishing`,
    templated: true,
  },
  graphql_admin: {
    href: `${MockBaseUrl}/api/graphql/admin/v1`,
  },
  graphql_preview: {
    href: `${MockBaseUrl}/api/graphql/preview/v1`,
  },
  has_manage_permissions: {
    href: `${MockBaseUrl}/api/apikeys/hasmanagepermissions`,
    templated: true,
  },
  impersonate: {
    href: `${MockBaseUrl}/api/account/{userId}/impersonate`,
    templated: true,
  },
  log_script: {
    href: `${MockBaseUrl}/api/scripts/{scriptContentId}/log{?skip,take,sorting}`,
    templated: true,
  },
  m_connector: {
    href: `${MockBaseUrl}/api/integrations/mconnector`,
  },
  massedit_multilanguage: {
    href: `${MockBaseUrl}/api/massedit/get-multi-language`,
  },
  massedit_table: {
    href: `${MockBaseUrl}/api/massedit/table`,
  },
  massedit_updatetable: {
    href: `${MockBaseUrl}/api/massedit/updatetable`,
  },
  massedits: {
    href: `${MockBaseUrl}/api/massedits{?skip,take}`,
    templated: true,
  },
  member_security: {
    href: `${MockBaseUrl}/api/membersecurity/{definition}/members/{member}`,
    templated: true,
  },
  membergroup_security: {
    href: `${MockBaseUrl}/api/membersecurity/{definition}/membergroups/{membergroup}`,
    templated: true,
  },
  menu_by_id: {
    href: `${MockBaseUrl}/api/menu/{id}{?culture}`,
    templated: true,
  },
  mgmt_page_by_id: {
    href: `${MockBaseUrl}/api/portalpagesmgmt/{id}/{culture}`,
    templated: true,
  },
  notifications: {
    href: `${MockBaseUrl}/api/notifications{?global}`,
    templated: true,
  },
  order_profile_for_entity: {
    href: `${MockBaseUrl}/api/orderprofiles/{id}`,
    templated: true,
  },
  package: {
    href: `${MockBaseUrl}/api/package`,
  },
  page_by_id: {
    href: `${MockBaseUrl}/api/pages/{id}/{culture}/{entityId}`,
    templated: true,
  },
  page_by_identifier: {
    href: `${MockBaseUrl}/api/pages/{identifier}/{culture}/{entityId}`,
    templated: true,
  },
  permissions_for_entities: {
    href: `${MockBaseUrl}/api/entities/permissions`,
    templated: true,
  },
  permissions_for_entity: {
    href: `${MockBaseUrl}/api/entities/{id}/permissions`,
    templated: true,
  },
  policy_by_id: {
    href: `${MockBaseUrl}/api/policies/{id}`,
    templated: true,
  },
  privileges: {
    href: `${MockBaseUrl}/api/privileges/{id}`,
    templated: true,
  },
  project: {
    href: `${MockBaseUrl}/api/project/{name}{?entityids,noParents,culture}`,
    templated: true,
  },
  public_collections_metadata: {
    href: `${MockBaseUrl}/api/publiccollections/metadata`,
  },
  publication_metadata_by_id: {
    href: `${MockBaseUrl}/api/print/publication/metadata/{id}{?culture,quality}`,
    templated: true,
  },
  publish_script_content: {
    href: `${MockBaseUrl}/api/scripts/{scriptContentId}/publish`,
    templated: true,
  },
  publisher_get_combined_entity_status: {
    href: `${MockBaseUrl}/api/publish/combinedentitystatus/{entityId}`,
    templated: true,
  },
  publisher_get_entity_status: {
    href: `${MockBaseUrl}/api/publish/entitystatus/{tenant}/{entityId}`,
    templated: true,
  },
  publisher_get_schema_status: {
    href: `${MockBaseUrl}/api/publish/schemastatus/{tenant}`,
    templated: true,
  },
  publisher_publish_entity: {
    href: `${MockBaseUrl}/api/publish/entities`,
    templated: true,
  },
  publisher_publish_public_collections: {
    href: `${MockBaseUrl}/api/publish/publiccollections/all`,
    templated: true,
  },
  publisher_publish_schema: {
    href: `${MockBaseUrl}/api/publish/schema`,
    templated: true,
  },
  publisher_unpublish_entity: {
    href: `${MockBaseUrl}/api/publish/entities/delete`,
    templated: true,
  },
  publishing_configuration_discard_draft: {
    href: `${MockBaseUrl}/api/publishing/settings/{tenant}/{name}/discard`,
    templated: true,
  },
  publishing_configuration_get_by_name: {
    href: `${MockBaseUrl}/api/publishing/settings/{tenant}/{name}`,
    templated: true,
  },
  publishing_configuration_get_definitions_configuration: {
    href: `${MockBaseUrl}/api/publishing/settings/definitions-configuration/{tenant}`,
    templated: true,
  },
  publishing_configuration_publish_draft: {
    href: `${MockBaseUrl}/api/publishing/settings/{tenant}/{name}/publish`,
    templated: true,
  },
  publishing_configuration_save_draft: {
    href: `${MockBaseUrl}/api/publishing/settings`,
  },
  related_paths_by_definition: {
    href: `${MockBaseUrl}/api/entitydefinitions/{name}/relatedpaths{?name}`,
    templated: true,
  },
  remove_search_filters: {
    href: `${MockBaseUrl}/api/search/remove`,
  },
  rename_api_key: {
    href: `${MockBaseUrl}/api/apikeys/renamekey/{hash}{?hash,info}`,
    templated: true,
  },
  renditions: {
    href: `${MockBaseUrl}/api/renditions`,
  },
  renditions_by_id: {
    href: `${MockBaseUrl}/api/entities/{entityId}/renditions`,
    templated: true,
  },
  renditions_by_id_v2: {
    href: `${MockBaseUrl}/api/entities/{entityId}/v2.0/renditions`,
    templated: true,
  },
  renditions_v2: {
    href: `${MockBaseUrl}/api/v2.0/renditions`,
  },
  reports: {
    href: `${MockBaseUrl}/api/reports/{action}{?skip,take}`,
    templated: true,
  },
  request_draft_script_content: {
    href: `${MockBaseUrl}/api/scripts/{scriptId}/draft`,
    templated: true,
  },
  reset_password: {
    href: `${MockBaseUrl}/api/account/{userId}/resetpassword`,
    templated: true,
  },
  resource: {
    href: `${MockBaseUrl}/api/resource{?key,culture,admin}`,
    templated: true,
  },
  resource_view_by_identifier: {
    href: `${MockBaseUrl}/api/resourceViews/{domainIdentifier}/{resourceViewIdentifier}/{entityId}{?domainIdentifier,domainVersion,resourceViewIdentifier,entityId}`,
    templated: true,
  },
  revoke_api_key: {
    href: `${MockBaseUrl}/api/apikeys/revokekey/{hash}{?hash}`,
    templated: true,
  },
  roles: {
    href: `${MockBaseUrl}/api/roles`,
    templated: true,
  },
  roles_for_entity: {
    href: `${MockBaseUrl}/api/entities/{id}/roles`,
    templated: true,
  },
  savedselections: {
    href: `${MockBaseUrl}/api/savedselections/searchcomponent/{searchIdentifier}{?savedSelectionType,fullText,skip,take,sort,order,sortCulture}`,
    templated: true,
  },
  scripts_debug_cancel: {
    href: `${MockBaseUrl}/api/scriptsdebug/cancel/{name}`,
    templated: true,
  },
  scripts_debug_check: {
    href: `${MockBaseUrl}/api/scriptsdebug/check/{identifier}`,
    templated: true,
  },
  scripts_debug_finish: {
    href: `${MockBaseUrl}/api/scriptsdebug/finish/{name}`,
    templated: true,
  },
  scripts_debug_register: {
    href: `${MockBaseUrl}/api/scriptsdebug/register/{name}`,
    templated: true,
  },
  scripts_debug_validate: {
    href: `${MockBaseUrl}/api/scriptsdebug/validate/{name}`,
    templated: true,
  },
  search: {
    href: `${MockBaseUrl}/api/search`,
  },
  selection: {
    href: `${MockBaseUrl}/api/selection/{selectionPool}/{definitionName}{?definitionNames,subPoolId,ignorePermissions}`,
    templated: true,
  },
  selection_update: {
    href: `${MockBaseUrl}/api/selection{?loadPermissions}`,
    templated: true,
  },
  send_confirmation_email: {
    href: `${MockBaseUrl}/api/account/{userId}/sendconfirmationemail`,
    templated: true,
  },
  send_notification: {
    href: `${MockBaseUrl}/api/notifications/{type}`,
    templated: true,
  },
  set_user_password: {
    href: `${MockBaseUrl}/api/account/{userId}/setpassword`,
    templated: true,
  },
  setting_by_name: {
    href: `${MockBaseUrl}/api/settings/{category}/{name}`,
    templated: true,
  },
  settings: {
    href: `${MockBaseUrl}/api/settings{?skip,take}`,
  },
  settings_by_category: {
    href: `${MockBaseUrl}/api/settings/{category}{?skip,take}`,
    templated: true,
  },
  speedtest: {
    href: `${MockBaseUrl}/api/status/speedtest/{action}`,
    templated: true,
  },
  status: {
    href: `${MockBaseUrl}/api/status`,
  },
  suggestion: {
    href: `${MockBaseUrl}/api/suggest`,
  },
  system: {
    href: `${MockBaseUrl}/api/system`,
  },
  taxonomy: {
    href: `${MockBaseUrl}/api/taxonomy{?skip,take,fullText,excludeSystemOwnedDefinitions}`,
    templated: true,
  },
  telemetry: {
    href: `${MockBaseUrl}/api/scripting/telemetry`,
  },
  transform_content_by_ai: {
    href: `${MockBaseUrl}/api/genai/transform`,
    templated: true,
  },
  translate_content_by_ai: {
    href: `${MockBaseUrl}/api/genai/translate`,
    templated: true,
  },
  upload: {
    href: `${MockBaseUrl}/api/v2.0/upload`,
    templated: true,
  },
  upload_finalize: {
    href: `${MockBaseUrl}/api/v2.0/upload/finalize`,
    templated: true,
  },
  user_by_id: {
    href: `${MockBaseUrl}/api/users/{id}`,
    templated: true,
  },
  user_renditions_count_by_id: {
    href: `${MockBaseUrl}/api/entities/{entityId}/renditions/GetUserRenditionsCount`,
    templated: true,
  },
  user_renditions_count_by_id_v2: {
    href: `${MockBaseUrl}/api/entities/{entityId}/v2.0/renditions/GetUserRenditionsCount`,
    templated: true,
  },
  usergroup_by_id: {
    href: `${MockBaseUrl}/api/usergroups/{id}{?culture}`,
    templated: true,
  },
  usergroups: {
    href: `${MockBaseUrl}/api/usergroups{?skip,take,culture}`,
    templated: true,
  },
  userProfile: {
    href: `${MockBaseUrl}/api/userProfile`,
  },
  users: {
    href: `${MockBaseUrl}/api/users{?skip,take,culture}`,
    templated: true,
  },
};
