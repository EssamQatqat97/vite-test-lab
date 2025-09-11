import type { IUserController } from "../contract/i-user-controller";
import type { TPerson } from "../contract/i-types";
import { createPerson } from "./service-mocker";
import UserController from "./user-controller";

export default class CreateUserController
  extends UserController
  implements IUserController
{
  constructor(id: string = "0") {
    super(id);
  }
  async createNewPerson(person: TPerson) {
    this.isBusy = true;
    const result: TPerson = await createPerson(person); //fetchPersons(pageIndex, limit);
    this.user = result;
    this.isBusy = false;
  }
}
