export type UserProfile = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserInfo = {
  access_token: string;
  userProfile: UserProfile;
  employeeId: number;
};
