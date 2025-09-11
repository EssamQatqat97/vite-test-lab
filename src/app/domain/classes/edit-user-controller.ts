import type { IUserController } from "../contract/i-user-controller";
import type { TPerson } from "../contract/i-types";
import { fetchPerson, editPerson } from "./service-mocker";
import UserController from "./user-controller";

export const props = {
  limit: { type: Number, default: 10 }, //items per page
  pageIndex: { type: Number, default: 1 },
};

export default class EditUserController
  extends UserController
  implements IUserController
{
  //---------------------- constructor -----------------------
  constructor(id: string = "0") {
    super(id);
  }
  async getPersonData(personID: string) {
    this.isBusy = true;
    const result = await fetchPerson(personID); //fetchPersons(pageIndex, limit);
    //this.user = result;
    this.isBusy = false;
    return result;
  }
  async editPerson(id: string, person: TPerson, delay: number = 1) {
    this.isBusy = true;
    await editPerson(id, person, delay);
    this.isBusy = false;
  }
}
