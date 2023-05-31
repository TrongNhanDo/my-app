import axios from "axios";

export const callApi = (url: string, method: string, data?: object): Promise<any> => {
   const requestApi = {
      method: method,
      url: import.meta.env.VITE_API_URL + url,
      headers: {
         "Content-Type": "application/json",
      },
      data: {
         ...data,
      },
   };

   return axios(requestApi);
};
