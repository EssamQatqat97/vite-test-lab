import axios from "axios";
import { fetchPerson, createPerson } from "@app/domain/classes/service-mocker";
import type { TPerson } from "@app/domain/contract/i-types";
// Mock the entire axios module
vi.mock("axios");

describe("service-mocker", () => {
  // A test suite specifically for the fetchPerson function
  describe("fetchPerson", () => {
    it("should fetch a single person successfully and return the data", async () => {
      // Define the mock data that the axios request will return
      const mockPerson: TPerson = {
        id: "9",
        firstName: "Khalid",
        lastName: "Obaid",
        age: 43,
        email: "khld@mnb.pgy",
        phone: "065239898",
        address: {
          street: "Amman",
          city: "Amman",
          country: "Jordan",
        },
        createdAt: "2025-08-30T12:00:00Z",
        updatedAt: "2025-08-30T21:00:00Z",
      };

      // Mock the axios.get method to resolve with a specific value
      // This prevents the test from making an actual API call
      vi.mocked(axios.get).mockResolvedValue({
        data: mockPerson,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      // Call the function you want to test
      const result = await fetchPerson("1");

      // Assert that the function returned the expected mock data
      expect(result).toEqual(mockPerson);
      // Assert that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(
        "http://cubes-poc-dev.a3g8hbhub9f6gndj.uaenorth.azurecontainer.io:3001/persons/1"
      );
    });

    it("should return null if the API call fails", async () => {
      // Mock axios.get to reject with an error
      vi.mocked(axios.get).mockRejectedValue(new Error("Network Error"));

      // Call the function
      const result = await fetchPerson("999");

      // Assert that the function returns null on error, as per the original code's logic
      expect(result).toBeNull();
      // Assert that the error was logged to the console
      // vi.spyOn can be used to check if console.error was called, but in this case, we'll just check the return value.
    });
    //-----------------------------------------------------------------------------------
    it("should return null if the API call fails", async () => {
      const mockPerson: TPerson = {
        id: "234234",
        firstName: "Khalid",
        lastName: "Obaid",
        age: 43,
        email: "khld@mnb.pgy",
        phone: "065239898",
        address: {
          street: "Amman",
          city: "Amman",
          country: "Jordan",
        },
        createdAt: "2025-08-30T12:00:00Z",
        updatedAt: "2025-08-30T21:00:00Z",
      };
      // Mock axios.get to reject with an error
      vi.mocked(axios.create).mockRejectedValue(new Error("Network Error"));

      // Call the function
      const result = await createPerson(mockPerson);

      // Assert that the function returns null on error, as per the original code's logic
      expect(result).toBeNull();
      // Assert that the error was logged to the console
      // vi.spyOn can be used to check if console.error was called, but in this case, we'll just check the return value.
    });
  });
});
