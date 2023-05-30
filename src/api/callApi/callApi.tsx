import axios from "axios";

export const callApi = (url: string, method: string, data: object) => {
   const requestApi = {
      method: method,
      url: `http://localhost:3500/${url}`,
      headers: {
         "Content-Type": "application/json",
      },
      data: {
         ...data,
      },
   };
   return axios(requestApi);
};
