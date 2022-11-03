export interface IUser {
  readonly _id?: string;
  oauthId: string;
  authProvider: string;
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  createdAt?: string;
  updateAt?: string;
}

export interface IGoogleProfile {
  provider: string;
  sub: string;
  id: string;
  displayName: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
  verified: boolean;
  language: string;
  email: string;
  picture: string;
  [otherProperties: string]: unknown;
}

export interface ICreateUserParams {
  uniqueKey: string;
  value: string;
  userProfile: IGoogleProfile;
}
