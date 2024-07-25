type Schema = {
  definitionName: string;
  properties: { [key: string]: string };
  relations: { [key: string]: string };
};

export const USER_PROFILE = {
  definitionName: "M.UserProfile",
  properties: {},
  relations: {
    userToUserProfile: "UserToUserProfile",
  },
} satisfies Schema;
