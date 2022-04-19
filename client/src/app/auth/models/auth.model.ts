export interface IAuth {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  token: string;
  expiresIn: number;
}
