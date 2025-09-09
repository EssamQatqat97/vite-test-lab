import type { TData } from "./i-types";

interface IListController {
  users: TData;
  showSpinner: boolean;
  selected: string[];
  allSelected: boolean;
  action: string;
  selectAllIndeterminate: boolean;
  pageIndex: number;
  limit: number;
  getFullName(fname: string, lname: string): string;
}

export type { IListController };
