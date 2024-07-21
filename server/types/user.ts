import type { Request } from "express";

export interface UserType {
  id: string;
  name: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user: UserType;
}
