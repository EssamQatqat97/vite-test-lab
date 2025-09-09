import ListController from "../app/domain/classes/list-controller";

const listController = new ListController();
describe("getFullName", () => {
  it("returns the correct full name", () => {
    const person = { firstName: "Khaled", lastName: "Qad" };
    expect(listController.getFullName(person.firstName, person.lastName)).toBe(
      "Khaled Qad"
    );
  });
  test("instance the method it self", () => {
    const pool = new ListController();
    const newFunc = pool.getFullName;
    expect(newFunc("Khaled", "Obaid")).toBe("Khaled Obaid");
  });
});
