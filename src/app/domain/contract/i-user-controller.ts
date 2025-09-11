import type { TPerson } from "./i-types";

interface IUserController {
  id: string;
  user: TPerson;
  isBusy: boolean;
}

export type { IUserController };
