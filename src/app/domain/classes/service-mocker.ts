import axios from "axios";
import type { TPerson } from "../contract/i-types";

//you can use the following code to simulate data receive throttling
axios.interceptors.request.use(async (config) => {
  await new Promise((res) => setTimeout(res, 10)); // delay every request by 5s
  return config;
});

const deletePersons = async (ids: string[]) => {
  try {
    const deletionPromises = ids.map((id) =>
      axios.delete(`http://20.233.121.78:3001/persons/${id}`)
    );
    const responses = await Promise.all(deletionPromises);
    console.log(`Successfully deleted ${responses.length} persons.`);
    return responses.map((response) => response.status);
  } catch (error) {
    console.error("Error deleting one or more persons:", error);
    return null;
  }
};

//create person function
const createPerson = async (person: TPerson) => {
  person.id = Math.ceil(Math.random() * 200).toString();
  let now = new Date();
  person.createdAt = now.toISOString();
  try {
    const response = await axios.post("http://20.233.121.78:3001/persons", {
      ...person,
      createdAt: new Date().toISOString(),
    });
    return response.data; // returns the new person with id assigned by json-server
  } catch (error) {
    console.error("Error creating person:", error);
    return null;
  }
};

// delayed function
const delayedSum = async (
  a: number,
  b: number,
  period: number = 1000
): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, period);
  });
};

//update person
const editPerson = (
  id: string,
  updates: Partial<TPerson>,
  delay = 1
): Promise<TPerson | null> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const response = await axios.put<TPerson>(
          `http://20.233.121.78:3001/persons/${id}`,
          updates
        );
        resolve(response.data); // return updated person
      } catch (error) {
        console.error("Error editing person:", error);
        resolve(null); // return null on error
      }
    }, delay);
  });
};

const fetchPersons = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get("http://20.233.121.78:3001/persons", {
      params: { _page: page, _per_page: limit },
    });
    console.log(response.data.data);
    return {
      data: response.data.data,
      total: Number(response.data.items),
    };
  } catch (error) {
    console.error("Error fetching persons:", error);
    return { data: [], total: 0 };
  }
};

// fetch one user
const fetchPerson = async (id: string) => {
  try {
    const response = await axios.get(`http://20.233.121.78:3001/persons/${id}`);
    // Return the single person object
    return response.data;
  } catch (error) {
    console.error(`Error fetching person with ID ${id}:`, error);
    return null; // Return null or an appropriate fallback value
  }
};

export {
  fetchPersons,
  fetchPerson,
  deletePersons,
  editPerson,
  delayedSum,
  createPerson,
};
