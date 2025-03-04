import { FilterDataType } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/filter-data-type";
import { ComparisonOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/comparison-operator";
import { IdQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/id-query-filter";
import { PropertyQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/property-query-filter";
import { RelationQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/relation-query-filter";
import { DefinitionQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/definition-query-filter";
import { CompositeQueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/composite-query-filter";
import { CompositeFilterOperator } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/composite-filter-operator";
import { QueryFilter } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/filters/query-filter";

export const getDefinitionFilter = (definitionName: string) => {
  return new DefinitionQueryFilter({
    name: definitionName,
    operator: ComparisonOperator.Equals,
  });
};

export const getIdFilter = (id: number) => {
  return new IdQueryFilter({
    values: [id],
    operator: ComparisonOperator.Equals,
  });
};

export const getIdsFilter = (ids: number[]) => {
  return new IdQueryFilter({
    values: ids,
    operator: ComparisonOperator.Equals,
  });
};

export const getRelationFilter = (relationName: string, parentId: number) => {
  return new RelationQueryFilter({
    relation: relationName,
    parentId: parentId,
  });
};

export const getBooleanPropertyFilter = (propertyName: string, booleanValue: boolean) => {
  return new PropertyQueryFilter({
    operator: ComparisonOperator.Equals,
    property: propertyName,
    value: booleanValue,
    dataType: FilterDataType.Bool,
  });
};

export const getStringPropertyFilter = (propertyName: string, stringValue: string) => {
  return new PropertyQueryFilter({
    operator: ComparisonOperator.Equals,
    property: propertyName,
    value: stringValue,
    dataType: FilterDataType.String,
  });
};

export const getCompositeAndFilter = (filters: QueryFilter[]) => {
  return new CompositeQueryFilter({
    children: filters,
    combineMethod: CompositeFilterOperator.And,
  });
};

export const getCompositeOrFilter = (filters: QueryFilter[]) => {
  return new CompositeQueryFilter({
    children: filters,
    combineMethod: CompositeFilterOperator.Or,
  });
};
