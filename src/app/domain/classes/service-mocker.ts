import axios from "axios";
import type { TPerson } from "../contract/i-types";

//you can use the following code to simulate data receive throttling
axios.interceptors.request.use(async (config) => {
  await new Promise((res) => setTimeout(res, 10)); // delay every request by 5s
  return config;
});

// Delete person

// const deletePersons = (ids: string[] | string, delay = 1): Promise<boolean> => {
//   return new Promise((resolve) => {
//     setTimeout(async () => {
//       try {
//         // Normalize ids into an array
//         const idList = Array.isArray(ids) ? ids : [ids];

//         // Run deletions in parallel
//         await Promise.all(
//           idList.map((id) =>
//             axios.delete(`http://localhost:3000/persons/${id}`)
//           )
//         );

//         resolve(true); // Success
//       } catch (error) {
//         console.error("Error deleting person(s):", error);
//         resolve(false); // Fail but resolve gracefully
//       }
//     }, delay);
//   });
// };

const deletePersons = async (ids: string[]) => {
  try {
    const deletionPromises = ids.map((id) =>
      axios.delete(`http://localhost:3000/persons/${id}`)
    );
    const responses = await Promise.all(deletionPromises);
    console.log(`Successfully deleted ${responses.length} persons.`);
    return responses.map((response) => response.status);
  } catch (error) {
    console.error("Error deleting one or more persons:", error);
    return null;
  }
};
//deletePersons(["1", "2"]);
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

// Create new USER

const addPerson = (person: TPerson, delay = 1): Promise<TPerson | null> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const response = await axios.post<TPerson>(
          "https://654b92025b38a59f28ef5698.mockapi.io/person",
          person
        );
        resolve(response.data); // return the created person
      } catch (error) {
        console.error("Error adding person:", error);
        resolve(null); // return null on error
      }
    }, delay);
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
          `https://654b92025b38a59f28ef5698.mockapi.io/person/${id}`,
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
    const response = await axios.get("http://localhost:3000/persons", {
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
export { fetchPersons, deletePersons, addPerson, editPerson, delayedSum };
