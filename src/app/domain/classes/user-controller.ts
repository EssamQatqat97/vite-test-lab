import type { IUserController } from "../contract/i-user-controller";
import type { TPerson } from "../contract/i-types";

export default class UserController implements IUserController {
  id: string;
  user: TPerson;
  isBusy: boolean;

  //---------------------- constructor -----------------------
  constructor(id: string = "0") {
    this.id = id;
    this.isBusy = false;
    this.user = {
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      phone: "",
      address: {
        street: "yy",
        city: "",
        country: "",
      },
      createdAt: "",
      updatedAt: "",
    };
  }
  getFullName(fname: string, lname: string) {
    return `${fname} ${lname}`;
  }
}
