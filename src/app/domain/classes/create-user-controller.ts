import type { ICreateUserController } from "../contract/i-create-user-controller";
import type { TPerson } from "../contract/i-types";
import { fetchPerson, createPerson, editPerson } from "./service-mocker";

export const props = {
  limit: { type: Number, default: 10 }, //items per page
  pageIndex: { type: Number, default: 1 },
};

export default class CreateUserController implements ICreateUserController {
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
        street: "",
        city: "",
        country: "",
      },
      createdAt: "",
      updatedAt: "",
    };
  }
  async getPersonData(personID: string) {
    this.isBusy = true;
    const result = await fetchPerson(personID); //fetchPersons(pageIndex, limit);
    //this.user = result;
    this.isBusy = false;
    return result;
  }
  async createNewPerson(person: TPerson) {
    this.isBusy = true;
    const result: TPerson = await createPerson(person); //fetchPersons(pageIndex, limit);
    this.user = result;
    this.isBusy = false;
  }

  async editPerson(id: string, person: TPerson, delay: number = 1) {
    this.isBusy = true;
    await editPerson(id, person, delay);
    this.isBusy = false;
  }
  getFullName(fname: string, lname: string) {
    return `${fname} ${lname}`;
  }
}
