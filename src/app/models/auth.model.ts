export interface ResponseLogin {
  jwt: string;
  user: User;
}

export interface User {
  userId: string,
  userName: string,
  status: string,
  name: string
}
