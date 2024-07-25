import { entityLoadConfigurationFromOptions } from "@/lib/data/dataHelpers";
import type { IModuleProps } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

export type ClientExampleConfig = {
  propertyName: string;
};

export default ({ createClient, config, options }: IModuleProps<ClientExampleConfig>) => {
  const [propertyValue, setPropertyValue] = useState<string>();
  const client = useMemo(createClient, [createClient]);
  const loadConfiguration = useMemo(() => entityLoadConfigurationFromOptions({ properties: [config.propertyName] }), [config.propertyName]);

  useEffect(() => {
    (async () => {
      if (!client || !loadConfiguration || !options.entityId) setPropertyValue(undefined);
      else {
        const entity = await client.entities.getAsync(options.entityId, loadConfiguration);
        setPropertyValue(entity?.getPropertyValue(config.propertyName) as string);
      }
    })();
  }, [client, options.entityId]);

  return (
    <dl>
      <dt>{config.propertyName}</dt>
      <dd>{propertyValue ? propertyValue : <em>Not set</em>}</dd>
    </dl>
  );
};
