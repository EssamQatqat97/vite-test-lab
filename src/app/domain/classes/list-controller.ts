import { fetchPersons, deletePersons } from "./service-mocker";
import type { IListController } from "../contract/i-list-controller ";
import type { TData } from "../contract/i-types";

export const props = {
  limit: { type: Number, default: 10 }, //items per page
  pageIndex: { type: Number, default: 1 },
};

export default class ListController implements IListController {
  users: TData;
  showSpinner: boolean;

  selected: string[]; // holds selected IDs
  allSelected: boolean; // checkbox in header
  action: string; // dropdown action
  selectAllIndeterminate: boolean = false;

  pageIndex: number;
  limit: number;
  constructor(pageIndex: number, limit: number) {
    this.pageIndex = pageIndex <= 0 ? 1 : pageIndex;
    this.limit = limit;
    this.selected = [];
    this.allSelected = false;
    this.action = "SelectOption";
    this.users = { data: [], total: 0 };
    this.showSpinner = true;
    //this.main();
  }
  async main(step: string = "stay") {
    this.showSpinner = true;
    this.setPageIndex(step);
    const result: TData = await fetchPersons(this.pageIndex, this.limit); //fetchPersons(pageIndex, limit);
    this.users = result;
    this.showSpinner = false;

    // reset selections when page changes
    this.selected = [];
    this.allSelected = false;
    this.selectAllIndeterminate = false;
  }
  setPageIndex(direction: string) {
    if (direction === "next") {
      this.pageIndex += 1;
    } else if (direction === "back") {
      if (this.pageIndex != 1) this.pageIndex -= 1;
    }
  }

  toggleAll() {
    if (this.allSelected) {
      this.selected = this.users.data.map((u) => u.id) ?? [];
    } else {
      this.selected = [];
    }
  }

  async singleItemDelete(id: string) {
    this.showSpinner = true;
    try {
      await deletePersons([id]);
      // Re-fetch data and reset selections after successful deletion
      await this.main();
      alert(`Successfully deleted single items.`);
      if (this.pageIndex > Math.ceil(this.users.total / this.limit))
        this.pageIndex -= 1;
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("Failed to delete items. Please try again.");
    } finally {
      this.showSpinner = false;
      this.selected = [];
      this.allSelected = false;
      this.selectAllIndeterminate = false;
    }
  }

  // handle dropdown actions

  async handleDelete() {
    this.showSpinner = true;
    try {
      let totalDeleted = this.selected.length;
      await deletePersons(this.selected);
      // Re-fetch data and reset selections after successful deletion
      await this.main();
      alert(`Successfully deleted ${totalDeleted} items.`);
      if (this.pageIndex > Math.ceil(this.users.total / this.limit))
        this.pageIndex -= 1;
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("Failed to delete items. Please try again.");
    } finally {
      this.showSpinner = false;
      this.selected = [];
      this.allSelected = false;
      this.selectAllIndeterminate = false;
    }
  }

  handleAction() {
    if (this.action === "SelectAll") {
      this.selected = this.users.data.map((u) => u.id) ?? [];
      this.allSelected = true;
    } else if (this.action === "DeselectAll") {
      this.selected = [];
      this.allSelected = false;
    } else if (this.action === "Delete") {
      //delete function from here
      //deletePersons(this.selected);
      this.handleDelete();
      this.main();
    }
    this.updateSelected();
    this.action = "SelectOption";
  }

  updateSelected() {
    if (
      this.selected.length > 0 &&
      this.selected.length < this.users.data.length
    ) {
      this.selectAllIndeterminate = true;
    } else if (this.selected.length == this.users.data.length) {
      this.selectAllIndeterminate = false;
      this.allSelected = true;
    } else {
      this.selectAllIndeterminate = false;
      this.allSelected = false;
    }
  }
}
