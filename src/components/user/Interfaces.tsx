export interface faunaUser {
  email: string;
  username: string;
  accessLevel: string;
  verified: boolean;
  approved: boolean;
  updating: boolean;
  errorMessage: string;
  rejected: boolean;
}
