import type { IModuleProps } from "@/lib/types";

export default ({ user }: IModuleProps) => {
  return <div>Username: {user.userName}</div>;
};
