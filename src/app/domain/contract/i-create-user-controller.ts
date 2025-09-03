import type { TPerson } from "./i-types";

interface ICreateUserController {
  id: string;
  user: TPerson;
  isBusy: boolean;
}

export type { ICreateUserController };
