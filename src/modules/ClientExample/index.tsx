import createModule from "@/lib/createModule";
import ClientExample, { ClientExampleConfig } from "./clientExample";

export default createModule<ClientExampleConfig>(props => <ClientExample {...props} />);
