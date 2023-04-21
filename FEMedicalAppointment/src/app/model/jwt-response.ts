export interface JwtResponse {
  token: string;
  type: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  roles: [];
  accessToken: string;
  tokenType: string;
}
