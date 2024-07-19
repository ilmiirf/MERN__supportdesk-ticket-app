import type { Request } from "express";

export interface UserType {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
}

export interface RequestWithUser extends Request {
  user: UserType;
}
